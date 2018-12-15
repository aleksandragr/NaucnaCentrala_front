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
            </div> <!-- form-group// -->
            
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
              </div>
                <input v-model="user.password" class="form-control" placeholder="Create password" type="password" >
            </div> <!-- form-group// -->
                                                 
            <div class="form-group">
                <button v-on:click="login()" class="btn btn-primary btn-block"> Login  </button>
            </div> <!-- form-group// -->      
            <p class="text-center">Are you not registered? <a href="">Sign up</a> </p>                                                                 
        </form>
        </article>
        </div> <!-- card.// -->
        
    </div> 

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'Login',
    props: [],
    mounted() {

    },
    data() {
      return {
        user: {
          username: "",
          password: ""
        },
        submitted: false

      };
    },
    methods: {
      login() {
        var data = {
          username: this.user.username,
          password: this.user.password
          
        };

        http
          .post("/user/login", data)
          .then(response => {
            console.log(response.data);
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
  
</style>
