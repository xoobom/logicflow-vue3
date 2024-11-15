// 贝塞尔曲线
import { BezierEdge, BezierEdgeModel } from '@logicflow/core';
import { randomNumber } from '@/utils/index.js';
class BezierModel extends BezierEdgeModel {
  createId() {
    return randomNumber();
  }
  constructor(data, graphModel) {
    super(data, graphModel);
    this.menu = [
      {
        text: '配置',
        callback: (res) => {
          graphModel.eventCenter.emit('edge:app-config', res); //发出事件
        },
      },
      {
        text: '删除',
        callback(res) {
          graphModel.deleteEdgeById(res.id);
        },
      },
    ];
  }
}

export default {
  type: 'myBezier',
  view: BezierEdge,
  model: BezierModel,
};
