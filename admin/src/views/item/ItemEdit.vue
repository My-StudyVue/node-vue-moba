<template>
  <div class="category-edit">
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form label-width="120px" :inline="true" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ItemEdit',
  data () {
    return {
      model: {},
    }
  },
  props: {
    // id: String,
    id: {}, // 另一种写法
  },
  created () {
    this.id && this.fetch()
  },
  methods: {
    async save () {
      if (this.id) {
        await this.$http.put(`items/${this.id}`, this.model)
      } else {
        // this.$http.post('items', this.model).then()
        await this.$http.post('items', this.model)
      }

      // 跳转到分页列表
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch () {
      const res = await this.$http.get(`items/${this.id}`)
      this.model = res.data
    },
  },
  components: {

  },
}
</script>

<style scoped lang="less">
</style>
