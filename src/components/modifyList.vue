<template>
    <div class="modify-list" @click="someEvent">
        <div class="text">
            <p>{{listItem.string1}}<span>{{listItem.string2}}</span>{{listItem.string3}}</p>
            <p>{{listItem.tip}}</p>
        </div>
        <div class="img"><img src="/static/images/advise.png"></div>
    </div>
</template>

<script>
export default {
    props: ['listItem'],
    methods: {
        someEvent: function () {
            this.$emit('eventHandler')
        }
    }
}
</script>

<style lang="less" scoped>
.modify-list {
    width:100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 20rpx 30rpx;
    align-items: center;
    line-height: 1;
    background: #fff;
    border-bottom: solid 2rpx #f6f6f6;
    .text {
        p:first-child {
            font-size: 30rpx;
            color: #333;
            margin-bottom: 20rpx;
            span {
                color: #ff7803;
            }
        }
        p:last-child {
            font-size: 24rpx;
            color: #999;
        }
    }
    .img {
        width: 30rpx;
        height: 30rpx;
        padding: 0;
        img {
            width: 30rpx;
            height: 30rpx;
            border-radius: 0;
        }
    }
}

</style>
