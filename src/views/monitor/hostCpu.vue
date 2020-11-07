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
          <el-table-column prop="processor" label="processor"></el-table-column>
          <el-table-column prop="vendorId" label="vendorId"></el-table-column>
          <el-table-column prop="cpuFamily" label="cpuFamily"></el-table-column>
          <el-table-column prop="model" label="model"></el-table-column>
          <el-table-column prop="modelName" label="modelName"></el-table-column>
          <el-table-column prop="stepping" label="stepping"></el-table-column>
          <el-table-column prop="microcode" label="microcode"></el-table-column>
          <el-table-column prop="cpuMhz" label="cpuMhz"></el-table-column>
          <el-table-column prop="cacheSize" label="cacheSize"></el-table-column>
          <el-table-column prop="physicalId" label="physicalId"></el-table-column>
          <el-table-column prop="siblings" label="siblings"></el-table-column>
          <el-table-column prop="coreId" label="coreId"></el-table-column>
          <el-table-column prop="cpuCores" label="cpuCores"></el-table-column>
          <el-table-column prop="apicid" label="apicid"></el-table-column>
          <el-table-column prop="initialApicid" label="initialApicid"></el-table-column>
          <el-table-column prop="fpu" label="fpu"></el-table-column>
          <el-table-column prop="fpuException" label="fpuException"></el-table-column>
          <el-table-column prop="cpuidLevel" label="cpuidLevel"></el-table-column>
          <el-table-column prop="wp" label="wp"></el-table-column>
          <el-table-column prop="flags" label="flags"></el-table-column>
          <el-table-column prop="bogomips" label="bogomips"></el-table-column>
          <el-table-column prop="clflushSize" label="clflushSize"></el-table-column>
          <el-table-column prop="cacheAlignment" label="cacheAlignment"></el-table-column>
          <el-table-column prop="addressSizes" label="addressSizes"></el-table-column>
          <el-table-column prop="powerManagement" label="powerManagement"></el-table-column>
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
    requestHostCpuApi
  } from '@/api/monitor/host'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'hostCpu',
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
      this.doRequestHostCpu(this.pageIndex, this.pageSize)
    },
    methods: {
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        this.doRequestHostCpu(this.pageIndex, this.pageSize)
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        this.doRequestHostCpu(this.pageIndex, this.pageSize)
      },
      doRequestHostCpu(pageIndex, pageSize){
        requestHostCpuApi([],pageIndex - 1, pageSize).then((res) => {
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
