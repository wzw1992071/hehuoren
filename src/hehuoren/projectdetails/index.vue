<template>
  <div class="inner">
    <div>
      1
    </div>
   <div class="describe">
     <p>
      项目描述
     </p>
     <p>
       十年品牌、造就创业-六大寿司类型，50多种产品。十年品牌、造就创业-六大寿司类型，50多种产品。
     </p>
    </div>
    <ul class="address clear_left_float">
      <li>
          <img src="/static/images/gps.jpg" alt="">
          点击查看项目预期地址
      </li>
      <li>
          <img src="/static/images/gps.jpg" alt="">
          点击查看项目预期地址
      </li>
     </ul>
     <div class="team">
       <p>
         团队介绍
       </p>
       <p>
         啊啊飒飒大家哈士大夫控股以规范
       </p>
       <ul>
         <li class="clear_right_float">
           创始人
           <div>
             
           </div>
           <div>
             <p>张金中</p>
             <p>龙头老大哥</p>
           </div>
         </li>
         <li class="clear_right_float">
           顾问导师
           <div>
             
           </div>
           <div>
             <p>张金中</p>
             <p>龙头老大哥</p>
           </div>
         </li>
         <li class="clear_right_float">
           团队成员
           <div>
             
           </div>
           <div>
             <p>张金中</p>
             <p>龙头老大哥</p>
           </div>
         </li>
       </ul>
     </div>
     <div class="details">
       <p>
         详细信息
       </p>
       <div class="details-text">
         <p>
           现有店铺概况
           <span></span>
         </p>
         <p>
           店铺名称：坎坎坷坷扩
         </p>
         <p>
           <span>
            店铺总投入：19999999元
           </span>
           <span>
             从筹备倒运营：90天
           </span>
         </p>
         <p>
           <span>
            开业倒盈利时间：100天
           </span>
           <span>
            人均消费：90元
           </span>
         </p>
         <p>
           <span>
            上季度营业总收入:100000000元
           </span>
           <span>
            上年营业净利润:100000元
           </span>
         </p>
         <p>
            店铺地址：天赋广场
         </p>
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
                  <image :src="item?item.img:null" class="slide-image" />
                </div>
              </swiper-item>
            </block>
          </swiper>
       </div>
       <div class="details-text">
         <p>
           市场调研
           <span></span>
         </p>
         <p>
            当今时代，是个越来越个性化的时代，社会群体追求更多个性化需求的满足。而我们做的，就是找到一个小而美的点，将用户体验做到极致，从而形成“牵一发而动全身”的蝴蝶效应！
         </p>
       </div>
       <div class="details-text">
         <p>
           竞争优势
           <span></span>
         </p>
         <p>
            这个是一群走在互联网时代前沿的弄潮儿，他们既尊重传统，又不忘积极进取和创新。他们每个人都是餐饮界的老江湖，旗下都有不止一个自己的独立餐饮品牌。他们的抱团合作。
         </p>
       </div>
       <div class="details-text">
         <p>
           商业模式
           <span></span>
         </p>
         <p>
            餐饮娱乐休闲夜生活集于一体
         </p>
       </div>
       <div class="details-text">
         <p>
           项目品鉴
           <span></span>
         </p>
         <p>
            订座电话：1888888888
         </p>
         <p>
            本平台会员折扣优惠：8折
         </p>
         <p>
            联系人：王先生
         </p>
         <p>
            2018年爱速度还胡大红色的
         </p>
       </div>
       <div class="details-text">
         <p>
           项目大事记
           <span></span>
         </p>
         <p>
            2018年爱速度还胡大红色的
         </p>
       </div>
       <div class="details-text">
         <p>
           相关视频
           <span></span>
         </p>
         <p>
            这里是视屏
         </p>
       </div>
     </div>
     <div class="details">
       <p>
         合伙需求
       </p>
       <div class="details-text">
         <p>
           股权设置
           <span></span>
         </p>
         <p>
           营业面积：200平
         </p>
         <p>
           项目总投资：2000000元
         </p>
         <p>
           <span>
             项目方出资：500000元
           </span>
           <span>
             合伙方出资：1500000元
           </span>
         </p>
         <p>
           <span>
             项目方股份占比：25%
           </span>
           <span>
             合伙方股份占比：75%
           </span>
         </p>
         <p>
           <span>
             项目方收益比例：35%
           </span>
           <span>
             合伙方收益比例：65% 
           </span>
         </p>
       </div>
       <div class="details-text">
         <p>
           资金用途
           <span></span>
         </p>
         <p>
            是否加盟：否
         </p>
         <p>
            加盟费：100元
         </p>
         <p>
            预付租金费用：100000元/季
         </p>
         <p>
            开业前的员工储备培训开支：20000元
         </p>
         <p>
            共计：2月
         </p>
         <p>
            开业后员工开支：20000元
         </p>
         <p>
            装修费用：200000元
         </p>
       </div>
       <div class="details-text">
         <p>
           运营管控
           <span></span>
         </p>
         <p>
            合伙成功后开店时间不可超过：45天
         </p>
         <p>
            毛利率不得低于：50%
         </p>
         <p>
            分红周期：90天/次
         </p>
         <p>
            股东管理办法及要求：3月一次股东大会
         </p>
         <p>
            资金监管：每日财报通过合伙人群披露
         </p>
         <p class="show-text">
          为保障项目方与合伙人共同的权益，项目方郑重承诺：如项目方未履行以上运营管控方案，由此造成的一切损失，由项目方全部承担。
         </p>
       </div>
       <div class="details-text">
         <p>
           退出机制
           <span></span>
         </p>
         <p>
            18个月封闭期
         </p>
       </div>
       <div class="details-text">
         <p>
           合伙协议摘要
           <span></span>
         </p>
         <p class="details-img">
            这里是图片
         </p>
       </div>
     </div>
     <div class="details">
       <p>
         合伙详情
       </p>
       <div class="scroll-bar">
         <p>
           消费合伙单笔 10000 元 | 股份占比( 26% )
         </p>
         <p>
           已合伙 0 份 | 共计 40 份
         </p>
         <ul class="clear_left_float">
           <li>
             完成度：
           </li>
           <li>
             <div class="scroll-box">
               <span :style="'width:'+Number1"></span>
             </div>
           </li>
           <li>
             {{Number1}}
           </li>
         </ul>
       </div>
       <div class="scroll-bar">
         <p>
           股本合伙单笔 30000 元 | 股份占比( 20% )
         </p>
         <p>
           已合伙 0 份 | 共计 40 份
         </p>
         <ul class="clear_left_float">
           <li>
             完成度：
           </li>
           <li>
             <div class="scroll-box">
               <span :style="'width:'+Number2"></span>
             </div>
           </li>
           <li>
             {{Number2}}
           </li>
         </ul>
       </div>
       <div class="scroll-bar">
         <p>
           领头合伙单笔 100000 元 | 股份占比( 20% )
         </p>
         <p>
           已合伙 0 份 | 共计 40 份
         </p>
         <ul class="clear_left_float">
           <li>
             完成度：
           </li>
           <li>
             <div class="scroll-box">
               <span :style="'width:'+Number3"></span>
             </div>
           </li>
           <li>
             {{Number3}}
           </li>
         </ul>
       <!-- 我想 -->
       <p class="woxiang">
         我想：
       </p>
       <ul class="clear_left_float bottom-list">
         <li>
           <a href="###">
             <img src="/static/images/guanzhu.png" alt="">
              关注
           </a>
         </li>
         <li>
           <a href="###">
             <img src="/static/images/luyan.png" alt="">
             报名路演
           </a>
         </li>
         <li>
           <a href="###">
             <img src="/static/images/hehuoren.png" alt="">
             合伙运营
           </a>
         </li>
         <li>
           <a href="###">
             <img src="/static/images/lingdao.png" alt="">
             领头
           </a>
         </li>
       </ul>
       </div>
     </div>
  </div>
</template>


<script>
export default {
  data: function() {
    return {
      Number1: "12%",
      Number2: "80%",
      Number3: "16%",
      // 轮播
      indicatorDots: true,
      indicatorColor: "#fff",
      indicatorActiveColor: "#FF7803",
      autoplay: false,
      interval: 5000,
      duration: 1000,
      optionsShow: false,
      classInfos: [
        {
          img: '/static/images/showbanner.jpg'
         },
         {
           img: '/static/images/showbanner.jpg'
         }
      ],
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped  lang='less'>
.inner {
  background-color: #f6f6f6;
}
.describe {
  width: 100%;
  margin-top: 43rpx;
  padding: 24px 30px 0;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1rpx solid #f5f5f5;
}
.describe p:nth-child(1) {
  color: #ff7803;
  font-size: 34rpx;
  text-align: center;
}
.describe p:nth-child(2) {
  font-size: 28rpx;
  padding-bottom: 44rpx;
}
.address {
  padding: 10rpx 0;
  font-size: 24rpx;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.address li {
  width: 50%;
  text-align: center;
}
.address li:nth-child(1) {
  border-right: 1rpx solid #f5f5f5;
  box-sizing: border-box;
}
.address li img {
  width: 22rpx;
  height: 29rpx;
  vertical-align: middle;
  position: relative;
  top: -2rpx;
}
.team {
  margin-top: 20rpx;
  background-color: #fff;
  padding: 28rpx 0 0;
  p:nth-child(1) {
    text-align: center;
    color: rgba(255, 120, 3, 1);
    font-size: 34rpx;
    margin-bottom: 28rpx;
  }
  p:nth-child(2) {
    font-size: 28rpx;
    padding-bottom: 22rpx;
    padding-left: 32rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  ul {
    li {
      height: 140rpx;
      line-height: 140rpx;
      border-bottom: 1rpx solid #f5f5f5;
      padding: 0px 30rpx;
      div:nth-child(1) {
        width: 90rpx;
        height: 90rpx;
        border-radius: 45rpx;
        background-color: #000;
        overflow: hidden;
        margin-top: 30rpx;
        margin-left: 20rpx;
      }
      div:nth-child(2) {
        line-height: 24rpx;
        margin-top: 40rpx;
        p:nth-child(1) {
          text-align: right;
          font-size: 28rpx;
          color: #000;
        }
        p:nth-child(2) {
          border: 0px;
          font-size: 26rpx;
          text-align: right;
          color: #666666;
        }
      }
    }
  }
}
.details {
  margin-top: 20rpx;
  background-color: #fff;
  > p {
    font-size: 34rpx;
    color: rgba(255, 120, 3, 1);
    padding: 52rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
    text-align: center;
  }
}
.details-text {
  padding: 38rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
  p {
    font-size: 26rpx;
    span {
      display: inline-block;
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .show-text {
    color: #154ff5;
    margin-top: 32rpx;
  }
  .details-img {
    width: 100%;
  }
}
.details-text p:nth-child(1) {
  font-size: 30rpx;
  position: relative;
  margin-bottom: 18rpx;
  span {
    position: absolute;
    width: 60rpx;
    border-radius: 3rpx;
    height: 6rpx;
    background: rgba(255, 120, 3, 1);
    left: 0rpx;
    bottom: -5rpx;
  }
}
.scroll-bar {
  padding: 36rpx 30rpx;
  p {
    font-size: 26rpx;
    color: rgba(51, 51, 51, 1);
    line-height: 36rpx;
  }
  ul {
    li {
      font-size: 26rpx;
    }
    li:nth-child(1),
    li:nth-child(3) {
      width: 15%;
    }
    li:nth-child(3) {
      text-align: right;
    }
    li:nth-child(2) {
      width: 70%;
      .scroll-box {
        width: 100%;
        height: 26rpx;
        border-radius: 10px;
        box-shadow: -5rpx -5rpx 10rpx #e8e8e8 inset; /* For Latest Opera */
        overflow: hidden;
        position: relative;
        top: 8rpx;
        span {
          color: transparent;
          width: 78%;
          height: 26rpx;
          background-color: rgba(255, 120, 3, 1);
          display: block;
          border-radius: 10px;
        }
      }
    }
  }
  .woxiang {
    color: #cbcbcb;
    font-size: 26rpx;
    border-bottom: 1rpx solid rgba(245, 245, 245, 1);
    margin-top: 50rpx;
  }
  .bottom-list {
    padding: 26rpx 0rpx 0rpx 0rpx;
    li {
      width: 25% !important;
      text-align: center;
      line-height: 24rpx;
      border-right: 1px solid #f5f5f5;
      box-sizing: border-box;
      a {
        display: block;
        text-align: center;
      }
      img {
        width: 30rpx;
        height: 30rpx;
        position: relative;
        top: 5rpx;
      }
    }
    li:nth-child(4) {
      border: 0;
    }
  }
}
.class-info{
  width: 90%;
}
._swiper{
  margin-top: 20rpx;
}
._swiper .class-info ._image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 90%;
  height: 70%;
  z-index: -1;
}
</style>


