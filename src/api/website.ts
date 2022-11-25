import http from "@/utils/http";
import { groupStore } from "@/store/group";

/**
 * 保存
 * @param params
 * @returns
 */
export function save(params: any) {
  if ((params instanceof FormData && params.has("siteId")) || params.siteId) {
    return http.put("/manage/site", params);
  } else {
    return http.post("/manage/site", params);
  }
}

export function search(params: any) {
  return http.get("/manage/site/page", params).then((data: any) => {
    const store = groupStore();
    const { groups } = store;
    const catalog: any = {};
    groups.forEach((g) => {
      catalog[g.catalogId] = g.catalogName;
    });
    data.siteInfos.forEach((site: any) => {
      site.catalogName = catalog[site.catalogId];
    });
    data.datas = data.siteInfos;
    delete data.siteInfos;
    return data;
  });
}

/**
 * 批量删除
 * @param params id 的array
 * @returns
 */
export function deleteWebsites(params: any) {
  return http.post("/manage/site/deletes", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteWebsite(id: any) {
  return http.delete("/manage/site/" + id);
}

export function getSiteTages() {
  return http.get("/manage/site/tags").then((data) => {
    return data as unknown as any[];
  });
}
