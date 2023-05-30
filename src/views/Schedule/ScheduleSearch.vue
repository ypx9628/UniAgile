<template>
    <!-- 活动搜索 -->
    <v-row>
        <v-col cols="12">
            <v-card elevation="6" rounded="lg" class="mb-6" min-height="100">
                <v-toolbar short color="grey lighten-3" flat rounded="lg">
                    <v-row class="mt-4" dense>
                        <v-col cols="3">
                            <v-toolbar-title class="text-h6 font-weight-bold ml-4 mt-1">
                                活动搜索
                            </v-toolbar-title>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field outlined dense label="活动ID" v-model=" SearchInput.id">
                            </v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-btn text rounded @click="searchEventsbyId();byId=true;byName=false">
                                <v-icon >mdi-magnify</v-icon>
                                通过id搜索
                            </v-btn>
                        </v-col>
                        
                        <v-col cols="2" class="pl-5">
                            <v-text-field outlined dense label="名称" v-model=" SearchInput.name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="1">
                            <v-btn text rounded @click="searchEventsbyName();byName=true;byId=false">
                                <v-icon >mdi-magnify</v-icon>
                                通过名称搜索
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
                        <v-icon >mdi-refresh</v-icon>
                    </v-btn>
                    
                </v-toolbar>
                <v-row class="px-4 pt-4">
                    <!-- 通过id搜索时 -->
                    <v-col v-if="byId">
                        <v-row>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-identifier</v-icon>
                                    活动ID</v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand</v-icon>
                                    开始时间</v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand-complete</v-icon>
                                    结束时间</v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-list-status</v-icon>
                                    活动状态</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!-- 通过名称搜索时 -->
                    <v-col v-if="byName">
                        <v-row>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-list-box-outline</v-icon>
                                    活动名称</v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand</v-icon>
                                    开始时间</v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-timer-sand-complete</v-icon>
                                    结束时间</v-btn>
                            </v-col>
                            <v-col cols="3">
                                <v-btn small rounded class="elevation-1">
                                    <v-icon>mdi-list-status</v-icon>
                                    活动状态</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!-- 通过id搜索结果展示 -->
                    <template v-if="byID">
                        <v-col v-for="(item, index) in res_id.data" :key="index" cols="12">
                            <v-card elevation="0" class="px-2">
                                <v-row>
                                    <v-col cols="3">
                                        <v-menu open-on-hover offset-y bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="grey" text 
                                                class="ma-0 pa-0 pb-3"
                                                v-bind="attrs" v-on="on"
                                                >
                                                    <v-icon class="mr-4" v-if="item.isGroup">mdi-account-multiple</v-icon>
                                                    <v-icon class="mr-4" v-if="!item.isGroup">mdi-account</v-icon>
                                                    <span class="text-subtitle-1 font-weight-bold">{{item.id}}</span>
                                                </v-btn>
                                            </template>
                                            <v-card min-width="100" min-height="100" max-width="300" rounded="lg" class="pa-3" elevation="3">
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
                                        <span class="font-weight-bold grey--text">{{item.startTime}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold grey--text">{{item.endTime}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold green--text">{{item.status}}</span>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </template>
                    <!-- 通过名称搜索结果展示 -->
                    <template v-if="byName">
                        <v-col v-for="(item, index) in res_id.data" :key="index" cols="12">
                            <v-card elevation="0" class="px-2">
                                <v-row>
                                    <v-col cols="3">
                                        <v-menu open-on-hover offset-y bottom>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="grey" text 
                                                class="ma-0 pa-0 pb-3"
                                                v-bind="attrs" v-on="on"
                                                >
                                                    <v-icon class="mr-4" v-if="item.isGroup">mdi-account-multiple</v-icon>
                                                    <v-icon class="mr-4" v-if="!item.isGroup">mdi-account</v-icon>
                                                    <span class="text-subtitle-1 font-weight-bold">{{item.name}}</span>
                                                </v-btn>
                                            </template>
                                            <v-card min-width="100" min-height="100" max-width="300" rounded="lg" class="pa-3" elevation="3">
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
                                        <span class="font-weight-bold grey--text">{{item.startTime}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold grey--text">{{item.endTime}}</span>
                                    </v-col>
                                    <v-col cols="3">
                                        <span class="font-weight-bold green--text">{{item.status}}</span>
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
export default{
    data: ()=>({
        SearchInput:{id:'',name:'',loc:'',time:0},
        res_id:{data:[]},
        res_name:{data:[]},
        byId:false,
        byName:false,

    }),
    methods: {
        // refresh(){
        //     this. SearchInput={id:'',name:'',loc:'',time:0}
        //     this.res.data =[]
        // },
        searchEventsbyId(){
            // this.res.data=[];
            // for(var i=0;i<this.events.data.length;i++){
            //     var eve = this.events.data[i];
            //     var flag = true;
            //     if(this. SearchInput.id != ''){
            //         if(eve.id != this. SearchInput.id) flag = false;
            //     }
            //     if(flag && this. SearchInput.name != ''){
            //         if(eve.name.indexOf(this. SearchInput.name)==-1 ) flag = false;
            //     }
            //     if(flag && this. SearchInput.loc != ''){
            //         if(eve.location.indexOf(this. SearchInput.loc) == -1 ) flag = false;
            //     }
            //     if(flag && ( this. SearchInput.time != 0 && this. SearchInput.time != '')){
            //         if(eve.start_num <= this. SearchInput.time && this. SearchInput.time <= eve.end_num){
            //             flag = true;
            //         }else{
            //             flag = false;
            //         }
            //     }
            //     if(flag){
            //         this.res.data.push(eve);
            //     }
            // }
            // this.res.data.QSORT((a,b)=>{a.start_num < b.start_num ? true: false})
            const eventId = this.SearchInput.id;
            this.axios({
                method: 'get',
                url: 'http://10.28.236.228:16663/events/eventId/'+ eventId,
                data:{
                    // eventId: eventId,
                },
                header:{
                    'Content-Type':'application/json',
                }
            }).then(res=>{
                console.log(res);
                for(var i=0; i<res.data.data.length; i++){
                    this.res_id.data[i] = res.data.data[i];
                };
            }).catch(function(error){
                console.log(error);
            });
        },

        searchEventsbyName(){
            const eventName = this.SearchInput.name;
            this.axios({
                method: 'get',
                url: 'http://10.28.236.228:16663/events/eventName/'+ eventName,
                data:{
                    // eventId: eventId,
                },
                header:{
                    'Content-Type':'application/json',
                }
            }).then(res=>{
                console.log(res.data.data.length);
                for(var i=0; i<res.data.data.length; i++){
                    this.res_name.data[i] = res.data.data[i];
                };
            }).catch(function(error){
                console.log(error);
            });
        },
    }
}
</script>