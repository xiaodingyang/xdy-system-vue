/**************index.vue是用来编写组件的文件，index.js是对外引用，导出文件*************/ 

import tablePage from './index.vue';

/* istanbul ignore next */
tablePage.install = function(Vue) {
  Vue.component(tablePage.name, tablePage);
};

export default tablePage;