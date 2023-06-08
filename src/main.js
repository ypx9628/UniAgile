import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import anime from 'animejs/lib/anime.js';
import Navigation from './views/Navigation/Navigation.vue'
Vue.prototype.$Navigation = Navigation
Vue.prototype.$axios = axios


Vue.config.productionTip = false
Vue.config.silent = true

Vue.use(VueAxios, axios)

var user = {
  userId: 2021210001,
  type: '0',
  groupId: 2021110000,
  name: '张三',
  password: 'zhangsan123',
  mail: 'zhangsan@bupt.edu.cn'
}

var timetable = { courses: [], table: [] }

var introduction = {
  school: 'School Introduction',
  major: 'Major Introduction',
  classid: 'Class Introduction',
}

var dayEvents = { data: [] };
var notice_table = { data: [], id: 0 };
//id:0,show:false,name:'',time:0,timeout:-1
var sys_time = { year: 2023, month: 6, day: 3, hour: 0, min: 0, sec: 0, week: 0, ratio: 6, runID: 0 };
var sys_today = "2023-06-03";
var reset_time = '';

var month_day = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// var colors=['blue', 'indigo', 'green','orange', 'blue-grey'];

var course_list = { data: [{ id: '000', name: 'course' }] }

var course_choose = 0;

var text = '';

var snackbar = false;

var day_items = ['[周一]', '[周二]', '[周三]', '[周四]', '[周五]'];

var Path1Data = "";

var Path = '';

Vue.prototype.$USER = user
Vue.prototype.$TABLE = timetable
Vue.prototype.$INTRO = introduction
Vue.prototype.$dayEnents = dayEvents
Vue.prototype.$SYSTIME = sys_time
Vue.prototype.$TODAY = sys_today
Vue.prototype.$reset_time = reset_time
Vue.prototype.$COURSELIST = course_list
Vue.prototype.$COURSECHOOSE = course_choose
Vue.prototype.$NOTICE = notice_table
Vue.prototype.$SHOWNOTICE = { flag: false }
Vue.prototype.$text = text
Vue.prototype.$snackbar = snackbar
Vue.prototype.$Path1Data = Path1Data
Vue.prototype.$Path = Path

Vue.prototype.$dateSta = date_sta;
Vue.prototype.$dateString = date_string;
Vue.prototype.$getDayEvents = getDayEvents;
Vue.prototype.$sim_start = sim_start;
Vue.prototype.$sim_stop = sim_stop;
Vue.prototype.$sim_faster = sim_faster;
Vue.prototype.$sim_slower = sim_slower;
Vue.prototype.$sim_restore = sim_restore;
Vue.prototype.$sim_inverse = sim_inverse;
Vue.prototype.$sim_reset = sim_reset;
Vue.prototype.$sim_finish = sim_finish;

function date_sta() {
  //var sys_time={year:2022,month:1,day:1,hour:0,min:0,ratio:1,runID:0};
  var format = sys_time.year + '-';
  format += ((sys_time.month < 10 ? '0' : '') + sys_time.month + '-');
  format += ((sys_time.day < 10 ? '0' : '') + sys_time.day + 'T');
  format += ((sys_time.hour < 10 ? '0' : '') + sys_time.hour + ':');
  format += ((sys_time.min < 10 ? '0' : '') + sys_time.min + ':');
  format += ((sys_time.sec < 10 ? '0' : '') + sys_time.sec);
  return format;
}

function date_string() {
  //var sys_time={year:2022,month:1,day:1,hour:0,min:0,ratio:1,runID:0};
  var format = sys_time.year + '-';
  format += ((sys_time.month < 10 ? '0' : '') + sys_time.month + '-');
  format += ((sys_time.day < 10 ? '0' : '') + sys_time.day + ' ');
  format += ((sys_time.hour < 10 ? '0' : '') + sys_time.hour + ':');
  format += ((sys_time.min < 10 ? '0' : '') + sys_time.min + ':');
  format += ((sys_time.sec < 10 ? '0' : '') + sys_time.sec);
  return format;
}

function getDayEvents() {
  const date = this.$dateString();

  this.axios({
    method: 'get',
    url: 'http://ds.nginx.show/' + this.$USER.userId + '&&' + date,
  }).then(res => {
    console.log(res);
    var status;
    var now = new Date(this.$dateSta());
    for (var i = 0; i < res.data.data.length; i++) {
      var start = new Date(res.data.data[i].startTime);
      var end = new Date(res.data.data[i].endTime);
      // this.$dayEnents.data[i] = res.data.data[i];
      if (now.getTime() < start.getTime()) {
        status = '未开始';
      } else if (now.getTime() > end.getTime()) {
        status = '已结束';
      } else {
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

function sim_start() {
  
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/start',
    params: {
      uid: user.userId,
      // nowTime: this.$dateString(),
      // timeSpeed: sys_time.ratio,
    }
  }).then(res => {
    console.log(res);
    

  }).catch(function (error) {
    console.log(error);
  })
}

function sim_stop() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/stop',
    params: {
      uid: user.userId,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

function sim_faster() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/faster',
    params: {
      uid: user.userId,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

function sim_slower() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/slower',
    params: {
      uid: user.userId,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

function sim_restore() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/restore',
    params: {
      uid: user.userId,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

function sim_inverse() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/inverse',
    params: {
      uid: user.userId,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

function sim_reset() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/reset',
    params: {
      uid: user.userId,
      time: reset_time,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

function sim_finish() {
  this.axios({
    method: 'post',
    url: 'http://ds.nginx.show/simulate/finish',
    params: {
      uid: user.userId,
    }
  }).then(res => {
    console.log(res);
  }).catch(function (error) {
    console.log(error);
  })
}

//websocket通信
var ws = new WebSocket("ws://ds.nginx.show/simulate/ws/" + user.userId)

ws.onopen = function () {
  // window.alert('ws connected successfully');
}

ws.onerror = function () {
  // window.alert('ws error');
}

ws.onmessage = function (res) {

  var time = JSON.parse(res.data);
  console.log(time);
  if (time.statusCode == 201) {
    
    sys_time.year = time.data.slice(0, 4);
    sys_time.month = time.data.slice(5, 7);
    sys_time.day = time.data.slice(8, 10);
    sys_time.hour = time.data.slice(11, 13);
    sys_time.min = time.data.slice(14, 16);
    
  }else if(time.statusCode == 200){
    // sim_stop();

    // window.alert(res.data);
    console.log(JSON.parse(res.data));
    var result = JSON.parse(res.data);
    var item = [];
    for(var i=0; i<result.data.length; i++){
      
      item[i] = result.data[i].name +"："+ 
      (result.data[i].isOnline?result.data[i].link:result.data[i].buildingName)+'\n';
    }
    snackbar = true;
    if(result.data.length <= 2){
      // text = "您下个小时的事务为：\n"+item + '\n导航路径已规划，请点击地图导航界面查看';
      window.alert("您下个小时的事务为："+item);
      window.alert('导航路径已规划，请点击地图导航界面查看');
    }else{
      // text = "您明天的事务为：\n" + item + '\n导航路径已规划，请点击地图导航界面查看';
      window.alert("您明天的事务为："+item);
      window.alert('导航路径已规划，请点击地图导航界面查看');
    }
    // window.alert("请查收您的to do List："+item);
    
  }else if(time.statusCode == 202){
    var result = JSON.parse(res.data);
    // for()
    result.data.forEach((element , idx) => {
      if(idx == 0) {
          this.$Path1Data  = "M" + element.x  + " " + element.y  + " ";
      } else {
          this.$Path1Data += "L" + element.x  + " " + element.y  + " ";
      }
  });
  
  // console.log(this.$Path1Data);
  Path = this.$Path1Data;
  console.log(Path);
  // this.$setPath1Data(path);
  // this.$Navigation.data.Path1Data = this.$Path1Data;
  
    // window.alert(res.data);
    // console.log(JSON.parse(res.data));
  }
  // console.log(res.data);
  
}

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
