<template>
  <div class="tab-control d-flex text-white jc-around pb-1">
    <div
      v-for="(item,index) in tabControls"
      :key="index"
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      @click="itemClick(index)"
    >
      <!-- tag="div"  router-link 改成 span,不是a 标签-->
      <router-link
        class="tab-control-link"
        tag="span"
        to="/"
      >{{item}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  components: {},
  props: {
    tabControls: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  .tab-control-item {
    border: 3px solid transparent;
    padding-bottom: 0.2rem;
    &.active {
      border-bottom: 3px solid #fff;
    }
  }
}
</style>