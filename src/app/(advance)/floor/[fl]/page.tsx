export default async function floorView({
  searchParams,
  params,
}: {
  searchParams: Promise<{ date: string }>;
  params: Promise<{ fl: string }>;
}) {
  const data = await searchParams;
  const floor = (await params).fl;

  console.log({ data, floor });
}
