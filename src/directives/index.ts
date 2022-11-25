import directives from "./directives";

const install = (app: any) => {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key]);
  });
};

export default {
  install,
};
