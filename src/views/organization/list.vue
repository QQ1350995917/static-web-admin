<template>
  <el-container>
    <el-aside width="300px">
      <el-input
        placeholder="输入关键字进行过滤">
      </el-input>
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        nodeKey="id"
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
            @click="() => onCreateSubNodeClick(node, data)">
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
    <el-main>Main</el-main>
    <el-dialog
      title="新建"
      :visible.sync="createSubNodeDialogVisible"
      width="30%"
      :before-close="onCreateSubNodeDialogCloseClick">
      <span>{{parentNodeTitle}}</span>
      <div>
        <el-input placeholder="请输入内容" v-model="subjectNodeTitle">
          <template slot="prepend">部门名称：</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCreateSubNodeDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onCreateSubNodeDialogConfirmClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="editNodeDialogVisible"
      width="30%"
      :before-close="onEditNodeDialogCloseClick">
      <div>
        <el-input placeholder="请输入内容" v-model="subjectNodeTitle">
          <template slot="prepend">部门名称：</template>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onEditNodeDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onEditNodeDialogConfirmClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="删除"
      :visible.sync="deleteSubNodeDialogVisible"
      width="30%"
      :before-close="onCreateSubNodeDialogCloseClick">
      <span>{{parentNodeTitle}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onDeleteNodeDialogCloseClick">取 消</el-button>
        <el-button type="primary" @click="onDeleteNodeDialogConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main";
  import { fetchNodeList,createNode,deleteNode } from '@/api/organization'
  export default {
    components: {ElMain},

    data() {
      return {
        props: {
          id: 'id',
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        page: {"index":0,"size":120},
        scopes: [{hit:"EM",fieldName:"pid",fieldValue:"0"},{hit:"EM",fieldName:"del",fieldValue:"0"}],
        sorts: [{fieldName:"sort",sort:"asc"}],
        createSubNodeDialogVisible: false,
        parentNodeTitle: '',
        subjectNodeTitle: '',
        nodeObject:{
          description: "string",
          logo: "string",
          members: 1,
          name: "string",
          pid: 0,
          slogan: "string",
          sort: 0
        },
        editNodeDialogVisible: false,
        deleteSubNodeDialogVisible: false,
        currentDeleteNodeId: ''
      };
    },
    methods: {
      async loadNode(node, resolve) {
        if (node.level === 0) {
          const data = await fetchNodeList(this.page,this.scopes,this.sorts)
          return resolve(data.data.elements);
        }
        if (node.level > 0) {
          this.scopes[0].fieldValue=node.key
          const data = await fetchNodeList(this.page,this.scopes,this.sorts)
          return resolve(data.data.elements);
        }
      },
      onCreateSubNodeClick(node, data){
        this.createSubNodeDialogVisible=true;
        this.parentNodeTitle = data.name;
        this.nodeObject.pid = data.id;
      },
      onCreateSubNodeDialogCloseClick() {
        this.parentNodeTitle = ''
        this.createSubNodeDialogVisible=false;
      },
      onCreateSubNodeDialogConfirmClick() {
        this.nodeObject.name = this.subjectNodeTitle;
        this.requestForCreateNewNode(this.nodeObject)
      },
      requestForCreateNewNode(nodeObject) {
        createNode(nodeObject)
      },
      onEditNodeNameClick(){
        this.editNodeDialogVisible = true;
        this.parentNodeTitle = data.name;
        this.currentDeleteNodeId = data.id;
      },
      onEditNodeDialogCloseClick() {
        this.subjectNodeTitle = '';
        this.editNodeDialogVisible = false;
      },
      onEditNodeDialogConfirmClick() {

        this.editNodeDialogVisible = false;
      },
      onDeleteNodeClick(node, data) {
        this.deleteSubNodeDialogVisible=true;
        this.parentNodeTitle = data.name;
        this.currentDeleteNodeId = data.id;
      },
      onDeleteNodeDialogCloseClick() {
        this.currentDeleteNodeId = '';
        this.deleteSubNodeDialogVisible = false;
      },
      onDeleteNodeDialogConfirmClick() {
        deleteNode(this.currentDeleteNodeId)
        this.deleteSubNodeDialogVisible = false;
      },
      onItemMenuClick(data) {
        console.log(data)
      },
      handleNodeClick(data) {
        console.log(data);
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
</style>
