<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync');

    this.$store.dispatch('UpdateInfo');
  }
}
</script>

<style>
.container {
  font-family: "PingFang", Microsoft Yahei;
  background-color: #f6f6f6;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.clear_left_float:after,
.clear_right_float:after {
	content: "";
	clear: both;
	display: block;
	height: 0;
}
.clear_left_float>div,
.clear_left_float>ul,
.clear_left_float>li,
.clear_left_float>dl,
.clear_left_float>dd,
.clear_left_float>dt,
.clear_left_float>img,
.clear_left_float>p,
.clear_left_float>span,
.clear_left_float>a,
.clear_left_float>video {
	float: left;
}
.clear_right_float>div,
.clear_right_float>ul,
.clear_right_float>li,
.clear_right_float>dl,
.clear_right_float>dd,
.clear_right_float>dt,
.clear_right_float>img,
.clear_right_float>p,
.clear_right_float>span,
.clear_right_float>a,
.clear_right_float>video {
	float: right;
}
</style>
