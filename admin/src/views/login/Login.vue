<template>
  <div class="login-container">
    <el-card
      header="请先登陆"
      class="login-card"
    >
      <el-form @submit.native.prevent="login">
        <el-form-item label='用户名'>
          <el-input v-model="model.userName"></el-input>
        </el-form-item>

        <el-form-item label='密码'>
          <el-input
            show-password
            v-model="model.password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit "
          >登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      // 表示当前浏览器关闭后依然保存着
      localStorage.token = res.token
      // 表示当前浏览器关闭之后就没了
      // sessionStorage.token = res.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登陆成功'
      })
    }
  }
}

</script>
<style scoped>
.login-container {
  width: 25rem;
  margin: 5rem auto;
}
</style>