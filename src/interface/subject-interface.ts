export default interface subject {
  tt_id: number;
  tt_date: string;
  tt_title: string;
  crs_id: null;
  lv_id: string;
  fl_id: number;
  room: string;
  tt_time: `${number}${number}:${number}${number}:${number}${number}`;
  tt_time_sec: number;
  tt_datetime: string;
  tt_datetime_zone: string;
  tt_date_zone: `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
  tt_time_zone: `${number}${number}:${number}${number}:${number}${number}`;
  tt_duration: number;
  tt_duration_time: `${number}${number}:${number}${number}:${number}${number}`;
  tt_active: 0 | 1;
  tt_created: string;
  tt_created_by: number;
  tt_updated: string;
  tt_updated_by: number;
  lv_tt_code: string;
  lv_short_title: string;
  lv_title: string;
  lv_academic: "A-Level" | "IGCSE" | "Pre-IGCSE" | "Junior";
  lv_sort: number;
  fl_code: string;
  fl_name: string;
}
