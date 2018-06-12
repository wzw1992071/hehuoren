<template>
    <div class="mock" v-if="optionsShow" @click="toggle">
      <div class="option-links">
        <a href="/pages/index/main"><img src="/static/images/home.png" alt="">首页</a>
        <a href="/pages/index/main"><img src="/static/images/createProject.png" alt="">创建项目</a>
        <a href="/pages/index/main"><img src="/static/images/manageProject.png" alt="">项目集锦</a>
        <a href="/pages/index/main"><img src="/static/images/user.png" alt="">合伙人风采</a>
        <a href="/pages/index/main" v-if="!isLogin"><img src="/static/images/ordinance.png" alt="">条款规定</a>
        <a @click="toggleLogin" v-if="!isLogin"><img src="/static/images/login.png" alt="">登录/注册</a>
        <a href="/pages/index/main" v-if="isLogin"><img src="/static/images/users.png" alt="">个人中心</a>
        <a @click="logout" v-if="isLogin"><img src="/static/images/login.png" alt="">退出</a>
      </div>
    </div>
</template>


<script>
export default {
  props: ['optionsShow'],
  data: function () {
    return {
      isLogin: this.$store.getters.isLogin
    }
  },
  methods: {
    toggle: function (e) {
      if(e === undefined) {
        // this.optionsShow = !this.optionsShow
        this.$emit('toggleShow')
      } else {
        if(e.x > 180 && e.y > 50  && e.y < 260) {
        } else {
          // this.optionsShow = !this.optionsShow
          this.$emit('toggleShow')
        }
      }
    },
    toggleLogin: async function() {
      // await this.$store.dispatch('toggleLogin')
      // this.isLogin = this.$store.getters.isLogin
      // 微信跳转
      wx.navigateTo({
        url: '/pages/login/main'
      })
    },
    logout: async function () {
      this.$store.dispatch('logout')
      this.isLogin = false
    }
  }
}
</script>

<style>
.option {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

.option img {
  width: 40rpx;
  height: 40rpx;
}

.mock {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 1000;
}

.option-links {
  width: 280rpx;
  padding: 20rpx 40rpx;
  background: #fff;
  position: absolute;
  top: 100rpx;
  right: 20rpx;
  border-radius: 10rpx;
}

.option-links:before {
  content: '';
  display: block;
  position: absolute;
  width: 20rpx;
  height: 20rpx;
  transform: rotate(45deg);
  top: -8rpx;
  right: 20rpx;
  background: #fff;
}

.option-links a {
  display: block;
  width: 210rpx;
  height: 64rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
}

.option-links a img {
  width: 30rpx;
  height: 30rpx;
  margin-right: 30rpx;
}

</style>

