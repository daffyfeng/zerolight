import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import banner from "./src/mock/banner";
import group from "./src/mock/group";
import home from "./src/mock/home";
import login from "./src/mock/login";
import website from "./src/mock/website";

export function setupProdMockServer() {
  // 这个是用来注册mock的，当在生产中使用mock时，很重要
  createProdMockServer([...banner, ...group, ...home, ...login, ...website]);
}
