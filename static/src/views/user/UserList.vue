<template>
    <div class="view-wrapper" v-loading="pageIsLoading">
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
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.ga ? 'success' : 'info'"
                            disable-transitions>{{scope.row.ga}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable
                             prop="join_time"
                             :formatter="timeFormat"
                             label="Join Time">
            </el-table-column>

            <el-table-column label="Edit">
                <template slot-scope="scope">
                    <el-button @click="editUser(scope.$index,scope.row)"
                               icon="my-icon icon-edit"
                               size="mini"></el-button>
                    <el-button
                            @click="handleDelete(scope.$index,scope.row)"
                            size="mini" icon="my-icon icon-trash"
                            type="danger"></el-button>
                </template>
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
    import router from '../../routers/router'

    export default {
        name: "UserList",
        data() {
            return {
                pageIsLoading: true,
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
            timeFormat(row, column, cellValue, index) {
                let time = new Date(cellValue)
                return time.getFullYear() + '-'
                    + (time.getMonth() + 1) + '-'
                    + time.getDate()

            },
            addRandomUsers() {
                let self = this
                self.addUserLoading = true
                axios.post('/api/user/dummy', {
                    num: 5,
                }).then((res) => {
                    console.log(res.data)
                    if (res.data.code === 1) {
                        self.userData = res.data.data
                    }
                    self.addUserLoading = false
                })
            },
            cellValueRenderer(row, column, cellValue) {
                let value = cellValue;
                if (typeof row[column.property] === 'boolean') {
                    value = String(cellValue);
                }
                return value;
            },
            pageHandle(currentPage) {
                this.currentPage = currentPage
            },
            handleDelete(index, row) {
                this.$confirm('Do you want to delete user ' + row.name, {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.delUser(row.email, row._id)
                }).catch(() => {
                });
            },

            editUser(index, row) {
                console.log(index, row)
                const userId = row._id
                router.push({path: 'edit', query: {id: userId}})
            },

            delUser(email, id) {
                let self = this
                axios.post('/api/delUser', {
                    email: email
                }).then((res) => {
                    console.log(res)
                    if (res.data.code === 1) {
                        self.userData.forEach((item, i) => {
                            if (item._id == id) {
                                console.log(i)
                                self.userData.splice(i, 1)
                                return;
                            }
                        })
                        this.$message({
                            type: 'success',
                            message: 'Delete success!'
                        });
                    } else {
                        this.$message.error({
                            dangerouslyUseHTMLString: true,
                            duration: 0,
                            showClose: true,
                            message: `<p>Delete User Failed, please try again.</p>
                                       <p>reason:${res.data.message}</p>`
                        });
                    }
                }).catch(() => {
                })
            }
        },
        mounted() {
            let self = this
            axios.post('/api/user/list')
                .then((res) => {
                    if (res.data.code === 1) {
                        self.userData = res.data.data
                        self.pageIsLoading = false
                    }
                })
        }
    }
</script>

<style scoped>

</style>