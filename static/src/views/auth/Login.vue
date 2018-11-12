<template>
    <div class="login-wrapper">
        <div class="login-bg"></div>
        <div class="login-content">
            <section class="login-header">
                <img class="login-header-logo" src="../../assets/img/logo_nobg.png" alt="">
                <h1 class="login-header-title">Koa Demo2</h1>
            </section>
            <section class="login-main">
                <el-form ref="form" class="login-form"
                         @keyup.enter.native="login"
                         :rules="rules" :model="form" label-width="0">

                    <el-form-item label="" prop="email">
                        <el-input v-model="form.email" placeholder="Email"
                                  class="form-input-s login-input"></el-input>
                    </el-form-item>

                    <el-form-item label="" prop="password">
                        <el-input v-model="form.password" placeholder="Password"
                                  type="password"
                                  class="form-input-s login-input"></el-input>
                    </el-form-item>

                    <el-button @click="login"  type="info"
                               class="login-btn login-input">LOGIN
                    </el-button>
                </el-form>
            </section>
        </div>
    </div>
</template>

<script>

    export default {
        name: "login",
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: {required: true, type: 'email', message: 'Enter a valid email.', trigger: 'blur'},
                    password: {required: true, message: 'Enter your password', trigger: 'blur'},
                }
            }
        },
        methods: {
            login() {
                this.$refs['form'].validate((flag) => {
                    if (flag) {
                        this.$store.commit('login')
                        const redirect = decodeURIComponent(this.$route.query.redirect || '/')
                        this.$router.push({
                            path: redirect
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>