<template>
  <el-container>
    <el-aside width="400px">
      <!--https://www.cnblogs.com/xintao/p/13055898.html-->
      <el-tree
        node-key="id"
        :data="tables"
        :props="defaultProps"
        :load="loadNode"
        @node-click="handleNodeClick"
        lazy>
      </el-tree>
    </el-aside>
    <el-main>Main</el-main>
  </el-container>
</template>
<script>
  import {
    requestBooksApi,
    requestCreateBookApi,
    requestUpdateBookApi,
    requestRecommendBooksApi,
    requestRecommendCancelBooksApi,
    requestVisibleBooksApi,
    requestVisibleCancelBooksApi,
    requestDeleteBooksApi,
    requestDeleteCancelBooksApi,
  } from '@/api/book/book'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    name: 'Article',
    data() {
      return {

        pid: 0,
        tables: [],
        defaultProps: {     // 修改el-tree默认data数组参数
          id: 'id',
          parentId: 'parentId',
          label: 'name',
          children: 'children',
          isLeaf: false      // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        },
        tableQuery: {
          page: {},
          scopes: [{hit: "EM", fieldName: "pid", fieldValue: "0"}],
          sorts: []
        }
      }
    },
    mounted: function () {

    },
    methods: {
      loadNode(node, resolve) {
        // 加载 树数据
        let that = this;
        if (node.level === 0) {
          that.loadParentData(resolve);
        }
        if (node.level >= 1) {
          this.getChildByParent(node.data.id, resolve);
          // 加上这个，防止在该节点没有子节点时一直转圈的问题发生。
          return resolve([]);
        }
      },

      loadParentData(resolve) {
        // 获取loadtreeData 就是父节点数据，getChildByList就是异步获取子节点数据
        this.tableQuery.scopes[0].filedValue = this.pid
        this.$store.dispatch('educationArticle/list', this.tableQuery)
          .then((response) => {
            if (response.meta.code == 200) {
              var elements = response.data.elements;
              elements.forEach(item => {
                item.name = item.name;
                item.parentId = item.pid;
                item.id = item.id;
                item.isLeaf = (item.leaf === 1);
              });
              resolve(elements)
            }
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
      },

      getChildByParent(_parentID, resolve) {     // 获取子节点请求
        this.tableQuery.scopes[0].fieldValue =  _parentID
        this.$store.dispatch('educationArticle/list', this.tableQuery)
          .then((response) => {
            if (response.meta.code == 200) {
              var elements = response.data.elements;
              elements.forEach(item => {
                item.name = item.name;
                item.parentId = item.pid;
                item.id = item.id;
                item.isLeaf = (item.leaf === 1);
              });
              resolve(elements)
            }
          })
          .catch((error) => {
            this.$message.error(error.message);
          })
      },

      handleNodeClick(data) {
        // 节点被点击时的回调
        console.log(JSON.stringify(data))
        if (data.leaf === true) {
          console.log(data.id)
        }
      },
    }
  }
</script>

<style>
  .el-input {
    margin-bottom: 10px;
  }

  .el-input-group__prepend {
    width: 100px;
  }

  .actionButton {
    width: 60px;
  }
</style>
