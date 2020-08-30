<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table ref="dragTable" :data="list" row-key="id" border fit highlight-current-row
              style="width: 100%" stripe>
      <el-table-column align="center" label="ID" width="100" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="EMP_NO." width="120" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.empNo }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150" label="Name" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180" label="PIN" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.pin }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="gender" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
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

      <el-table-column align="center" label="summary">
        <template slot-scope="scope">
          <span>{{ scope.row.summary}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" width="180" label="function">
        <template slot-scope="scope">
          <el-button @click="this.handleDetail(scope.row)" type="text" size="small">detail</el-button>
          <el-button @click="this.handleAble(scope.row)" type="text" size="small">enable</el-button>
          <el-button @click="this.handleDetail(scope.row)" type="text" size="small">delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      :current-page="index + 1"
      :page-sizes="[10,12,20,50,100]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total" style="margin-top: 10px">
    </el-pagination>
  </div>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    name: 'Admin',
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
        listQuery: {
          page: 1,
          limit: 10,
          status: 0
        },
        sortable: null,
        list: null,
        total: 100,
        size: 12,
        index: 0,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$store.dispatch('admin/adminList')
          .then((response) => {
            if (response.meta.code == 200) {
              this.size = response.data.size;
              this.total = response.data.total;
              this.index = response.data.index;
              this.list = response.data.elements
            }
          }).catch(() => {
        })
//      this.list = data.org
//      this.total = 100
//      this.loading = false
//      this.oldList = this.list.map(v => v.id)
//      this.newList = this.oldList.slice()
      },

      handleSizeChange(size) {
        this.size = size;
        this.getList()
      },
      handleIndexChange(index) {
        index = index - 1;
        this.index = index;
        this.getList()
      },
      handleDetail(row){

      },
      handleAble(row){

      },
      handleDelete(row){

      }
    },
  }
</script>

<style scoped>

</style>
