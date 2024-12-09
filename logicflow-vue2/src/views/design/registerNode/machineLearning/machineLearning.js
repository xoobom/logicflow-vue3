import Vue from 'vue';
import machineLearning from './machineLearning.vue';
import { randomNumber } from '@/utils/index.js';
let nodeNameZh = '';

export default function registerConnect(lf) {
  lf.register('machineLearning', ({ HtmlNode, HtmlNodeModel }) => {
    class RuleNode extends HtmlNode {
      setHtml(rootEl) {
        const { model } = this.props;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
        const Profile = Vue.extend({
          render: function (h) {
            return h(machineLearning, {
              props: {
                properties: model.properties,
              },
              on: {
                'select-button': (type) => {
                  console.log('select-button', type);
                },
              },
            });
          },
        });
        new Profile().$mount(el);
      }
    }
    class RuleModel extends HtmlNodeModel {
      createId() {
        return randomNumber(); //id用随机数数字
      }
      constructor(data, graphModel) {
        super(data, graphModel);
        // 右键菜单自由配置，也可以通过边的properties或者其他属性条件更换不同菜单
        this.menu = [
          {
            text: '删除',
            callback(node) {
              lf.deleteNode(node.id);
            },
          },
          {
            text: '复制',
            callback(node) {
              lf.cloneNode(node.id);
            },
          },
        ];
      }
      getDefaultAnchor() {
        const { id, x, y, width, height } = this;
        const anchors = [];
        anchors.push({
          x,
          y: y - height / 2,
          id: `${id}_incomming`,
          type: 'incomming',
        });
        anchors.push({
          x,
          y: y + height / 2,
          id: `${id}_outgoing`,
          type: 'outgoing',
        });
        return anchors;
      }
      initNodeData(data) {
        super.initNodeData(data);
        const width = 140;
        const height = 40;
        this.width = width;
        this.height = height;
        this.radius = 50;
        this.targetRules = [
          // {
          //   message: `【${nodeNameZh}】只允许一个输入`,
          //   validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          //     const edges = this.graphModel.getNodeIncomingEdge(targetNode.id);
          //     if (edges.length >= 1) {
          //       return false;
          //     } else {
          //       return true;
          //     }
          //   },
          // },
          // {
          //   message: '输入不允许连接输入',
          //   validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          //     return sourceAnchor.type === 'outgoing';
          //   },
          // },
        ];

        this.sourceRules = [
          // {
          //   message: `【${nodeNameZh}】只允许1个输出`,
          //   validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          //     const edges = this.graphModel.getNodeOutgoingEdge(sourceNode.id);
          //     if (edges.length >= 1) return false;
          //     return true;
          //   },
          // },
          // {
          //   message: '输出不允许连接输出',
          //   validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
          //     return targetAnchor.type === 'incomming';
          //   },
          // },
        ];
      }
    }
    return {
      view: RuleNode,
      model: RuleModel,
    };
  });
}
