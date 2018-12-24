import axios from "axios";
import Vue from 'vue'

import VueCookie from "vue-cookie";


Vue.use(VueCookie);


export default axios.create({

    props:[
        
    ],


    baseURL: "http://localhost:4567",
    headers: {
        
        "Content-type": "application/json"
    }
    
    
})