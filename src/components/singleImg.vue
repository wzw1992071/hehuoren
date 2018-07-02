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

<script>
import {mapGetters} from "vuex";
export default {
  props: ['info'],
  data: function() {
    return {
      title: '',
      tip: '',
      img: '/static/images/default.png'
    };
  },
  components: {},
  computed: {
    ...mapGetters(['baseUrl']),
  },
  methods: {
    getImg() {
      wx.chooseImage({
        success: function(res) {
          this.img = res.tempFilePaths[0];
          console.log(this.img)
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: function(res) {
              //   console.log(res);
              //   console.log(res);
            }
          });
        }
      });
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
