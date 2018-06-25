<template>
    <div class="project-card" :class="{gray: gray}" @click="emitEvent">
        <div class="collect" @click="collect">
            <img v-if="!collected" src="/static/images/collect.png">
            <img v-if="collected" src="/static/images/collected.png">
        </div>
        <div class="img">
            <img :src="detail&&baseUrl+detail.logo">
            <div class="heat-img" :class="{gray: gray}">
                <img v-if="heat <= 50" src="/static/images/hot_low.png">
                <img v-if="heat > 50" src="/static/images/hot_high.png">
            </div>
        </div>
        <div class="bottom">
            <div class="info">
                <div class="name">
                    <span>{{detail.title}}</span>
                    <span>{{classification}}</span>
                </div>
                <p class="slogan">{{slogan}}</p>
                <p class="type">{{type}}</p>
            </div>
            <div class="mark">
                <div class="heat"><span>热度：</span><span :class="{hot: heat > 50}">{{heat}}%</span></div>
                <div class="address">查看项目预期地址</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    export default {
        props: ['gray', 'detail'],
        data: function () {
            return {
                imgUrl: '/static/images/project-test1.png',
                name: '爆炸鸭脖',
                classification: '热门类项目',
                slogan: '好特么好吃',
                type: '餐饮美食|饮食饮料',
                heat: 35,
                collected: false
            }
        },
        methods: {
            collect: function () {
                this.collected = !this.collected
            },
            emitEvent: function () {
                console.log(this.detail)
                this.$emit('handlerClick')
            }
        },
        computed: {
            ...mapGetters(['baseUrl'])
        }
    }
</script>

<style>
.project-card {
    position: relative;
    box-sizing: border-box;
    margin: 30rpx auto 50rpx;
    width: 650rpx;
    background: #fff;
}

.project-card.gray {
    background: #f6f6f6;
}

.img {
    width: 650rpx;
    height: 360rpx;
    position: relative;
    z-index: 1;
}

.img>img {
    width: 650rpx;
    height: 360rpx;
    border-radius: 20rpx;
}

.heat-img {
    position: absolute;
    background: #fff;
    width: 87rpx;
    height: 87rpx;
    border-radius: 50%;
    right: 48rpx;
    bottom: -43rpx;
}

.heat-img.gray {
    background: #f6f6f6;
}

.heat-img img {
    width: 43rpx;
    height: 38rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.collect {
    position: absolute;
    top: -5rpx;
    right: 50rpx;
    width: 70rpx;
    height: 70rpx;
    box-shadow: 0 0 10rpx #999;
    background: #fff;
    border-bottom-left-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
    z-index: 2;
}

.collect img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 56rpx;
    height: 56rpx;
}

.bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.name {
    display: flex;
    align-items: center;
    margin:20rpx 0 16rpx;
}

.name span {
    display: inline-block;
}

.name span:first-child{
    font-size: 32rpx;
    color: #333;
    font-weight: 600;
    margin-right: 20rpx;
}

.name span:last-child {
    font-size: 22rpx;
    color: #f4d60f;
    border: solid 2rpx #f4d60f;
    line-height: 1;
    padding: 5rpx 22rpx;
}

.slogan,
.type {
    font-size: 28rpx;
    color: #999;
    margin-top: 12rpx;
}

.type {
    font-size: 24rpx;
}

.heat {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: baseline;
}

.heat span:last-child {
    font-weight: normal;
    color: #3a6ebd;
    font-size: 54rpx;
}

.heat span:last-child.hot {
    color: #ff7803;
}

.address {
    font-size: 24rpx;
    color: #999;
}
</style>


