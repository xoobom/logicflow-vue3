<template>
  <div>
    <el-drawer :wrapperClosable="false" :visible.sync="showNodeAttribute" direction="rtl" size="550px" append-to-body @closed="closed">
      <template slot="title">
        <div class="unit" :title="title">
          {{ getLabelByValue(nodeData.type, pixelOption, 'value', 'label') }}
        </div>
      </template>
      <div style="padding: 15px 20px">
        <!-- 开始 -->
        <startProperty v-if="nodeData.type === 'start'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />

        <!-- 向量召回 -->
        <assignmentProperty v-if="nodeData.type === 'assignment'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />

        <!-- 协同过滤 -->
        <decisionProperty v-if="nodeData.type === 'decision'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></decisionProperty>

        <!-- swing推荐 -->
        <startParallelProperty v-if="nodeData.type === 'startParallel'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></startParallelProperty>

        <!-- FM训练 -->
        <endParallelProperty v-if="nodeData.type === 'endParallel'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></endParallelProperty>

        <!-- 逻辑回归 -->
        <machineLearningProperty v-if="nodeData.type === 'machineLearning'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></machineLearningProperty>

        <!-- 连线 -->
        <myBezier v-if="nodeData.type === 'myBezier'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></myBezier>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { getLabelByValue } from '@/utils/index';
import { pixelOption } from '@/utils/options';
import startProperty from '../registerNode/start/startProperty.vue';
import assignmentProperty from '../registerNode/assignment/assignmentProperty.vue';
import decisionProperty from '../registerNode/decision/decisionProperty.vue';
import startParallelProperty from '../registerNode/startParallel/startParallelProperty.vue';
import endParallelProperty from '../registerNode/endParallel/endParallelProperty.vue';
import machineLearningProperty from '../registerNode/machineLearning/machineLearningProperty.vue';

import myBezier from '../registerEdge/myBezier.vue';

export default {
  components: {
    startProperty,
    assignmentProperty,
    decisionProperty,
    startParallelProperty,
    endParallelProperty,
    machineLearningProperty,
    myBezier,
  },
  props: {
    //标题
    title: {
      type: String,
      default: '',
    },
    nodeData: Object,
    lf: Object,
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
      getLabelByValue,
      pixelOption,
      showNodeAttribute: true,
      titleTip: '',
    };
  },
  mounted() {
    // console.log(this.nodeData);
    if (this.nodeData.type === 'start') {
      this.titleTip = `
      输入：无<br>
      输出：1条线
      `;
    } else if (this.nodeData.type === 'assignment') {
      this.titleTip = `
      输入：1条线<br>
      输出：1条线
      `;
    } else if (this.nodeData.type === 'decision') {
      this.titleTip = `
      输入：1条线<br>
      输出：多条线，至少2条
      `;
    } else if (this.nodeData.type === 'startParallel') {
      this.titleTip = `
      输入：1条线<br>
      输出：多条线，至少2条
      `;
    } else if (this.nodeData.type === 'endParallel') {
      this.titleTip = `
      输入：多条线，至少2条<br>
      输出：1条线
      `;
    } else if (['machineLearning', 'deepLearning', 'largeModel', 'functions'].includes(this.nodeData.type)) {
      this.titleTip = `
      输入：1条线<br>
      输出：1条线
      `; //原生服务
    } else if (['restService'].includes(this.nodeData.type)) {
      this.titleTip = `
      输入：1条线<br>
      输出：1条线
      `; //连接器
    }
  },
  methods: {
    handleClose() {
      this.$emit('setPropertiesFinish');
    },
    //弹窗关闭
    closed() {
      this.$emit('closed', true);
    },
  },
};
</script>
<style></style>
