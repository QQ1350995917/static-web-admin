<template>
  <el-container>
    <div id="hostStatistics" style="width: 100%; height: 400px;"></div>
  </el-container>
</template>
<script>
  import echarts from 'echarts';
  import {
    formatDate
  } from '@/utils/date.js'

  import {
    requestHostApi
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
      this.chartColumn = echarts.init(document.getElementById('hostStatistics'));
      this.doRequestHost(GPointer)
      this.refreshHostCpuEChart();
      window.setInterval(() => {
        setTimeout(GPointer.doRequestHost(GPointer), 0)
      }, 5000)
    },
    methods: {
      doRequestHost(GPointer){
        requestHostApi([], 0, 200000).then((res) => {
          if (res.meta.code === 200) {
            GPointer.yData = []
            res.data.elements.forEach(function (item) {
              GPointer.yData.push({
                name: item.groupName,
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: [{
                  name: item.nodeName,
                  value: 1
                }],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
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
            text: '主机分组数据统计',
            subtext: 'xxx',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: this.yData
        };

        this.chartColumn.setOption(option);
      }
    }
  }
</script>

<style>

</style>
