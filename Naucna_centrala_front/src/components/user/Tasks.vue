<template lang="html">

  <div class="velikidiv">
    
    <div v-for="task,key in tasks" class="row" style="margin-top: 0.5cm">
      <div class="col-lg-1">
          {{++key}}.
      </div>
      <div class="col-lg-5">
          Naziv: {{task.taskNaziv}}
          <br>
          Id: {{task.taskId}}
          <br>
          
      </div>
      <div class="col-lg-6">
        <button class="btn btn-secondary" v-on:click="continueF(task)">
          Continue
        </button>
        
      </div>
      <br>
    </div>
  </div>
    
  

</template>

<script lang="js">

import http from "../../router/http-common";


  export default  {
    name: 'tasks',
    props: [],
    mounted() {

    },
    data() {
      return {
        tasks: []
      }
    },
    methods: {
      continueF(task){
        //console.log(task.taskId);
        //console.log(task.taskNaziv);
        localStorage.setItem('noviTaskId',task.taskId);

        http
          .get("tasks/redirectTO/"+task.taskId,{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            
            window.location.href="http://localhost:8082/#/mainpage/"+response.data.putanja;
            
          })
          .catch(e => {
            console.log(e);
          })

        //window.location.href="http://localhost:8082/#/mainpage/addlabor";
      },
      getTasks(){
        http
          .get("tasks/getTasks",{
            headers:{
                Authorization: 'Bearer '+this.$cookie.get('token') 
            }

          })
          .then(response => {
            
              this.tasks=response.data;
            
          })
          .catch(e => {
            console.log(e);
          })
      }

    },
    computed: {

    },
    beforeMount(){
      this.getTasks();
    }
}
</script>

<style scoped lang="scss">
  .velikidiv{
    margin-left: 10cm;
    margin-top: 1.6cm;
    font-size: 0.47cm;
  }

  a:link {
    text-decoration: none;
    text-decoration: underline;
  }

  a:visited {
    text-decoration: none;
    text-decoration: underline;
  }
</style>
