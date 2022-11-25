import type { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/login",
    method: "post",
    response: () => {
      return {
        code: "1",
        message:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJEYW1vbiIsImV4cCI6MTY2NzcwMjA0NCwic3ViIjoiMTIzIiwiaWF0IjoxNjY3Njk4NDQ0fQ.MdV_xMBAMhak4ppYKs4fZTtg-G06UqJdl8eY60xxExs",
      };
    },
  },
] as MockMethod[];
