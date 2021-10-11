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
      <tab-control
        ref="tabControl"
        :tabControls="tabControls"
        @tabClick="tabClick"
        class="tab-control"
      />
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      tabControls: ['首页', '攻略中心', '赛事中心', 'IP新游']
    }
  },
  components: {
  },
  methods: {
    tabClick(index) {
      console.log(index);
    }
  },
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
</style>
