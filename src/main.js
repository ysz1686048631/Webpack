// 创建Vue跟实例
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style/css.css';


  

new Vue({
  el: '#app',
  router, 
  components: {
    App,
  },
  template: '<App/>',
});
