![](./images/logo.png)

<p text-align="center">
    <img alt="GitHub release" src="https://img.shields.io/badge/version-1.0.4-brightgreen.svg?style=for-the-badge"/>
    <img alt="vue" src ="https://img.shields.io/badge/vue-2.5.16-blue.svg?style=for-the-badge"/>
</p>

> A selection box for linkage area which supports four-level at most
>
>  可配置级别地址联动选择框，最大可支持四级地址联动

___

### 一、使用示例

 

![](./images/demo.gif)

### 二、组件功能

- 可根据配置选择联动级别，最大支持四级联动
- 可根据传入地址编码回显地址
- 地址变动时通过location方法监听回传地址对象



### 三、组件参数及事件

**参数**

| 参数   | 说明                                                         | 类型   | 默认值 |
| ------ | ------------------------------------------------------------ | ------ | ------ |
| loCode | 需要回显地址时使用，地址编码必须对应地址的code               | String | null   |
| level  | 显示层级参数，参数无效或者不传时默认显示4级联动，即省、市、区、街道；1级只显示省，2级显示省、市；以此类推。（参数大于1时向下取整，最大为4级） | Number | 4      |

**方法**

**location(data)**  :监听组件地址变化函数

| 属性       | 说明             |
| ---------- | ---------------- |
| data       | 返回数据对象     |
| data.name  | 对应所选中文地址 |
| data.value | 对应所选地址编码 |



### 四、使用方法

- 1、安装依赖

  `npm set registry http://npm.flyui.cn  `
  `npm install @edu/app-linkarea` 

- 2 、页面引用

  `import linkarea from '@edu/app-linkarea/src/index'`

  <template>
    <linkarea :loCode='1101' :level= 4 @location="location"></linkarea>
  </template>


### 五、版本更新日志

**日志**

| Version | Description                                                  |
| ------- | ------------------------------------------------------------ |
| 1.0.0   | 四级联动下拉框                                               |
| 1.0.1   | 增加外部点击收起下拉框功能，IE浏览器兼容不好                 |
| 1.0.2   | 修复定义级别后仍需选择四级的bug                              |
| 1.0.3   | 每级点击区域的最大宽度根据容器自适应                         |
| 1.0.4   | 1、增加右侧小箭头点击收起/展示下拉选项，默认展开第一级；2、点击下拉选项后将滚动条置顶 |

