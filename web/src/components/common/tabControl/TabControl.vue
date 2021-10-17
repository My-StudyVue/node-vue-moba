<template>
  <div class="tab-control d-flex jc-between pb-1">
    <div
      v-for="(item,index) in tabControls"
      :key="index"
      class="tab-control-item"
      :style="[{ borderBottom: index === currentIndex ? `3px solid ${color}` : ''},{ color: index === currentIndex ? color : ''}] "
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
  name: "LTabControl",
  props: {
    tabControls: {
      type: Array,
      default() {
        return []
      }
    },
    color: {
      type: String,
      default: '#db9e3f'
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
  }
}
</style>