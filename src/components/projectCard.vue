<template>
    <div class="project-card" :class="{gray: gray}" @click="emitEvent">
        <div class="collect" @click.stop="collect">
            <img v-if="!collected" src="/static/images/collect.png">
            <img v-if="collected" src="/static/images/collected.png">
        </div>
        <div class="img">
            <img :src="detail&&baseUrl+detail.logo">
            <div class="heat-img" :class="{gray: gray}">
                <img v-if="detail.jdb <= 50" src="/static/images/hot_low.png">
                <img v-if="detail.jdb > 50" src="/static/images/hot_high.png">
            </div>
        </div>
        <div class="bottom">
            <div class="info">
                <div class="name">
                    <span>{{detail.title}}</span>
                    <span>{{detail.grade_name}}</span>
                </div>
                <p class="slogan">{{detail.yijuhua}}</p>
                <p class="type">{{detail.typename+'|'+detail.typenamedetail}}</p>
            </div>
            <div class="mark">
                <div class="heat"><span>热度：</span><span :class="{hot: detail.jdb > 50}">{{detail.jdb}}%</span></div>
                <div class="address">查看项目预期地址</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {focuseProject} from '@/apis/index'
    export default {
        props: ['gray', 'detail'],
        data(){
          return {
            collected:false
          }
        },
        methods: {
            collect: function () {
              let param = {
                id:this.detail.id,
                separate:1,
                type:1,
                token:this.token
              };
              this.collected?param.flag=4:param.flag=1;
              focuseProject(param).then(res=>{
                if (res.status == 1) {
                  this.collected = !this.collected;
                  wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 2000
                  });
                } else {
                  if (res.status == -3) {
                    wx.showToast({
                      title: res.msg,
                      icon: 'none',
                      duration: 2000
                    });
                    return false;
                  }
                  if (res.status != -1) {
                    wx.showModal({
                      title: '提示',
                      content: res.msg,
                      success: function(res) {
                        if (res.confirm) {

                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                }
              })
            },
            emitEvent: function () {
                this.$emit('handlerClick',this.detail)
            }
        },
        mounted(){
          this.collected =!!(this.detail.guanzhu_css_class == 'yes_guanzhu');
        },
        computed: {
            ...mapGetters(['baseUrl','token'])
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


