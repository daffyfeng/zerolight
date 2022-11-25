import type { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/manage/site/catalog",
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
    url: "/mock/manage/site/catalog",
    method: "get",
    response: () => {
      return [
        {
          catalogId: 1003,
          catalogName: "文档",
          catalogDesc: "SDFSFD",
        },
        {
          catalogId: 1017,
          catalogName: "图片",
          catalogDesc: "picture",
        },
        {
          catalogId: 1018,
          catalogName: "视频",
          catalogDesc: "picture",
        },
        {
          catalogId: 1019,
          catalogName: "语言",
          catalogDesc: "picture",
        },
      ];
    },
  },
  {
    url: "/mock/search/sites",
    method: "get",
    response: () => {
      return [
        {
          catalogId: 1003,
          catalogName: "文档",
          catalogDesc: "SDFSFD",
        },
        {
          catalogId: 1017,
          catalogName: "图片",
          catalogDesc: "picture",
        },
        {
          catalogId: 1018,
          catalogName: "视频",
          catalogDesc: "picture",
        },
        {
          catalogId: 1019,
          catalogName: "语言",
          catalogDesc: "picture",
        },
      ];
    },
  },
  {
    url: /\/mock\/manage\/site\/catalog\/page/,
    method: "get",
    response: () => {
      return [
        {
          catalogId: 1003,
          catalogName: "video",
          catalogDesc: "SDFSFD",
        },
        {
          catalogId: 1016,
          catalogName: "video",
          catalogDesc: "picture",
        },
      ];
    },
  },
  {
    url: /\/mock\/manage\/site\/catalog/,
    method: "delete",
    response: () => {
      return {
        code: "1",
        message: "操作成功",
      };
    },
  },
  {
    url: /\/mock\/manage\/site\/catalog\/deletes/,
    method: "post",
    response: () => {
      return {
        code: "1",
        message: "操作成功",
      };
    },
  },
  {
    url: /\/mock\/manage\/site\/catalog/,
    method: "put",
    response: () => {
      return {
        code: "1",
        message: "操作成功",
      };
    },
  },
] as MockMethod[];
