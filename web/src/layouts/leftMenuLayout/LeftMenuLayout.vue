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
      :headerLeft="headerLeftNews"
      :headerRight="headerRight"
    >
      <template #items="{categoryItem}">
        <span>{{categoryItem.categoryName}}</span>
        <span>｜</span>
        <span class="">{{categoryItem.title}}</span>
        <span class="right">{{categoryItem.updatedAt}}</span>
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
          class="pt-2 new-category-news"
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

import config from './data/config'

export default {
  name: 'index',
  data() {
    return {
      ...config.data,
    };
  },
  computed: {

  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats()
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

// .new-category-news {
//   border-color: #1e96ab;
//   color: #1e96ab;
// }
</style>