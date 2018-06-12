<template>
  <view class="animate-number">
    <view class="num">
      <div>
        <img src="/static/images/number.png" alt="">
        <span>{{numArray[0]}}</span>
      </div>
      <div>
        <img src="/static/images/number.png" alt="">
        <span>{{numArray[1]}}</span>
      </div>
      <div>
        <img src="/static/images/number.png" alt="">
        <span>{{numArray[2]}}</span>
      </div>
      <div>
        <img src="/static/images/number.png" alt="">
        <span>{{numArray[3]}}</span>
      </div>
    </view>
  </view>
</template>

<script>
import NumberAnimate from './numberScroll.js'
export default {
  props: ['number'],
  data: function () {
    return {
      num: 0,
      numArray: [0,0,0,0]
    }
  },
  methods: {
    onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数 
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    numToString: function (num) {
      let numString = num + '';
      let numStringArray = []
      numStringArray = numString.split('')
      this.numArray[3] = numStringArray.pop() || 0
      this.numArray[2] = numStringArray.pop() || 0
      this.numArray[1] = numStringArray.pop() || 0
      this.numArray[0] = numStringArray.pop() || 0
    }
  },
  created() {
    this.num = 0;
    let num = this.number;
    let n = new NumberAnimate({
      from: num, //开始时的数字
      speed: 2000, // 总时间
      refreshTime: 100, // 刷新一次的时间
      decimals: 0, //小数点后的位数
      onUpdate: () => { //更新回调函数
        this.num = n.tempValue
        this.numToString(this.num)
      },
      onComplete: () => { //完成回调函数
      }
    })

  }
}
</script>

<style>
.num div {
  display: inline-block;
  width: 64rpx;
  height: 100rpx;
  position: relative;
  margin: 0 2rpx;
}

.number img {
  width: 64rpx;
  height: 100rpx;
}

.number div span {
  font-family: "PingFang";
  display: inline-block;
  width: 64rpx;
  height: 100rpx;
  line-height: 100rpx;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  color: #FF7803;
  font-size: 80rpx;
  z-index: 10;
}
</style>
