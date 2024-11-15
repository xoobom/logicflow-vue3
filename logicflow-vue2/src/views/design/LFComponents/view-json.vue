<template>
  <div>
    <el-dialog title="查看JSON" :visible.sync="showViewJson" width="700px" @closed="closed">
      <div class="json-container">
        <vueJsonPretty :data="graphDataJson" :deep="10" :showLine="false" :virtual="true" :height="500" />
        <div class="json-copy">
          <el-tooltip content="复制" placement="left">
            <i class="el-icon-copy-document" @click="copyFunc(JSON.stringify(graphDataJson))"></i>
          </el-tooltip>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { copyFunc } from '@/utils/index';

export default {
  components: {
    VueJsonPretty,
  },
  props: {
    graphData: Object,
  },
  data() {
    return {
      showViewJson: true,
      graphDataJson: null,
      copyFunc,
    };
  },
  mounted() {
    this.graphDataJson = this.graphData;
  },
  methods: {
    //弹窗关闭
    closed() {
      this.$emit('closed', true);
    },
  },
};
</script>
<style scoped></style>
