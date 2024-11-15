<template>
  <div>
    <!-- 画布左上角几个按钮 -->
    <div class="panelLayout" style="background: #fff; top: -4px; left: 59px; height: 200px">
      <el-tooltip content="放大" title="放大" placement="left">
        <i class="el-icon-zoom-in" @click="$_zoomIn" />
      </el-tooltip>
      <el-tooltip content="缩小" title="缩小" placement="left">
        <i class="el-icon-zoom-out" @click="$_zoomOut" />
      </el-tooltip>
      <el-tooltip content="大小适应" title="大小适应" placement="left">
        <i class="el-icon-aim" @click="$_zoomReset" />
      </el-tooltip>
      <el-tooltip content="定位还原(大小&定位)" title="定位还原(大小&定位)" placement="left">
        <i class="el-icon-position" @click="$_reset" />
      </el-tooltip>
      <el-tooltip content="上一步" title="上一步" placement="left">
        <i class="el-icon-d-arrow-left" :disabled="undoDisable" @click="$_undo" />
      </el-tooltip>
      <el-tooltip content="下一步" title="下一步" placement="left">
        <i class="el-icon-d-arrow-right" :disabled="redoDisable" @click="$_redo" />
      </el-tooltip>
      <el-tooltip content="小地图" title="小地图" placement="left">
        <i class="el-icon-map-location" @click="$_showMiniMap" />
      </el-tooltip>
      <el-tooltip content="下载图片" title="下载图片" placement="left">
        <i class="el-icon-download" @click="$_download" />
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Control',
  props: {
    lf: Object || String,
    catTurboData: Boolean,
  },
  data() {
    return {
      undoDisable: true,
      redoDisable: true,
      graphData: null,
      dataVisible: false,
    };
  },
  mounted() {
    this.$props.lf.on('history:change', ({ data: { undoAble, redoAble } }) => {
      this.$data.undoDisable = !undoAble;
      this.$data.redoDisable = !redoAble;
    });
  },
  methods: {
    $_zoomIn() {
      this.$props.lf.zoom(true);
    },
    $_zoomOut() {
      this.$props.lf.zoom(false);
    },
    $_zoomReset() {
      this.$props.lf.resetZoom();
    },
    $_translateRest() {
      this.$props.lf.resetTranslate();
    },
    $_reset() {
      this.$props.lf.resetZoom();
      this.$props.lf.resetTranslate();
    },
    $_undo() {
      this.$props.lf.undo();
    },
    $_redo() {
      this.$props.lf.redo();
    },
    $_download() {
      this.$props.lf.extension.snapshot.customCssRules = `
    .lf-canvas-overlay {
      background: #f0f4fb;
    }
  `;
      this.$props.lf.getSnapshot();
    },
    $_catTurboData() {
      this.$emit('catTurboData');
    },
    $_showMiniMap() {
      const { lf } = this.$props;
      lf.extension.miniMap.show(lf.graphModel.width - 175, 220);
    },
  },
};
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

