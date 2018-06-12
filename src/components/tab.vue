<template>
  <div class="tabs">
      <div :wx:for="tabs" :wx:key="index">
          <a :href="item?item.url:null">
              <img :src="item?item.imgurl:null" alt="">
              <div>{{item?item.title:null}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
   data: function () {
       return {
           tabs: [
               {
                   title: '首页',
                   name: 'home',
                   imgurl: '/static/images/home.svg',
                   url: '/pages/index/main'
               },
               {
                   title: '项目集锦',
                   name: 'project',
                   imgurl: '/static/images/home.svg',
                   url: '/pages/index/main'
               },
               {
                   title: '合火人风采',
                   name: 'partner',
                   imgurl: '/static/images/home.svg',
                   url: '/pages/index/main'
               },
               {
                   title: '我的',
                   name: 'user',
                   imgurl: '/static/images/home.svg',
                   url: '/pages/index/main'
               }
           ]
       }
   } 
}
</script>

<style>
    .tabs {
        display: flex;
        justify-content: space-around;
        height: 88rpx;
        width: 100%;
        color: black;
        background: #fff;
    }

    .tabs img {
        display: block;
        width: 50rpx;
        height: 50rpx;
        margin: 0 auto;
        color: #f00;
    }
</style>

