<template>
  <el-container>
    <el-header>
      <div style="margin-top: 10px;">
        <el-input
          @keyup.enter.native="onSearch()"
          placeholder="Please input"
          v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col
          :xs="{span:24,offset:0}" :sm="{span:24,offset:0}" :md="{span:24,offset:0}"
          v-for="searchItem in searchResult" v-bind:key="searchItem.id">
          <h3>
            <router-link  v-if="searchItem.esIndex == 'article'" :to="{path:'/book/articleDetail',query:{articleId:searchItem.esId}}">
              <span style="color: #0000ff;" class="text item book" v-html="searchItem.esTitle"></span>
              -
              <span> 文章</span>
            </router-link>
            <router-link  v-if="searchItem.esIndex == 'book'" :to="{path:'/book/article',query:{bookId:searchItem.esId}}">
              <span style="color: #0000ff;" class="text item book" v-html="searchItem.esTitle"></span>
              -
              <span> 图书</span>
            </router-link>
          </h3>
          <span v-html="content" v-for="content in searchItem.esContent"></span>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
  import {search, searchBook, searchArticle} from '@/api/book/search'
  import moment from 'moment'
  export default {
    name: 'Search',
    data () {
      return {
        searchType: this.$route.query.type,
        input: this.$route.query.keyword,
        searchResult: [],
        index: 1,
        size: 12,
        total: 0
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        if (this.input) {
            console.log(this.searchType)
            if (this.searchType === 'book') {
              this.doSearchBook(this.input, this.index, this.size)
            } else if (this.searchType === 'article') {
              this.doSearchArticle(this.input, this.index, this.size)
            } else {
              this.doSearch(this.input, this.index, this.size)
            }
        }
      })
    },
    methods: {
      onSearch: function (e) {
        var e = window.event || e;
        var keyCode = e.keyCode || e.which || e.charCode;
        if (this.input) {
          if (this.searchTypesearchType === 'book') {
            this.doSearchBook(this.input, this.index, this.size)
          } else if (this.searchType === 'article') {
            this.doSearchArticle(this.input, this.index, this.size)
          } else {
            this.doSearch(this.input, this.index, this.size)
          }
        }
      },
      doSearch: function (keyword, index, size) {
        search(keyword, index - 1, size).then((res) => {
          this.searchResult = []
          if (res.meta.code === 200) {
            this.searchResult = res.data.elements;
            this.index = res.data.index + 1;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doSearchBook: function (keyword, index, size) {
        searchBook(keyword, index - 1, size).then((res) => {
          this.searchResult = []
          if (res.meta.code === 200) {
            this.searchResult = res.data.elements;
            this.index = res.data.index + 1;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doSearchArticle: function (keyword, index, size) {
        searchArticle(keyword, index - 1, size).then((res) => {
          this.searchResult = []
          if (res.meta.code === 200) {
            this.searchResult = res.data.elements;
            this.index = res.data.index + 1;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      handleClick: function () {
      },
      dateFormat(date) {
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      handleCurrentChange: function (currentPage) {
        this.index = currentPage;
        if (this.input) {
          if (this.searchType === 'book') {
            this.doSearchBook(this.input, this.index, this.size)
          } else if (this.searchType === 'article') {
            this.doSearchArticle(this.input, this.index, this.size)
          } else {
            this.doSearch(this.input, this.index, this.size)
          }
        }
      },
    }
  }
</script>


<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .book {
    width: 100%;
    height: 100px;
  }
</style>
