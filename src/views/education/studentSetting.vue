<template>
  <el-container>
    <el-header>
      <el-select v-model="term" clearable placeholder="请选择学段" @change="onTermSelectChange">
        <el-option
          v-for="term in terms"
          :key="term.id"
          :label="term.zhcnName"
          :value="term.id">
        </el-option>
      </el-select>
      <el-select v-model="grade" clearable placeholder="请选择年级" @change="onGradeSelectChange">
        <el-option
          v-for="grade in grades"
          :key="grade.id"
          :label="grade.zhcnName"
          :value="grade.id">
        </el-option>
      </el-select>
      <el-select v-model="stage" clearable placeholder="请选择学期" @change="onStageSelectChange">
        <el-option
          v-for="stage in stages"
          :key="stage.id"
          :label="stage.zhcnName"
          :value="stage.id">
        </el-option>
      </el-select>
      <el-select v-model="course" clearable placeholder="请选择课程" @change="onCourseSelectChange">
        <el-option
          v-for="course in courses"
          :key="course.id"
          :label="course.name"
          :value="course.id">
        </el-option>
      </el-select>
      <el-select v-model="textbook" clearable placeholder="请选择教材" @change="onTextbooksSelectChange">
        <el-option
          v-for="textbook in textbooks"
          :key="textbook.id"
          :label="textbook.name"
          :value="textbook.id">
        </el-option>
      </el-select>
      <el-select v-model="article" clearable placeholder="请选择课文" @change="onArticlesSelectChange">
        <el-option
          v-for="article in articles"
          :key="article.id"
          :label="article.title"
          :value="article">
        </el-option>
      </el-select>
    </el-header>
    <el-main>
      <el-row>
        <!--<scroll class="middle-r"-->
                <!--ref="lyricList"-->
                <!--:data="article.text">-->
          <!--<div class="lyric-wrapper">-->
            <!--<div v-if="article">-->
              <!--<p ref="lyricLine"-->
                 <!--class="text"-->
                 <!--:class="{'current': 1 === index}"-->
                 <!--v-for="(line, index) in article.text"-->
                 <!--:key="line.time">{{article.text}}</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</scroll>-->
      </el-row>
      <el-row>
        <!--https://www.cnblogs.com/zhangwc/p/13182102.html-->
        <audio id="articleAudio"
               ref="audio"
               src="/audio/test.audio.mp3"
               controls="controls"
               preload
               hidden
               @pause="onAudioPause"
               @play="onAudioPlay"
               @timeupdate="onTimeUpdate"
               @loadedmetadata="onLoadedMetadata">
        </audio>
        <el-col :span="2">
          <el-button type="primary" round @click="onAudioPlayOrPause">{{audio.playing | transPlayStatus}}</el-button>
        </el-col>
        <el-col :span="2">
          <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag>
        </el-col>
        <el-col :span="14">
          <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" class="slider"></el-slider>
        </el-col>
        <el-col :span="2">
          <el-tag type="info">{{ audio.maxTime | formatSecond}}</el-tag>
        </el-col>
        <el-col :span="4">
        <!--<div class="block">-->
        <!--<el-slider-->
        <!--v-model="videoVoice"-->
        <!--vertical-->
        <!--height="100px">-->
        <!--</el-slider>-->
        <!--</div>-->
        </el-col>
      </el-row>
    </el-main>


  </el-container>
</template>
<script>
//  import VueAudio from '../../components/Audio/Audio'
  import {
    requestTermsApi,
    requestGradesApi,
    requestStagesApi,
    requestCoursesApi,
    requestTextbooksApi,
    requestArticlesApi
  } from '@/api/education/setting'

  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
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
    name: 'studentSetting',
//    components: {
//      Audio
//    },
    data() {
      return {
        pid: 0,
        terms: [],
        grades: [],
        stages: [],
        courses: [],
        textbooks: [],
        articles: [],
        term: '',
        grade: '',
        stage: '',
        course: '',
        textbook: '',
        article: '',
        videoProgress: '',
        videoVoice: '',
        audio: {
          playing: false,
          // 音频当前播放时长
          currentTime: 0,
          // 音频最大播放时长
          maxTime: 0
        }
      }
    },
    mounted: function () {
      this.requestForTerms()
    },
    methods: {
      onTermSelectChange(item){
        this.grades = []
        this.grade = ''
        this.stages = []
        this.stage = ''
        this.courses = []
        this.course = ''
        this.textbooks = []
        this.textbook = ''
        this.articles = []
        this.article = ''
        this.requestForGrades(item)
      },
      onGradeSelectChange(item){
        this.stages = []
        this.stage = ''
        this.courses = []
        this.course = ''
        this.textbooks = []
        this.textbook = ''
        this.articles = []
        this.article = ''
        this.requestForStages(item)
      },
      onStageSelectChange(item){
        this.courses = []
        this.course = ''
        this.textbooks = []
        this.textbook = ''
        this.articles = []
        this.article = ''
        this.requestForCourses(item)
      },
      onCourseSelectChange(item){
        this.textbooks = []
        this.textbook = ''
        this.articles = []
        this.article = ''
        this.requestForTextbooks(this.stage, item)
      },
      onTextbooksSelectChange(item){
        this.articles = []
        this.article = ''
        this.requestForArticles(item)
      },
      onArticlesSelectChange(item){
        console.log(this.article)
        this.onAudioPlayOrPause()
      },
      // 当音频播放
      onAudioPlay () {
        this.audio.playing = true
      },
      // 当音频暂停
      onAudioPause () {
        this.audio.playing = false
      },
      // 播放音频
      audioPlay () {
        this.$refs.audio.play()
      },
      // 暂停音频
      audioPause () {
        this.$refs.audio.pause()
      },
      onAudioPlayOrPause() {
        return this.audio.playing ? this.audioPause() : this.audioPlay()
//        var articleAudio = document.getElementById('articleAudio');
//        if (articleAudio !== null) {
//          articleAudio.currentTime = 0;
//          if (articleAudio.paused) {
//            articleAudio.play();
//          } else {
//            articleAudio.pause();
//            articleAudio.load();
//          }
//        }
      },
      onTimeUpdate(res) {
        console.log('timeupdate')
        console.log(res)
        this.audio.currentTime = res.target.currentTime
      },
// 当加载语音流元数据完成后，会触发该事件的回调函数
// 语音元数据主要是语音的长度之类的数据
      onLoadedMetadata(res) {
        console.log('loadedmetadata')
        console.log(res)
        this.audio.maxTime = parseInt(res.target.duration)
      },
      // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
      changeCurrentTime(index) {
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
// 当音频当前时间改变后，进度条也要改变
      onTimeupdate(res) {
        console.log('timeupdate')
        console.log(res)
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
      },

// 进度条格式化toolTip
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      requestForTerms(){
        requestTermsApi().then((res) => {
          if (res.meta.code === 200) {
            this.terms = res.data.elements;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      requestForGrades(pid){
        requestGradesApi(pid).then((res) => {
          if (res.meta.code === 200) {
            this.grades = res.data.elements;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      requestForStages(pid){
        requestStagesApi(pid).then((res) => {
          if (res.meta.code === 200) {
            this.stages = res.data.elements;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      requestForCourses(tid){
        requestCoursesApi(tid).then((res) => {
          if (res.meta.code === 200) {
            this.courses = res.data.elements;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      requestForTextbooks(tid, cid){
        requestTextbooksApi(tid, cid).then((res) => {
          if (res.meta.code === 200) {
            this.textbooks = res.data.elements;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      requestForArticles(pid){
        requestArticlesApi(pid).then((res) => {
          if (res.meta.code === 200) {
            this.articles = res.data.elements;
          } else {
            this.$message.error('参数错误')
          }
        })
      }
    },
    filters: {
      // 使用组件过滤器来动态改变按钮的显示
      transPlayStatus(value) {
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
