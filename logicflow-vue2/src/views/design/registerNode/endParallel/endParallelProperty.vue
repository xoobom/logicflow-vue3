<template>
  <div>
    <el-form ref="propertyForm" :model="propertyForm" :inline-message="true" :rules="rules" label-position="top" :disabled="flowDetail.status == '2'">
      <el-form-item label="名称" prop="name">
        <el-input v-model="propertyForm.name" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="propertyForm.desc" type="textarea" :rows="1">
        </el-input>
      </el-form-item>
    </el-form>
    <div v-if="flowDetail.status != '2'" class="mt15">
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
    //详情
    flowDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      propertyForm: {
        text: '',
        name: '',
        desc: '',
        frontend_status: '',
      },
      rules: {
        name: [
          { required: true, message: '名称不能为空' },
          {
            max: 50,
            message: '最大50字符',
          },
        ],
        desc: [
          {
            max: 50,
            message: '最大50字符',
          },
        ],
      },
      inputCount: 0,
    };
  },
  mounted() {
    this.propertyForm.name = this.nodeData.text.value;
    this.propertyForm.desc = this.nodeData.properties.desc ? this.nodeData.properties.desc : '';
    this.propertyForm.frontend_status = this.nodeData.properties.frontend_status ? this.nodeData.properties.frontend_status : '';
  },
  methods: {
    //确定
    async confirmFunc() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          this.$props.lf.setProperties(this.nodeData.id, {
            name: this.propertyForm.name,
            desc: this.propertyForm.desc,
            frontend_status: this.propertyForm.frontend_status, //0配置错误，1配置正常
          });
          this.$props.lf.updateText(this.nodeData.id, this.propertyForm.name);
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
