<template>
  <el-container>
    <el-header style="height: 30px">
      <el-row style="padding-top: 5px">
        <el-col :span="14">
          <el-input placeholder="输入关键字进行查找">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button @click="onCheckedResetPwdButtonClick">批量改密</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button @click="onCheckedDisableButtonClick">批量禁用</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button @click="onCheckedEnableButtonClick">批量启用</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button @click="onCheckedDeleteButtonClick">批量删除</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button @click="onCreateButtonClick">新增</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table ref="mainTable" :data="mainTableData" row-key="id" style="width: 100%" stripe
                tooltip-effect="light" highlight-current-row @selection-change="checkedChange">
        <el-table-column align="center" type="selection" width="50" fixed :disable="checkedAll"></el-table-column>
        <el-table-column align="center" label="序号" type="index" width="100" fixed>
          <template slot-scope="scope">
            <span>{{scope.$index + query.page.index * query.page.size + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="120" sortable fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.user.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="120" sortable fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.account.loginName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" width="120" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.contacts[0].value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" :show-overflow-tooltip="true" width="260" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.contacts[1].value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工号" width="90" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.user.empNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="gender" width="80" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.user.gender == 0 ? '女' : '男' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.user.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column width="160" align="center" label="更新时间" sortable>-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column fixed="right" align="center" width="260" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定重置吗？"
              iconColor="yellow"
              confirmButtonText='确定'
              confirmButtonType="warning"
              cancelButtonText='取消'
              icon="el-icon-warning"
              @onConfirm="onItemResetPwdConfirm(scope.row)"
            >
              <el-button slot="reference" plain size="mini">重置密码</el-button>
            </el-popconfirm>
            <el-button @click="onMemberDetailClick(scope.row)" icon="el-icon-edit" plain size="mini"></el-button>
            <el-popconfirm
              v-if="scope.row.user.able == 1"
              title="确定禁用吗？"
              iconColor="yellow"
              confirmButtonText='确定'
              confirmButtonType="warning"
              cancelButtonText='取消'
              icon="el-icon-warning"
              @onConfirm="onItemAbleClick(scope.row)"
            >
              <el-button slot="reference" icon="el-icon-lock" plain size="mini"></el-button>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.user.able == 0"
              title="确定启用吗？"
              iconColor="yellow"
              confirmButtonText='确定'
              confirmButtonType="warning"
              cancelButtonText='取消'
              icon="el-icon-warning"
              @onConfirm="onItemAbleClick(scope.row)"
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
              @onConfirm="onItemDeleteClick(scope.row)"
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
        :title="createDialogTitle"
        :visible.sync="createDialogVisible"
        :before-close="onCreateDialogCloseClick">
        <el-form :model="createDialogForm" :rules="createDialogFormRules" ref="createDialogForm" label-width="120px">
          <el-form-item label="用户ID" prop="uid" hidden>
            <el-input v-model="createDialogForm.uid"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="createDialogForm.name" placeholder="姓名可重复，2~20个字"></el-input>
          </el-form-item>
          <el-form-item label="账号ID" prop="aid" hidden>
            <el-input v-model="createDialogForm.aid"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="loginName">
            <el-input v-model="createDialogForm.loginName" placeholder="账号不可重复，4~24个字"></el-input>
          </el-form-item>
          <el-form-item label="手机号码ID" prop="cellphoneId" hidden>
            <el-input v-model="createDialogForm.cellphoneId"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="createDialogForm.cellphone" placeholder="手机号码不可重复"></el-input>
          </el-form-item>
          <el-form-item label="邮箱ID" prop="emailId" hidden>
            <el-input v-model="createDialogForm.emailId"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="createDialogForm.email" placeholder="邮箱号码不可重复"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="createDialogForm.gender">
              <el-radio label="0">女</el-radio>
              <el-radio label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="pin">
            <el-input v-model="createDialogForm.pin" placeholder="身份证号不可重复"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="empNo">
            <el-input v-model="createDialogForm.empNo" placeholder="工号不可重复，6~8个字"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="summary">
            <el-input type="textarea" v-model="createDialogForm.summary"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCreateDialogResetClick('createDialogForm')">重置</el-button>
          <el-button @click="onCreateDialogCloseClick('createDialogForm')">取消</el-button>
          <el-button type="primary" @click="onCreateDialogCommitClick('createDialogForm')">保存</el-button>
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
        mainTableData: [],
        total: 0,
        checkedAll: false,
        checkedList: [],
        createDialogVisible: false,
        createDialogTitleCreate: '新增',
        createDialogTitleEdit: '编辑',
        createDialogTitle: '',
        createDialogFormInit: {
          uid: '',
          aid: '',
          cellphoneId: '',
          emailId: '',
          name: '',
          pin: '',
          empNo: '',
          gender: '',
          summary: '',
          createTime: '',
          loginName: '',
          cellphone: '',
          email: '',
        },
        createDialogForm: {
          uid: '',
          aid: '',
          cellphoneId: '',
          emailId: '',
          name: '',
          pin: '',
          empNo: '',
          gender: '',
          summary: '',
          createTime: '',
          loginName: '',
          cellphone: '',
          email: '',
        },
        createDialogFormRules: {
          loginName: [
            {required: true, message: '请输入账户名称', trigger: 'blur'},
            {min: 4, max: 24, message: '长度在 4 到 24 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          cellphone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {
//              validator: function(rule, value, callback) {
//                if (/^((13[0-9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9]))\\d{8}$/i.test(value) == false) {
//                  callback(new Error("手机号格式错误"));
//                } else {
//                  callback();
//                }
//              },
              trigger: "blur"
            }
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
//              validator: function(rule, value, callback) {
//                if (
//                  /^\w{1,64}@[a-z0-9\-]{1,256}(\.[a-z]{2,6}){1,2}$/i.test(
//                    value
//                  ) == false
//                ) {
//                  callback(new Error("邮箱格式错误"));
//                } else {
//                  callback();
//                }
//              },
              trigger: "blur"
            }
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
      checkAll(data) {
        if (data) {
          data.forEach(row => {
            this.$refs.mainTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.mainTable.clearSelection();
        }
      },
      checkedChange(val){
        this.checkedList = val;
      },
      requestAdminUserList() {
        this.$store.dispatch('accountAdmin/list', this.query)
          .then((response) => {
            if (response.meta.code == 200) {
              this.query.page.index = parseInt(response.data.index);
              this.query.page.size = parseInt(response.data.size);
              this.total = parseInt(response.data.total);
              this.mainTableData = response.data.elements;
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
      onCheckedResetPwdButtonClick(){
        var _this = this;
        var resetting = [];
        this.checkedList.forEach(item => {
          resetting.push({uid: item.user.id, aid: item.account.id});
        });
        this.requestForResetPwd(resetting,function () {
          _this.$message({
            message: '重置成功',
            type: 'success'
          });
        });
      },
      onItemResetPwdConfirm(row) {
        var _this = this;
        var resetting = [{uid: row.user.id, aid: row.account.id}];
        this.requestForResetPwd(resetting,function () {
          _this.$message({
            message: '重置成功',
            type: 'success'
          });
        })
      },
      requestForResetPwd(ids,successCallback) {
        this.$store.dispatch('accountAdmin/reset', ids)
          .then((response) => {
            if (response.meta.code == 200) {
              successCallback()
            }
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      onMemberDetailClick(row){
        this.createDialogForm.uid = row.user.id;
        this.createDialogForm.aid = row.account.id;
        this.createDialogForm.cellphoneId = row.contacts[0].id;
        this.createDialogForm.emailId = row.contacts[1].id;
        this.createDialogForm.name = row.user.name;
        this.createDialogForm.loginName = row.account.loginName;
        this.createDialogForm.pin = row.user.pin;
        this.createDialogForm.empNo = row.user.empNo;
        this.createDialogForm.gender = row.user.gender;
        this.createDialogForm.summary = row.user.summary;
        this.createDialogForm.createTime = row.user.createTime;
        this.createDialogForm.cellphone = row.contacts[0].value;
        this.createDialogForm.email = row.contacts[1].value;
        this.createDialogTitle = this.createDialogTitleEdit;
        this.createDialogVisible = true;
      },
      onCheckedDisableButtonClick(){
        var _this = this;
        var disabling = [];
        this.checkedList.forEach(item => {
          disabling.push(item.user.id);
        });
        this.requestForUserDisable(disabling,function () {
          _this.$message({
            message: '禁用成功',
            type: 'success'
          });
          _this.checkedList.forEach(item => {
            item.user.able = 0;
          });
        });
      },
      onCheckedEnableButtonClick(){
        var _this = this;
        var enabling = [];
        this.checkedList.forEach(item => {
          enabling.push(item.user.id);
        });
        this.requestForUserEnable(enabling,function () {
          _this.$message({
            message: '启用成功',
            type: 'success'
          });
          _this.checkedList.forEach(item => {
            item.user.able = 1;
          });
        });
      },
      onItemAbleClick(row){
        var _this = this;
        if (row.user.able == 0) {
          this.requestForUserEnable([row.user.id], function () {
            row.user.able = 1;
            _this.$message({
              message: '启用成功',
              type: 'success'
            });
          });
        } else if (row.user.able == 1) {
          this.requestForUserDisable([row.user.id], function () {
            row.user.able = 0;
            _this.$message({
              message: '禁用成功',
              type: 'success'
            });
          });
        } else {
          this.$message.error('参数错误');
        }
      },
      requestForUserEnable(ids, successCallback){
        this.$store.dispatch('accountAdmin/enable', ids)
          .then(successCallback()).catch((error) => {
          this.$message.error(error);
        })
      },
      requestForUserDisable(ids, successCallback){
        this.$store.dispatch('accountAdmin/disable', ids)
          .then(successCallback()).catch((error) => {
          this.$message.error(error);
        })
      },
      onCheckedDeleteButtonClick() {
        var deleting = [];
        this.checkedList.forEach(item => {
          deleting.push(item.user.id);
        });
        this.requestForDelete(deleting);
      },
      onItemDeleteClick(row) {
        this.requestForDelete([row.user.id]);
      },
      requestForDelete(ids){
        this.$store.dispatch('accountAdmin/del', ids)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if (this.mainTableData.length == 1 && this.query.page.index > 0) {
              this.query.page.index = this.query.page.index - 1;
            }
            this.requestAdminUserList();
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      onCreateButtonClick() {
        this.createDialogTitle = this.createDialogTitleCreate;
        this.createDialogVisible = true;
      },
      onCreateDialogResetClick(formName) {
        this.createDialogForm = this.createDialogFormInit;
        this.$refs[formName].resetFields();
      },
      onCreateDialogCloseClick() {
        this.onCreateDialogResetClick('createDialogForm');
        this.createDialogVisible = false;
      },
      onCreateDialogCommitClick(formName) {
        if (this.createDialogTitle == this.createDialogTitleCreate) {
          this.requestForCreateMember(formName);
        } else if (this.createDialogTitle == this.createDialogTitleEdit) {
          this.requestForEditMember(formName);
        }
      },
      requestForCreateMember(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('accountAdmin/create', this.createDialogForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.onCreateDialogCloseClick();
                  this.requestAdminUserList();
                  //this.$router.push({path: this.redirect || 'account/admin/list'})
                }
              }).catch((e) => {
            })
          } else {
            return false;
          }
        });
      },
      requestForEditMember(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('accountAdmin/edit', this.createDialogForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.onCreateDialogCloseClick();
                  this.requestAdminUserList();
                }
              }).catch((e) => {
            })
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style scoped>
  .el-container {
    padding-left: 10px;
    padding-top: 20px;
  }
</style>
