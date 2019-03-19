<template lang="html">

  <div class="velikidiv" >
      <br>
      <div class="row polja" style="margin-top: 0.5cm; " >
        <div class="col-lg-4">
          <label>Heading of labor</label>
          <br>
          <label>Key terms</label>
          <br>
          <label>Abstract</label>
        </div>
        <div class="col-lg-4">
          <input class="form-control" v-model="data.naziv" disabled>
          
          <input class="form-control" v-model="data.kljucnereci" disabled> 
          
          <input class="form-control" v-model="data.apstrakt" disabled> 
        </div>
        <div class="col-lg-4">
          <button v-on:click="relevantornot('relevant')" class="btn btn-success" style="margin-right:1cm; margin-left:1cm;  margin-top: 0.2cm">Relevant</button>
          
          <button v-on:click="relevantornot('notrelevant')" class="btn btn-danger" style=" margin-top: 0.2cm">Not relevant </button>
        </div>
      </div>

  </div>

  

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'review-labor',
    props: [],
    mounted() {

    },
    data() {
      return {
        data:[]
      }
    },
    methods: {

      relevantornot(yesorno){
        console.log(yesorno);

        var taskid = localStorage.getItem('noviTaskId');

        http
          .get("/tasks/relevant/"+taskid+"/"+yesorno,{
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
            console.log(response.data.naziv)
            //console.log(response.data.formFields[0].id + "    form fields")
            //console.log(response.data.taskId)
          })
          .catch(e => {
            console.log(e);
          })

      }

    },
    computed: {

    },
    beforeMount(){
      
      this.getData();
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
</style>
