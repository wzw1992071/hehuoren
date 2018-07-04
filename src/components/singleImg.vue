<template>
    <div class="upload-img-single">
        <div @click="getImg" class="img">
            <img :src="img">
        </div>
        <div class="info">
            <div class="title">{{title}}</div>
            <div class="tip">{{tip}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from "vuex";
export default {
  props: ['info'],
  data: function() {
    return {
      title: '',
      tip: '',
      img: '/static/images/default.png',
    };
  },
  components: {},
  computed: {
    ...mapGetters(['baseUrl','token']),
  },
  methods: {
    async getImg() {
      try{
        let type = await this.wxChooseType();
        let chooseRes = await this.wxChooseImg(type);
        this.img = chooseRes.tempFilePaths[0];
        this.wxUpFile(chooseRes.tempFilePaths[0])
      }catch (e){
        console.log(e)
      }
    },
    /*选取方式*/
    wxChooseType(){
      return new Promise(resolve=>{
        wx.showActionSheet({
          itemList: ['从相册中选择', '拍照'],
          success: function(res) {
            if (!res.cancel) {
              if(res.tapIndex == 0){
                resolve('album')
              }else if(res.tapIndex == 1){
                resolve('camera')
              }
            }
          }
        })
      })
    },
    /*选择图片*/
    wxChooseImg(type){
      return new Promise((resolve,reject)=>{
        wx.chooseImage({
          sourceType: [type],
          count:1,
          success:function(res){
            resolve(res)
          },
          fail:function(error){
            reject(error)
          }
        })
      })
    },
    /*上传*/
    wxUpFile(filePath){
      let _this = this;
      console.log(_this.token)
      wx.uploadFile({
        url: `${_this.baseUrl}Index/file`,
        header: {
          'content-type': 'multipart/form-data'
        }, // 设置请求的 header
        filePath: filePath,
        name: 'file',
        formData: {
          'token': _this.token,
        },
        success: function (res) {
          _this.$emit("geturl", res);
        }
      })
    }
  },
  created() {
      let _info = this.info
      // console.log(_info)
      // console.log(_info.imgSrc)
      if(_info) {
          this.title = _info.title
          ? _info.title
          : this.title
          this.tip = _info.tip
          ? _info.tip
          : this.tip
          this.img = _info.imgSrc
          ? this.baseUrl+_info.imgSrc
          : this.img
      }
      // console.log(this.img)
  }
};
</script>

<style lang="less" scoped>
.upload-img-single {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: solid 2rpx #f6f6f6;
  .img {
    width: 120rpx;
    height: 120rpx;
    margin-right: 50rpx;
    img {
      width: 120rpx;
      height: 120rpx;
    }
  }
  .info {
      .title {
          font-size: 26rpx;
          color: #333;
          font-weight: 600;
          margin-bottom: 10rpx;
      }
      .tip {
          font-size: 24rpx;
          color: #cacaca;
      }
  }
}
</style>
