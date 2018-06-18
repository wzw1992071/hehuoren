<template>
    <div class="header">
        <div class="background">
            <img :src="bgImg" class="bg-img">
            <div class="options">
                <div>
                    <span>{{city}}</span>
                    <img :src="cityImg" alt="">
                </div>
                <div class="opt"  @click="toggleOption">
                    <img src="/static/images/options.png" alt="">
                    <main-option :optionsShow="show"></main-option>
                </div>
            </div>
            <div class="user">
                <div class="user-info">
                    <template v-if="isLogin">
                      <img :src="userInfo?baseUrl+userInfo.icon:''" class="avatar" alt="">
                    </template>
                    <template v-if="!isLogin">
                      <img src="/static/images/avatar.png" class="avatar">
                    </template>
                    <div class="user-intro" v-if="isLogin">
                        <span>{{userInfo?userInfo.truename:""}}</span>
                        <span>{{userInfo?userInfo.gradeName:""}}</span>
                    </div>
                    <div class="user-notlogin" v-if="!isLogin">
                        <span>{{time}}好</span>
                        <div>请<span @click="login">登录/注册</span></div>
                    </div>
                </div>
                <div class="tips" v-if="isMessage?true:false">
                  未读：{{userInfo.no_read ? user.no_read : 0}}条 总计：{{tips.total}}条
                </div>
                <div v-if="isMessage?false:true" class="user-login">
                    <img :src="levelImg" class="levelImg">
                    <div>{{levelInfo}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import mainOption from "@/components/mainOption"
  export default {
    props: ['isMessage'],
    data: function () {
      return {
        show:false,
        time: '上午',
        bgImg: '/static/images/bg.png',
        city: '成都',
        cityImg: '/static/images/cloud.png',
        levelImg: '/static/images/update.png',
        levelInfo: '提升等级',
        tips: {
          notRead: 4,
          total: 10
        }
      }
    },
    computed: {
      ...mapGetters(['isLogin', 'userInfo','baseUrl'])
    },
    components:{
      mainOption
    },
    methods: {
      toggleOption() {
        this.show = !this.show;
      },
      login() {
        wx.navigateTo({
          url: '/pages/login/main'
        })
      },
      setTimes(){
        //获取上午下午
        let now = new Date()
        let hour = now.getHours();
        if (hour < 9) {
          this.time = "早上"
        } else if (hour < 12) {
          this.time = "上午"
        } else if (hour < 14) {
          this.time = "中午"
        } else if (hour < 17) {
          this.time = "下午"
        } else if (hour < 22) {
          this.time = "晚上"
        }
      }
    },
    mounted(){
      this.setTimes();
    }
  }
</script>

<style scoped>
.header {
    position: relative;
    z-index: 1;
    padding-bottom: 20rpx;
}

.background {
    position: relative;
}

.bg-img {
    position: absolute;
    width: 100%;
    height: 300rpx;
    left: 0;
    top: 0;
    z-index: -1;
}

.options {
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40rpx;
    line-height: 1;
    padding: 30px 30rpx 100rpx;
}

.options img {
    width: 40rpx;
    height: 40rpx;
    margin-left: 28rpx;
}

.user {
    width: 690rpx;
    box-sizing: border-box;
    height: 160rpx;
    border-radius: 10rpx;
    background: #fff;
    display: flex;
    padding: 0 20rpx 0 50rpx;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    box-shadow: 0 0 10rpx #f7f7f7;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-intro, .user-notlogin {
    padding-left: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.user-info span:first-child {
    font-size: 30rpx;
    color: #333;
}
.user-notlogin>span {
    font-size: 24rpx;
}
.user-intro span:last-child {
    font-size: 24rpx;
    color: #666;
}

.user-notlogin div {
    margin-top: 30rpx;
    font-size: 30rpx;
}

.user-notlogin div span {
    color: #ff7803;
}


.avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
}

.levelImg {
    width: 50rpx;
    height: 50rpx;
}

.user-login {
    text-align: center;
    color: #ff7803;
    font-size: 24rpx;
}

.tips {
    font-size: 24rpx;
    color: #ff7803;
}


</style>


