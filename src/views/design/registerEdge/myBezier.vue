<template>
  <div>
    <el-form ref="propertyFormRef" :model="propertyForm" :inline-message="true" :rules="rules" label-position="top">
      <el-form-item label="连线类型" prop="id">
        <el-select v-model="propertyForm.id" style="width: 300px" :disabled="edgeTypeDisabled">
          <el-option v-for="(x, index) in edgeTypeOption" :key="index" :disabled="x.disabled" :value="x.id" :label="x.label" />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="mt15">
      <el-button @click="cancelFunc"> 取消 </el-button>
      <el-button type="primary" @click="confirmFunc"> 确定 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
const props = defineProps({
  nodeData: Object,
  lf: Object,
});
const emit = defineEmits();

let propertyForm = reactive({
  id: '',
  edgeType: '',
});

let rules = reactive({
  id: [{ required: true, message: '连线类型不能为空' }],
});
let edgeTypeOption = ref([]);
let edgeTypeDisabled = ref(false);
let propertyFormRef = ref(null);

//更新节点属性
const setProperties = () => {
  props.lf.setProperties(props.nodeData.id, {
    decisionId: this.propertyForm.id,
    edgeType: this.propertyForm.edgeType,
  });
};

//确定
const confirmFunc = () => {
  propertyFormRef.value.validate((valid) => {
    if (valid) {
      setProperties();
      props.lf.updateText(props.nodeData.id, propertyForm.edgeType);
      emit('closed');
    }
  });
};

//取消
const cancelFunc = () => {
  emit('closed');
};

onMounted(() => {
  propertyForm.edgeType = props.nodeData.properties?.edgeType;
});
</script>
<style scoped></style>
