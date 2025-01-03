import Image from "next/image";
import styles from "./selector.module.scss";
import Link from "next/link";
import Pinner from "./pinner";
import { cookies } from "next/headers";
import level from "@/interface/level-interface";

export default async function Home() {
  const data = await fetch(
    "https://school-management-api.xeersoft.co.th/api/timetable/allyesr"
  );
  let content: level[] = await data.json();

  const cookieData = await cookies();

  const pinnedLevel = cookieData.get("pin-level");

  let levelPinned: string[] = [];

  if (pinnedLevel?.value)
    levelPinned = JSON.parse(pinnedLevel.value) as string[];

  console.log({ levelPinned });

  return (
    <>
      <div className={styles.page}>
        <div className={styles.head}>
          <h1>All Year</h1>
          {/* <h2>Newton Sixth Form</h2> */}
        </div>
        <main>
          {content
            .filter((i) => i.lv_academic !== "Junior" && i.lv_is_main)
            .map((element) => {
              // console.log(element);

              return (
                <span key={element.lv_tt_code}>
                  <Link href={`/${element.lv_tt_code}`}>
                    <div className={styles.level}>
                      <h3>{element.lv_title}</h3>
                    </div>
                  </Link>
                  {/* <Pinner
                    id={element.lv_tt_code}
                    isPinned={levelPinned.includes(element.lv_tt_code)}
                  >
                    pin
                  </Pinner> */}
                </span>
              );
            })}
          <div
            style={{
              height: `${pinnedLevel?.value ? levelPinned.length * 5 : 0}rem`,
            }}
          ></div>
        </main>
      </div>
      {content
        .filter((i) => pinnedLevel?.value.includes(i.lv_tt_code))
        .map((s) => {
          return (
            <div key={s.lv_tt_code} className={`${styles.pin}`}>
              <Link key={s.lv_tt_code} href={`/${s.lv_tt_code}`}>
                <div className={`${styles.level}`}>
                  <h3>{s.lv_title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
}
