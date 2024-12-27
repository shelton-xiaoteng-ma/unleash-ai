import prismadb from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import Stripe from "stripe";

const dashboardUrl = absoluteUrl("/dashboard");

const app = new Hono()
  .post("/create-checkout-session", async (c) => {
    const auth = getAuth(c);
    const user = await currentUser();

    if (!user || !auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId: user.id },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      // Create a new session for the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: dashboardUrl,
      });
      return c.json({ url: stripeSession.url }, 200);
    }
    // If the user does not have a subscription, redirect them to checkout
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: absoluteUrl("/dashboard/?_success"),
      cancel_url: absoluteUrl("/dashboard/?_cancel"),
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: { userId: user.id },
    });
    return c.json({ url: stripeSession.url }, 200);
  })
  .post("/webhook", async (c) => {
    try {
      const body = await c.req.text();
      const signature = c.req.header("Stripe-Signature") as string;

      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          if (!userId) {
            // throw new Error("User ID is missing in session metadata");
            return c.json(
              { error: "User ID is missing in session metadata" },
              400
            );
          }
          const customer = await stripe.customers.retrieve(
            session.customer as string
          );
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );
          await prismadb.userSubscription.upsert({
            where: { userId },
            create: {
              userId,
              stripeCustomerId: customer.id,
              stripeSubscriptionId: session.subscription as string,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                subscription.current_period_end * 1000
              ),
            },
            update: {
              stripeCustomerId: customer.id,
              stripeSubscriptionId: session.subscription as string,
            },
          });
          break;
        case "customer.subscription.updated":
          const updatedSubscription = event.data.object as Stripe.Subscription;
          await prismadb.userSubscription.update({
            where: { stripeSubscriptionId: updatedSubscription.id },
            data: {
              stripePriceId: updatedSubscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(
                updatedSubscription.current_period_end * 1000
              ),
            },
          });
          break;
        case "customer.subscription.deleted":
          const deletedSubscription = event.data.object as Stripe.Subscription;
          await prismadb.userSubscription.update({
            where: { stripeSubscriptionId: deletedSubscription.id },
            data: {
              stripeSubscriptionId: null,
            },
          });
          break;
        default:
          break;
      }
      return c.json({ received: true }, 200);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Webhook Error" }, 500);
    }
  });
export default app;
