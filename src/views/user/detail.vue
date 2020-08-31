<template>
  <div class="app-container" style="align-content: center">
    <el-row style="text-align: center">
      <el-button type="warning" @click="ableUser('adminUserForm')">禁用</el-button>
      <el-button type="danger" @click="deleteUser('adminUserForm')">删除</el-button>
      <el-button type="danger" @click="mergeUser('adminUserForm')">合并</el-button>
    </el-row>
    <el-form :model="adminUserForm" :rules="adminUserFormRules" ref="adminUserForm" label-width="120px"
             style="margin-top: 10px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="userName" prop="userName">
            <el-input v-model="adminUserForm.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="gender" prop="gender">
            <el-radio-group v-model="adminUserForm.gender">
              <el-radio label="0"></el-radio>
              <el-radio label="1"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="pin" prop="pin">
            <el-input v-model="adminUserForm.pin"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="empNo" prop="empNo">
            <el-input v-model="adminUserForm.empNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="createTime" prop="createTime">
            <el-input v-model="adminUserForm.createTime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="updateTime" prop="updateTime">
            <el-input v-model="adminUserForm.updateTime" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-form-item label="summary" prop="summary">
          <el-input type="textarea" v-model="adminUserForm.summary"></el-input>
        </el-form-item>
      </el-row>
      <el-row style="text-align: center">
        <el-button @click="resetForm('adminUserForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('adminUserForm')">更新</el-button>
      </el-row>
    </el-form>

    <el-table :data="list" row-key="id" border fit highlight-current-row style="width: 100%;margin-top: 10px" stripe>
      <el-table-column align="center" label="SEQ" type="index" width="100">
        <template slot-scope="scope">
          <span>{{scope.$index + query.page.index * query.page.size + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="loginName" width="120" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="loginPwd" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.loginPwd }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="pwdTime" width="120" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.pwdTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" label="type">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column width="160" align="center" label="createTime" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="160" align="center" label="updateTime" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="function">
        <template slot-scope="scope">
          <el-button v-if="scope.row.able == 0" @click="handleAccountEnable(scope.row)" type="warning" icon="el-icon-check" round></el-button>
          <el-button v-if="scope.row.able == 1" @click="handleAccountDisable(scope.row)" type="warning" icon="el-icon-close" round></el-button>
          <el-button @click="handleAccountDelete(scope.row)" type="danger" icon="el-icon-delete" round></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {ElFormItem},
    name: 'AdminDetail',
    data() {
      return {
        adminUserForm: {
          id: '',
          uid: this.$route.params.id,
          userName: '',
          pin: '',
          empNo: '',
          level: 1,
          gender: '',
          summary: '',
          able: '0',
          createTime: '',
          updateTime: ''
        },
        adminUserFormRules: {
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
        },
        query: {
          page: {
            index: 0,
            size: 12
          },
          scopes: [],
          sorts: []
        },
        list: null,
      };
    },
    created() {
      this.requestForUserInfo(),
      this.requestForUserAccountList()
    },
    methods: {
      requestForUserInfo(){
        this.$store.dispatch('admin/adminUserInfo', this.adminUserForm.uid)
          .then((response) => {
            if (response.meta.code == 200) {
              this.adminUserForm = response.data;
              this.adminUserForm.userName = response.data.name;
            }
          }).catch(() => {
        })
      },
      requestForUserAccountList(){
        this.$store.dispatch('admin/adminUserAccountList', this.adminUserForm.uid)
          .then((response) => {
            if (response.meta.code == 200) {
              this.list = response.data.elements;
            }
          }).catch(() => {
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('admin/admin', this.adminForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.$router.push({path: this.redirect || '/user/list'})
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
        this.$router.go(0); 
//        this.$refs[formName].resetFields();
      },
      handleAccountEnable(row) {

      },
      handleAccountDisable(row) {

      },
      handleAccountDelete(row) {

      }
    }
  }
</script>

<style scoped>

</style>
