<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table ref="dragTable" :data="list" row-key="id" border fit highlight-current-row
              style="width: 100%" stripe>
      <el-table-column align="center" label="SEQ" type="index" width="100">
        <template slot-scope="scope">
          <span>{{scope.$index + query.page.index * query.page.size + 1}}</span>
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

      <el-table-column fixed="right" align="center" width="220" label="function">
        <template slot-scope="scope">
          <el-button @click="handleUserDetail(scope.row)" type="info" icon="el-icon-setting" round></el-button>
          <el-button v-if="scope.row.able == 1" @click="handleUserAble(scope.row)" type="warning" icon="el-icon-close" round></el-button>
          <el-button v-if="scope.row.able == 0" @click="handleUserAble(scope.row)" type="warning" icon="el-icon-close" round></el-button>
          <el-button @click="handleUserDelete(scope.row)" type="danger" icon="el-icon-delete" round></el-button>
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
  </div>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import ElPopover from "../../../node_modules/element-ui/packages/popover/src/main";
  export default {
    components: {
      ElPopover,
      ElButton},
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
        query: {
          page: {
            index: 0,
            size: 12
          },
          scopes: [],
          sorts: []
        },
        list: null,
        total: 0
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$store.dispatch('admin/adminList', this.query.page, this.query.scopes, this.query.sorts)
          .then((response) => {
            if (response.meta.code == 200) {
              this.query.page.index = response.data.index;
              this.query.page.size = response.data.size;
              this.total = response.data.total;
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
        this.query.page.size = size;
        this.getList()
      },
      handleIndexChange(index) {
        index = index - 1;
        this.query.page.index = index;
        this.getList()
      },
      handleUserDetail(row){
        this.$router.push({path: this.redirect || '/user/detail/' + row.id})
      },
      handleUserAble(row){

      },
      handleUserDelete(row){

      }
    },
  }
</script>

<style scoped>

</style>
