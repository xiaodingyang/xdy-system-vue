/**
 * Note: 路由配置项
 *
 * type: 0 || 1                  // 当设置 0 的时候菜单目录，设置为1是按钮路由(该路由不会再侧边栏出现) 如401，login等页面，或者如一些编辑页面/edit/1
 * name:'index'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    label: '首页'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'el-icon-s-home'             // 设置该路由的图标
    affix: true                 // tagView 固定导航，只有首页才是
  }
 */
// 路由懒加载
function loadView(path) {
	return (resolve) => require([`@/${path}`], resolve)
}
export default [
    {
        path: '/',
        component: loadView('views/Dashboard/index.vue'),
        children: [
            {
                path: '/',
                redirect:'/index',
                name: 'index',
                component: loadView('views/Dashboard/Home/index.vue'),
            },
            {
                path: '/index',
                name: 'index',
                meta:{
                    affix: true,
                    title:'首页',
                    icon: 'el-icon-s-home',
                    type:1,
                },
                component: loadView('views/Dashboard/Home/index.vue'),
            },
            {
                path: '/table',
                name: 'table',
                meta:{
                    affix: true,
                    title:'表格',
                    icon: 'el-icon-s-home',
                    type:1,
                },
                component: loadView('views/x-table/index.vue'),
            },
            {
                path: '/edit',
                name: 'edit',
                meta:{
                    affix: true,
                    title:'表单编辑',
                    icon: 'el-icon-s-home',
                    type:1,
                },
                component: loadView('views/x-edit/index.vue'),
            },
        ]
    },
   
]
