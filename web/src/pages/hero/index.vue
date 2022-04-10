<template>
  <div v-if="model">
    <l-nav-bar class="topBar bg-black py-2 px-3 ai-center text-white">
      <div
        slot="left"
        class="left d-flex ai-center"
      >
        <img
          src="@/assets/img/logo.png"
          height="30"
        >
        <div class="px-2 flex-1">
          <strong>
            <span>王者荣耀</span>
            <span class="ml-2">攻略站</span>
          </strong>
        </div>
      </div>
      <div
        slot="right"
        class="right"
      >
        <router-link
          to="/"
          tag="strong"
        >更多英雄 &gt;</router-link>
      </div>
    </l-nav-bar>

    <div
      class="top"
      :style="{'background-image':`url(${model.banner}})`}"
    >
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-xs">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between">
          <div
            class="scores d-flex ai-center pt-2"
            v-if="model.scores"
          >
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skill}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link
            tag="span"
            to="/"
            class="text-grey fs-sm"
          >
            皮肤：7 &gt;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      model: null
    };
  },
  props: {
    id: {
      required: true,
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
}

</script>
<style lang="scss" scoped>
.topBar {
  position: sticky; //吸顶
  top: 0;
  z-index: 999;
}

.nav-bar {
  .left,
  .right {
    width: 180px;
  }
}

.top {
  height: 50vw;
  background: red no-repeat top center;
  background-size: auto 100%;

  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>