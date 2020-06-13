<template>
  <el-container>
    <el-header>
      <div style="margin-top: 10px;">
        <el-input
          @keyup.enter.native="onBookSearch()"
          placeholder="Please input"
          v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-main>

    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'bookSearch',
    data () {
      return {}
    },
    mounted: function () {
    },
    methods: {
      onBookSearch: function (e) {
        var e = window.event || e;
        var keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode == 13 && this.input) {
          this.doBookSearch(this.input, this.index - 1, this.size)
        }
      },
      doBookSearch: function (keyword, index, size) {
      },
    }
  }
</script>
