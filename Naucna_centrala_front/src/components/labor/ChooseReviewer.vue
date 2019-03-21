<template lang="html">
  <div class="velikidiv">
  <label v-if="dva===true" style="color: red; font-size: 0.7cm">You must add a minimum of two reviewers !!</label>
  <br>
  <br>
  <div class="row">
    
    <label class="col-lg-1">Name</label>
    <label class="col-lg-1">Surname</label>
    <label class="col-lg-3">Scientific area</label>
    <button class="col-lg-1 btn btn-info" v-on:click="filter()">Filter</button>
    <button class="col-lg-1 btn btn-info" v-on:click="getReviewers()" style="margin-left: 10px;">Reviewers</button>
    <button class="col-lg-1 btn btn-success" v-on:click="finish()" style="margin-left: 70px;">Finish</button>
  </div>
  <hr>
  <div v-for="r in reviewers" class="row">
    <label class="col-lg-1">{{r.name}}</label>
    <label class="col-lg-1">{{r.surname}}</label>
    <label class="col-lg-3">{{r.scientificarea}}</label>
    <button v-if="add===true" style="height: 1cm" class="btn btn-warning" v-on:click="addR(r.id)">Add</button>
    <br>
    
  </div>
  <div class="row">
    
  </div>
  </div>  

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'choose-reviewer',
    props: [],
    mounted() {
      this.getReviewers();
    },
    data() {
      return {
        reviewers:[],
        add: false,
        odabraniR: [],
        dva: false

      }
    },
    methods: {
      finish(){

        var taskId=localStorage.getItem('noviTaskId');

        if(this.odabraniR.length<2){
          this.dva=true;
        }else{
          this.dva=false;

          http
          .post("/tasks/addreviewers/"+taskId,this.odabraniR,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            window.location.href="http://localhost:8082/#/mainpage/tasks";
            
          })
          .catch(e => {
            console.log(e);
          })


        }

      },
      addR(id){
        console.log(id)

        this.odabraniR.push(id);
        console.log(this.odabraniR.length +   "   duzina");
        

      },
      filter(){

        var taskId=localStorage.getItem('noviTaskId');
        

        http
          .get("/tasks/filter/"+taskId,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            this.add=true;
            this.reviewers=response.data;
            
          })
          .catch(e => {
            console.log(e);
          })

      },
      getReviewers(){

        var taskId=localStorage.getItem('noviTaskId');
        this.add=false;

        http
          .get("/tasks/getreviewer/"+taskId,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            this.reviewers=response.data;
            
          })
          .catch(e => {
            console.log(e);
          })


      }

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .velikidiv{
    margin-left: 8cm;
    
    margin-top: 1.7cm;
    font-size: 0.47cm;
    width: 25cm;
    
  }

  div{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.5cm;
  
  }

  label{
  font-size: 0.54cm;
  margin-left: 2cm;
  size: 5cm;
  margin-top: 0.1cm;
  }

  input{
  height: 1cm;
  margin-top: 0.2cm;
  }
</style>
