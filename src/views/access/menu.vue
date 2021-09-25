<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>菜单</span>
              <el-button style="float: right; padding: 0px 0" type="text">新增</el-button>
            </div>
            <el-tree :data="resourceTree"
                     :ref="tree"
                     size="middle"
                     :highlight-current="true"
                     :check-on-click-node="true"
                     node-key="id"
                     :load="loadNode"
                     lazy>
              <span class="custom-tree-node" slot-scope="{ node, data }">
                    <div class="custom-tree-node-wrapper">
                        <span class="custom-tree-node-label">
                            {{ node.label }}
                        </span>
                        <span class="operate-btns">
                            <!--<dot-dropdown :events="dropMenuEvents" :data="{node,data}" @addNode="addNode" />-->
                            <dot-dropdown :events="dropMenuEvents" :data="{node,data}" />
                        </span>
                    </div>
                </span>
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="12" >角色</el-col>
                <el-col :span="4" >可见</el-col>
                <el-col :span="4" >只读</el-col>
                <el-col :span="4" >读写</el-col>
              </el-row>
            </div>
            <el-tree :data="resourceTree"
                     :ref="tree"
                     size="middle"
                     :default-expand-all="true"
                     :highlight-current="true"
                     :check-on-click-node="true"
                     node-key="id"
                     :load="loadNode"
                     lazy>
            </el-tree>
          </el-card>
        </el-col>
      </el-row>


      <el-dialog
        :title="createDialogTitle"
        :visible.sync="createDialogVisible"
        :before-close="onCreateDialogCloseClick">
        <el-form :model="createDialogForm" :rules="createDialogFormRules" ref="createDialogForm" label-width="120px">
          <el-form-item label="id" prop="id">
            <el-input v-model="createDialogForm.id"></el-input>
          </el-form-item>
          <el-form-item label="pid" prop="pid">
            <el-input v-model="createDialogForm.pid"></el-input>
          </el-form-item>
          <el-form-item label="name" prop="name">
            <el-input v-model="createDialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="summary" prop="summary">
            <el-input v-model="createDialogForm.summary"></el-input>
          </el-form-item>
          <el-form-item label="order" prop="order">
            <el-input v-model="createDialogForm.order"></el-input>
          </el-form-item>
          <el-form-item label="leaf" prop="leaf">
            <el-input v-model="createDialogForm.leaf"></el-input>
          </el-form-item>
          <el-form-item label="able" prop="able">
            <el-input v-model="createDialogForm.able"></el-input>
          </el-form-item>
          <el-form-item label="del" prop="del">
            <el-input v-model="createDialogForm.del"></el-input>
          </el-form-item>
          <el-form-item label="createTime" prop="createTime">
            <el-input v-model="createDialogForm.createTime"></el-input>
          </el-form-item>
          <el-form-item label="updateTime" prop="updateTime">
            <el-input v-model="createDialogForm.updateTime"></el-input>
          </el-form-item>
          <el-form-item label="version" prop="version">
            <el-input v-model="createDialogForm.version"></el-input>
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
  import dotDropdown from "../components/dotDropdown";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElRadio,
      ElMain,
      ElHeader,
      ElPopconfirm,
      ElPopover,
      ElButton,
      dotDropdown
    },
    name: 'List',
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
        currentMenuObject: [],
        resourceTree: [
        ],
        resourceTreeBak: [
          {label: '仪表盘'},
          {label: '组织管理'},
          {label: '权限管理',
            children: [
              {label: '菜单管理'},
              {label: '角色管理'}
              ],
          },
        ],
        dropMenuEvents: [
          {label: '授权到角色', funcName: 'onGrantMenuToRoleClick'},
          {label: '新建', funcName: 'onCreateSubNodeClick'},
          {label: '编辑', funcName: 'onEditNodeClick'},
          {label: '删除', funcName: 'onDeleteNodeClick'}
        ],
        onGrantMenuToRoleClick(){},
        onCreateSubNodeClick(){},
        onEditNodeClick(){},
        onDeleteNodeClick(){},
        loading: true,
        query: {
          page: {
            index: 0,
            size: 12
          },
          scopes: [{fieldName: "pid", fieldValue: "0", hit: "EM"}],
          sorts: [{fieldName: "create_time", sort: "asc"}]
        },
        mainTableDataList: [],
        total: 0,
        checkedAll: false,
        checkedList: [],
        createDialogVisible: false,
        createDialogTitleCreate: '新增',
        createDialogTitleEdit: '编辑',
        createDialogTitle: '',
        createDialogFormInit: {
          id: '',
          pid: '',
          name: '',
          summary: '',
          order: '',
          leaf: '',
          able: '',
          del: '',
          createTime: '',
          updateTime: '',
          version: '',
        },
        createDialogForm: {
          id: '',
          pid: '',
          name: '',
          summary: '',
          order: '',
          leaf: '',
          able: '',
          del: '',
          createTime: '',
          updateTime: '',
          version: '',
        },
        createDialogFormRules: {
          id: [
            {required: true, message: 'id', trigger: 'blur'},
          ],
          pid: [
            {required: true, message: 'pid', trigger: 'blur'},
          ],
          name: [
            {required: true, message: 'name', trigger: 'blur'},
          ],
          summary: [
          ],
          order: [
            {required: true, message: 'order', trigger: 'blur'},
          ],
          leaf: [
            {required: true, message: 'leaf', trigger: 'blur'},
          ],
          able: [
            {required: true, message: 'able', trigger: 'blur'},
          ],
          del: [
            {required: true, message: 'del', trigger: 'blur'},
          ],
          createTime: [
            {required: true, message: 'create_time', trigger: 'blur'},
          ],
          updateTime: [
            {required: true, message: 'update_time', trigger: 'blur'},
          ],
          version: [
            {required: true, message: 'version', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
      //this.requestForMainTableList()
    },
    methods: {
      async loadNode(node, resolve) {
        if (!(node.data instanceof Array)) {
          this.query.scopes[0].fieldValue = node.data.id;
        }
        await this.requestForMainTableList(function (data) {
          return resolve(data);
        },function () {
          return resolve();
        });
      },
      requestForMainTableList(success,error) {
        this.$store.dispatch('accessAdminMenu/list', this.query)
          .then((response) => {
            if (response.meta.code == 200) {
              var currentMenuList= []
              for (var i=0;i<response.data.elements.length;i++) {
                currentMenuList.push({label: response.data.elements[i].name,id:response.data.elements[i].id})
              }
              success(currentMenuList)
            }
          }).catch(error)
      },
      onSortChange(props){
        if (props.order == 'ascending') {
          this.query.sorts[0].fieldName = props.prop
          this.query.sorts[0].sort = "ASC"
        } else if (props.order == 'descending') {
          this.query.sorts[0].fieldName = props.prop
          this.query.sorts[0].sort = "DESC"
        } else {
          this.query.sorts[0].fieldName = 'create_time'
          this.query.sorts[0].sort = "ASC"
        }
        this.requestForMainTableList();
      },
      handleSizeChange(size) {
        this.query.page.size = size;
        this.requestForMainTableList()
      },
      handleIndexChange(index) {
        index = index - 1;
        this.query.page.index = index;
        this.requestForMainTableList()
      },
      onItemDetailClick(row){
        this.createDialogForm.id = row.id;
        this.createDialogForm.pid = row.pid;
        this.createDialogForm.name = row.name;
        this.createDialogForm.summary = row.summary;
        this.createDialogForm.order = row.order;
        this.createDialogForm.leaf = row.leaf;
        this.createDialogForm.able = row.able;
        this.createDialogForm.del = row.del;
        this.createDialogForm.createTime = row.createTime;
        this.createDialogForm.updateTime = row.updateTime;
        this.createDialogForm.version = row.version;
        this.createDialogTitle = this.createDialogTitleEdit;
        this.createDialogVisible = true;
      },
      onCheckedDisableButtonClick(){
        var _this = this;
        var disabling = [];
        this.checkedList.forEach(item => {
          disabling.push(item.id);
        });
        this.requestForUserDisable(disabling, function () {
          _this.$message({
            message: '禁用成功',
            type: 'success'
          });
          _this.checkedList.forEach(item => {
            item.able = 0;
          });
        });
      },
      onCheckedEnableButtonClick(){
        var _this = this;
        var enabling = [];
        this.checkedList.forEach(item => {
          enabling.push(item.id);
        });
        this.requestForUserEnable(enabling, function () {
          _this.$message({
            message: '启用成功',
            type: 'success'
          });
          _this.checkedList.forEach(item => {
            item.able = 1;
          });
        });
      },
      onItemAbleClick(row){
        var _this = this;
        if (row.able == 0) {
          this.requestForUserEnable([row.id], function () {
            row.able = 1;
            _this.$message({
              message: '启用成功',
              type: 'success'
            });
          });
        } else if (row.able == 1) {
          this.requestForUserDisable([row.id], function () {
            row.able = 0;
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
        this.$store.dispatch('accessAdminMenu/enable', ids)
          .then(successCallback()).catch((error) => {
          this.$message.error(error);
        })
      },
      requestForUserDisable(ids, successCallback){
        this.$store.dispatch('accessAdminMenu/disable', ids)
          .then(successCallback()).catch((error) => {
          this.$message.error(error);
        })
      },
      onCheckedDeleteButtonClick() {
        var deleting = [];
        this.checkedList.forEach(item => {
          deleting.push(item.id);
        });
        this.requestForDelete(deleting);
      },
      onItemDeleteClick(row) {
        this.requestForDelete([row.id]);
      },
      requestForDelete(ids){
        this.$store.dispatch('accessAdminMenu/del', ids)
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if (this.mainTableDataList.length == 1 && this.query.page.index > 0) {
              this.query.page.index = this.query.page.index - 1;
            }
            this.requestForMainTableList();
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      onCreateButtonClick() {
        this.createDialogTitle = this.createDialogTitleCreate;
        this.createDialogForm = this.createDialogFormInit;
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
            this.$store.dispatch('accessAdminMenu/create', this.createDialogForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.$message({
                    message: '创建成功',
                    type: 'success'
                  });
                  this.onCreateDialogCloseClick();
                  this.requestForMainTableList();
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
            this.$store.dispatch('accessAdminMenu/edit', this.createDialogForm)
              .then((response) => {
                if (response.meta.code == 200) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.onCreateDialogCloseClick();
                  this.requestForMainTableList();
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
  .el-icon-more:before {
    content: "\E794";
    color: #c0c4cc;
    font-size: 20px;
  }
  .rotate {
    cursor: pointer;
    margin-left: 5px;
    transform: rotate(90deg);
  }
  .rotate:focus {
    width: 20px;
    height: 20px;
    border-radius: 4em;
    background-color: rgba(130, 132, 138, 0.2);
  }
</style>
