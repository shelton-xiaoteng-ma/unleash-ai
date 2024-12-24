import prismadb from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const settingsUrl = absoluteUrl("/settings");

const app = new Hono().get("/create-checkout-session", async (c) => {
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
      return_url: settingsUrl,
    });
    return c.json({ url: stripeSession.url }, 200);
  }
  // If the user does not have a subscription, redirect them to checkout
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: absoluteUrl("/_success"),
    cancel_url: absoluteUrl("/_cancel"),
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
});
export default app;
