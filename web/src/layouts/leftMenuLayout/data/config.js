import domain from '../domain/domain'

const config = {
  name: "config",
  data: {
    curIndex: 0,
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

    // swiperOptions: {
    //   pagination: {
    //     el: '.swiper-pagination',
    //   },
    //   on: {
    //     init() {
    //       // console.log('swiper initialized');
    //     },
    //     // 当前Slide切换到另一个Slide时执行(activeIndex发生改变)
    //     slideChange() {
    //       // const { activeIndex } = this
    //       // vm.$set(vm.data, 'curIndex', activeIndex)
    //       // console.log('swiper initialized', this.activeIndex, vm, vm.data.curIndex);
    //       console.log('swiper initialized', vm);
    //     },
    //   }
    // },
  },
  methods: {
    tabClick(index) {
      this.curIndex = index
      this.$refs.tabCard.slideTo(index)
    },
    packUp() {
      this.isPack = !this.isPack
    },
  }
}


export default config;
