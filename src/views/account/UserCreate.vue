<template>
  <div class="app-container" >
    <div style="width:50%;margin: 0 auto">
      <el-form :model="adminForm" :rules="adminFormRules" ref="adminForm" label-width="120px">
        <el-form-item label="accountName" prop="accountName">
          <el-input v-model="adminForm.accountName"></el-input>
        </el-form-item>
        <el-form-item label="accountPwd" prop="accountPwd">
          <el-input v-model="adminForm.accountPwd"></el-input>
        </el-form-item>
        <el-form-item label="userName" prop="userName">
          <el-input v-model="adminForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="pin" prop="pin">
          <el-input v-model="adminForm.pin"></el-input>
        </el-form-item>
        <el-form-item label="empNo" prop="empNo">
          <el-input v-model="adminForm.empNo"></el-input>
        </el-form-item>

        <el-form-item label="gender" prop="gender">
          <el-radio-group v-model="adminForm.gender">
            <el-radio label="0"></el-radio>
            <el-radio label="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="summary" prop="summary">
          <el-input type="textarea" v-model="adminForm.summary"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('adminForm')">立即创建</el-button>
          <el-button @click="resetForm('adminForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'UserCreate',
    data() {
      return {
        adminForm: {
          accountName: '',
          accountPwd: '',
          userName: '',
          pin: '',
          empNo: '',
          level: 1,
          gender: '',
          summary: ''
        },
        adminFormRules: {
          accountName: [
            {required: true, message: '请输入账户名称', trigger: 'blur'},
            {min: 4, max: 24, message: '长度在 4 到 24 个字符', trigger: 'blur'}
          ],
          accountPwd: [
            {required: true, message: '请输入账户密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          pin: [
            {required: false, message: '请输入用户证件号', trigger: 'blur'},
            {min: 0, max: 18, message: '长度在 0 到 18 个字符', trigger: 'blur'}
          ],
          empNo: [
            {required: false, message: '请输入员工号', trigger: 'blur'},
            {min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          summary: [
            {required: false, message: '请填写简介', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('account/userCreate', this.adminForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.$router.push({path: this.redirect || '/account/user/list'})
                }
              }).catch(() => {
            })
          } else {
            console.log('valid error!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
