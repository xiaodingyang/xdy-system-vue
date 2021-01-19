/**************index.vue是用来编写组件的文件，index.js是对外引用，导出文件*************/ 

import edit from './index.vue';

/* istanbul ignore next */
edit.install = function(Vue) {
  Vue.component(edit.name, edit);
};

export default edit;