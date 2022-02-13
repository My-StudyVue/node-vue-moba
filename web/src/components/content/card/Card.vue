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
      <l-swiper
        ref="tabSwiper"
        :swiperOptions="swiperOptions"
        :swiperList="swiperList"
        :showPagination="false"
        class="pt-2 new-category-news"
      >
        <template #container="{swiperItem}">
          <div
            v-for="(categoryItem,index) in swiperItem"
            :key="index"
          >
            <slot
              name="items"
              :categoryItem="categoryItem"
            ></slot>
          </div>
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
      tabControls: [],
      swiperList: [],
    };
  },
  watch: {
    list(val) {
      this.tabControls = val.map(item => item.name)
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

.new-category-news {
  border-color: #1e96ab;
  color: #1e96ab;
}
</style>