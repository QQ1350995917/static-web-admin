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
        lData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            objThis.lData = []
            objThis.yData = []
            res.data.forEach(function (item) {
              objThis.lData.push(item.cpuCoreName);
              item.cpuStats.forEach(function (cpuStat) {
                objThis.xData.push(cpuStat.createTime);
              })
              objThis.yData.push(item.guestNice);
            });
            objThis.refreshEchart();
          } else {
            objThis.$message.error('参数错误')
          }
        }), 0)
      }, 3000)
    },
    methods: {
      refreshEchart(){
        var option = {
          title: {
            text: '折线图堆叠'
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
//          series: this.yData
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };

        this.chartColumn.setOption(option);
      }
    }

  }
</script>

<style>

</style>
