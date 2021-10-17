const config = {
  data: {
    headerLeft: {
      icon: 'moba ico-news',
      title: '新闻资讯',
    },
    headerRight: {
      icon: 'moba moba ico-more',
    },

    swiperHomeOptions: {
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
    },

    swiperOptions: {
      pagination: {
        el: '.swiper-pagination',
      },
    },
  },
  methods: {
    tabClick(index) {
      console.log(index);
    }
  }
}


export default config;
