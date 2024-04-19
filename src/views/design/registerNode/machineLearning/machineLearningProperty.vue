<template>
  <div>
    <el-form ref="propertyFormRef" :model="propertyForm" :inline-message="true" :rules="rules" label-position="top" :disabled="flowDetail.status == '2'">
      <el-form-item label="名称" prop="name">
        <el-input v-model="propertyForm.name" clearable> </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="propertyForm.desc" type="textarea" :rows="2"> </el-input>
      </el-form-item>
    </el-form>
    <div class="mt15" v-if="flowDetail.status != '2'">
      <el-button @click="cancelFunc"> 取消 </el-button>
      <el-button type="primary" @click="confirmFunc"> 确定 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

const props = defineProps({
  nodeData: Object,
  lf: Object || String,
  //详情
  flowDetail: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const emit = defineEmits();

let propertyForm = reactive({
  name: '',
  desc: '',
  assignList: [],
});
let rules = reactive({
  name: [
    { required: true, message: '名称不能为空' },
    {
      max: 50,
      message: '最大50字符',
    },
  ],
  desc: [
    {
      max: 50,
      message: '最大50字符',
    },
  ],
});
let showGlobalContext = ref(false);
let globalContextFlag = ref('');
let tableIndex = ref(null);
let propertyFormRef = ref(null);

//更新节点属性
const setProperties = () => {
  props.lf.setProperties(props.nodeData.id, {
    name: propertyForm.name,
    desc: propertyForm.desc,
    frontend_status: '1', //0配置错误，1配置正常
  });
};

//确定
const confirmFunc = () => {
  propertyFormRef.value.validate((valid) => {
    if (valid) {
      setProperties();
      props.lf.updateText(props.nodeData.id, propertyForm.name);
      emit('closed');
    }
  });
};

//取消
const cancelFunc = () => {
  emit('closed');
};

onMounted(() => {
  propertyForm.name = props.nodeData.properties.name;
  propertyForm.desc = props.nodeData.properties.desc ? props.nodeData.properties.desc : '';
});
</script>
<style scoped></style>
