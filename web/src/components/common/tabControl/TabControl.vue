<template>
  <div class="tab-control d-flex jc-between pb-1">
    <div
      v-for="(item,index) in tabControlsOption.tabList"
      :key="index"
      class="tab-control-item"
      :style="[{ borderBottom: index === tabControlsOption.currentIndex ? `3px solid ${color}` : ''},{ color: index === tabControlsOption.currentIndex ? color : ''}] "
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
    tabControlsOption: {
      type: Object,
      default() {
        return {
          tabList: [],
          currentIndex: 0,
        }
      }
    },
    color: {
      type: String,
      default: '#db9e3f'
    },
  },
  created() {
    this.$set(this.tabControlsOption, 'currentIndex', 0)
  },
  data() {
    return {

    }
  },
  methods: {
    itemClick(index) {
      this.$set(this.tabControlsOption, 'currentIndex', index)
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