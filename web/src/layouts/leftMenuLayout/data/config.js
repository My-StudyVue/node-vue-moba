import domain from '../domain/domain'

const config = {
  data: {
    currentIndex: 0,
    isPack: false,
    sprite: domain,
    swiperList: [
      {
        /**
         * 引用路径使用 require 
         * 
         * 循环的那串数组当成字符串了，识别不出来。require相当于引用了图片的路径
         */
        imageUrl: require('@/assets/img/swiper1.jpeg'),
      },
      {
        imageUrl: require('@/assets/img/swiper2.jpeg'),
      },
      {
        imageUrl: require('@/assets/img/swiper3.jpeg'),
      },
    ],
    tabControlsNew: [],
    tabControlsHero: [],
    newsList: [],
    newsAry: [],
    heroList: [],

    headerLeftNews: {
      icon: 'moba ico-news',
      title: '新闻资讯',
    },
    headerLeftHero: {
      icon: 'moba ico-hero',
      title: '英雄列表',
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
