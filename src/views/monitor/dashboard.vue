<template>
  <el-container>
    <div id="chartColumn" style="width: 100%; height: 400px;"></div>
  </el-container>
</template>
<script>
  import echarts from 'echarts';
  import {
    requestHostCpuStatApi
  } from '@/api/monitor/host';

  export default {
    name: 'HostDashboard',
    data() {
      return {
        xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yData: [820, 932, 901, 934, 1290, 1330, 1320],
      }
    },
    mounted: function () {
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.refreshEchart();
      var objThis = this;
      window.setInterval(() => {
        setTimeout(requestHostCpuStatApi(0, 0).then((res) => {
          if (res.meta.code === 200) {
            objThis.xData = []
            objThis.yData = []
            res.data.elements.forEach(function (item) {
              objThis.yData.push(item.guestNice);
              objThis.xData.push(item.createTime);
            });
            objThis.refreshEchart();
          } else {
            objThis.$message.error('参数错误')
          }
        }), 0)
      }, 3000)
    },
    methods: {
      doRequestHostCpuStat(pageIndex, pageSize, g){
        requestHostCpuStatApi(pageIndex - 1, pageSize).then((res) => {
          if (res.meta.code === 200) {
            res.data.elements.forEach(function (item) {
              g.yData.push(item.cpuCoreName);
              g.xData.push(item.createTime);
            });
            this.refreshEchart();
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      refreshEchart(){
        this.chartColumn.setOption({
          title: {text: 'cpu stat'},
          tooltip: {},
          xAxis: {
            type: 'category',
            data: this.xData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.yData,
            type: 'line'
          }]
        });
      }
    }

  }
</script>

<style>

</style>
