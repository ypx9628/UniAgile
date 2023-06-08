<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-sheet class="rounded-t-lg" elevation=5>
          <v-toolbar flat>
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet class="pl-5 pr-5 rounded-b-lg" elevation=5>
          <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
            :type="type" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
            @change="updateRange"></v-calendar>
          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon
                  @click="dialog = true; modifyCourse(selectedEvent.eventId, selectedEvent.name, selectedEvent.isOnline, selectedEvent.isGroup, selectedEvent.customType,
                    selectedEvent.buildingId, selectedEvent.buildingName, selectedEvent.link, selectedEvent.date, selectedEvent.startTime, selectedEvent.endTime, selectedEvent.cycle)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn> -->
                <v-btn icon @click="deleteCourse">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.customType"></span><br>地点：
                <span v-html="selectedEvent.buildingName"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>


    <!-- 修改课程信息 -->
    <template>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card class="px-2 pt-6 pb-2 rounded-lg">
          <v-card-title class="text-h5 ml-2 font-weight-bold">
            修改课程信息
          </v-card-title>
          <v-container fluid class="px-6">
            <v-row class="mx-auto">
              <v-col cols="6">
                <v-text-field label="课程名称" outlined dense v-model="selectedEvent.name"></v-text-field>
              </v-col>
              <!-- <v-col class="d-flex" cols="6">
            <v-select dense v-model="selectedEvent.eventType" :items="actType" item-text="name" item-value="value"
              label="活动类型" outlined>
              <option 
                        v-for="(item, index) in actType" :key="index" :label="item" :value="index"
                        ></option>
            </v-select>
          </v-col> -->
              <v-col cols="6" class="d-flex">
                <v-switch label="线上活动" inset v-model="selectedEvent.isOnline"></v-switch>
              </v-col>
              <v-col cols="6" v-if="selectedEvent.isOnline">
                <v-text-field outlined dense label="活动链接" v-model="selectedEvent.link">
                </v-text-field>
              </v-col>
              <v-col cols="6" v-else="!selectedEvent.isOnline">
                <v-text-field outlined dense label="活动地点" v-model="selectedEvent.buildingName">
                </v-text-field>
              </v-col>
              <v-col cols="4">
                <v-menu ref="menu">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field dense v-model="selectedEvent.date" label="活动日期"
                      prepend-icon="mdi-calendar-range-outline" readonly outlined v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="selectedEvent.date" no-title scrollable>
                    <v-spacer></v-spacer>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="4">
                <v-select dense :items="act_hour" v-model="selectedEvent.startTime" label="开始时间（时）"></v-select>
                <!-- <v-text-field outlined dense label="开始时间" v-model="actInput.start">
                        </v-text-field> -->
              </v-col>
              <v-col cols="4">
                <v-select dense :items="act_hour" v-model="selectedEvent.endTime" label="结束时间（时）"></v-select>
                <!-- <v-text-field outlined dense label="结束时间" v-model="actInput.end">
                        </v-text-field> -->
              </v-col>
              <!-- <div class="font-weight-bold mt-5">
                        活动起止时间
                    </div> -->
              <v-col cols="6">
                <v-text-field label="循环周期（天）" outlined dense v-model="selectedEvent.cycle"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-1">
              <v-textarea filled clearable dense label="活动简介（不超过10字）" auto-grow row="2"
                v-model="selectedEvent.customType"></v-textarea>
            </v-row>

          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">取消
            </v-btn>
            <v-btn color="blue darken-1 font-weight-bold" text @click="updateCourse(); dialog = false">确认修改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
export default {
  data: () => ({
    // user: Vue.prototype.$USER,
    // user: Vue.prototype.$USER,
    focus: '2023-06-03',
    type: 'week',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    dialog: false,
    act_hour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    Sundays: null,
    snackbar: false,
    text:'',
  }),
  mounted() {
    // this.$refs.calendar.checkChange();
    // 初始化时生成自定义日程
    // this.generateCustomEvents();
    this.getSundayDatesInMonth(this.focus);


  },
  created() {
    this.getWeekLesAndExa();
    this.getMonthAll();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = '2023-05-01'
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        this.selectedEvent.date = event.date.slice(0, 10)
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      // const events = []

      // const min = new Date(`${start.date}T00:00:00`)
      // const max = new Date(`${end.date}T23:59:59`)
      // const days = (max.getTime() - min.getTime()) / 86400000
      // const eventCount = this.rnd(days, days + 20)

      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime())
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
      //   const second = new Date(first.getTime() + secondTimestamp)

      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay,
      //   })
      // }

      // this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    generateCustomEvents() {
      // 自定义日程1
      const customEvent1 = {
        name: 'Custom Event 1',
        start: new Date('2023-05-28T09:00:00'),
        end: new Date('2023-05-28T10:30:00'),
        color: 'purple',
        timed: true,
        customType: '我是简介'
      };

      // 自定义日程2
      const customEvent2 = {
        name: 'Custom Event 2',
        start: new Date('2023-05-18T14:00:00'),
        end: new Date('2023-05-18T16:00:00'),
        color: 'green',
        timed: true,
      };
      const customEvent3 = {
        name: 'Custom Event 2',
        start: new Date('2023-05-29T16:00:00'),
        end: new Date('2023-05-29T18:00:00'),
        color: 'green',
        timed: true,
      };
      const customEvent4 = {
        name: 'Custom Event 2',
        start: new Date('2023-05-29T19:00:00'),
        end: new Date('2023-05-29T20:00:00'),
        color: 'green',
        timed: true,
      };

      // 将自定义日程添加到事件数组中
      this.events.push(customEvent1, customEvent2, customEvent3, customEvent4);
    },

    getWeekLesAndExa() {
      const userId = this.$USER.userId;
      const date = this.getNearestSunday(this.$dateString());

      this.axios({
        method: 'get',
        url: 'http://ds.nginx.show/events/WeekLessonAndExam/' + userId + '&&' + date,
      }).then(res => {
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          const course = {
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
            start: res.data.data[i].startTime,
            end: res.data.data[i].endTime,
            color: this.colors[i % 7],
            cycle: res.data.data[i].cycle,
            timed: true,
          }
          this.events.push(course);
        }
      }).catch(function (error) {
        console.log(error);
      })
    },

    getNearestSunday(dateString) {
      // 解析输入日期字符串
      const givenDate = new Date(dateString);

      // 获取给定日期的星期几，0代表星期日，1代表星期一，以此类推
      const dayOfWeek = givenDate.getDay();
      if (dayOfWeek == 0) {
        return dateString;
      }

      // 计算距离最近的周日的日期
      const diff = dayOfWeek > 0 ? dayOfWeek : 7; // 计算距离最近的周日的天数差
      const nearestSunday = new Date(givenDate.getTime() - diff * 24 * 60 * 60 * 1000); // 使用差值减去给定日期的时间戳

      // 根据输入日期字符串的格式输出最近的周日的日期字符串
      const year = nearestSunday.getFullYear();
      const month = nearestSunday.getMonth() + 1;
      const day = nearestSunday.getDate();
      const hours = nearestSunday.getHours();
      const minutes = nearestSunday.getMinutes();
      const seconds = nearestSunday.getSeconds();

      const formattedDate = `${year}-${this.padNumber(month)}-${this.padNumber(day)} ${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
      return formattedDate;
    },

    // 辅助函数：补零
    padNumber(number) {
      return number < 10 ? '0' + number : number;
    },

    modifyCourse(eventId, name, isOnline, isGroup, customType,
      buildingId, buildingName, link, date, startTime, endTime) {
      const event = {
        eventId: eventId,
        name: name,
        isOnline: isOnline,
        isGroup: isGroup,
        customType: customType,
        buildingId: buildingId,
        buildingName: buildingName,
        link: link,
        date: date.slice(0, 10),
        startTime: startTime.slice(12, 14),
        endTime: endTime.slice(12, 14),
        cycle: cycle,
      }
      this.selectedEvent = event;
      console.log(this.selectedEvent);
    },
    updateCourse() {
      // window.alert('1');
      const event = {
        eventId: this.selectedEvent.eventId,
        name: this.selectedEvent.name,
        isOnline: this.selectedEvent.isOnline,
        isGroup: this.selectedEvent.isGroup,
        customType: this.selectedEvent.customType,
        buildingId: this.selectedEvent.buildingId,
        buildingName: this.selectedEvent.buildingName,
        link: this.selectedEvent.link,
        date: this.selectedEvent.date + ' ' + this.selectedEvent.startTime + ':00:00',
        startTime: this.selectedEvent.date + ' ' + this.selectedEvent.startTime + ':00:00',
        endTime: this.selectedEvent.date + ' ' + ('0' + (parseInt(this.selectedEvent.endTime) - 1) + '').slice(-2) + ':59:59',
        cycle: this.selectedEvent.cycle,
      }
      const user = {
        userId: this.$USER.userId,
        type: this.$USER.type,
        groupId: this.$USER.groupId,
      }
      // window.alert('1');

      this.axios({
        method: 'put',
        url: 'http://ds.nginx.show/events/updateEvent',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          event, user
        },
      }).then(res => {
        if(res.data.statusCode == 500){
          this.text = res.data.msg;
          this.snackbar = true;
        }else if(res.data.statusCode == 200){
          this.text = '操作成功';
          this.snackbar = true;
        }
        console.log(res);
      }).catch(function (error) {
        console.log(error);
      })
    },
    deleteCourse() {
      const event = {
        eventId: this.selectedEvent.eventId,
        name: this.selectedEvent.name,
        isGroup: this.selectedEvent.isGroup,
        eventType: this.selectedEvent.eventType,
      }
      const user = {
        userId: this.$USER.userId,
        type: this.user.type,
        groupId: this.user.groupId,
      }
      this.axios({
        method: 'delete',
        url: 'http://ds.nginx.show/events/deleteEvent',
        data: {
          event, user
        },
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        console.log(res);
      }).catch(function (error) {
        console.log(error);
      })
    },
    getSundayDatesInMonth(dateString) {
      const year = Number(dateString.slice(0, 4));
      const month = Number(dateString.slice(5, 7)) - 1; // 月份从0开始，需要减1
      const sundays = [];

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const currentDay = firstDayOfMonth.getDay();
      let firstSunday = firstDayOfMonth;

      if (currentDay !== 0) {
        const daysUntilNextSunday = 7 - currentDay;
        firstSunday.setDate(firstSunday.getDate() + daysUntilNextSunday);
      }

      while (firstSunday <= lastDayOfMonth) {
        const formattedDate = firstSunday.toISOString().slice(0, 10);
        sundays.push(formattedDate);
        firstSunday.setDate(firstSunday.getDate() + 7);
      }
      this.Sundays = sundays;
      return sundays;
    },
    getMonthAll() {
      for (var i = 0; i < this.Sundays.length; i++) {
        const userId = this.$USER.userId;
        const date = this.getNearestSunday(this.Sundays[i] + ' 00:00:00');

        this.axios({
          method: 'get',
          url: 'http://ds.nginx.show/events/WeekLessonAndExam/' + userId + '&&' + date,
        }).then(res => {
          console.log(res);
          for (var i = 0; i < res.data.data.length; i++) {
            const course = {
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
              start: res.data.data[i].startTime,
              end: res.data.data[i].endTime,
              color: this.colors[i % 7],
              cycle: res.data.data[i].cycle,
              timed: true,
            }
            this.events.push(course);
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    },

  },
}
</script>
