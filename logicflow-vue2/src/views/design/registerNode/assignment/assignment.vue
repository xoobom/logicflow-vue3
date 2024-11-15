<template>
  <div class="node-title">
    <span class="node-icon">
      <i class="fa fa-server"></i>
    </span>
    <span class="node-name"><span ref="myNode"></span></span>
  </div>
</template>

<script>
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
      let borderColor = '#1D70F5';
      if (this.properties.frontend_status == '0') {
        borderColor = '#D70016';
      }
      this.$refs.myNode.style.border = `1px solid ${borderColor}`; //stroke边框
    }
  },
};
</script>

<style scoped lang="scss">
.node-icon {
  color: #1d70f5;
  font-size: 16px;
}
</style>
