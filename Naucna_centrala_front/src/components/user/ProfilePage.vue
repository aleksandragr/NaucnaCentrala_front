<template lang="html">
  <div >
    <header>
      <h2>User profile</h2>
    </header>
    <div class="row">
      <div class="col-lg-3">
        <nav>
          <div >

          
            <button class="dugme btn btn-outline-warning" v-on:click="podaci()">Informations about user</button>
            <!--<button class="dugme btn btn-outline-warning" v-on:click="mytasks()">My tasks</button>-->
            <button v-if="provera===true" class="dugme btn btn-outline-warning" v-on:click="podaci2()">Membership Fee</button>
            <button v-if="provera===true" class="dugme btn btn-outline-warning" v-on:click="podaci3()">Transactions</button>
            <button v-if="provera===true" class="dugme btn btn-outline-warning" v-on:click="podaci4()">Purchased magazines and labors</button>
          </div>
          </nav>
      </div>

      <div class="prikaz col-lg-9" >

        <div v-if="information===true" class="row velikidiv">
          
          <div class="col-md-3">
            <label >Name:</label>
            
            <label >Surname:</label>
            
            <label >Username:</label>
          </div>

          <div class="col-md-2">
            <input v-model="korisnik.name" disabled/>
            
            <input v-model="korisnik.surname" disabled/>
            
            <input v-model="korisnik.username" disabled/>
          </div>

        </div>

        <!-- Membership fee-->
        <div v-if="membership===true" >
          

          <div class="row" style="margin-top: 1.7cm; margin-left: -2cm;"> 
            <div class="col-md-4" style="margin-top: 1.7cm; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-size: 0.5cm;">
              If you want to buy a membership fee, first you have to select the magazine !
              <br>
              <select class="select" @change="handleChange" id="exampleFormControlSelect1" >
                <option selected hidden>Select magazine</option>
                <option v-for="i in items" value="'i.id'" :data-foo="i.id">{{i.name}}</option>
              </select>
              <br>
              <br>
              <button style="margin-left: 1.7cm; width: 2cm;" class="btn btn-info" v-on:click="payment('clanarina')">Buy</button>
              
            </div>

            <div class="col-md-8" >
              <h2 align="center">Your membership fees</h2>
              <table class="table">
                <tr>
                  <th></th>
                  <th>Magazine</th>
                  <th>Start date</th>
                  <th>End date</th>
              
                </tr>
                <tr v-for="l, key in listaclanarina">
                  <th>{{++key}}</th>
                  <th>{{l.magazine.name}}</th>
                  <th>{{l.startDate}}</th>
                  <th>{{l.endDate}}</th>
                  
                  
                </tr>
              </table>
            </div>

          </div>




        </div>

        <!-- ///////////////////////////////////////////-->

        <div  v-if="transactions===true">

          <div v-if="trans===true" class="tabela">
            <h2 align="center">Your transactions</h2>

            <table class="table">
              <tr>
                <th></th>
                <th>Merchant</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
              <tr v-for="trans, key in transakcije">
                <th>{{++key}}</th>
                <th>{{trans.merchantmail}}</th>
                <th>{{trans.title}}</th>
                <th>{{trans.amount}} {{trans.currency}}</th>
                <th>{{trans.datetime}}</th>
                <th>{{trans.type}}</th>
                
              </tr>
            </table>
          </div>

          <div class="clan1" v-if="trans===false">
            You don't have transactions yet !
          </div>


        </div>


        <div v-if="kupljeno===true" class="tabela">

          <h2 align="center">Your purchesed magazines and labors</h2>

          <table class="table">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>PDF</th>
            </tr>
            <tr v-for="k, key in kupljeniP">
              <th>{{++key}}</th>
              <th>{{k.name}}</th>
              <th>{{k.type}}</th>
              <th><a :href="k.downloadurl">Download</a></th>
            </tr>
          </table>

          <!--
          <div class="container">
            <div class="large-12 medium-12 small-12 cell">
              <label>File
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              </label>
                <button v-on:click="submitFile()">Submit</button>
            </div>
          </div>
      
            <div id="singleFileUploadSuccess">
              <button v-on:click="downloadf()">sssss</button> 
          </div>
        -->

        </div>

        <div v-if="tasks===true">
          <Tasks></Tasks>
        </div>





      </div>

    </div>

  </div>
</template>

<script lang="js">

import http from "../../router/http-common";
import Tasks from "./Tasks"

  export default  {
    name: 'profile-page',
    props: [],
    mounted() {
      this.proveraRole();
    },
    components: {
      Tasks
    },
    data() {
      return {
        information: false,
        membership: false,
        transactions: false,
        clanarina: true,
        trans: true,
        kupljeno: false,
        korisnik: {
          name: "",
          surname: "",
          username: "",
          startDate: "",
          endDate: "",
          price: ""
        },
        transakcije: [],
        kupljeniP: [],
        file: '',
        listaclanarina: [],
        items: [],
        idmag: null,
        provera: "",
        tasks: false
      }
    },
    methods: {

      mytasks(){
        this.tasks=true;
        this.information=false;
        this.membership=false;
        this.transactions=false;
        this.kupljeno=false;
      },

      proveraRole(){

        http       
          .get("/editorreviewer/whoIsLoggedIn",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            
            if(response.data=='editor'){
              
              this.provera=false;
            }
            else{
              this.provera=true;
            }
            
          })
          .catch(e => {
            console.log(e);
          });
      },



      podaci(){
        
        this.information=true;
        this.membership=false;
        this.transactions=false;
        this.kupljeno=false;
        this.tasks=false;

        http       
          .get("/user/getInfo",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            this.korisnik.name=response.data.name;
            this.korisnik.surname=response.data.surname;
            this.korisnik.username=response.data.username;
            
          })
          .catch(e => {
            console.log(e);
          });

      },
      podaci2(){

        this.information=false;
        this.membership=true;
        this.transactions=false;
        this.kupljeno=false;
        this.tasks=false;
        

        http       
          .get("/user/getMSF",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            this.listaclanarina=response.data;

          })
          .catch(e => {
            console.log(e);
          });


        http       
          .get("/magazine/findAll",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            this.items=response.data;
            
          })
          .catch(e => {
            console.log(e);
          });


        



      },
      podaci3(){
        this.information=false;
        this.membership=false;
        this.transactions=true;
        this.kupljeno=false;
        this.tasks=false;
        
        
        http       
          .get("/payment/getTransaction",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            
            if(response.data==""){
              this.trans=false;
            }
            else{
              this.trans=true;
              this.transakcije=response.data;
            }
            
          })
          .catch(e => {
            console.log(e);
          });


      },
      podaci4(){
        this.information=false;
        this.membership=false;
        this.transactions=false;
        this.kupljeno=true;
        this.tasks=false;



        http       
          .get("/labor/getLaborsMagazines",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            
            this.kupljeniP=response.data;
            
          })
          .catch(e => {
            console.log(e);
          });
        
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },

      submitFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        http
          .post("/dbfile/uploadfile", formData,{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token'),
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response =>{
           // singleFileUploadSuccess.innerHTML = "<button v-on:click=\"downloadf()\">aaaaa</button>"
            singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.data.fileDownloadUri + "' target='_blank'>" + response.data.fileDownloadUri + "</a></p>";
            singleFileUploadSuccess.style.display = "block";
            console.log("URI: " + response.data.fileDownloadUri);  
          })
          .catch(e=> {
            console.log(e);
          })


      },
      handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            this.idmag = e.target.options[e.target.options.selectedIndex].dataset.foo
        }
      },
      payment(type){
        
        if(this.idmag!=null){
          http
          .get("payment/createpo/"+this.idmag+"/"+type,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            
              window.location.href=response.data;
            
          })
          .catch(e => {
            console.log(e);
          })
        }
        
      }







    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
.profile-page {

}

header {
  background-color:rgb(144, 199, 216);
  padding: 20px;
  text-align: center;
  font-size: 35px;
  color: white;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  height: 2cm;
}

.row {
  height: 10cm;
}

nav{
  font-size: 1cm;
  padding: 1cm;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-top:1.5cm;
}

button{
  font-size: 0.5cm;
}

.prikaz{
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 1.3cm;
}

label{
  font-size: 0.6cm;
  margin-left: 2cm;
  size: 5cm;
  margin-top: 0.2cm;
}

input{
  height: 1cm;
  margin-top: 0.2cm;
}

.div1{
  margin-right: 0.2cm;
}

.velikidiv{
  margin-left: 1cm;
  margin-top: 2cm;
}

.clan1{
  padding: 1.3cm;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1cm;
  margin-left: 1cm;
  margin-top: 2cm;
}

.clan2{
  margin-left: -0.5cm;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.9cm;
  margin-top: -0.5cm;
}

.table{
  font-size: 0.4cm;
  margin-left: -0.5cm;
}

.dugme{
  width: 5cm;
  margin-top: 0.5cm;
}

.tabela{
  margin-top: 1.3cm;
}




</style>
