<template>
  <div class="category-list">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <!-- <template slot-scope="scope"> -->
        <!-- slot-scope 已被vue3 废弃,使用 v-slot 代替 -->
        <template v-slot="scope">
          <el-button @click="edit(scope.row._id)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button @click="remove(scope.row)" type="primary" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data () {
    return {
      items: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('/rest/categories')
      this.items = res.data
    },
    edit (id) {
      // 记得加 / ,否则不是在根路径上
      this.$router.push(`/categories/edit/${id}`)
    },
    remove (row) {
      this.$confirm(`是否确定要删除此分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/rest/categories/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        this.fetch()
      })
    },
  },
  components: {

  },
}
</script>

<style scoped lang="less">
</style>
