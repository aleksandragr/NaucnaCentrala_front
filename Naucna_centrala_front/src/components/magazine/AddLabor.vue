<template lang="html">

  <div class="glavni">
      <h1 style="color: rgb(111, 189, 235); " align="center">Add new labor</h1>
      <br>
      
          <div class="form-group">
            <label for="exampleInputEmail1">Heading of labor</label>
            <input v-model="labor.laborname" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter heading">
            
          </div>
          <div class="row" >
              <div class="col-sm-2">
                  <label style="width: 200px; font-size: 21px;">Key terms:</label>
              </div>
              <div class="col-sm-3">
                  <input  class="form-control" style="width: 200px;" id="val"  type="text" placeholder="Key term">
              </div>
              <div class="col-sm-6">
                <button class="btn btn-primary" v-on:click="addkyepoint()">Add</button>
              </div>
          </div>
          <div class="row">
            <div class="col-sm-8">
              <button style="margin-right: 15px; margin-top: 10px; " class="btn btn-warning" v-for="(ke,index) of keypoint">{{ke}}</button>
            </div>
          </div>
          <br>
          <div class="row">
              <div div class="col-sm-2">
                <label for="exampleInputEmail1">Scientific area:</label>
              </div>
              <div div class="col-sm-9">
                <select class="form-control" @change="handleChange" id="exampleFormControlSelect1" >
                  <option  selected hidden>Select scientific area</option>
                  <option class="form-control" v-for="i in scareas" value="'i.id'" :data-foo="i.id">{{i.name}}</option>
                </select>
              </div>
          </div>
          <div class="form-group">
              <label for="exampleInputEmail1">Abstract</label>
              <textarea v-model="labor.abstractt" class="form-control" id="exampleFormControlabstract1" rows="2"></textarea>
              
          </div>

          <div class="row">
              <div class="col-sm-1">
                  <label style="width: 200px; font-size: 21px;">PDF</label>          
              </div>
              <div class="col-sm-8">
                <input id="file" ref="file" v-on:change="handleFileUpload()" style="width: 15cm;"type="file"   >
              </div>
                    
          </div>




          
          <br>
          <button type="submit" class="btn btn-primary" v-on:click="add()">Add labor</button>
        
        
    
    
  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'add-labor',
    props: ['idmag'],
    mounted() {
      /*this.$watch('idmag', idmag => {

        this.getSca();
      }, {immediate:true})
      */
      this.getSca();

    },
    data() {
      return {
        keypoint: [],
        idSca: null,
        scareas: [],
        labor: {
          laborname: "",
          magazineid: null,
          scientificareaid: null,
          abstractt: "",
          keyterms: []
          
          

        },
        file: '',
      }
    },
    methods: {

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },

      add(){
        
        var v = document.getElementById('file').value;

        var data = {
          laborname: this.labor.laborname,
          magazineid: this.idmag,
          scientificareaid: this.idSca,
          keyterms: this.keypoint,
          abstractt: this.labor.abstractt,
          pdfname: v
          
        };

        http
          .post("/labor/addLabor", data,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          } 
          )
          .then(res => {
            
            console.log(res.data);
            console.log(res.data);
            this.labor.laborname='',
            this.idSca='',
            this.keypoint=[],
            this.labor.abstractt=''

            //dodavanje pdf-a

            let formData = new FormData();
            formData.append('file', this.file);
            let taskId = localStorage.getItem('noviTaskId');
            let processId = localStorage.getItem('processId');
            console.log(taskId + "   taskid kad se doda labor");
            http
              .post("/labor/addPdfInLabor/"+res.data+"/"+taskId+"/"+processId, formData,{
                headers: {
                  Authorization: 'Bearer ' + this.$cookie.get('token'),
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(response =>{
              
                http
                    .get("/tasks/addtask/"+res.data,{
                    headers: {
                        Authorization: 'Bearer ' + this.$cookie.get('token'),
                          'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(response =>{
              
                        
                
                 
                    })
                    .catch(e=> {
                          console.log(e);
                    })
                
                 
              })
              .catch(e=> {
                console.log(e);
              })


          })
          .catch(e => {
            console.log("Neuspesna registracija");
          });



        /*
        http
          .post("/laborES/addLaborr", data,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          } 
          )
          .then(res => {
            
            console.log(res.data);
            this.labor.laborname='',
            this.idSca='',
            this.keypoint=[],
            this.labor.abstractt=''

          })
          .catch(e => {
            console.log("Neuspesna registracija");
          });*/

      },

      handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            this.idSca = e.target.options[e.target.options.selectedIndex].dataset.foo
        }
      },

      addkyepoint(){
        var v = document.getElementById('val').value;
        this.keypoint.push(v);
        document.getElementById('val').value = '';
        
      },

      getSca(){
        var taskId=localStorage.getItem('noviTaskId');
        console.log(taskId);
        http       
          .get("/scientificArea/getSA/"+taskId,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            this.scareas=response.data;
            
          })
          .catch(e => {
            console.log(e);
          });
      }
      

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">



div{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.5cm;
  
}

.glavni{
  margin-top: 3cm;
  margin-left: 7cm;
  width: 25cm;
}

.select{
  width: 4cm;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
  
</style>
