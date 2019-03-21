<template lang="html">

    <div class="velikidiv">
        <div class="row">
              <div class="col-lg-5"> 
                  
                  <div class="row">
                      <label class="col-lg-5" >Comments from reviewers</label>     
                  </div>
                  <hr>
                  <div v-for="c in comments.odautorazarez" class="row" style="margin-top: 0.5cm; margin-left: 0cm"> 
                      <textarea style="width:5cm;" disabled class="col-lg-5">{{c.comment}}</textarea> 
                  </div>
              </div>
          
              <div class="col-lg-5 " >
                <div class="row">
                  <div class="col-lg-5">
                      <label style="margin-top: 0.2cm">Heading of labor</label>
                      <br>
                      <label>Key terms</label>
                      <br>
                      <label>Abstract</label>
                    </div>
                    <div class="col-lg-5">
                      <input class="form-control" v-model="data.naziv" disabled>
                      
                      <input class="form-control" v-model="data.kljucnereci" disabled> 
                      
                      <input class="form-control" v-model="data.apstrakt" disabled> 
                    </div>
                </div>




                  
                  
                  <div style="margin-top: 1.6cm">
                    Author's comment
                  </div>
                  <div>
                    <textarea disabled  style="width:10cm; height:2cm;">{{this.comments.komodautora}}</textarea>
                  </div>
              </div>
              <div class="col-lg-2" >
                  <button class="btn btn-light" style="margin-top: 1.1cm; margin-left: 0.8cm; "><a :href="pdfurl">PDF</a></button>
                  <form style="margin-left: 0.8cm; margin-top: 3.5cm; font-size: 0.5cm;">
                    <input type="radio" v-model="odluka" name="gender" value="satisfied">Satisfied<br>
                    <input type="radio" v-model="odluka" name="gender" value="unsatisfied">Unsatisfied<br>
                   
                  </form>
              </div>
    
    
    
        </div>
        <br>
        <br>
        <button style="margin-left: 25cm" class="btn btn-info" v-on:click="finish()">Finish</button>
    </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'again-review',
    props: [],
    mounted() {
      this.getPDFurl();
      this.getData();
      this.getComments();
    },
    data() {
      return {
        pdfurl: '',
        data:[],
        comments:[],
        odluka:''
      }
    },
    methods: {
      finish(){
        console.log(this.odluka)
        var taskid=localStorage.getItem('noviTaskId');

          http
            .get("/tasks/isSatisfied/"+taskid+"/"+this.odluka,{
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
      getComments(){
        var taskid=localStorage.getItem('noviTaskId');

          http
            .get("/tasks/getAllcomments/"+taskid,{
              headers:{
                  Authorization: 'Bearer '+this.$cookie.get('token') 
              }

            })
            .then(response => {
              this.comments=response.data;
            
            })
            .catch(e => {
              console.log(e);
            })
      },
      getData(){
        var taskid=localStorage.getItem('noviTaskId');

          http
            .get("/tasks/data/"+taskid,{
              headers:{
                  Authorization: 'Bearer '+this.$cookie.get('token') 
              }

            })
            .then(response => {
              this.data=response.data;
            
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

    }
}
</script>

<style scoped lang="scss">
  .velikidiv{
    margin-left: 6cm;
    
    margin-top: 1.7cm;
    font-size: 0.44cm;
    width: 28cm;
    
  }

  label{
  font-size: 0.49cm;
  
  }
</style>
