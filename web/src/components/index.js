import common from './common';
import content from './content';
// import WinUtils from './winUtils';

const components = {
  ...common,
  ...content,
};

const ui = {
  ...components,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(ui).forEach(key => {
    Vue.component(key, ui[key]);
  });

  // Vue.prototype.$WinUtils = WinUtils;
};


const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  install
};


export default API;