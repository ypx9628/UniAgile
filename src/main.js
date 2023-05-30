import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import anime from 'animejs/lib/anime.js';
Vue.prototype.$axios = axios


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

var user={
  userId: 4,
  type: '1',
  groupId: 1,
  name:'张老师',
  password:'',
  mail: ''
}

var timetable={courses:[],table:[]}

var introduction={
  school:'School Introduction',
  major:'Major Introduction',
  classid:'Class Introduction',
}

var dayEvents={data:[]};
var notice_table={data:[],id:0};
//id:0,show:false,name:'',time:0,timeout:-1
var sys_time={year:2023,month:5,day:1,hour:0,min:0,sec:0,week:0,ratio:1,runID:0};
var sys_today="2023-05-01";
var reset_time='';

var month_day=[0,31,28,31,30,31,30,31,31,30,31,30,31];

// var colors=['blue', 'indigo', 'green','orange', 'blue-grey'];

var course_list={data:[{id:'000',name:'course'}]}

var course_choose = 0;

var day_items=['[周一]','[周二]','[周三]','[周四]','[周五]']

Vue.prototype.$USER=user
Vue.prototype.$TABLE=timetable
Vue.prototype.$INTRO=introduction
Vue.prototype.$dayEnents=dayEvents
Vue.prototype.$SYSTIME=sys_time
Vue.prototype.$TODAY=sys_today
Vue.prototype.$reset_time = reset_time
Vue.prototype.$COURSELIST = course_list
Vue.prototype.$COURSECHOOSE = course_choose
Vue.prototype.$NOTICE = notice_table
Vue.prototype.$SHOWNOTICE={flag:false}

Vue.prototype.$dateSta=date_sta;
Vue.prototype.$dateString=date_string;
Vue.prototype.$getDayEvents=getDayEvents;
Vue.prototype.$sim_start = sim_start;
Vue.prototype.$sim_stop = sim_stop;
Vue.prototype.$sim_faster = sim_faster;
Vue.prototype.$sim_slower = sim_slower;
Vue.prototype.$sim_restore = sim_restore;
Vue.prototype.$sim_inverse = sim_inverse;
Vue.prototype.$sim_reset = sim_reset;
Vue.prototype.$sim_finish = sim_finish;

function date_sta(){
  //var sys_time={year:2022,month:1,day:1,hour:0,min:0,ratio:1,runID:0};
  var format = sys_time.year + '-';
  format += ((sys_time.month < 10 ? '0':'') + sys_time.month + '-');
  format += ((sys_time.day < 10 ? '0':'') + sys_time.day + 'T');
  format += ((sys_time.hour < 10 ? '0':'') + sys_time.hour + ':');
  format += ((sys_time.min < 10 ? '0':'') + sys_time.min + ':');
  format += ((sys_time.sec < 10 ? '0':'') + sys_time.sec);
  return format;
}

function date_string(){
  //var sys_time={year:2022,month:1,day:1,hour:0,min:0,ratio:1,runID:0};
  var format = sys_time.year + '-';
  format += ((sys_time.month < 10 ? '0':'') + sys_time.month + '-');
  format += ((sys_time.day < 10 ? '0':'') + sys_time.day + ' ');
  format += ((sys_time.hour < 10 ? '0':'') + sys_time.hour + ':');
  format += ((sys_time.min < 10 ? '0':'') + sys_time.min + ':');
  format += ((sys_time.sec < 10 ? '0':'') + sys_time.sec);
  return format;
}

function getDayEvents(){
  const date = this.$dateString();

  this.axios({
    method: 'get',
    url:'http://10.28.236.228:16663/' + this.$USER.userId + '&&' + date,
  }).then(res=>{
    console.log(res);
    var status;
    var now = new Date(this.$dateSta());
    for(var i=0; i<res.data.data.length; i++){
      var start = new Date(res.data.data[i].startTime);
      var end = new Date(res.data.data[i].endTime);
      // this.$dayEnents.data[i] = res.data.data[i];
      if(now.getTime() < start.getTime()){
        status = '未开始';
      }else if(now.getTime() > end.getTime()){
        status = '已结束';
      }else{
        status = '进行中';
      }
      var new_day_event = {
        eventId: res.data.data[i].eventId,
        name: res.data.data[i].name,
        eventType: res.data.data[i].eventType,
        isOnline: res.data.data[i].isOnline,
        isGroup: res.data.data[i].isGroup,
        customType: res.data.data[i].customType,
        buildingId: res.data.data[i].buildingId,
        buildingName: res.data.data[i].buildingName,
        link: res.data.data[i].link,
        date: res.data.data[i].date,
        startTime: res.data.data[i].startTime,
        endTime: res.data.data[i].endTime,
        duration: res.data.data[i].duration,
        cycle: res.data.data[i].cycle,
        status: status,
      }
      this.dayEvents.push(new_day_event);

    }
  })
}

// function get_feb(){
//   var year = this.$SYSTIME.year;
//   if( (year % 100 != 0 && year % 4 == 0) || year % 400 == 0 ){
//       month_day[2] = 29;
//   }else{
//       month_day[2] = 28;
//   }
// }

function sim_start(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/start',
    params: {
      uid: this.$USER.userId,
      nowTime: this.$date_string(),
      timeSpeed: this.$SYSTIME.ratio,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_stop(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/stop',
    params: {
      uid: this.$USER.userId,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_faster(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/faster',
    params:{
      uid: this.$USER.userId,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_slower(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/slower',
    params:{
      uid: this.$USER.userId,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_restore(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/restore',
    params:{
      uid: this.$USER.userId,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_inverse(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/inverse',
    params:{
      uid: this.$USER.userId,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_reset(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/reset',
    params:{
      uid: this.$USER.userId,
      time: this.$reset_time,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

function sim_finish(){
  this.axios({
    method: 'post',
    url: 'http://10.28.166.24:16661/simulate/finish',
    params:{
      uid: this.$USER.userId,
    }
  }).then(res=>{
    console.log(res);
  }).catch(function(error){
    console.log(error);
  })
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
