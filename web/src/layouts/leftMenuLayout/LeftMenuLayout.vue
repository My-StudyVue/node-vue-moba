<template>
  <div>
    <!-- 轮播图 -->
    <swiper
      ref="mySwiper"
      :options="swiperOptions"
    >
      <swiper-slide
        v-for="(n,index) in 3"
        :key="index"
      ><img
          class="w-100"
          src="@/assets/img/swiper.jpeg"
          alt=""
        ></swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>

    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div
          class="nav-iconItem mb-3"
          v-for="(n,index) in 10"
          :key="index"
        >
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-2 mr-1"></i>
        <span>收起</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home',
        },
        loop: true,
        parallax: true,
        freeMode: true,
        freeModeMomentum: true,
        autoplay: {
          delay: 2000,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {

  },

  methods: {}
}

</script>
<style lang='scss' >
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: #fff;

    &.swiper-pagination-bullet-active {
      // background: map-get($colors,'info');
      background-color: #4b67af;
    }
  }
}

.nav-icons {
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
  .nav-iconItem {
    width: 25%;
    // border-right: 1px solid $border-color;
    border-right: 1px solid #d4d9de;

    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>