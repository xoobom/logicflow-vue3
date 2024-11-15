<template>
  <div class="mb10">
    <div class="top">
      <div>
        <el-button type="primary" plain @click="viewJsonFunc"> 查看JSON </el-button>
        <el-button v-if="flowDetail.status != '2'" type="primary" :loading="saveLoading" @click="saveFunc"> 保存 </el-button>
      </div>
      <div class="top">
        <svg-icon icon-class="logo" class="logo" @click="logoClick" />
      </div>
    </div>
    <!-- 查看JSON -->
    <viewJson v-if="showViewJson" :graphData="graphData" @closed="showViewJson = false"></viewJson>
  </div>
</template>

<script>
import viewJson from './view-json.vue';

export default {
  components: {
    viewJson,
  },
  props: {
    lf: Object,
    //标题
    title: {
      type: String,
      default: '',
    },
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
      topForm: {
        modelOutvalue: '',
        modelMessage: '',
      },
      testRunStart: false,
      showTestRun: false,
      modelFeatures: [],
      runLoading: false,

      modelVersionstate: '',
      modelVersionId: '',
      saveLoading: false,
      showDebug: false,
      graphData: null,
      showViewJson: false,
      debugDisabled: false,
    };
  },

  mounted() {
    if (!this.flowDetail.flowJson) {
      this.debugDisabled = true;
    }
  },
  methods: {
    logoClick() {
      window.location.href = 'https://github.com/xoobom/logicflow-vue3';
    },
    //保存
    saveFunc() {},
    //调试
    debugFunc() {
      this.showDebug = true;
    },
    //查看JSON
    viewJsonFunc() {
      this.graphData = this.lf.getGraphData();
      this.showViewJson = true;
    },
    //校验节点名，不能重复。返回true校验通过false校验不通过
    validNodeName() {
      let arr = [];
      this.lf.getGraphData().nodes.forEach((i) => {
        arr.push(i.text.value);
      });
      // return !arrHasDuplicate(arr);
    },
    //判断json是否有效。返回true校验通过false校验不通过
    validFlowJson() {
      let arr = [];
      this.lf.getGraphData().nodes.forEach((i) => {
        arr.push(i.properties.frontend_status);
      });
      if (arr.includes('0')) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
.logo {
  width: 150px !important;
  height: 40px !important;
  padding: 5px 10px;
  background-color: $--color-primary;
  border-radius: 6px;
  cursor: pointer;
}
</style>
