<template lang="html">
  
  <div class="row">
    <div class="col-lg-6" style="background-color: rgb(248, 248, 248)">
      <br>
      <h1 style="color: rgb(101, 119, 158); font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">All the magazines are here ! Find your own !</h1>
      <br>

      <table style="width:100%" class="table">
        <tr>
          <th></th>
          <th>Name</th>
          <th>ISSN number</th>
          <th>Main Editor</th>
          <th></th>
        </tr>
        <tr v-for="item, key in items">
          <td>{{++key}}</td>
          <td>{{item.name}}</td>
          <td>{{item.ISSNnumber}}</td>
          <td>{{item.mainEditor.name}}</td>
          <td>
            <button v-on:click="addLabor(item.id)">Add</button>
          </td>
        </tr>

      </table>
    </div>

    <div class="col-lg-6" style="background-color: rgb(235, 112, 112)">
      <div v-if="show===true">
        <AddLabor></AddLabor>
      </div>

      <div v-if="process===true">
        <p class="p">MORATE DA IZVRSITE PROCES UPLATE CLANARINE !</p>
        <button style="margin-left: 8cm;" class="btn btn-info" >START</button>
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
        items: null,
        show: false,
        process: false
      }
    },

    
    methods: {
      izlistajSve(){
        
        
        http       
          .get("/magazine/findAll")
          .then(response => {
            this.items=response.data;
          })
          .catch(e => {
            console.log(e);
          });
      },
      addLabor(id){
        console.log(id);

        http       
          .post("/magazine/checkMembership/"+id)
          .then(response => {
            if(response.data=="ok" || response.data=="ima_clanarinu"){
              this.show=true;
              this.process=false;
            }else{
              this.process=true;
              this.show=false;
            }
          })
          .catch(e => {
            console.log(e);
          });

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
    color: rgb(112, 131, 172);
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .magazines{
    background-color:aqua;
  }

  .table{
    text-size-adjust: 0.3cm;
  }

  .p{
    margin-top: 3cm;
    color: rgb(58, 72, 102);
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 0.8cm;
  }
</style>
