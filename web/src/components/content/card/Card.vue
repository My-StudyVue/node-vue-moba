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
        :tabControlsOption="tabControlsOption"
        @tabClick="tabClick"
        class="tab-control"
      />
      {{tabControlsOption.currentIndex}}--{{curIndex}}
      <!-- 内容 -->
      <l-swiper
        ref="tabSwiper"
        :swiperOptions="swiperOptions"
        :swiperList="swiperList"
        :showPagination="false"
        class="pt-2"
      >
        <template #container="{swiperItem}">
          <slot
            name="items"
            :swiperItem="swiperItem"
          ></slot>
        </template>
      </l-swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LCard',
  data() {
    return {
      tabControlsOption: {
        tabList: [],
        currentIndex: this.curIndex
      },
      swiperList: [],
    };
  },
  watch: {
    list(val) {
      this.tabControlsOption.tabList = val.map(item => item.name)
      this.swiperList = val.map(item => item.newsList)
    },
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
    list: {
      type: Array,
      default() {
        return []
      }
    },
    // 滑动配置
    swiperOptions: {
      type: Object,
      defalut: () => {
        return {}
      }
    },
    // 当前下标
    curIndex: {
      type: Number,
      default: 0
    },
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
      // this.$emit("update:currentIndex", index)
      this.$emit('tabClick', index)
    },
    slideChange() {
      return this.$refs.tabSwiper.slideChange()
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