<template>
  <div class="picker-area" @blur="hideList" tabindex="1" id="picker">
    <div class="picker-show">
      <span :class="['picker-province', chooseIndex == 0?'pressActive':'']" 
            :style="{'max-width': maxLen}"
            @click="selectClick(0)" 
            :title="province">{{province}}</span>
      <i v-if='showLevel(2)'>/</i>
      <span :class="['picker-city', chooseIndex  == 1?'pressActive':'']" 
            :style="{'max-width': maxLen}"
            @click="selectClick(1)" v-if='showLevel(2)' 
            :title="city">{{city}}</span>
      <i v-if='showLevel(3)'>/</i>
      <span :class="['picker-county', chooseIndex == 2?'pressActive':'']" 
            @click="selectClick(2)" v-if='showLevel(3)' 
            :title="county"
            :style="{'max-width': maxLen}">{{county}}</span>
      <i v-if='showLevel(4)'>/</i>
      <span :class="['picker-road', chooseIndex == 3?'pressActive':'']" 
            @click="selectClick(3)" v-if='showLevel(4)' 
            :title="road"
            :style="{'max-width': maxLen}">{{road}}</span>
      <em :class="['picker-arrow',showList ?'rorate': '']" @click="showSelect"></em>
    </div>
    <ul class="picker-list" ref="picker-list" v-if="showList && showDataArray.length > 0">
      <li v-for="item in showDataArray" :key="item.code" @click="chooseOption(item.code,item.name)">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
import locationData from './pcas-code.json';
export default {
  name: 'linkarea', // vue component name
  props: {
    //地址编码
    loCode: {
      type: String,
      default: () => null
    },
    //显示的层级
    level: {
      type: Number,
      default: () => 4
    }
  },
  mounted:function() {
    //动态计算span最大宽度
    let obj = document.getElementById('picker');
    if (obj) {
      let width = obj.offsetWidth;
      width = width > 0 ? ( width - 80 ) / this.LEVEL : 80;
      this.maxLen = width + 'px';
    } 
  },
  methods: {
    /**
     * @description 点击span事件
     * @param index 点击顺序
     */
    selectClick(index){
      let _this = this;
      
      switch (index){
        //选择省
        case 0:
        _this.showDataArray = locationData;      
        _this.provinceArray = _this.showDataArray;
        this.selectHandler(index);
        break;
        //选择市
        case 1:
        if(_this.locationCode.length > 0) {
          _this.reloadData(_this.provinceArray,2);
          _this.cityArray = _this.showDataArray;
          this.selectHandler(index);
        }
        break;
        //选择区
        case 2:
        if(_this.locationCode.length > 2) {
          _this.reloadData(_this.cityArray,4);
          _this.countyArray = _this.showDataArray;
          this.selectHandler(index);
        }
        break;
        //选择街道
        case 3:
        if(_this.locationCode.length > 4) {
          _this.reloadData(_this.countyArray,6);
          _this.roadArray = _this.showDataArray;
          this.selectHandler(index);
        }
        break;
        default:break;
      }
    },
    /**
     * @description 处理展开操作
     * @param index 点击的顺序
     */
    selectHandler(index) {
      this.chooseIndex = index;
      this.showList = true;
      //增加滚动条置顶
      let pk = this.$refs['picker-list'];
      if (pk) {
        pk.scrollTop = 0;
      }
    },
     /**
     * @description 选中下拉选项
     * @param code 选中值
     * @param areaName 选中名称
     */
    chooseOption(code, areaName){
      let _this = this;
      _this.locationCode = code;
      switch (_this.chooseIndex){
        //选择省
        case 0:
        _this.province = areaName;
        _this.cityArray = [];
        _this.countyArray = [];
        _this.roadArray = [];
        _this.city = '请选择市';
        _this.county = '请选择区';
        _this.road = '请选择街道';
        break;
        //选择市
        case 1:
        _this.city = areaName;
        _this.countyArray = [];
        _this.roadArray = [];
        _this.county = '请选择区';
        _this.road = '请选择街道';
        break;
        //选择区
        case 2:
        _this.county = areaName;
        _this.roadArray = [];
        _this.road = '请选择街道';
        break;
        //选择街道
        case 3:
        _this.road = areaName;
        break;
        default:break;
      }
      if(_this.chooseIndex == (this.LEVEL - 1)){
        _this.chooseIndex = -1;
        _this.showList = false;
      }
      //模拟下一个点击事件
      if(_this.chooseIndex > -1){
        _this.selectClick(_this.chooseIndex + 1);
      }
    },
     /**
     * @description 更新下拉列表数据
     * @param arrayData 数据源
     * @param len 截取长度
     */
    reloadData(arrayData,len){
      let _this = this, tempArray = [];
      tempArray = arrayData.find((item) => {
        return item.code == _this.locationCode.substr(0,len);
      });
      _this.showDataArray = tempArray.children;
    },
    /**
     * @description 根据编码找到对应地区
     * @param locationCode 地区编码
     */
    findLocation(locationCode) {
      let _this = this,tempIndex = 0;
      _this.provinceArray = locationData;
      if (locationCode.length > 1) {
        tempIndex = locationData.findIndex((item) => {
          return item.code == locationCode.substr(0,2);
        });
        if(tempIndex > -1) {
          _this.province = _this.provinceArray[tempIndex].name;
          _this.cityArray = _this.provinceArray[tempIndex].children;
        }else{
          _this.province = '请选择省';
          _this.cityArray = [];
        }
      }
      if (locationCode.length > 3) {
        tempIndex = _this.cityArray.findIndex((item) => {
          return item.code == locationCode.substr(0,4);
        });
        if(tempIndex > -1) {
          _this.city = _this.cityArray[tempIndex].name;
          _this.countyArray = _this.cityArray[tempIndex].children;
        }else{
          _this.city = '请选择市';
          _this.countyArray = [];
        }
      }
      if (locationCode.length > 5) {
        tempIndex = _this.countyArray.findIndex((item) => {
          return item.code == locationCode.substr(0,6);
        });
        if(tempIndex > -1) {
          _this.county = _this.countyArray[tempIndex].name;
          _this.roadArray = _this.countyArray[tempIndex].children;
        }else{
          _this.county = '请选择区';
          _this.roadArray = [];
        }
      }
      if (locationCode.length > 8) {
        tempIndex = _this.roadArray.findIndex((item) => {
          return item.code == locationCode;
        });
        if(tempIndex > -1) {
          _this.road = _this.roadArray[tempIndex].name;
        }else{
          _this.road = '请选择街道';
        }
      }
    },
    /**
     * @description 失焦后隐藏下拉列表
     */
    hideList(){
      this.showList = false;
      this.chooseIndex = -1;
    },
    /**
     * @description 根据level级别显示控件
     * @param level 级别
     * @returns boolean
     */
    showLevel(level){
      return this.LEVEL >= level;
    },
    /**
     * @description 点击箭头事件
     */
    showSelect(){
      if(this.showList){
        this.showList = false;
      }else {
        this.selectClick(0);
      }
    }
  },
  watch:{
    /* 将选中的地区值传递给父组件 */
    locationCode(val) {
      let _this = this, locationStr = '', returnObj = {};
      if (val.length > 1) {
        locationStr += _this.province;
      } 
      if (val.length > 3) {
        locationStr += _this.city ;
      } 
      if (val.length > 5) {
        locationStr += _this.county ;
      } 
      if (val.length > 8) {
        locationStr += _this.road;
      }
      returnObj = { name: locationStr, value: val };
      this.$emit('location',returnObj);
    },
    /* 根据传进来的值定位地区 */
    loCode(val){
      if (val != undefined && val != null && val != '') {
        if(typeof val == "number"){
          this.locationCode = val.toString();
        }else{
          this.locationCode = val;
        }
        this.findLocation( this.locationCode); 
      }
    }
  },
  computed: {
    //过滤level值
    LEVEL() {
      if( this.level < 1 || this.level > 4 ){
        return 4;
      } else {
        return Math.round(this.level);
      }
    }
  },
  data() {
    return {
      chooseIndex: -1,//对应省市县
      showDataArray: [],
      provinceArray: [],
      cityArray: [],
      countyArray: [],
      roadArray: [],
      province: '请选择省',
      city: '请选择市',
      county: '请选择区',
      road: '请选择街道',
      locationCode: '',
      showList: false,
      maxLen: '80px'
    };
  }
};
</script>

<style scoped>
.picker-area {
  position:relative;
  font-size:14px;
  background:#fff;
  cursor:default;
  width: 400px;
  border-color: #51AFC9;
  outline: none;
}

.picker-show {
  position:relative;
  padding:0 8px;
  height:36px;
  line-height:36px;
  border:1px solid #dedede;
  border-radius:3px;
}

.picker-show span {
  float:left;
  display:inline-block;
  height:24px;
  line-height:24px;
  padding:0 3px;
  margin-top:6px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  color:#333;
  cursor:pointer;
}

.picker-show span:hover {
  color:#fff;
  border-radius:3px;
  max-width: 80px; 
  background:#51AFC9;
}

.picker-show span.pressActive {
  background:#51AFC9;
  color:#fff;
  border-radius:3px
}

.picker-arrow {
  position:absolute;
  top:14px;
  right:8px;
  display:block;
  border:6px solid #999;
  border-left:6px solid transparent;
  border-right:6px solid transparent;
  border-bottom:6px solid transparent;
  cursor: pointer;
}

.picker-show i {
  float:left;
  display:inline-block;
  padding:0 3px;
  color:#333;
  font-style:normal;
}

.picker-list {
  position:absolute;
  line-height:36px;
  margin:0;
  padding:0;
  background:#fff;
  z-index:100;
  overflow-y:auto;
  overflow-x:hidden;
  border:1px solid #dedede;
  border-top:none;
  max-height: 240px;
  width: 398px;
}

.picker-list li {
  margin:0;
  padding-left:11px;
  list-style:none;
  color:#888;
}

.picker-list li:hover {
  color:#fff;
  font-weight:bold;
  background:#51AFC9;
}

/* 滚动条美化样式 */
.picker-list::-webkit-scrollbar {
  width: 10px;
  position: absolute;
  left: 20px;
}
.picker-list::-webkit-scrollbar-track {
  background: #f3f6fb;
  border-radius: 10px;
}
.picker-list::-webkit-scrollbar-thumb {
  background: #6fb7cc;
  border-radius: 10px;
}


.rorate {
  top:8px;
  right:8px;
  border:6px solid #999;
  border-left:6px solid transparent;
  border-right:6px solid transparent;
  border-top:6px solid transparent;
  cursor: pointer;
}
</style>
