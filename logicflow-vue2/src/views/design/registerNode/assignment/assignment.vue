<template>
  <div class="node-title">
    <span class="node-icon">
      <svg-icon icon-class="assignment" />
    </span>
    <span class="node-name"><span ref="myNode"></span></span>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss';
export default {
  props: {
    properties: Object,
  },
  methods: {},
  mounted() {
    if (this.properties.frontend_status) {
      let borderColor = variables.dragNodeBorderColor;
      if (this.properties.frontend_status == '0') {
        borderColor = variables.errorColor;
      }
      this.$refs.myNode.style.border = `1px solid ${borderColor}`; //stroke边框
    }
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
.node-icon {
  color: $--color-primary;
  font-size: 19px;
}
</style>
