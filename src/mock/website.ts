import type { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/manage/site",
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
    url: /\/mock\/manage\/site\/page/,
    method: "get",
    response: () => {
      return [
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/1.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/2.png",
          siteTag: null,
        },
      ];
    },
  },
  {
    url: /\/mock\/search\/site\/catalog/,
    method: "get",
    response: () => {
      return [
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/1.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/2.png",
          siteTag: null,
        },
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/3.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/4.png",
          siteTag: null,
        },
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/5.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/6.png",
          siteTag: null,
        },
      ];
    },
  },
  {
    url: /\/mock\/search\/site\/condition/,
    method: "get",
    response: () => {
      return [
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/1.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/2.png",
          siteTag: null,
        },
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/3.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/4.png",
          siteTag: null,
        },
        {
          siteId: 1000046,
          siteName: "PDF转Word3454",
          catalogId: 1003,
          siteAddress:
            "https://www.ssssssss.org/magic-api/pages/base/script/#%E8%BF%90%E7%AE%97%E7%AC%A6",
          siteDesc: "SFAEFASDF",
          siteOrder: 3,
          siteIcon: "/img/5.png",
          siteTag: null,
        },
        {
          siteId: 1000061,
          siteName: "PDF转Word",
          catalogId: 1005,
          siteAddress: "http://localhost:8080/site/catalog",
          siteDesc: "SDFDFFD",
          siteOrder: 3,
          siteIcon: "/img/6.png",
          siteTag: null,
        },
      ];
    },
  },
] as MockMethod[];
