<template>
  <view class="container">
    <div class="mock" :wx:if="optionsShow" @click="toggle">
      <div class="option-links">
        <a href="/pages/index/main"><img src="/static/images/home.png" alt="">首页</a>
        <a href="/pages/index/main"><img src="/static/images/createProject.png" alt="">创建项目</a>
        <a href="/pages/projectShow/main"><img src="/static/images/manageProject.png" alt="">项目集锦</a>
        <a href="/pages/partner/main"><img src="/static/images/user.png" alt="">合伙人风采</a>
        <a href="/pages/index/main" :wx:if="!isLogin"><img src="/static/images/ordinance.png" alt="">条款规定</a>
        <a @click="toggleLogin" :wx:if="!isLogin"><img src="/static/images/login.png" alt="">登录/注册</a>
        <a href="/pages/user/main" :wx:if="isLogin"><img src="/static/images/users.png" alt="">个人中心</a>
        <a @click="logout" :wx:if="isLogin"><img src="/static/images/login.png" alt="">退出</a>
      </div>
    </div>
    <scroll-view :scrol-y="1" @bindscroll="scrollTop" height="500px" >
    <div class="header">
      <NNav @toggle="toggle" :tipsNumber="tipsNumber" />
      <div class="counter">
        <div class="number-scroll">
          <div class="title">合伙人</div>
          <div><span></span></div>
          <div class="number">
            <NumberScroll :number="partnerTotal"/>
          </div>
        </div>
        <div class="number-scroll">
          <div class="title">项目数</div>
          <div><span></span></div>
          <div class="number">
            <NumberScroll :number="projectTotal"/>
          </div>
        </div>
      </div>
      <div class="prompt">
        <span>*数据来源合火人后台数据库，统计截止时间{{promptDate}}</span>
      </div>
    </div>

    <div class="mainLink">
      <a href="/pages/projectShow/main">
        <div class="card card-one">
          <div class="title">合火人</div>
          <div>查看项目</div>
        </div>
      </a>
      <a href="/pages/partner/main">
        <div class="card card-two">
          <div class="title">项目方</div>
          <div> 优质投资人</div>
        </div>
      </a>
    </div>

    <div class="class-swiper">
      <div class="subtitle">
        <span>运营课程</span>
        <a href="/pages/manual/main">查看全部</a>
      </div>
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :indicator-color="indicatorColor"
        :indicator-active-color='indicatorActiveColor'
        :display-multiple-items='2'
        :circular=1
        class="swiper-box"
        >
        <block :wx:for="classInfos" :wx:key="index">
          <swiper-item>
            <div class="class-info">
              <!-- 避免报错：item为undefined -->
              <span>{{item?item.tit:null}}</span>
              <div>{{item?item.content:null}}</div>
              <image :src="item?item.img:null" class="slide-image" />
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>

    <div class="project-swiper" :wx:if="res">
      <div class="subtitle">
        <span>优质项目</span>
        <a href="/pages/projectShow/main">查看全部</a>
      </div>
       <swiper
        :indicator-dots="0"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular=1
        class="swiper-box"
        >
        <block :wx:for="res" :wx:key="index">
          <swiper-item>
            <div class="image">
              <image v-bind:src="item?baseUrl+item.logo:''" class="slide-image" width=100 />
            </div>
            <div class="intro">
              <div class="intro-title">{{item?item.title:''}}</div>
              <div class="intro-con">
                <div>{{item?item.yijuhua:''}}<span>{{item?item.diqu:''}}</span></div>
                <div>热度<span>{{item?item.guanzhu_count:''}}%</span></div>
              </div>
            </div>
          </swiper-item>
        </block>
      </swiper>

    </div>

    <div class="footer">
      <img src="/static/images/logo-yellow.png" class="footer-logo">
      <div class="footer-links">
        <a href="/pages/index/main">首页</a>
        <a :wx:if="!isLogin" href="/pages/login/main">登录/注册</a>
        <a href="/pages/manual/main">运营课程</a>
        <a href="/pages/projectShow/main">项目集锦</a>
        <a href="/pages/partner/main">优质合伙人</a>
      </div>
    </div>
    <div class="to-top">
      <a @catchtap="goTop"><img src="/static/images/top.png"></a>
    </div>
    </scroll-view>
  </view>
</template>

<script type="text/ecmascript-6">
import card from "@/components/card";
import NNav from "@/components/nav";
import NumberScroll from '@/components/numberScroll.vue'
import { mapGetters } from 'vuex'
/*引入请求*/
import { homeLoad, myMassage} from '@/apis/index'
export default {
  data: function() {
    return {
      tipsNumber: 12,
      partnerTotal: 9655,
      projectTotal: 9825,
      promptDate: "2018年05月01日",
      scrollTop: 0,
      // v-for wechat
      classInfos: [
        {
          tit: '重要',
          content: '用户协议',
          img: '/static/images/orangeFile.png'
         },
         {
           tit: '必读',
           content: '风险告知书',
           img: '/static/images/blueFile.png'
         }
      ],
      banner: [],
      res:[],// 优质项目
      indicatorDots: true,
      indicatorColor: "#fff",
      indicatorActiveColor: "#FF7803",
      autoplay: false,
      interval: 5000,
      duration: 1000,
      optionsShow: false
    };
  },

  components: {
    NNav,
    NumberScroll
  },

  computed: {
    ...mapGetters(['isLogin','baseUrl']),
  },

  watch:{
    'isLogin':function () {
      this.optionsShow = false;
      this.loadInfo();
    }
  },

  methods: {
    toggleLogin: async function() {
      // 微信跳转
      wx.navigateTo({
        url: '/pages/login/main'
      })
    },
    toggle: function (e) {
      if(e === undefined) {
        this.optionsShow = !this.optionsShow
      } else {
        if(e.x > 180 && e.y > 50  && e.y < 260) {
        } else {
          this.optionsShow = !this.optionsShow
        }
      }
    },
    scrollTop: function (e) {

    },
    loadInfo:function () {
      homeLoad({
        separate:1
      }).then(res=>{
        let data = res.data;
        this.partnerTotal = data.tzrcountnum||0;
        this.projectTotal = data.xmcountnum||0;
        this.tipsNumber = data.no_read||0;
        this.grade = data.grade||[];
        this.banner = data.banner;
        this.datajson = data.datajson||0;
        this.res = data.res||[];
      }).catch(error=>{
      });
    },
    logout: async function () {
      this.$store.dispatch('logout')
      this.isLogin = false
    }
  },

  mounted(){
    this.loadInfo();
    // 对用户是否已经登陆判断
    this.$store.dispatch('UpdateInfo');
  }
};
</script>

<style scoped>.container {
  padding-bottom: 20rpx;
}

.header {
  width: 100%;
  height: 600rpx;
  background-size: 100% 100%;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAJYCAIAAACy7PT1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2ODg4ODU3NTA4NDExRThBOERBQkIzRjE5QkY0NjkwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE2ODg4ODU4NTA4NDExRThBOERBQkIzRjE5QkY0NjkwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTY4ODg4NTU1MDg0MTFFOEE4REFCQjNGMTlCRjQ2OTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTY4ODg4NTY1MDg0MTFFOEE4REFCQjNGMTlCRjQ2OTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kIh4wAAA0PklEQVR42uzd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");
  color: #fff;
  display: flex;
  flex-direction: column;
}

.counter {
  display: flex;
  padding: 90rpx 55rpx 0;
  justify-content: space-between;
  flex-grow: 1;
}

.counter .number-scroll {
  width: 50%;
}

.counter .number-scroll div:nth-child(2) span{
  display: inline-block;
  width: 64rpx;
  height: 2rpx;
  background: #fff;
}

.counter .number-scroll:last-child {
  text-align: right;
}

.counter .number {
  font-size: 100rpx;
}

.prompt {
  font-size: 18rpx;
  text-align: right;
  padding: 0 18rpx 10rpx;
}

.card {
  height: 220rpx;
  border-radius: 10rpx;
  margin: 20rpx 30rpx;
  padding: 25rpx 20rpx;
  box-shadow: 0 0 30rpx #979797;
  background-size: 100% 100%;
}

.card-one {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArQAAADZCAIAAABeqTQgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMxQzg1RTEzNTA4MzExRTg4N0M0ODlEQjhBQjg1RDIzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMxQzg1RTE0NTA4MzExRTg4N0M0ODlEQjhBQjg1RDIzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzFDODVFMTE1MDgzMTFFODg3QzQ4OURCOEFCODVEMjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzFDODVFMTI1MDgzMTFFODg3QzQ4OURCOEFCODVEMjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jiujzAAAlKElEQVR42uyd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");
}

.card-two {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArQAAADcCAIAAAAOZKWTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlGNkU4Qzg4NTA4MzExRThBNkIzQjQwQjEyRTZDNURBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlGNkU4Qzg5NTA4MzExRThBNkIzQjQwQjEyRTZDNURBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUY2RThDODY1MDgzMTFFOEE2QjNCNDBCMTJFNkM1REEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUY2RThDODc1MDgzMTFFOEE2QjNCNDBCMTJFNkM1REEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5+NUvIAAAet0lEQVR42uyd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");
}

.card .title {
  font-size: 40rpx;
}

.card div:last-child {
  font-size: 30rpx;
}

.mainLink a:first-child .card div:last-child,
.mainLink a:last-child .card .title {
  text-align: right;
}

.class-swiper,
.project-swiper {
  padding: 35rpx 20rpx;
  background: #fff;
}

.class-info {
  position: relative;
  width: 228rpx;
  color: #fff;
}

.class-info span {
  display: inline-block;
  font-size: 26rpx;
  width: 285rpx;
  padding-left: 26rpx;
}

.class-info div {
  width: 285rpx;
  font-size: 40rpx;
  margin-top: 60rpx;
  text-align: center;
}

._swiper .class-info ._image,
.swiper .class-info .image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 285rpx;
  height: 228rpx;
  z-index: -1;
}

.class-swiper .swiper-box {
  margin-top: 100rpx;
}

.subtitle {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.subtitle span {
  font-size: 30rpx;
  line-height: 30rpx;
  display: inline-block;
  position: relative;
  padding-left: 15rpx;
}

.subtitle span:before {
  content: "";
  display: inline-block;
  height: 30rpx;
  width: 6rpx;
  background: #ff7803;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}

.subtitle a {
  font-size: 24rpx;
  color: #ccc;
  text-decoration: underline;
}



.project-swiper {
  margin-top: 20rpx;
}

/* swiper */

.project-swiper ._swiper,
.project-swiper .swiper  {
  height: 725rpx;
  box-shadow: 0 0 30rpx #333;
  border-radius: 15rpx;
  margin-top: 40rpx;
}

.project-swiper ._swiper-item,
.project-swiper .swiper-item {
  height: 560rpx;
}

.project-swiper ._swiper-item image
.project-swiper .swiper-item image {
  width: 100%;
  height: 590rpx;
}

.project-swiper .intro {
  height: 164rpx;
  padding: 0 40rpx;
}

.project-swiper .intro-title {
  font-size: 32rpx;
  line-height: 1.5;
}

.project-swiper .intro-con {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.project-swiper .intro-con div:first-child {
  color: #9a9a9a;
  font-size: 24rpx;
  line-height: 1.2;
}

.project-swiper .intro-con div:first-child span {
  display: block;
}

.project-swiper .intro-con div:last-child {
  display: flex;
  font-size: 28rpx;
  align-items: flex-end;
  line-height: 1;
}

.project-swiper .intro-con div:last-child span {
  font-size: 40rpx;
  color: #68aef6;
  display: inline-block;
  padding-left: 28rpx;
}

.footer-logo {
  width: 64rpx;
  height: 64rpx;
  display: block;
  margin: 20rpx auto;
}

.footer-links {
  height: 60rpx;
  border: solid 2rpx #FF7803;
  border-width: 2rpx 0 2rpx 0;
  display: flex;
  justify-content: space-around;
  width: 690rpx;
  margin: 0 auto;
  font-size: 24rpx;
  align-items: center;
  color: #ff7803;
}

.footer-links a {
  display: inline-block;
  flex-grow: 1;
  border-right: solid 1px #000;
  text-align: center;
}

.footer-links a:last-child {
  border: none;
}

.to-top a {
  display: block;
  width: 75rpx;
  margin: 20rpx auto;
}

.to-top img {
  width: 75rpx;
  height: 60rpx;
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
