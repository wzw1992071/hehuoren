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
          <single-img :info="avatar" @geturl="geturl"></single-img>
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
        <modify-input :info="btnData" @handleEvent="Cancel()"></modify-input>
        <modify-input :info="btnDatatwo" @handleEvent="Save(1)"></modify-input>
        <modify-input :info="btnDataThree" @handleEvent="Save(2)"></modify-input>
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
import {mapGetters} from "vuex";
import request from '@/utils/request';
export default {
  data: function() {
    return {

      inputsOne: {
          type: 3,
          title: '*生活圈',
          text: '请选择工作圈',
          optionsTitle: '*生活圈',
          options: [
          ],
          // 存储input值的key,可以不在这组数据里
          handler: 'inputsOne',
          val: ''
      },
      inputstwo:{
        type: 3,
        title: '*工作圈',
        text: '请选择工作圈',
        optionsTitle: '*工作圈',
        options: [],
        // 存储input值的key,可以不在这组数据里
        handler: 'inputstwo',
        val: ''
      },
      inputsthree:{
        type: 3,
        title: '*学历',
        text: '请选择学历',
        optionsTitle: '*学历',
        options: [],
        // 存储input值的key,可以不在这组数据里
        handler: 'inputsthree',
        val: ''
      },
      username:{
       title: '*昵称',
       text: '请输入昵称',
       type:1,
      //  text: "",
        handler: 'username',
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
          text: '',
          handler: 'proDetail1',
          tip: `(准确输入地址可使身边更多优秀项目关注到您)`
      },
      proDetail2: {
          type: 1,
          title: '请输入街道',
          text: '',
          handler: 'proDetail2',
          tip: `(准确输入地址可使身边更多优秀项目关注到您)`
      },
      newIcon:""
    };
  },
  components: {
    userHeader,
    singleImg,
    inputs,
    modifyInput
  },
  computed:{
    ...mapGetters([ 'token']),
    avatar(){
      let a ={
          title: '*本人头像',
          tip: '将出现在个人中心及一些其他列表中.清晰的头像能提高您的诚信度.支持JPG,PNG格式,不大于5MB',
          imgSrc:''
      }
      a.imgSrc = JSON.parse(wx.getStorageSync('hehuoren_form_1')).info.icon
      return a ;
    },
    formData(){
      wx.getStorage({
        key: 'hehuoren_form_1',
        success: function(res) {
          return JSON.parse(res.data)
        }
      })
    }
  },
  methods: {
    getVal(value){
      if(value){
        // 判断是否为下拉框
        if(value.text){
          this[value.handler].val=value.val
          this[value.handler].text=value.text
        }else{
          this[value.handler].text=value.val
        }
      }
    },
    geturl(val){
      let resopnse  = JSON.parse(val.data)
      if(resopnse.status === 1){
        this.newIcon = resopnse.new_url
      }else{
        wx.showToast({
          title: '图片上传失败',
          icon: 'none',
          duration: 1000
        })
      }
    },
    Cancel(){
      wx.navigateBack({
        delta: 1
      })
    },
    Save(type){
      let that= this
      let params = {}
      params.token = that.token;
      params.separate = 1;
      params.truename = that.username.text;
      params.live = that.inputsOne.val;
      params.liveplace = that.proDetail1.text;
      params.worklive = that.inputstwo.val;
      params.workplace = that.proDetail2.text
      params.xueli = that.inputsthree.val;
      params.icon = that.newIcon?that.newIcon:that.avatar.imgSrc;
      // console.log(params)
      // return false
      request({
        url: `/member/member_conf?type=1&token=${that.token}`,
        data: params,
        method: "post"
      }).then(res => {
         if (res.status == 1) {
            if (type == 2) {
              let newParam = {}
              newParam.token=that.token
              newParam.separate=1
              newParam.gopage=2
              request({
                url: `/member/member_conf?separate=1&gopage=2&token=${that.token}`,
                method: "get"
              }).then(res => {
                if (res.data) {
                  wx.setStorage({
                    key:"hehuoren_form_2",
                    data:JSON.stringify(res.data)
                  })
                  wx.redirectTo({
                    url: '/pages/certifiedPartner/main'
                  })
                } else {
                }
              });
            }else{
              wx.reLaunch({
                url:'/pages/over/main'
              })
           }


         }else{
           wx.showToast({
            title: res.msg?res.msg:res.data,
            icon: 'none',
            duration: 2000
          })
         }
      })
    }
  },
  created() {
    let that =this
    // var value = wx.getStorageSync('key')
    // that.avatar.imgSrc = JSON.parse(value).info.icon
    wx.getStorage({
      key: 'hehuoren_form_1',
      success: function(res) {
        let a = JSON.parse(res.data)
        that.avatar.imgSrc = a.info.icon //初始化头像
        that.username.text =a.info.truename //初始化真实姓名
        that.proDetail1.text = a.info.liveplace  //初始化生活圈
        that.proDetail2.text = a.info.workplace  //初始化工作圈
        console.log(a)
        // a.citylist.forEach(function(item,index){
        //   that.inputsOne.options.push({
        //     name:item.name,
        //     value:item.area
        //   })
        //   that.inputstwo.options.push({
        //     name:item.name,
        //     value:item.area
        //   })
        // })
        for(var i in a.citylist){
          that.inputsOne.options.push({
            name: a.citylist[i].name,
            value: a.citylist[i].area
          })
          that.inputstwo.options.push({
            name: a.citylist[i].name,
            value: a.citylist[i].area
          })
        }
        a.xueli.forEach(function(item,index){
          that.inputsthree.options.push({
            name:item.typename,
            value:item.id
          })
        })
        //初始化学历
        if(a.info.culture!="undefined"){
          let _xueli =that.inputsthree.options.find(item => item.value == a.info.culture)
            that.inputsthree.text = _xueli.name
            that.inputsthree.val = _xueli.value
        }
        // 初始化生活圈
        if(a.info.liveing!="undefined"){
          let _liveing =that.inputsOne.options.find(item => item.value == a.info.liveing)
          that.inputsOne.text = _liveing.name
          that.inputsOne.val = _liveing.value
        }
        // 初始化工作圈
        if(a.info.worklive!="undefined"){
          let _worklive =that.inputstwo.options.find(item => item.value == a.info.worklive)
          that.inputstwo.text = _worklive.name
          that.inputstwo.val = _worklive.value
        }

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


