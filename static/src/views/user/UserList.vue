<template>
    <div class="view-wrapper">
        <h1 class="view-title">User List</h1>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="Name"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="Permission"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="Role"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="Join Time"
                    width="200">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "UserList",
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        mounted() {
            axios.get('/api/user/list')
                .then((res) => {
                    console.log(res)
                })
        }
    }
</script>

<style scoped>

</style>