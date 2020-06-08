<template>
  <el-container>
    <el-header>
      <el-row style="margin-top: 10px;">
        <el-col :span="2" :offset="11">
          <span>{{article.title}}</span>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-table size="mini" :data="paragraphs" style="width: 100%" highlight-current-row>
            <el-table-column type="index"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
              <span v-if="scope.row._editor">
              <el-input size="mini" type="textarea" autosize placeholder="请输入段落内容"></el-input>
              </span>
                <span v-else>{{paragraphs[scope.$index]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;"
                      @click="pwdChange(scope.row,scope.$index,true)">
                    {{scope.row._editor ? '保存' : "修改"}}
                </span>
                <span v-if="!scope.row._editor" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;">
                  删除
                </span>
                <span v-else class="el-tag el-tag--mini" style="cursor: pointer;"
                      @click="pwdChange(scope.row,scope.$index,false)">
                  取消
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <div class="el-table-add-row" style="width: 99.2%;" @click="addMasterUser()"><span>+ 添加</span></div>
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
        article: {},
        paragraphs: [],
        currentParagraph: {},
        master_user: {
          sel: null
        },
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
            if (this.article.paragraphs) {
              this.paragraphs = this.article.paragraphs;
            }
          } else {
            this.$message.error('参数错误')
          }
        });
      },
      //读取表格数据
      readMasterUser() {
        //根据实际情况，自己改下啊
        this.paragraphs.map(i => {
          i._editor = false;
          return i;
        });
      },
      //添加账号
      addMasterUser() {
        for (let i of this.paragraphs) {
          if (i._editor) {
            return this.$message.warning("请先保存当前编辑项");
          }
        }
        let j = {
          "_editor": true
        };
        this.paragraphs.push(j);
        this.currentParagraph = JSON.parse(JSON.stringify(j));
      },
      //修改
      pwdChange(row, index, cg) {
        //点击修改 判断是否已经保存所有操作
        for (let i of this.paragraphs) {
          if (i._editor && i.id != row.id) {
            this.$message.warning("请先保存当前编辑项");
            return false;
          }
        }
        //是否是取消操作
        if (!cg) {
          if (!this.currentParagraph.id) this.paragraphs.splice(index, 1);
          return row._editor = !row._editor;
        }
        //提交数据
        if (row._editor) {
          //项目是模拟请求操作  自己修改下
          (function () {
            let data = JSON.parse(JSON.stringify(this.currentParagraph));
            for (let k in data) row[k] = data[k];
            this.$message({
              type: 'success',
              message: "保存成功!"
            });
            //然后这边重新读取表格数据
            this.readMasterUser();
            row._editor = false;
          })();
        } else {
          this.currentParagraph = JSON.parse(JSON.stringify(row));
          row._editor = true;
        }
      }
    }
  }
</script>

<style>
  .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
  }
</style>
