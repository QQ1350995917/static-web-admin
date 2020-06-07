<template>
  <el-container>
    <el-header>
      <el-row style="margin-top: 10px;">
        <el-col :span="22" style="padding-right: 10px">
          <div>
            <el-input
              @keyup.enter.native="onSearch()"
              placeholder="Please input"
              v-model="searchKeyword" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button @click="openEditView(-1,'')" type="primary" style="width: 100%">新增图书</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <template>
        <el-table
          :data="books"
          stripe
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="title"
            label="书名"
            width="180">
            <template slot-scope="scope">
              <router-link :to="{path:'bookDetail',query:{bookId:scope.row.id}}">
                <div>
                  <span>{{scope.row.title}}</span>
                </div>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="subTitle"
            label="副题"
            width="180">
            <template slot-scope="scope">
              <router-link :to="{path:'bookDetail',query:{bookId:scope.row.id}}">
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
            prop="type"
            label="类别"
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
              <el-button @click="doRequestRecommendBooks(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.recommend == null || scope.row.recommend == -1">推荐
              </el-button>
              <el-button @click="doRequestRecommendCancelBooks(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.recommend == 1">取消推荐
              </el-button>
              <el-button @click="doRequestVisibleBooks(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.visibility == -1">取消隐藏
              </el-button>
              <el-button @click="doRequestVisibleCancelBooks(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.visibility == null || scope.row.visibility == 1">隐藏
              </el-button>
              <el-button @click="doRequestDeleteBooks(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.delStatus == null || scope.row.delStatus == -1">删除
              </el-button>
              <el-button @click="doRequestDeleteCancelBooks(scope.$index,scope.row.id)" type="text" size="small"
                         v-if="scope.row.delStatus == 1">取消删除
              </el-button>
              <el-button @click="openEditView(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog
        title="提示"
        :visible.sync="editViewDialogVisible"
        width="30%"
        :before-close="closeEditView">
        <template>
          <el-input v-show="false" v-model="currentEditBook.id">
          </el-input>
          <el-input placeholder="请输入图书名称" required v-model="currentEditBook.title" clearable>
            <template slot="prepend">书名</template>
          </el-input>
          <el-input placeholder="请输入副标题" v-model="currentEditBook.subTitle" clearable>
            <template slot="prepend">副标题</template>
          </el-input>
          <el-input placeholder="请输入作者" v-model="currentEditBook.authorName" clearable>
            <template slot="prepend">作者</template>
          </el-input>
          <el-input placeholder="请输入出版社" v-model="currentEditBook.publisher" clearable>
            <template slot="prepend">出版社</template>
          </el-input>
          <el-date-picker style="width: 50%;"
                          v-model="currentEditBook.publicationTime"
                          type="date"
                          placeholder="请选择出版时间" clearable>
          </el-date-picker>
          <el-select filterable v-model="currentEditBook.type" placeholder="请选择种类" style="float: right;" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-input placeholder="请输入简介" type="textarea" maxlength="256" show-word-limit :rows="5"
                    v-model="currentEditBook.summary" clearable>
            <template slot="prepend">简介</template>
          </el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeEditView()">取 消</el-button>
          <el-button type="primary" @click="commitEditView()">确 定</el-button>
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
    requestBooksApi,
    requestCreateBookApi,
    requestUpdateBookApi,
    requestRecommendBooksApi,
    requestRecommendCancelBooksApi,
    requestVisibleBooksApi,
    requestVisibleCancelBooksApi,
    requestDeleteBooksApi,
    requestDeleteCancelBooksApi,
  } from '@/api/book/book'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'book',
    data() {
      return {
        searchKeyword: '',
        books: [],
        bookIds: [],
        pageIndex: 1,
        pageSize: 12,
        total: 0,
        editViewDialogVisible: false,
        currentEditBook: {},
        options: [{
          value: '无',
          label: '无'
        }, {
          value: '纸质书',
          label: '纸质书'
        }, {
          value: '电子书',
          label: '电子书',
          disabled: false
        }, {
          value: '电子书+纸质书',
          label: '电子书+纸质书',
          disabled: false
        }]
      }
    },
    mounted: function () {
      this.doRequestBooks(this.pageIndex, this.pageSize)
    },
    methods: {
      openEditView(index, editBook){
        if (index == -1) {
          this.$set(this.currentEditBook, "title", "")
          this.$set(this.currentEditBook, "subTitle", "")
          this.$set(this.currentEditBook, "authorName", "")
          this.$set(this.currentEditBook, "publisher", "")
          this.$set(this.currentEditBook, "publicationTime", "")
          this.$set(this.currentEditBook, "type", "")
          this.$set(this.currentEditBook, "summary", "")
        } else {
          this.currentEditBook = JSON.parse(JSON.stringify(editBook))
        }
        this.$set(this.currentEditBook, "_index", index)
        this.editViewDialogVisible = true
      },
      closeEditView() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.editViewDialogVisible = false
          })
          .catch(_ => {
          });
      },
      commitEditView(){
        if(this.currentEditBook._index == -1) {
          this.doRequestCreateBook()
        } else {
          this.doRequestUpdateBook()
        }
      },
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        this.doRequestBooks(this.pageIndex, this.pageSize)
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        this.doRequestBooks(this.pageIndex, this.pageSize)
      },
      doRequestBooks(pageIndex, pageSize){
        requestBooksApi(pageIndex - 1, pageSize).then((res) => {
          this.books = []
          if (res.meta.code === 200) {
            this.books = res.data.elements;
            this.pageIndex = res.data.index + 1;
            this.pageSize = res.data.size;
            this.total = res.data.total;
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestCreateBook(){
        requestCreateBookApi(this.currentEditBook).then((res) => {
          if (res.meta.code === 200) {
            this.editViewDialogVisible = false;
            this.$message({
              message: '新增' + res.data + '行',
              type: 'success'
            });
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestUpdateBook(){
        requestUpdateBookApi(this.currentEditBook.id, this.currentEditBook).then((res) => {
          if (res.meta.code === 200) {
            this.editViewDialogVisible = false;
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[this.currentEditBook._index] = this.currentEditBook;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      doRequestRecommendBooks(index, id){
        this.bookIds.push(id);
        requestRecommendBooksApi(this.bookIds).then((res) => {
          if (res.meta.code === 200) {
            this.bookIds = [];
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[index].recommend = 1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestRecommendCancelBooks(index, id){
        this.bookIds.push(id);
        requestRecommendCancelBooksApi(this.bookIds).then((res) => {
          if (res.meta.code === 200) {
            this.bookIds = [];
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[index].recommend = -1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestVisibleBooks(index, id){
        this.bookIds.push(id);
        requestVisibleBooksApi(this.bookIds).then((res) => {
          if (res.meta.code === 200) {
            this.bookIds = []
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[index].visibility = 1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestVisibleCancelBooks(index, id){
        this.bookIds.push(id);
        requestVisibleCancelBooksApi(this.bookIds).then((res) => {
          if (res.meta.code === 200) {
            this.bookIds = []
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[index].visibility = -1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestDeleteBooks(index, id){
        this.bookIds.push(id);
        requestDeleteBooksApi(this.bookIds).then((res) => {
          if (res.meta.code === 200) {
            this.bookIds = []
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[index].delStatus = -1;
            this.currentEditBook = {};
          } else {
            this.$message.error('参数错误')
          }
        })
      },
      doRequestDeleteCancelBooks(index, id){
        this.bookIds.push(id);
        requestDeleteCancelBooksApi(this.bookIds).then((res) => {
          if (res.meta.code === 200) {
            this.bookIds = []
            this.$message({
              message: '更新' + res.data + '行',
              type: 'success'
            });
            this.books[index].delStatus = 1;
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
