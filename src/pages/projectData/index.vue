<template>
    <div class="container">
        <user-header></user-header>
        <div class="tips">
            <div>
                <div class="title">项目等级根据项目资料完整程度划分为：</div>
                <div class="con">展示类项目 -> 预热类项目 -> 热门类项目 -> 准路演类项目</div>
            </div>
            <div>
                <div class="title">请仔细查阅 《用户咨询服务协议》 及 《风险告知书》 
中的所有内容 ，并愿意自行承担由此产生的所有风险！</div>
                <div class="con">高等级的项目，将会受到更多合伙人的关注与青睐。</div>
            </div>
            <div>
                <div class="title">*为必填项目</div>
                <div class="con">项目创建完成后，可进入合伙人风采页面，主动向您感兴趣
的合伙人递交项目，邀请关注。</div>
            </div>
        </div>
        <div class="footer">
            <div class="agree" @click="getAgree">
                <i><img v-if="agree" src="/static/images/blueTick.png"></i>
                <p>同意<a href="/pages/index/main">《用户咨询服务协议》</a>及<a href="/pages/index/main">《风险告知书》</a>并愿意自行承担由此产生的所有风险。</p>
            </div>
            <div class="create">
                <button :class="{yes:agree}">+创建项目</button>
            </div>
        </div>
    </div>
</template>

<script>
import userHeader from '@/components/userHeader'
export default {
    data: function () {
        return {
            agree: false
        }
    },
    components: {
        userHeader
    },
    methods: {
        getAgree: function () {
            let _agree = this.agree
            this.agree = !_agree
        }
    }
  
}
</script>

<style>

page {
    /* page是小程序的独有dom */
    background: #f6f6f6;
}

.container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}

.tips>div{
    padding: 28rpx 30rpx;
    background: #fff;
}

.tips .title,
.tips .con{
    font-family: 'PingFang', Microsoft Yahei;
    font-size: 26rpx;
    color: #333;
    line-height: 36rpx;
}

.tips .title {
    font-weight: 600;
    margin-bottom: 20rpx;
    position: relative;
    text-indent: 25rpx;
}

.tips .title:before {
    content: '';
    display: inline-block;
    width: 6rpx;
    height: 30rpx;
    background-color: #ff7803;
    position: absolute;
    top: 0;
    left: 0;
}

.agree {
    margin: 100rpx auto 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.agree i{
    display: inline-block;
    margin-right: 20rpx;
    width: 35rpx;
    height: 35rpx;
    background-size: 30rpx 30rpx;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAQ0lEQVRIx2NMbL33n2EAANNAWDpq8ciwmAWXxPxqJUZqWIAr14y8oB61eNTiUYtHLR61eNTiUYvhgHG0XT1q8bCzGADuAgnDtGMDTAAAAABJRU5ErkJggg==");
    position: relative;
}

.agree i img {
    width: 34rpx;
    height: 29rpx;
    position: absolute;
    right: 0;
    top: 0;
}

.agree p {
    font-size: 20rpx;
    color: #333;
    line-height: 1.5;
    width: 384rpx;
}

.agree p a {
    display: inline;
    color: #3A6EDB;
}

.create {
    font-size: 0;
}

.create button {
    outline: none;
    width: 510rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: none;
    border: solid 3rpx #cdcdcd;
    color: #cdcdcd;
    font-size: 30rpx;
    line-height: 80rpx;
}

.create button.yes {
    background-color: #FF7803;
    color: #fff;
}
</style>

