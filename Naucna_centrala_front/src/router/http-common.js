import axios from "axios";
import Vue from 'vue'

import VueCookie from "vue-cookie";


Vue.use(VueCookie);


export default axios.create({


    baseURL: "http://localhost:8083",
    headers: {
        "Content-type": "application/json"
    }
    
    
})