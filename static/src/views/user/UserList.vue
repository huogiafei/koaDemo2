<template>
    <div class="view-wrapper">
        <h1 class="view-title">User List</h1>
        <p>
            <el-button type="primary"
                       @click="addRandomUsers"
                       :loading="addUserLoading">Add Random data
            </el-button>
        </p>
        <el-table
                :data="splitUserData"
                :default-sort="{prop: 'join_time', order: 'descending'}"
                border
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="Name"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="permission.title"
                    label="Permission"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="role.title"
                    label="Role"
                    width="100">
            </el-table-column>
            <el-table-column :formatter="cellValueRenderer"
                             prop="ga"
                             label="Ga权限"
                             width="100">
            </el-table-column>
            <el-table-column sortable
                             prop="join_time"
                             label="Join Time">
            </el-table-column>
        </el-table>

        <div class="pagination-wrapper" v-if="userData.length>0">
            <el-pagination
                    background
                    @current-change="pageHandle"
                    layout="prev, pager, next"
                    :total="pageTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "UserList",
        data() {
            return {
                userData: [],
                addUserLoading: false,
                currentPage: 1

            }
        },
        computed: {
            pageTotal() {
                return this.userData.length
            },
            splitUserData() {
                if (this.userData.length > 10) {
                    let start = (this.currentPage - 1) * 10

                    return this.userData.slice(start, start + 10)
                } else {
                    return this.userData
                }
            }
        },
        methods: {
            addRandomUsers() {
                let self = this
                self.addUserLoading = true
                axios.post('/api/user/dummy', {
                    num: 5,
                }).then((res) => {
                    console.log(res.data)
                    if (res.data.code === 1) {
                        self.userData = self.userData.concat(res.data.data)
                    }
                    self.addUserLoading = false
                })
            },
            cellValueRenderer(row, column, cellValue, index) {
                let value = cellValue;
                if (typeof row[column.property] === 'boolean') {
                    value = String(cellValue);
                }
                return value;
            },
            pageHandle(currentPage) {
                this.currentPage = currentPage
            }
        },
        mounted() {
            let self = this
            axios.post('/api/user/list')
                .then((res) => {
                    if (res.data.code === 1) {
                        self.userData = res.data.data
                    }
                })
        }
    }
</script>

<style scoped>

</style>