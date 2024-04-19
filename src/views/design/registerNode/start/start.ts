import { createApp, h } from 'vue';
import start from './start.vue';
import { randomNumber } from '@/utils/index';

export default function registerConnect(lf) {
  lf.register('start', ({ HtmlNode, HtmlNodeModel }) => {
    class RuleNode extends HtmlNode {
      setHtml(rootEl) {
        const { model } = this.props;
        const el = document.createElement('div');
        rootEl.innerHTML = '';
        rootEl.appendChild(el);

        // Vue 3 使用 createApp 来创建应用实例
        const app = createApp({
          render: () =>
            h(start, {
              properties: model.properties,
            }),
        });

        // 挂载 Vue 应用到元素上
        app.mount(el);
      }
    }
    class RuleModel extends HtmlNodeModel {
      createId() {
        return randomNumber();
      }
      constructor(data, graphModel) {
        super(data, graphModel);
        this.menu = [];
      }
      getDefaultAnchor() {
        const { id, x, y, width, height } = this;
        const anchors = [];
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
      }
    }
    return {
      view: RuleNode,
      model: RuleModel,
    };
  });
}
