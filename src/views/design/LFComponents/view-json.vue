<template>
  <div>
    <el-dialog
      title="查看JSON"
      v-model="showViewJson"
      width="700px"
      top="15px"
      append-to-body
      @closed="closed"
    >
      <div class="json-container">
        <vueJsonPretty
          :data="graphDataJson"
          :deep="10"
          :showLine="false"
          :virtual="true"
          :height="500"
        />
        <div class="json-copy">
          <el-tooltip content="复制" placement="left">
            <el-icon @click="copyFunc(JSON.stringify(graphDataJson))"
              ><CopyDocument
            /></el-icon>
          </el-tooltip>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { copyFunc } from "@/utils/index";
import { CopyDocument } from "@element-plus/icons-vue";
import { ref, onMounted, reactive } from "vue";

const props = defineProps({
  graphData: Object,
});
const emit = defineEmits();

let showViewJson = ref(true);
let graphDataJson = reactive({});

//弹窗关闭
const closed = () => {
  emit("closed", true);
};

onMounted(() => {
  graphDataJson = {
    flowName: "测试",
    flowId: "1",
    flowJson: props.graphData,
  };
});
</script>
<style scoped></style>
