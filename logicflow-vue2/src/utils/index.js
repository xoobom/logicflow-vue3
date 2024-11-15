import { Message } from 'element-ui';

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }),
  ).join('&');
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split('&');
  searchArr.forEach((v) => {
    const index = v.indexOf('=');
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += '' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + '';
  const randomNum = parseInt((1 + Math.random()) * 65536) + '';
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val];
}

export const exportDefault = 'export default ';

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
};

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, (str1) => str1.substr(-1).toUpperCase());
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}

export function obj2Param(obj) {
  return Object.keys(obj)
    .filter((i) => (obj[i] === false ? String(obj[i]) : obj[i]))
    .map((n) => (Array.isArray(obj[n]) ? arrayParams(n, obj[n]) : [n, obj[n]].join('=')))
    .join('&');
}

// 生成19位唯一数字标识符，来自chatgpt
export const randomNumber = () => {
  var timestamp = Date.now().toString(); // 获取当前时间戳
  var random = Math.floor(Math.random() * 9000000000000000) + 1000000000000000; // 生成15位随机数
  var identifier = timestamp + random.toString(); // 结合时间戳和随机数
  if (identifier.length > 19) {
    identifier = identifier.substr(0, 19); // 如果标识符超过19位，则截取前19位
  }
  if (identifier.charAt(0) === '0') {
    identifier = '1' + identifier.substr(1); // 如果开头是0，则将第一个字符替换为1
  }
  return identifier;
};

//logicflow-获取节点输出几条线。graph是json数组，node是节点数据
export const getNodeOutputCount = (graph, nodeData) => {
  // 找到所有节点
  const nodes = graph.nodes;
  // 找到所有边
  const edges = graph.edges;
  // 初始化节点输出线条数量
  let count = 0;
  // 遍历所有节点
  for (const node of nodes) {
    // 判断节点类型是否为
    if (node.id === nodeData.id) {
      // 遍历所有边，查找与该节点相关的边
      for (const edge of edges) {
        if (edge.sourceNodeId === node.id) {
          // 如果找到了与该节点相连的边，增加计数
          count++;
        }
      }
    }
  }
  return count; // 节点输出线条数量
};

//logicflow-获取节点输入几条线。graph是json数组，node是节点数据
export const getNodeInputCount = (graph, nodeData) => {
  // 找到所有节点
  const nodes = graph.nodes;
  // 找到所有边
  const edges = graph.edges;
  // 初始化节点输出线条数量
  let count = 0;
  // 遍历所有节点
  for (const node of nodes) {
    // 判断节点类型是否为
    if (node.id === nodeData.id) {
      // 遍历所有边，查找与该节点相关的边
      for (const edge of edges) {
        if (edge.targetNodeId === node.id) {
          // 如果找到了与该节点相连的边，增加计数
          count++;
        }
      }
    }
  }
  return count; // 节点输出线条数量
};

//判断数组是否为空或者包含空。true为空
export function arrHasEmpty(arr) {
  let arrTemp = arr.filter(Boolean);
  if (arr.length == 0) {
    return true;
  } else {
    if (arr.length != arrTemp.length) {
      return true;
    } else {
      return false;
    }
  }
}

//判断数组是否有值重复
export const arrHasDuplicate = (arr) => {
  return new Set(arr).size !== arr.length;
};

//服务编排-校验边
export const validEdgeType = (lf) => {
  let nodeTypes = [];
  lf.getGraphData().nodes.forEach((i) => {
    nodeTypes.push(i.type);
  });
  //校验决策条件是否为空。返回true校验通过false校验不通过
  if (nodeTypes.includes('decision')) {
    let arr = [];
    lf.getGraphData().edges.forEach((i) => {
      if (i.properties.type == 'decision') {
        arr.push(i.properties.edgeType);
      }
    });
    return !arrHasEmpty(arr);
  } else {
    return true;
  }
};

//通过源节点获取所有输出的边
export const getEdgesFormSourceNodeId = (graphData, sourceNodeId) => {
  let edges = [];
  graphData.edges.forEach((i) => {
    if (i.sourceNodeId == sourceNodeId) {
      edges.push(i);
    }
  });
  return edges;
};

//复制
export const copyFunc = (data) => {
  if (data) {
    let oInput = document.createElement('input');
    oInput.value = data;
    document.body.appendChild(oInput);
    oInput.select();
    Message.success('复制成功');
    document.execCommand('Copy');
    document.body.removeChild(oInput);
  }
};

/**
 * @description:根据数组将value变成中文
 * @param {*} value value值
 * @param {*} arr 枚举数据
 * @param {*} typeValue 英文字段
 * @param {*} typeLabel 中文字段
 * @return {*}
 */
export const getLabelByValue = (value, arr, typeValue, typeLabel) => {
  let label = '';
  arr.forEach((i) => {
    if (i[typeValue] == value) {
      label = i[typeLabel];
    }
  });
  return label;
};

/**
 * @description:根据数组通过value拿type
 * @param {*} value value值
 * @param {*} arr 枚举数据
 * @param {*} typeValue 英文字段
 * @return {*}
 */
export const getTypeByValue = (value, arr, typeValue) => {
  let type = '';
  arr.forEach((i) => {
    if (i[typeValue] == value) {
      type = i['type'];
    }
  });
  return type;
};
