<template>
  <div class="card bg-white px-3 mt-3">
    <nav-bar class="card-header">
      <div
        slot="left"
        class="left d-flex"
      >
        <i class="moba ico-news"></i>
        <div class="fs-xl px-2">新闻资讯</div>
      </div>
      <div
        slot="right"
        class="right"
      >
        <i class="moba ico-more"></i>
      </div>
    </nav-bar>

    <div class="card-body">
      <tab-control
        ref="tabControl"
        :tabControls="tabControls"
        @tabClick="tabClick"
        class="tab-control"
      />

      <slot name="container"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      tabControls: ['热门', '新闻', '公告', '活动', '赛事']
    };
  },
  methods: {
    tabClick(index) {
      console.log(index);
    }
  }
}

</script>
<style lang='scss' scoped>
.nav-bar {
  height: 44px;
  line-height: 44px;
}
</style>