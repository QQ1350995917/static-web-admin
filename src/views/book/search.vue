<template>
  <el-container>
    <el-header>

    </el-header>
    <el-main>
      <div style="margin-top: 15px;">
        <el-input
          @keyup.enter.native="onSearch()"
          placeholder="Please input"
          v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'BookSearch',
    data () {
      return {}
    },
    mounted: function () {
    },
    methods: {
      onSearch: function (e) {
        var e = window.event || e;
        var keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode == 13 && this.input) {
          this.doSearch(this.input, this.index - 1, this.size)
        }
      },
      doSearch: function (keyword, index, size) {
      },
    }
  }
</script>
