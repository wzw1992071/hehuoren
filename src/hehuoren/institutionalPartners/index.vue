<template>
  <div class="project-innner">
    <user-header></user-header>
    <div class="project-text">
      <p>
        修改一般合伙人资料
      </p>
      <p>
        请您提交真实完备的信息，以便快速通过审核。*为必填项目。
      </p>
    </div>
    <div class="show-data-avatar">
      
    </div>
  </div>
</template>


<script>
import userHeader from "@/components/userHeader";
import singleImg from '@/components/singleImg'
export default {
  data: function() {
    return {
      avatar: {
          title: '*本人头像',
          tip: '将出现在个人中心及一些其他列表中.清晰的头像能提高您的诚信度.支持JPG,PNG格式,不大于5MB'
      }
    };
  },
  components: {
    userHeader,
    singleImg
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
.show-data-avatar{
  margin-top: 20rpx;
  background-color: #fff;
}


</style>


