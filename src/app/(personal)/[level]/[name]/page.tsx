import styles from "./page.module.scss";
import level from "@/interface/level-interface";
import subject from "@/interface/subject-interface";
import { Metadata } from "next";
import moment from "moment";

export const revalidate = 3600;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getTimetable = async (params: { name: string }) => {
  const timetableData = await fetch("http://localhost:3000/test.json");

  const timetable: subject[] = await timetableData.json();

  //   await delay(3000);
  return {
    timetable: timetable.filter((s) => s.lv_tt_code === params.name),
  };
};

export default async function TimetableDisplay({
  params,
}: {
  params: { name: string };
}) {
  const content = await getTimetable(params);

  return (
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
            <div className={`${styles.level} ${!isFirst ? styles.after : ""}`}>
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
  );
}
