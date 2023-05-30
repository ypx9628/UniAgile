<template>
    <v-row class="fill-height">
      <v-col>
        <v-sheet class="rounded-t-lg" elevation=5>
          <v-toolbar
            flat
          >
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
              fab
              text
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
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
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
</template>


<script>
  export default {
    data: () => ({
      focus: '2023-05-01',
      type: 'month',
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
    }),
    mounted () {
      // this.$refs.calendar.checkChange();
      // 初始化时生成自定义日程
      this.generateCustomEvents();

    },
    created(){
      this.getWeekLesAndExa();
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = '2023-05-01'
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
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
      updateRange ({ start, end }) {
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
      rnd (a, b) {
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
      this.events.push(customEvent1, customEvent2 ,customEvent3, customEvent4);
      },

      getWeekLesAndExa(){
        const userId = this.$USER.userId;
        const date = this.getNearestSunday(this.$dateString());
        
        this.axios({
          method: 'get',
          url: 'http://10.28.236.228:16663/events/WeekLessonAndExam/' + userId + '&&' + date,
        }).then(res=>{
          console.log(res);
          for(var i=0; i<res.data.data.length; i++){
            const course =  {
              id: res.data.data[i].eventId,
              name: res.data.data[i].name,
              start: res.data.data[i].startTime,
              end: res.data.data[i].endTime,
              color: this.colors[i%7],
              buildingName: res.data.data[i].buildingName,
              timed: true,
            }
            this.events.push(course);
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      
      getNearestSunday(dateString) {
        // 解析输入日期字符串
        const givenDate = new Date(dateString);

        // 获取给定日期的星期几，0代表星期日，1代表星期一，以此类推
        const dayOfWeek = givenDate.getDay();

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

    },
  }
</script>
