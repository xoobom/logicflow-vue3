<template>
  <div class="app-container">
    <!-- 顶部 -->
    <top v-if="showTop" :title="title" :lf="lf" :flowDetail="flowDetail"></top>
    <div class="logic-flow-view">
      <!-- 工具栏 -->
      <Control v-if="showLf" class="demo-control" :lf="lf"></Control>
      <!-- 左侧面板 -->
      <NodePanel v-if="showLf" :lf="lf" :title="title"></NodePanel>
      <!-- 画布 -->
      <div id="LF-view" ref="container"></div>
      <!-- 属性面板 -->
      <PropertyDialog v-if="showAttribute" :title="title" :nodeData="nodeData" :flowDetail="flowDetail" :lf="lf" @closed="showAttribute = false"> </PropertyDialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import LogicFlow from '@logicflow/core';
import { Menu, Snapshot, MiniMap } from '@logicflow/extension';
import '@logicflow/core/lib/style/index.css';
import '@logicflow/extension/lib/style/index.css';
import start from './registerNode/start/start.ts';
import assignment from './registerNode/assignment/assignment.ts';
import registerBezier from './registerEdge/registerBezier.ts';
import machineLearning from './registerNode/machineLearning/machineLearning.ts';
import deepLearning from './registerNode/deepLearning/deepLearning.ts';
import decision from './registerNode/decision/decision.ts';
import startParallel from './registerNode/startParallel/startParallel.ts';
import endParallel from './registerNode/endParallel/endParallel.ts';
import variables from '@/assets/styles/variables.module.scss';
import { getNodeOutputCount, getNodeInputCount } from '@/utils/index';
import PropertyDialog from './PropertySetting/PropertyDialog.vue';
import NodePanel from './LFComponents/NodePanel.vue';
import Control from './LFComponents/Control.vue';
import top from './LFComponents/top.vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
});

let lf = reactive({});
let showAddPanel = ref(false);
let addPanelStyle = reactive({
  top: 0,
  left: 0,
});
let nodeData = ref(null);
let addClickNode = ref(null);
let showAttribute = ref(false);
let dataVisible = ref(false);
let config = reactive({
  background: {
    backgroundColor: variables.dragPanelBgColor,
  },
  grid: {
    size: 10,
    visible: false,
  },
  keyboard: {
    enabled: true,
  },
  adjustEdge: false, //允许调整边
  adjustEdgeStartAndEnd: false, //是否允许拖动边的端点来调整连线
  edgeSelectedOutline: true, //鼠标 hover 的时候显示边的外框
  // edgeTextDraggable: true,
  hoverOutline: false,
  nodeTextEdit: false, //节点是否可编辑。false不可编辑
  edgeTextEdit: false, //边是否可编辑。false不可编辑
  autoExpand: false, //点拖动靠近画布边缘时是否自动扩充画布
  textEdit: false, //是否开启文本编辑
  snapline: false, //对齐线。false不开启
});
let flowDetail = reactive({});
let container = ref(null);
let showLf = ref(false);
let showTop = ref(false);

const $_initLf = () => {
  // 画布配置
  const myLf = new LogicFlow({
    ...config,
    plugins: [Menu, MiniMap, Snapshot],
    container: container.value,
  });
  lf = myLf;
  showLf.value = true;
  // 设置主题
  lf.setTheme({
    baseNode: {
      fill: '#FFFFFF',
      stroke: '#000000',
      strokeWidth: 1,
    },
    circle: {
      stroke: '#000000',
      strokeWidth: 1,
    },
    rect: {
      fill: '#FFFFFF',
      stroke: '#000000',
      outlineColor: '#88f',
      strokeWidth: 1,
    },
    polygon: {
      strokeWidth: 1,
    },
    polyline: {
      stroke: '#000000',
      hoverStroke: '#000000',
      selectedStroke: '#000000',
      strokeWidth: 1,
    },
    nodeText: {
      color: '#000000',
      overflowMode: 'ellipsis', //超出显示省略号
      padding: '0 15px',
      fontSize: 14,
    },
    edgeText: {
      color: '#000000',
      background: {
        fill: variables.dragPanelBgColor,
      },
    },
  });
  lf.setDefaultEdgeType('myBezier'); //线类型，贝塞尔曲线
  $_registerNode();
};

// 自定义
const $_registerNode = () => {
  start(lf);
  assignment(lf);
  decision(lf);
  startParallel(lf);
  endParallel(lf);
  machineLearning(lf);
  deepLearning(lf);
  lf.register(registerBezier);
  $_render();
};

const $_render = () => {
  let flowJson = {
    nodes: [
      {
        id: '1706150553091901403',
        type: 'start',
        x: 660,
        y: 70,
        properties: {
          variables: [],
          structs: [],
          frontend_status: '0',
          name: '开始',
          outputVariables: [
            {
              name: 'result',
              id: '1709022828123856947',
            },
          ],
          inputVariables: [
            {
              id: '1711610228272357459',
              name: 'filesInfo',
            },
          ],
          desc: '',
        },
        text: {
          x: 660,
          y: 70,
          value: '开始',
        },
      },
      {
        id: '1713515657342573573',
        type: 'assignment',
        x: 730,
        y: 260,
        properties: {
          name: '节点1-1',
          desc: '',
          frontend_status: '1',
        },
        text: {
          x: 730,
          y: 260,
          value: '节点1-1',
        },
      },
      {
        id: '1713515658627306263',
        type: 'startParallel',
        x: 500,
        y: 250,
        properties: {
          name: '节点1-3',
          desc: '',
          frontend_status: '0',
        },
        text: {
          x: 500,
          y: 250,
          value: '节点1-3',
        },
      },
    ],
    edges: [
      {
        id: '1713515662842706019',
        type: 'myBezier',
        sourceNodeId: '1706150553091901403',
        targetNodeId: '1713515658627306263',
        startPoint: {
          x: 660,
          y: 90,
        },
        endPoint: {
          x: 500,
          y: 230,
        },
        properties: {
          edgeType: 'start',
        },
        pointsList: [
          {
            x: 660,
            y: 90,
          },
          {
            x: 660,
            y: 190,
          },
          {
            x: 500,
            y: 130,
          },
          {
            x: 500,
            y: 230,
          },
        ],
      },
      {
        id: '1713515665489870839',
        type: 'myBezier',
        sourceNodeId: '1706150553091901403',
        targetNodeId: '1713515657342573573',
        startPoint: {
          x: 660,
          y: 90,
        },
        endPoint: {
          x: 730,
          y: 240,
        },
        properties: {
          edgeType: 'start',
        },
        pointsList: [
          {
            x: 660,
            y: 90,
          },
          {
            x: 660,
            y: 190,
          },
          {
            x: 730,
            y: 140,
          },
          {
            x: 730,
            y: 240,
          },
        ],
      },
    ],
  };

  flowDetail = {
    flowName: '测试',
    flowId: '1',
    flowJson: {
      nodes: [
        {
          id: '1706150553091901403',
          type: 'start',
          x: 660,
          y: 70,
          properties: {
            variables: [],
            structs: [],
            frontend_status: '0',
            name: '开始',
            outputVariables: [{ name: 'result', id: '1709022828123856947' }],
            inputVariables: [{ id: '1711610228272357459', name: 'filesInfo' }],
            desc: '',
          },
          text: { x: 660, y: 70, value: '开始' },
        },
        { id: '1713515657342573573', type: 'assignment', x: 730, y: 260, properties: { name: '节点1-1', desc: '', frontend_status: '1' }, text: { x: 730, y: 260, value: '节点1-1' } },
        { id: '1713515658627306263', type: 'startParallel', x: 500, y: 250, properties: { name: '节点1-3', desc: '', frontend_status: '0' }, text: { x: 500, y: 250, value: '节点1-3' } },
      ],
      edges: [
        {
          id: '1713515662842706019',
          type: 'myBezier',
          sourceNodeId: '1706150553091901403',
          targetNodeId: '1713515658627306263',
          startPoint: { x: 660, y: 90 },
          endPoint: { x: 500, y: 230 },
          properties: { edgeType: 'start' },
          pointsList: [
            { x: 660, y: 90 },
            { x: 660, y: 190 },
            { x: 500, y: 130 },
            { x: 500, y: 230 },
          ],
        },
        {
          id: '1713515665489870839',
          type: 'myBezier',
          sourceNodeId: '1706150553091901403',
          targetNodeId: '1713515657342573573',
          startPoint: { x: 660, y: 90 },
          endPoint: { x: 730, y: 240 },
          properties: { edgeType: 'start' },
          pointsList: [
            { x: 660, y: 90 },
            { x: 660, y: 190 },
            { x: 730, y: 140 },
            { x: 730, y: 240 },
          ],
        },
      ],
    },
  };
  showTop.value = true;
  lf.render(flowJson); //回显
  $_LfEvent();
};

const $_LfEvent = () => {
  lf.on('node:dbclick', ({ data }) => {
    nodeData.value = data;
    if (['start', 'assignment', 'decision', 'startParallel', 'endParallel', 'machineLearning', 'deepLearning'].includes(data.type)) {
      showAttribute.value = true;
    }
  });
  lf.on('edge:dbclick', ({ data }) => {
    nodeData.value = data;
    showAttribute.value = true;
  });
  //来自边的事件中心发出的事件
  lf.on('edge:app-config', (res) => {
    nodeData.value = res;
    showAttribute.value = true;
  });
  lf.on('element:click', () => {
    hideAddPanel();
  });
  lf.on('blank:click', () => {
    hideAddPanel();
  });
  lf.on('connection:not-allowed', (data) => {
    if (data.msg) {
      ElMessage({
        type: 'error',
        message: data.msg,
        duration: 8000,
      });
    }
  });

  lf.on('edge:add', ({ data }) => {
    setEdgeType(data);
    setStartParallelStatus(data);
    setEndParallelStatus(data);
  });

  lf.on('edge:delete', ({ data }) => {
    setStartParallelStatus(data);
    setEndParallelStatus(data);
  });
};

const hideAddPanel = () => {
  showAddPanel.value = false;
  addPanelStyle.top = 0;
  addPanelStyle.left = 0;
  addClickNode.value = null;
};

//设置边类型
const setEdgeType = (data) => {
  let sourceNode = lf.getGraphData().nodes.filter((i) => {
    return i.id === data.sourceNodeId;
  })[0];
  if (sourceNode.type == 'start') {
    lf.setProperties(data.id, {
      edgeType: 'start',
    });
  } else if (sourceNode.type == 'assignment') {
    lf.setProperties(data.id, {
      edgeType: 'nextStep',
    });
  } else if (sourceNode.type == 'decision') {
    lf.setProperties(data.id, {
      type: 'decision', //边类型
      edgeType: '',
    });
  } else {
    lf.setProperties(data.id, {
      edgeType: 'nextStep',
    });
  }
};

//设置并行开始节点状态
const setStartParallelStatus = (data) => {
  let graphData = lf.getGraphData();
  graphData.nodes.forEach((i) => {
    if (i.type == 'startParallel') {
      if (i.id == data.sourceNodeId) {
        let count = getNodeOutputCount(graphData, i);
        if (count >= 2) {
          lf.setProperties(data.sourceNodeId, {
            frontend_status: '1', //0配置错误，1配置正常
          });
        } else {
          lf.setProperties(data.sourceNodeId, {
            frontend_status: '0', //0配置错误，1配置正常
          });
        }
      }
    }
  });
};

//设置并行结束节点状态
const setEndParallelStatus = (data) => {
  let graphData = lf.getGraphData();
  graphData.nodes.forEach((i) => {
    if (i.type == 'endParallel') {
      if (i.id == data.targetNodeId) {
        let count = getNodeInputCount(graphData, i);
        if (count >= 2) {
          lf.setProperties(data.targetNodeId, {
            frontend_status: '1', //0配置错误，1配置正常
          });
        } else {
          lf.setProperties(data.targetNodeId, {
            frontend_status: '0', //0配置错误，1配置正常
          });
        }
      }
    }
  });
};

onMounted(() => {
  $_initLf();
});
</script>
<style lang="scss">
@import '@/assets/styles/variables.module.scss';
.logic-flow-view {
  height: 85vh;
  position: relative;
}
.demo-title {
  text-align: center;
  margin: 20px;
}
.demo-control {
  position: absolute;
  top: 15px;
  right: 100px;
  z-index: 2;
}
#LF-view {
  width: 100%;
  height: 100%;
  outline: none;
}
.time-plus {
  cursor: pointer;
}
.add-panel {
  position: absolute;
  z-index: 11;
  background-color: white;
  padding: 10px 5px;
}
.el-drawer__body {
  height: 80%;
  overflow: auto;
  margin-top: -30px;
  z-index: 3;
}

.lf-node-text-auto-wrap {
  cursor: pointer;
}

/* 适应节点图标 */
.lf-node-text-ellipsis-content {
  padding: 0 8px 0 34px !important;
}
.node-title {
  height: 40px;
  width: 100%;
  background: #fff;
  border: 1px solid #e6f7ff;
  box-sizing: border-box;
  padding: 10px 10px 10px 6px;
  border-radius: 8px;
  cursor: pointer;
}
.node-icon {
  width: 26px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.node-name > span {
  border: none !important;
}

//logicflow小地图
.lf-mini-map {
  border-radius: $appRadius;
  border: none !important;
  box-shadow: 3px 0 10px 1px rgb(228, 224, 219);
}

.lf-mini-map-header {
  border: none !important;
  font-size: 13px;
  height: 24px !important;
  line-height: 24px !important;
  // color: #fff;
  background-color: #ecf5ff !important;
  background-image: none !important;
}

.lf-mini-map-close {
  top: 2px !important;
}

@keyframes lf_animate_dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
