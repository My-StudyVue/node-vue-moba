<template>
  <div>
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(n,i) in swiperItemNum"
        :key="i"
      >
        <!-- 内容 -->
        <slot name="container"></slot>
      </swiper-slide>
      <div
        v-if="showPagination"
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
  </div>
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
    // 循环个数
    swiperItemNum: {
      type: Number || String,
      defalut: 1 || '1',
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