<template>
  <div class="app-container">
    <el-form v-loading="loading" inline-message :model="createOrgForm"
             :rules="createOrgRules" ref="createOrgForm">
      <el-form-item prop="name">
        <el-input status-icon prefix-icon="fa fa-user" v-model="createOrgForm.name"
                  placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item prop="description">
        <el-input status-icon prefix-icon="fa fa-user" v-model="createOrgForm.description"
                  placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item prop="slogan">
        <el-input prefix-icon="fa fa-user" v-model="createOrgForm.slogan"
                  placeholder="口号" auto-complete="on">
        </el-input>
      </el-form-item>
      <el-form-item prop="logo">
        <el-input prefix-icon="fa fa-user" v-model="createOrgForm.logo" @keyup.enter.native="createOrgHandler"
                  placeholder="logo" auto-complete="on">
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" :loading="loading" @click.native.prevent="createOrgHandler">创建
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {createRoot} from '@/api/organization'

  const orgEntity = {
    name: '',
    description: '',
    slogan: '',
    logo: ''
  }

  export default {
    name: 'Organization',
    data() {
      return {
        loading: false,
        createOrgForm: Object.assign({}, orgEntity),
        createOrgRules: {
          name: [{required: true, message: '名称不能为空', trigger: 'blur'},
            {min: 2, max: 8, message: '最小2个字，最大28个字', trigger: 'blur'}],
          description: [{required: false, message: '请输入描述', trigger: 'blur'},
            {min: 1, max: 320, message: '1~120个字', trigger: 'blur'}],
          slogan: [{required: false, message: '请输入口号', trigger: 'blur'},
            {min: 1, max: 32, message: '1~32个字', trigger: 'blur'}],
          logo: [{required: false, message: '请上传logo', trigger: 'blur'}]
        },
      }
    },

    methods: {
      createOrgHandler(){
        this.$refs.createOrgForm.validate(valid => {
          if (valid) {
            this.loading = true
            createRoot({
              "name": this.createOrgForm.name,
              "description": this.createOrgForm.description,
              "slogan": this.createOrgForm.slogan,
              "logo": this.createOrgForm.logo
            }).then(data => {
              this.loading = false
              if (data.meta.code == 200) {
                this.$message.info(data.meta.message);
                this.$router.push({ path: this.redirect || '/organization/list' })
              } else {
                this.$message.error(data.meta.message);
              }
            });

          } else {
            this.$message.error("验证失败");
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
