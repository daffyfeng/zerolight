import http from "@/utils/http";

/**
 * 保存
 * @param params
 * @returns
 */
export function save(params: any) {
  if (params.catalogId) {
    return http.put("/manage/site/catalog", params);
  } else {
    return http.post("/manage/site/catalog", params);
  }
}

export function search(params: any) {
  return http.get("/manage/site/catalog/page", params).then((data: any) => {
    data.datas = data.bannerInfos;
    delete data.bannerInfos;
    return data;
  });
}

export function getAllGroups() {
  return http.get("/manage/site/catalog").then((data: any) => {
    return data as unknown as any[];
  });
}

/**
 * 批量删除
 * @param params id 的array
 * @returns
 */
export function deleteGroups(params: any) {
  return http.post("/manage/site/catalog/deletes", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteGroup(id: any) {
  return http.delete("/manage/site/catalog/" + id);
}
