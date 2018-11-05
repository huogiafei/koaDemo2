<template>
    <div class="view-wrapper">
        <h1 class="view-title">User Edit</h1>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form ref="form" :model="form" label-width="120px"
                         :rules="rules" :label-position="'left'" class="form">
                    <el-form-item label="Name" prop="username">
                        <el-input v-model="form.username" class="form-input-s"></el-input>
                    </el-form-item>

                    <el-form-item label="Email" prop="email">
                        <el-input v-model="form.email" class="form-input-s"></el-input>
                    </el-form-item>

                    <el-form-item label="Permission" prop="permission">
                        <el-select v-model="form.permission" placeholder="请选择" class="form-input-s">
                            <el-option
                                    v-for="item in permission"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Role" prop="role">
                        <el-cascader class="form-input-s"
                                     :options="roles"
                                     v-model="form.role">
                        </el-cascader>
                    </el-form-item>

                    <el-form-item label="Online" v-if="form.role[0] == 3" style="display: none;">
                        <el-time-select class="form-input-s"
                                        placeholder="Start"
                                        v-model="form.onlineTime.start"
                                        :picker-options="{
                                  start: '8:00',
                                  step: '8:00',
                                  end: '27:00'
                                }">
                        </el-time-select>

                        <br>

                        <el-time-select class="form-input-s"
                                        style="margin-left: 10px;"
                                        placeholder="End"
                                        v-model="form.onlineTime.end"
                                        :picker-options="{
                                    start: '8:00',
                                  step: '8:00',
                                  end: '27:00',
                                }">
                        </el-time-select>
                    </el-form-item>

                    <el-form-item label="GA权限">
                        <el-switch v-model="form.haveGaPermission">
                        </el-switch>
                    </el-form-item>

                    <el-form-item label="Join" prop="joinTime">
                        <el-date-picker class="form-input-s"
                                        v-model="form.joinTime"
                                        type="date"
                                        placeholder="Join Time">
                        </el-date-picker>
                    </el-form-item>


                    <el-form-item label="">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-button @click="resetForm"  class="form-input-s">Reset</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" :loading="addUserLoading"
                                           @click="submit" class="form-input-s">Add</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    import rolesData from "../../data/roles";
    import axios from 'axios'
    import {required, minLength, email} from 'vuelidate/lib/validators'
    import router from "../../routers/router";

    export default {
        name: "EditUser",
        data() {
            return {
                addUserLoading:false,
                form: {
                    username: '',
                    email: '',
                    permission: '',
                    role: [],
                    haveGaPermission: false,
                    onlineTime: {
                        start: '',
                        end: ''
                    },
                    joinTime: ''
                },
                permission: [
                    {label: 'Administrator', value: 0},
                    {label: 'Copywriter', value: 1},
                    {label: 'Marketing', value: 2}
                ],
                roles: rolesData,
                rules: {
                    username: [
                        {required: true, message: 'Enter a username.', trigger: 'blur'},
                        {min: 3, max: 20, message: 'Username length between 3-20 words', trigger: 'blur'}
                    ],
                    email: {required: true, type: 'email', message: 'Enter a valid email.', trigger: 'change'},
                    permission: {required: true, message: 'Choose a permission.', trigger: 'change'},
                    role: {required: true, message: 'Choose a role.', trigger: 'change'},
                    joinTime: {required: true, message: 'Select a join Date.', trigger: 'blur'},

                }
            }
        },
        validations: {
            form: {
                username: {
                    required, minLength:
                        minLength(3)
                }
                ,
                email: {
                    required, email
                }
                ,
                permission: {
                    required
                }
                ,
                role: {
                    required
                }
                ,
                joinTime: {
                    required
                }
            }
        },
        methods: {
            submit(){
                this.$refs['form'].validate((flag,object)=>{
                    if(flag){
                        this.addUser()
                    }
                })  
            },
            resetForm() {
                this.$refs['form'].resetFields()
            },
            addUser() {
                let self = this;
                self.addUserLoading = true
                axios.post('/api/addUser', {
                    name: self.form.username,
                    email: self.form.email,
                    permission: self.form.permission,
                    role: self.form.role[0],
                    ga: self.form.haveGaPermission,
                    /*  onlineTime:[self.form.onlineTime.start,
                          self.form.onlineTime.end],*/
                    join_time: self.form.joinTime
                }).then((res) => {
                    self.addUserLoading = false
                    if(res.data.code === 1){
                        router.push('/user/list')
                    }else{

                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>