<template>
  <div class="item-edit">
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
    >
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="model.icon"
            :src="model.icon"
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
          type="primary"
          native-type="submit"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadFileMixin from '../../mixins/common/uploadFileMixin'
export default {
  name: 'ItemEdit',
  mixins: [uploadFileMixin],
  data() {
    return {
      model: {},
    }
  },
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/items', this.model)
      }

      // 跳转到分页列表
      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload(res) {
      // res 表示服务端的响应数据
      // this.model.icon = res.url
      /**
       * 当给对象加属性时,console.log 可以打印出来，但是没有更新到视图上
       * 
       * this.$set(target, key, value) 方法 -----> 响应式对象
       * 要更改的数据源(可以是对象或者数组)，要更改的具体数据，重新赋的值
       */
      this.$set(this.model, 'icon', res.url)
    }
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
