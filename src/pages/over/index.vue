<template>
  <div class="over-inner">
    <div class="over-title">
      <img src="../../../static/images/yes.png" alt="">
      <p>
        恭喜您完成项目资料发布!
      </p>
    </div>
    <div class="over-text">
      <p>
        不断完善项目资料解锁更多权限
      </p>
      <p>
        <img src="/static/images/dui.png" alt="" srcset="">
        成为展示类项目可线上与合伙人交流互动
      </p>

      <p>
        <img src="/static/images/dui.png" alt="" srcset="">
        成为预热类项目可获得更多合伙人的青睐
      </p>

      <p>
        <img src="/static/images/cuo.png" alt="" srcset="">
        成为热门类项目可以邀请合伙人线下路演
      </p>

      <p>
        <img src="/static/images/cuo.png" alt="" srcset="">
        成为准路演类项目可与合伙人一对一约谈
      </p>
    </div>
    <div class="over-button">
      <p>
        接下来你可以
      </p>
      <p>
        <a href="###">
          +继续完善资料提升项目等级
        </a>
      </p>
      <p>
        <a href="###">
          <img src="/static/images/phone.png" alt="">
          电话联系审核部门，加速审核
        </a>
      </p>
      <p>
        <a href="###">
          <img src="/static/images/left.png" alt="">
          返回个人中心
        </a>
      </p>
    </div>
  </div>
</template>


<script>
export default {
  data: function() {
    return {
      
    };
  },
  components: {},
  methods: {}
};
</script>

<style scoped  lang='less'>
.over-title{
  padding-top:86rpx;
  text-align: center;
  img{
    width: 140rpx;
    height: 140rpx;
    margin-bottom: 54rpx;
  }
  p{
    font-size:34rpx;
    border-bottom: 1rpx solid #F4F4F4;
    padding-bottom: 26rpx;
  }
}
.over-text{
  text-align: center;
  border-bottom:1px solid  #F4F4F4;
  padding-bottom:20rpx; 
  p:nth-child(1){
    padding-top: 26rpx;
    font-size:34rpx;
  }
  p{
      font-size: 24rpx;
      line-height: 70rpx;
    img{
      width: 36rpx;
      height: 32rpx;
      position: relative;
      top: 8rpx;
    }
  }
}
.over-button{
  text-align: center;
  padding-bottom: 90rpx;
  p:nth-child(1){
    font-size:34rpx;
    color: #333333;
  }
  p{
    margin-top: 26rpx;
    color: #3A6EDB;
    a{
      display: inline-block;
      height: 90rpx;
      width: 510rpx;
      line-height: 90rpx;
      font-size: 30rpx;
      border: 1rpx solid rgba(58,110,219,1);
      border-radius: 40rpx;
      img{
        width: 20rpx;
        height: 20rpx;
      }
    }
  }
  p:nth-child(3){
    color: #FF7803;
    a{
      border: 1rpx solid #FF7803;
    }
  }
  p:nth-child(4){
    color: #FF7803;
    a{
      border: 1rpx solid #FF7803;
      background-color: #FF7803;
      color: #fff;
      img{
        width: 30rpx;
        height: 24rpx;
      }
    }
  }
}
</style>


