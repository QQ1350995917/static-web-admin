<template>
  <el-container>
    <el-header>
      <el-row style="margin-top: 10px;">
        <el-col :span="24" style="padding-right: 0px">
          <div>
            <el-input
              @keyup.enter.native="onSearch()"
              placeholder="Please input"
              v-model="searchKeyword" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <template>
        <el-table
          :data="hosts"
          stripe
          style="width: 100%">
          <el-table-column
            prop="groupName"
            label="逻辑组" >
          </el-table-column>
          <el-table-column
            prop="nodeName"
            label="主机名" >
          </el-table-column>
          <el-table-column
            prop="distributeId"
            label="发行ID">
          </el-table-column>
          <el-table-column
            prop="distributeIdLike"
            label="发行类别" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="distributeName"
            label="发行姓名">
          </el-table-column>
          <el-table-column
            prop="distributeVersion"
            label="发行版本">
          </el-table-column>
          <el-table-column
            prop="distributeCodeName"
            label="发行代号">
          </el-table-column>
          <el-table-column
            prop="distributeDescription"
            label="发行简介" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="operatingSystem"
            label="操作系统">
          </el-table-column>
          <el-table-column
            prop="systemUpSince"
            label="操作系统启动时间">
          </el-table-column>
          <el-table-column
            prop="hardwarePlatform"
            label="硬件平台">
          </el-table-column>
          <el-table-column
            prop="kernelName"
            label="内核名称">
          </el-table-column>
          <el-table-column
            prop="kernelVersion"
            label="内核版本">
          </el-table-column>
          <el-table-column
            prop="kernelRelease"
            label="内核发行">
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间">
          </el-table-column>
        </el-table>
      </template>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[12, 24, 48, 120]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-footer>
  </el-container>
</template>
<script>
  import {
    requestHostsApi
  } from '@/api/monitor/host'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'host',
    data() {
      return {
        searchKeyword: '',
        hosts: [],
        pageIndex: 1,
        pageSize: 12,
        total: 0
      }
    },
    mounted: function () {
      this.doRequestHosts(this.pageIndex, this.pageSize)
    },
    methods: {
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        this.doRequestBooks(this.pageIndex, this.pageSize)
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        this.doRequestBooks(this.pageIndex, this.pageSize)
      },
      doRequestHosts(pageIndex, pageSize){
        requestHostsApi(pageIndex - 1, pageSize).then((res) => {
          this.hosts = []
          if (res.meta.code === 200) {
            this.hosts = res.data.elements;
            this.pageIndex = res.data.index + 1;
            this.pageSize = res.data.size;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      onBookSearch: function (e) {
        var e = window.event || e;
        var keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode == 13 && this.searchKeyword) {
          this.$router.push({path: '/book/search?type=book&keyword=' + this.searchKeyword});
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
