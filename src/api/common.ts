import http from "@/utils/http";

export function login(param: any) {
  return http.post("/login", param);
}

export function searchSite(param: any) {
  return http.get("/search/site/condition", param);
}

export function getGroups() {
  return http.get("/search/catalog").then((data) => {
    return data as unknown as any[];
  });
}

export function getBanners() {
  return http.get("/search/site/banners").then((data) => {
    return data as unknown as any[];
  });
}

export function getRecommendSites() {
  return http.get("/manage/site/recommend");
}

export function getWebsitesByCatalog(id: any) {
  return http.get("/search/site/catalog/" + id);
}

export function logSiteAccess(param: any) {
  return http.post("/manage/site/access", param);
}
