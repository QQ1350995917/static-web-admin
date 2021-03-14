<template>
  <!--https://www.cnblogs.com/zhangwc/p/13182102.html-->
  <el-row>
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio ref="audio"
           @pause="onPause"
           @play="onPlay"
           @timeupdate="onTimeupdate"
           @loadedmetadata="onLoadedmetadata"
           src="" controls="controls" hidden></audio>
    <el-col :span="2">
      <el-button type="text" @click="startPlayOrPause">{{audio.playing | transPlayPause}}</el-button>
    </el-col>
    <el-col :span="2">
      <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag>
    </el-col>
    <el-col :span="18">
      <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime"
                 class="slider"></el-slider>
    </el-col>
    <el-col :span="2">
      <el-tag type="info">{{ audio.maxTime | formatSecond}}</el-tag>
    </el-col>
    <!--<el-col :span="0"><a :href="url" v-show="!controlList.noDownload" target="_blank" class="download" download>下载</a></el-col>-->
  </el-row>
</template>
<script>
  // 将整数转换成 时：分：秒的格式
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
      return '0:00:00'
    }
  }

  export default {
    data () {
      return {
        audio: {
          // 该字段是音频是否处于播放状态的属性
          playing: false,
          // 音频当前播放时长
          currentTime: 0,
          // 音频最大播放时长
          maxTime: 0
        },
        sliderTime: [],
        controlList: {
          // 不显示下载
          noDownload: false,
          // 不显示静音
          noMuted: false,
          // 不显示音量条
          noVolume: false,
          // 不显示进度条
          noProcess: false,
          // 只能播放一个
          onlyOnePlaying: false,
          // 不要快进按钮
          noSpeed: false
        }
      }
    },
    methods: {
      // 控制音频的播放与暂停
      startPlayOrPause () {
        return this.audio.playing ? this.pause() : this.play()
      },
      // 播放音频
      play () {
        this.$refs.audio.play()
      },
      // 暂停音频
      pause () {
        this.$refs.audio.pause()
      },
      // 当音频播放
      onPlay () {
        this.audio.playing = true
      },
      // 当音频暂停
      onPause () {
        this.audio.playing = false
      },
      // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
      onTimeupdate(res) {
        console.log('timeupdate')
        console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },
      // 当加载语音流元数据完成后，会触发该事件的回调函数
      // 语音元数据主要是语音的长度之类的数据
      onLoadedmetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.maxTime = parseInt(res.target.duration)
      },
      // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },

      // 进度条格式化toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      setControlList () {
        let controlList = this.theControlList.split(' ')
        controlList.forEach((item) => {
          if (this.controlList[item] !== undefined) {
            this.controlList[item] = true
          }
        })
      },
    },
    filters: {
      // 使用组件过滤器来动态改变按钮的显示
      transPlayPause(value) {
        return value ? '暂停' : '播放'
      },
      // 将整数转化成时分秒
      formatSecond(second = 0) {
        return realFormatSecond(second)
      }
    }
  }
</script>

<style>

</style>
