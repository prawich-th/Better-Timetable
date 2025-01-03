import styles from "./page.module.scss";
import level from "@/interface/level-interface";
import subject from "@/interface/subject-interface";
import { Metadata } from "next";
import moment from "moment";
import { Suspense } from "react";
import Loading from "./loading";

export const revalidate = 3600;

const getLevelData = async (name: string) => {
  const levelData = await fetch(
    `https://school-management-api.xeersoft.co.th/api/timetable/level/${name}`
  );

  return (await levelData.json()) as level;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const data = await params;

  const content = (await getLevelData(data.name)) as level;

  return { title: `${content.lv_title} | Timetable` };
}

export default async function TimetablePage({
  params,
  children,
}: {
  params: Promise<{ name: string }>;
  children: React.ReactNode;
}) {
  const data = await params;
  const leveldata = await getLevelData(data.name);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1>{leveldata.lv_title}</h1>
        <p></p>
      </div>
      <main>{children}</main>
    </div>
  );
}
