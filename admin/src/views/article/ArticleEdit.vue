<template>
  <div class="category-edit">
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select
          v-model="model.categories"
          clearable
          placeholder="请选择所属分类"
          multiple
        >
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <!-- 
          -- useCustomImageHandler:开启自定义图像上传处理 
          -- image-added: 上传处理事件
        -->
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: 'ArticleEdit',
  data () {
    return {
      model: {},
      categories: [],
    }
  },
  props: {
    // id: String,
    id: {}, // 另一种写法
  },
  created () {
    this.id && this.fetch()
    this.fetchCategories()
  },
  methods: {
    async save () {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        // this.$http.post('rest/articles', this.model).then()
        await this.$http.post('rest/articles', this.model)
      }

      // 跳转到分页列表
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories')
      this.categories = res.data
      // this.categories.push(...res.data)
    },
    /**
     * 需要传递四个参数：
     * 1.处理的文件
     * 2.编辑器实例
     * 3.上传时的光标(可以成功插入到正确位置)
     * 4.重置上传的方法
     */
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  components: {
    VueEditor
  },
}
</script>

<style scoped lang="less">
</style>
