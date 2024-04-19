<template>
  <div class="node-panel">
    <el-input v-model="filterText" prefix-icon="el-icon-search" placeholder="输入关键字" class="mt15" style="margin-bottom: 8px"> </el-input>
    <div>
      <el-tree
        ref="treeRef"
        :data="treeList"
        :default-expanded-keys="['2', '3', '4', '5']"
        node-key="id"
        :props="{
          children: 'children',
          label: 'name',
        }"
        :draggable="false"
        :allow-drop="allowDrop"
        :filter-node-method="filterNodeMethod"
      >
        <template v-slot="{ node, data }">
          <span class="custom-tree-node">
            <SvgIcon v-if="data.type == 'assignment'" icon-class="assignment" class="assignment" />
            <SvgIcon v-if="data.type == 'decision'" icon-class="decision" class="decision" />
            <SvgIcon v-if="data.type == 'startParallel'" icon-class="startParallel" class="startParallel" />
            <SvgIcon v-if="data.type == 'endParallel'" icon-class="endParallel" class="endParallel" />
            <SvgIcon v-if="data.type == 'machineLearning'" icon-class="machineLearning" class="machineLearning" />
            <SvgIcon v-if="data.type == 'deepLearning'" icon-class="deepLearning" class="deepLearning" />
            <span class="drag-label" :title="node.label" @mousedown="mousedownFunc(data)">{{ node.label }}</span>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import { randomNumber } from '@/utils/index';
import SvgIcon from '@/components/SvgIcon/index.vue';

const props = defineProps({
  lf: {
    type: Object,
  },
});

let treeList = ref([
  {
    id: '3',
    name: '目录1',
    children: [
      {
        id: '31',
        type: 'assignment',
        name: '节点1-1',
        children: [],
      },
      {
        id: '34',
        type: 'decision',
        name: '节点1-2',
        children: [],
      },
      {
        id: '35',
        type: 'startParallel',
        name: '节点1-3',
        children: [],
      },
      {
        id: '36',
        type: 'endParallel',
        name: '节点1-4',
        children: [],
      },
    ],
  },
  {
    id: '4',
    name: '目录2',
    children: [
      {
        id: '41',
        type: 'machineLearning',
        name: '节点2-1',
        children: [],
      },
      {
        id: '42',
        type: 'deepLearning',
        name: '节点2-2',
        children: [],
      },
    ],
  },
]);
let filterText = ref('');
let dragRow = reactive({
  type: '',
}); //拖拽的行
let randomNum = ref(null);

let treeRef = ref(null);

watch(filterText, (val) => {
  treeRef.value.filter(val);
});

const mousedownFunc = (val) => {
  let typeList = ['assignment', 'decision', 'startParallel', 'endParallel', 'machineLearning', 'deepLearning'];
  if (typeList.includes(val.type)) {
    dragRow = val;
    randomNum.value = randomNumber();
    props.lf.dnd.startDrag({
      type: val.type,
      text: val.name,
      id: randomNum.value,
    });
  }
};

// 停止拖拽时节点可放置的位置
const allowDrop = () => {
  return false; // 停止拖拽后树节点位置不发生改变
};

const filterNodeMethod = (value, data) => {
  if (!value) return true;
  return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1; //支持大小写模糊搜索
};

onMounted(() => {
  props.lf.on('node:dnd-add', () => {
    if (dragRow.type == 'start') {
      props.lf.setProperties(randomNum.value, {
        frontend_status: '0', //0配置错误，1配置正常
      });
    } else if (dragRow.type == 'assignment') {
      props.lf.setProperties(randomNum.value, {
        name: dragRow.name,
        desc: '',
        frontend_status: '1',
      });
    } else if (dragRow.type == 'decision') {
      props.lf.setProperties(randomNum.value, {
        name: dragRow.name,
        desc: '',
        frontend_status: '1',
        decisions: {
          decisionConditions: [],
          id: randomNumber(),
          defaultDecision: 'defaultDecision',
        },
      });
    } else if (dragRow.type == 'startParallel') {
      props.lf.setProperties(randomNum.value, {
        name: dragRow.name,
        desc: '',
        frontend_status: '0',
      });
    } else if (dragRow.type == 'endParallel') {
      props.lf.setProperties(randomNum.value, {
        name: dragRow.name,
        desc: '',
        frontend_status: '0',
      });
    } else if (dragRow.type == 'machineLearning') {
      props.lf.setProperties(randomNum.value, {
        name: dragRow.name,
        desc: '',
        inputParams: [],
        outputParams: {
          output: '',
          assignTo: '',
        },
        frontend_status: '0',
      });
    } else if (dragRow.type == 'deepLearning') {
      props.lf.setProperties(randomNum.value, {
        name: dragRow.name,
        desc: '',
        inputParams: [],
        outputParams: {
          output: '',
          assignTo: '',
        },
        frontend_status: '0',
      });
    }
  });
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/mixin.scss';
@import '@/assets/styles/variables.module.scss';
.node-panel {
  position: absolute;
  /* top: 50px; */
  left: 0px;
  width: 180px;
  padding: 0 13px 20px;
  background-color: white;
  box-shadow: 0 0 10px 1px rgb(228, 224, 219);
  border-radius: 6px;
  // text-align: center;
  z-index: 101;
}
.node-item {
  margin-bottom: 20px;
}
.node-item-icon {
  width: 30px;
  height: 30px;
  margin-left: 20px;
  background-size: cover;
}
.node-label {
  font-size: 12px;
  margin-top: 5px;
  user-select: none;
}
.custom-tree-node {
  .drag-label {
    user-select: none; //禁止选择文本
    @include ellipsis(160px);
  }

  //赋值
  .assignment {
    color: $--color-primary;
    margin: 0 2px 0 0;
    font-size: 17px;
    position: relative;
    bottom: 4px;
  }

  //决策
  .decision {
    color: #fba905;
    margin: 0 3px 0 0;
    font-size: 15px;
    position: relative;
    bottom: 5px;
    left: 0px;
  }

  .startParallel {
    margin: 0 4px 0 0;
    font-size: 14px;
    position: relative;
    bottom: 5px;
  }

  .endParallel {
    margin: 0 4px 0 0;
    font-size: 14px;
    position: relative;
    bottom: 5px;
  }

  .machineLearning {
    margin: 0 4px 0 0;
    font-size: 14px;
    position: relative;
    bottom: 5px;
  }

  .deepLearning {
    margin: 0 4px 0 0;
    font-size: 14px;
    position: relative;
    bottom: 5px;
  }
}
.panelLayout {
  left: -10px;
}
</style>
