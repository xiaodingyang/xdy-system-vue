import { baseAxios } from '../http';
import { queryString } from '@/utils';
export default {
  // 登录获取验证码
  captcha() {
    return baseAxios.get('/user/captcha');
  },
  // 登录
  login(params) {
    return baseAxios.post('/user/login',params);
  },
  // 获取用户信息
  info() {
    return baseAxios.get('/user/info');
  },

  // 获取路由，不分页
	getMenu(params) {
		return baseAxios.get('/menu/tree', {params})
	},
  
};
