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
          <el-popconfirm
            v-if="scope.row.able == 1"
            title="确定禁用吗？"
            iconColor="yellow"
            confirmButtonText='确定'
            confirmButtonType="warning"
            cancelButtonText='取消'
            icon="el-icon-warning"
            @onConfirm="handleUserAble(scope.row)"
          >
            <el-button slot="reference" type="warning" icon="el-icon-lock" round></el-button>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.able == 0"
            title="确定启用吗？"
            iconColor="yellow"
            confirmButtonText='确定'
            confirmButtonType="warning"
            cancelButtonText='取消'
            icon="el-icon-warning"
            @onConfirm="handleUserAble(scope.row)"
          >
            <el-button slot="reference" type="warning" icon="el-icon-unlock" round></el-button>
          </el-popconfirm>

          <el-popconfirm
            title="确定删除吗？"
            iconColor="red"
            confirmButtonText='删除'
            confirmButtonType="danger"
            cancelButtonText='取消'
            icon="el-icon-delete"
            @onConfirm="handleUserDelete(scope.row)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" round></el-button>
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
  </div>
</template>
<script>
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import ElPopover from "../../../node_modules/element-ui/packages/popover/src/main";
  import ElPopconfirm from "../../../node_modules/element-ui/packages/popconfirm/src/main";
  export default {
    components: {
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
        list: [],
        total: 0
      }
    },
    created() {
      this.requestAdminUserList()
    },
    methods: {
      requestAdminUserList() {
        this.$store.dispatch('account/adminUserList', this.query)
          .then((response) => {
            if (response.meta.code == 200) {
              this.query.page.index = response.data.index;
              this.query.page.size = response.data.size;
              this.total = response.data.total;
              this.list = response.data.elements;
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
      handleUserDetail(row){
        this.$router.push({path: this.redirect || '/account/admin/detail/' + row.id})
      },
      handleUserAble(row){
        if (row.able == 0) {
          this.handleUserEnable(row);
        } else if (row.able == 1) {
          this.handleUserDisable(row);
        } else {
          this.$message.error('参数错误');
        }
      },
      handleUserEnable(row){
        this.$store.dispatch('account/adminUserEnable', [row.id])
          .then(() => {
            row.able = 1;
            this.$message({
              message: '启用成功',
              type: 'success'
            });
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      handleUserDisable(row){
        this.$store.dispatch('account/adminUserDisable', [row.id])
          .then(() => {
            row.able = 0;
            this.$message({
              message: '禁用成功',
              type: 'success'
            });
          }).catch((error) => {
          this.$message.error(error);
        })
      },
      handleUserDelete(row){
        this.$store.dispatch('account/adminUserDelete', [row.id])
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if (this.list.length == 1 && this.query.page.index > 0) {
              this.query.page.index = this.query.page.index - 1;
            }
            this.requestAdminUserList();
          }).catch((error) => {
          this.$message.error(error);
        })
      }
    },
  }
</script>

<style scoped>

</style>
