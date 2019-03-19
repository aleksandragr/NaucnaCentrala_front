<template lang="html">

  <div>
    <b-navbar toggleable="md" type="dark" variant="info" class="nav">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      
        <b-navbar-brand href="#">Scientific centre</b-navbar-brand>
      
        <b-collapse is-nav id="nav_collapse">
      
          <b-navbar-nav>
              <router-link class="nav-link" to="/mainpage/magazines" v-if="state===true">All magazines</router-link>
              <router-link class="nav-link" to="/mainpage/search" v-if="state===true">Search</router-link>
          </b-navbar-nav>
      
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <router-link class="nav-link" to="/mainpage/tasks" v-if="state===true">Tasks</router-link>
            <router-link class="nav-link" to="/mainpage/registration" v-if="state===false">Registration</router-link>
            <router-link class="nav-link" to="/mainpage/login" v-if="state===false">Login</router-link>
            <router-link class="nav-link" to="/mainpage/profile" v-if="state===true"><i class='fas fa-user-alt'></i> Profile</router-link>
            <b-nav-item v-on:click="logout()" v-if="state===true"><i class='fas fa-user-alt-slash'></i> Logout</b-nav-item>
            
          </b-navbar-nav>
      
        </b-collapse>
    </b-navbar>
    
    <router-view/>

  </div>

</template>

<script lang="js">

import Vue from 'vue'
import Registration from '../user/Registration';
import Loginn from '../user/Login';
import AllMagazines from '../magazine/AllMagazines';
import { Navbar } from 'bootstrap-vue/es/components';
import VueCookie from "vue-cookie";
import axios from "axios";

Vue.use(VueCookie);
Vue.use(Navbar);



  export default  {
    name: 'Main-page',
    props: [],
    mounted() {
      
    },
    data() {
      return {
        state:false
      }
    },
    methods: {
      logout(){
           
        this.$cookie.delete('token');     
        delete axios.defaults.headers.common["Authorization"];
        location.reload();
        window.location.href="http://localhost:8082/#/mainpage";
      }

    },
    beforeMount(){
      
      if(this.$cookie.get('token')!=null){
        this.state=true;
      }
      else{
        this.state=false;
      }
    }
}
</script>

<style scoped lang="scss">

.nav{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.5cm;
  
}
 
</style>
