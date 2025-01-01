"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function setDefaultFloor(previousState: any, formData: FormData) {
  const floor = formData.get("floor") as string;

  const cookieS = await cookies();

  cookieS.set("floor", floor);

  revalidatePath("/");
}
