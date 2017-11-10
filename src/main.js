// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// 引用vue-router 赋值给变量VueRouter
import VueRouter from 'vue-router';
// 引入goods组件
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
//  引入全局stylus
import 'common/stylus/index.styl';
//  引用vue-resource插件
import vueResource from 'vue-resource';

//  全局注册vue-resource
Vue.use(vueResource);

// 1.使用Vue.use 安装vue-router插件
Vue.use(VueRouter);

// 2.定义路由:注意:值是routes 不是 routers。输入routers会导致页面空白无法跳转
const routes = [
  // 重定向默认路由
  {path: '/', redirect: 'goods'},
  { path: '/goods', component: goods },
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];

// 3.创建router实例
const router = new VueRouter({
  routes,
  // Router 构造配置重新构造linkActiveClass。router-link-active修改为class "active"
  linkActiveClass: 'active'
});

// 4.创建挂载根实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
