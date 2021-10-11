<template>
  <swiper
    ref="mySwiper"
    :options="swiperOptions"
  >
    <swiper-slide><img
        class="w-100"
        src="@/assets/img/swiper.jpeg"
        alt=""
      ></swiper-slide>
    <swiper-slide><img
        class="w-100"
        src="@/assets/img/swiper.jpeg"
        alt=""
      ></swiper-slide>
    <swiper-slide><img
        class="w-100"
        src="@/assets/img/swiper.jpeg"
        alt=""
      ></swiper-slide>
    <div
      class="swiper-pagination pagination-home text-right px-3 pb-2"
      slot="pagination"
    ></div>
  </swiper>
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
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, true)
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
</style>