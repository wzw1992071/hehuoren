<template>
  <div class="container">
    <user-header></user-header>
    <div class="list">
      <div v-for="(item, index) in lists" :key="index" class="list-item" @click="listEvent(item.eventParam)">
        <div class="list-info">
          <img v-if="!isLogin" :src="item?item.icon:null">
          <img v-if="isLogin" :src="item?item.loginIcon:null">
          <span>{{item?item.name:null}}</span>
        </div>
        <div class="arrow">
          <span v-if="item?item.isMessage:false">{{item?item.number:0}}</span>
          <img :src="isLogin?loginArrow:notLoginArrow">
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import userHeader from "@/components/userHeader";

export default {
  data: function() {
    return {
      isLogin: this.$store.getters.isLogin,
      loginArrow: '/static/images/arrow.png',
      notLoginArrow: '/static/images/nloginArrow.png',
      lists: [
        {
          name: "我的项目",
          icon: "/static/images/nloginProject.png",
          loginIcon: "/static/images/loginProject.png",
          isMessage: false,
          eventParam: "/pages/project/main"
        },
        {
          name: "我的资料",
          icon: "/static/images/nloginData.png",
          loginIcon: "/static/images/loginData.png",
          isMessage: false,
          eventParam: "/pages/user/main"
        },
        {
          name: "站内消息",
          icon: "/static/images/nloginMessage.png",
          loginIcon: "/static/images/loginMessage.png",
          isMessage: true,
          eventParam: "/pages/message/main",
          number: '999+'
        },
        {
          name: "我要吐槽",
          icon: "/static/images/nloginAdvise.png",
          loginIcon: "/static/images/loginAdvise.png",
          isMessage: false,
          eventParam: "/pages/advise/main"
        },
        {
          name: "安全退出",
          icon: "/static/images/nloginLogin.png",
          loginIcon: "/static/images/loginLogin.png",
          isMessage: false,
          eventParam: "logout"
        }
      ]
    };
  },
  components: {
    userHeader
  },
  methods: {
    listEvent(url) {
      if (url == "logout") {
        console.log("log---out");
      } else {
        console.log(url);
        wx.navigateTo({
          url: url
        })
      }
    }
  }
};
</script>

<style scoped>

.list-item {
    background: #fff;
    padding: 0 30rpx 0 40rpx;
    margin-bottom: 2rpx;
    height: 110rpx;
    display: flex;
    justify-content: space-between;
    font-size: 30rpx;
    color: #333;
    align-items: center;
}

.list-info {
    display: flex;
    align-items: center;
}

.list-info img{
    width: 40rpx;
    height: 40rpx;
    margin-right: 40rpx;
}

.arrow {
    display: flex;
    align-items: center;
}

.arrow img {
    width: 20rpx;
    height: 32rpx;
    margin-left: 20rpx;
}

.arrow span {
    display: inline-block;
    padding: 0 5rpx;
    height: 30rpx;
    border-radius: 5rpx;
    background: #d10000;
    color: #fff;
    font-size: 22rpx;
    line-height: 30rpx;
}
</style>


