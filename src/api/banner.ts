import http from "@/utils/http";

/**
 * 保存
 * @param params
 * @returns
 */
export function save(params: any) {
  if (params.bannerNum) {
    return http.put("/manage/site/banner", params);
  } else {
    return http.post("/manage/site/banner", params);
  }
}

export function search(params: any) {
  return http.get("/manage/site/banner/page", params).then((data: any) => {
    data.bannerInfos.forEach((b: any) => {
      b.bannerNum += "";
    });
    data.datas = data.bannerInfos;
    delete data.bannerInfos;
    return data;
  });
}

/**
 * 批量删除
 * @param params id 的array
 * @returns
 */
export function deleteBanners(params: any) {
  return http.post("/manage/site/banner/deletes", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteBanner(id: any) {
  return http.delete("/manage/site/banner/" + id);
}

export function getBanners() {
  return http.get("/search/site/banner");
}
