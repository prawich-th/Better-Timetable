"use server";

import { cookies } from "next/headers";

export const pinLevel = async (previousState: any, formData: FormData) => {
  const cookieData = await cookies();
  const level = formData.get("levelID");

  const newData = JSON.stringify(["y13-medb"]);

  console.log({ previousState, newData });

  cookieData.set("pin-level", newData);

  return;
};

export const unPinLevel = async (previousState: any, formData: FormData) => {
  const cookieData = await cookies();
  const level = formData.get("level");

  // filter

  console.log({ previousState });

  cookieData.set("pin-level", JSON.stringify([]));

  return;
};
