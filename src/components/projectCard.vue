<template>
    <div class="project-card" :class="{gray: gray}" @click="emitEvent">
        <div class="collect" @click.stop="collect" v-if="cardtype===1">
            <img v-if="!collected" src="/static/images/collect.png">
            <img v-if="collected" src="/static/images/collected.png">
        </div>
        <div class="collect" @click.stop="edit" v-if="cardtype===2">
            <!--<img v-if="!collected" src="/static/images/collect.png">-->
            <!--<img v-if="collected" src="/static/images/collected.png">-->
            <span class="edit">修改</span>
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
                    <span class="zhanshilei" v-if="detail.grade==1">展示类</span>
                    <span class="yurelei" v-if="detail.grade==2">预热类</span>
                    <span class="remenlei" v-if="detail.grade==3">热门类</span>
                    <span class="luyanlei" v-if="detail.grade==4">准路演类</span>
                    <span class="red" v-if="detail.jieduan==1">首次开店</span>
                    <span class="red" v-if="detail.jieduan==2">开设分店</span>
                    <span class="red" v-if="detail.jieduan==3">老店重组</span>
                </div>
                <p class="slogan oneover">{{detail.yijuhua}}</p>
                <p class="type onetwo">{{detail.xiangmu_hy_name}}</p>
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
        props: ['gray', 'detail','cardtype'],
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
            },
            edit(){
               this.$emit('handlerEdit',this.detail)
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
  max-width: 4.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin: 0.2rem 0 0.16rem;
}

.name span {
  display: inline-block;
}

.name span:first-child {
  font-size: 0.32rem;
  color: #333;
  font-weight: 600;
  display: inline-block;
  width: 4.5rem;
}

.name span:nth-child(3),
.name span:nth-child(2) {
  font-size: 0.22rem;
  border: solid 0.02rem;
  line-height: 1;
  padding: 0.05rem 0.22rem;
  border-radius: 0.08rem;
  margin: .1rem 0;
}

.name span:nth-child(2) {
  margin-right: 0.2rem;
}
.name .remenlei {
  border-color: #f5db47;
  color: #f5db47;
}
.name .yurelei {
  border-color: #3adb99;
  color: #3adb99;
}
.name .luyanlei {
  border-color: #ff7803;
  color: #ff7803;
}

.name .red {

  border-color: #f00;
  color: #f00;
}
.name .zhanshilei {
  border-color: #3a6edb;
  color: #3a6edb;
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
.edit{
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 24rpx;
    color: #ff7803;
}
</style>


