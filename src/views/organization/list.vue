<template>
  <div class="app-container">
    <el-table id="listTable" v-loading="loading" :data="list" row-key="id" border fit highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="ID" width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Name" min-width="90px" width="180px" max-width="270px">
        <template slot-scope="scope">
          <router-link :to="'/organization/detail/'+scope.row.id" class="link-type">
            <span>{{ scope.row.name }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Members" min-width="90px" width="90px" max-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.members }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Description" min-width="200px" width="300px" max-width="400px">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Slogan" min-width="200px" width="300px" max-width="400px">
        <template slot-scope="scope">
          <span>{{ scope.row.slogan }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Date" min-width="180px" width="180px" max-width="180px">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editOrg(scope.row.id)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button v-if="scope.row.status=='0'" size="mini" type="danger"
                     @click="disableOrg(scope.row.id)">
            {{ $t('table.disabled') }}
          </el-button>
          <el-button v-if="scope.row.status=='1'" size="mini" type="danger"
                     @click="enableOrg(scope.row.id)">
            {{ $t('table.enabled') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {fetchRoot, createRoot, fetchList} from '@/api/organization'

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
        newList: [],
      }
    },
    created() {
      this.requestRoot()
    },
    methods: {
      async requestRoot() {
        this.loading = true
        const data = await fetchRoot()
        this.loading = false;

        if (data.meta.code == 404) {
          this.$router.push({path: this.redirect || '/organization/create'})
        } else {
          this.requestList();
        }
      },
      async requestList() {
        this.loading = true
        const data = await fetchList(this.listQuery)
        this.list = data.data.org
        this.total = 100
        this.loading = false
        this.oldList = this.list.map(v => v.id)
        this.newList = this.oldList.slice()
      },
      editOrg(id){
        this.$router.push({path: this.redirect || '/organization/create/' + id})
      },
      enableOrg(id){

      },
      disableOrg(id){

      }
    }
  }
</script>

<style scoped>

</style>
