<template lang="html">

  <div>
    <b-navbar toggleable="md" type="dark" variant="info" class="nav">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      
        <b-navbar-brand href="#">Scientific centre</b-navbar-brand>
      
        <b-collapse is-nav id="nav_collapse">
      
          <b-navbar-nav>
              <router-link class="nav-link" to="/mainpage/magazines">All magazines</router-link>
            
          </b-navbar-nav>
      
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <router-link class="nav-link" to="/mainpage/registration">Registration</router-link>
            <router-link class="nav-link" to="/mainpage/login">Login</router-link>
            <b-nav-item v-on:click="logout()" v-if="state">Logout</b-nav-item>
            
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
        state:true
      }
    },
    methods: {
      logout(){
        console.log("logout");    
        this.$cookie.delete('token');     
        delete axios.defaults.headers.common["Authorization"];
        
      },
      getUnits: function(){
        console.log(this.state+ "main");
        
      },
      pozovi(){
        console.log( Loginn.data.stanje + " aaaaaa");
      }

    },
    beforeMount(){
      this.getUnits()
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">

.nav{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.5cm;
}
 
</style>
