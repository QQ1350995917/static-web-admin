<template>
  <el-dropdown trigger="click" class="custom-tree-menu" size="small">
    <i class="el-icon-more rotate " />
    <el-dropdown-menu slot="dropdown">
      <!--<el-dropdown-item v-for='(item,index) in events' :key="index" :divided="index >0" @click.native="clickMenu(item)">-->
        <!--{{item.label}}-->
      <!--</el-dropdown-item>-->
      <el-dropdown-item v-for='(item,index) in events' :key="index" :divided="index >0">
        {{item.label}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
//  https://www.cnblogs.com/ygria/p/13456752.html
  export default {
    props: {
      events: {
        type: Array,
        default: function() {
          return [
            {
              label: '新建',
              funcName: 'addNode'
            },
            {
              label: '编辑',
              funcName: 'editNode'
            },
            {
              label: '删除',
              funcName: 'deleteNode'
            }
          ]
        }
      },
      // 注入数据
      data: {
        type: Object
      }
    },
    methods: {
      clickMenu(item) {
        this.$emit(item.funcName, this.data)
      }
    }
  }
</script>
