<template>
  <el-container>
    <div id="hostLoadStat" style="width: 100%; height: 400px;"></div>
  </el-container>
</template>
<script>
  import echarts from 'echarts';
  import {
    formatDate
  } from '@/utils/date.js'

  import {
    requestHostLoadStatApi
  } from '@/api/monitor/host';

  export default {
    name: 'HostLoadDashboard',
    data() {
      return {
        xData: [],
        lData: [],
        yData: [],
      }
    },
    mounted: function () {
      var GPointer = this;
      this.doRequestHostLoadStat(GPointer)
      this.chartColumn = echarts.init(document.getElementById('hostLoadStat'));
      this.refreshHostLoadStatEChart();
      window.setInterval(() => {
        setTimeout(GPointer.doRequestHostLoadStat(GPointer), 0)
      }, 5000)
    },
    methods: {
      doRequestHostLoadStat(GPointer){
        requestHostLoadStatApi([], 0, 12).then((res) => {
          if (res.meta.code === 200) {
            GPointer.lData = []
            GPointer.yData = []
            GPointer.xData = []
            GPointer.refreshHostLoadXData(GPointer, res.data.elements)
            GPointer.refreshHostLoadAttribute(GPointer, res.data.elements, 'loadIn1m', 'rgb(190,190,190)')
            GPointer.refreshHostLoadAttribute(GPointer, res.data.elements, 'loadIn5m', 'rgb(28,28,28)')
            GPointer.refreshHostLoadAttribute(GPointer, res.data.elements, 'loadIn15m', 'rgb(46,139,87)')
            GPointer.refreshHostLoadStatEChart();
          } else {
            GPointer.$message.error('参数错误')
          }
        })
      },
      refreshHostLoadXData(GPointer, elements){
        elements.forEach(function (item) {
          GPointer.xData.unshift(formatDate(new Date(item.createTime), 'mm:ss'))
        });
      },
      refreshHostLoadAttribute(GPointer, elements, attribute, color, yAxisIndex){
        GPointer.lData.push(attribute);
        var temp = []
        elements.forEach(function (item) {
          temp.unshift(item[attribute])
        });
        GPointer.yData.push({
          name: attribute,
          type: 'bar',
          showSymbol: false,
          hoverAnimation: false,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color
            }, {
              offset: 1,
              color: color
            }])
          },
          itemStyle: {
            normal: {
              color: color, //改变折线点的颜色
              lineStyle: {
                color: color //改变折线颜色
              }
            }
          },
          data: temp
        });
      },
      refreshHostLoadStatEChart(){
        var option = {
          title: {
            text: 'Load Stat'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: {onZero: false},
            data: this.xData
          }],
          yAxis: [
            {
              name: 'memTotal',
              type: 'value',
              boundaryGap: [0, '100%'],
              areaStyle: {},
//           splitLine: {
//             show: true
//           },
//           splitArea: {
//             show: false
//           }
            }
          ],
          series: this.yData
        };

        this.chartColumn.setOption(option);
      }
    }
  }
</script>

<style>

</style>
