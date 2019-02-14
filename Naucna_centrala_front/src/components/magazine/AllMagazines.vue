<template lang="html">
  
  <div class="row">
    <!--style="background-color: rgb(248, 248, 248)"-->
    <div class="col-lg-6" >
      <br>
      <h1 style="color: rgb(111, 189, 235); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">All the magazines are here ! Find your own !</h1>
      <br>

      <table style="width:100%" class="table">
        <tr>
          <th></th>
          <th>Name</th>
          <th>ISSN number</th>
          <th>Main Editor</th>
          <th>Price</th>
        </tr>
        <tr v-for="item, key in items">
          <td>{{++key}}</td>
          <td>{{item.name}}</td>
          <td>{{item.issnnumber}}</td>
          <td>{{item.mainEditor}}</td>
          <td>{{item.amount}}EUR</td>
          <td>
            <div v-if="item.role==='author'">
              <button class="btn btn-warning" v-on:click="addLabor(item.id,item.validmembership,item.paymentMethod)">Add</button>
            </div>
          </td>
          <td>
            <button class="btn btn-success" v-on:click="seelabors(item.id)">Labors</button>
          </td>
          <td>
            <div v-if="item.role==='editor'">
                <a :href="item.url">Download</a>
            </div>
            <div v-else>
                <div v-if="item.paymentMethod==='no open-access'">
                    <div v-if="item.validmembership==='invalid'">
                      <div v-if="item.bought==='no'">
                        <button class="btn btn-info" v-on:click="payment('magazin',item.id)">Buy</button>
                      </div>
                      <div v-else>
                        <a :href="item.url">Download</a>
                      </div>
                    </div>
                    <div v-if="item.validmembership==='valid'">
                        <a :href="item.url">Download</a>
                    </div>
                </div>
                <div v-if="item.paymentMethod==='open-access'">
                    <a :href="item.url">Download</a>
                </div>
            </div>
            
          </td>
        </tr>

      </table>
    </div>

    <div class="col-lg-6" >
      <div v-if="show===true">
        <AddLabor :idmag="idMag"></AddLabor>
      </div>

      <div v-if="process===true">
        <p class="p">MORATE DA IZVRSITE PROCES UPLATE CLANARINE U IZNOSU OD 4EUR !</p>
        <button v-on:click="payment('clanarina',0)" style="margin-left: 8cm;" class="btn btn-info" >START</button>
      </div>

      <div v-if="laborTrue===true">
        
          <div class="radovi">

            <div v-for="labor,key in labors">
              {{++key}}. {{labor.heading}} 
              <br>
              <div>
                <div v-if="labor.role==='editor'">    
                    <a :href="labor.url">Download</a>
                </div>
                <div v-else>
                    <div v-if="labor.paymentMethod==='no open-access'">
                        <div v-if="labor.validmembership==='invalid'">
                          <div v-if="labor.bought==='no'">
                            Price: {{labor.amount}}EUR
                            <button  class="btn btn-info" v-on:click="payment('rad',labor.id)">Buy</button>
                          </div>
                          <div v-else>
                            <a :href="labor.url">Download</a>
                          </div>
                        </div>
                        <div v-if="labor.validmembership==='valid'">
                          <a :href="labor.url">Download</a>
                        </div>
                    </div>
                    <div v-if="labor.paymentMethod==='open-access'">
                        <a :href="labor.url">Download</a>
                    </div>
                </div>
                
              </div>
              <br>
            </div>
            
          </div>
          

      </div>

    </div>
  </div>
</template>

<script lang="js">

import http from "../../router/http-common";
import AddLabor from "./AddLabor";


  export default  {
    name: 'AllMagazines',
    props: [],
    components: {
      AddLabor
    },
    mounted() {

    },
    data() {
      return {
        
        items: [],
        show: false,
        process: false,
        idMag: null,
        laborTrue: false,
        labors: []
      }
    },

    
    methods: {
      izlistajSve(){
        
        
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
      addLabor(id,valid,method){
        
        this.idMag=id;
        this.laborTrue=false;
        
        if(method=="no open-access"){
          this.show=true;
          this.process=false;   
        }else if("open-access"){
          if(valid=="valid"){
            this.show=true;
            this.process=false; 
          }
          else{
            this.show=false;
            this.process=true; 
          }
        }
        
        

      },
      payment(type,id){
        
        if(type=="magazin" || type=="rad"){
          this.idMag=id;
        }
        
        http
          .get("payment/createpo/"+this.idMag+"/"+type,{
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
      },
      seelabors(id){
        
        this.laborTrue=true;
        this.show=false;
        this.process=false;

        http
          .get("labor/getLabors/"+id,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            
              this.labors=response.data;
            
          })
          .catch(e => {
            console.log(e);
          })

      }
    },
    beforeMount(){
      this.izlistajSve();
    },
    computed: {
    }
}
</script>

<style scoped lang="scss">

/*@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css");*/


  .text{
    margin-right: 10cm;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .magazines{
    background-color:aqua;
  }

  .table{
    font-size: 0.5cm;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 1cm;
  }

  .table1{
    font-size: 0.5cm;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 5cm;
    
  }

  .p{
    margin-top: 5cm;
    /*color: rgb(58, 72, 102);*/
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 0.8cm;
  }

  p{
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 0.5cm;
    margin-top:1cm;
  }

  .radovi{
    margin-top: 3.5cm;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 0.5cm;
  }
</style>
