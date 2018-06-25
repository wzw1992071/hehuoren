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
        <div v-for="item in list">
          <project-card @handlerClick="loadDetail" :detail="item" ></project-card>
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
      list:[ {
        "id": "158",
        "title": "士大夫但是",
        "description": "胜多负少地方",
        "logo": "Public/uploadfile/2018/0412/44e5b37a0fcbc3f8bd618a91a81531a3.png",
        "founder": null,
        "mobile": "",
        "team": null,
        "team_description": "",
        "xiangmu_dsj": "",
        "grade": "1",
        "plan": "",
        "demand": "",
        "tutor": "0",
        "amount": "0",
        "shares": "0",
        "count": "100",
        "Fund_use": "",
        "other_demand": "",
        "media": "",
        "addtime": "1523524002",
        "updatetime": "0",
        "status": "1",
        "backmsg": "",
        "deleted": "0",
        "client_ip": "127.0.0.1",
        "userid": "113",
        "icon": "",
        "email": "",
        "zhiwei": "",
        "founder_info": "",
        "video": null,
        "cz_data": "",
        "tutor_truename": "",
        "tutor_icon": "",
        "tutor_email": "",
        "tutor_info": "",
        "area": "510104,,,,",
        "xiangmu_hy": "31",
        "xiangmu_hy_detail": "105",
        "yijuhua": "的三分到手",
        "jieduan": "1",
        "imagedata": "",
        "shopinfo": "",
        "pingjian": null,
        "shopcount": "0",
        "xiangmu_scdy": "",
        "xiangmu_jzys": "",
        "xiangmu_syms": "",
        "plan_shopcount": "0",
        "plan_shopaddress": "",
        "xiangmu_gqsz": "",
        "xiangmu_chuzi": "0",
        "xiangmu_zonge": "0",
        "xiangmu_shouyi": "",
        "xiangmu_tuichu_one": "",
        "xiangmu_zhengjian": "",
        "area_jiedao": "0",
        "plan_shop": "",
        "fill_number": "0",
        "shop_hehuo_typeinfo": "",
        "jingyingzhibiao": "",
        "xieyi": "",
        "projectfrom": "自主品牌",
        "project_index": "1",
        "jdb": 0,
        "grade_name": "展示类项目",
        "grade_color": "green",
        "guanzhu_css_class": "no_guanzhu",
        "typename": "餐饮美食",
        "typenamedetail": "西式快餐",
        "planshop": {
          "1": {
            "shop_area": "锦江区",
            "shop_jiedao": "成都市锦江区成都锦华万达广场店"
          }
        },
        "daoshi": null,
        "news": null,
        "projectpic": null,
        "dsj": null,
        "shop": null,
        "luyan": null,
        "guquanshezhi": null,
        "zijinyongtu": null,
        "yunyingguankong": null,
        "tuichu_image": null,
        "laodianxindian": ""
      }],
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
      getProjects(param,this.token).then(res=>{
        let data = res.data;
        for(let key in this.selectRules){
          if(!!data[key]) this.selectRules[key] = data[key];
        }
        if(data.resres){
          this.couldLoadMore = true;
          this.list = this.list.contact(data.resres);
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
       wx.navigateTo({
         url: '/pages/projectdetails/main?id=1'
      })
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


