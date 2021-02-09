<template>
  <el-container>
    <el-aside width="200px">
      <el-tree :data="tables" :props="defaultProps"  :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>

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
    name: 'article',
    data() {
      return {
        tables: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted: function () {

    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
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
