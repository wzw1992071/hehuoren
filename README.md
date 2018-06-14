# 组件

> `*`表示已完成

## 弹窗选项

- `*`列表
  - component: optionCard

```html
<!--  v-if: boolean -->
<!-- lists: Array<string> -->
<!-- title: string -->
<!-- @close: 控制v-if的事件 -->
<!-- @selected: 获取选取值的事件，示例中getVal(val){console.log(val)}val即为选得的值-->

<option-card
    v-if="show"
    :lists="options"
    :title="optionsTitle"
    @close="close"
    @selected="getVal"
></option-card>
```

- 特殊列表(多事件)

## 图片上传

- `*`单张图片
  - component: singleImg
  - `<single-img :info="Obj"></single-img>`
  - Obj.title 如："*真实头像"
  - Obj.tip 如："上传真实头像可以让你。。。。"

- 多张图片

## `*`Input

- required(待补)

- component: inputs

```html
<!-- @change: 获取选取值的事件 -->
<!-- info: 参数，详细见js示例 -->
<inputs @change="getVal" :info="inputsOne"></inputs>
```

```javascript
inputsOne: {
    /**
     * @type number
     * 1 基础input，只需传参type/title/text/handler即可
     * 2 有单位的input，传参type/title/text/measurement/handler
     * 3 在列表中选取，传参type/title/options/optionsTitle/handler
    */
    type: 3,
    /**
     * @title string
     * Input类型/名称,位于最左侧
    */
    title: '*顾问名称',
    /**
     * @text string
     * type 1 / 2 时的placeholder
    */
    text: 'Arthur',
    /**
     * @measurement string
     * 单位，比如“元”,"%"
    */
    measurement: '元',
    // 列表名称
    optionsTitle: '擅长领域',
    // 列表选项
    options: ['北京', '上海', '广州'],
    // 存储input值的key,可以不在这组数据里,比如: handler: 'results.val'
    handler: 'inputsOne.val',
    // tip: 如果所需字段比较短而且带有说明，则将说明以tip的值传入，如果所需字段较长，则使用modifyTextarea组件
    tip: ''
}
```
```javascript
hobbyListData:{
  list:[
    '餐饮美食',
    '休闲娱乐',
    '生活服务',
    '驾驭培训',
  ],
  title:'*感兴趣的行业（可多选）',
},
```

## `*`textarea

### `*`按钮

- type
  - *蓝边 blue-line
  - *黄边 yellow-line
  - *蓝背景 blue-block
  - *黄背景 yellow-block
- component: modifyInput
  - `<modify-input :info="Obj"></modify-input>`
  - Obj.type "blue-line" | "yellow-line" | "blue-block" | "yellow-block"
  - Obj.text 如："+保存项目伙伴信息"

### 选项

- 单选 singleSelect
- 多选 multiSelect

### 其他

- `*`弹出框
  - component: Alert
  - `<Alert :text="string"></Alert>`
  - string: 如："您已关注合伙人"

- `*`修改主页列表
  - component: modifyList
  - `<modify-list :listItem="Obj"></modify-list>`
  - 如：修改(string1)展示类(string2)项目信息(string3)
  - Obj.string1
  - Obj.string2 黄色字体部分
  - Obj.string3
  - Obj.tip string 如："创始人、团队、顾问导师、新闻报道"

- `*`文本框
  - component: modifyTextarea
  - `<modify-textarea :info="Obj"></modify-textarea>`
  - Obj.title 标题
  - Obj.tip 浅色文字
  - Obj.default -> placeholder

##

  第一次代码更改远程协助测试

