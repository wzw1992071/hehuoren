<template>
<div class="animate">
  <div class="alert">
      {{text}}
  </div>
</div>
</template>

<script>
export default {
  props: ["text"]
}
</script>

<style scoped>
.alert {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 690rpx;
  padding: 20rpx 50rpx;
  border-radius: 10rpx;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 26rpx;
  text-align: center;
  transition: all 2ms linear;
  z-index: 1000;
}
</style>


