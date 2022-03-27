<template>
  <div v-if="model">
    <div class="d-flex p-2 border-bottom">
      <div class="moba ico-back text-blue" />
      <strong class="flex-1 text-blue pl-2">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">
        2022-03-18
      </div>
    </div>

    <div
      v-html="model.body"
      class="px-3 body fs-lg"
    ></div>

    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="moba ico-associated"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link
          class="py-1"
          tag="div"
          :to="`/article/${item._id}`"
          v-for="item in model.related"
          :key="item.id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      model: null,
      // 初始化的值如果为null,需要在页面加上v-if
    };
  },
  props: {
    id: {
      required: true,
    }
  },
  watch: {
    id: 'fetch',
    // id(){
    //   this.fetch()
    // },
  },
  created() {
    // 组件已经生成，不会再次调用此方法
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    },
  }
}

</script>
<style lang='scss' >
.body {
  .ico-back {
    font-size: 1.6923rem;
  }
  img {
    max-width: 100%;
    height: auto;
  }

  iframe {
    width: 100%;
    height: auto;
  }
}
</style>