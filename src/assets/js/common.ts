export const tableHeaders: any = {
  group: [
    { prop: "catalogName", label: "分组名称", width: "300px" },
    { prop: "catalogDesc", label: "分组说明", width: "auto" },
  ],
  website: [
    { prop: "siteName", label: "网站名称", width: "250px" },
    { prop: "catalogName", label: "所属分组", width: "150px" },
    { prop: "siteAddress", label: "网站地址", width: "auto" },
    { prop: "siteDesc", label: "网站简介", width: "300px" },
    { prop: "siteTag", label: "标签", width: "200px", type: "tag" },
  ],
  banner: [
    { prop: "bannerOrder", label: "排序号", width: "100px" },
    { prop: "bannerDesc", label: "说明", width: "auto" },
    { prop: "bannerLink", label: "跳转链接", width: "auto" },
    { prop: "bannerCreateTime", label: "日期", width: "200px", type: "date" },
  ],
};
