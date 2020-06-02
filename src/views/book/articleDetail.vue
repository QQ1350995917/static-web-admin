<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <span>{{article.title}}</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6" v-for="paragraph in article.paragraphs" v-bind:key="paragraph.id" >
          <span>{{paragraph}}</span>
          <p><span> </span></p>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import {articleDetailApi} from '@/api/book/article'
  export default {
    name: 'articleDetail',
    data() {
      return {
        articleId: this.$route.query.articleId,
        article: null
      }
    },
    mounted: function () {
      this.doArticleDetail(this.articleId)
    },
    methods: {
      doArticleDetail(articleId){
        articleDetailApi(articleId).then((res) => {
          if (res.meta.code === 200) {
            this.article = res.data;
          } else {
            this.$message.error('参数错误')
          }
        });
      }
    }
  }
</script>
