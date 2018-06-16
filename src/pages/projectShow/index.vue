<template>
  <div class="container">
    <div class="nav">
      <div class="search" @click="search">
        <img v-if="!isSearch" src="/static/images/search.png">
        <img v-if="isSearch" src="/static/images/searchActive.png">
      </div>
      <div class="search-con" v-if="isSearch">
        <input type="text" placeholder="搜索你感兴趣的项目" v-model="searchInfo">
      </div>
      <div class="filter" v-if="!isSearch">
        <div>全部等级
          <img src="/static/images/arrowDown.png">
        </div>
        <div>全部行业
          <img src="/static/images/arrowDown.png">
        </div>
        <div>全部地区
          <img src="/static/images/arrowDown.png">
        </div>
        <div>默认排序
          <img src="/static/images/arrowDown.png">
        </div>
      </div>
      <div class="option" @click="toggleOption">
        <img src="/static/images/optionsYellow.png" alt="">
      </div>
    </div>
    <!-- should be v-for -->
    <project-card></project-card>
    <project-card></project-card>

    <main-option :optionsShow="show" @toggleShow="toggleOption"></main-option>
  </div>
</template>


<script>
import mainOption from "@/components/mainOption"
import projectCard from '@/components/projectCard'

export default {
  data: function() {
    return {
      show: false,
      isSearch: false,
      searchInfo: ""
    }
  },
  methods: {
    toggleOption: function() {
      this.show = !this.show;
    },
    search: function() {
      let _isSearch = this.isSearch;
      if (_isSearch) {
        console.log(this.searchInfo);
      } else {
        this.isSearch = true;
      }
    }
  },
  components: {
      mainOption,
      projectCard
  }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
  background: #fff;
}

.nav {
  background: #fff;
  border: solid 2rpx #f6f6f6;
  border-width: 2rpx 0 2rpx 0;
  padding: 0 30rpx;
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav .search {
  width: 40rpx;
  height: 40rpx;
}

.nav .search img {
  width: 40rpx;
  height: 40rpx;
}

.nav .filter {
  display: flex;
  justify-content: space-around;
  font-size: 24rpx;
  color: #343434;
  font-weight: 600;
  flex-grow: 1;
  align-items: center;
}

.nav .filter div {
  display: flex;
  align-items: center;
}

.nav .filter img {
  width: 16rpx;
  height: 10rpx;
  margin-left: 12rpx; 
}

.option {
  width: 40rpx;
  height: 40rpx;
}

.option img {
  width: 40rpx;
  height: 40rpx;
}

.search-con {
  flex-grow: 1;
  height: 80rpx;
  display: flex;
  padding: 0 30rpx;
}

.search-con input {
  flex-grow: 1;
  height: 80rpx;
  font-size: 24rpx;
  color: #999;
}

</style>


