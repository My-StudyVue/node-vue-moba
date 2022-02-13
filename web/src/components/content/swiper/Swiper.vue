<template>
  <swiper
    ref="mySwiper"
    :options="swiperOptions"
  >
    <swiper-slide
      v-for="(swiperItem,i) in swiperList"
      :key="i"
    >
      <!-- 内容 -->
      <slot
        name="container"
        :swiperItem="swiperItem"
      ></slot>
    </swiper-slide>
    <div
      v-if="showPagination"
      class="swiper-pagination pagination-home text-right px-3 pb-2"
      slot="pagination"
    ></div>
  </swiper>
</template>

<script>
export default {
  name: 'LSwiper',
  data() {
    return {
    };
  },
  props: {
    // 配置
    swiperOptions: {
      type: Object,
      defalut: () => {
        return {}
      }
    },
    // 循环数组
    swiperList: {
      type: Array,
      defalut: () => {
        return []
      }
    },
    // 是否显示圆点器
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
}

</script>
<style lang="scss" scoped>
</style>