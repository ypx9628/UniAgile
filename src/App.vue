<template>
  <v-app id="root">
    <!-- 侧边栏 -->
    <template  v-if='cur_link != 4'>
        <v-navigation-drawer
        class="d-none d-sm-none d-md-flex "
        
        
        permanent
        app
        >
            <v-list-item class="mt-12 mr-2 d-flex flex-column align-center">
                <span class="mx-auto mb-2 black--text text-caption font-weight-bold">
                    日程管理系统
                </span>
                
                <v-list-item-title class="mx-auto mb-1 black--text text-h5 font-weight-black">
                    <v-icon color="black" class="mb-1 mr-1" large>
                        mdi-alpha-u-circle
                    </v-icon>
                    UniAgile
                </v-list-item-title>
                <!-- <span class="mx-auto grey--text text-caption font-weight-medium">
                    {{time.year}}-{{time.month}}-{{time.day}}
                    {{time.hour}}:<template v-if="time.min < 10">0</template>{{time.min}}
                </span> -->
            </v-list-item>
            

            

            <v-divider class="mx-8 mt-2 mb-6"></v-divider>


            <v-list v-for="([text,to,icon,color],index) in links" density="compact" nav>
                <v-list-item v-if="index!=4"
                    :key="text"
                    :to="to"
                    link
                    >
                    <v-list-item-icon class="mr-2">
                        <v-icon v-text="icon" :color="color"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title 
                            class="text-button font-weight-black"
                        >{{text}}
                        </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
            </v-list>

            <v-bottom-navigation
              fixed
              style="background:none;"
              
            >
            <v-card class="d-flex flex-row-reverse justify-center mb-8" style="background:none;" flat hover light>
                <v-btn class="mt-7 mb-7" text small depressed fab plain  block
                    onclick="window.open('https://github.com/112292454/DSlab.git')"
                >   <v-icon >
                        mdi-github
                    </v-icon>
                </v-btn>
            </v-card>
          </v-bottom-navigation>

        </v-navigation-drawer>
    </template>
    <!-- TopBar -->
    <template v-if='cur_link != 4'>
        <v-app-bar
        app
        elevate-on-scroll
        class="pr-3"
        color="#FAFAFA"
        dense
        >
            <span class="mx-auto grey--text text-caption font-weight-medium
                        d-flex d-sm-flex d-md-none"
                style="position:absolute;"
            >{{time.year}}-{{time.month}}-{{time.day}}
                {{time.hour}}:<template v-if="time.min < 10">0</template>{{time.min}}
            </span> 
          <!-- <v-container
            class="py-0 d-flex justify-center align-self-center"
          >
            <v-btn-toggle>
              <v-btn
              link
              outlined
              max-height="30"
              class="pl-4 pr-4 text-overline font-weight-bold"
              >
              {{text}}
              <v-icon class="ml-3" small>mdi-text-long</v-icon>
            </v-btn>
            </v-btn-toggle>
        </v-container> -->
        <v-app-bar-title class="ma-2 text-button text-5rem font-weight-black">
          {{ time.year }}/{{time.month}}/{{ time.day }}
        </v-app-bar-title>

        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_start()">
          <v-icon>mdi-timer</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3 mx-auto" fab outlined x-small @click="this.$sim_stop()">
          <v-icon>mdi-stop</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_faster()">
          <v-icon>mdi-fast-forward</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_slower()">
          <v-icon>mdi-rewind</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_restore()">
          <v-icon>mdi-play-pause</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_inverse()">
          <v-icon>mdi-swap-horizontal-bold</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_reset()">
          <v-icon>mdi-restart</v-icon>
        </v-btn>
        <v-btn color="blue-grey darken-3" fab outlined x-small @click="this.$sim_finish()">
          <v-icon>mdi-delete-clock</v-icon>
        </v-btn>


      <v-btn class="pa-2 ml-auto"  text rounded  @click="show.flag=!show.flag;">
          <v-icon medium color="blue-grey darken-3">mdi-bell-outline</v-icon> 
      </v-btn>
      <v-app-bar-title class="text-button font-weight-bold">
          {{ time.hour }}:{{ time.min }}
        </v-app-bar-title>

      <v-menu
      bottom
      min-width="140px"
      rounded-lg
      offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="blue lighten-1"
                    size="34">
              <span class="white--text text-button">
                {{ user.name[0] }}
              </span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="blue lighten-1">
                <span class="white--text text-h5">name</span>
              </v-avatar>
              <h4 class="mt-2">
                user
              </h4>
              <p class="text-caption mt-1">
                user.id
              </p>
              <v-divider class="mt-1 mb-2"></v-divider>
              <v-btn
                    rounded
                    depressed
                    text
                    @click="Signout()"
                >退出
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
        <!-- line 212 v-card -241-->
      </v-menu>

        </v-app-bar>
    </template>

    <template>
      <v-bottom-navigation
        class="d-flex d-sm-flex d-md-none pt-2"
        shift
        app>
        <template>
          <v-btn
          v-if="index!=4"
          style="background:none;"
          >
            <span class="mt-3 font-weight-bold">text</span>
            <v-icon v-text="icon" :color="color"></v-icon>
          </v-btn>
        </template>
      </v-bottom-navigation>
    </template>
    

    <v-main style="background-color:#FAFAFA">
      
      <v-container fluid class="ma-0 pa-0">
            <router-view v-if="isReload"
                class="ma-0 pa-0"
            ></router-view>
        </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';



export default {
    name: "App",
    data: () => ({
      time:Vue.prototype.$SYSTIME,
      cur_link:0,
      isReload:true,
      time:Vue.prototype.$SYSTIME,
      links: [
            ['我的主页','/home','mdi-home','blue-grey darken-1'],
            ['课程管理','/course','mdi-book-multiple','teal lighten-1'],
            ['日程管理','/schedule','mdi-calendar-clock','amber darken-3'],
            ['地图导航','/navigation','mdi-navigation-variant','blue darken-2'],
        ],
    //
    }),
    
    components: { SideBar, TopBar }
};
</script>
