<template>
    <!-- 活动搜索 -->
    <v-row class="pl-5 pr-5 mt-2">
        <v-col cols="12">
            <v-card elevation="6" rounded="lg" class="mb-6" min-height="100">
                <v-toolbar short color="blue-grey lighten-4" flat rounded="t-lg">
                    <v-row class="mt-4" dense>
                        <v-col cols="2" class="pr-2">
                            <v-toolbar-title class="text-h5 font-weight-black ml-4 mt-1">
                                <v-icon large color="blue-grey darken-4">mdi-text-search-variant</v-icon>
                                Search
                            </v-toolbar-title>
                        </v-col>
                        <!-- <v-col cols="1">
                            <v-text-field outlined dense label="ID" v-model=" SearchInput.id">
                            </v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-btn fab text dense small @click="searchEventsbyId();byId=true;byName=false">
                                <v-icon >mdi-magnify</v-icon>
                                
                            </v-btn>
                        </v-col> -->

                        <v-col cols="2" class="pl-0">
                            <v-text-field outlined dense label="name" v-model="SearchInput.name"
                                prepend-icon="mdi-rename-outline">
                            </v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-btn text fab dense small @click="searchEventsbyName(); byName = true; byDateAndType = false">
                                <v-icon>mdi-magnify</v-icon>

                            </v-btn>
                        </v-col>

                        <v-col cols="2" class="pl-0">
                            <v-menu ref="menu">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field outlined dense label="date" v-model="SearchInput.time" readonly
                                        prepend-icon="mdi-calendar-range-outline" v-bind="attrs" v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="SearchInput.time" no-title scrollable>

                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="1">
                            <v-btn text fab dense small
                                @click="searchEventsbyDateAndType(); byName = false; byDateAndType=true">
                                <v-icon>mdi-magnify</v-icon>

                            </v-btn>
                        </v-col>

                        <v-col cols="2" class="pl-0">
                            <!-- <v-select :items="actType" v-model="SearchInput.type" label="type" item-text="name"
                                item-value="value" outlined dense prepend-icon="mdi-list-box-outline"></v-select> -->
                            <v-text-field outlined dense label="type" v-model="SearchInput.type"
                            prepend-icon="mdi-list-box-outline">
                            </v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-btn text fab dense small @click="searchEventsbyDateAndType(); byName = false; byDateAndType=true">
                                <v-icon>mdi-magnify</v-icon>

                            </v-btn>
                        </v-col>

                        <!-- <v-col cols="1">
                            <v-text-field outlined dense label="时间" v-model=" SearchInput.time">
                            </v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-text-field outlined dense label="地点" v-model=" SearchInput.loc">
                            </v-text-field>
                        </v-col> -->
                    </v-row>
                    <v-btn text rounded @click="refresh()">
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>

                </v-toolbar>
                <v-row class="px-4 pt-4">
                    <!-- 通过id搜索时 -->
                    <v-col v-if="byId">
                        <v-row>
                            <v-col cols="4">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-identifier</v-icon>
                                    活动ID</v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand</v-icon>
                                    开始时间</v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand-complete</v-icon>
                                    结束时间</v-btn>
                            </v-col>
                            <!-- <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-list-status</v-icon>
                                    活动状态</v-btn>
                            </v-col> -->
                        </v-row>
                    </v-col>
                    <!-- 通过名称搜索时 -->
                    <v-col v-if="byName || byDateAndType">
                        <v-row>
                            <v-col cols="4">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-list-box-outline</v-icon>
                                    活动名称</v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand</v-icon>
                                    开始时间</v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand-complete</v-icon>
                                    结束时间</v-btn>
                            </v-col>
                            <!-- <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-list-status</v-icon>
                                    活动状态</v-btn>
                            </v-col> -->
                        </v-row>
                    </v-col>
                    <!-- 通过日期类型搜索结果展示 -->
                    <template v-if="byDateAndType">
                        <v-col v-for="(item, index) in res_dateAndType.data" :key="index" cols="12">
                            <v-card elevation="0" class="px-2">
                                <v-row>
                                    <v-col cols="4">
                                        <v-menu open-on-hover offset-y bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="grey" text class="ma-0 pa-0 pb-3" v-bind="attrs" v-on="on">
                                                    <v-icon class="mr-4" v-if="item.isGroup">mdi-account-multiple</v-icon>
                                                    <v-icon class="mr-4" v-if="!item.isGroup">mdi-account</v-icon>
                                                    <span class="text-subtitle-1 font-weight-bold">{{ item.name }}</span>
                                                </v-btn>
                                            </template>
                                            <v-card min-width="100" min-height="100" max-width="300" rounded="lg"
                                                class="pa-3" elevation="3">
                                                <template>
                                                    <span class="font-weight-bold mr-4">地点/链接</span>
                                                    <span v-if="item.isOnline">{{ item.link }}</span>
                                                    <span v-else>{{ item.buildingName }}</span>
                                                    <br>
                                                    <span class="font-weight-bold mr-4 mt-2">详情</span>
                                                    <span>{{ item.customType }}</span>
                                                </template>
                                            </v-card>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="4">
                                        <span class="font-weight-bold grey--text">{{ item.startTime }}</span>
                                    </v-col>
                                    <v-col cols="4">
                                        <span class="font-weight-bold grey--text">{{ item.endTime }}</span>
                                    </v-col>
                                    <!-- <v-col cols="3">
                                        <span class="font-weight-bold green--text">{{ item.status }}</span>
                                    </v-col> -->
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                    <!-- 通过名称搜索结果展示 -->
                    <template v-if="byName">
                        <v-col v-for="(item, index) in res_name.data" :key="index" cols="12">
                            <v-card elevation="0" class="px-2">
                                <v-row>
                                    <v-col cols="3">
                                        <v-menu open-on-hover offset-y bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="grey" text class="ma-0 pa-0 pb-3" v-bind="attrs" v-on="on">
                                                    <v-icon class="mr-4" v-if="item.isGroup">mdi-account-multiple</v-icon>
                                                    <v-icon class="mr-4" v-if="!item.isGroup">mdi-account</v-icon>
                                                    <span class="text-subtitle-1 font-weight-bold">{{ item.name }}</span>
                                                </v-btn>
                                            </template>
                                            <v-card min-width="100" min-height="100" max-width="300" rounded="lg"
                                                class="pa-3" elevation="3">
                                                <template>
                                                    <span class="font-weight-bold mr-4">地点/链接</span>
                                                    <span v-if="item.isOnline">{{ item.link }}</span>
                                                    <span v-else>{{ item.buildingName }}</span>
                                                    <br>
                                                    <span class="font-weight-bold mr-4 mt-2">详情</span>
                                                    <span>{{ item.customType }}</span>
                                                </template>
                                            </v-card>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold grey--text">{{ item.startTime }}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold grey--text">{{ item.endTime }}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold green--text">{{ item.status }}</span>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                </v-row>

            </v-card>
        </v-col>

    </v-row>
</template>

<script>

const TIME_RANGE = 1000000;
var time_bucket = new Array(TIME_RANGE).fill(0);
export default {
    data: () => ({
        SearchInput: { id: '', name: '', time: '', type: '' },
        // res_id: { data: [] },
        res_name: { data: [] },
        res_dateAndType: { data: [] },
        // res_type: { data: [] },
        actType: [{ name: '课程', value: '0' }, { name: '考试', value: '1' }, { name: '活动', value: '2' }, { name: '临时事务', value: '3' }, { name: '闹钟', value: '4' }],
        // byId: false,
        byName: false,
        byDateAndType: false,

    }),
    methods: {
        

        searchEventsbyName() {
            const eventName = this.SearchInput.name;
            this.axios({
                method: 'get',
                url: 'http://ds.nginx.show/events/eventName/' + eventName,
                data: {
                    // eventId: eventId,
                },
                header: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res);

                this.res_name.data = res.data.data;

                console.log(this.res_name.data);
            }).catch(function (error) {
                console.log(error);
            });
        },
        searchEventsbyDateAndType() {
            // window.alert('1');
            let Date = this.SearchInput.time ;
            const type = this.SearchInput.type;
            const userId = this.$USER.userId;
            if(Date != ''){
                Date += ' 00:00:00';
            }
            // window.alert(Date);
            this.axios({
                method: 'get',
                url: 'http://ds.nginx.show/events/TypeAndDate/' + userId + '&&' + Date + '&&' + type,
                data: {
                    // eventId: eventId,
                },
                // header:{
                //     'Content-Type':'application/json',
                // }
            }).then(res => {
                console.log(res);
                for(var i=0; i<res.data.data.length; i++){
                    this.res_dateAndType.data[i] = res.data.data[i];
                }
                console.log(this.res_dateAndType.data);
            }).catch(function (error) {
                console.log(error);
            });
        },

    }
}
</script>