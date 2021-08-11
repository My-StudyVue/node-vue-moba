<template>
  <div class="hero-edit">
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
          <el-card class="box-card">
            <el-divider content-position="left">个人信息</el-divider>

            <el-form-item label="名称">
              <el-input v-model="model.name"></el-input>
            </el-form-item>

            <el-form-item label="称号">
              <el-input v-model="model.title"></el-input>
            </el-form-item>

            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload"
              >
                <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <el-divider content-position="left">分类</el-divider>
            <el-form-item label="分类">
              <el-select
                v-model="model.categories"
                placeholder="请选择分类"
                clearable
                multiple
              >
                <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <el-divider content-position="left">评分</el-divider>
            <el-form-item label="难度">
              <el-rate
                v-model="model.scores.difficult"
                :max="10"
                show-score
                style="margin-top: 0.6rem"
              ></el-rate>
            </el-form-item>
            <el-form-item label="技能">
              <el-rate
                v-model="model.scores.skill"
                :max="10"
                show-score
              ></el-rate>
            </el-form-item>
            <el-form-item label="攻击">
              <el-rate
                v-model="model.scores.attack"
                :max="10"
                show-score
              ></el-rate>
            </el-form-item>
            <el-form-item label="生存">
              <el-rate
                v-model="model.scores.survive"
                :max="10"
                show-score
              ></el-rate>
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <el-divider content-position="left">出装</el-divider>
            <el-form-item label="顺风出装">
              <el-select
                v-model="model.items1"
                placeholder="请选择出装"
                clearable
                multiple
              >
                <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="逆风出装">
              <el-select
                v-model="model.items2"
                placeholder="请选择出装"
                clearable
                multiple
              >
                <el-option
                  v-for="item in items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-card>

          <el-card class="box-card">
            <el-divider content-position="left">技巧</el-divider>
            <el-form-item label="使用技巧">
              <el-input
                type="textarea"
                v-model="model.usageTips"
                placeholder="请输入使用技巧"
              ></el-input>
            </el-form-item>
            <el-form-item label="对抗技巧">
              <el-input
                type="textarea"
                v-model="model.battleTips"
                placeholder="请输入对抗技巧"
              ></el-input>
            </el-form-item>
            <el-form-item label="团战思路">
              <el-input
                type="textarea"
                v-model="model.teamTips"
                placeholder="请输入团战思路"
              ></el-input>
            </el-form-item>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="技能">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus" /> 添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-card class="box-card" style="">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="(res) => $set(item, 'icon', res.url)"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input
                    v-model="item.description"
                    type="textarea"
                  ></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input v-model="item.tips" type="textarea"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'HeroEdit',
  data () {
    return {
      // model: {},
      model: {
        name: '',
        avatar: '',
        title: '',
        categories: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
      }, //普通写法
      categories: [],
      items: [],
    }
  },
  props: {
    id: {},
  },
  created () {
    this.id && this.fetch()
    this.fetchCategories()
    this.fetchItems()
  },
  methods: {
    async save () {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/heroes', this.model)
      }

      // 跳转到分页列表
      this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功！'
      })
    },
    async fetch () {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // res.data 返回的数据里面没有 scores字段
      // this.model = res.data
      /**
       * 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
       * Object.assign(target, source1,source2)
       * 第一个参数是目标对象，后面的参数都是源对象
       */
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems () {
      const res = await this.$http.get(`rest/item`)
      this.items = res.data
    },
    afterUpload (res) {
      // this.$set(this.model, 'avatar', res.url)
      this.model.avatar = res.url //普通写法
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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
