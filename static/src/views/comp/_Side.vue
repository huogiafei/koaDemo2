<template>
    <el-aside width="auto" class="aside">

        <el-menu default-active="1-4-1" :class="['aside-menu',{'active':!isCollapse}]"
                 :unique-opened="true" :collapse-transition="false" router
                 @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="/home">
                    <i class="aside-menu-icon my-icon icon-home"></i>
                    <span slot="title">Home</span>
            </el-menu-item>

            <el-submenu index="2">
                <template slot="title">
                    <i class="aside-menu-icon my-icon icon-user"></i>
                    <span slot="title">User</span>
                </template>
                <el-menu-item index="/user/list">List</el-menu-item>
                <el-menu-item index="/user/edit">Edit</el-menu-item>
            </el-submenu>

            <el-menu-item index="4">
                <i class="aside-menu-icon my-icon icon-shopping-cart"></i>
                <span slot="title">Customer</span>
            </el-menu-item>

            <el-menu-item index="/setting">
                <i class="aside-menu-icon my-icon icon-settings"></i>
                <span slot="title">Setting</span>
            </el-menu-item>
        </el-menu>
        <div class="aside-collapse">
            <i class="aside-menu-icon my-icon icon-chevron-left" @click="handleCollapse(true)" v-show="!isCollapse"></i>
            <i class="aside-menu-icon my-icon icon-chevron-right" @click="handleCollapse(false)" v-show="isCollapse"></i>
        </div>
    </el-aside>
</template>

<script>
    export default {
        name: "comp-side",
        data() {
            return {
                isCollapse: false
            };
        },
        methods: {
            handleCollapse(flag) {
                this.isCollapse = flag
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
    }
</style>