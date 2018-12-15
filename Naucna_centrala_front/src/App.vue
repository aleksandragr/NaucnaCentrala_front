<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      
        <b-navbar-brand href="#">NavBar</b-navbar-brand>
      
        <b-collapse is-nav id="nav_collapse">
      
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>
      
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
      
           
            <b-nav-item href="/#/registration">Registration</b-nav-item>
            <b-nav-item href="/#/login">Login</b-nav-item>
            
          </b-navbar-nav>
      
        </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
  </template>



<script>

import Vue from 'vue'
import Registration from './components/user/Registration';
import Login from './components/user/Login';

import { Navbar } from 'bootstrap-vue/es/components';

Vue.use(Navbar);

export default {
  name: 'app',
  components: {
    Registration,
    Login
  }
}
</script>

<style>




</style>
