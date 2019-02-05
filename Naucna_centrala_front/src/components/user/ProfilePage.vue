<template lang="html">
  <div>
    <header>
      <h2>User profile</h2>
    </header>
    <div class="row">
      <div class="col-lg-3">
        <nav>
          
            <button class="dugme btn btn-outline-warning" v-on:click="podaci()">Informations about user</button>
            <button class="dugme btn btn-outline-warning" v-on:click="podaci2()">Membership Fee</button>
            <button class="dugme btn btn-outline-warning" v-on:click="podaci3()">Transactions</button>
          
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


        <div v-if="membership===true" >
          
          <div class="clan1" v-if="clanarina===false">
            You don't have active membership fee !
          </div>

          <div class="row velikidiv" v-if="clanarina===true">
          
              <div class="div1 col-md-3">
                <label >Start date:</label>
                
                <label >End date:</label>
                
                <label >Price:</label>
              </div>
    
              <div class="col-md-2">
                <input v-model="korisnik.startDate" disabled/>
                
                <input v-model="korisnik.endDate" disabled/>
                
                <input v-model="korisnik.price" disabled/>
              </div>
    
          </div>

        </div>



        <div  v-if="transactions===true">

          <div v-if="trans===true">
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
      </div>

    </div>

  </div>
</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'profile-page',
    props: [],
    mounted() {

    },
    data() {
      return {
        information: false,
        membership: false,
        transactions: false,
        clanarina: true,
        trans: true,
        korisnik: {
          name: "",
          surname: "",
          username: "",
          startDate: "",
          endDate: "",
          price: ""
        },
        transakcije: []
      }
    },
    methods: {
      podaci(){
        
        this.information=true;
        this.membership=false;
        this.transactions=false;

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

        http       
          .get("/user/getInfo",{
              headers: {
                Authorization: 'Bearer '+this.$cookie.get('token')
              }
          })
          .then(response => {
            if(response.data.startDate==null & response.data.endDate==null){
              this.clanarina=false;
            }
            else{
              this.clanarina=true;
              this.korisnik.startDate=response.data.startDate;
              this.korisnik.endDate=response.data.endDate;
              this.korisnik.price=response.data.price;
              
            }
            console.log(this.clanarina);
          })
          .catch(e => {
            console.log(e);
          });



      },
      podaci3(){
        this.information=false;
        this.membership=false;
        this.transactions=true;
        
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
}

.clan1{
  padding: 1.3cm;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1cm;
  margin-left: 1cm;
}

.clan2{
  margin-left: -0.5cm;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 0.9cm;
  margin-top: -0.5cm;
}

.table{
  font-size: 0.4cm;
  margin-left: -1cm;
}

.dugme{
  width: 5cm;
}


</style>
