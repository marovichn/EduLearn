import { db } from "@/lib/db";

export const getAcess = async () => {
  try {
    const eduConnectionAccessToken1 =
      await process.env.NEXT_PUBLIC_EDU_CONNECTION_ACCESS_KEY?.slice(0, 30);
    const eduConnectionAccessToken2 =
      await process.env.NEXT_PUBLIC_EDU_CONNECTION_ACCESS_KEY?.slice(40, 70);

    return [eduConnectionAccessToken1, eduConnectionAccessToken2];
  } catch (error) {
    console.log("[GET_Acess]", error);
    return 0;
  }
};
