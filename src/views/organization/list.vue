<template>
  <el-container>
    <el-aside width="300px">
      <el-input placeholder="输入关键字进行查找">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        nodeKey="id"
        @node-click="onOrgNodeClick"
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => onEditNodeNameClick(node, data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => onCreateNodeClick(node, data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => onDeleteNodeClick(node, data)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </el-aside>
    <el-main>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="3">
              <el-button plain >下载模板</el-button>
            </el-col>
            <el-col :span="3">
              <el-button plain >批量导入</el-button>
            </el-col>
            <el-col :span="3">
              <el-button plain @click="onCreateOrgMemberButtonClick" >新增成员</el-button>
            </el-col>
            <el-col :span="3">
              <el-button plain >批量删除</el-button>
            </el-col>
            <el-col :span="12">
              <el-input placeholder="输入关键字进行查找">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-table
            :data="members"
            stripe
            height="650"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              fixed
              prop="member.name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="部门"
              width="120">
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              width="80">
            </el-table-column>
            <el-table-column
              prop="member.gender"
              label="性别"
              width="80">
            </el-table-column>
            <el-table-column
              prop="member.emp_no"
              label="工号"
              width="80">
            </el-table-column>
            <el-table-column
              prop="member.pin"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="member.able"
              label="禁/启"
              width="80">
            </el-table-column>
            <el-table-column
              prop="active"
              label="激活"
              width="80">
            </el-table-column>
            <el-table-column
              prop="member.date"
              label="日期"
              width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="240">
              <el-button plain size="mini" icon="el-icon-phone"></el-button>
              <el-button plain size="mini" icon="el-icon-star-on"></el-button>
              <el-button plain size="mini" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" icon="el-icon-delete"></el-button>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </el-main>
      </el-container>


    </el-main>
    <el-dialog
      title="新建子级部门"
      :visible.sync="createNodeDialogVisible"
      width="30%"
      :before-close="onCreateNodeDialogCloseClick">
      <div>
        <el-input placeholder="上级部门名称" v-model="parentNodeObject.name" v-bind:readonly="true">
          <template slot="prepend">上级部门名称：</template>
        </el-input>
      </div>
      <br>
      <div>
        <el-input placeholder="请输入子级部门名称" v-model="currentNodeObject.name">
          <template slot="prepend">子级部门名称：</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCreateNodeDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onCreateNodeDialogConfirmClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑部门名称"
      :visible.sync="editNodeDialogVisible"
      width="30%"
      :before-close="onEditNodeDialogCloseClick">
      <div>
        <el-input placeholder="部门新名称" v-model="currentNodeObject.name">
          <template slot="prepend">部门名称：</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onEditNodeDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onEditNodeDialogConfirmClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除部门"
      :visible.sync="deleteNodeDialogVisible"
      width="30%"
      :before-close="onCreateNodeDialogCloseClick">
      <div>
        <el-input placeholder="部门新名称" v-model="currentNodeObject.name" v-bind:readonly="true">
          <template slot="prepend">部门名称：</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onDeleteNodeDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onDeleteNodeDialogConfirmClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增成员"
      :visible.sync="createOrgMemberDialogVisible"
      width="30%"
      :before-close="onCreateOrgMemberDialogCloseClick">
      <el-form :model="createOrgMemberForm" :rules="createOrgMemberRules" ref="createOrgMemberForm" label-width="120px">
        <el-form-item label="部门名称" prop="orgName">
          <el-input v-model="currentOrgObject.name" v-bind:readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="账户名" prop="accountName">
          <el-input v-model="createOrgMemberForm.accountName"></el-input>
        </el-form-item>
        <el-form-item label="账户密码" prop="accountPwd">
          <el-input v-model="createOrgMemberForm.accountPwd"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="createOrgMemberForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="pin">
          <el-input v-model="createOrgMemberForm.pin"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="empNo">
          <el-input v-model="createOrgMemberForm.empNo"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="createOrgMemberForm.gender">
            <el-radio label="0"></el-radio>
            <el-radio label="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介" prop="summary">
          <el-input type="textarea" v-model="createOrgMemberForm.summary"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCreateOrgMemberDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onCreateOrgMemberDialogConfirmClick('createOrgMemberForm')">确 定</el-button>
      </span>
    </el-dialog>

  </el-container>
</template>
<script>
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main";
//  import AddOrgMember from "addOrgMember.vue";

  import { fetchOrgList,createOrg,editOrg,deleteOrg } from '@/api/organization/organization'
  import { fetchOrgMemberList,bindUserToOrg} from '@/api/organization/organizationMember'
  import { userCreate} from '@/api/account/user'
  export default {
    components: {
      ElMain,
//      AddOrgMember
    },

    data() {
      return {
        props: {
          id: 'id',
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        orgPage: {"index":0,"size":120},
        orgScopes: [{hit:"EM",fieldName:"pid",fieldValue:"0"},{hit:"EM",fieldName:"del",fieldValue:"0"}],
        orgSorts: [{fieldName:"sort",sort:"asc"}],
        parentNodeObject: {
          id: '',
          description: "",
          logo: "",
          members: 0,
          name: "",
          pid: 0,
          slogan: "",
          sort: 0
        },
        currentNodeObject: {
          id: '',
          description: "",
          logo: "",
          members: 0,
          name: "",
          pid: 0,
          slogan: "",
          sort: 0
        },
        currentOrgObject: {
          id: 0,
          description: "",
          logo: "",
          members: 0,
          name: "",
          pid: 0,
          slogan: "",
          sort: 0
        },
        createNodeDialogVisible: false,
        editNodeDialogVisible: false,
        deleteNodeDialogVisible: false,
        memberPage: {"index":0,"size":12},
        memberScopes: [{hit:"EM",fieldName:"org_id",fieldValue:''},{hit:"EM",fieldName:"del",fieldValue:"0"}],
        memberSorts: [{fieldName:"sort",sort:"asc"}],
        members:  [{
          date: '2016-05-03',
          name: '王小虎',
          gender: '女',
          empNo: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          pin: '111111111111111111'
        },{
          able: 0,
          createTime: 1623641997000,
          del: 0,
          memId: "19",
          member: {
            id: "19",
            name: "777777"
          },
          orgId: "1",
          sort: 0,
          updateTime: 1623641997000
        }],
        createOrgMemberDialogVisible: false,
        createOrgMemberForm: {
          accountName: '',
          accountPwd: '',
          userName: '',
          pin: '',
          empNo: '',
          level: 1,
          gender: '',
          summary: ''
        },
        createOrgMemberRules: {
          accountName: [
            {required: true, message: '请输入账户名', trigger: 'blur'},
            {min: 4, max: 24, message: '长度在 4 到 24 个字符', trigger: 'blur'}
          ],
          accountPwd: [
            {required: true, message: '请输入账户密码', trigger: 'blur'},
            {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
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
    created() {

    },
    methods: {
      async loadNode(node, resolve) {
        if (node.level === 0) {
          const data = await fetchOrgList(this.orgPage,this.orgScopes,this.orgSorts)
          this.currentOrgObject = data.data.elements[0];
          this.onOrgNodeClick(this.currentOrgObject)
          return resolve(data.data.elements);
        }
        if (node.level > 0) {
          this.orgScopes[0].fieldValue = node.key
          const data = await fetchOrgList(this.orgPage,this.orgScopes,this.orgSorts)
          return resolve(data.data.elements);
        }
      },
      onOrgNodeClick(node, data){
        this.currentOrgObject = node;
        this.memberScopes[0].fieldValue = this.currentOrgObject.id;
        fetchOrgMemberList(this.memberPage,this.memberScopes,this.memberSorts).then((res) => {
          if (res.meta.code === 200) {
            this.members = res.data.elements;
          } else {

          }
        });
      },
      onCreateNodeClick(node, data){
        this.createNodeDialogVisible=true;
        this.parentNodeObject.name = data.name;
        this.currentNodeObject.pid = data.id;
      },
      onCreateNodeDialogCloseClick() {
        this.parentNodeObject.name = '';
        this.currentNodeObject.pid = '';
        this.createNodeDialogVisible=false;
      },
      onCreateNodeDialogConfirmClick() {
        createOrg(this.currentNodeObject).then((res) => {
          if (res.meta.code === 200) {
            this.$message({
              message: '创建' + this.currentNodeObject.name + '成功',
              type: 'success'
            });
            this.onDeleteNodeDialogCloseClick();
          } else {
            this.$message.error('创建' + this.currentNodeObject.name + '失败')
          }
        });
        this.onCreateNodeDialogCloseClick();
      },
      onEditNodeNameClick(node, data){
        this.editNodeDialogVisible = true;
        this.currentNodeObject.id = data.id;
        this.currentNodeObject.name = data.name;
      },
      onEditNodeDialogCloseClick() {
        this.currentNodeObject.id = '';
        this.currentNodeObject.name = '';
        this.editNodeDialogVisible = false;
      },
      onEditNodeDialogConfirmClick() {
        editOrg(this.currentNodeObject).then((res) => {
          if (res.meta.code === 200) {
            this.$message({
              message: '编辑' + this.currentNodeObject.name + '成功',
              type: 'success'
            });
            this.onDeleteNodeDialogCloseClick();
          } else {
            this.$message.error('编辑' + this.currentNodeObject.name + '失败')
          }
        });
        this.onEditNodeDialogCloseClick();
      },
      onDeleteNodeClick(node, data) {
        this.deleteNodeDialogVisible=true;
        this.currentNodeObject.name = data.name;
        this.currentNodeObject.id = data.id;
      },
      onDeleteNodeDialogCloseClick() {
        this.currentNodeObject.name = '';
        this.currentNodeObject.id = '';
        this.deleteNodeDialogVisible = false;
      },
      onDeleteNodeDialogConfirmClick() {
        deleteOrg(this.currentNodeObject.id).then((res) => {
          if (res.meta.code === 200) {
            this.$message({
              message: '删除' + this.currentNodeObject.name + '成功',
              type: 'success'
            });
            this.onDeleteNodeDialogCloseClick();
          } else {
            this.$message.error('删除' + this.currentNodeObject.name + '失败')
          }
        });
      },
      onCreateOrgMemberButtonClick(){
        this.createOrgMemberDialogVisible = true;
      },
      onCreateOrgMemberDialogCloseClick(){
        this.createOrgMemberDialogVisible = false;
      },
      onCreateOrgMemberDialogConfirmClick(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            userCreate(this.createOrgMemberForm).then((res) => {
              if (res.meta.code === 200) {
                bindUserToOrg(this.currentOrgObject.id,res.data).then((response) => {
                  if (response.meta.code === 200) {
                    this.$message({
                      message: '新建成功',
                      type: 'success'
                    });
                    this.onCreateOrgMemberDialogCloseClick();
                  } else {

                  }
                });
              } else {

              }
            });
          } else {
            return false;
          }
        });
      },
      onItemMenuClick(data) {
        console.log(data)
      },
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
    }
  };
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    line-height: 50px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node {
    margin: 5px;
  }
  .el-aside {
    padding-left:10px;
    padding-top:20px;
  }
</style>
