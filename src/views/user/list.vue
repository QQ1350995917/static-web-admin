<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="110px" label="Name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="90px" label="Members">
        <template slot-scope="scope">
          <span>{{ scope.row.members }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Description">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Slogan">
        <template slot-scope="scope">
          <span>{{ scope.row.slogan }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="Readings" width="95">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.pageviews }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column class-name="status-col" label="Status" width="110">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.status | statusFilter">-->
      <!--{{ scope.row.status }}-->
      <!--</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column align="center" label="Drag" width="80">-->
      <!--<template slot-scope="{}">-->
      <!--<svg-icon class="drag-handler" icon-class="drag" />-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <!--&lt;!&ndash; $t is vue-i18n global function to translate lang (lang in @/lang)  &ndash;&gt;-->
    <!--<div class="show-d">-->
    <!--{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}-->
    <!--</div>-->
    <!--<div class="show-d">-->
    <!--{{ $t('table.dragTips2') }} : {{ newList }}-->
    <!--</div>-->
  </div>
</template>
<script>
import { list } from '@/api/organization'
export default {
  name: 'Organization',
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
      list: null,
      total: null,
      loading: true,
      listQuery: {
        page: 1,
        limit: 10,
        status: 0
      },
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const data = await list(this.listQuery)
      this.list = data.org
      this.total = 100
      this.loading = false
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
    }
  }
}
</script>

<style scoped>

</style>
