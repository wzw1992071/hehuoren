<template>
  <div class="container">
    <div class="nav">
      <div class="search" @click="getSearch">
        <img v-if="!isSearch" src="/static/images/search.png">
        <img v-if="isSearch" src="/static/images/searchActive.png">
      </div>
      <div class="search-con" v-if="isSearch">
        <input type="text" placeholder="搜索你感兴趣的项目" v-model="title" :confirm-type="'搜索'" @confirm="search">
      </div>
      <div class="filter" v-if="!isSearch">
        <div>
          <picker mode='selector' @change="bindPickerChange($event,'grade')" range-key="name" :value="0" :range="selectRules['grade']">
            {{texts.grade}}
          </picker>
          <img src="/static/images/arrowDown.png">
        </div>
        <div>
          <picker mode='selector' @change="bindPickerChange($event,'type_data')" range-key="typename" :value="0" :range="selectRules['type_data']">
            {{texts.type_data}}
          </picker>
          <img src="/static/images/arrowDown.png">
        </div>
        <div >
          <picker mode='selector' @change="bindPickerChange($event,'area')" range-key="name" :value="0" :range="selectRules['area']">
            {{texts.area}}
          </picker>
          <img src="/static/images/arrowDown.png">
        </div>
        <div>
          <picker mode='selector' @change="bindPickerChange($event,'sort')" range-key="name" :value="0" :range="selectRules['sort']">
            {{texts.sort}}
          </picker>
          <img src="/static/images/arrowDown.png">
        </div>
      </div>
      <div class="option" @click="toggleOption">
        <img src="/static/images/optionsYellow.png" alt="">
      </div>
    </div>
    <div class="item-content">
      <scroll-view scroll-y style="height: 100%" @scrolltolower="loadmore">
        <div v-for="(item,key,index) in list" v-bind:key="key">
          <project-card @handlerClick="loadDetail" @handlerFocuse="focuse" :detail="item" ></project-card>
        </div>
      </scroll-view>
    </div>
    <main-option :optionsShow="show" @toggleShow="toggleOption"></main-option>
  </div>
</template>


<script type="text/ecmascript-6">
import mainOption from "@/components/mainOption"
import projectCard from '@/components/projectCard'
import {mapGetters} from 'vuex'
import {getProjects} from '@/apis/index'
export default {
  data: function() {
    return {
      show: false,
      showSelect:false,
      isSearch: false,
      couldLoadMore:false,
      /*筛选条件*/
      grade: null,
      type_data: null,
      area: null,
      sort: null,
      title: null,
      list:[],
      page: 1,
      /*可选项*/
      selectRules:{
        'grade':[
          {
            name:'全部等级',
            val:0
          },
          {
            name:'展示类项目',
            val:1
          },
          {
            name:'预热类项目',
            val:2
          },
          {
            name:'热门类项目',
            val:3
          },
          {
            name:'准路演类项目',
            val:4
          }
        ],
        'type_data':[],
        'area':[],
        'sort':[
          {
            name:'默认排序',
            val:null
          },
          {
            name:'更新时间',
            val:'update'
          },
          {
            name:'发布时间',
            val:'add'
          }
        ],
      },
      texts: {
        grade: "全部等级",
        type_data: "全部行业",
        area: "全部地区",
        sort: "默认排序"
      },
    }
  },
  methods: {
    toggleOption() {
      this.show = !this.show;
    },
    getSearch(){
      if(this.isSearch){
        // 请了key 避免bug
        this.title = null
      }
      this.isSearch=!this.isSearch;
    },
    search() {
      if(!this.title){
        this.isSearch=false;
      }
      this.resetForm();
    },
    // 重新初始化请求的form
    resetForm(){
      this.texts = {
        grade: "全部等级",
        type_data: "全部行业",
        area: "全部地区",
        sort: "默认排序"
      };
      this.grade=null;
      this.type_data=null;
      this.area=null;
      this.sort=null;
      this.list = [];
      this.page = 1;
      this.getProjects();
    },

    bindPickerChange(event,type){
      let index = event.mp.detail.value;
      let target = this.selectRules[type][index];
      if(type=='grade'){
        this.texts[type] = target.name;
        this.grade = target.val
      }else if(type=='type_data'){
        this.texts[type] = target.typename;
        this.type_data = target.id
      }else if(type=='area'){
        this.texts[type] = target.name;
        this.area = target.code
      }else if(type=='sort'){
        this.texts[type] = target.name;
        this.sort = target.val
      }
      this.page = 1;
      this.list = [];
      this.getProjects();
    },

    getProjects() {
      let param = {
        separate:1,
        grade:this.grade,//等级
        xiangmu_hy:this.type_data,
        area:this.area,
        sort:this.sort,
        title:this.title,
        page:this.page,
      };
      for(let i in param){
        if(!param[i]){
          delete param[i];
        }
      }
      getProjects(param,this.token).then(res=>{
        let data = res.data;
        for(let key in this.selectRules){
          if(!!data[key]) this.selectRules[key] = data[key];
        }
        if(data.resres){
          this.couldLoadMore = true;
          let tempList  = this.list;
          this.list = tempList.concat(data.resres);
        }else{
          this.couldLoadMore = false;
        }
      }).catch(error=>{
        console.log(error)
      })
    },

    loadmore(){
      if(!this.couldLoadMore) return;
      this.page++;
      this.getProjects();
    },
    loadDetail(){
      if(!this.token){
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }else{
        wx.navigateTo({
          url: '/pages/projectdetails/main?id=1'
        })
      }
    },
    focuse(item){
      if(item['guanzhu_css_class'] == 'yes_guanzhu'){
        item['guanzhu_css_class'] = 'no_guanzhu'
      }else{
        item['guanzhu_css_class'] = 'yes_guanzhu'
      }
    }
  },
  mounted(){
    this.getProjects();
  },
  components: {
      mainOption,
      projectCard
  },
  computed:{
    ...mapGetters(['token'])
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
.item-content{
  position: absolute;
  top:80rpx;
  left: 0;
  right: 0;
  bottom: 0;
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


