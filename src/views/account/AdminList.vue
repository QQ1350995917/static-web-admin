<template>
  <el-container>
    <el-header>
      <el-row>
        <el-input placeholder="输入关键字进行查找">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
      <el-row style="padding-top: 5px">
        <el-col :span="20"><el-checkbox v-model="selectAll">全选</el-checkbox></el-col>
        <el-col :span="2" style="text-align: right"><el-button>批量删除</el-button></el-col>
        <el-col :span="2" style="text-align: right"><el-button @click="onCreateMemberButtonClick" >新增</el-button></el-col>
      </el-row>
    </el-header>
    <!-- Note that row-key is necessary to get a correct row order. -->

    <el-main>
      <el-table ref="dragTable" :data="list" row-key="id" style="width: 100%" stripe>
        <el-table-column align="center" label="序号" type="index" width="100">
          <template slot-scope="scope">
            <span>{{scope.$index + query.page.index * query.page.size + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column width="150" label="姓名" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="工号" width="120" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.empNo }}</span>
          </template>
        </el-table-column>

        <el-table-column width="180" label="身份证号" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.pin }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100" align="center" label="性别" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.gender }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160" align="center" label="创建时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column width="160" align="center" label="更新时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="简介">
          <template slot-scope="scope">
            <span>{{ scope.row.summary}}</span>
          </template>
        </el-table-column>

        <el-table-column fixed="right" align="center" width="320" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              v-if="scope.row.able == 1"
              title="确定重置吗？"
              iconColor="yellow"
              confirmButtonText='确定'
              confirmButtonType="warning"
              cancelButtonText='取消'
              icon="el-icon-warning"
              @onConfirm="resetPwd(scope.row)"
            >
              <el-button slot="reference" plain size="mini" >重置密码</el-button>
            </el-popconfirm>
            <el-button @click="onMemberDetailClick(scope.row)" icon="el-icon-edit" plain size="mini"></el-button>
            <el-popconfirm
              v-if="scope.row.able == 1"
              title="确定禁用吗？"
              iconColor="yellow"
              confirmButtonText='确定'
              confirmButtonType="warning"
              cancelButtonText='取消'
              icon="el-icon-warning"
              @onConfirm="handleUserAble(scope.row)"
            >
              <el-button slot="reference" icon="el-icon-lock" plain size="mini"></el-button>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.able == 0"
              title="确定启用吗？"
              iconColor="yellow"
              confirmButtonText='确定'
              confirmButtonType="warning"
              cancelButtonText='取消'
              icon="el-icon-warning"
              @onConfirm="handleUserAble(scope.row)"
            >
              <el-button slot="reference" icon="el-icon-unlock" plain size="mini"></el-button>
            </el-popconfirm>

            <el-popconfirm
              title="确定删除吗？"
              iconColor="red"
              confirmButtonText='删除'
              confirmButtonType="danger"
              cancelButtonText='取消'
              icon="el-icon-delete"
              @onConfirm="handleUserDelete(scope.row)"
            >
              <el-button slot="reference" icon="el-icon-delete" plain size="mini"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleIndexChange"
        :current-page="query.page.index + 1"
        :page-sizes="[10,12,20,50,100]"
        :page-size="query.page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="margin-top: 10px">
      </el-pagination>
      <el-dialog
        title="新增"
        :visible.sync="createMemberDialogVisible"
        :before-close="onCreateMemberDialogCloseClick">
        <el-form :model="createMemberForm" :rules="createMemberRules" ref="createOrgMemberForm" label-width="120px">
          <el-form-item label="账户名" prop="accountName">
            <el-input v-model="createMemberForm.accountName"></el-input>
          </el-form-item>
          <el-form-item label="账户密码" prop="accountPwd">
            <el-input v-model="createMemberForm.accountPwd"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="createMemberForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="pin">
            <el-input v-model="createMemberForm.pin"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="empNo">
            <el-input v-model="createMemberForm.empNo"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="createMemberForm.gender">
              <el-radio label="0"></el-radio>
              <el-radio label="1"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介" prop="summary">
            <el-input type="textarea" v-model="createMemberForm.summary"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCreateMemberDialogResetClick('createMemberForm')">重置</el-button>
          <el-button @click="onCreateMemberDialogCloseClick">取 消</el-button>
          <el-button type="primary" @click="onCreateMemberDialogConfirmClick('createMemberForm')">确 定</el-button>
      </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import ElPopover from "../../../node_modules/element-ui/packages/popover/src/main";
  import ElPopconfirm from "../../../node_modules/element-ui/packages/popconfirm/src/main";
  import ElHeader from "../../../node_modules/element-ui/packages/header/src/main";
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main";
  import ElRadio from "../../../node_modules/element-ui/packages/radio/src/radio";
  export default {
    components: {
      ElRadio,
      ElMain,
      ElHeader,
      ElPopconfirm,
      ElPopover,
      ElButton
    },
    name: 'AdminList',
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        loading: true,
        query: {
          page: {
            index: 0,
            size: 12
          },
          scopes: [{"fieldName": "del", "fieldValue": "0", "hit": "EM"}],
          sorts: [{"fieldName": "create_Time", "sort": "asc"}]
        },
        list: [],
        total: 0,
        selectAll: false,
        createMemberDialogVisible: false,
        onCreateMemberDialogCloseClick: false,
        createMemberForm: {
          accountName: '',
//          accountPwd: '',
          userName: '',
          pin: '',
          empNo: '',
          level: 1,
          gender: '',
          summary: ''
        },
        createMemberRules: {
          accountName: [
            {required: true, message: '请输入账户名称', trigger: 'blur'},
            {min: 4, max: 24, message: '长度在 4 到 24 个字符', trigger: 'blur'}
          ],
//          accountPwd: [
//            {required: true, message: '请输入账户密码', trigger: 'blur'},
//            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
//          ],
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
      }
    },
    created() {
      this.requestAdminUserList()
    },
    methods: {
      requestAdminUserList() {
        this.$store.dispatch('account/list', this.query)
          .then((response) => {
            if (response.meta.code == 200) {
              this.query.page.index = parseInt(response.data.index);
              this.query.page.size = parseInt(response.data.size);
              this.total = parseInt(response.data.total);
              this.list = response.data.elements;
            }
          }).catch(() => {
        })
      },

      handleSizeChange(size) {
        this.query.page.size = size;
        this.requestAdminUserList()
      },
      handleIndexChange(index) {
        index = index - 1;
        this.query.page.index = index;
        this.requestAdminUserList()
      },
      resetPwd(row) {
        this.$store.dispatch('account/reset', this.query)
          .then((response) => {
            if (response.meta.code == 200) {
              this.query.page.index = parseInt(response.data.index);
              this.query.page.size = parseInt(response.data.size);
              this.total = parseInt(response.data.total);
              this.list = response.data.elements;
            }
          }).catch(() => {
        })
      },
      onMemberDetailClick(row){
        this.createMemberDialogVisible = true;
      },
      handleUserAble(row){
        if (row.able == 0) {
          this.handleUserEnable(row);
        } else if (row.able == 1) {
          this.handleUserDisable(row);
        } else {
          this.$message.error('参数错误');
        }
      },
      handleUserEnable(row){
        this.$store.dispatch('account/enable', [row.id])
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
      handleUserDisable(row){
        this.$store.dispatch('account/disable', [row.id])
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
      handleUserDelete(row){
        this.$store.dispatch('account/del', [row.id])
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if (this.list.length == 1 && this.query.page.index > 0) {
              this.query.page.index = this.query.page.index - 1;
            }
            this.requestAdminUserList();
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      onCreateMemberButtonClick() {
        this.createMemberDialogVisible = true;
      },
      onCreateMemberDialogCloseClick(){
        this.createMemberDialogVisible = false;
      },
      onCreateMemberDialogConfirmClick(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('account/create', this.adminForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.$router.push({path: this.redirect || '/account/admin/list'})
                }
              }).catch(() => {
            })
          } else {
            return false;
          }
        });
      },
      onCreateMemberDialogResetClick(formName) {
        this.$refs[formName].resetFields();
      },
    },
  }
</script>

<style scoped>
  .el-container {
    padding-left:10px;
    padding-top:20px;
  }
</style>
