<template>
  <div class="category-edit">
    <h1>新建分类</h1>
    <el-form label-width="120px" :inline="true" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  data () {
    return {
      model: {},
    }
  },
  components: {

  },
  methods: {
    async save () {
      // this.$http.post('categories', this.model).then()
      await this.$http.post('categories', this.model)
      // 跳转到分页列表
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
