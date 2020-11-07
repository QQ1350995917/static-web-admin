<template>
  <el-container>
    <div id="hostCpuStatStatistics" style="width: 100%; height: 400px;"></div>
  </el-container>
</template>
<script>
  import echarts from 'echarts';
  import {
    formatDate
  } from '@/utils/date.js'

  import {
    requestHostCpuStatStatisticsApi
  } from '@/api/monitor/host';

  export default {
    name: 'DashboardHostCpuStat',
    data() {
      return {
        xData: [],
        lData: [],
        yData: [],
      }
    },
    mounted: function () {
      var GPointer = this;
      this.chartColumn = echarts.init(document.getElementById('hostCpuStatStatistics'));
      this.doRequestCpuStat(GPointer)
      this.refreshHostCpuEChart();
      window.setInterval(() => {
        setTimeout(GPointer.doRequestCpuStat(GPointer), 0)
      }, 5000)
    },
    methods: {
      doRequestCpuStat(GPointer){
        requestHostCpuStatStatisticsApi('test-group', 'test-nodename', 60).then((res) => {
          if (res.meta.code === 200) {
            GPointer.lData = []
            GPointer.yData = []
            res.data.forEach(function (item) {
              GPointer.lData.push('Core' + item.cpuCoreName);
              GPointer.xData = []
              var temp = []
              item.cpuStats.forEach(function (cpuStat) {
                GPointer.xData.unshift(formatDate(new Date(cpuStat.createTime), 'hh:mm:ss'))
                temp.unshift(cpuStat.guestNice)
              })
              GPointer.yData.push({
                name: 'Core' + item.cpuCoreName,
                type: 'line',
                stack: '总量',
                data: temp
              });
            });
            GPointer.refreshHostCpuEChart();
          } else {
            GPointer.$message.error('参数错误')
          }
        })
      },
      refreshHostCpuEChart(){
        var option = {
          title: {
            text: 'CPU CORE STAT'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.lData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xData
          },
          yAxis: {
            type: 'value'
          },
          series: this.yData
        }
        this.chartColumn.setOption(option);
      }
    }
  }
</script>

<style>

</style>
