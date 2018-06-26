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
            <div  @click="select('type_data')">{{texts.type_data}}<img src="/static/images/arrowDown.png"></div>
            <div  @click="select('worklive')">{{texts.worklive}}<img src="/static/images/arrowDown.png"></div>
            <div  @click="select('liveing')">{{texts.liveing}}<img src="/static/images/arrowDown.png"></div>
            <div  @click="select('grade')">{{texts.grade}}<img src="/static/images/arrowDown.png"></div>
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
import optionCard from "@/components/optionCard";
export default {
  data: function () {
    return {
      show: false,
      isSearch: false,
      partners: [],

      // searchText: '',
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
    optionCard
  },
  methods: {
    toggleOption: function () {
      this.show = !this.show
    },
    // 选项卡功能
    toggleOpt() {
      this.optShow = !this.optShow;
    },
    getVal(key) {
      let val = this.searchInfos[key];
      let that=this;
      this.$data[this.type] = val;
      this.texts[this.type] = key;
      this.getPartners();
      this.toggleOpt();
    },
    changeSearch: function () {
      let _isSearch = this.isSearch
      // if(_isSearch) {
      //   console.log(this.searchInfo)
      // } else {
      //   this.isSearch = true
      // }
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
      this.$store.getters.token ? data.append('token', this.$store.getters.token):null;
      let url = `/Index/touziren?separate=1`;
      let data={};
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
        if (res.data) {
          let data = res.data;
          this.infos = data;
          // this.partners = data.resres;
          if (res.data.resres != null) {
            if (this.screens == true) {
              this.partners = [].concat(data.resres);
              this.screens = false;
              document.body.scrollTop = 0;
            } else {
              this.partners = this.partners.concat(data.resres);
            }
          }else{
              this.partners = []
              this.screens = false;
              document.body.scrollTop = 0;
          }
          this.countPage = res.data.pageData.countPage;
        }
      });
    },

    select(type) {
      this.type = type;
      if (type == "grade") {
        this.options = [
          "全部等级",
          "一般合伙人",
          "认证合伙人",
          "经验合伙人",
          "机构合伙人"
        ];
        this.optionsTitle = "等级";
        this.searchInfos = {
          全部等级: null,
          一般合伙人: 1,
          认证合伙人: 2,
          经验合伙人: 3,
          机构合伙人: 4
        };
      } else if (type == "type_data") {
        this.searchUtil("type_data", "全部擅长", "typename", "id");
      } else if (type == "worklive") {
        this.searchUtil("area", "工作圈", "name", "code");
      } else if (type == "liveing") {
        this.searchUtil("area", "生活圈", "name", "code");
      }

      this.toggleOpt();
      console.log(this.optShow)
      this.page = 0
      this.screens = true
    },
    searchUtil(type, title, key, val) {
      let datas, len;
      datas = this.infos[type];
      len = datas.length;
      this.optionsTitle = title;
      this.options = [];
      if (type == "area") {
        this.options.push("全部地区");
        this.searchInfos["全部地区"] = null;
      } else {
        this.options.push(title);
        this.searchInfos[title] = null;
      }
      this.searchInfos = {};
      for (let i = 0; i < len; i++) {
        let _key = datas[i][key];
        let _val = datas[i][val];
        this.options.push(_key);
        this.searchInfos[_key] = _val;
      }
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

