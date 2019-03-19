<template lang="html">

  <div class="velikidiv" >
    <h1 style="color: rgb(111, 189, 235); " align="center">Add new labor</h1>
    <br>
    <div v-for="field,key in fields" class="row polja" style="margin-top: 0.5cm; " >
      

      <div class="col-lg-2">{{field.label}}</div>
      
      <div v-if="field.id==='kljucnereci'" class=" col-lg-10">

        <div class="row" >
              
              <div class="col-sm-5">
                  <input   class="form-control" style="width: 200px;" id="val"  type="text" placeholder="Key term">
              </div>
              <div class="col-sm-7">
                <button class="btn btn-primary" v-on:click="addkyepoint()">Add</button>
              </div>
        </div>
        <div class="row">
            <div class="col-sm-8">
              <button style="margin-right: 15px; margin-top: 10px; " class="btn btn-warning" v-for="(ke,index) of keypoint">{{ke}}</button>
            </div>
        </div>
      </div>
      <div v-else-if="field.id==='naucnaoblast'" class="col-lg-10">
          <select class="form-control" v-model="field.value.value" style="width: 15cm;" @change="handleChange" id="exampleFormControlSelect1" >
              <option  selected hidden>Select scientific area</option>
              <option class="form-control" v-for="i in scareas" :value="i.name" :data-foo="i.id">{{i.name}}</option>
          </select>
      </div>
      <div v-else-if="field.id==='abstrakt'" class="col-lg-10">
          <textarea v-model="field.value.value" class="form-control" style="width: 15cm;" rows="2"></textarea>
      </div>
      <div v-else-if="field.id==='pdf'" class="col-lg-10">
          <input type="file" style="width: 15cm;" id="file" ref="file" v-on:change="handleFileUpload($event, file)"/>
      </div>
      <div v-else class="col-lg-10">
          <input  v-model="field.value.value" style="width: 15cm;" class="form-control">
      </div>
    </div>
    

    <br>
    <button type="submit" class="btn btn-primary" style="margin-left: 18cm;" v-on:click="dodaj()">Add labor</button>

  </div>
  

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'new-add-labor',
    props: [],
    mounted() {

    },
    data() {
      return {
        fields: [],
        keypoint: [],
        scareas: [],
        file: '',
        idSca: null,
        addfields: [],
        putanja: ''
      }
    },
    methods: {
      dodaj(){

        let formData = new FormData();
        formData.append('file', this.file);

        var terms=[];
        for(var i=0;i<this.keypoint.length;i++) {
			 
			    if(i==(this.keypoint.length-1)) {
				    terms = terms+this.keypoint[i];
			    }
			    else {
				    terms = terms + this.keypoint[i] + ",";
			    }
		    }

        //var v = document.getElementById('file').value;

        for(var i=0; i<this.fields.length;i++){
          var f ={};
          
          if(this.fields[i].id==='kljucnereci'){
            if(terms!=''){
              console.log("usao")
              f={
              "name":this.fields[i].id,
              "value":terms
              };
            }
            
          }
          else{
            
            f={
            "name":this.fields[i].id,
            "value":this.fields[i].value.value
            };
          }
          
          this.addfields.push(f);
        }



        var taskId=localStorage.getItem('noviTaskId');
        http       
          .post("/labor/addNewLabor/"+taskId,this.addfields,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            //---------------------

            for(var k=0; k<this.fields.length;k++){
              this.fields[k].value='';
            }

            http
              .post("/labor/addPdfInLabor/"+response.data+"/"+taskId, formData,{
                headers: {
                  Authorization: 'Bearer ' + this.$cookie.get('token'),
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(response =>{
                window.location.href="http://localhost:8082/#/mainpage/tasks";
                
                
                 
              })
              .catch(e=> {
                console.log(e);
              })




            //------------------------
            
          })
          .catch(e => {
            console.log(e);
          });
      },
      handleFileUpload(evt, index){
        this.file = evt.target.files[0];
        console.log(this.file);
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
      getForma(){
        var taskid =localStorage.getItem('noviTaskId');

        http
          .get("tasks/fields/"+taskid,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            this.fields=response.data.formFields;
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
      this.getForma();
      this.getSca();
    }
}
</script>

<style scoped lang="scss">
  .velikidiv{
    margin-left: 8cm;
    
    margin-top: 1.6cm;
    font-size: 0.47cm;
    width: 25cm;
    
  }

  div{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.5cm;
  
  }

  .polja{
    margin-left:2cm;
  }
</style>
