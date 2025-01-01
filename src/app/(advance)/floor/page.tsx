import { cookies } from "next/headers";
import SetFloor from "./set-default-floor";

export default async function floorView({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  const data = await searchParams;
  const cookiesStore = await cookies();
  const defaultFloor = cookiesStore.get("floor");
  console.log({ defaultFloor });
  return (
    <div className="">
      <SetFloor />
    </div>
  );
}
