<template>
  <div class="modify-textarea">
    <div class="main">
      <div class="title">{{title}}</div>
      <div class="con">
        <textarea v-model="val" cols="4" :placeholder="defaultText"></textarea>
      </div>
    </div>
    <div class="tip">
        {{tip}}
    </div>
  </div>
</template>


<script>
export default {
    props: ['info'],
    data: function () {
        return {
            title: '',
            tip: '',
            defaultText: '',
            val: ''
        }
    },
    created () {
        let _info = this.info
        if(_info) {
            this.title = _info.title
            ? _info.title
            : this.text
            this.tip = _info.tip
            ? _info.tip
            : this.tip
            this.defaultText = _info.default
            ? _info.default
            : ''
        }
    }
}
</script>

<style lang="less" scoped>
.modify-textarea {
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 35rpx 30rpx;
    border-bottom: solid 2rpx #f6f6f6;
    .main {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 20rpx;
        .title {
            font-size: 26rpx;
            color: #333;
            font-weight: 600;
        }
        .con {
            width: 340rpx;
            color: #333;
            font-size: 26rpx;
            line-height: 36rpx;
            height: 144rpx;
            textarea {
                width: 340rpx;
                height: 144rpx;
            }
        }
    }   
    .tip {
        font-size: 24rpx;
        color: #ccc;
        line-height: 1.5;
    }
}
</style>
