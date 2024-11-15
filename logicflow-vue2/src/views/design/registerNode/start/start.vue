<template>
  <div ref="myNode" class="node-title">
    <span class="node-icon">
      <i class="fa fa-play-circle"></i>
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
  methods: {
    done(type) {
      this.$emit('select-button', type);
    },
  },
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
  color: #6bd452;
}
</style>
