<template>
    <div class="nav">
        <div class="logo"><img src="/static/images/logo.png" alt=""></div>
        <div class="title"></div>
        <div class="options">
            <div class="tips"><img src="/static/images/speaker.png" alt=""><i class="tips-total" :wx:if="tipsNumber > 0">{{tipsNumber}}</i></div>
            <img src="/static/images/options.png" @click="toggle">
        </div>
    </div>
</template>

<script>
export default {
    props: ['tipsNumber'],
    data: function () {
        return {
        }
    },
    methods: {
        toggle: function () {
            this.$emit('toggle')
        }
    }
};
</script>

<style scoped>
.nav {
  width: 100%;
  padding-top: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav > div {
    padding: 0 30rpx;
    font-size: 40rpx;
}

.nav img{
    width: 40rpx;
    height: 40rpx;
}

.tips {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
    position: relative;
}

.tips-total {
    position: absolute;
    display: block;
    width: 30rpx;
    height: 30rpx;
    top: -15rpx;
    right: -15rpx;
    background: #d10000;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    line-height: 30rpx;
    z-index: 10;
    border-radius: 5rpx;
}


</style>


