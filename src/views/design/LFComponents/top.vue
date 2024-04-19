<template>
  <div class="mb15">
    <el-button type="primary" plain @click="viewJsonFunc"> 查看JSON </el-button>
    <el-button v-if="flowDetail.status != '2'" type="primary" :loading="saveLoading" @click="saveFunc"> 保存 </el-button>

    <!-- 查看JSON -->
    <viewJson v-if="showViewJson" :graphData="graphData" @closed="showViewJson = false"></viewJson>
  </div>
</template>

<script setup lang="ts">
import viewJson from './view-json.vue';
import { ref, onMounted, reactive } from 'vue';

const props = defineProps({
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
});

let saveLoading = ref(false);
let graphData = reactive({});
let showViewJson = ref(false);
let debugDisabled = ref(false);

//保存
const saveFunc = () => {};

//查看JSON
const viewJsonFunc = () => {
  graphData = props.lf.getGraphData();
  showViewJson.value = true;
};

onMounted(() => {
  if (!props.flowDetail.flowJson) {
    debugDisabled.value = true;
  }
});
</script>

<style lang="scss" scoped></style>
