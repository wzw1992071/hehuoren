<template>
  <div class="project-innner">
    <user-header></user-header>
    <div class="project-text">
      <p>
        修改或升级您的个人资料
      </p>
      <p>
        完善资料可获得更多合伙人青睐及达成合伙意向
      </p>
      <p>
        当前项目等级：一般合火人
      </p>
    </div>
    <ul class="show-list">
      <li v-for="(item, index) in lists" :key="index">
        <a>
          <p>
            修改<span>{{item.name}}</span>资料
          </p>
          <p>
            {{item.text}}
          </p>
          <img :src="item.icon">
        </a>
      </li>
    </ul>
  </div>
</template>


<script>
import userHeader from "@/components/userHeader";

export default {
  data: function() {
    return {
      lists: [
        {
          name: "一般合伙人",
          text: "生活圈、工作圈、文化程度...",
          icon: "/static/images/icon_xie.png",
          eventParam: "###"
        },
        {
          name: "认证合伙人",
          text: "可提供附加值、擅长领域...",
          icon: "/static/images/icon_xie.png",
          eventParam: "###"
        },
        {
          name: "经验合伙人",
          text: "固定资产证明、收入证明...",
          icon: "/static/images/icon_xie.png",
          eventParam: "###"
        },
        {
          name: "机构合伙人",
          text: "机构资产证明、机构净利润证明...",
          icon: "/static/images/icon_xie.png",
          eventParam: "###"
        },
        
      ]
    };
  },
  components: {
    userHeader
  },
  methods: {
  }
};
</script>

<style scoped  lang='less'>
.project-innner{
  background-color: #f5f5f5;
}
.project-text{
  padding: 36rpx 0;
  background-color: #fff;
  text-align: center;
  p{
    line-height: 50rpx;
  }
  p:nth-child(1){
    color:rgba(255,120,3,1);
    font-size:30rpx;
  }
  p:nth-child(2),
  p:nth-child(3){
    color:rgba(51,51,51,1);
    font-size:24rpx;
  }
}
.show-list{
  margin-top: 20rpx;
  background-color: #fff;
  li:nth-child(1){
    border-top:0rpx;
  }
  li{
    padding: 0 30rpx;
    border-top:1rpx solid #e7e7e7;
    a{
      position: relative;
      display: block;
      p:nth-child(1){
        font-size:30rpx;
        color:rgba(51,51,51,1);
        line-height:30px;
        span{
          color: #FF7803;
        }
      }
      p:nth-child(2){
        font-size:24rpx;
        color:rgba(153,153,153,1);
        line-height:30px;
      }
      img{
        width: 30rpx;
        height: 30rpx;
        position: absolute;
        top: 40rpx;
        right: 0;
      }
    }
  }
}

</style>


