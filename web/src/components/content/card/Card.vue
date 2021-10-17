<template>
  <div class="card bg-white px-3 mt-3">
    <l-nav-bar class="card-header">
      <div
        slot="left"
        class="left d-flex"
      >
        <!-- <i class="moba" :class="`ico-${icon}`"></i> -->
        <i :class="headerLeft.icon"></i>
        <div class="fs-xl px-2">{{headerLeft.title}}</div>
      </div>
      <div
        slot="right"
        class="right"
      >
        <i :class="headerRight.icon"></i>
      </div>
    </l-nav-bar>

    <div class="card-body">
      <l-tab-control
        ref="tabControl"
        :tabControls="tabControls"
        @tabClick="tabClick"
        class="tab-control"
      />
      <!-- 内容 -->
      <slot name="container"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LCard',
  data() {
    return {

    };
  },
  props: {
    // 左边配置
    headerLeft: {
      type: Object,
      defalut: () => {
        return {}
      },
      required: true,// 必填
    },
    // 右边配置
    headerRight: {
      type: Object,
      defalut: () => {
        return {}
      }
    },
    tabControls: {
      type: Array,
      default() {
        return []
      }
    },
  },
  methods: {
    tabClick(index) {
      this.$emit('tabClick', index)
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