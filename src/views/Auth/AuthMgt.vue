<template>
    <v-app id="auth">
    <v-main class="bg align-center">
        <v-card
            class=" mx-auto my-auto d-flex flex-row flex-wrap"
            max-width="800px"
            elevation="8" style="background:none"
        >
        <!-- Img -->
            <v-card
                class="d-flex flex-column justify-center rounded-0"
                width="440px"
                elevation="0"
                style="background-color:#F5F5F5"
            >
                <span 
                    class="text-h5 black--text font-weight-black"
                    style="position:absolute;top:30px;left:30px;"
                >
                    <v-icon 
                        medium color="black"
                        class="mr-2 mb-1" large
                    >mdi-alpha-u-circle
                    </v-icon>
                    UniAgile
                </span>
                <v-btn rounded style="position:absolute;top:36px;right:15px;" class="px-0" text x-small depressed
                    onclick="window.open('https://github.com/112292454/DSlab.git')"
                >   <v-icon medium color="black">
                        mdi-github
                    </v-icon>
                </v-btn>
                
                <v-img 
                    class="mx-auto mt-12"
                    src="../../assets/front.png"
                    max-height="260px"
                    max-width="400px"
                >
                </v-img>
            </v-card>
    
        <!-- Input -->
            <v-card 
                class="pa-6 ml-auto rounded-0"
                width="360px"
                height="480px"
                elevation="0"
            >
                <v-card-title class="text-center justify-center py-6">
                    <h2 class="font-weight-bold text-h4 basil--text">
                        Welcome !
                    </h2>
                </v-card-title>
                <v-tabs
                    background-color="transparent"
                    color="black"
                    centered
                >
                    <v-tab :key="0">Log in</v-tab>
                    <v-tab :key="1">Sign up</v-tab>
                    <v-tab-item :key="0">
                    <v-container class="px-12 pt-6">
                        <v-text-field 
                            label="Email" 
                            v-model="email">
                        </v-text-field>
                        <v-text-field 
                            class="mb-6"
                            label="Password" 
                            type="password"
                            v-model="passwd">
                        </v-text-field>
                        <v-btn
                            class="white--text"
                            :loading="loading"
                            :disabled="loading"
                            color="blue accent-2"
                            outlined rounded
                            @click="signin();loader = 'loading'"
                        >
                        Log in
                        </v-btn>
                    </v-container>
                    </v-tab-item>
    
                    <v-tab-item :key="1">
                    <v-container class="px-12 pt-2">
                        <v-text-field 
                            label="Name"
                            v-model="name">
                        </v-text-field>
                        <v-text-field 
                            label="Email"
                            v-model="email">
                        </v-text-field>
                        <v-text-field 
                            label="Password" 
                            v-model="passwd">
                        </v-text-field>
                        <v-select
                            :items="groupId"
                            v-model="gid"
                            label="GroupId"
                        ></v-select>
                        <!-- <v-text-field 
                            label="Confirm" 
                            v-model="confirm">
                        </v-text-field> -->
                        <v-btn
                            class="mt-6 white--text"
                            :loading="loading"
                            :disabled="loading"
                            color="blue accent-2"
                            outlined rounded
                            @click="signup();loader = 'loading'"
                        >
                        Sign up
                        </v-btn>
                    </v-container>
                    </v-tab-item>
                </v-tabs>
            </v-card>  
        </v-card>
    
    </v-main>
    </v-app>
    </template>
    
    <script>
    import Vue from 'vue'
    export default {
        name: 'AuthView',
        data: () => ({
            user:Vue.prototype.$USER,
            // userid:'',
            name:'',
            email: '',
            passwd:'',
            confirm:'',
            gid:'',
            groupId:['2021110000', '2021110001', '2021110002'],
            loader:null,
            loading:false,
        }),
        watch:{
            loader () {
                const l = this.loader
                this[l] = !this[l]
                setTimeout(() => (this[l] = false), 2000)
                this.loader = null
            },
        },
        methods: {
            signin:function(){
                
                this.axios({
                    method: 'post',
                    url: 'http://ds.nginx.show/user/login',
                    data:{
                        mail: this.email,
                        password: this.passwd,
                    },
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.statusCode == 200){
                        window.alert('登录成功');
                        this.$router.push('/home');
                    }else if(res.data.statusCode == 500){
                        window.alert('账号或密码错误，请重试')
                    }
                    this.mail2UserId(this.email);
                    
                    console.log(this.$USER.mail);
                    // this.$router.push('/home');
                }).catch(function(error){
                    console.log(error);
                })
            },
            signup:function(){
                
                this.axios({
                    method: 'get',
                    url: 'http://ds.nginx.show/user/register',
                    params:{
                        name: this.name,
                        mail: this.email,
                        password: this.passwd,
                        gid: this.gid,
                    },
                    
                }).then(res=>{
                    console.log(res);
                    if(res.data.statusCode == 200){
                        window.alert('注册成功')
                    }
                    this.$router.push('/home');
                }).catch(function(error){
                    console.log(error);
                })
            },
            init:function(){
                this.$getUser();
                if(this.$USER.id != 10000){
                    this.$tableInit();
                    this.$getTable('/api/user');
                    this.$getEvents();
                }
            },
            mail2UserId(mail){
                this.axios({
                    method: 'get',
                    url: 'http://ds.nginx.show/users/mail/' + mail,
                }).then(res=>{
                    console.log(res);
                    this.$root.$USER.userId = res.data.data.userId;
                    this.$root.$USER.groupId = res.data.data.groupId;
                    this.$root.$USER.name = res.data.data.username;
                    this.$root.$USER.type = res.data.data.type;
                    this.$root.$USER.mail = res.data.data.mail;
                    this.$root.$USER.password = res.data.data.password;
                    console.log(this.$USER);
                }).catch(function(error){
                    console.log(error);
                })
            }
        },
    }
    </script>
    
    <style>
        #auth{
            /* background-image:linear-gradient(#4285f4, #d2d5fc);*/
            background-image: url(../../assets/333.png); 
            background-size: cover;
            background-position: center center;
        }
        .bg{
            background-color:rgba(0,0,0,0.1);
            /* backdrop-filter:blur(100px); */
        }
        .custom-loader {
            animation: loader 1s infinite;
            display: flex;
        }
        @-moz-keyframes loader {
            from {
            transform: rotate(0);
            }
            to {
            transform: rotate(360deg);
            }
        }
        @-webkit-keyframes loader {
            from {
            transform: rotate(0);
            }
            to {
            transform: rotate(360deg);
            }
        }
        @-o-keyframes loader {
            from {
            transform: rotate(0);
            }
            to {
            transform: rotate(360deg);
            }
        }
        @keyframes loader {
            from {
            transform: rotate(0);
            }
            to {
            transform: rotate(360deg);
            }
        }
    </style>