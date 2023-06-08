<template>
    <v-container grid-list-xs>
        <v-toolbar max-height="100">
            
            <template>
                <v-form>
                    <v-row class="mx-3 mt-3">
                        <v-col cols="2">
                        <v-text-field
                            filled
                            
                            rounded
                            dense
                            small
                            class="ml-0"
                            label="起点ID"
                            v-model="from_id"
                            prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                    </v-col>
                        <v-col cols="2">
                        <v-text-field
                            filled
                            rounded
                            dense
                            small
                            class="ml-2"
                            label="终点ID"
                            v-model="to_id"
                            prepend-inner-icon="mdi-map-marker"
                        ></v-text-field>
                    </v-col>
                        <v-btn 
                        rounded color="info" 
                        class="mt-2 ml-3 font-weight-bold"
                        @click="addPath">添加路径
                            <v-icon class="ml-1">mdi-map-marker-path</v-icon>
                        </v-btn>
                        <v-btn 
                        color="info"
                        rounded
                        class="mt-2 ml-2 font-weight-bold"
                        @click="showAllPoint">
                            展示所有坐标点
                        </v-btn>
                        <v-btn @click="animePlay"  rounded color="info" class="mt-2 ml-2 font-weight-bold">动画展示</v-btn>
                        <v-btn @click="submitPos"  rounded color="info" class="mt-2 ml-2 font-weight-bold">p2p</v-btn>
                        <v-btn @click="viaMany" rounded color="info" class="mt-2 ml-2 font-weight-bold">viaMany</v-btn>
                        <v-btn @click="changeMap" rounded color="info" class="mt-2 ml-2 font-weight-bold">选取导航坐标</v-btn>
                        
                    </v-row>
                </v-form>

                <!-- <v-btn class="font-weight-bold ml-3">计算</v-btn> -->
            </template>
        </v-toolbar>

        <v-card 
        ref="mapImage"
        class="map rounded-b-lg"
        
        elevation="2"
        justify-center
        
        @click="getMouseXY">
            <!-- <div  >
                <canvas ref="canvas" width="750" height="1100"></canvas>
            </div> -->
            
            <div class="block">
                <v-icon color="red">mdi-circle</v-icon>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" v-bind:viewBox="this.size2">
                <path 
                    v-bind:d="this.Pathsel == 0 ? this.Path1Data : this.Path2Data" 
                    fill="transparent" 
                    stroke="cyan" 
                    stroke-width="5"></path>
            </svg>
            <!-- <div class="line-container">
                <div
                class="line"
                :style="{top: start_point.y+'px', left:start_point.x+'px'}"
                ></div>
                <v-divider></v-divider>
            </div> -->
        </v-card>
        <!-- <div>
            <v-alert type="success" :value="false">
                {{ res.data.msg }}
            </v-alert>
        </div> -->
        
    </v-container>
</template>

<script>
import anime from 'animejs/lib/anime.js';
const axios = require('axios').default;
// Vue.prototype.$Path1Data = this.path1Data;


export default {
    name: 'Navigation',
    data: () => ({
        from_id: '',
        to_id: '',
        startPoint: {x:0, y:0},
        endPoint: {x:0, y:0},

        shownav:true,
        MapT   : false ,
		qmode  : 0 ,

        isSelecting: false,
        Pointdata: [{x:0, y:0}],

		size1 :  "0 0 1050 650",
		size2 :  "0 0 750 1100",

		selectedSrc : {} ,
		selectedDst : {} , 
        function:[{id:0,name:'最短距离'},{id:1,name:'最短时间'},{id:2,name:'骑行'}],
		list:{data:[]} ,
		Posel  : 0 ,
		map1 : 0 ,
		map2 : 0 ,
		pos1 : { x : 0 , y : 0 } , 
		pos2 : { x : 0 , y : 0 } ,

		Pathsel : 0 ,
		Path1Data : "",
		Path2Data : "",
		Path3Data : "",
		Path4Data : "",
        // Path:Vue.prototype.$Path,
        
    }),

    mounted(){
        // Vue.prototype.$Path1Data = this.Path1Data;
        Vue.prototype.$Path1Data = Navigation.data().Path1Data;
        // Vue.prototype.$setPath1Data = Navigation.methods.setPath1Data;
        // Vue.prototype.$setPath1Data = this.setPath1Data;
        this.setPath1Data();
    },

    methods:{
        addPoint(event){
            // const imageElement = this.$refs.mapImage;
            // const rect = imageElement.getBoundingClientRect();
            const x = event.offsetX ;
            const y = event.offsetY ;
            // const rect = event.target.getBoundingClientRect();
            // const x = event.clientX - rect.left;
            // const y = event.clientY - rect.top;
            console.log(x, y);
            console.log(event.offsetX, event.offsetY);
            this.axios({
            method: 'post',
            url: 'http://ds.nginx.show/map/add_point',
            params: {
                x: x,
                y: y
            }
            }).then(res=>{
                console.log(res);
                console.log(this.from_id);
                // alert(res.data.msg);
                console.log(res.data.data[0]);

                // 在图片上添加红点
                const imageElement = this.$refs.mapImage.$el;
                const redDot = document.createElement('div');
                redDot.classList.add('red-dot');
                redDot.style.left = x - 3 + 'px';
                redDot.style.top = y + 11 + 'px';
                imageElement.appendChild(redDot);
                
                
            })
            .catch(function(error){
                console.log(error);
            });
            
        },
        
        addPath(){
            //
            this.axios({
                method: 'post',
                url: 'http://ds.nginx.show/map/add_path',
                params:{
                    aid: this.from_id,
                    bid: this.to_id
                }
            }).then(res=>{
                // console.log(res.data.data[this.from_id - 1].x);
                // console.log(res.data.data[this.from_id - 1].y);
                
                console.log(res.msg);
                this.startPoint.x = res.data.data[this.from_id - 1].x;
                this.startPoint.y = res.data.data[this.from_id - 1].y;
                this.endPoint.x = res.data.data[this.to_id - 1].x;
                this.endPoint.y = res.data.data[this.to_id - 1].y;
                console.log('起点的x是：'+ this.startPoint.x);
                console.log('起点的y是：'+ this.startPoint.y);
                console.log('终点的x是：'+ this.endPoint.x);
                console.log('终点的y是：'+ this.endPoint.y);
                // this.drawLine(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
                // anime({
                //     targets: '.line',
                //     translateX: [this.startPoint.x+'px', this.endPoint.x+'px'],
                //     translateY: [this.startPoint.y+'px', this.endPoint.y+'px'],
                //     easing: 'linear',
                //     duration: 1000, // 动画持续时间
                // });
            }).catch(function(error){
                console.log(error);
            })
        },
        drawLine(fromX, fromY, toX, toY) {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');

            // const startPoint = { x: this.startPoint.x, y: this.startPoint.y }; // 起点坐标
            // const endPoint = { x: this.endPoint.x, y: this.endPoint.y }; // 终点坐标

            const startPoint = { x: fromX, y: fromY }; // 起点坐标
            const endPoint = { x: toX, y: toY }; // 终点坐标

            context.beginPath();
            context.moveTo(startPoint.x, startPoint.y);
            context.lineTo(endPoint.x, endPoint.y);
            context.strokeStyle = 'blue'; // 设置线条颜色
            context.lineWidth = 8; // 设置线条宽度
            context.stroke();
        },
        showAllPoint(){
            this.axios({
                method: 'post',
                url: 'http://ds.nginx.show/map/show_points',
                params:{},
            }).then(res=>{
                console.log(res.data.data);
                alert(res.data.msg);
                for(var i=0; i < res.data.data.length; i++){
                    //
                    // 在图片上添加红点
                    const imageElement = this.$refs.mapImage.$el;
                    const redDot = document.createElement('div');
                    redDot.classList.add('red-dot');
                    redDot.style.left = res.data.data[i].x - 3 + 'px';
                    redDot.style.top = res.data.data[i].y + 11 + 'px';
                    imageElement.appendChild(redDot);

                    // 添加红点的ID
                    const idLabel = document.createElement('div');
                    idLabel.classList.add('id-label');
                    idLabel.innerText = res.data.data[i].id; // Assuming the ID is present in the response data
                    // if (res.data.data[0].id > 9) {
                    //     idLabel.classList.add('two-digit'); // Add a class for two-digit IDs
                    // }
                    redDot.appendChild(idLabel);

                    // Calculate the offset for the ID label
                    // const offset = 10; // Adjust this value as needed
                    
                    // Apply the offset to the ID label's position
                    // idLabel.style.left = (offset - idLabel.offsetWidth / 2) + 'px';
                    // idLabel.style.top = (offset - idLabel.offsetHeight / 2) + 'px';
                }
            }).catch(function(error){
                console.log(error);
            })
        },
        getMouseXY(e) {
            if(this.isSelecting){
                //
                let x = e.offsetX ;
                let y = e.offsetY ;
                this.Pointdata.push({x, y});
                console.log(this.Pointdata);
                console.log(x , "," , y);
            }
        } ,
        submitPos () {
            // if (this.Posel == 0) {
            //     this.map1 = Math.floor(this.selectedSrc.id / 10000) - 1;
            //     this.map2 = Math.floor(this.selectedDst.id / 10000) - 1;

            //     this.pos1.x = this.selectedSrc.x , this.pos1.y = this.selectedSrc.y;
            //     this.pos2.x = this.selectedDst.x , this.pos2.y = this.selectedDst.y;
            //     this.Posel = 2;
            // }
            
                let tmp1 = this.map1 , tmp2 = this.map2; console.log(tmp1 , tmp2);
                // let raction = 	
                // this.qmode == 0 ? "rs" :
                // this.qmode == 1 ? "rt" :
                // this.qmode == 2 ? "rb" : "r";
                console.log(this.Pointdata[1], this.Pointdata[2]);
                this.axios({
                    method: 'post',
                    url: 'http://ds.nginx.show/guide/p2p',
                    params: {
                        // m1 : tmp1 ,
                        x1 : this.Pointdata[0].x ,
                        y1 : this.Pointdata[0].y ,
                        // m2 : tmp2 ,
                        x2 : this.Pointdata[1].x ,
                        y2 : this.Pointdata[1].y ,
                    },
                }).then(res=>{
                    //
                    res.data.data.forEach((element , idx) => {
                            if(idx == 0) {
                                this.Path1Data  = "M" + element.x  + " " + element.y  + " ";
                            } else {
                                this.Path1Data += "L" + element.x  + " " + element.y  + " ";
                            }
                        });
                        console.log(this.Path1Data);
                        if(res.data.data == undefined) this.Path2Data = "";
                        else{
                            res.data.data.forEach((element , idx) => {
                                if(idx == 0) this.Path2Data = "M" + element.x  + " " + element.y  + " ";
                                else this.Path2Data += "L" + element.x + " " + element.y + " ";
                            });
                        }
                        this.Posel = 0;
                })
                        
                        // action : raction
                // },'',()=>{},(res)=>{
                    
                    
                        // if(res.data.path3 == undefined) this.Path3Data = "";
                        // else{
                        //     res.data.path3.forEach((element , idx) => {
                        //         if(idx == 0) this.Path3Data  = "M" + element.x  + " " + element.y  + " ";
                        //         else this.Path3Data += "L" + element.x  + " " + element.y  + " ";
                        //     });
                        // }
                        // if(res.data.path4 == undefined) this.Path4Data = "";
                        // else{
                        //     res.data.path4.forEach((element , idx) => {
                        //         if(idx == 0) this.Path4Data  = "M" + element.x  + " " + element.y  + " ";
                        //         else this.Path4Data += "L" + element.x  + " " + element.y  + " ";
                        //     });
                        // }
                        // if (this.MapT == false) {
                        //     if (tmp1 == 0) ;
                        //     else if (tmp1 == 1) {
                        //         [this.Path1Data , this.Path3Data] = [this.Path3Data , this.Path1Data];
                        //         [this.Path2Data , this.Path4Data] = [this.Path4Data , this.Path2Data];
                        //     }
                        // } else {
                        //     if (tmp1 == 1) ;
                        //     else if (tmp1 == 0) {
                        //         [this.Path1Data , this.Path3Data] = [this.Path3Data , this.Path1Data];
                        //         [this.Path2Data , this.Path4Data] = [this.Path4Data , this.Path2Data];						
                        //     }
                        // }
                    // },()=>{});
                
            
        },
        viaMany(){
            //
            let tmp1 = this.map1 , tmp2 = this.map2; console.log(tmp1 , tmp2);

            this.axios({
                method: 'post',
                url: 'http://ds.nginx.show/guide/by_many',
                data:{
                    pointdata : this.Pointdata
                },
                header:{
                    'Content-Type':'application/json',
                }
            }).then(res=>{
                //
                console.log(this.Pointdata);
                    res.data.data.forEach((element , idx) => {
                            if(idx == 0) {
                                this.Path1Data  = "M" + element.x  + " " + element.y  + " ";
                            } else {
                                this.Path1Data += "L" + element.x  + " " + element.y  + " ";
                            }
                        });
                        console.log(this.Path1Data);
                        if(res.data.data == undefined) this.Path2Data = "";
                        else{
                            res.data.data.forEach((element , idx) => {
                                if(idx == 0) this.Path2Data = "M" + element.x  + " " + element.y  + " ";
                                else this.Path2Data += "L" + element.x  + " " + element.y  + " ";
                            });
                        }
                        this.Posel = 0;
            });  
                    
                
        },
        animePlay() {
            let path = anime.path('path');
            anime({
                targets: '.block',
                translateX: path('x'),
                translateY: path('y'),
                rotate: path('angle'),
                easing: 'linear',
                duration : this.Path1Data.length/8*200,
            });
        },
        changeMap() {
            // [this.Path1Data , this.Path3Data] = [this.Path3Data , this.Path1Data];
            // [this.Path2Data , this.Path4Data] = [this.Path4Data , this.Path2Data];
            // this.MapT = !this.MapT;
            this.isSelecting = ! this.isSelecting;
            if(this.isSelecting){
                //
                this.Pointdata = this.Pointdata.slice(0,0);
            }
        } ,
        setPath1Data(){
            this.Path1Data = this.$Path;
            window.alert('setPath');
        },
    },
}

</script>
<!-- export default Navigation; -->

<style >
.map{
    width: 750px;
	height: 1100px;
	background-image: url("@/assets/map.jpg");
	background-size: 750px 1100px ; 
	background-repeat:no-repeat;
}
.line {
  position: absolute;
  width: 2px;
  height: 1%;
  background-color: red;
}
.red-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: red;
}
.block {
    width:20px;
    height:20px;
	background:none;
}
.id-label{
    color:blue;
    max-width: 50px;
    font-size: 3px;
    white-space: nowrap;
}
</style>