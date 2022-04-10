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

    <div class="top">
      <!-- 
      :style="{'background-image':`url(${model.banner}})`}" -->
      <img
        :src="model.banner"
        alt=""
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
            class="text-grey fs-sm pt-2"
          >
            皮肤：7 &gt;
          </router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->

    <div>
      <div class="bg-white px-3">
        <l-tab-control
          ref="tabControl"
          color="#db9e3f"
          :tabControlsOption="tabControlsOption"
          class="pb-2 border-bottom"
        />
        <router-view />
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link
                  tag="button"
                  to="/"
                  class="btn flex-1 ml-2 fs-sm bg-white-1 d-flex ai-center jc-center"
                >
                  <i class="moba ico-video text-primary"></i>
                  英雄介绍视频
                </router-link>

                <router-link
                  tag="button"
                  to="/"
                  class="btn flex-1 ml-2 fs-sm bg-white-1 d-flex ai-center jc-center"
                >
                  <i class="moba ico-picture text-primary"></i>
                  一图识英雄
                </router-link>
              </div>

              <!-- skills -->
              <div class="skills mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = index"
                    :class="{active:currentSkillIndex === index}"
                    :src="item.icon"
                    alt=""
                    v-for="(item,index) in model.skills"
                    :key="index"
                  >
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3>{{currentSkill.name}}</h3>
                    <span class="text-grey-1 ml-4">（冷却值：{{currentSkill.coolDown}}消耗:{{currentSkill.cost}}）</span>
                  </div>
                  <p class="pb-2">{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p class="pt-2">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>

            <div class="card bg-white px-3 mt-3 border-bottom hero-items">
              <l-nav-bar class="card-header">
                <div
                  slot="left"
                  class="left d-flex py-3"
                >
                  <i class="moba ico-news"></i>
                  <strong class="fs-xl px-2">英雄关系</strong>
                </div>
              </l-nav-bar>
              <div class="card-body pb-2">
                <div class="fs-xl">顺风出装</div>
                <div class="d-flex jc-around text-center mt-3">
                  <div
                    v-for="item in model.items1"
                    :key="item.name"
                  >
                    <img
                      :src="item.icon"
                      alt=""
                      class="icon"
                    >
                    <div class="fs-xs">{{item.name}}</div>
                  </div>
                </div>
                <div class="border-bottom mt-3"></div>
                <div class="fs-xl mt-3">逆风出装</div>
                <div class="d-flex jc-around text-center mt-3">
                  <div
                    v-for="item in model.items2"
                    :key="item.name"
                  >
                    <img
                      :src="item.icon"
                      alt=""
                      class="icon"
                    >
                    <div class="fs-xs">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-white px-3 mt-3 border-bottom">
              <l-nav-bar class="card-header">
                <div
                  slot="left"
                  class="left d-flex py-3"
                >
                  <i class="moba ico-news"></i>
                  <strong class="fs-xl px-2">使用技巧</strong>
                </div>
              </l-nav-bar>
              <div class="card-body pb-2">
                <p class="fs-lg">{{model.usageTips}}</p>
              </div>
            </div>

            <div class="card bg-white px-3 mt-3 border-bottom">
              <l-nav-bar class="card-header">
                <div
                  slot="left"
                  class="left d-flex py-3"
                >
                  <i class="moba ico-news"></i>
                  <strong class="fs-xl px-2">对抗技巧</strong>
                </div>
              </l-nav-bar>
              <div class="card-body pb-2">
                <p class="fs-lg">{{model.battleTips}}</p>
              </div>
            </div>

            <div class="card bg-white px-3 mt-3 border-bottom">
              <l-nav-bar class="card-header">
                <div
                  slot="left"
                  class="left d-flex py-3"
                >
                  <i class="moba ico-news"></i>
                  <strong class="fs-xl px-2">团战思路</strong>
                </div>
              </l-nav-bar>
              <div class="card-body pb-2">
                <p class="fs-lg">{{model.teamTips}}</p>
              </div>
            </div>

            <div class="card bg-white px-3 mt-3 border-bottom">
              <l-nav-bar class="card-header">
                <div
                  slot="left"
                  class="left d-flex py-3"
                >
                  <i class="moba ico-news"></i>
                  <strong class="fs-xl px-2">英雄关系</strong>
                </div>
              </l-nav-bar>
              <div class="card-body pb-2">
                <div class="fs-xl">最佳搭档</div>
                <div
                  v-for="item in model.partners"
                  :key="item.name"
                  class="d-flex pt-3"
                >
                  <img
                    :src="item.hero.avatar"
                    alt=""
                    height="50"
                  >
                  <p class="flex-1 ml-3">{{item.description}}</p>
                </div>
                <div class="border-bottom mt-3"></div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      model: null,
      tabControlsOption: {
        tabList: ['英雄初识', '进阶攻略'],
      },
      currentSkillIndex: 0,
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    },
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
  background: #fff no-repeat top center;
  background-size: auto 100%;
  img {
    position: absolute;
    height: 50vw;
    background-size: auto 100%;
  }

  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    position: relative;
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

.btn {
  border: none;
  border-radius: 0.1538rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid #eceef0;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: bold;

  i {
    font-size: 1.6rem;
    margin-right: 0.5rem;
  }
}

.skills {
  img.icon {
    border: 3px solid #fff;
    width: 65px;
    height: 65px;
    &.active {
      border-color: #db9e3f;
      border-radius: 50%;
    }
  }
}

.card {
  .nav-bar {
    box-shadow: none;
  }

  &.hero-items {
    img.icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>