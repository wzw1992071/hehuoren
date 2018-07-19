<template>
    <div class="mock">
        <div class="option-card">
            <div class="title">
                <span>{{title}}</span>
                <div class="img" @click="close">
                    <img src="/static/images/close.png">
                </div>
            </div>
            <div class="lists">
                <div
                    v-for="(item, index) in lists"
                    :key="index"
                    class="list-item"
                    @click="selected(item)"
                >{{item? item.typename ? item.typename : item.code ? item.code : item : item}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title','lists'],
    methods: {
        close: function () {
            this.$emit('close')
        },
        selected: function (val) {
            this.$emit('selected', val)
        }
    }
}
</script>

<style lang="less" scoped>
.mock {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .option-card {
        width: 500rpx;
        background: #fff;
        border-radius: 20rpx;
        div {
            box-sizing: border-box;
        }
        .title {
            background: rgba(246, 246, 246, 1);
            color: #ff7803;
            font-size: 30rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30rpx;
            height: 88rpx;
            border-top-left-radius: 20rpx;
            border-top-right-radius: 20rpx;
            .img {
                width: 50rpx;
                height: 50rpx;
                position: relative;
                img {
                    width: 30rpx;
                    height: 30rpx;
                    position: absolute;
                    top: 10rpx;
                    left: 10rpx;
                }
            }
        }
        .lists{
            .list-item {
                height: 74rpx;
                font-size: 26rpx;
                color: #333;
                text-align: center;
                line-height: 74rpx;
                border-bottom: solid 2rpx #f6f6f6;
                &:last-child {
                    border: none;
                }
            }
        }
    }
}
</style>


