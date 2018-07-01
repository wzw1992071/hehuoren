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
      <ul>
        <li>
          <single-img :info="avatar"></single-img>
        </li>
        <li>
          <inputs @change="getVal" :info="username"></inputs>
        </li>
        <li>
          <inputs @change="getVal" :info="inputsOne"></inputs>
          <inputs @change="getVal" :info="proDetail1"></inputs>
        </li>
        <li>
          <inputs @change="getVal" :info="inputstwo"></inputs>
          <inputs @change="getVal" :info="proDetail2"></inputs>
        </li>
        <li>
          <inputs @change="getVal" :info="inputsthree"></inputs>
        </li>
      </ul>
      <div class="show-btn">
        <modify-input :info="btnData"></modify-input>
        <modify-input :info="btnDatatwo"></modify-input>
        <modify-input :info="btnDataThree"></modify-input>
      </div>
      
    </div>
  </div>
</template>


<script>
import userHeader from "@/components/userHeader";
import singleImg from '@/components/singleImg';
import inputs from '@/components/inputs'
// 按钮
import modifyInput from '@/components/modifyInput'
export default {
  data: function() {
    return {
      
      inputsOne: {
          type: 3,
          title: '*生活圈',
          text: 'Arthur',
          optionsTitle: '*生活圈',
          options: ['武侯区', '金牛区', '什么区'],
          // 存储input值的key,可以不在这组数据里
          handler: 'inputsOne.val',
          val: ''
      },
      inputstwo:{
        type: 3,
        title: '*工作圈',
        text: 'Arthur',
        optionsTitle: '*工作圈',
        options: ['武侯区', '金牛区', '什么区'],
        // 存储input值的key,可以不在这组数据里
        handler: 'inputsOne.val',
        val: ''
      },
      inputsthree:{
        type: 3,
        title: '*学历',
        text: 'Arthur',
        optionsTitle: '*学历',
        options: ['高中', '大专', '本科','硕士','博士'],
        // 存储input值的key,可以不在这组数据里
        handler: 'inputsOne.val',
        val: ''
      },
      username:{
       title: '*昵称',
       text: '请输入昵称',
       type:1
      },
      btnData:{
        type:'blue-line',
        text:'取消本次修改并返回个人中心',
      },
      btnDatatwo:{
        type:'yellow-line',
        text:'保存并申请成为一般合伙人',
      },
      btnDataThree:{
        type:'yellow-block',
        text:'+继续完善资料提升会员等级',
      },

      proDetail1: {
          type: 1,
          title: '请输入街道',
          text: 'XX市XX区XX号',
          handler: '请输入街道',
          tip: `(准确输入地址可使身边更多优秀项目关注到您)`
      },
      proDetail2: {
          type: 1,
          title: '请输入街道',
          text: 'XX市XX区XX号',
          handler: '请输入街道',
          tip: `(准确输入地址可使身边更多优秀项目关注到您)`
      },
    };
  },
  components: {
    userHeader,
    singleImg,
    inputs,
    modifyInput
  },
  computed:{
    avatar(){
      let a ={
          title: '*本人头像',
          tip: '将出现在个人中心及一些其他列表中.清晰的头像能提高您的诚信度.支持JPG,PNG格式,不大于5MB',
          imgSrc:''
      }
      // wx.getStorageSync({
      //   key: 'hehuoren_form_1',
      //   success: function(res) {
      //     console.log(res.data)
          // a.imgSrc = JSON.parse(res.data).info.icon
      //   } 
      // })
      a.imgSrc = JSON.parse(wx.getStorageSync('hehuoren_form_1')).info.icon
      // console.log(JSON.parse(wx.getStorageSync('hehuoren_form_1')))
      return a ;
    },
    formData(){
      wx.getStorage({
        key: 'hehuoren_form_1',
        success: function(res) {
          // console.log(JSON.parse(res.data))
          return JSON.parse(res.data)
        } 
      })
    }
  },
  methods: {
  },
  mounted() {
    let that =this
    wx.getStorage({
      key: 'hehuoren_form_1',
      success: function(res) {
        that.avatar.imgSrc = JSON.parse(res.data).info.icon
      } 
    })
  },
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
.show-data-avatar{
  margin-top: 20rpx;
  background-color: #fff;
}
.show-btn{
  background-color: #f5f5f5;
  overflow: hidden;
}


</style>


