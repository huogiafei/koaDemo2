<template>
    <div class="view-wrapper">
        <div class="notfound-wrapper">
        <h1 class="notfound-tag">>_: 404</h1>
        <h2 class="notfound-title">Page Not Found</h2>
        <el-button pain @click="back">Back Home</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        methods:{
            back(){
                this.$router.replace({name:'home'})
            }
        }
    }
</script>

<style scoped>

</style>