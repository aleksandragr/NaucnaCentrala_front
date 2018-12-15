import Vue from 'vue'
import Router from 'vue-router'
import Registration from '../components/user/Registration'
import Login from '../components/user/Login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    
    
  ]
})
