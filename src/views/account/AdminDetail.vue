<template>
  <div class="app-container" style="align-content: center">
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
      <el-table-column align="center" label="pwdTime" width="160" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.pwdTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
          <el-popconfirm
            v-if="scope.row.able == 1"
            title="确定禁用吗？"
            iconColor="yellow"
            confirmButtonText='确定'
            confirmButtonType="warning"
            cancelButtonText='取消'
            icon="el-icon-warning"
            @onConfirm="handleAccountAble(scope.row)"
          >
            <el-button slot="reference" type="warning" icon="el-icon-lock" round></el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.able == 0"
            title="确定启用吗？"
            iconColor="yellow"
            confirmButtonText='确定'
            confirmButtonType="warning"
            cancelButtonText='取消'
            icon="el-icon-warning"
            @onConfirm="handleAccountAble(scope.row)"
          >
            <el-button slot="reference" type="warning" icon="el-icon-unlock" round></el-button>
          </el-popconfirm>

          <el-popconfirm
            title="确定删除吗？"
            iconColor="red"
            confirmButtonText='确定'
            confirmButtonType="danger"
            cancelButtonText='取消'
            icon="el-icon-delete"
            @onConfirm="handleAccountDelete(scope.row)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" round></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElPopconfirm from "../../../node_modules/element-ui/packages/popconfirm/src/main";
  export default {
    components: {
      ElPopconfirm,
      ElFormItem
    },
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
          uid: this.$route.params.id,
          page: {
            index: 0,
            size: 12
          },
          scopes: [{"fieldName": "del", "fieldValue": "0", "hit": "EM"}],
          sorts: [{"fieldName": "create_Time", "sort": "asc"}]
        },
        list: [],
      };
    },
    created() {
      this.requestForUserInfo(),
        this.requestForUserAccountList()
    },
    methods: {
      requestForUserInfo(){
        this.$store.dispatch('account/adminUserInfo', this.adminUserForm.uid)
          .then((response) => {
            if (response.meta.code == 200) {
              this.adminUserForm = response.data;
              this.adminUserForm.userName = response.data.name;
            }
          }).catch(() => {
        })
      },
      requestForUserAccountList(){
        this.$store.dispatch('account/adminAccountList', this.query)
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
            this.$store.dispatch('account/account', this.adminForm)
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
        this.$refs[formName].resetFields();
      },
      handleAccountAble(row){
        if (row.able == 0) {
          this.handleAccountEnable(row);
        } else if (row.able == 1) {
          this.handleAccountDisable(row);
        } else {
          this.$message.error('参数错误');
        }
      },
      handleAccountEnable(row){
        this.$store.dispatch('account/adminAccountEnable', {
          'accountId': row.id,
          'userId': parseInt(this.$route.params.id)
        })
          .then(() => {
            row.able = 1;
            this.$message({
              message: '启用成功',
              type: 'success'
            });
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      handleAccountDisable(row){
        this.$store.dispatch('account/adminAccountDisable', {
          'accountId': row.id,
          'userId': parseInt(this.$route.params.id)
        })
          .then(() => {
            row.able = 0;
            this.$message({
              message: '禁用成功',
              type: 'success'
            });
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      handleAccountDelete(row) {
        this.$store.dispatch('account/adminAccountDelete', {
          'accountId': row.id,
          'userId': parseInt(this.$route.params.id)
        })
          .then(() => {
            row.able = 0;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.requestForUserAccountList();
          }).catch((error) => {
          this.$message.error(error);
        })
      }
    }
  }
</script>

<style scoped>

</style>
