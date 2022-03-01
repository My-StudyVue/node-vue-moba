<template>
  <div>
    <!-- 轮播图 -->
    <l-swiper
      :swiperOptions="swiperHomeOptions"
      :swiperList="swiperList"
    >
      <template #container="{swiperItem}">
        <img
          slot="container"
          class="w-100"
          :src="swiperItem.imageUrl"
          alt=""
        >
      </template>
    </l-swiper>

    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div
          class="nav-iconItem mb-3"
          v-for="(n,i) in sprite"
          :key="i"
        >
          <i
            class="sprite"
            :class="`sprite-${n.icon}`"
          ></i>
          <div class="py-2">{{n.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i
          class="sprite mr-2 mr-1"
          :class="[isPack?'sprite-arrow':'sprite-spread']"
        ></i>
        <span @click="packUp">{{isPack ? '收起' :'展开'}}</span>
      </div>
    </div>

    <l-card
      :list="newsList"
      :swiperOptions="swiperOptions"
      @tabClick="tabClick"
      :curIndex="curIndex"
      :headerLeft="headerLeftNews"
      :headerRight="headerRight"
      ref="tabCard"
    >
      <template #items="{swiperItem}">
        <div
          v-for="(categoryItem,index) in swiperItem"
          :key="index"
          class="py-2 fs-lg d-flex"
        >
          <span class="text-info">{{categoryItem.categoryName}}</span>
          <span class="px-2">｜</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{categoryItem.title}}</span>
          <span class="text-grey fs=sm">{{categoryItem.updatedAt|date}}</span>
        </div>
      </template>
    </l-card>

    <!-- <l-card
      :tabControls="tabControlsHero"
      @tabClick="tabClick"
      :headerLeft="headerLeftHero"
      :headerRight="headerRight"
    >
      <div slot="container">
        <l-swiper
          ref="tabSwiper"
          :swiperOptions="swiperOptions"
          :swiperItemNum="5"
          :showPagination="false"
          class="pt-2"
        >
          <div
            slot="container"
            v-for="(n,i) in 5"
            :key="i"
            class="py-2"
          >
            <span>[热门]</span>
            <span>｜</span>
            <span>王者荣耀主播联赛今日开赛！</span>
            <span>10/16</span>
          </div>
        </l-swiper>
      </div>
    </l-card> -->
  </div>
</template>
<script>
import dayjs from 'dayjs'

import config from './data/config'

/* eslint no-undef: "error" */
let vm = null;

export default {
  name: 'index',
  data() {
    return {
      ...config.data,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          init() {
            console.log('swiper initialized');
          },
          // 当前Slide切换到另一个Slide时执行(activeIndex发生改变)
          slideChange() {
            const { activeIndex } = this
            vm.curIndex = activeIndex
          },
        }
      },
    };
  },
  computed: {

  },
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  created() {
    /* eslint no-undef: "error" */
    vm = this;

    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    ...config.methods,

    async fetchNewsCats() {
      const res = await this.$http.get("/news/list")
      this.newsList = res.data
      console.log(this.newsList, '---this.newsList');
    },
    async fetchHeroCats() {
      const res = await this.$http.get("/heroes/list")
      this.tabControlsHero = res.data.map(data => data.name)
      this.heroList = res.data.map(data => data.newsList)
    },
  }
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