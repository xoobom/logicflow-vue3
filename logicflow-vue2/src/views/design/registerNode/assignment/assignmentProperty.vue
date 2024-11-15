<template>
  <div>
    <el-form ref="propertyForm" :model="propertyForm" :inline-message="true" :rules="rules" label-position="top" :disabled="flowDetail.status == '2'">
      <el-form-item label="名称" prop="name">
        <el-input v-model="propertyForm.name" clearable>
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
      <el-button type="primary" @click="confirmFunc">
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
        name: '',
        desc: '',
        assignList: [],
      },
      rules: {
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
        assignList: [
          {
            required: false,
            validator: (rule, value, callback) => {
              let arr = [];
              this.propertyForm.assignList.forEach((i) => {
                arr.push(i.field);
                arr.push(i.value);
              });
              if (this.propertyForm.assignList.length > 0 && arrHasEmpty(arr)) {
                callback('变量、操作符、值不能为空');
              } else {
                callback();
              }
            },
          },
        ],
      },
      showGlobalContext: false,
      globalContextFlag: '',
      tableIndex: null,
    };
  },
  mounted() {
    //方便联调
    this.propertyForm.name = this.nodeData.text.value;
    this.propertyForm.desc = this.nodeData.properties.desc ? this.nodeData.properties.desc : '';
    this.propertyForm.assignList = this.nodeData.properties.assignList ? this.nodeData.properties.assignList : [];
  },
  methods: {
    //向量召回-新增
    addFunc() {
      this.propertyForm.assignList.push({
        field: '',
        operator: '=',
        value: '',
      });
    },
    //向量召回-删除
    deleteFunc(index) {
      this.propertyForm.assignList.splice(index, 1);
      this.$refs.propertyForm.validate();
    },
    //变量-全局上下文
    fieldGlobalFunc(index) {
      this.tableIndex = index;
      this.globalContextFlag = '变量';
      this.showGlobalContext = true;
    },
    //值-全局上下文
    valueGlobalFunc(index) {
      this.tableIndex = index;
      this.globalContextFlag = '值';
      this.showGlobalContext = true;
    },
    //全局上下文-确定
    confirmFuncGlobalContext(row) {
      if (this.globalContextFlag == '变量') {
        this.propertyForm.assignList[this.tableIndex].field = row.name;
      } else if (this.globalContextFlag == '值') {
        this.propertyForm.assignList[this.tableIndex].value = `{!${row.name}}`;
      }
      this.globalContextFlag = '';
    },
    //确定
    async confirmFunc() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          this.$props.lf.setProperties(this.nodeData.id, {
            name: this.propertyForm.name,
            desc: this.propertyForm.desc,
            assignList: this.propertyForm.assignList,
            frontend_status: '1', //0配置错误，1配置正常
          });
          this.$props.lf.updateText(this.nodeData.id, this.propertyForm.name);
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
