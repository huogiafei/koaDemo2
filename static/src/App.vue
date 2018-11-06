<template>
  <div id="app">
    <div class="wrapper">
      <el-container direction="vertical">
        <compHeader></compHeader>
        <el-container>
            <compSide></compSide>
            <el-main class="main">
              <router-view/>
            </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style>

</style>

<script>
    import compHeader from '@/views/comp/_Header.vue'
    import compSide from '@/views/comp/_Side.vue'
    export default {
        name: 'home',
        components: {
            compHeader,
            compSide
        },
        mounted(){
            this.$notify({
                title: 'Welcome, Edward',
                message: 'last login time: 10-23 17:55'
            });
        }
    }
</script>
