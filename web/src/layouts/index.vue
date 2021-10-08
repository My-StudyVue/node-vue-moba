<template>
  <div class="main-page">
    <div class="topBar bg-black py-2 px-3 d-flex ai-center">
      <img
        src="@/assets/img/logo.png"
        height="30"
      >
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button
        type="button"
        class="btn bg-primary"
      >立即下载</button>
    </div>
    <div class="bg-primary pb-2">
      <div class="nav d-flex text-white jc-around pb-1">
        <div
          class="nav-item active"
          v-for="(item,index) in navBar"
          :key="index"
        >
          <!-- tag="div"  router-link 改成 div,不是a 标签-->
          <router-link
            class="nav-link"
            tag="div"
            to="/"
          >{{item}}</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      navBar: ['首页', '攻略中心', '赛事中心', 'IP新游']
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  border-radius: 0.1538rem;
  // map-get 方法表示从原来预定义的尺寸里选择
  // font-size: map-get($font-sizes, "sm") * $base-font-size;
  font-size: 0.9231rem;
  padding: 0.2rem 0.6rem;
}

.nav {
  .nav-item {
    border: 3px solid transparent;
    padding-bottom: 0.2rem;
    &.active {
      border-bottom: 3px solid #fff;
    }
  }
}
</style>
