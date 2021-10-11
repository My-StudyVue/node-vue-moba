<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  /* justify-content: space-around; */
  background-color: #f6f6f6;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 阴影 */
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.8);
}
</style>