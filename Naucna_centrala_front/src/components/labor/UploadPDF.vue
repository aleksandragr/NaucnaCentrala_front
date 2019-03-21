<template lang="html">

    <div class="velikidiv">
        <div class="row">
              <div class="col-lg-6"> 
                  
                  <div class="row">
                      <label class="col-lg-6" >Comments from reviewers</label>     
                  </div>
                  <hr>
                  <div v-for="c in comments" class="row" style="margin-top: 0.5cm; margin-left: 0cm"> 
                      <textarea style="width:5cm;" disabled class="col-lg-6">{{c.comment}}</textarea> 
                  </div>
              </div>
          
              <div class="col-lg-6" >
                  <input class="form-control" id="file" ref="file" v-on:change="handleFileUpload()" style="width: 15cm; margin-top: 1cm;" type="file"   >
                  
                  <div style="margin-top: 1.6cm">
                    Enter your comments
                  </div>
                  <div>
                    <textarea v-model="komentar" style="width:10cm; height:2cm;"></textarea>
                  </div>
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
    name: 'upload-pdf',
    props: [],
    mounted() {
      this.getComments();
    },
    data() {
      return {
        comments:[],
        file: '',
        komentar: ''
      }
    },
    methods: {
      finish(){

        let formData = new FormData();
        formData.append('file', this.file);

        var taskId=localStorage.getItem('noviTaskId');

        var f1={};

        f1={
          "name":"answer_from_author",
          "value":this.komentar
        };

        http       
          .post("/tasks/addauthorcomment/"+taskId,f1,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
              //------------------------------
              

        

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




              //-------------------------------
          })
          .catch(e => {
            console.log(e);
          });





      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      getComments(){

        var taskid=localStorage.getItem('noviTaskId');

        http
          .get("/tasks/getcomments/"+taskid,{
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

  label{
  font-size: 0.49cm;
  
  }
</style>
