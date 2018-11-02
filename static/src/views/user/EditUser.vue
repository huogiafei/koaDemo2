<template>
    <div class="view-wrapper">
        <h1 class="view-title">User Edit</h1>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-form ref="form" :model="form" label-width="120px"  :label-position="'left'" class="form" >
                    <el-form-item label="Name" >
                        <el-input v-model="form.username" class="form-input-s"></el-input>
                    </el-form-item>

                    <el-form-item label="Email" >
                        <el-input v-model="form.email" class="form-input-s"></el-input>
                    </el-form-item>

                    <el-form-item label="Permission">
                        <el-select v-model="form.permission" placeholder="请选择" class="form-input-s">
                            <el-option
                                    v-for="item in permission"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Role">
                        <el-cascader class="form-input-s"
                                :options="roles"
                                v-model="form.role">
                        </el-cascader>
                    </el-form-item>

                    <el-form-item label="Online" v-if="form.role[0] == 3">
                        <el-time-select class="form-input-s"
                                placeholder="Start"
                                v-model="form.onlineTime.start"
                                :picker-options="{
                                  start: '8:00',
                                  step: '8:00',
                                  end: '27:00'
                                }">
                        </el-time-select>

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

                    <el-form-item label="Join">
                        <el-date-picker class="form-input-s"
                                v-model="form.joinTime"
                                type="date"
                                placeholder="Join Time">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="">
                        <el-button type="primary" class="form-input-s">Add</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>


<script>
    import rolesData from "../../data/roles";

    export default {
        name: "EditUser",
        data() {
            return {
                form: {
                    username: '',
                    email:'',
                    permission: '',
                    role: [],
                    haveGaPermission: false,
                    onlineTime:{
                        start:'',
                        end:''
                    },
                    joinTime:''
                },
                permission: [
                    {label: 'Administrator', value: 0},
                    {label: 'Copywriter', value: 1},
                    {label: 'Marketing', value: 2}
                ],
                roles: rolesData

            }
        },
        methods: {
            onSubmit() {
                //console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>