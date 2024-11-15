<template>
  <div>
    <el-form ref="propertyForm" :model="propertyForm" :inline-message="true" :rules="rules" label-position="top" :disabled="flowDetail.status == '2'">
      <el-form-item label="名称" prop="text">
        <el-input v-model="propertyForm.text" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="propertyForm.desc" type="textarea" :rows="1">
        </el-input>
      </el-form-item>
    </el-form>
    <div v-if="flowDetail.status != '2'" class="mt15">
      <el-button @click="cancelFunc">
        取消
      </el-button>
      <el-button type="primary" :disabled="confirmDisabled" @click="confirmFunc">
        确定
      </el-button>
    </div>
  </div>
</template>
<script>
import { arrHasEmpty } from '@/utils/index';

export default {
  components: {
  },
  props: {
    nodeData: Object,
    lf: Object || String,
    //详情
    flowDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      propertyForm: {
        text: '',
        desc: '',
        inputVariables: [],
        outputVariables: [],
        structs: [],
      },
      inputParamsIndex: null,
      outputParamsIndex: null,
      rules: {
        text: [
          { required: true, message: '名称不能为空' },
          {
            max: 50,
            message: '最大50字符',
          },
        ],
        inputVariables: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let arr = [];
              this.propertyForm.inputVariables.forEach((i) => {
                arr.push(i.name);
              });
              if (arrHasEmpty(arr)) {
                callback('入参不能为空');
              } else {
                callback();
              }
            },
          },
        ],
        outputVariables: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let arr = [];
              this.propertyForm.outputVariables.forEach((i) => {
                arr.push(i.name);
              });
              if (arrHasEmpty(arr)) {
                callback('出参不能为空');
              } else {
                callback();
              }
            },
          },
        ],
      },
      showAddEditStruct: false,
      addEditStructTitle: '新增私有对象',
      addEditStructRow: null,
      showGlobalContext: false,
      globalContextFlag: '',
      confirmDisabled: false,
    };
  },
  mounted() {
    //方便联调
    // this.showAddEditStruct = true;

    this.propertyForm.text = this.nodeData.text.value;

    if (this.nodeData.properties.structs) {
      this.propertyForm.structs = this.nodeData.properties.structs;
    }

    this.propertyForm.inputVariables = this.nodeData.properties.inputVariables ? this.nodeData.properties.inputVariables : [];
    this.propertyForm.outputVariables = this.nodeData.properties.outputVariables ? this.nodeData.properties.outputVariables : [];

    this.$refs.propertyForm.validate();
  },
  methods: {
    //新增对象
    addStructFunc() {
      this.addEditStructTitle = '新增私有对象';
      this.showAddEditStruct = true;
    },
    //新增、编辑对象-确定
    confirmFuncStruct(row) {
      if (this.addEditStructTitle == '新增私有对象') {
        this.propertyForm.structs.push(row);
      } else if (this.addEditStructTitle == '编辑私有对象') {
        this.propertyForm.structs.forEach((i, index) => {
          if (i.id == row.id) {
            this.$set(this.propertyForm.structs, index, row); // 使用Vue.set确保变化被追踪
          }
        });
      }
      this.setProperties(); //修复私有对象确定后再新增对象变量时私有对象下拉框没数据问题
    },
    //新增、编辑对象-关闭
    closedStruct() {
      this.addEditStructRow = null;
      this.showAddEditStruct = false;
    },
    //对象-编辑
    structEditFunc(row) {
      this.addEditStructRow = row;
      this.addEditStructTitle = '编辑私有对象';
      this.showAddEditStruct = true;
    },
    //对象-删除
    structDeleteFunc(index) {
      this.propertyForm.structs.splice(index, 1);
    },
    //入参-新增
    inputParamsAddFunc() {
      this.propertyForm.inputVariables.push({
        id: '',
        name: '',
      });
      this.$refs.propertyForm.validate();
    },
    //出参-新增
    outputParamsAddFunc() {
      this.propertyForm.outputVariables.push({
        id: '',
        name: '',
      });
      this.$refs.propertyForm.validate();
    },
    //入参-全局上下文
    inputParamsGlobalFunc(index) {
      this.inputParamsIndex = index;
      this.globalContextFlag = '入参';
      this.showGlobalContext = true;
    },
    //入参-删除
    inputParamsDeleteFunc(index) {
      this.propertyForm.inputVariables.splice(index, 1);
      this.$refs.propertyForm.validate();
    },
    //出参-全局上下文
    outputParamsGlobalFunc(index) {
      this.outputParamsIndex = index;
      this.globalContextFlag = '出参';
      this.showGlobalContext = true;
    },
    //出参-删除
    outputParamsDeleteFunc(index) {
      this.propertyForm.outputVariables.splice(index, 1);
      this.$refs.propertyForm.validate();
    },
    //全局上下文-确定
    confirmFuncGlobalContext(row) {
      if (this.globalContextFlag == '入参') {
        this.propertyForm.inputVariables[this.inputParamsIndex] = {
          id: row.id,
          name: row.name,
        };
      } else if (this.globalContextFlag == '出参') {
        this.propertyForm.outputVariables[this.outputParamsIndex] = {
          id: row.id,
          name: row.name,
        };
      }
      this.globalContextFlag = '';
    },
    //更新节点属性
    setProperties() {
      this.lf.setProperties(this.nodeData.id, {
        value: this.propertyForm.value,
        type: this.propertyForm.type,
        inputVariables: this.propertyForm.inputVariables,
        outputVariables: this.propertyForm.outputVariables,
        // structs: this.propertyForm.structs,
        desc: this.propertyForm.desc,
        frontend_status: '1', //0配置错误，1配置正常
      });
    },
    //确定
    async confirmFunc() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          this.setProperties();
          this.lf.updateText(this.nodeData.id, this.propertyForm.text);
          this.$emit('closed');
        }
      });
    },
    //取消
    cancelFunc() {
      this.$emit('closed');
    },
  },
};
</script>
<style scoped></style>
