<template lang="html">

  <div class="velikidiv">
    <div v-for="r in retval" class="row">
      

      <div class="col-lg-3" style="margin-top:0.3cm">
          
        <div v-if="r.name==='komentarurednika'" style="margin-top:0.5cm">
          Comment
        </div>
        <div v-if="r.name==='pdf'" >
            PDF
        </div>
        <div v-if="r.name==='nazivrada'" >
            Heading of labor
        </div>
        <div v-if="r.name==='koautori'" >
            Coauthors
        </div>
        <div v-if="r.name==='kljucnereci'" >
            Key terms
        </div>
        <div v-if="r.name==='naucnaoblast'" >
            Scientific area
        </div>
        <div v-if="r.name==='abstrakt'" >
            Abstract
        </div>
        

      </div>
      <div class="col-lg-9">
        <div v-if="r.name==='komentarurednika'">
          <br>
            <textarea class="form-control" :value="r.value" disabled></textarea>
        </div>
        <div v-else-if="r.name==='pdf'">
            <input class="form-control" type="file" style="width: 15cm;" id="file" ref="file" v-on:change="handleFileUpload($event, file)"/>
        </div>
        <div v-else>
            <input disabled class="form-control" :value="r.value">
        </div>
      </div>
      
    </div>
    <br>
    <button type="submit" class="btn btn-primary" style="margin-left: 18cm;" v-on:click="izmeni()">Ok</button>

  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'change-data',
    props: [],
    mounted() {
      this.getData();
    },
    data() {
      return {
        retval:[],
        file: ''
      }
    },
    methods: {
      izmeni(){


        let formData = new FormData();
        formData.append('file', this.file);

        var taskId=localStorage.getItem('noviTaskId');

        http       
          .post("/tasks/uploadpdf/"+taskId,formData,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token'),
                'Content-Type': 'multipart/form-data'
              }
          })
          .then(response => {
            window.location.href="http://localhost:8082/#/mainpage/tasks";
            
          })
          .catch(e => {
            console.log(e);
          });








      },

      handleFileUpload(evt, index){
        this.file = evt.target.files[0];
        console.log(this.file);
      },
      getData(){

        var taskid = localStorage.getItem('noviTaskId');

        http
          .get("/tasks/datachange/"+taskid,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            this.retval=response.data;
            
          })
          .catch(e => {
            console.log(e);
          })



      }

    },
    computed: {

    },

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
