<template lang="html">
  <div class="row">
    <div class="col-lg-6" style="background-color: rgb(248, 248, 248)">
      <h1 style="color: rgb(101, 119, 158)">Here are all magazines ! Find you own !</h1>
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
              <span class="glyphicon glyphicon-plus" v-on:click="dodajRad(item.id)"></span></a>
          </td>
        </tr>

      </table>
    </div>

    <div class="col-lg-6" style="background-color: palevioletred">


    </div>
  </div>
</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'AllMagazines',
    props: [],
    mounted() {

    },
    data() {
      return {
        items: null
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
      dodajRad(id){
        console.log(id);

        http       
          .post("/magazine/checkMembership/"+id)
          .then(response => {
            
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

@import url("//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css");

  .text{
    margin-right: 10cm;
    color: rgb(112, 131, 172);
    /*font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif*/
  }

  .magazines{
    background-color:aqua;
  }

  .table{
    text-size-adjust: 0.5cm;
  }
</style>
