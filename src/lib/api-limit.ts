import { MAX_FREE_COUNTS } from "@/constants";
import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const increaseApiLimit = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });
  if (userApiLimit) {
    return userApiLimit.count < MAX_FREE_COUNTS;
  } else {
    return true;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = await auth();

  if (!userId) return 0;

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });

  return userApiLimit ? userApiLimit.count : 0;
};
