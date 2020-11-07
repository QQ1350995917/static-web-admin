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
        <el-table :data="list" stripe height="750" style="width: 100%">
          <el-table-column prop="groupName" label="逻辑组" ></el-table-column>
          <el-table-column prop="nodeName" label="主机名" ></el-table-column>
          <el-table-column prop="memTotal" label="memTotal"></el-table-column>
          <el-table-column prop="memFree" label="memFree"></el-table-column>
          <el-table-column prop="memAvailable" label="memAvailable"></el-table-column>
          <el-table-column prop="buffers" label="buffers"></el-table-column>
          <el-table-column prop="cached" label="cached"></el-table-column>
          <el-table-column prop="swapCached" label="swapCached"></el-table-column>
          <el-table-column prop="active" label="active"></el-table-column>
          <el-table-column prop="inactive" label="inactive"></el-table-column>
          <el-table-column prop="activeAnon" label="activeAnon"></el-table-column>
          <el-table-column prop="inactiveAnon" label="inactiveAnon"></el-table-column>
          <el-table-column prop="activeFile" label="activeFile"></el-table-column>
          <el-table-column prop="inactiveFile" label="inactiveFile"></el-table-column>
          <el-table-column prop="unevictable" label="unevictable"></el-table-column>
          <el-table-column prop="mlocked" label="mlocked"></el-table-column>
          <el-table-column prop="swapTotal" label="swapTotal"></el-table-column>
          <el-table-column prop="swapFree" label="swapFree"></el-table-column>
          <el-table-column prop="dirty" label="dirty"></el-table-column>
          <el-table-column prop="writeback" label="writeback"></el-table-column>
          <el-table-column prop="anonPages" label="anonPages"></el-table-column>
          <el-table-column prop="mapped" label="mapped"></el-table-column>
          <el-table-column prop="shmem" label="shmem"></el-table-column>
          <el-table-column prop="slab" label="slab"></el-table-column>
          <el-table-column prop="sReclaimable" label="sReclaimable"></el-table-column>
          <el-table-column prop="sUnreclaim" label="sUnreclaim"></el-table-column>
          <el-table-column prop="kernelStack" label="kernelStack"></el-table-column>
          <el-table-column prop="pageTables" label="pageTables"></el-table-column>
          <el-table-column prop="nFsunstable" label="nFsunstable"></el-table-column>
          <el-table-column prop="bounce" label="bounce"></el-table-column>
          <el-table-column prop="writebackTmp" label="writebackTmp"></el-table-column>
          <el-table-column prop="commitLimit" label="commitLimit"></el-table-column>
          <el-table-column prop="committedAs" label="committedAs"></el-table-column>
          <el-table-column prop="vmallocTotal" label="vmallocTotal"></el-table-column>
          <el-table-column prop="vmallocUsed" label="vmallocUsed"></el-table-column>
          <el-table-column prop="vmallocChunk" label="vmallocChunk"></el-table-column>
          <el-table-column prop="hardwareCorrupted" label="hardwareCorrupted"></el-table-column>
          <el-table-column prop="anonHugePages" label="anonHugePages"></el-table-column>
          <el-table-column prop="hugePagesTotal" label="hugePagesTotal"></el-table-column>
          <el-table-column prop="hugePagesFree" label="hugePagesFree"></el-table-column>
          <el-table-column prop="hugePagesRsvd" label="hugePagesRsvd"></el-table-column>
          <el-table-column prop="hugePagesSurp" label="hugePagesSurp"></el-table-column>
          <el-table-column prop="hugePagesize" label="hugePagesize"></el-table-column>
          <el-table-column prop="directMap4k" label="directMap4k"></el-table-column>
          <el-table-column prop="directMap2m" label="directMap2m"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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
  import moment from 'moment'
  import {
    requestHostMemoryStatApi
  } from '@/api/monitor/host'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'hostMemoryStat',
    data() {
      return {
        searchKeyword: '',
        list: [],
        pageIndex: 1,
        pageSize: 12,
        total: 0
      }
    },
    mounted: function () {
      this.doRequestHostMemoryStat(this.pageIndex, this.pageSize)
    },
    methods: {
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        this.doRequestHostMemoryStat(this.pageIndex, this.pageSize)
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        this.doRequestHostMemoryStat(this.pageIndex, this.pageSize)
      },
      doRequestHostMemoryStat(pageIndex, pageSize){
        requestHostMemoryStatApi([],pageIndex - 1, pageSize).then((res) => {
          this.list = []
          if (res.meta.code === 200) {
            this.list = res.data.elements;
            this.pageIndex = res.data.index + 1;
            this.pageSize = res.data.size;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      onSearch: function (e) {
        var e = window.event || e;
        var keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode == 13 && this.searchKeyword) {

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
