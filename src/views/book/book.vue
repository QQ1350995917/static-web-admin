<template>
  <el-container>
    <el-header>
      <el-row style="margin-top: 10px;">
        <el-col :span="22" style="padding-right: 10px">
          <div>
            <el-input
              @keyup.enter.native="onSearch()"
              placeholder="Please input"
              v-model="input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button @click="openEditView('')" type="primary" style="width: 100%">新增</el-button>
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
            width="80">
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
            width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small">推荐</el-button>
              <el-button type="text" size="small">隐藏</el-button>
              <el-button type="text" size="small">删除</el-button>
              <el-button @click="openEditView(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog
        title="提示"
        :visible.sync="editViewDialogVisible"
        width="30%"
        :before-close="handleClose">
        <template>
          <el-input v-show="false" v-model="editBook.id">
          </el-input>
          <el-input placeholder="请输入图书名称" v-model="editBook.title">
            <template slot="prepend">书名</template>
          </el-input>
          <el-input placeholder="请输入副标题" v-model="editBook.subTitle">
            <template slot="prepend">副标题</template>
          </el-input>
          <el-input placeholder="请输入作者" v-model="editBook.authorName">
            <template slot="prepend">作者</template>
          </el-input>
          <el-input placeholder="请输入出版社" v-model="editBook.publisher">
            <template slot="prepend">出版社</template>
          </el-input>
          <el-date-picker style = "width: 50%;"
            v-model="editBook.publicationTime"
            type="date"
            placeholder="请选择出版时间">
          </el-date-picker>
          <el-select filterable v-model="editBook.type" placeholder="请选择种类" style = "float: right;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <el-input placeholder="请输入简介" type="textarea" maxlength="256" show-word-limit :rows="5" v-model="editBook.summary">
            <template slot="prepend">简介</template>
          </el-input>
        </template>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeEditView()">取 消</el-button>
          <el-button type="primary" @click="closeEditView()">确 定</el-button>
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
  import {requestBooksApi} from '@/api/book/book'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'book',
    data() {
      return {
        books: [],
        pageIndex: 1,
        pageSize: 12,
        total: 0,
        editViewDialogVisible: false,
        editBook: '',
        options: [{
          value: '无',
          label: '无'
        },{
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
      openEditView(editBook){
        this.editBook = editBook;
        this.editViewDialogVisible = true;
      },
      closeEditView(){
        this.editBook = '';
        this.editViewDialogVisible = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
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
