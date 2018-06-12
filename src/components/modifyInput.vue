<template>
    <div :class="type" class="btn">
        <div @click="handleEvent">{{text}}</div>
    </div>
</template>

<script>
export default {
  props: ['info'],
  data: function () {
      return {
          type:'yellow-block',
          text: '保存团队成员信息'
      }
  },
  methods: {
        handleEvent: function () {
            this.$emit('handleEvent')
        }
  },
  created () {
    //   console.log(this.info)
    let _info = this.info
    if(_info) {
        this.type = _info.type
        ?_info.type
        :this.type
        this.text = _info.text
        ?_info.text
        :this.text
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
    width: 100%;
    height: 80rpx;
    margin: 25rpx 0;
    div {
        width: 510rpx;
        margin: 0 auto;
        text-align: center;
        font-size: 30rpx;
        line-height: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
    }
}

.yellow-block {
    div {
        background: #FF7803;
        border: solid 2rpx #ff7803;
        color: #fff;
    }
}
.blue-block {
    div {
        background: #3A6EDB;
        border: solid 2rpx #3A6EDB;
        color: #fff;
    }
}
.yellow-line {
    div {
        border: solid 2rpx #ff7803;
        color: #ff7803;
    }
}
.blue-line {
    div {
        border: solid 2rpx #3A6EDB;
        color: #3A6EDB;
    }
}
</style>
