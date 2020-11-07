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
          <el-table-column prop="majorDeviceNumber" label="majorDeviceNumber"></el-table-column>
          <el-table-column prop="minorDeviceNumber" label="minorDeviceNumber"></el-table-column>
          <el-table-column prop="deviceName" label="deviceName"></el-table-column>
          <el-table-column prop="read" label="read"></el-table-column>
          <el-table-column prop="readMerge" label="readMerge"></el-table-column>
          <el-table-column prop="readSector" label="readSector"></el-table-column>
          <el-table-column prop="readSpentMilliseconds" label="readSpentMilliseconds"></el-table-column>
          <el-table-column prop="write" label="write"></el-table-column>
          <el-table-column prop="writeMerge" label="writeMerge"></el-table-column>
          <el-table-column prop="writeSector" label="writeSector"></el-table-column>
          <el-table-column prop="writeSpentMilliseconds" label="writeSpentMilliseconds"></el-table-column>
          <el-table-column prop="ioRequest" label="ioRequest"></el-table-column>
          <el-table-column prop="ioSpentMilliseconds" label="ioSpentMilliseconds"></el-table-column>
          <el-table-column prop="ioSpentAllMilliseconds" label="ioSpentAllMilliseconds"></el-table-column>
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
    requestHostDiskStatApi
  } from '@/api/monitor/host'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'hostDiskStat',
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
      this.doRequestHostDiskStat(this.pageIndex, this.pageSize)
    },
    methods: {
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        this.doRequestHostDiskStat(this.pageIndex, this.pageSize)
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        this.doRequestHostDiskStat(this.pageIndex, this.pageSize)
      },
      doRequestHostDiskStat(pageIndex, pageSize){
        requestHostDiskStatApi([],pageIndex - 1, pageSize).then((res) => {
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
