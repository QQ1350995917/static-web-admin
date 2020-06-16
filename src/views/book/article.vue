<template>
  <el-container>
    <el-header>
      <el-row style="margin-top: 10px;">
        <el-col :span="22" style="padding-right: 10px">
          <div>
            <el-input
              @keyup.enter.native="onArticleSearch()"
              placeholder="Please input"
              v-model="searchKeyword" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button @click="openEditBookView(-1,{})" type="primary" style="width: 100%">新增章节</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <template v-if="this.bookId">
        <div style="width: 100%;">
          <table style="margin: 0 auto"  rules=rows>
            <tr>
              <td rowspan="2">
                <img style="width: 100px; height: 100px" :src="book.url">
              </td>
              <td>
                图书名称
              </td>
              <td>
                {{book.title}}
              </td>
            </tr>
            <tr>
              <td>图书评分</td>
              <td>
                <el-rate
                  v-model="book.rate"
                  :colors="colors">
                </el-rate>
              </td>
            </tr>
          </table>
        </div>
      </template>
      <template>
        <el-table
          :data="bookTables"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="title"
            label="章节名"
            width="320">
            <template slot-scope="scope">
              <router-link :to="{path:'articleDetail',query:{articleId:scope.row.id}}">
                <div>
                  <span>{{scope.row.title}}</span>
                </div>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="subTitle"
            label="副题"
            width="160" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <router-link :to="{path:'articleDetail',query:{articleId:scope.row.id}}">
                <div>
                  <span>{{scope.row.subTitle}}</span>
                </div>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="authorName"
            label="作者"
            width="120" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="publisher"
            label="出版社"
            width="120">
          </el-table-column>
          <el-table-column
            prop="publicationTime"
            label="出版时间"
            width="120">
          </el-table-column>
          <el-table-column
            prop="summary"
            label="简介" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
              <el-button @click="doRequestVisibleBookTables(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.visibility == -1">取消隐藏
              </el-button>
              <el-button @click="doRequestVisibleCancelBookTables(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.visibility == null || scope.row.visibility == 1">隐藏
              </el-button>
              <el-button @click="doRequestDeleteBookTables(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.delStatus == null || scope.row.delStatus == -1">删除
              </el-button>
              <el-button @click="doRequestDeleteCancelBookTables(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.delStatus == 1">取消删除
              </el-button>
              <el-button @click="openEditBookView(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog
        title="提示"
        :visible.sync="editBookViewDialogVisible"
        width="30%"
        :before-close="closeEditBookView">
        <template>
          <el-input v-show="false" v-model="currentEditBookTable.id">
          </el-input>
          <el-input placeholder="请输入章节名称" required v-model="currentEditBookTable.title" clearable>
            <template slot="prepend">章节名</template>
          </el-input>
          <el-input placeholder="请输入副标题" v-model="currentEditBookTable.subTitle" clearable>
            <template slot="prepend">副标题</template>
          </el-input>
          <el-input placeholder="请输入作者" v-model="currentEditBookTable.authorName" clearable>
            <template slot="prepend">作者</template>
          </el-input>
          <el-input placeholder="请输入出版社" v-model="currentEditBookTable.publisher" clearable>
            <template slot="prepend">出版社</template>
          </el-input>
          <el-date-picker v-model="currentEditBookTable.publicationTime" type="date" placeholder="请选择出版时间" clearable>
          </el-date-picker>
          <el-input placeholder="请输入简介" type="textarea" maxlength="256" show-word-limit :rows="5"
                    v-model="currentEditBookTable.summary" clearable>
            <template slot="prepend">简介</template>
          </el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeEditBookView()">取 消</el-button>
          <el-button type="primary" @click="commitEditBookView()">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[12, 24, 48, 120]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-footer>
  </el-container>
</template>
<script>
  import {
    requestBookApi,
    requestBookTablesApi,
  } from '@/api/book/book';
  import {
    requestArticlesApi,
    requestCreateArticleApi,
    requestUpdateArticleApi,
    requestVisibleArticlesApi,
    requestVisibleCancelArticlesApi,
    requestDeleteArticlesApi,
    requestDeleteCancelArticlesApi,
  } from '@/api/book/article';
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'book',
    data() {
      return {
        bookId: this.$route.query.bookId,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        book: {
          url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          rate: 3.5,
        },
        searchKeyword: '',
        bookTables: [],
        bookTableIds: [],
        pageIndex: 1,
        pageSize: 12,
        total: 0,
        editBookViewDialogVisible: false,
        currentEditBookTable: {}
      }
    },
    mounted: function () {
      if (this.bookId) {
        this.doRequestBook(this.bookId)
        this.doRequestBookTables(this.bookId, this.pageIndex, this.pageSize)
      } else {
        this.doRequestArticles(this.pageIndex, this.pageSize)
      }
    },
    methods: {
      onArticleSearch(){
        var e = window.event || e;
        var keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode == 13 && this.searchKeyword) {
          this.$router.push({path: '/book/search?type=article&keyword=' + this.searchKeyword});
        }
      },
      openEditBookView(index, editBookTable){
        if (index == -1) {
          this.$set(this.currentEditBookTable, "bookId", this.bookId)
          this.$set(this.currentEditBookTable, "title", "")
          this.$set(this.currentEditBookTable, "subTitle", "")
          this.$set(this.currentEditBookTable, "authorName", "")
          this.$set(this.currentEditBookTable, "publisher", "")
          this.$set(this.currentEditBookTable, "publicationTime", "")
          this.$set(this.currentEditBookTable, "summary", "")
        } else {
          this.currentEditBookTable = JSON.parse(JSON.stringify(editBookTable))
        }
        this.$set(this.currentEditBookTable, "_index", index)
        this.editBookViewDialogVisible = true
      },
      closeEditBookView() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.editBookViewDialogVisible = false
          })
          .catch(_ => {
          });
      },
      commitEditBookView(){
        if (this.currentEditBookTable._index == -1) {
          this.doRequestCreateBookTable()
        } else {
          this.doRequestUpdateBookTable()
        }
      },
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        if (this.bookId) {
          this.doRequestBook(this.bookId)
          this.doRequestBookTables(this.bookId, this.pageIndex, this.pageSize)
        } else {
          this.doRequestArticles(this.pageIndex, this.pageSize)
        }
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        if (this.bookId) {
          this.doRequestBookTables(this.bookId, this.pageIndex, this.pageSize)
        } else {
          this.doRequestArticles(this.pageIndex, this.pageSize)
        }
      },
      doRequestBook(bookId){
        requestBookApi(bookId).then((res) => {
          if (res.meta.code === 200) {
            this.book = res.data;
            this.$set(this.book, "url", "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg")
            this.$set(this.book, "rate", "3.5")
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestBookTables(bookId, pageIndex, pageSize){
        requestBookTablesApi(bookId, pageIndex - 1, pageSize).then((res) => {
          this.bookTables = []
          if (res.meta.code === 200) {
            this.bookTables = res.data.elements;
            this.pageIndex = res.data.index + 1;
            this.pageSize = res.data.size;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestArticles(pageIndex, pageSize){
        requestArticlesApi(pageIndex - 1, pageSize).then((res) => {
          this.bookTables = []
          if (res.meta.code === 200) {
            this.bookTables = res.data.elements;
            this.pageIndex = res.data.index + 1;
            this.pageSize = res.data.size;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestCreateBookTable(){
        requestCreateArticleApi(this.currentEditBookTable).then((res) => {
          if (res.meta.code === 200) {
            this.editBookViewDialogVisible = false;
            this.$message({
              message: '新增' + res.data + '行',
              type: 'success'
            });
            this.currentEditBookTable = {};
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestUpdateBookTable(){
        requestUpdateArticleApi(this.currentEditBookTable.id, this.currentEditBookTable).then((res) => {
          if (res.meta.code === 200) {
            this.editBookViewDialogVisible = false;
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.bookTables[this.currentEditBookTable._index] = this.currentEditBookTable;
            this.currentEditBookTable = {};
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestVisibleBookTables(index, id){
        this.bookTableIds.push(id);
        requestVisibleArticlesApi(this.bookTableIds).then((res) => {
          this.bookTableIds = []
          if (res.meta.code === 200) {
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.bookTables[index].visibility = 1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestVisibleCancelBookTables(index, id){
        this.bookTableIds.push(id);
        requestVisibleCancelArticlesApi(this.bookTableIds).then((res) => {
          this.bookTableIds = []
          if (res.meta.code === 200) {
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.bookTables[index].visibility = -1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestDeleteBookTables(index, id){
        this.bookTableIds.push(id);
        requestDeleteArticlesApi(this.bookTableIds).then((res) => {
          this.bookTableIds = []
          if (res.meta.code === 200) {
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.bookTables[index].delStatus = -1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestDeleteCancelBookTables(index, id){
        this.bookTableIds.push(id);
        requestDeleteCancelArticlesApi(this.bookTableIds).then((res) => {
          this.bookTableIds = []
          if (res.meta.code === 200) {
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.bookTables[index].delStatus = 1;
            this.currentEditBook = {};
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
</style>
