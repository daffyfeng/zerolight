import type { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/manage/site/banner",
    method: "post",
    response: () => {
      return [
        {
          code: "1",
          message: "操作成功",
        },
      ];
    },
  },
  {
    url: /\/mock\/manage\/site\/banner\/page/,
    method: "get",
    response: () => {
      return [
        {
          bannerNum: 103,
          bannerDesc: "Banner23454",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/3.png",
          bannerOrder: 0,
          bannerCreateTime: null,
        },
        {
          bannerNum: 110,
          bannerDesc: "Banner23454",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/4.png",
          bannerOrder: 2,
          bannerCreateTime: "2022-11-06T03:14:35.000+00:00",
        },
      ];
    },
  },
  {
    url: /\/mock\/search\/site\/banner/,
    method: "get",
    response: () => {
      return [
        {
          bannerNum: 103,
          bannerDesc: "Banner1",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/1.png",
          bannerOrder: 1,
          bannerCreateTime: null,
        },
        {
          bannerNum: 110,
          bannerDesc: "Banner2",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/2.png",
          bannerOrder: 2,
          bannerCreateTime: "2022-11-06T03:14:35.000+00:00",
        },
        {
          bannerNum: 110,
          bannerDesc: "Banner23454",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/3.png",
          bannerOrder: 2,
          bannerCreateTime: "2022-11-06T03:14:35.000+00:00",
        },
        {
          bannerNum: 110,
          bannerDesc: "Banner23454",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/4.png",
          bannerOrder: 3,
          bannerCreateTime: "2022-11-06T03:14:35.000+00:00",
        },
        {
          bannerNum: 110,
          bannerDesc: "Banner5",
          bannerLink: "http://localhost:8080/site/catalog",
          bannerIcon: "/img/5.png",
          bannerOrder: 4,
          bannerCreateTime: "2022-11-06T03:14:35.000+00:00",
        },
      ];
    },
  },
] as MockMethod[];
