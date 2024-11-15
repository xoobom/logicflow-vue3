<template>
  <div class="app-container">
    <!-- <el-page-header :content="$route.query.flowName" class="mb10" @back="backFunc" /> -->
    <!-- 顶部 -->
    <top v-if="flowDetail" :title="title" :lf="lf" :flowDetail="flowDetail"></top>
    <div class="logic-flow-view">
      <!-- 工具栏 -->
      <Control v-if="lf" class="demo-control" :lf="lf"></Control>
      <!-- 左侧面板 -->
      <NodePanel v-if="lf" :lf="lf" :title="title"></NodePanel>
      <!-- 画布 -->
      <div id="LF-view" ref="container"></div>
      <!-- 属性面板 -->
      <PropertyDialog v-if="showAttribute" :title="title" :nodeData="nodeData" :flowDetail="flowDetail" :lf="lf" @closed="showAttribute = false">
      </PropertyDialog>
    </div>
  </div>
</template>
<script>
import LogicFlow from '@logicflow/core';
import { Menu, Snapshot, MiniMap } from '@logicflow/extension';
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';
import start from './registerNode/start/start.js';
import assignment from './registerNode/assignment/assignment.js';
import registerBezier from './registerEdge/registerBezier';
import machineLearning from './registerNode/machineLearning/machineLearning.js';
import decision from './registerNode/decision/decision.js';
import startParallel from './registerNode/startParallel/startParallel.js';
import endParallel from './registerNode/endParallel/endParallel.js';
import variables from '@/styles/variables.scss';
const PropertyDialog = () => import('./PropertySetting/PropertyDialog.vue'); //懒加载
const NodePanel = () => import('./LFComponents/NodePanel.vue'); //懒加载
const Control = () => import('./LFComponents/Control.vue'); //懒加载
const top = () => import('./LFComponents/top.vue'); //懒加载

export default {
  name: 'LF',
  components: {
    NodePanel,
    Control,
    PropertyDialog,
    top,
  },
  props: {
    //标题
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      lf: null,
      showAddPanel: false,
      addPanelStyle: {
        top: 0,
        left: 0,
      },
      nodeData: null,
      addClickNode: null,
      showAttribute: false,
      dataVisible: false,
      config: {
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
      },
      flowDetail: null,
    };
  },
  mounted() {
    this.$_initLf();
  },
  methods: {
    $_initLf() {
      // 画布配置
      const lf = new LogicFlow({
        ...this.config,
        plugins: [Menu, MiniMap, Snapshot],
        container: this.$refs.container,
      });
      this.lf = lf;
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
      this.$_registerNode();
    },
    // 自定义
    $_registerNode() {
      start(this.lf);
      assignment(this.lf);
      decision(this.lf);
      startParallel(this.lf);
      endParallel(this.lf);
      machineLearning(this.lf);
      this.lf.register(registerBezier);
      this.$_render();
    },
    $_render() {
      let flowJson = {
        'flowJson': {
          'nodes': [
            {
              'id': '1711093934582531471',
              'type': 'start',
              'x': 570,
              'y': 60,
              'properties': {
                'name': '开始',
                'variables': [
                  {
                    'id': '1711093950732881898',
                    'name': 'a',
                    'dataType': 'string',
                    'isArray': false,
                    'defaultValue': null,
                    'desc': '',
                    'extType': '',
                  },
                ],
                'inputVariables': [
                  {
                    'id': '1711093950732881898',
                    'name': 'a',
                  },
                ],
                'outputVariables': [
                  {
                    'id': '1711093950732881898',
                    'name': 'a',
                  },
                ],
                'structs': [],
                'frontend_status': '1',
                'desc': '',
              },
              'text': {
                'x': 570,
                'y': 60,
                'value': '开始',
              },
            },
            {
              'id': '1711093939851660406',
              'type': 'assignment',
              'x': 500,
              'y': 170,
              'properties': {
                'name': '向量召回',
                'desc': '',
                'frontend_status': '1',
                'assignList': [
                  {
                    'field': 'a',
                    'operator': '=',
                    'value': 'a',
                  },
                ],
              },
              'text': {
                'x': 500,
                'y': 170,
                'value': '向量召回',
              },
            },
          ],
          'edges': [
            {
              'id': '1711093944702675531',
              'type': 'myBezier',
              'sourceNodeId': '1711093934582531471',
              'targetNodeId': '1711093939851660406',
              'startPoint': {
                'x': 570,
                'y': 80,
              },
              'endPoint': {
                'x': 500,
                'y': 150,
              },
              'properties': {
                'edgeType': 'start',
              },
              'pointsList': [
                {
                  'x': 570,
                  'y': 80,
                },
                {
                  'x': 570,
                  'y': 180,
                },
                {
                  'x': 500,
                  'y': 50,
                },
                {
                  'x': 500,
                  'y': 150,
                },
              ],
            },
          ],
        },
        'flowId': '8495158923089789043',
        'flowName': '的人',
      };
      this.flowDetail = {
        'id': '8495158923089789043',
        'isDel': '0',
        'created': '2024-03-20 14:19:33',
        'updated': '2024-03-22 15:52:49',
        'createBy': 'admin',
        'updateBy': 'admin',
        'flowName': '的人',
        'flowType': 1,
        'flowJson': '{"flowJson":{"nodes":[{"id":"1711093934582531471","type":"start","x":570,"y":60,"properties":{"name":"开始","variables":[{"id":"1711093950732881898","name":"a","dataType":"string","isArray":false,"defaultValue":null,"desc":"","extType":""}],"inputVariables":[{"id":"1711093950732881898","name":"a"}],"outputVariables":[{"id":"1711093950732881898","name":"a"}],"structs":[],"frontend_status":"1","desc":""},"text":{"x":570,"y":60,"value":"开始"}},{"id":"1711093939851660406","type":"assignment","x":500,"y":170,"properties":{"name":"向量召回","desc":"","frontend_status":"1","assignList":[{"field":"a","operator":"=","value":"a"}]},"text":{"x":500,"y":170,"value":"向量召回"}}],"edges":[{"id":"1711093944702675531","type":"myBezier","sourceNodeId":"1711093934582531471","targetNodeId":"1711093939851660406","startPoint":{"x":570,"y":80},"endPoint":{"x":500,"y":150},"properties":{"edgeType":"start"},"pointsList":[{"x":570,"y":80},{"x":570,"y":180},{"x":500,"y":50},{"x":500,"y":150}]}]},"flowId":"8495158923089789043","flowName":"的人"}',
        'desc': '',
        'status': 1,
        'groupId': '8488695340906430596',
        'deptName': '测试',
      };
      this.lf.render(flowJson.flowJson); //回显
      this.$_LfEvent();
    },
    $_getData() {
      const data = this.lf.getGraphData();
    },
    $_LfEvent() {
      this.lf.on('node:dbclick', ({ data }) => {
        this.$data.nodeData = data;
        if (['start', 'assignment', 'decision', 'startParallel', 'endParallel', 'machineLearning'].includes(data.type)) {
          this.$data.showAttribute = true;
        }
      });
      this.lf.on('edge:dbclick', ({ data }) => {
        this.$data.nodeData = data;
        this.$data.showAttribute = true;
      });
      //来自边的事件中心发出的事件
      this.lf.on('edge:app-config', (res) => {
        this.$data.nodeData = res;
        this.$data.showAttribute = true;
      });
      this.lf.on('element:click', () => {
        this.hideAddPanel();
      });
      this.lf.on('blank:click', () => {
        this.hideAddPanel();
      });
      this.lf.on('connection:not-allowed', (data) => {
        if (data.msg) {
          this.$message({
            type: 'error',
            message: data.msg,
            duration: 8000,
          });
        }
      });

      this.lf.on('edge:add', ({ data }) => {
        this.setEdgeType(data);
      });

      this.lf.on('edge:delete', ({ data }) => {
      });
    },
    //设置边类型
    setEdgeType(data) {
      let sourceNode = this.lf.getGraphData().nodes.filter((i) => {
        return i.id === data.sourceNodeId;
      })[0];
      if (sourceNode.type == 'start') {
        this.lf.setProperties(data.id, {
          edgeType: 'start',
        });
      } else if (sourceNode.type == 'assignment') {
        this.lf.setProperties(data.id, {
          edgeType: 'nextStep',
        });
      } else if (sourceNode.type == 'decision') {
        // let arr = []; //所有决策条件
        // arr.push(sourceNode.properties.decisions.defaultDecision);
        // sourceNode.properties.decisions.decisionConditions.forEach((i) => {
        //   arr.push(i.name);
        // });
        // this.lf.updateText(data.id, sourceNode.properties.decisions.defaultDecision);
        this.lf.setProperties(data.id, {
          type: 'decision', //边类型
          edgeType: '',
          // edgeType: sourceNode.properties.decisions.defaultDecision,
          // decisionId: sourceNode.properties.decisions.id,
        });
      } else {
        this.lf.setProperties(data.id, {
          edgeType: 'nextStep',
        });
      }
    },
    clickPlus(e, attributes) {
      e.stopPropagation();
      const { clientX, clientY } = e;
      this.$data.addPanelStyle.top = clientY - 40 + 'px';
      this.$data.addPanelStyle.left = clientX + 'px';
      this.$data.showAddPanel = true;
      this.$data.addClickNode = attributes;
    },
    mouseDownPlus(e, attributes) {
      e.stopPropagation();
    },
    hideAddPanel() {
      this.$data.showAddPanel = false;
      this.$data.addPanelStyle.top = 0;
      this.$data.addPanelStyle.left = 0;
      this.$data.addClickNode = null;
    },
    //返回
    // backFunc() {
    //   this.$router.back();
    // },
  },
};
</script>
<style>
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

@keyframes lf_animate_dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
