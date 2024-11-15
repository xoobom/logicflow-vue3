<template>
  <div>
    <div ref="myNode" class="node-title">
      <span class="node-icon">
        <svg-icon icon-class="startParallel" />
      </span>
    </div>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss';
export default {
  props: {
    properties: Object,
  },
  data() {
    return {};
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
.node-icon {
  font-size: 16px;
}
</style>
