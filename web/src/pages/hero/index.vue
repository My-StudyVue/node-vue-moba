<template>
  <div v-if="model">
    <l-nav-bar class="topBar bg-black py-2 px-3 ai-center text-white">
      <div
        slot="left"
        class="left d-flex ai-center"
      >
        <img
          src="@/assets/img/logo.png"
          height="30"
        >
        <div class="px-2 flex-1">
          <span>王者荣耀</span>
          <span class="ml-2">攻略站</span>
        </div>
      </div>
      <div
        slot="right"
        class="right"
      >
        <router-link
          to="/"
          tag="div"
        >更多英雄 &gt;</router-link>
      </div>
    </l-nav-bar>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      model: null
    };
  },
  props: {
    id: {
      required: true,
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}

</script>
<style lang="scss" scoped>
.topBar {
  position: sticky; //吸顶
  top: 0;
  z-index: 999;
}

.nav-bar {
  .left,
  .right {
    width: 180px;
  }
}
</style>