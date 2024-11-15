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
      <el-form-item prop="apiId">
        <template slot="label">
          服务
          <el-tooltip effect="dark" content="对应实时服务中已上线的逻辑回归服务。维护位置：模型服务/模型推理/实时服务" placement="top">
            <i class="el-icon-info" />
          </el-tooltip>
        </template>
      </el-form-item>
      <el-form-item label="输入参数" prop="inputParams">
        <template slot="label">
          输入参数
          <el-tooltip effect="dark" :content="inputParamsTip" placement="top">
            <i class="el-icon-info" />
          </el-tooltip>
        </template>
        <el-table :data="propertyForm.inputParams" border stripe>
          <el-table-column prop="input" label="参数名" show-overflow-tooltip width="200">
            <template v-slot="scoped">
              <el-input v-model="scoped.row.input" placeholder="输入参数名XXX">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="参数值" show-overflow-tooltip min-width="220">
            <template v-slot="scoped">
              <div style="width: 100%; display: flex; align-items: center">
                <el-input v-model="scoped.row.value" placeholder="输入{!XXX}或从上下文选" style="width: 190px; flex-grow: 1">
                </el-input>
                <el-tooltip content="全局上下文" placement="top">
                  <svg-icon v-if="flowDetail.status != '2'" icon-class="global-context" class="table-global-context-icon" @click="globalFunc('inputParams.value', scoped.$index)"></svg-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="flowDetail.status != '2'" fixed="right" label="操作" width="60" align="center">
            <template v-slot="scoped">
              <el-button type="text" class="errorColor" @click="inParamsDeleteFunc(scoped.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="flowDetail.status != '2'" class="mt10">
          <el-button type="primary" plain icon="el-icon-circle-plus" @click="inParamsAddFunc"></el-button>
        </div>
      </el-form-item>
      <el-form-item prop="outputParams" label="输出参数">
        <template slot="label">
          输出参数
        </template>
        <el-table :data="propertyForm.outputParamsList" border stripe>
          <el-table-column prop="source" label="源参数" show-overflow-tooltip width="200">
            <template v-slot="scoped">
              {{ scoped.row.originParams }}
            </template>
          </el-table-column>
          <el-table-column prop="targetParams" label="目标参数" show-overflow-tooltip min-width="220">
            <template v-slot="scoped">
              <el-input v-model="scoped.row.targetParams" readonly placeholder="从全局上下文选择" style="width: 230px" @input="targetParamsInput">
              </el-input>
              <el-tooltip content="全局上下文" placement="top">
                <svg-icon v-if="flowDetail.status != '2'" icon-class="global-context" class="table-global-context-icon" @click="globalFunc('outputParams.assignTo', scoped.$index)"></svg-icon>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
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
import { arrHasEmpty } from '@/utils/index.js';

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
  computed: {
    serviceListRequestParams() {
      return {
        runStatus: 1,
        isDeep: 0,
        serviceName: '',
        groupId: this.$store.state.app.selectedGroupId,
      };
    },
  },
  data() {
    return {
      propertyForm: {
        name: '',
        desc: '',
        apiId: '',
        apiKey: '',
        inputParams: [],
        outputParams: {
          output: '',
          assignTo: '',
        },
        outputParamsList: [
          {
            originParams: 'data',
            targetParams: '',
          },
        ],
      },
      inputParamsIndex: null, //判断输入参数的哪一行
      rules: {
        name: [
          { required: true, message: '名称不能为空' },
          {
            max: 50,
            message: '最大50字符',
          },
        ],
        apiId: [{ required: true, message: '服务不能为空' }],
        inputParams: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let arr = [];
              this.propertyForm.inputParams.forEach((i) => {
                arr.push(i.input);
                arr.push(i.value);
              });
              if (arrHasEmpty(arr)) {
                callback('输入参数不能为空');
              } else {
                callback();
              }
            },
          },
        ],
        outputParams: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!this.propertyForm.outputParams.assignTo) {
                callback('输出参数不能为空');
              } else {
                callback();
              }
            },
          },
        ],
      },
      realtimeServiceIdOption: [],
      showGlobalContext: false,
      globalContextFlag: '',
      inputParamsTip: '参数名称为data表示{"data":"参数值"}; 其他则表示{"data":{"参数名":"参数值"}}',
    };
  },
  mounted() {
    this.propertyForm.name = this.nodeData.text.value;
    this.propertyForm.desc = this.nodeData.properties.desc ? this.nodeData.properties.desc : '';
    this.propertyForm.apiId = this.nodeData.properties.apiId ? this.nodeData.properties.apiId : '';
    this.propertyForm.apiKey = this.nodeData.properties.apiKey ? this.nodeData.properties.apiKey : '';
    this.propertyForm.inputParams = this.nodeData.properties.inputParams ? this.nodeData.properties.inputParams : '';
    this.propertyForm.outputParams.assignTo = this.nodeData.properties.outputParams.assignTo ? this.nodeData.properties.outputParams.assignTo : '';
    this.propertyForm.outputParamsList[0].targetParams = this.propertyForm.outputParams.assignTo;
  },
  methods: {
    //全局上下文
    globalFunc(type, index) {
      this.globalContextFlag = type;
      if (this.globalContextFlag == 'inputParams.value') {
        this.inputParamsIndex = index;
      } else if (this.globalContextFlag == 'outputParams.assignTo') {
      }
      this.showGlobalContext = true;
    },
    //全局上下文-确定
    confirmFuncGlobalContext(row) {
      if (this.globalContextFlag == 'inputParams.value') {
        this.propertyForm.inputParams[this.inputParamsIndex].value = `{!${row.name}}`;
      } else if (this.globalContextFlag == 'outputParams.assignTo') {
        this.propertyForm.outputParams.assignTo = row.name;
        this.propertyForm.outputParamsList[0].targetParams = this.propertyForm.outputParams.assignTo;
      }
      this.globalContextFlag = '';
    },

    onServiceSelected(id) {
      this.propertyForm = {
        ...this.propertyForm,
        apiId: id,
      };
    },

    //输入参数-删除
    inParamsDeleteFunc(index) {
      this.propertyForm.inputParams.splice(index, 1);
    },
    //输入参数-添加
    inParamsAddFunc() {
      this.propertyForm.inputParams.push({
        input: '',
        value: '',
      });
    },
    //输出参数-目标参数-值改变
    targetParamsInput() {
      this.propertyForm.outputParams.assignTo = this.propertyForm.outputParamsList[0].targetParams;
    },
    //确定
    async confirmFunc() {
      this.$refs.propertyForm.validate((valid) => {
        if (valid) {
          this.$props.lf.setProperties(this.nodeData.id, {
            name: this.propertyForm.name,
            desc: this.propertyForm.desc,
            apiId: this.propertyForm.apiId,
            apiKey: this.propertyForm.apiKey,
            inputParams: this.propertyForm.inputParams,
            outputParams: {
              output: 'data',
              assignTo: this.propertyForm.outputParams.assignTo,
            },
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
