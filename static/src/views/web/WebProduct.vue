<template>
    <div class="view-wrapper">
        <el-row :gutter="30">
            <el-col :span="12" class="wp-edit">
                <h1 class="view-title">Product Page</h1>
                <section class="wp-edit-banner">
                    <p class="wp-edit-title">Banner Upload</p>
                    <img :src="banner.img" v-if="banner.img" alt="" class="wp-edit-banner-thumb">
                    <el-upload
                            class="upload-demo"
                            :headers="uploadHeader"
                            action="/api/web/bannerUpload"
                            name="file"
                            :show-file-list="false"
                            :before-upload="checkToken"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :before-remove="beforeRemove">
                        <el-button size="small" type="primary">Upload Banner</el-button>
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
                    </el-form>
                </section>

                <section class="wp-edit-wall">

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
                        <li v-for="n in 9"><img src="https://placehold.it/300x300" alt=""></li>
                    </ul>
                </section>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import storage from '../../utils/storage'

    export default {
        name: "WebProduct",
        data() {
            return {
                uploadHeader: {'Authorization': `Bearer ${this.$store.state.token}`},
                banner: {
                    title: '',
                    link: '',
                    img: ''
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
            handleError(err, file, fileList) {
                console.log(err)
            },
            handleSuccess(res, file, fileList) {
                this.banner.img = res.data.link
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        computed: {
            previewBanner() {
                let url = this.banner.img
                return url ? url : 'https://placehold.it/1920x400'
            }
        }

    }
</script>

<style scoped>

</style>