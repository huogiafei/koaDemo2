<template>
    <el-header class="header" height="80px">
        <el-row :gutter="10">
            <el-col :span="6">
                <img class="header-logo" src="../../assets/img/logo.png" alt="">
                <h1 class="header-title">Demo 02</h1>
            </el-col>
            <el-col :span="6" :offset="12">
                <div class="header-right">
                    <p v-text="username" class="header-right-user"></p>
                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        name: "comp-header",
        data(){
            return{
                username:''
            }
        },
        created(){
            this.username = this.$store.state.username
        }
    }
</script>

<style scoped lang="stylus">

</style>