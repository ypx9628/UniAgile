<template>
    <v-container>
        <ScheduleSearch />
        <v-row class="pl-5 pr-5">
            <v-col>
                <v-card min-height="200" rounded="lg" elevation="5">
                    <v-toolbar color="blue-grey lighten-4" flat rounded="t-lg">
                        <v-toolbar-title class="text-h6 font-weight-bold ml-4">
                            <v-icon large color="blue-grey darken-4">mdi-account-group-outline</v-icon>
                            今日集体活动
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text rounded @click="dialog = true, isGroup = true">
                            <v-icon>mdi-plus-box-multiple</v-icon>
                        </v-btn>
                        <!-- <v-btn color="success" @click="dialog=true">text</v-btn> -->
                    </v-toolbar>

                    <v-row class="px-4 pt-4">
                        <template v-for="(item, index) in todayGroAct.data">
                            <v-col :key="index" cols="12">
                                <v-card elevation="0" class="px-2">
                                    <v-row>
                                        <v-col cols="3">
                                            <v-menu open-on-hover offset-y bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="grey darken-3" text class="ma-0 pa-0 pb-3" v-bind="attrs"
                                                        v-on="on">
                                                        <v-icon>mdi-account-group</v-icon>
                                                        <span class="text-subtitle-1 font-weight-bold">{{ item.name
                                                        }}</span>
                                                    </v-btn>
                                                </template>
                                                <v-card min-width="100" min-height="100" max-width="300" rounded="lg"
                                                    class="pa-3" elevation="3">
                                                    <template>

                                                        <span class="font-weight-bold mr-4">活动地点/链接</span>
                                                        <span v-if="isOnline">{{ item.link }}</span>
                                                        <span v-else>{{ item.buildingName }}</span>
                                                        <br>
                                                        <span class="font-weight-bold mr-4 mt-2">详情</span>
                                                        <span>{{ item.customType }}</span>
                                                    </template>
                                                </v-card>

                                            </v-menu>
                                        </v-col>

                                        <v-col cols="2">
                                            <span class="font-weight-bold grey--text">{{ item.startTime }}</span>
                                        </v-col>
                                        <v-col cols="2">
                                            <span class="font-weight-bold grey--text">{{ item.endTime }}</span>
                                        </v-col>
                                        <v-col cols="2">
                                            <span class="font-weight-bold green--text">{{ item.status }}</span>
                                        </v-col>

                                        <v-col cols="1">
                                            <v-btn fab icon small color="blue-grey darken-1"
                                                @click="modify = true; modifyEvent(item.eventId, item.name, item.eventType, item.isOnline, item.isGroup, item.date,
                                                    item.startTime, item.endTime, item.cycle, item.buildingName, item.buildingId, item.customType)">
                                                <v-icon>mdi-pencil-outline</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn fab icon small color="red accent-1" @click="deleteEvent(item.eventId, item.name, item.eventType, item.isOnline, item.isGroup, item.date,
                                                item.startTime, item.endTime, item.cycle)">
                                                <v-icon>mdi-trash-can-outline</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </template>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- 个人活动 -->
        <v-row class="mt-8 pl-5 pr-5 mb-5">
            <v-col>
                <v-card min-height="300" rounded="lg" elevation="5">
                    <v-toolbar short color="blue-grey lighten-4" flat rounded="t-lg">
                        <v-toolbar-title class="text-h6 font-weight-bold ml-4">
                            <v-icon large color="blue-grey darken-4">mdi-account-outline</v-icon>
                            今日个人活动
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text rounded @click="dialog = true, isGroup = false">
                            <v-icon>mdi-plus-box-multiple</v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-row class="px-4 pt-4">
                        <template v-for="(item, index) in todayPerAct.data">
                            <v-col :key="index" cols="12">
                                <v-card elevation="0" class="px-2">
                                    <v-row>
                                        <v-col cols="3">
                                            <v-menu open-on-hover offset-y bottom>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="grey darken-3" text class="ma-0 pa-0 pb-3" v-bind="attrs"
                                                        v-on="on"><v-icon class="mr-4">mdi-account</v-icon>
                                                        <span class="text-subtitle-1 font-weight-bold">{{ item.name
                                                        }}</span>
                                                    </v-btn>
                                                </template>
                                                <v-card min-width="100" min-height="100" max-width="300" rounded="lg"
                                                    class="pa-3" elevation="3">
                                                    <span class="font-weight-bold mr-4">活动地点/链接</span>
                                                    <span v-if="isOnline">{{ item.link }}</span>
                                                    <span v-else>{{ item.buildingName }}</span>
                                                    <br>
                                                    <span class="font-weight-bold mr-4 mt-2">活动详情</span>
                                                    <span>{{ item.customType }}</span>
                                                </v-card>
                                            </v-menu>

                                        </v-col>

                                        <v-col cols="2">
                                            <span class="font-weight-bold grey--text">{{ item.startTime }}</span>
                                        </v-col>
                                        <v-col cols="2">
                                            <span class="font-weight-bold grey--text">{{ item.endTime }}</span>
                                        </v-col>
                                        <v-col cols="2">
                                            <span class="font-weight-bold green--text">{{ item.status }}</span>

                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn fab icon small color="blue-grey darken-1"
                                                @click="modify = true; modifyEvent(item.eventId, item.name, item.eventType, item.isOnline, item.isGroup, item.date,
                                                    item.startTime, item.endTime, item.cycle, item.buildingName, item.buildingId, item.customType)">
                                                <v-icon>mdi-pencil-outline</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-btn fab icon small color="red accent-1" @click="deleteEvent(item.eventId, item.name, item.eventType, item.isOnline, item.isGroup, item.date,
                                                item.startTime, item.endTime, item.cycle)">
                                                <v-icon>mdi-trash-can-outline</v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-card>
                            </v-col>
                        </template>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- 添加活动 -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card class="px-2 pt-6 pb-2 rounded-lg">
                <v-card-title class="text-h5 ml-2 font-weight-bold">
                    新建活动
                </v-card-title>
                <v-container fluid class="px-6">
                    <v-row class="mx-auto">
                        <v-col cols="6">
                            <v-text-field label="活动名称" outlined dense v-model="actInput.name"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="6">
                            <v-select dense v-model="actInput.type" :items="actType" item-text="name" item-value="value"
                                label="活动类型" outlined>
                                <!-- <option 
                        v-for="(item, index) in actType" :key="index" :label="item" :value="index"
                        ></option> -->
                            </v-select>
                        </v-col>
                        <v-col cols="6" class="d-flex">
                            <v-switch label="线上活动" inset v-model="isOnline"></v-switch>
                        </v-col>
                        <v-col cols="6" v-if="isOnline">
                            <v-text-field outlined dense label="活动链接" v-model="actInput.loc">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" v-if="!isOnline">
                            <v-select dense clearable :items="locations" v-model="actInput.loc" label="活动地点"></v-select>
                            <!-- <v-text-field outlined dense label="活动地点" v-model="actInput.loc">
                            </v-text-field> -->
                        </v-col>
                        <v-col cols="4">
                            <v-menu ref="menu">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense v-model="actDate" label="活动日期"
                                        prepend-icon="mdi-calendar-range-outline" readonly outlined v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="actDate" no-title scrollable>
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4">
                            <v-select dense :items="act_hour" v-model="actInput.start" label="开始时间（时）"></v-select>
                            <!-- <v-text-field outlined dense label="开始时间" v-model="actInput.start">
                        </v-text-field> -->
                        </v-col>
                        <v-col cols="4">
                            <v-select dense :items="act_hour" v-model="actInput.end" label="结束时间（时）"></v-select>
                            <!-- <v-text-field outlined dense label="结束时间" v-model="actInput.end">
                        </v-text-field> -->
                        </v-col>
                        <!-- <div class="font-weight-bold mt-5">
                        活动起止时间
                    </div> -->
                        <v-col cols="6">
                            <v-text-field label="循环周期（天）" outlined dense v-model="actInput.cycle"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mx-1">
                        <v-textarea filled clearable dense label="活动简介（不超过10字）" auto-grow row="2"
                            v-model="actInput.info"></v-textarea>
                    </v-row>

                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">取消
                    </v-btn>
                    <v-btn color="blue darken-1 font-weight-bold" text @click="addEvent(); dialog = false">添加
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- 修改日程 -->
        <v-dialog v-model="modify" persistent max-width="600px">
            <v-card class="px-2 pt-6 pb-2 rounded-lg">
                <v-card-title class="text-h5 ml-2 font-weight-bold">
                    修改活动
                </v-card-title>
                <v-container fluid class="px-6">
                    <v-row class="mx-auto">
                        <v-col cols="6">
                            <v-text-field label="活动名称" outlined dense v-model="selectedEvent.name"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="6">
                            <v-select dense v-model="selectedEvent.eventType" :items="actType" item-text="name"
                                item-value="value" label="活动类型" outlined>
                                <!-- <option 
                        v-for="(item, index) in actType" :key="index" :label="item" :value="index"
                        ></option> -->
                            </v-select>
                        </v-col>
                        <v-col cols="6" class="d-flex">
                            <v-switch label="线上活动" inset v-model="isOnline"></v-switch>
                        </v-col>
                        <v-col cols="6" v-if="isOnline">
                            <v-text-field outlined dense label="活动链接" v-model="selectedEvent.link">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6" v-if="!isOnline">
                            <v-select dense clearable :items="locations" v-model="selectedEvent.buildingName"
                                label="活动地点"></v-select>
                            <!-- <v-text-field outlined dense label="活动地点" v-model="selectedEvent.buildingName">
                            </v-text-field> -->
                        </v-col>
                        <v-col cols="4">
                            <v-menu ref="menu">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field dense v-model="selectedEvent.date" label="活动日期"
                                        prepend-icon="mdi-calendar-range-outline" readonly outlined v-bind="attrs"
                                        v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="selectedEvent.date" no-title scrollable>
                                    <v-spacer></v-spacer>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="4">
                            <v-select dense :items="act_hour" v-model="selectedEvent.start" label="开始时间（时）"></v-select>
                            <!-- <v-text-field outlined dense label="开始时间" v-model="actInput.start">
                        </v-text-field> -->
                        </v-col>
                        <v-col cols="4">
                            <v-select dense :items="act_hour" v-model="selectedEvent.end" label="结束时间（时）"></v-select>
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
                    <v-btn color="blue darken-1" text @click="modify = false">取消
                    </v-btn>
                    <v-btn color="blue darken-1 font-weight-bold" text @click="updateEvent(); modify = false">确认修改
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :vertical="vertical">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="indigo" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>

    </v-container>
</template>

<script>
import Vue from 'vue';
import ScheduleSearch from './ScheduleSearch.vue';
const TIME_RANGE = 1000000;
var time_bucket = new Array(TIME_RANGE).fill(0);

export default {
    data: () => ({
        time: Vue.prototype.$SYSTIME,
        today: Vue.prototype.$TODAY,
        user: Vue.prototype.$USER,
        events: Vue.prototype.$dayEnents,


        event_type: 0,
        snackbar: false,
        dialog: false,
        modify: false,
        modifyInput: { name: '', type: '', },
        // notice_set:false,
        week_items: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
        offset_items: ['当天', '提前1天', '提前2天', '提前3天', '提前4天', '提前5天'],
        time_items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        notice: {
            id: 0,
            mul: false,
            week: [{ t: false }, { t: false }, { t: false }, { t: false }, { t: false }, { t: false }, { t: false }],
            offset: 0,
            time: 0,
        },
        time_code: [{ t: false }, { t: false }, { t: false }, { t: false }, { t: false },
        { t: false }, { t: false }, { t: false }, { t: false }, { t: false },
        { t: false }, { t: false }, { t: false }, { t: false }, { t: false }],
        actInput: { name: '', type: '', start: '', end: '', loc: '', info: '', cycle: '' },
        actType: [{ name: '课程', value: '0' }, { name: '考试', value: '1' }, { name: '活动', value: '2' }, { name: '临时事务', value: '3' }, { name: '闹钟', value: '4' }],
        isOnline: false,
        isGroup: false,
        act_hour: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        actDate: null,
        pickActDate: false,
        todayGroAct: { data: [] },
        todayPerAct: { data: [] },
        text: '',
        selectedEvent: { name: '', type: '', start: '', end: '', loc: '', info: '', cycle: '', date: null },
        locations: ['学生宿舍十号-南', '学生宿舍十号-西', '学生就业指导中心',
            '学生宿舍十一号',
            '北邮锦江酒店-校内入口',
            '北邮锦江酒店-北门',
            '教学楼九号',
            '学生宿舍九号',
            '留学生公寓',
            '青年公寓',
            '新食堂-西',
            '新食堂-东',
            '学生宿舍五号',
            '学生宿舍八号',
            '学生宿舍三号',
            '学生宿舍四号',
            '大电视',
            '学生宿舍十三号',
            '鸿通楼',
            '邮局',
            '教学楼四号-西',
            '教学楼四号-南',
            '教学楼四号-东',
            '毛主席像',
            '校训石',
            '教学楼三号-西',
            '教学楼三号-北',
            '校车出发点',
            '校医院',
            '南区超市',
            '教学楼三号-东',

            '学生宿舍四号-南1入口',


            '学生宿舍四号-南2入口',


            '学生宿舍一号',


            '学生宿舍二号',


            '经管楼',

            '快递站',


            '学生宿舍六号',


            '综合服务楼-北',


            '浴室',


            '学生活动中心-南',


            '学生活动中心-北',


            '学生发展中心',


            '档案馆',


            '时光广场',


            '图书馆',


            '行政办公楼（小白楼）',


            '教学楼一号-西',


            '教学楼一号-南',


            '教学楼一号-东',


            '主楼',


            '教学楼二号-西',


            '教学楼二号-北',


            '创新楼',


            '科学会堂-南',


            '科学会堂',


            '体育馆',


            '体育场-侧门',
            '体育场',
            '李白烈士像',
            '体育馆-南',
            '游泳馆',
            '体育馆-北',
            '篮球场',
            '学生宿舍二十九号',
            '老食堂-南',
            '老食堂-西',
            '风味食堂',
            '科研楼',
            '青年教师公寓',
            '后勤处/保卫处/东配楼',
            '北门',
            '西门',
            '东门',
            '南门',
            '明光楼',
            '南区家属区1',
            '南区家属区2',
            '南区小超市',
            '南区家属区3',
            '网球场',
            '国旗',
            '音乐喷泉',
            '明光楼-南'],


    }),
    components: { ScheduleSearch },
    methods: {
        //
        detectJudge(element) {
            if (time_bucket[Math.floor(element.start_num / 100) % TIME_RANGE] != 0) return false;
            if (time_bucket[Math.floor(element.end_num / 100) % TIME_RANGE] != 0) return false;

            let tmp_bucket = time_bucket.slice(0);
            tmp_bucket[Math.floor(element.start_num / 100) % TIME_RANGE] = element.id;
            tmp_bucket[Math.floor(element.end_num / 100) % TIME_RANGE] = -element.id;

            for (let i = 0, preSum = 0; i < TIME_RANGE; i++) {
                if ((preSum > 0) && tmp_bucket[i] > 0) {
                    return false;
                }

                preSum += tmp_bucket[i];
            }
            time_bucket = tmp_bucket;
            return true;
        },
        isdetect(element) {
            for (var i = 0; i < this.events.data.length; i++) {
                this.detectJudge(this.events.data[i]);
            }
            var ret = this.detectJudge(element);
            time_bucket.fill(0);
            return ret;
        },
        addEvent() {

            const name = this.actInput.name;
            const eventType = this.actInput.type;
            const isOnline = this.isOnline;
            const isGroup = this.isGroup;
            const customType = this.actInput.info;
            var link = null;
            var buildingName = null;
            var buildingId = null;
            if (isOnline) {
                link = this.actInput.loc;
            } else {
                buildingName = this.actInput.loc;
            }



            const startTime = this.actDate + ' ' + this.actInput.start + ':00:00';
            const endTime = this.actDate + ' ' + ('0' + (parseInt(this.actInput.end) - 1) + '').slice(-2) + ':59:59';
            const date = startTime;
            const duration = this.actInput.end - this.actInput.start;
            const cycle = parseInt(this.actInput.cycle);
            const event = {
                name, eventType, isOnline, isGroup, customType, buildingId, buildingName, link, date, startTime, endTime, duration, cycle
            };
            const userId = this.user.userId;
            const type = this.user.type;
            const groupId = this.user.groupId;
            const username = this.user.name;
            const password = this.user.password;
            const mail = this.user.mail;
            const user = {
                userId, type, groupId, username, password, mail
            };
            this.axios({
                method: 'post',
                url: 'http://ds.nginx.show/events/addEvent',
                data: { event, user }
            }).then(res => {
                console.log(res);
                // window.alert('1');
                this.actInput = { name: '', type: '', start: '', end: '', loc: '', info: '', cycle: '' };
                if (res.data.statusCode == 500) {
                    // let time_range = [];\
                    // window.alert('2');

                    console.log(res.data.msg);
                    this.text = res.data.msg;
                    this.snackbar = true;
                    window.alert(res.data.msg);
                    for (var i = 0; i < (3 > res.data.data.length ? res.data.data.length : 3); i++) {
                        window.alert(res.data.data[i][0] + '时~' + res.data.data[i][1] + '时');
                        console.log(res.data.data[i][0] + '时~' + res.data.data[i][1] + '时');
                    }

                }else if(res.data.statusCode == 200){
                    this.text = '操作成功';
                    this.snackbar = true;
                }

            }).catch(function (error) {
                console.log(error);

            });
        },

        getGroAct() {
            const date = this.$dateString();
            this.axios({
                method: 'get',
                url: 'http://ds.nginx.show/events/GroupActivities/' + this.user.userId + '&&' + date,
            }).then(res => {
                console.log(res);
                for (var i = 0; i < res.data.data.length; i++) {
                    this.todayGroAct.data[i] = res.data.data[i];
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        getPerAct() {
            const date = this.$dateString();
            this.axios({
                method: 'get',
                url: 'http://ds.nginx.show/events/PersonalEvents/' + this.user.userId + '&&' + date,
            }).then(res => {
                console.log(res);
                for (var i = 0; i < res.data.data.length; i++) {
                    this.todayPerAct.data[i] = res.data.data[i];
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        deleteEvent(eventId, name, eventType, isOnline, isGroup, date, startTime, endTime, cycle) {
            const event = {
                eventId: eventId,
                name: name,
                eventType: eventType,
                isOnline: isOnline,
                isGroup: isGroup,
                date: date,
                startTime: startTime,
                endTime: endTime,
                cycle: cycle,
            }
            const user = {
                userId: this.user.userId,
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
                if(res.data.statusCode == 200){
                    this.text = '操作成功';
                    this.snackbar = true;
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
        modifyEvent(eventId, name, eventType, isOnline, isGroup, date, startTime, endTime, cycle, buildingName, buildingId, customType) {
            const event = {
                eventId: eventId,
                name: name,
                eventType: this.actType[eventType].value,
                isOnline: isOnline,
                isGroup: isGroup,
                date: date.slice(0, 10),
                startTime: startTime.slice(12, 14),
                endTime: endTime.slice(12, 14),
                cycle: cycle,
                buildingName: buildingName,
                buildingId: buildingId,
                customType: customType,
            }
            this.selectedEvent = event;
            console.log(this.selectedEvent);
            console.log(event);
        },
        updateEvent() {
            const event = {
                eventId: this.selectedEvent.eventId,
                name: this.selectedEvent.name,
                eventType: this.selectedEvent.type,
                isOnline: this.selectedEvent.isOnline,
                isGroup: this.selectedEvent.isGroup,
                date: this.selectedEvent.date + ' ' + this.selectedEvent.start + ':00:00',
                startTime: this.selectedEvent.date + ' ' + this.selectedEvent.start + ':00:00',
                endTime: this.selectedEvent.date + ' ' + ('0' + (parseInt(this.selectedEvent.end) - 1) + '').slice(-2) + ':59:59',
                cycle: this.selectedEvent.cycle,
                buildingName: this.selectedEvent.buildingName,
                buildingId: this.selectedEvent.buildingId,
                customType: this.selectedEvent.info,
            }
            const user = {
                userId: this.user.userId,
                type: this.user.type,
                groupId: this.user.groupId,
            }
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
                console.log(res);
                if (res.data.statusCode == 500) {
                    this.text = res,data.msg;
                    this.snackbar = true;
                    // window.alert(res.data.msg);
                } else if (res.data.statusCode == 200) {
                    this.text = '操作成功';
                    this.snackbar = true;
                    // window.alert('操作成功');
                }
            }).catch(function (error) {
                console.log(error);
            })
        },
    },
    created() {
        // this.$getDayEvents();
        this.getGroAct();
        this.getPerAct();
    }
}
</script>
