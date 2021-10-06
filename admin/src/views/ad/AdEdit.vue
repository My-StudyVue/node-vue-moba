<template>
  <div class="ad-edit">
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form
      label-width="130px"
      @submit.native.prevent="save"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button
          size="small"
          @click="model.itemImages.push({})"
        >
          <i class="el-icon-plus" /> 添加广告
        </el-button>
        <el-row
          type="flex"
          style="flex-wrap: wrap;margin: 1rem 0"
        >
          <el-col
            :md="24"
            v-for="(item, index) in model.itemImages"
            :key="index"
          >
            <el-card class="box-card">
              <el-form-item label="跳转链接（URL）">
                <el-input v-model="item.url"></el-input>
              </el-form-item>

              <el-form-item
                label="图片"
                style="margin-top:0.5rem"
              >
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'images', res.url)"
                >
                  <img
                    v-if="item.images"
                    :src="item.images"
                    class="avatar"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.itemImages.splice(index, 1)"
                >删除</el-button>
              </el-form-item>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
        >保存</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdEdit',
  data() {
    return {
      model: {
        itemImages: []
      },
    }
  },
  props: {
    // id: String,
    id: {}, // 另一种写法
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        // this.$http.post('rest/ads', this.model).then()
        await this.$http.post('rest/ads', this.model)
      }

      // 跳转到分页列表
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
  },
  components: {

  },
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>
