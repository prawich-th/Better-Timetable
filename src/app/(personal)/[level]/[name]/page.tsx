import styles from "./page.module.scss";
import level from "@/interface/level-interface";
import subject from "@/interface/subject-interface";
import { Metadata } from "next";
import moment from "moment";

export const revalidate = 3600;

const getTimetable = async (params: { name: string }) => {
  const timetableData = await fetch("http://localhost:3000/test.json");
  const levelData = await fetch(
    `https://school-management-api.xeersoft.co.th/api/timetable/level/${params.name}`
  );
  const timetable: subject[] = await timetableData.json();
  const level: level = await levelData.json();
  return {
    timetable: timetable.filter((s) => s.lv_tt_code === params.name),
    level,
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const data = await params;

  const content = await getTimetable(data);

  return { title: `${content.level.lv_title} | Timetable` };
}

export default async function TimetableDisplay({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const data = await params;

  const content = await getTimetable(data);

  return (
    <div className={styles.page}>
      <div className={styles.head}>
        <h1>{content.level.lv_title}</h1>
        <p>{moment(content.timetable[0].tt_datetime).format("dddd")}</p>
      </div>
      <main>
        {content.timetable.map((subject, i, all) => {
          // console.log(subject);

          const [startTime, endTime, duration] = [
            moment(subject.tt_datetime).format("HH:mm"),
            moment(subject.tt_datetime)
              .add(subject.tt_duration, "s")
              .format("HH:mm"),
            moment.duration(subject.tt_duration, "s").asMinutes(),
          ];
          console.log({ startTime, endTime, duration });
          const isFirst = all[i - 1]?.tt_datetime ?? "" !== subject.tt_datetime;
          return (
            <div key={subject.tt_id}>
              {isFirst ? <h2>{startTime}</h2> : <></>}
              <div
                className={`${styles.level} ${!isFirst ? styles.after : ""}`}
              >
                <h3>
                  {subject.tt_title.split("by")[0]}{" "}
                  <span>{subject.tt_title.split("by")[1]}</span>
                </h3>

                <p>
                  <em>at</em> {subject.fl_name} | {subject.room}
                </p>
                <p>
                  {startTime} - {endTime}{" "}
                  <span className="duration">({duration} mins)</span>
                </p>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
