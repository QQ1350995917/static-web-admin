<template>
  <el-container>
    <div id="hostMemoryStat" style="width: 100%; height: 400px;"></div>
  </el-container>
</template>
<script>
  import echarts from 'echarts';
  import {
    formatDate
  } from '@/utils/date.js'

  import {
    requestHostMemoryStatApi
  } from '@/api/monitor/host';

  export default {
    name: 'HostMemoryDashboard',
    data() {
      return {
        xData: [],
        lData: [],
        yData: [],
      }
    },
    mounted: function () {
      var GPointer = this;
      this.doRequestHostMemoryStat(GPointer)
      this.chartColumn = echarts.init(document.getElementById('hostMemoryStat'));
      this.refreshHostMemoryStatEChart();
      window.setInterval(() => {
        setTimeout(GPointer.doRequestHostMemoryStat(GPointer), 0)
      }, 5000)
    },
    methods: {
      doRequestHostMemoryStat(GPointer){
        requestHostMemoryStatApi([],0, 12).then((res) => {
          if (res.meta.code === 200) {
            GPointer.lData = []
            GPointer.yData = []
            GPointer.xData = []
            GPointer.refreshHostMemoryXData(GPointer, res.data.elements)
            GPointer.refreshHostMemoryAttribute(GPointer, res.data.elements, 'memTotal', 'rgb(190,190,190)',0)
            GPointer.refreshHostMemoryAttribute(GPointer, res.data.elements, 'memAvailable', 'rgb(28,28,28)',0)
            GPointer.refreshHostMemoryAttribute(GPointer, res.data.elements, 'memFree', 'rgb(46,139,87)',1)
            GPointer.refreshHostMemoryStatEChart();
          } else {
            GPointer.$message.error('参数错误')
          }
        })
      },
      refreshHostMemoryXData(GPointer, elements){
        elements.forEach(function (item) {
          GPointer.xData.unshift(formatDate(new Date(item.createTime), 'mm:ss'))
        });
      },
      refreshHostMemoryAttribute(GPointer, elements, attribute, color,yAxisIndex){
        GPointer.lData.push(attribute);
        var temp = []
        elements.forEach(function (item) {
          temp.unshift(item[attribute])
        });
        GPointer.yData.push({
          name: attribute,
          type: 'line',
          yAxisIndex: yAxisIndex,
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
      refreshHostMemoryStatEChart(){
        var option = {
          title: {
            text: 'Memory Stat'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {onZero: false},
            data: this.xData
          }],
          yAxis: [
            {
              name: 'memTotal',
              type: 'value',
              boundaryGap: [0, '100%'],
              areaStyle: {},
              inverse: true
//           splitLine: {
//             show: true
//           },
//           splitArea: {
//             show: false
//           }
            },
            {
              name: 'memFree',
              type: 'value',
              areaStyle: {},
              boundaryGap: [0, '100%'],
              inverse: false
//           splitLine: {
//             show: true
//           },
//           splitArea: {
//             show: false
//           }
            },
            {
              name: 'memAvailable',
              type: 'value',
              areaStyle: {},
              boundaryGap: [0, '100%'],
              inverse: true,
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
