<template>
  <div ref="myNode" class="node-title">
    <span class="node-icon">
      <svg-icon icon-class="start" />
    </span>
    <span class="node-name"><span></span></span>
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
    let borderColor = variables.dragNodeBorderColor;
    
    if (this.properties.frontend_status == '0') {
      borderColor = variables.dangerColor;
    }
    this.$refs.myNode.style.border = `1px solid ${borderColor}`; //stroke边框
  },
};
</script>

<style scoped lang="scss">
.node-icon {
  color: #6bd452;
  font-size: 17px;
}
</style>
