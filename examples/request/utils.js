import { Message } from 'element-ui';
import Cookie from 'js-cookie';
// 提示框
export const message = (msg) => {
  Message({
    message: msg,
    duration: 1000,
    type: 'error',
  });
};
// 跳转登录页，携带当前页面路由，登陆完成后返回当前页
export const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};
/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
export const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message('登录过期，请重新登录');
      // 清除token
      Cookie.remove('token');
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      message('请求的资源不存在');
      break;
    // 500服务器异常
    case 500:
      message('服务器异常');
      break;
    default:
      console.log(other);
  }
};
