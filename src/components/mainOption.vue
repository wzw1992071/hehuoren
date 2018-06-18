<template>
    <div class="mock" :wx:if="optionsShow" @click="toggle">
      <optlinks :optionsShow.sync="optionsShow"></optlinks>
    </div>
</template>


<script>
  import optlinks from '@/components/optlinks'
  export default {
    props: ['optionsShow'],
    data: function () {
      return {
      }
    },
    components:{
      optlinks
    },
    methods: {
      toggle: function (e) {
        if (e === undefined) {
          // this.optionsShow = !this.optionsShow
          this.$emit('toggleShow')
        } else {
          if (e.x > 180 && e.y > 50 && e.y < 260) {
          } else {
            // this.optionsShow = !this.optionsShow
            this.$emit('toggleShow')
          }
        }
      }
    }
  }
</script>

<style>
.option {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

.option img {
  width: 40rpx;
  height: 40rpx;
}

.mock {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 1000;
}

.option-links {
  width: 280rpx;
  padding: 20rpx 40rpx;
  background: #fff;
  position: absolute;
  top: 100rpx;
  right: 20rpx;
  border-radius: 10rpx;
}

.option-links:before {
  content: '';
  display: block;
  position: absolute;
  width: 20rpx;
  height: 20rpx;
  transform: rotate(45deg);
  top: -8rpx;
  right: 20rpx;
  background: #fff;
}

.option-links a {
  display: block;
  width: 210rpx;
  height: 64rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
}

.option-links a img {
  width: 30rpx;
  height: 30rpx;
  margin-right: 30rpx;
}

</style>

