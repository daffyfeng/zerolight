import http from "@/utils/http";

export function getTodayTop10(param: any) {
  return http.get("/manage/site/access/top/10", param);
}

export function getHistoryTop10() {
  return http.get("/manage/site/access/top/10");
}

export function getPV(dayNum?: number) {
  return http
    .get(`/manage/site/access/pv${dayNum ? "/" + dayNum : ""}`)
    .then((data) => {
      return data as unknown as any[];
    });
}

export function getUV(dayNum?: number) {
  return http
    .get(`/manage/site/access/uv${dayNum ? "/" + dayNum : ""}`)
    .then((data) => {
      return data as unknown as any[];
    });
}
