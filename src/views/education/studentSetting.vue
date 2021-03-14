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
      </el-row>
      <el-row>
        <div v-for="item in audios" :key="item.url">
          <Audio :theUrl="item.url" :theControlList="item.controlList"/>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import Audio from '../../components/Audio/Audio'

  import {
    requestTermsApi,
    requestGradesApi,
    requestStagesApi,
    requestCoursesApi,
    requestTextbooksApi,
    requestArticlesApi
  } from '@/api/education/setting'

  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";

  export default {
    name: 'studentSetting',
    components: {
      Audio
    },
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
        audios: [
          {
//            url: '/audio/test.audo.mp3',
            url: 'http://www.0dutv.com/plug/down/up2.php/210349332.mp3',
            controlList: 'onlyOnePlaying'
          },
          {
            url: 'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3',
            controlList: 'noDownload noMuted onlyOnePlaying'
          },
//          {
//            url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
//            controlList: 'noDownload noVolume noMuted onlyOnePlaying'
//          },
//          {
//            url: 'http://devtest.qiniudn.com/Preparation.mp3',
//            controlList: 'noDownload noSpeed onlyOnePlaying'
//          }
        ]
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
