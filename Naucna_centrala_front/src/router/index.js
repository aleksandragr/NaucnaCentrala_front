import Vue from 'vue'
import Router from 'vue-router'
import Registration from '../components/user/Registration'
import Login from '../components/user/Login'
import MainPage from '../components/mainPage/MainPage';
import AllMagazines from '../components/magazine/AllMagazines';
import ProfilePage from '../components/user/ProfilePage'
import Search from '../components/labor/Search'
import Tasks from '../components/user/Tasks';
import NewAddLabor from '../components/magazine/NewAddLabor';
import AddLabor from '../components/magazine/AddLabor';
import ReviewLabor from '../components/labor/ReviewLabor'
import ReviewPDF from '../components/labor/ReviewPDF';
import ChangeData from '../components/labor/ChangeData';
import ChooseReviewer from '../components/labor/ChooseReviewer';
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
        { path: 'magazines', component: AllMagazines},
        { path: 'profile', component: ProfilePage},
        { path: 'search', component: Search},
        { path: 'tasks', component: Tasks},
        { path: 'addlabor', component: NewAddLabor},
        { path: 'proba', component: AddLabor},
        { path: 'review', component: ReviewLabor},
        { path: 'reviewpdf', component: ReviewPDF},
        { path: 'changedata', component: ChangeData},
        { path: 'choose', component: ChooseReviewer}

      ]
    }
    
    
    
  ]
})
