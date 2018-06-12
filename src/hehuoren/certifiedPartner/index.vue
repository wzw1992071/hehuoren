<template>
  <div class="project-innner">
    <user-header></user-header>
    <div class="project-text">
      <p>
        修改认证合伙人资料
      </p>
      <p>
        请您提交真实完备的信息，以便快速通过审核。*为必填项目。
      </p>
    </div>
    <div class="certified-text">
      <selection
        :list="userListData">
      </selection>
      <selection
        :list="hobbyListData">
      </selection>
    </div>
    <div class="idcat">
      <p>
        根据国家相关法规要求。您需要经过实名认证后才可进一步使用合伙人平台提供的各种服务。本平台承诺不会将该部分信息用于实名认证意外的的任何其他目的。
      </p>
      <single-img :info="idCat"></single-img>
      <single-img :info="business"></single-img>
    </div>
    <div class="show-btn">
      <modify-input :info="btnData"></modify-input>
      <modify-input :info="btnDatatwo"></modify-input>
      <modify-input :info="btnDataThree"></modify-input>
    </div>
  </div>
</template>


<script>
import userHeader from "@/components/userHeader";
import singleImg from '@/components/singleImg'
import selection from '@/components/selection'
// 按钮
import modifyInput from '@/components/modifyInput'
export default {
  data: function() {
    return {
      // avatar: {
      //     title: '*本人头像',
      //     tip: '将出现在个人中心及一些其他列表中.清晰的头像能提高您的诚信度.支持JPG,PNG格式,不大于5MB'
      // }
      userListData:{
        list:[
       ' 资金支持',
        '行业资源',
        '运营经验',
        '人力资源',
        '媒体资源',
        '创业孵化',
        '政策利好',
        '财务法务',
        '商业模式分析',
        '管理咨询',
        '创业指导',
        '其他'
      ],
      title:'*可提供附加值（可多选）'
      },
      hobbyListData:{
        list:[
          '餐饮美食',
          '休闲娱乐',
          '生活服务',
          '驾驭培训',
        ],
        title:'*感兴趣的行业（可多选）',
      },
      
      idCat:{
          title: '*身份证扫描件或拍照',
          tip: '获得其他合伙人和项目方信任，得到更多合伙运营机会。支持JPG、PNG格式，文件不大于5MB'
      },
      business:{
          title: '*名片扫描件或拍照',
          tip: '支持JPG、PNG格式，文件不大于2MB'
      },
      btnData:{
        type:'blue-line',
        text:'取消本次修改并返回个人中心',
      },
      btnDatatwo:{
        type:'yellow-line',
        text:'保存并申请成为认证合伙人',
      },
      btnDataThree:{
        type:'yellow-block',
        text:'+继续完善资料提升会员等级',
      }
    };
  },
  components: {
    userHeader,
    singleImg,
    selection,
    modifyInput
  },
  methods: {
  }
};
</script>

<style scoped  lang='less'>
.project-innner{
  background-color: #f5f5f5;
  overflow: hidden;
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
.certified-text{
  margin-top: 20rpx;
}
.idcat{
  padding: 30rpx;
  background-color: #fff;
  margin-top: 20rpx;
  p:nth-child(1){
    font-size:30rpx;
    color:rgba(255,120,3,1);
    line-height:36rpx;
  }
}


</style>


