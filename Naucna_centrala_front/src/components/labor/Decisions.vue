<template lang="html">

  <div class="velikidiv">
    <div class="row">
    <div class="col-lg-7"> 
        <hr>
        <div class="row">
    
            <label class="col-lg-3">Recommendation</label>
            <label class="col-lg-3">Comment</label>
            
           
        </div>
        <hr>
        <div v-for="m in marks" class="row" style="margin-top: 0.5cm"> 

          
            <label class="col-lg-3" >{{m.mark}}</label>
            <textarea disabled class="col-lg-3" style="margin-left: 2.3cm;">{{m.comment}}</textarea>
            
            
            
        </div>
    </div>

    <div class="col-lg-5" >
        <form style="margin-left: 3cm;">
          <input type="radio" v-model="odluka" name="gender" value="prihvatljivo">Acceptable<br>
          <input type="radio" v-model="odluka" name="gender" value="manje_izmene">Acceptable with smaller changes<br>
          <input type="radio" v-model="odluka" name="gender" value="vece_izmene">Acceptable with bigger changes<br>
          <input type="radio" v-model="odluka" name="gender" value="neprihvatljivo">Not acceptable<br>
        </form>
      </div>



    </div>
    <br>
    <br>
    <button style="margin-left: 20cm" class="btn btn-info" v-on:click="finish()">Finish</button>
  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'decisions',
    props: [],
    mounted() {
      this.getMarks();
    },
    data() {
      return {
        marks: [],
        odluka:''

      }
    },
    methods: {
      finish(){
        console.log(this.odluka);

        var taskid=localStorage.getItem('noviTaskId');

        http
          .get("/tasks/finaldecision/"+taskid+"/"+this.odluka,{
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


      },
      getMarks(){

        var taskid=localStorage.getItem('noviTaskId');

        http
          .get("/tasks/marks/"+taskid,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            this.marks=response.data;
           
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
    font-size: 0.44cm;
    width: 25cm;
    
  }

  div{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.46cm;
  
  }

  label{
  font-size: 0.49cm;
  margin-left: 2cm;
  size: 5cm;
  margin-top: 0.1cm;
  }

  input{
  height: 1cm;
  margin-top: 0.2cm;
  }
</style>
