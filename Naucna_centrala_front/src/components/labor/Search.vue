<template lang="html">

  <div class="row" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
    <div class="col-lg-4" style="margin-top: 1cm; ">
      <h1 align="center" style="color: rgb(111, 189, 235);">Search</h1>
      <div class="form-group">
        <label for="exampleInputEmail1">Labor name</label>
        <div class="row">
          <div class="col-lg-11">
            <input v-model="searchdto.laborname" type="text" class="form-control "  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter labor name">
          </div>
          <div class="col-lg-1">
              <button class="btn btn-primary" v-on:click="laborname()">OK</button>
          </div>
          
        </div>
      </div>
      <div class="form-group">
          <label for="exampleInputEmail1">Magazine name</label>
          
          <div class="row">
              <div class="col-lg-11">
                  <input v-model="searchdto.magazinename" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter magazine name">
              </div>
              <div class="col-lg-1">
                  <button class="btn btn-primary" v-on:click="magazinename()">OK</button>
              </div>
              
            </div>
      </div>
      <div class="form-group">
          <label for="exampleInputEmail1">Scientific area</label>
          
          
          <div class="row">
              <div class="col-lg-11">
                  <input v-model="searchdto.scientificarea" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter scientific area">
              </div>
              <div class="col-lg-1">
                  <button class="btn btn-primary" v-on:click="scientificarea()">OK</button>
              </div>
              
            </div>
      </div>
      <div class="form-group">
          <label for="exampleInputEmail1">Author</label>
          
          

          <div class="row">
              <div class="col-lg-11">
                  <input v-model="searchdto.author" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter author">
              </div >
              <div class="col-lg-1">
                  <button class="btn btn-primary" v-on:click="author()">OK</button>
              </div>
              
            </div>
      </div>
      <div class="form-group">
          <label for="exampleInputEmail1">Key terms</label>
          
          

          <div class="row">
              <div class="col-lg-11">
                  <input v-model="searchdto.keyterms" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter author">
              </div >
              <div class="col-lg-1">
                  <button class="btn btn-primary" v-on:click="keyterms()">OK</button>
              </div>
              
            </div>
      </div>
      
      <br>
      <div class="row">
        <div class="col-lg-4">
        <button style="margin-left: 2cm;"  type="submit" class="btn btn-primary" v-on:click="andor('and')">AND</button>
        </div>
        <div class="col-lg-4">
        <button   type="submit" class="btn btn-primary" v-on:click="andor('or')">OR</button>
        </div>
        <div class="col-lg-4">
        <button   type="submit" class="btn btn-primary" v-on:click="search()">Search</button>
        </div>
      </div>
    </div>

    <div class="col-lg-7" style="margin-top: 3.2cm; margin-left: 1cm; ">

        <table class="table">
            <tr>
              <th></th>
              <th>Labor name</th>
              <th>Magazine name</th>
              <th>Author</th>
              <th>Scientific area</th>

            </tr>
            <tr v-for="l, key in labors">
              <th>{{++key}}</th>
              <th>{{l.laborname}}</th>
              <th>{{l.magazinename}}</th>
              <th>{{l.author}}</th>
              <th>{{l.scientificarea}}</th>
            </tr>
         </table>

    </div>

  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'search',
    props: [],
    mounted() {

    },
    data() {
      return {
        searchdto: {
          laborname: "",
          magazinename: "",
          author: "",
          scientificarea: "",
          keyterms: ""
        },
        labors: [],
        keypoint: [],
        andors: ""

      }
    },
    methods: {

      andor(s){
        this.andors=s;
        console.log(this.andors);
      },


      

      search(){


        var data = {
          laborname: this.searchdto.laborname,
          magazinename: this.searchdto.magazinename,
          author: this.searchdto.author,
          scientificarea: this.searchdto.scientificarea,
          andor: this.andors
          
        };

        http
          .post("/laborES/searchAll",data,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          } 
          )
          .then(response => {
            this.labors=response.data;
            this.searchdto.laborname='',
            this.searchdto.magazinename='',
            this.searchdto.authorname='',
            this.searchdto.authorsurname='',
            this.searchdto.scientificarea=''

          })
          .catch(e => {
            console.log("Neuspesna registracija");
          });



      },

      

      keyterms(){
        if(this.searchdto.keyterms!=''){

            this.labors=[];
            http       
            .get("/laborES/searchTerms/"+this.searchdto.keyterms,{
            headers: {
            Authorization: 'Bearer '+this.$cookie.get('token')
            }
            })
            .then(response => {
            this.labors=response.data;
            this.searchdto.laborname='',
            this.searchdto.magazinename='',
            this.searchdto.author='',
            this.searchdto.scientificarea='',
            this.searchdto.keyterms=''

            })
            .catch(e => {
              console.log(e);
            });

            }

      },

      author(){

          if(this.searchdto.author!=''){

            this.labors=[];
            http       
            .get("/laborES/searchAuthor/"+this.searchdto.author,{
            headers: {
            Authorization: 'Bearer '+this.$cookie.get('token')
            }
            })
            .then(response => {
            this.labors=response.data;
            this.searchdto.laborname='',
            this.searchdto.magazinename='',
            this.searchdto.author='',
            this.searchdto.scientificarea='',
            this.searchdto.keyterms=''

            })
            .catch(e => {
              console.log(e);
            });

          }

          },

      scientificarea(){

        if(this.searchdto.scientificarea!=''){

          this.labors=[];
          http       
          .get("/laborES/searchSciarea/"+this.searchdto.scientificarea,{
          headers: {
          Authorization: 'Bearer '+this.$cookie.get('token')
          }
          })
          .then(response => {
          this.labors=response.data;
          this.searchdto.laborname='',
          this.searchdto.magazinename='',
          this.searchdto.author='',
          this.searchdto.scientificarea='',
          this.searchdto.keyterms=''

          })
          .catch(e => {
            console.log(e);
          });

        }

      },


      magazinename(){

        if(this.searchdto.magazinename!=''){

          this.labors=[];
          http       
          .get("/laborES/searchMagazinename/"+this.searchdto.magazinename,{
          headers: {
          Authorization: 'Bearer '+this.$cookie.get('token')
          }
          })
          .then(response => {
          this.labors=response.data;
          this.searchdto.laborname='',
          this.searchdto.magazinename='',
          this.searchdto.author='',
          this.searchdto.scientificarea='',
          this.searchdto.keyterms=''
  
          })
          .catch(e => {
            console.log(e);
          });


          }




      },

      laborname(){

        if(this.searchdto.laborname!=''){

          this.labors=[];
        http       
          .get("/laborES/searchLaborname/"+this.searchdto.laborname,{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            this.labors=response.data;
            this.searchdto.laborname='',
            this.searchdto.magazinename='',
            this.searchdto.author='',
            this.searchdto.scientificarea='',
            this.searchdto.keyterms=''
            
          })
          .catch(e => {
            console.log(e);
          });


        }
        
        
      }


    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  
</style>
