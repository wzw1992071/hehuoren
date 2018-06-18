<template>
  <div class="option-links">
    <div class="link" @click="jump('/pages/index/main')"><img src="/static/images/home.png" alt="">首页</div>
    <div class="link" @click="jump('/pages/index/main')"><img src="/static/images/createProject.png" alt="">创建项目</div>
    <div class="link" @click="jump('/pages/projectShow/main')"><img src="/static/images/manageProject.png" alt="">项目集锦</div>
    <div class="link" @click="jump('/pages/partner/main')"><img src="/static/images/user.png" alt="">合伙人风采</div>
    <div class="link" @click="jump('/pages/manual/main')" :wx:if="!isLogin"><img src="/static/images/ordinance.png" alt="">条款规定</div>
    <div class="link" @click="toggleLogin" :wx:if="!isLogin"><img src="/static/images/login.png" alt="">登录/注册</div>
    <div class="link" @click="jump('/pages/user/main')" :wx:if="isLogin"><img src="/static/images/users.png" alt="">个人中心</div>
    <div class="link" @click="logout" :wx:if="isLogin"><img src="/static/images/login.png" alt="">退出</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
      data() {
        return {}
      },
      methods: {
        toggleLogin: async function () {
          // 微信跳转
          wx.navigateTo({
            url: '/pages/login/main'
          })
        },
        jump: function (url) {
          this.$emit('update:optionsShow', false)
          if (url == '/pages/manual/main') {
            wx.navigateTo({url})
          } else {
            wx.switchTab({url})
          }

        },
        logout: async function () {
          this.$store.dispatch('logout')
        }
      },
      created() {

      },
      computed: {
        ...mapGetters(['isLogin', 'baseUrl']),
      },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

  .option-links .link {
    width: 210rpx;
    height: 64rpx;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    color: #333333;
  }

  .option-links .link img {
    width: 30rpx;
    height: 30rpx;
    margin-right: 30rpx;
  }
</style>
