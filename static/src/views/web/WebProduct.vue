<template>
    <div class="view-wrapper">
        <el-row :gutter="30">
            <el-col :span="12" class="wp-edit">
                <h1 class="view-title">Product Page</h1>
                <section class="wp-edit-banner">
                    <h2 class="wp-edit-title">Banner Upload</h2>
                    <img :src="banner.img" v-if="banner.img" alt="" class="wp-edit-banner-thumb">
                    <el-upload
                            class="upload-demo"
                            :headers="uploadHeader"
                            action="/api/web/bannerUpload"
                            name="file"
                            :show-file-list="false"
                            :before-upload="checkToken"
                            :on-success="handleBannerSuccess"
                            :on-error="handleBannerError">
                        <el-button type="primary">
                            <i class="my-icon icon-upload-cloud"></i>
                            Upload Banner
                        </el-button>
                        <div slot="tip" class="wp-edit-tip">*Only jpg/png file within 500k</div>
                    </el-upload>

                    <el-form ref="form1" :model="banner" label-width="0"
                             :label-position="'left'" class="form wp-edit-form">
                        <el-form-item label="" prop="title">
                            <el-input v-model="banner.title" placeholder="Banner Title"
                                      class="form-input-s"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="link">
                            <el-input v-model="banner.link" placeholder="Banner Link"
                                      class="form-input-s"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button>Save Banner</el-button>
                        </el-form-item>
                    </el-form>

                </section>

                <section class="wp-edit-wall">
                    <h2 class="wp-edit-title">Wall Upload</h2>
                    <el-upload
                            name="file"
                            action="/api/web/wallUpload"
                            list-type="picture-card"
                            :headers="uploadHeader"
                            :before-upload="checkWallNum"
                            :on-success="handleWallSuccess"
                            :on-remove="handleWallRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <p>
                        <el-button @click="saveWall">Save Wall</el-button>
                    </p>
                </section>
            </el-col>
            <el-col :span="12" class="wp-preview">
                <section class="wp-preview-banner">
                    <p class="wp-preview-title">Banner</p>
                    <img :src="previewBanner" alt="">
                </section>

                <section class="wp-preview-wall">
                    <p class="wp-preview-title">Wall</p>
                    <ul class="wp-preview-wall-list">
                        <li v-for="item in previewWall">
                            <img :src="item.link" alt=""></li>
                    </ul>

                </section>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import storage from '../../utils/storage'
    import axios from 'axios'

    const placeholdURL = 'https://placehold.it/'

    export default {
        name: "WebProduct",
        data() {
            return {
                uploadHeader: {'Authorization': `Bearer ${this.$store.state.token}`},
                banner: {
                    title: '',
                    link: '',
                    img: ''
                },
                wall: {
                    imgs: []
                }

            }
        },
        methods: {
            checkToken() {
                if (!storage.get('token')) {
                    this.$router.replace('/login')
                } else {
                    return true
                }
            },
            checkWallNum() {
                if (this.wall.imgs.length >= 9) {
                    this.$message.error({
                        message: 'wall limited : 9'
                    });
                    return false
                } else {
                    return true
                }
            },
            handleBannerError(err, file, fileList) {
                console.log(err)
            },
            handleBannerSuccess(res, file, fileList) {
                this.banner.img = res.data.link
            },
            handleWallSuccess(res, file, fileList) {
                this.wall.imgs.push(res.data)
            },
            handleWallRemove(file, fileList) {
                console.log(file, fileList)
            },
            saveWall() {
                let ids = Array.from(this.wall.imgs, img => img.imgId)
                axios.post('/api/web/wallSave', {
                    ids: JSON.stringify(ids)
                }).then((res) => {
                    console.log(res.data)
                })
            },
            getWall() {
                axios.post('/api/web/wallGet').then((res) => {
                    if (res.data.code === 1) {
                        let result = res.data.data.imgs
                        this.wall.imgs = result
                    }
                })
            }
        },
        computed: {
            previewBanner() {
                let url = this.banner.img
                return url ? url : placeholdURL + '1920x400'
            },
            previewWall() {
                let data = this.wall.imgs
                let place = placeholdURL + '300x300'
                let other = new Array(9 - data.length).fill({link: place, id: ''})
                return data.concat(other)
            }
        },
        created() {
            this.getWall()
        }

    }
</script>

<style scoped>

</style>