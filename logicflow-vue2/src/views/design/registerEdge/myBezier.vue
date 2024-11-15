<template>
  <div>
    <el-form ref="propertyForm" :model="propertyForm" :inline-message="true" :rules="rules" label-position="top">
      <el-form-item label="连线类型" prop="id">
        <el-select v-model="propertyForm.id" style="width: 300px" :disabled="edgeTypeDisabled" @change="idChange">
          <el-option v-for="(x, index) in edgeTypeOption" :key="index" :disabled="x.disabled" :value="x.id" :label="x.label" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="mt15">
      <el-button @click="cancelFunc">
        取消
      </el-button>
      <el-button type="primary" @click="confirmFunc">
        确定
      </el-button>
    </div>
  </div>
</template>
<script>

export default {
  components: {},
  props: {
    nodeData: Object,
    lf: Object || String,
  },
  data() {
    return {
      propertyForm: {
        id: '',
        edgeType: '',
      },
      rules: {
        id: [{ required: true, message: '连线类型不能为空' }],
      },
      edgeTypeOption: [],
      edgeTypeDisabled: false,
    };
  },
  mounted() {
    // console.log(JSON.parse(JSON.stringify(this.lf.getGraphData())));
    this.propertyForm.edgeType = this.nodeData.properties.edgeType ? this.nodeData.properties.edgeType : '';

  },
  methods: {
    //获取源节点
    getSourceNode(sourceNodeId) {
      return this.lf.getGraphData().nodes.filter((i) => {
        return i.id === sourceNodeId;
      })[0];
    },
    //连线类型选择
    idChange() {
      this.propertyForm.edgeType = this.edgeTypeOption.filter((i) => {
        return i.id == this.propertyForm.id;
      })[0].label;
    },
    //确定
    async confirmFunc() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          this.$props.lf.setProperties(this.nodeData.id, {
            decisionId: this.propertyForm.id,
            edgeType: this.propertyForm.edgeType,
          });
          this.$props.lf.updateText(this.nodeData.id, this.propertyForm.edgeType);
          this.$emit('closed');
        }
      });
    },
    //取消
    cancelFunc() {
      this.$emit('closed');
    },
  },
};
</script>
<style scoped></style>
