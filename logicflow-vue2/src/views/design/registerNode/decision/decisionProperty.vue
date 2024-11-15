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
      showTip: false,
      decisionTreeProps: {
        children: 'children',
        label: 'name',
      },
      addIndex: 0,
      propertyForm: {
        name: '',
        desc: '',
        decisions: {
          decisionConditions: [
            {
              id: '',
              name: '默认',
              value: 'defaultDecision',
              conditions: [],
              conjunction: 'and',
            },
          ],
          id: '',
          defaultDecision: 'defaultDecision',
        },
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
      showGlobalContext: false,
      globalContextFlag: '',
      showDecisionEdit: false,
      decisionEditRow: null,
      decisionEditIndex: 0,
      decisionSelectRow: {
        name: '默认',
      },
      tableIndex: null,
    };
  },
  mounted() {
    //方便联调
    this.propertyForm.name = this.nodeData.text.value;
    this.propertyForm.desc = this.nodeData.properties.desc ? this.nodeData.properties.desc : '';
    this.propertyForm.decisions.defaultDecision = this.nodeData.properties.decisions.defaultDecision ? this.nodeData.properties.decisions.defaultDecision : 'defaultDecision';
    this.propertyForm.decisions.id = this.nodeData.properties.decisions.id ? this.nodeData.properties.decisions.id : '';
  },
  methods: {
    //确定
    async confirmFunc() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          let decisionConditions = [];
          this.propertyForm.decisions.decisionConditions.forEach((i, index) => {
            if (index >= 1) {
              // let conditions = [];
              // i.conditions.forEach((j) => {
              //   conditions.push(`${j.resource} ${j.comparison} ${j.value}`);
              // });
              decisionConditions.push({
                id: i.id,
                name: i.name,
                conditions: i.conditions,
                conjunction: i.conjunction,
              });
            }
          });
          this.$props.lf.setProperties(this.nodeData.id, {
            name: this.propertyForm.name,
            desc: this.propertyForm.desc,
            decisions: {
              decisionConditions: decisionConditions,
              id: this.propertyForm.decisions.id,
              defaultDecision: this.propertyForm.decisions.defaultDecision,
            },
            frontend_status: '1', //0配置错误，1配置正常
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
<style lang="scss" scoped>
.decision-icon {
  margin-right: 5px;
}
.custom-tree-node {
  .tree-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 110px;
    display: inline-block;
  }
}
</style>
