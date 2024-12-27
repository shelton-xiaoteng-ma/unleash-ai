import { auth } from "@clerk/nextjs/server";
import prismadb from "./prisma";

const DAY_IN_MS = 86400000;

export const checkSubscription = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      stripeCustomerId: true,
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription || !userSubscription.stripeCustomerId) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd &&
    userSubscription.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS >
      Date.now() / 1000;

  return !!isValid;
};
