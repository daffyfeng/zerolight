import type { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/manage/site/access/top/10",
    method: "get",
    response: () => {
      return [
        {
          site_name: "网站A",
          site_id: 1000046,
          access_num: 110,
        },
        {
          site_name: "网站B",
          site_id: 1000047,
          access_num: 68,
        },
        {
          site_name: "网站C",
          site_id: 1000047,
          access_num: 50,
        },
        {
          site_name: "网站D",
          site_id: 1000047,
          access_num: 32,
        },
        {
          site_name: "网站E",
          site_id: 1000047,
          access_num: 3,
        },
      ];
    },
  },
] as MockMethod[];
