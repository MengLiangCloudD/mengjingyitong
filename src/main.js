// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./common/style/base.css";
import { Button,Icon,Spin,Collapse,Panel,Modal,Message,Form,FormItem,Select,Option,Checkbox,CheckboxGroup,Radio,Input,Badge,Poptip,Menu,MenuItem,RadioGroup,LoadingBar,Step,Steps,Carousel,CarouselItem,Switch,Dropdown} from 'iview';
import { DatePicker} from 'element-ui';
import "iview/dist/styles/iview.css";
import Calendar from "vue-mobile-calendar";
import fastClick from "fastclick";
import axios from "axios"
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.component('Dropdown', Dropdown);
Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Collapse', Collapse);
Vue.component('Panel', Panel);
Vue.component('Modal', Modal);
Vue.component('Form', Form);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Checkbox', Checkbox);
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('Radio', Radio);
Vue.component('Input', Input);
Vue.component('Badge', Badge);
Vue.component('Menu', Menu);
Vue.component('Poptip', Poptip);
Vue.component('MenuItem', MenuItem);
Vue.component('RadioGroup', RadioGroup); 
Vue.component('LoadingBar', LoadingBar ); 
Vue.component('FormItem', FormItem);
Vue.component('Spin', Spin);
Vue.component('Step', Step);
Vue.component('Steps', Steps);
Vue.component("Carousel",Carousel);
Vue.component("CarouselItem",CarouselItem);
Vue.component("Switchs",Switch);
Vue.prototype.$Message=Message;
Vue.prototype.$Modal=Modal;

Vue.component(DatePicker.name, DatePicker);
// Vue.component(Switch.name, Switch);
// Vue.use(iView);
Vue.use(Calendar);
// Vue.use(ElementUI);
fastClick.attach(document.body);
window.router = router;
router.beforeEach((to,from,next)=>{
  // 强制给index.html 加上时间戳
  if (document.URL.indexOf('index.html?t=') < 0) {
    var storage = window.localStorage;
    storage.clear();
    let timestamp = (new Date()).valueOf();
    window.location.href = '/index.html?t=' + timestamp + '#' + to.fullPath;
  }
  let redirectpath
  if(to.path=="/appointment"){
    //处理路由
    redirectpath=to.fullPath;
    // console.log(to)
    // console.log(to.query.hasOwnProperty("docCode"))
    if(to.query.hasOwnProperty("docCode")){
      store.commit("setDoccode", to.query.docCode);
      store.commit("setDocName", to.query.docName);
      store.commit("setdepCode", to.query.depCode);
      store.commit("setDepname", to.query.depname);
    }
    //判断localStorage里有没有openid
    if(localStorage.getItem('openid')&&localStorage.getItem('openid')!="undefined"){
        next()
    }else{
      if(document.cookie){
        let cookiestr=document.cookie
        let arr=cookiestr.split(";");
        let cookiearr=[];
        for(let i=0;i<arr.length;i++){
          let _arr=arr[i].split("=");
          let key=_arr[0];
          let value=_arr[1];
          cookiearr.push({key,value});
        }
        if(cookiearr.length<2){
          location.href=store.getters.getUrl + "depart/wxLogin.do?status=2";
        }
        for(let i=0;i<cookiearr.length;i++){
          if(cookiearr[i].key.trim()=="openid"){
            this.key1=cookiearr[i].key
            let value1=cookiearr[i].value
            if(value1.length>0){
              localStorage.setItem('openid',value1);
            }else{
              location.href=store.getters.getUrl + "depart/wxLogin.do?status=2";
            }
          }else if(cookiearr[i].key.trim()=="headimgurl"){
            this.key2=cookiearr[i].key
            let value2=cookiearr[i].value
            let user={headimgurl:value2}
            if(value2.length>0){
              localStorage.setItem('user',JSON.stringify(user))
            }else{
              location.href=store.getters.getUrl + "depart/wxLogin.do?status=2";
            }
              localStorage.setItem('user',JSON.stringify(user));
          }
        }
        next()
      }else{
        location.href=store.getters.getUrl + "depart/wxLogin.do?status=2";
      }
    }
    
  }else if(to.path=="/home"){
    if(localStorage.getItem('openid')&&localStorage.getItem('openid')!="undefined"){
      next()
    }else{
      if(document.cookie){
        let cookiestr=document.cookie;
        let arr=cookiestr.split(";");
        let cookiearr=[];
        for(let i=0;i<arr.length;i++){
            let _arr=arr[i].split("=");
            let key=_arr[0];
            let value=_arr[1];
            cookiearr.push({key,value});
        }
        if(cookiearr.length<2){
          location.href=store.getters.getUrl + "depart/wxLogin.do?status=1";
        }
        for(let i=0;i<cookiearr.length;i++){
            if(cookiearr[i].key.trim()=="openid"){
                let value1=cookiearr[i].value
                if(value1.length>0){
                  localStorage.setItem('openid',value1);
                }else{
                  location.href=store.getters.getUrl + "depart/wxLogin.do?status=1";
                }
            }else if(cookiearr[i].key.trim()=="headimgurl"){
                let value2=cookiearr[i].value
                let user={headimgurl:value2}
                if(value2.length>0){
                  localStorage.setItem('user',JSON.stringify(user))
                }else{
                  location.href=store.getters.getUrl + "depart/wxLogin.do?status=1";
                }
            }
        }
        next()
      }else{
        location.href=store.getters.getUrl + "depart/wxLogin.do?status=1";
      } 
    }
  }else if(to.path=="/reportss"){
    if(localStorage.getItem('openid')&&localStorage.getItem('openid')!="undefined"){
      next()
    }else{
      if(document.cookie){
        let cookiestr=document.cookie
        let arr=cookiestr.split(";");
        let cookiearr=[];
        for(let i=0;i<arr.length;i++){
            let _arr=arr[i].split("=");
            let key=_arr[0];
            let value=_arr[1];
            cookiearr.push({key,value});
        }
        if(cookiearr.length<2){
          location.href=store.getters.getUrl + "depart/wxLogin.do?status=4";
        }
        for(let i=0;i<cookiearr.length;i++){
            if(cookiearr[i].key.trim()=="openid"){
                let value1=cookiearr[i].value
                if(value1.length>0){
                  localStorage.setItem('openid',value1);
                }else{
                  location.href=store.getters.getUrl + "depart/wxLogin.do?status=4";
                }
            }else if(cookiearr[i].key.trim()=="headimgurl"){
                let value2=cookiearr[i].value
                let user={headimgurl:value2}
                if(value2.length>0){
                  localStorage.setItem('user',JSON.stringify(user))
                }else{
                  location.href=store.getters.getUrl + "depart/wxLogin.do?status=4";
                }
                localStorage.setItem('user',JSON.stringify(user))
            }
        }
        next()
      }else{
        location.href=store.getters.getUrl + "depart/wxLogin.do?status=4";
      } 
    }
  }else if(to.path=="/Myaccount"){
    if(localStorage.getItem('openid')&&localStorage.getItem('openid')!="undefined"){
      next()
    }else{
      if(document.cookie){
        let cookiestr=document.cookie
        let arr=cookiestr.split(";");
        let cookiearr=[];
        for(let i=0;i<arr.length;i++){
            let _arr=arr[i].split("=");
            let key=_arr[0];
            let value=_arr[1];
            cookiearr.push({key,value});
        }
        if(cookiearr.length<2){
          location.href=store.getters.getUrl + "depart/wxLogin.do?status=3";
        }
        for(let i=0;i<cookiearr.length;i++){
            if(cookiearr[i].key.trim()=="openid"){
                let value1=cookiearr[i].value
                if(value1.length>0){
                  localStorage.setItem('openid',value1);
                }else{
                  location.href=store.getters.getUrl + "depart/wxLogin.do?status=3";
                }
            }else if(cookiearr[i].key.trim()=="headimgurl"){
                let value2=cookiearr[i].value
                let user={headimgurl:value2}
                if(value2.length>0){
                  localStorage.setItem('user',JSON.stringify(user))
                }else{
                  location.href=store.getters.getUrl + "depart/wxLogin.do?status=3";
                }
            }
        }
        next()
      }else{
        location.href=store.getters.getUrl + "depart/wxLogin.do?status=3";
      } 
    }
  }else{
    next()
  }
})
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
