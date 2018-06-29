<template>
  <div class="container">

       <div class="nav">
          <div class="search" @click="changeSearch">
            <img v-if="!isSearch" src="/static/images/search.png">
            <img v-if="isSearch" src="/static/images/searchActive.png">
          </div>
          <div class="search-con" v-if="isSearch">
            <input type="text" placeholder="搜索你感兴趣的合伙人" v-model="truename" @keypress.enter="search" :confirm="search">
          </div>
          <div class="filter" v-if="!isSearch">
            <!-- <div  @click="select('type_data')">{{texts.type_data}}<img src="/static/images/arrowDown.png"></div> -->
            <picker mode='selector' @change="bindPickerChange($event,'type_data')" range-key="name" :value="0" :range="selectRules['type_data']">
              {{texts.type_data}}
            </picker>
             <picker mode='selector' @change="bindPickerChange($event,'worklive')" range-key="name" :value="0" :range="selectRules['worklive']">
              {{texts.worklive}}
            </picker>
             <picker mode='selector' @change="bindPickerChange($event,'liveing')" range-key="name" :value="0" :range="selectRules['liveing']">
              {{texts.liveing}}
            </picker>
             <picker mode='selector' @change="bindPickerChange($event,'grade')" range-key="name" :value="0" :range="selectRules['grade']">
              {{texts.grade}}
            </picker>
            <!-- <div  @click="select('worklive')">{{texts.worklive}}<img src="/static/images/arrowDown.png"></div>
            <div  @click="select('liveing')">{{texts.liveing}}<img src="/static/images/arrowDown.png"></div>
            <div  @click="select('grade')">{{texts.grade}}<img src="/static/images/arrowDown.png"></div> -->
          </div>
          <div class="option" @click="toggleOption">
            <img src="/static/images/optionsYellow.png" alt="">
          </div>
        </div>
        <!-- v-for循环 -->
        <!-- <partner-card></partner-card>
        <partner-card></partner-card> -->
        <div v-for="(item, index) in partners" :key="index">
          <partner-card :info="item"></partner-card>
        </div>
        <!-- 选项 mock层 -->
        <main-option :optionsShow="show" @toggleShow="toggleOption"></main-option>
        <option-card
          v-if="optShow"
          :lists="options"
          :title="optionsTitle"
          @close="toggleOpt"
          @selected="getVal"
        ></option-card>
    </div>  
   
</template>

<script>
import mainOption from '@/components/mainOption'
import partnerCard from '@/components/partnerCard'
import Alert from '@/components/alert'
import service from '@/utils/request';
export default {
  data: function () {
    return {
      show: false,
      isSearch: false,
      partners: [],

      // searchText: '',
      selectRules:{
        grade:[
          {
            name:'全部等级',
            val:null
          },
          {
            name:'一般合伙人',
            val:1
          },
          {
            name:'认证合伙人',
            val:2
          },
          {
            name:'经验合伙人',
            val:3
          },
          {
            name:'机构合伙人',
            val:4
          }
        ],
        worklive:[],
        type_data:[],
        liveing:[]
      },
      begoodat: null,
      worklive: null,
      liveing: null,
      grade: null,
      truename: null,
      ifmohu: null,

       // 选项
      optShow: false,
      projects: [],
      options: [],
      optionsTitle: "",
      texts: {
        grade: "全部等级",
        type_data: "全部擅长",
        liveing: "生活圈",
        worklive: "工作圈"
      },

      searchInfos: {},
      infos: {},
      type: "",
      page: 0,
      countPage: 1,
      screens: false,
      loading: false,
      loadings: false
    }
  },
  components: {
    mainOption,
    partnerCard,
  },
  methods: {
    changeSearch: function () {
      let _isSearch = this.isSearch
      this.isSearch = !_isSearch
    },
    // 搜索
    search:function(){
      let _isSearch = this.isSearch;
      this.page = 0
      // 判断是否处于搜索状态
      if(_isSearch){
        如果是点击搜索
        this.getPartners().then(() => {
          this.isSearch = false;
        });
      }else{
        this.truename = null;
        this.isSearch = true;
      }
      
    },
    // 获取数据（包括页面和下拉框）
    getPartners(
      // 给默认值
      begoodat = this.begoodat,
      worklive = this.worklive,
      liveing = this.liveing,
      grade = this.grade,
      truename = this.truename,
      ifmohu = this.ifmohu,
      page = this.page
    ){
      if (!/[0-9]/ig.test(truename)) {
        ifmohu = 2;
      } else if (/[0-9]/ig.test(truename)) {
        ifmohu = 1;
      }
      let url = '/Index/touziren';
      let data={};
      data.separate=1
      data.token=this.$store.getters.token ?this.$store.getters.token:null;
      if(begoodat){
        data.begoodat=begoodat
      }
      if(worklive){
        data.worklive=worklive
      }
      if(liveing){
        data.liveing=liveing
      }
      if(grade){
        data.grade=grade
      }
      if(truename){
        data.truename=truename
      }
      if(ifmohu){
        data.ifmohu=ifmohu
      }
      if(page){
        data.page=(page+1)
      }
      return service({
        url: url,
        method: "POST",
        data:data
      }).then(res => {
        let that = this
        if (res.data) {
          let data = res.data;
          that.infos = data;
          // this.partners = data.resres;
          if (res.data.resres != null) {
            if (that.screens == true) {
              that.partners = [].concat(data.resres);
              that.screens = false;
              document.body.scrollTop = 0;
              that.creatSelect(res.data)

            } else {
              that.partners = that.partners.concat(data.resres);
              that.creatSelect(res.data)
            }
          }else{
              that.partners = []
              that.screens = false;
              document.body.scrollTop = 0;
              that.creatSelect(res.data)
          }
          that.countPage = res.data.pageData.countPage;
        }
      });
    },
    creatSelect(data){
      console.log(data)
      var that=this;
      that.selectRules.worklive=[]
      that.selectRules.type_data=[]
      that.selectRules.liveing=[]
      data.area.forEach(item => {
        that.selectRules.worklive.push({
          name:item.name,
          val:item.id
        })
        that.selectRules.liveing.push({
          name:item.name,
          val:item.id
        })
        
      });
      data.type_data.forEach(item => {
        that.selectRules.type_data.push({
          name:item.typename,
          val:item.id
        })
      });
    },
    bindPickerChange(event,type){
      let index = event.mp.detail.value;
      let target = this.selectRules[type][index];
      if(type=='grade'){
        this.texts[type] = target.name;
        this.grade = target.val
      }else if(type=='type_data'){
        console.log(1)
        this.texts[type] = target.name;
        this.type_data = target.id
      }else if(type=='worklive'){
        this.texts[type] = target.name;
        this.worklive = target.code
      }else if(type=='liveing'){
        this.texts[type] = target.name;
        this.liveing = target.val
      }
      this.page = 0;
      this.list = [];
      this.getPartners();
    },

  },
  created(){
    this.getPartners();
  },
  activated(){
    this.getPartners();
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

