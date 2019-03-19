<template lang="html">

  <div class="velikidiv" >
    <br>
    <div class="row polja" style="margin-top: 0.4cm; " >
      <div class="col-lg-5">
        
        <textarea placeholder="Enter a comment" v-model="komentar" class="form-control" style="width: 10cm; height:5cm" rows="2"></textarea>
      </div>
      <div class="col-lg-2">
         <button class="btn btn-light" style="margin-top: 2cm"><a :href="pdfurl">PDF</a></button>
         
      </div>
      <div class="col-lg-5">
        <button v-on:click="formatted('good')" class="btn btn-success" style="margin-right:1cm;   margin-top: 2cm">Well formatted</button>
        
        <button v-on:click="formatted('bad')" class="btn btn-danger" style=" margin-top: 2cm">Not well formatted</button>
      </div>
    </div>

  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'review-pdf',
    props: [],
    mounted() {

    },
    data() {
      return {
        pdfurl: '',
        komentar:''
      }
    },
    methods: {
      formatted(yesorno){
        console.log(yesorno);
        console.log(this.komentar+ "  komentar");

        var taskid = localStorage.getItem('noviTaskId');

        var f ={};
           
          f={
              "name":"komentarurednika",
              "value":this.komentar
          };
            

        http
          .post("/tasks/reviewpdf/"+taskid+"/"+yesorno,f,{
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

    },
    beforeMount(){
      
      this.getPDFurl();
    }
}
</script>

<style scoped lang="scss">
  .velikidiv{
    margin-left: 8cm;
    
    margin-top: 2cm;
    font-size: 0.47cm;
    width: 25cm;
    
  }

  div{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.5cm;
  
  }

  label{
  font-size: 0.6cm;
  margin-left: 2cm;
  size: 5cm;
  margin-top: 0.1cm;
  }

  input{
  height: 1cm;
  margin-top: 0.2cm;
  }

  a.nostyle:link {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }

  a.nostyle:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }


</style>
