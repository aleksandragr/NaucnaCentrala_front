<template lang="html">

  <div class="velikidiv">

  <div class="row">

      <div class="col-lg-4">

        <label> 
          Comment for author
        </label>
        <textarea v-model="komentarautoru" class="form-control" ></textarea>

        <label> 
            Comment for editor
        </label>
        <textarea v-model="komentareditoru" class="form-control" ></textarea>

        



      </div>

      <div class="col-lg-2">
          <button class="btn btn-light" style="margin-top: 1.1cm; margin-left:2.6cm;"><a :href="pdfurl">PDF</a></button>
      </div>

      <div class="col-lg-5" >
        <form style="margin-left: 3cm;">
          <input type="radio" v-model="preporuka" name="gender" value="Prihvatljivo">Acceptable<br>
          <input type="radio" v-model="preporuka" name="gender" value="Manje izmene">Acceptable with smaller changes<br>
          <input type="radio" v-model="preporuka" name="gender" value="Vece izmene">Acceptable with bigger changes<br>
          <input type="radio" v-model="preporuka" name="gender" value="Nije prihvatljivo">Not acceptable<br>
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
    name: 'task-reviewer',
    props: [],
    mounted() {
      this.getPDFurl();
    },
    data() {
      return {
        pdfurl: '',
        komentarautoru:'',
        komentareditoru:'',
        fields: [],
        preporuka:''
      }
    },
    methods: {
      finish(){
        console.log(this.komentarautoru+ "  autor");
        console.log(this.komentareditoru+ "  editor");
        console.log(this.preporuka+ "    preporuka")

        var f1 ={};
        var f2 ={};
        var f3={};

        f1={
          "name":"r_komentaruredniku",
          "value":this.komentareditoru
        };

        f2={
          "name":"r_komentarautoru",
          "value":this.komentarautoru
        }

        f3={
          "name":"r_preporuka",
          "value":this.preporuka
        }

        this.fields.push(f1);
        this.fields.push(f2);
        this.fields.push(f3);



        var taskId=localStorage.getItem('noviTaskId');
        http       
          .post("/tasks/reviewertask/"+taskId,this.fields,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            window.location.href="http://localhost:8082/#/mainpage/tasks";
            
          })
          .catch(e => {
            console.log(e);
          });









      },
      getPDFurl(){

          var taskid=localStorage.getItem('noviTaskId');

          http
            .get("/tasks/pdf/"+taskid,{
              headers:{
                  Authorization: 'Bearer '+this.$cookie.get('token') 
              }

            })
            .then(response => {
              this.pdfurl=response.data;
            
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
