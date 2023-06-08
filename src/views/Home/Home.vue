<template>
    <v-container class="pa-4">
        <div class="text-h4 font-weight-black ml-5 mt-6 mb-1">
            我的主页
        </div>
        <v-divider class="ml-5 mr-12"></v-divider>
        <v-row>
            <v-col cols="6">
        <v-container>
            <v-card class="mr-6" width="440px" height="300px" elevation="0" color="transparent">
                <p class="text-body-1 font-weight-bold ml-1 my-1">账号信息</p>
                <v-card class="rounded-lg d-flex justify-center flex-column" width="440px" height="260px">
                    <!-- Card One -->
                    <v-avatar class="mx-auto" color="grey lighten-2" size="82">
                        <v-avatar color="white" size="80">
                            <v-avatar color="blue darken-3" size="70">
                                <span class="white--text text-h4 font-weight-bold text-uppercase">
                                    {{ user.name[0] }}
                                </span>
                            </v-avatar>
                        </v-avatar>
                    </v-avatar>
                    <span class="mx-auto text-subtitle-1 font-weight-medium mt-3">
                        {{ user.name }}
                        <span class="grey--text text-subtitle-2 ml-2 mb-1">
                            {{ authText[Number(user.type)] }}
                        </span>
                    </span>
                    <span class="mx-auto ">
                       {{ user.mail }}
                    </span>
                    <span class="mx-auto text-subtitle-1 font-weight-bold">
                       学号： {{ user.userId }}
                    </span>
                    
                    <span class="mx-auto font-weight-bold">
                       班级： {{ user.groupId }}
                    </span>
                </v-card>
            </v-card>
        </v-container>
        </v-col>

        <v-col cols="6">
        <v-card width="440px"   height="260px"  elevation="0" color="transparent">
            <p class="text-body-1 font-weight-bold ml-1 my-1">院系信息</p>
            <v-card width="440px"   height="260px"  
                class="rounded-lg d-flex justify-center flex-column pt-4"
            >
            <!-- Card Two -->
                <v-card width="400px" elevation="0" 
                        class="mx-auto mt-16" 
                        style="background:none;"
                >
                    <v-expansion-panels class="mb-6" focusable>
                    <!-- School Info -->
                        <v-expansion-panel :key="1">
                            <v-expansion-panel-header  disable-icon-rotate>
                                <span class="font-weight-bold">
                                    学院
                                </span>
                                <template v-slot:actions>
                                    <v-icon color="green" fab icon>mdi-school-outline</v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                计算机学院（国家示范性软件学院）
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    <!-- Major Info -->
                        <v-expansion-panel :key="2" >
                            <v-expansion-panel-header  disable-icon-rotate>
                                <span class="font-weight-bold">
                                    专业
                                </span>
                                <template v-slot:actions>
                                    <v-icon color="orange" fab icon>  mdi-pencil-box-multiple-outline  </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                计算机科学与技术
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    <!-- Class Info -->
                        <v-expansion-panel :key="3" >
                            <v-expansion-panel-header  disable-icon-rotate>
                                <span class="font-weight-bold">
                                   班级
                                </span>
                                <template v-slot:actions>
                                    <v-icon color="primary">  mdi-ticket-confirmation-outline </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                               {{user.groupId}}班
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>  
                </v-card>
                <span class=" text-h2 ml-6 font-weight-bold grey--text text--lighten-4"
                    style="position:absolute; top:16px"
                >BUPTSCS
                </span>
            </v-card>
        </v-card>
    </v-col>
        </v-row>
        

    </v-container>
</template>

<script>
import Vue from 'vue'
export default {
    data: () => ({
        user: Vue.prototype.$USER,
        authText: ['学生', '管理员'],
    }),
    created() {
        //
    },
    methods: {
        //
    },
}
</script>