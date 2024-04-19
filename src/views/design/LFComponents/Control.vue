<template>
  <div>
    <!-- 画布左上角几个按钮 -->
    <div class="panelLayout" style="background: #fff; top: -4px; left: 59px; height: 200px">
      <el-tooltip content="放大" title="放大" placement="left">
        <el-icon @click="$_zoomIn"><ZoomIn /></el-icon>
      </el-tooltip>
      <el-tooltip content="缩小" title="缩小" placement="left">
        <el-icon @click="$_zoomOut"><ZoomOut /></el-icon>
      </el-tooltip>
      <el-tooltip content="大小适应" title="大小适应" placement="left">
        <el-icon @click="$_zoomReset"><Aim /></el-icon>
      </el-tooltip>
      <el-tooltip content="定位还原(大小&定位)" title="定位还原(大小&定位)" placement="left">
        <el-icon @click="$_reset"><Position /></el-icon>
      </el-tooltip>
      <el-tooltip content="上一步" title="上一步" placement="left">
        <el-icon :disabled="undoDisable" @click="$_undo"><DArrowLeft /></el-icon>
      </el-tooltip>
      <el-tooltip content="下一步" title="下一步" placement="left">
        <el-icon :disabled="redoDisable" @click="$_redo"><DArrowRight /></el-icon>
      </el-tooltip>
      <el-tooltip content="小地图" title="小地图" placement="left">
        <el-icon @click="$_showMiniMap"><MapLocation /></el-icon>
      </el-tooltip>
      <el-tooltip content="下载图片" title="下载图片" placement="left">
        <el-icon @click="$_download"><Download /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

const props = defineProps({
  lf: Object,
  catTurboData: Boolean,
});
const emit = defineEmits();
let undoDisable = ref(true);
let redoDisable = ref(true);
let graphData = ref(null);
let dataVisible = ref(false);

let $_zoomIn = () => {
  props.lf.zoom(true);
};

let $_zoomOut = () => {
  props.lf.zoom(false);
};

let $_zoomReset = () => {
  props.lf.resetZoom();
};

let $_reset = () => {
  props.lf.resetZoom();
  props.lf.resetTranslate();
};

let $_undo = () => {
  props.lf.undo();
};

let $_redo = () => {
  props.lf.redo();
};

let $_download = () => {
  props.lf.extension.snapshot.customCssRules = `
    .lf-canvas-overlay {
      background: #f0f4fb;
    }
  `;
  props.lf.getSnapshot();
};

let $_showMiniMap = () => {
  props.lf.extension.miniMap.show(props.lf.graphModel.width - 155, 220);
};

onMounted(() => {
  props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
    undoDisable.value = !undoAble;
    redoDisable.value = !redoAble;
  });
});
</script>
<style lang="scss" scoped>
// 自动布局按钮位置控制
.panelLayout {
  height: 130px;
  width: 30px;
  background: #f3f5f8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 6px;
  left: 10px;
  z-index: 999;
  padding: 4px 0;
  box-shadow: 3px 0 10px 1px rgb(228, 224, 219);
  i {
    cursor: pointer;
  }
}
</style>
