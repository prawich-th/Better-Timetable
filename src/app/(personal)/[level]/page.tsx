import styles from "../../selector.module.scss";
import Link from "next/link";
import NotFound from "../../not-found";
import level from "../../../interface/level-interface";
import { cookies } from "next/headers";

export const revalidate = 3600;

const getClass = async (level: string) => {
  const data = await fetch(
    "https://school-management-api.xeersoft.co.th/api/timetable/allyesr"
  );
  let content: level[] = await data.json();
  const yearName: level | undefined =
    content.find((c) => c.lv_tt_code === level) || undefined;
  content = content.filter(
    (i: { lv_tt_code: string; lv_is_main: number }) =>
      i.lv_tt_code.startsWith(level) && !i.lv_is_main
  );

  if (!yearName) {
    throw new Error("Class is Not Found");
  }

  return {
    yearName,
    content,
  };
};

export default async function Timetable({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const id = (await params).level;
  /y[0-9]+/.test(id);
  const content = await getClass(id);
  const cookieData = await cookies();

  const pinnedLevel = cookieData.get("pin-level");

  if (pinnedLevel?.value) pinnedLevel.value = JSON.parse(pinnedLevel.value);
  let previousTime = "";

  console.log({ pinnedLevel });

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1>{content.yearName?.lv_title || id}</h1>
      </div>
      <main>
        {content.content.length > 0 ? (
          content.content.map((element: any) => {
            console.log(element);

            return (
              <Link
                key={element.lv_tt_code}
                href={`/${content.yearName.lv_tt_code}/${element.lv_tt_code}`}
              >
                <div className={styles.level}>
                  <h3>{element.lv_title}</h3>
                </div>
              </Link>
            );
          })
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  );
}
