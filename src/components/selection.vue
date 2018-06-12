<template>
<div class="selection-inner">
  <p>
    {{listData.title}}
  </p>
  <ul class="clear_left_float">
    <li @click="showActive(index,listActive[index])" v-for="(item,index) in listData.list" :key="index" :class="{ active: listActive[index] == 1 }">
      {{item}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: ['list'],
  data: function() {
    return {
       listData:this.list,
       listActive:[],
    };
  },
  methods:{
    newActive(){
      this.listData.list.forEach((iterm,index) => {
        if(index%4 == 0){
          this.listActive.push(1)
        }else{
          this.listActive.push(0)
        }
      });
      console.log(this.listActive)
    },
    showActive(index,active){
      if(active == 1){
        this.$set(this.listActive,index,0)
      }else{
        this.$set(this.listActive,index,1)
      }
    }
  },
  mounted(){
    this.newActive();
  }
}
</script>

<style scoped lang="less">
.selection-inner{
  padding: 30rpx;
  background-color: #fff;
  border-bottom:1rpx solid #e7e7e7;
  p:nth-child(1){
    font-size:26rpx;
  }
  ul{
    li{
      // width: 22%;
      min-width: 160rpx;
      box-sizing: border-box;
      padding: 0 13rpx;
      font-size:24rpx;
      border-radius: 10rpx;
      height:60rpx;
      margin-right: 9rpx;
      text-align: center;
      line-height: 60rpx;
      color: rgba(204,204,204,1);
      border: 1rpx solid rgba(204,204,204,1);
      margin-top: 20rpx;
    }
    li:nth-child(4n){
      margin-right:0rpx; 
    }
    .active{
      background-color: rgba(255,120,3,1);
      color: #fff;
    }
  }
}

</style>


