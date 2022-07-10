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
      <div
        class="bg-light py-2 fs-sm d-flex ai-center jc-center"
        @click="packUp"
      >
        <i
          class="sprite mr-2 mr-1"
          :class="[isPack?'sprite-arrow':'sprite-spread']"
        ></i>
        <span>{{isPack ? '收起' :'展开'}}</span>
      </div>
    </div>
    <l-card
      listKey="newsList"
      :list="newsList"
      :swiperOptions="swiperOptionsNews"
      @tabClick="tabClickNews"
      :curIndex="curIndexNews"
      :headerLeft="headerLeftNews"
      :headerRight="headerRight"
      ref="tabCardNews"
    >
      <template #items="{swiperItem}">
        <router-link
          tag="div"
          :to="`/article/${categoryItem._id}`"
          v-for="(categoryItem,index) in swiperItem"
          :key="index"
          class="py-2 fs-lg d-flex"
        >
          <span class="text-info">{{categoryItem.categoryName}}</span>
          <span class="px-2">｜</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{categoryItem.title}}</span>
          <span class="text-grey fs=sm">{{categoryItem.updatedAt|date}}</span>
        </router-link>
      </template>
    </l-card>

    <l-card
      listKey="heroList"
      :list="heroList"
      :swiperOptions="swiperOptionsHero"
      @tabClick="tabClickHero"
      :curIndex="curIndexHero"
      :headerLeft="headerLeftHero"
      :headerRight="headerRight"
      ref="tabCardHero"
    >
      <template #items="{swiperItem}">
        <div
          class="d-flex flex-wrap"
          style="margin:0 -0.5rem"
        >
          <router-link
            tag="div"
            :to="`/hero/${heroItem._id}`"
            v-for="(heroItem,index) in swiperItem"
            :key="index"
            class="p-2 text-center"
            style="width:20%"
          >
            <img
              :src="heroItem.avatar"
              class="w-100"
              alt=""
            >
            <div>{{heroItem.name}}</div>
          </router-link>
        </div>
      </template>
    </l-card>
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
      swiperOptionsNews: {
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
            vm.curIndexNews = activeIndex
          },
        }
      },
      swiperOptionsHero: {
        pagination: {
          el: '.swiper-pagination',
        },
        autoHeight: true,
        on: {
          init() {
            console.log('swiper initialized');
          },
          // 当前Slide切换到另一个Slide时执行(activeIndex发生改变)
          slideChange() {
            const { activeIndex } = this
            vm.curIndexHero = activeIndex
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
      // const res = await this.$http.get("/news/init")
      const res = await this.$http.get("/news/list")
      this.newsList = res.data
    },
    async fetchHeroCats() {
      // const res = await this.$http.get("/heroes/init")
      const res = await this.$http.get("/heroes/list")
      this.heroList = res.data
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