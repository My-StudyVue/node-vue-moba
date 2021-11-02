import domain from '../domain/domain'

const config = {
  data: {
    currentIndex: 0,
    isPack: false,
    sprite: domain,
    tabControls: ['热门', '新闻', '公告', '活动', '赛事'],

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
      on: {
        init: function () {
          // console.log('swiper initialized');
        },
        slideChangeTransitionEnd: () => {
          console.log('swiper initialized');
          console.log(this)
        }
      }
    },
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
    },
    packUp() {
      this.isPack = !this.isPack
    },
  }
}


export default config;
