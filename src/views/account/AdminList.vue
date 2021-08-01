<template>
  <el-container>
    <el-header>
      <el-row>
        <el-input placeholder="输入关键字进行查找">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
      <el-row style="padding-top: 5px">
        <el-col :span="16">
          <el-checkbox v-model="selectAllMember" @change="onSelectAll">全选</el-checkbox>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button>批量重置</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button>批量锁定</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button>批量删除</el-button>
        </el-col>
        <el-col :span="2" style="text-align: right">
          <el-button @click="onCreateMemberButtonClick">新增</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table ref="dragTable" :data="members" row-key="id" style="width: 100%" stripe>
        <el-table-column align="center" width="50" fixed>
          <template slot-scope="scope">
            <el-checkbox v-model='checkedList' :value="scope.row.user.id"></el-checkbox>
          </template>
        </el-table-column>
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
        <el-table-column label="邮箱" :show-overflow-tooltip="true"  width="260" sortable>
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
              @onConfirm="onResetPwdConfirm(scope.row)"
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
              @onConfirm="onUserAbleClick(scope.row)"
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
              @onConfirm="onUserAbleClick(scope.row)"
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
              @onConfirm="requestForDelete(scope.row)"
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
        :title="createMemberDialogTitle"
        :visible.sync="createMemberDialogVisible"
        :before-close="onCreateMemberDialogCloseClick">
        <el-form :model="createMemberForm" :rules="createMemberRules" ref="createMemberForm" label-width="120px">
          <el-form-item label="用户ID" prop="uid" hidden>
            <el-input v-model="createMemberForm.uid"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="createMemberForm.name" placeholder="姓名可重复，2~20个字"></el-input>
          </el-form-item>
          <el-form-item label="账号ID" prop="aid" hidden>
            <el-input v-model="createMemberForm.aid"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="loginName">
            <el-input v-model="createMemberForm.loginName" placeholder="账号不可重复，4~24个字"></el-input>
          </el-form-item>
          <el-form-item label="手机号码ID" prop="cellphoneId" hidden>
            <el-input v-model="createMemberForm.cellphoneId"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="createMemberForm.cellphone" placeholder="手机号码不可重复"></el-input>
          </el-form-item>
          <el-form-item label="邮箱ID" prop="emailId" hidden>
            <el-input v-model="createMemberForm.emailId"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="createMemberForm.email" placeholder="邮箱号码不可重复"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="createMemberForm.gender">
              <el-radio label="0">女</el-radio>
              <el-radio label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="pin">
            <el-input v-model="createMemberForm.pin" placeholder="身份证号不可重复"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="empNo">
            <el-input v-model="createMemberForm.empNo" placeholder="工号不可重复，6~8个字"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="summary">
            <el-input type="textarea" v-model="createMemberForm.summary"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onCreateMemberDialogResetClick('createMemberForm')">重置</el-button>
          <el-button @click="onCreateMemberDialogCloseClick('createMemberForm')">取消</el-button>
          <el-button type="primary" @click="onCreateMemberDialogCommitClick('createMemberForm')">保存</el-button>
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
        members: [],
        total: 0,
        selectAllMember: false,
        checkedList: [],
        createMemberDialogVisible: false,
        createMemberDialogTitleCreate: '新增',
        createMemberDialogTitleEdit: '编辑',
        createMemberDialogTitle: '',
        createMemberFormInit: {
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
        createMemberForm: {
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
        createMemberRules: {
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
    watch: { //深度 watcher
      'checkedList': {
        handler: function(val, oldVal) {
          if (val.length === this.members.length) {
            console.log("a")
            this.selectAllMember = true;
          } else {
            console.log("b")
            this.selectAllMember = false;
          }
        },
        deep: true
      }
    },
    methods: {
      onSelectAll: function() {
        var _this = this;
        if (_this.selectAllMember) {
          _this.selectAllMember = false;
          _this.checkedList = [];
        } else {
          _this.selectAllMember = true;
          _this.checkedList = [];
          _this.members.forEach(function(item, index) {
            _this.checkedList.push(item.user.id);
          });
        }
      },
      requestAdminUserList() {
        this.$store.dispatch('accountAdmin/list', this.query)
          .then((response) => {
            if (response.meta.code == 200) {
              this.query.page.index = parseInt(response.data.index);
              this.query.page.size = parseInt(response.data.size);
              this.total = parseInt(response.data.total);
              this.members = response.data.elements;
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
      onResetPwdConfirm(row) {
        this.$store.dispatch('accountAdmin/reset', {uid: row.user.id, aid: row.account.id})
          .then((response) => {
            if (response.meta.code == 200) {
              this.$message({
                message: '重置成功',
                type: 'success'
              });
            }
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      onMemberDetailClick(row){
        this.createMemberForm.uid = row.user.id;
        this.createMemberForm.aid = row.account.id;
        this.createMemberForm.cellphoneId = row.contacts[0].id;
        this.createMemberForm.emailId = row.contacts[1].id;
        this.createMemberForm.name = row.user.name;
        this.createMemberForm.loginName = row.account.loginName;
        this.createMemberForm.pin = row.user.pin;
        this.createMemberForm.empNo = row.user.empNo;
        this.createMemberForm.gender = row.user.gender;
        this.createMemberForm.summary = row.user.summary;
        this.createMemberForm.createTime = row.user.createTime;
        this.createMemberForm.cellphone = row.contacts[0].value;
        this.createMemberForm.email = row.contacts[1].value;
        this.createMemberDialogTitle = this.createMemberDialogTitleEdit;
        this.createMemberDialogVisible = true;
      },
      onUserAbleClick(row){
        if (row.user.able == 0) {
          this.requestForUserEnable(row);
        } else if (row.user.able == 1) {
          this.requestForUserDisable(row);
        } else {
          this.$message.error('参数错误');
        }
      },
      requestForUserEnable(row){
        this.$store.dispatch('accountAdmin/enable', [row.user.id])
          .then(() => {
            row.user.able = 1;
            this.$message({
              message: '启用成功',
              type: 'success'
            });
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      requestForUserDisable(row){
        this.$store.dispatch('accountAdmin/disable', [row.user.id])
          .then(() => {
            row.user.able = 0;
            this.$message({
              message: '禁用成功',
              type: 'success'
            });
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      requestForDelete(row){
        this.$store.dispatch('accountAdmin/del', [row.user.id])
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if (this.members.length == 1 && this.query.page.index > 0) {
              this.query.page.index = this.query.page.index - 1;
            }
            this.requestAdminUserList();
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      onCreateMemberButtonClick() {
        this.createMemberDialogTitle = this.createMemberDialogTitleCreate;
        this.createMemberDialogVisible = true;
      },
      onCreateMemberDialogResetClick(formName) {
        this.createMemberForm = this.createMemberFormInit;
        this.$refs[formName].resetFields();
      },
      onCreateMemberDialogCloseClick() {
        this.onCreateMemberDialogResetClick('createMemberForm');
        this.createMemberDialogVisible = false;
      },
      onCreateMemberDialogCommitClick(formName) {
        if (this.createMemberDialogTitle == this.createMemberDialogTitleCreate) {
          this.requestForCreateMember(formName);
        } else if(this.createMemberDialogTitle == this.createMemberDialogTitleEdit)  {
          this.requestForEditMember(formName);
        }
      },
      requestForCreateMember(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('accountAdmin/create', this.createMemberForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.onCreateMemberDialogCloseClick();
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
            this.$store.dispatch('accountAdmin/edit', this.createMemberForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.onCreateMemberDialogCloseClick();
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
