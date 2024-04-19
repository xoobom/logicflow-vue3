<template>
  <div>
    <el-drawer :wrapperClosable="false" v-model="showNodeAttribute" direction="rtl" size="550px" append-to-body :close-on-click-modal="false" @closed="closed">
      <template #header>
        <div class="unit">{{ getLabelByValue(nodeData.type, pixelOption, 'value', 'label') }}</div>
      </template>
      <div style="padding: 15px 20px">
        <startProperty v-if="nodeData.type === 'start'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />

        <assignmentProperty v-if="nodeData.type === 'assignment'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed" />

        <decisionProperty v-if="nodeData.type === 'decision'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></decisionProperty>

        <startParallelProperty v-if="nodeData.type === 'startParallel'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></startParallelProperty>

        <endParallelProperty v-if="nodeData.type === 'endParallel'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></endParallelProperty>

        <machineLearningProperty v-if="nodeData.type === 'machineLearning'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></machineLearningProperty>

        <deepLearningProperty v-if="nodeData.type === 'deepLearning'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></deepLearningProperty>

        <!-- 连线 -->
        <myBezier v-if="nodeData.type === 'myBezier'" :title="title" :nodeData="nodeData" :lf="lf" :flowDetail="flowDetail" @closed="closed"></myBezier>
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { getLabelByValue } from '@/utils/index';
import { pixelOption } from '@/utils/options';
import startProperty from '../registerNode/start/startProperty.vue';
import assignmentProperty from '../registerNode/assignment/assignmentProperty.vue';
import decisionProperty from '../registerNode/decision/decisionProperty.vue';
import startParallelProperty from '../registerNode/startParallel/startParallelProperty.vue';
import endParallelProperty from '../registerNode/endParallel/endParallelProperty.vue';
import machineLearningProperty from '../registerNode/machineLearning/machineLearningProperty.vue';
import deepLearningProperty from '../registerNode/deepLearning/deepLearningProperty.vue';
import myBezier from '../registerEdge/myBezier.vue';

const props = defineProps({
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
});
const emit = defineEmits();

let showNodeAttribute = ref(true);

//弹窗关闭
const closed = () => {
  emit('closed', true);
};

onMounted(() => {});
</script>
<style></style>
