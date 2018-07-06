<template>
    <div class="container">
        <user-header></user-header>
        <div class="tab">
            <div>
                <div v-for="(item,index) in tabs" @click="queryObj(index+1)" :key="index" :class="{active:item.active}" >{{item.title}}</div>
            </div>
        </div>
      <div class="item-content">
        <scroll-view scroll-y style="height: 100%" @scrolltolower="loadMore">
          <div v-for="(item,key,index) in list" :key="key">
            <project-card :gray="1" :cardtype="cardType" @handlerEdit="edit" @handlerClick="loadDetail" :detail="item" ></project-card>
          </div>
        </scroll-view>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import userHeader from "@/components/userHeader";
import projectCard from "@/components/projectCard";
import{queryMyObj} from '@/apis/index'
import{mapGetters} from 'vuex'
export default {
    data: function () {
        return {
            tabs:[
              {title:'发布的',active:true,cardType:2},
              {title:'关注的',active:false,cardType:3},
              {title:'洽谈的',active:false,cardType:3},
              {title:'合伙中',active:false,cardType:3}
            ],
            type:1,
            page:1,
            cardType:2,
            couldLoadMore:true,
            list:[]
        }
    },
    components: {
        userHeader,
        projectCard
    },
    methods: {
        loadDetail(item){
          if(!this.token){
            wx.navigateTo({
              url: '/pages/login/main'
            })
          }else{
            wx.navigateTo({
              url: '/pages/projectdetails/main?id='+item.id
            })
          }
        },
        edit(item){
            wx.navigateTo({
                url: '/pages/projectModifyMain/main?id='+item.id
            })
        },
        loadMore(){
            if(this.couldLoadMore){
              this.page++;
              this.queryMyObjInfo();
            }
        },
        queryObj(index){
          this.type = index;
          for (let i = 0; i < this.tabs.length; i++) {
            if (index - 1 == i) {
              this.tabs[i].active = true
              this.cardType = this.tabs[i].cardType;
            } else {
              this.tabs[i].active = false
            }
          };
          this.list = [];
          this.page = 1;
          this.queryMyObjInfo();
        },
        queryMyObjInfo(){
          queryMyObj({
            token:this.token,
            separate:1,
            type:this.type,
            page:this.page
          }).then(res=>{
            let data = res.data;
            if(data.res){
              this.couldLoadMore = true;
              let tempList  = this.list;
              this.list = tempList.concat(data.res);
            }else{
              this.couldLoadMore = false;
            }
          })
        }
    },
    mounted(){
      this.queryMyObjInfo();
    },
    computed:{
      ...mapGetters(['token'])
    }
}
</script>

<style>
page {
    background: #f6f6f6;
}
.item-content{
  position: absolute;
  top:500rpx;
  left: 0;
  right: 0;
  bottom: 0;
}
.tab {
    display: flex;
    padding: 40rpx 40rpx 0;
    height: 80rpx;
    background: #fff;
}

.tab>div:first-child {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    font-size: 24rpx;
    color: #343434;
    /* font-weight: 600; */
}

.tab div div.active {
    font-weight: 600;
}

.tab div div:after {
    content: '';
    display: block;
    width: 60rpx;
    height: 8rpx;
    border-radius: 4rpx;
    background-color: none;
    margin: 8rpx auto 0;
}

.tab div div.active:after {
    background-color: #ff7803;
}

</style>


