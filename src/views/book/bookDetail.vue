<template>
  <el-container>
    <el-header>

    </el-header>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6" v-for="bookTable in bookTables" v-bind:key="bookTable.id" >
          <router-link :to="{path:'articleDetail',query:{articleId:bookTable.id}}">
            <div>
              <span>{{bookTable.title}}</span>
            </div>
          </router-link>
        </el-col>
      </el-row>
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
  import { requestBookTablesApi } from '@/api/book/book'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main";
  export default {
    components: {ElFooter},
    name: 'book',
    data() {
      return {
        bookId: this.$route.query.bookId,
        bookTables: [],
        pageIndex: 1,
        pageSize: 12,
        total: 0,
      }
    },
    mounted: function () {
      this.doRequestBookTables(this.bookId, this.pageIndex, this.pageSize)
    },
    methods: {
      handleSizeChange: function (currentPageSize) {
        this.pageSize = currentPageSize;
        this.doRequestBookTables(this.bookId, this.pageIndex, this.pageSize)
      },
      handleCurrentChange: function (currentPage) {
        this.pageIndex = currentPage;
        this.doRequestBookTables(this.bookId, this.pageIndex, this.pageSize)
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
      }
    }
  }
</script>
