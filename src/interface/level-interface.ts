export default interface level {
  lv_id: number;
  lv_tt_code: string;
  lv_short_title: string;
  lv_title: string;
  lv_academic: "A-Level" | "IGCSE" | "Pre-IGCSE" | "Junior";
  lv_is_main: 0 | 1;
  lv_created: string;
  lv_sort: number;
  lv_tt_display: string;
  lv_tt_link: string;
}
