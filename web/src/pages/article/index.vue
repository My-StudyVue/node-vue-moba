<template>
  <div v-if="model">
    <div class="d-flex py-3 px-2">
      <div class="moba ico-back" />
      <strong class="flex-1">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xx">
        2022-03-18
      </div>
    </div>

    <div
      v-html="model.body"
      class="px-3 body fs-lg"
    ></div>

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
  created() {
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
<style lang='scss' scoped>
.body {
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