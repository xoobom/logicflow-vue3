import Vue from 'vue';
import start from './start.vue';
import { randomNumber } from '@/utils/index.js';
let nodeNameZh = '开始';

export default function registerConnect(lf) {
  lf.register('start', ({ HtmlNode, HtmlNodeModel }) => {
    class RuleNode extends HtmlNode {
      setHtml(rootEl) {
        const { model } = this.props;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
        const Profile = Vue.extend({
          render: function (h) {
            return h(start, {
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
        this.menu = [];
      }
      getDefaultAnchor() {
        const { id, x, y, width, height } = this;
        const anchors = [];
        // anchors.push({
        //   x,
        //   y: y - height / 2,
        //   id: `${id}_incomming`,
        //   type: 'incomming',
        // });
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
        const width = 120;
        const height = 40;
        this.width = width;
        this.height = height;
        this.radius = 50;
        this.sourceRules = [
          {
            message: '【开始】只允许1个输出',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              const edges = this.graphModel.getNodeOutgoingEdge(sourceNode.id);
              if (edges.length >= 1) {
                return false;
              } else {
                return true;
              }
            },
          },
          {
            message: '输出不允许连接输出',
            validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
              if (targetAnchor.type === 'incomming') {
                return true;
              } else {
                return false;
              }
            },
          },
          // {
          //   message: `【${nodeNameZh}】输出可连接向量召回、协同过滤、swing推荐、原生服务和连接器`,
          //   validate: (sourceNode, targetNode, _sourceAnchor, targetAnchor) => {
          //     if (['assignment', 'decision', 'startParallel', 'machineLearning', 'deepLearning', 'restService'].includes(targetNode.type)) {
          //       return true;
          //     } else {
          //       return false;
          //     }
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
