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


                    <p><el-alert v-if="loginFail"
                              title="Email not register or password wrong"
                              type="error">
                    </el-alert></p>

                    <el-form-item label="" prop="email">
                        <el-input v-model="form.email" placeholder="Email"
                                  class="form-input-s login-input"></el-input>
                    </el-form-item>

                    <el-form-item label="" prop="password">
                        <el-input v-model="form.password" placeholder="Password"
                                  type="password"
                                  class="form-input-s login-input"></el-input>
                    </el-form-item>

                    <el-button @click="login" type="info" :loading="loginLoading"
                               class="login-btn login-input">LOGIN
                    </el-button>
                </el-form>
            </section>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5'
    import axios from 'axios'

    export default {
        name: "login",
        data() {
            return {
                loginLoading: false,
                loginFail: false,
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
                let self = this;
                this.$refs['form'].validate((flag) => {
                    if (flag) {
                        self.loginLoading = true
                        axios.post('/api/login', {
                            email: self.form.email,
                            password: md5(self.form.password)
                        }).then((res) => {
                            if (res.data.code === 1) {
                                let userData = {
                                    token:res.data.data.token,
                                    username:res.data.data.username
                                }
                                self.$store.commit('login',JSON.stringify(userData))
                                const redirect = decodeURIComponent(this.$route.query.redirect || '/')
                                this.$router.push({
                                    path: redirect
                                })
                            } else {
                                self.loginFail = true;
                                self.form.password = ''
                                setTimeout(function () {
                                    self.loginFail = false
                                }, 2000)
                            }
                            self.loginLoading = false
                        })


                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>