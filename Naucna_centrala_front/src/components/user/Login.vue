<template lang="html">

    <div class="container">
        
        
        <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px;">
          <h4 class="card-title mt-3 text-center">Login</h4>
          <br>
          <form>
            
            
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> <i class="fa fa-user"></i> </span>
              </div>
                <input name="" v-model="user.username" class="form-control" placeholder="Username" type="text" >
            </div> 
            
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
              </div>
                <input v-model="user.password" class="form-control" placeholder="Password" type="password" >
            </div> 
                                                 
          </form>  
          <button v-on:click="login()" type="submit" class="btn btn-primary btn-block"> Login  </button>
             
          <p class="text-center">Are you not registered? <a href="">Sign up</a> </p>                                                                 
        
        </article>
        </div> 
        
    </div> 

</template>

<script lang="js">

import http from "../../router/http-common";
import Vue from 'vue'
import axios from "axios";
import {state} from '../mainPage/MainPage'


  export default  {
    name: 'Login',
    props: [
      
    ],  
    mounted() {

    },
    data() {
      return {
        user: {
          username: "",
          password: ""
        },
        submitted: false,
        stanje: false
      };
    },
    methods: {
      
      login() {
        var data = {
          username: this.user.username,
          password: this.user.password
          
        };

        http
          .post("/token/generate-token", data)
          .then(token => {
                       
            this.$cookie.set('token', token.data.token, 1);
            var tokenn  = this.$cookie.get('token')
            
            axios.defaults.headers.common['Authorization'] = 'Bearer '+tokenn;
           
            this.state=false;
            this.$router.push({ path: '/mainpage'});
            location.reload();
            
          })
          .catch(e => {
            console.log(e);
          });

        this.submitted=true;
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">

.container{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
  
</style>
