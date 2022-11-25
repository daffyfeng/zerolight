export const tableHeaders: any = {
  group: [
    { prop: "catalogName", label: "分组名称", width: "300px" },
    { prop: "catalogDesc", label: "分组说明", width: "auto" },
  ],
  website: [
    { prop: "siteName", label: "网站名称", width: "auto" },
    { prop: "catalogName", label: "所属分组", width: "auto" },
    { prop: "siteAddress", label: "网站地址", width: "auto" },
    { prop: "siteDesc", label: "网站简介", width: "200px" },
  ],
  banner: [
    { prop: "bannerOrder", label: "排序号", width: "100px" },
    { prop: "bannerDesc", label: "说明", width: "auto" },
    { prop: "bannerLink", label: "跳转链接", width: "auto" },
    { prop: "bannerCreateTime", label: "日期", type: "date", width: "200px" },
  ],
};
