<template lang="html">

    <div class="container">
        
        <p>kkk</p>
        <div class="card bg-light">
        <article class="card-body mx-auto" style="max-width: 400px;">
          <h4 class="card-title mt-3 text-center">Create Account</h4>
          <br>
          <form>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
              </div>
                 <input name="" v-model="user.name"class="form-control" placeholder="Name" type="name">
            </div>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                   <input name="" v-model="user.surname"class="form-control" placeholder="Surname" type="text">
            </div>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                   <input name="" v-model="user.city"class="form-control" placeholder="City" type="text">
            </div>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                   <input name="" v-model="user.country"class="form-control" placeholder="Country" type="text">
            </div>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                  <input name="" v-model="user.email" class="form-control" placeholder="Email address" type="email">
              </div> <!-- form-group// -->
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
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
            </div>
                <input v-model="user.confirmP"class="form-control" placeholder="Repeat password" type="password">
            </div> <!-- form-group// -->                                      
            <div class="form-group">
                <button v-on:click="registration()" class="btn btn-primary btn-block"> Create Account  </button>
            </div> <!-- form-group// -->      
            <p class="text-center">Have an account? <a href="">Log In</a> </p>                                                                 
        </form>
        </article>
        </div> <!-- card.// -->
        
    </div> 

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'Registration',
    props: [],
    mounted() {

    },
    data() {
      return {
        user: {
          name: "",
          surname: "",
          city: "",
          country: "",
          email: "",
          username: "",
          password: "",
          confirmP: ""

        },
        submitted: false
      };
    },
    methods: {
      registration() {
        var data = {
          name: this.user.name,
          surname: this.user.surname,
          city: this.user.city,
          country: this.user.country,
          email: this.user.email,
          username: this.user.username,
          password: this.user.password,
          confirmP: this.user.confirmP
        };

        http
          .post("/user/sign-up", data)
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

  .divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;   
    z-index: 2;
}
.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}



</style>
