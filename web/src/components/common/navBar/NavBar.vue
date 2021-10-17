<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LNavBar",
  components: {},
  data() {
    return {

    };
  },
}
</script>

<style lang="scss">
.nav-bar {
  display: flex;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  .left,
  .right {
    width: 100px;
  }
  .right {
    text-align: right;
  }
  .center {
    flex: 1;
  }
}
</style>