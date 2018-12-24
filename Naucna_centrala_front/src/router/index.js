import Vue from 'vue'
import Router from 'vue-router'
import Registration from '../components/user/Registration'
import Login from '../components/user/Login'
import MainPage from '../components/mainPage/MainPage';
import AllMagazines from '../components/magazine/AllMagazines';

import VueCookie from "vue-cookie";

Vue.use(VueCookie);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/mainpage',
      name: 'Main-page',
      component: MainPage,
      children: [
        { path: 'login', component: Login},
        { path: 'registration', component: Registration},
        {path: 'magazines', component: AllMagazines}
      ]
    }
    
    
    
  ]
})
