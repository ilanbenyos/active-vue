import axios from "axios";
import Vue from "vue";
import swal from "sweetalert2";

const plugin = {
  install(Vue) {
    axios.interceptors.request.use(
      function(config) {
        // const token = localStorage.getItem("jwtToken");
        // if (token != null) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        return config;
      },
      function(err) {
        return Promise.reject(err);
      }
    );

    axios.interceptors.response.use(
      res => {
        if (res.data && res.data.token) {
          localStorage.setItem("jwtToken", res.data.token);
        }
        return res.data;
      },
      async (err) => {
        console.log(err);
        let txt = "We've bumped into an unknown error"
        let msg = "Something went wrong..."
        if(err.response && err.response.data){
          msg = err.response.data.message || msg;
          txt = err.response.data.desc || txt;
        }
        vue.$swal({
          type: "error",
          title: msg,
          text:txt,
        });
        return Promise.reject(err);
      }
    );
  }
};

export default plugin;
