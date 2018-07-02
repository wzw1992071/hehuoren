<template>
  <div class="inner">
    <div class="con" v-if="detail">
      <div class="project-card">
        <div class="img">
          <img class="project-card-logo" :src="baseUrl+detail.logo" alt="">
          <div class="heat-img">
            <img src="/static/images/hot_low.png">
          </div>
        </div>
        <div class="bottom">
          <div class="info">
            <div class="name">
              <span>{{detail.title}}</span>
              <span class="zhanshilei" v-if="detail.grade==1">展示类</span>
              <span class="yurelei" v-if="detail.grade==2">预热类</span>
              <span class="remenlei" v-if="detail.grade==3">热门类</span>
              <span class="luyanlei" v-if="detail.grade==4">准路演类</span>
              <span class="red" v-if="jieduan==1">首次开店</span>
              <span class="red" v-if="jieduan==2">开设分店</span>
              <span class="red" v-if="jieduan==3">老店重组</span>
            </div>
            <p class="slogan oneover">{{detail.yijuhua}}</p>
            <p class="type onetwo">{{detail.xiangmu_hy_name}}</p>
          </div>
          <div class="mark">
            <div class="heat">
              <span>热度：</span>
              <span class='hot'>{{detail.guanzhu_count}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="describe block">
      <h1>
        <span>项目描述</span>
        <span>
          <img src="/static/images/h1close.png">
          <img src="/static/images/h1open.png">
        </span>
      </h1>
      <div>
        <p v-if="detail"> {{detail.description}} </p>
        <ul class="address clear_left_float">
          <li>
            <img src="/static/images/gps.jpg">
            <span>项目预期地址</span>
          </li>
          <li>
            <img src="/static/images/liebiao.png">
            <span>项目分布列表</span>
          </li>
          <li>
            <img src="/static/images/gps.jpg">
            <span>合伙人预期地址</span>
          </li>
          <li>
            <img src="/static/images/liebiao.png">
            <span>合伙人分布列表</span>
          </li>
        </ul>

      </div>
    </div>

     <div class="team" v-if="detail&&(detail.founder||detail.daoshi||detail.team)">
       <h1 class="title">
        <span>团队介绍</span>
       </h1>
       <div>
         <p>{{detail&&detail.team_description}}</p>
       </div>
       <ul>
         <li class="clear_right_float" v-if="detail&&detail.founder">
           创始人
           <div>
             <img :src="detail&&baseUrl+detail.founder['founder_icon']" alt="">
           </div>
           <div>
             <p>{{detail&&detail.founder['founder_xingming']}}</p>
             <p>{{detail&&detail.founder['founder_description']}}</p>
           </div>
         </li>
         <li class="clear_right_float" v-if="detail&&detail.daoshi" v-for="(item, index) in detail.daoshi" :key="item">
           顾问导师
           <div>
             <img :src="baseUrl+item['daoshi_icon']" alt="">
           </div>
           <div>
             <p>{{item['daoshi_xingming']}}</p>
             <p>{{item['daoshi_description']}}</p>
           </div>
         </li>
         <li class="clear_right_float" v-if="detail&&detail.team" v-for="(item, index) in detail.team" :key="item">
           团队成员
           <div>
             <img :src="baseUrl+item['team_icon']" alt="">
           </div>
           <div>
             <p>{{item['team_xingming']}}</p>
             <p>{{item['team_description']}}</p>
           </div>
         </li>
       </ul>
     </div>


     <div class="details" v-if="detail&&(detail.shop||detail.xiangmu_scdy||detail.xiangmu_jzys||detail.xiangmu_syms||detail.pingjian||detail.dsj)">
       <p>
         详细信息
       </p>
       <div class="details-text" v-if="detail&&detail.shop">
         <div v-for="(item, index) in detail.shop" :key="index">
           <p>
             现有店铺概况
             <span></span>
           </p>
           <p>
             店铺名称：{{item.shop_name}}
           </p>
           <p>
           <span>
            店铺总投入：{{item.shop_zongtouru}}元
           </span>
             <span>
             从筹备倒运营：{{item.shop_yunyingzhouqi}}天
           </span>
           </p>
           <p>
           <span>
            开业倒盈利时间：{{item.shop_fenhongshijian}}天
           </span>
             <span>
            人均消费：{{item.shop_renjunxiaofei}}元
           </span>
           </p>
           <p>
           <span>
            上季度营业总收入:{{item.shop_shangjidushouru}}元
           </span>
             <span>
            上年营业净利润:{{item.shop_shangnianlirun}}元
           </span>
           </p>
           <p>
             店铺地址：{{item.shop_address}}
           </p>
           <swiper
             v-if="!!item.project_img"
             :indicator-dots="indicatorDots"
             :autoplay="autoplay"
             :interval="interval"
             :duration="duration"
             :indicator-color="indicatorColor"
             :indicator-active-color='indicatorActiveColor'
             :display-multiple-items='2'
             :circular=1
             class="swiper-box"
           >
             <block :wx:for-item="sitem" :wx:for="item.project_img" :wx:key="index">
               <swiper-item>
                 <div class="class-info">
                   <!-- 避免报错：item为undefined -->
                   <image :src="sitem?sitem.project_img:null" class="slide-image" />
                 </div>
               </swiper-item>
             </block>
           </swiper>
         </div>
       </div>
       <div class="details-text" v-if="detail&&detail.xiangmu_scdy">
         <p>
           市场调研
           <span></span>
         </p>
         <p>
           {{detail.xiangmu_scdy}}
         </p>
       </div>
       <div class="details-text" v-if="detail&&detail.xiangmu_jzys">
         <p>
           竞争优势
           <span></span>
         </p>
         <p>
           {{detail.xiangmu_jzys}}
         </p>
       </div>
       <div class="details-text" v-if="detail&&detail.xiangmu_syms">
         <p>
           商业模式
           <span></span>
         </p>
         <p>
           {{detail.xiangmu_syms}}
         </p>
       </div>
       <div class="details-text" v-if="detail&&detail.pingjian">
         <p>
           项目品鉴
           <span></span>
         </p>
         <p> 订座电话：{{detail.pingjian.pingjian_mobile}} </p>
         <p> 本平台会员折扣优惠：{{detail.pingjian.pingjian_sales}}折 </p>
         <p> 联系人：{{detail.pingjian.pingjian_lianxiren}} </p>
         <p> 地址：{{detail.pingjian.pingjian_address}} </p>
       </div>
       <div class="details-text" v-if="detail&&detail.dsj">
         <p>
           项目大事记
           <span></span>
         </p>
         <p>
            {{detail.dsj.dsj_content}}
         </p>
       </div>
       <div class="details-text" v-if="detail.video">
         <p>
           相关视频
           <span></span>
         </p>
         <p v-for="(vitem,index) in detail.video" :key="index">
           {{vitem.video_title}}
           <video :src="vitem.video_href"   controls ></video>
         </p>
       </div>
     </div>
     <div class="details" v-if="detail&&(detail.guquanshezhi||detail.zijinyongtu||detail.yunyingguankong||detail.xiangmu_tuichu_one)">
       <p>
         合伙需求
       </p>
       <div class="details-text" v-if="detail.guquanshezhi">
         <p>
           股权设置
           <span></span>
         </p>
         <p> 营业面积：{{detail.guquanshezhi.project_shopmianji}}平米 </p>
         <p> 项目总投资：{{detail.guquanshezhi.project_shopmianji}}元 </p>
         <p>
           <span> 项目方出资：{{detail.guquanshezhi.project_xiangmufang_chuzi}}元 </span>
           <span> 合伙方出资：{{detail.guquanshezhi.project_hehuofang_chuzi}}元 </span>
         </p>
         <p>
           <span> 项目方股份占比：{{detail.guquanshezhi.project_xiangmufang_gufen}}% </span>
           <span> 合伙方股份占比：{{detail.guquanshezhi.project_hehuofang_gufen}}% </span>
         </p>
         <p>
           <span> 项目方收益比例：{{detail.guquanshezhi.project_xiangmufang_shouyi}}% </span>
           <span> 合伙方收益比例：{{detail.guquanshezhi.project_hehuofang_shouyi}}% </span>
         </p>
       </div>
       <div class="details-text" v-if="detail&&detail.zijinyongtu">
         <p>
           资金用途
           <span></span>
         </p>
         <p> 是否加盟：{{detail.zijinyongtu.zjyt_jiameng}} </p>
         <p> 加盟费：{{detail.zijinyongtu.zjyt_jiameng_money}}元 </p>
         <p> 预付租金费用：{{detail.zijinyongtu.zjyt_yufuzujin}}元/季 </p>
         <p> 开业前的员工储备培训开支：{{detail.zijinyongtu.zjyt_peixunfei_allmoney}}元 </p>
         <p> 共计：{{detail.zijinyongtu.zjyt_gongzi_mouth}}月 </p>
         <p> 开业后员工开支：{{detail.zijinyongtu.zjyt_zhuangxiu}}元 </p>
         <p> 装修费用：{{detail.zijinyongtu.zjyt_zhuangxiu}}元 </p>
       </div>
       <div class="details-text" v-if="detail&&detail.yunyingguankong">
         <p> 合伙成功后开店时间不可超过：{{detail.yunyingguankong.yygk_kaidianshijian}}天 </p>
         <p> 毛利率不得低于：{{detail.yunyingguankong.yygk_maolilv}}% </p>
         <p> 分红周期：{{detail.yunyingguankong.yygk_fenhongshijian}}天/次 </p>
         <p> 股东管理办法及要求：{{detail.yunyingguankong.yygk_gudongguanli}} </p>
         <p> 资金监管：{{detail.yunyingguankong.yygk_zijinjianguan}} </p>
         <p class="show-text"> 为保障项目方与合伙人共同的权益，项目方郑重承诺：如项目方未履行以上运营管控方案，由此造成的一切损失，由项目方全部承担。 </p>
       </div>
       <div class="details-text" v-if="detail&&detail.xiangmu_tuichu_one">
         <p>
           退出机制
           <span></span>
         </p>
         <p> {{detail.xiangmu_tuichu_one}} </p>
       </div>
       <div class="details-text" v-if="detail.tuichu_image&&detail.tuichu_image.length">
         <p>
           合伙协议摘要
           <span></span>
         </p>
         <p class="details-img">
           <img
             v-if="detail.tuichu_image.length"
             v-for="(item,index) in detail.tuichu_image"
             :src="item.tuichu_image ? beasUrl+item.team_icon : ''"
             :key="index">
         </p>
       </div>
     </div>
     <div class="details" v-if="detail&&detail.guquanshezhi">
       <p>
         合伙详情
       </p>
       <div class="scroll-bar" v-if="detail&&detail.guquanshezhi">
         <p> 消费合伙单笔 {{detail.guquanshezhi.project_xfhh_danbi}} 元 | 股份占比( {{detail.guquanshezhi.project_xfhh_gufen}}%) </p>
         <p> 已合伙 {{hehuoLog.min_count}} 份 | 共计 {{detail.guquanshezhi.project_xfhh_count}} 份 </p>
         <ul class="clear_left_float">
           <li> 完成度： </li>
           <li>
             <div class="scroll-box">
               <span :style="'width:'+ num1"></span>
             </div>
           </li>
           <li>
             {{num1}}
           </li>
         </ul>
       </div>
       <div class="scroll-bar" v-if="detail&&detail.guquanshezhi">
         <p> 股本合伙单笔 {{detail.guquanshezhi.project_gbhh_danbi}} 元 | 股份占比( {{detail.guquanshezhi.project_gbhh_gufen}}%) </p>
         <p> 已合伙 {{hehuoLog.other_count}} 份 | 共计 {{detail.guquanshezhi.project_gbhh_count}} 份 </p>
         <ul class="clear_left_float">
           <li> 完成度： </li>
           <li>
             <div class="scroll-box">
               <span :style="'width:'+num2"></span>
             </div>
           </li>
           <li>
             {{num2}}
           </li>
         </ul>
       </div>
       <div class="scroll-bar" v-if="detail&&detail.guquanshezhi">
         <p> 领头合伙单笔 {{detail.guquanshezhi.project_lthh_danbi}} 元 | 股份占比( {{detail.guquanshezhi.project_lthh_gufen}}%) </p>
         <p> 已合伙 {{hehuoLog.max_count}} 份 | 共计 {{detail.guquanshezhi.project_lthh_count}} 份 </p>
         <ul class="clear_left_float">
           <li> 完成度： </li>
           <li>
             <div class="scroll-box">
               <span :style="'width:'+num3"></span>
             </div>
           </li>
           <li>
             {{num3}}
           </li>
         </ul>
       <!-- 我想 -->
       </div>
     </div>
    <div class="details">
      <div class="scroll-bar">
        <p class="woxiang">
          我想：
        </p>
        <ul class="clear_left_float bottom-list">
          <li>
           <span @click="collect">
             <img src="/static/images/guanzhu.png" alt="">
              关注
           </span>
          </li>
          <li>
            <san @click="luyan">
              <img src="/static/images/luyan.png" alt="">
              报名路演
            </san>
          </li>
          <li>
            <span @click="operate">
              <img src="/static/images/hehuoren.png" alt="">
              合伙运营
            </span>
          </li>
          <li>
            <span @click="lead">
              <img src="/static/images/lingdao.png" alt="">
              领头
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getProjectDetail,focuseProject,objOpeByLt,objOpeByOt} from '@/apis/index'
  export default {
    data: function () {
      return {
        id:null,
        detail:null,
        hehuoLog:{
          "other_count": 0,
          "min_count": 0,
          "max_count": 0
        },
        collected:false,
        hehuos:false,
        jieduan: 0,
      };
    },
    components: {},
    methods: {
      loadDetail(){
        getProjectDetail({
          separate:1,
          id:this.id
        },this.token).then(resxx=>{
          let res = {
            data:{
              "jieduan": {
                "1": "首次开店",
                "2": "开设分店",
                "3": "老店重组"
              },
              "city": [
                {
                  "code": "锦江区",
                  "area": "510104",
                  "name": "锦江区"
                },
                {
                  "code": "青羊区",
                  "area": "510105",
                  "name": "青羊区"
                },
                {
                  "code": "金牛区",
                  "area": "510106",
                  "name": "金牛区"
                },
                {
                  "code": "武侯区",
                  "area": "510107",
                  "name": "武侯区"
                },
                {
                  "code": "成华区",
                  "area": "510108",
                  "name": "成华区"
                },
                {
                  "code": "龙泉驿区",
                  "area": "510112",
                  "name": "龙泉驿区"
                },
                {
                  "code": "青白江区",
                  "area": "510113",
                  "name": "青白江区"
                },
                {
                  "code": "新都区",
                  "area": "510114",
                  "name": "新都区"
                },
                {
                  "code": "温江区",
                  "area": "510115",
                  "name": "温江区"
                },
                {
                  "code": "金堂县",
                  "area": "510121",
                  "name": "金堂县"
                },
                {
                  "code": "双流县",
                  "area": "510122",
                  "name": "双流县"
                },
                {
                  "code": "郫县",
                  "area": "510124",
                  "name": "郫县"
                },
                {
                  "code": "大邑县",
                  "area": "510129",
                  "name": "大邑县"
                },
                {
                  "code": "蒲江县",
                  "area": "510131",
                  "name": "蒲江县"
                },
                {
                  "code": "新津县",
                  "area": "510132",
                  "name": "新津县"
                },
                {
                  "code": "都江堰市",
                  "area": "510181",
                  "name": "都江堰市"
                },
                {
                  "code": "彭州市",
                  "area": "510182",
                  "name": "彭州市"
                },
                {
                  "code": "邛崃市",
                  "area": "510183",
                  "name": "邛崃市"
                },
                {
                  "code": "崇州市",
                  "area": "510184",
                  "name": "崇州市"
                },
                {
                  "code": "高新区",
                  "area": "510185",
                  "name": "高新区"
                },
                {
                  "code": "锦江区",
                  "area": "510108",
                  "name": "锦江区"
                }
              ],
              "planshopAddress": {
                "1": {
                  "shop_area": "锦江区",
                  "shop_jiedao": "成都市锦江区成都锦华万达广场店",
                  "jiedaolist": false
                },
                "2": {
                  "shop_area": "青羊区",
                  "shop_jiedao": "成都市青羊区成都青羊万达广场",
                  "jiedaolist": false
                },
                "3": {
                  "shop_area": "金牛区",
                  "shop_jiedao": "成都市金牛区成都金牛万达广场甲级写字楼-a座",
                  "jiedaolist": false
                },
                "4": {
                  "shop_area": "武侯区",
                  "shop_jiedao": "成都市武侯区武侯万达广场",
                  "jiedaolist": false
                }
              },
              "info": {
                "id": "158",
                "title": "项目名称",
                "description": "项目介绍",
                "logo": "Public/uploadfile/2018/0412/44e5b37a0fcbc3f8bd618a91a81531a3.png",
                "founder": {
                  "founder_icon": "Public/uploadfile/2018/0413/5fc915ee7834f0849ce0cd4c5b6ea3df.png",
                  "founder_xingming": "创始人真实姓名",
                  "founder_mobile": "13555555555",
                  "founder_weixin": "创始人微信号",
                  "founder_zhiwei": "技术负责人",
                  "founder_description": "创始人个人描述"
                },
                "mobile": "",
                "team": {
                  "1": {
                    "team_icon": "Public/uploadfile/2018/0413/e0808072b51d6ddbfe4dad8730069c69.png",
                    "team_xingming": "团队其他成员信息真实姓名一",
                    "team_mobile": "13555555555",
                    "team_weixin": "团队其他成员信息微信号一",
                    "team_zhiwei": "市场负责人",
                    "team_description": "团队其他成员信息个人描述一"
                  },
                  "2": {
                    "team_icon": "Public/uploadfile/2018/0507/3df357ed56cad2b21871df009242aa60.png",
                    "team_xingming": "团队其他成员信息真实姓名二",
                    "team_mobile": "13222222222",
                    "team_weixin": "团队其他成员信息微信号二",
                    "team_zhiwei": "技术负责人",
                    "team_description": "团队其他成员信息个人描述二"
                  }
                },
                "team_description": "团队介绍",
                "xiangmu_dsj": "",
                "grade": "4",
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
                "updatetime": "1525664169",
                "status": "1",
                "backmsg": "",
                "deleted": "0",
                "client_ip": "127.0.0.1",
                "userid": "113",
                "icon": "",
                "email": "",
                "zhiwei": "",
                "founder_info": "",
                "video": {
                  "1": {
                    "video_title": "项目视频标题一",
                    "video_href": "http://www.xiangmuspyi.com"
                  },
                  "2": {
                    "video_title": "项目视频标题二",
                    "video_href": "http://www.xiangmusper.com"
                  }
                },
                "cz_data": "",
                "tutor_truename": "",
                "tutor_icon": "",
                "tutor_email": "",
                "tutor_info": "",
                "area": "510104,510105,510106,510107,",
                "xiangmu_hy": "31",
                "xiangmu_hy_detail": "105",
                "yijuhua": "一句话介绍",
                "jieduan": "1",
                "imagedata": "",
                "shopinfo": "",
                "pingjian": {
                  "pingjian_address": "项目评鉴店铺位置",
                  "pingjian_mobile": "0827-6613240",
                  "pingjian_lianxiren": "项目评鉴联系人姓名",
                  "pingjian_sales": "2.5"
                },
                "shopcount": "0",
                "xiangmu_scdy": "竞争模式市场调研",
                "xiangmu_jzys": "竞争模式竞争优势",
                "xiangmu_syms": "竞争模式商业优势",
                "plan_shopcount": "0",
                "plan_shopaddress": "",
                "xiangmu_gqsz": "",
                "xiangmu_chuzi": "0",
                "xiangmu_zonge": "0",
                "xiangmu_shouyi": "",
                "xiangmu_tuichu_one": "路演退出机制",
                "xiangmu_zhengjian": "",
                "area_jiedao": "0",
                "plan_shop": "",
                "fill_number": "0",
                "shop_hehuo_typeinfo": "",
                "jingyingzhibiao": "",
                "xieyi": "",
                "projectfrom": "自主品牌",
                "project_index": "17",
                "planshop": {
                  "1": {
                    "shop_area": "锦江区",
                    "shop_jiedao": "成都市锦江区成都锦华万达广场店"
                  },
                  "2": {
                    "shop_area": "青羊区",
                    "shop_jiedao": "成都市青羊区成都青羊万达广场"
                  },
                  "3": {
                    "shop_area": "金牛区",
                    "shop_jiedao": "成都市金牛区成都金牛万达广场甲级写字楼-a座"
                  },
                  "4": {
                    "shop_area": "武侯区",
                    "shop_jiedao": "成都市武侯区武侯万达广场"
                  }
                },
                "daoshi": {
                  "1": {
                    "daoshi_icon": "Public/uploadfile/2018/0413/b539c757dbf6761074d4a2dfa69e0d65.png",
                    "daoshi_xingming": "顾问导师姓名一",
                    "daoshi_zhiwei": "技术顾问",
                    "daoshi_description": "顾问导师简介一"
                  },
                  "2": {
                    "daoshi_icon": "Public/uploadfile/2018/0413/4c344c16f6e92db2998867581435f59e.png",
                    "daoshi_xingming": "顾问导师姓名二",
                    "daoshi_zhiwei": "技术顾问",
                    "daoshi_description": "顾问导师简介二"
                  }
                },
                "news": {
                  "1": {
                    "news_title": "新闻报道标题一",
                    "news_href": "http://www.xinwenyi.com"
                  },
                  "2": {
                    "news_title": "新闻报道标题二",
                    "news_href": "http://www.xinwener.com"
                  }
                },
                "projectpic": {
                  "1": {
                    "project_img": "Public/uploadfile/2018/0507/b2c2d9da85c65e546fe0ae4b6084ee36.png"
                  },
                  "2": {
                    "project_img": "Public/uploadfile/2018/0507/b21ad62ea401cabc2b4aa7ae268ffeaa.png"
                  }
                },
                "dsj": {
                  "1": {
                    "dsj_time": "2018年5月6日",
                    "dsj_content": "2018年5月6日我公司发生了意见项目大事记，这是事件类容一"
                  },
                  "2": {
                    "dsj_time": "2018年5月7日",
                    "dsj_content": "2018年5月7日我公司发生了意见项目大事记，这是事件类容二"
                  }
                },
                "shop": {
                  "1": {
                    "shop_name": "现有店铺名称",
                    "shop_address": "现有店铺名称地址",
                    "shop_zongtouru": "99999999999999999999",
                    "shop_yunyingzhouqi": "360",
                    "shop_fenhongshijian": "90",
                    "shop_keliuliang": "500",
                    "shop_renjunxiaofei": "50",
                    "shop_shangnianshouru": "9000000",
                    "shop_shangnianlirun": "6200000",
                    "shop_shangjidushouru": "2250000",
                    "shop_shangjidulirun": "900000"
                  }
                },
                "luyan": {
                  "luyan": "是",
                  "jihuashu": "是",
                  "chouhuazhouqi": "1个月",
                  "luyanchangdi": "有",
                  "shuomingren": "核心团队成员",
                  "ishelp": "是"
                },
                "guquanshezhi": {
                  "project_shoptype": "新店开设",
                  "project_shopmianji": "360",
                  "project_zongtouru": "5000000",
                  "project_xiangmufang_chuzi": "3000000",
                  "project_xiangmufang_gufen": "40",
                  "project_hehuofang_chuzi": "2000000",
                  "project_hehuofang_gufen": "60",
                  "project_xiangmufang_shouyi": "40",
                  "project_hehuofang_shouyi": "60",
                  "project_xfhh_danbi": "300",
                  "project_xfhh_gufen": "200",
                  "project_xfhh_count": "500",
                  "project_xfhh_tiyanmoney": "44",
                  "project_gbhh_danbi": "220",
                  "project_gbhh_gufen": "44",
                  "project_gbhh_count": "44",
                  "project_gbhh_tiyanmoney": "55",
                  "project_lthh_danbi": "45",
                  "project_lthh_gufen": "51",
                  "project_lthh_count": "5",
                  "project_lthh_tiyanmoney": "445",
                  "project_other_shouyi": "路演股权设置",
                  "guzhiyiju_img": ""
                },
                "zijinyongtu": {
                  "zjyt_jiameng": "否",
                  "zjyt_yufuzujin": "60000",
                  "zjyt_lvyuebaozhengjin": "12000",
                  "zjyt_peixunfei_money": "3000",
                  "zjyt_peixunfei_mouth": "13",
                  "zjyt_peixunfei_allmoney": "4444",
                  "zjyt_gongzi_money": "4242",
                  "zjyt_gongzi_mouth": "424",
                  "zjyt_gongzi_allmoney": "424",
                  "zjyt_zhuangxiu": "4242",
                  "zjyt_yuanliao": "24525",
                  "zjyt_chengligongsi": "2424",
                  "zjyt_liudongzijin": "42474",
                  "zjyt_chubeijin": "42474",
                  "zjyt_guanggao": "354",
                  "zjyt_caiwu": "4242",
                  "zjyt_allmoney": "197603",
                  "zjyt_remark": "路演资金用途"
                },
                "yunyingguankong": {
                  "yygk_kaidianshijian": "23",
                  "yygk_maolilv": "44",
                  "yygk_fenhongshijian": "24",
                  "yygk_gudongguanli": "路演运营管控，合伙人管理办法及要求",
                  "yygk_zijinjianguan": "路演运营管控，资金监管",
                  "yygk_agree": "同意"
                },
                "tuichu_image": {
                  "1": {
                    "xieyi_img": "Public/uploadfile/2018/0507/300436bf3ce98b6e26ba7dd901898ada.png"
                  }
                },
                "luyan_jdt": 0,
                "guanzhu_count": "0",
                "order_count": "0",
                "isGuanZhu": "关注",
                "isLingTou": "项目领头",
                "isHeHuoYunYing": "合伙运营",
                "hehuo_tp": 0,
                "isLuYan": "报名路演",
                "xiangmu_hy_name": "餐饮美食"
              },
              "hehuoLog": {
                "other_count": 0,
                "min_count": 0,
                "max_count": 0
              },
              "other_res": [],
              "resList": [],
              "resList2": [],
              "is_login": 0,
              "userinfo": null,
              "userGrade": null
            }
          }
          this.detail = res.data.info;
          if (detail) this.jieduan = detail.jieduan ? detail.jieduan : 0;
          this.hehuoLog = res.data.hehuoLog;
        })
      },
      toDecimal2(num) {
        if(typeof num =='number'){
          num = num.toFixed(2) *100;
        }else{
          num = 0;
        }
        return `${num}%`;
      },
      checkAddress(){

      },

      /*
      * 关注
      * */
      collect() {
        let param = {
          id:this.detail.id,
          separate:1,
          type:1,
          token:this.token
        };
        this.collected?param.flag=4:param.flag=1;
        focuseProject(param).then(res=>{
          if (res.status == 1) {
            this.collected = !this.collected;
            wx.showToast({
              title: res.msg,
              icon: 'success',
              duration: 2000
            });
          } else {
            if (res.status == -3) {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              });
              return false;
            }
            if (res.status != -1) {
              wx.showModal({
                title: '提示',
                content: res.msg,
                success: function(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '/pages/user/main'
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          }
        })
      },
      /**
       * 报名路演
       */
      luyan(){
        let params = {
          id:this.id,
          type:4,
          token:this.token
        };
        if(this.detail.isLingTou  =='项目领头'){
          objOpeByLt(params).then(this.requestCallback);
        }else{
          objOpeByOt(params).then(this.requestCallback);
        }
      },
      /**
       *  运营
       */
      operate(){
        let self = this;
        wx.showModal({
          title: '提示',
          content: "请选择参与合伙运营的方式",
          cancelText:'消费合伙',
          confirmText:'股本合伙',
          cancelColor:'#3CC51F',
          success: function(res) {
            if (res.confirm) {
              self.afterOperate(1)
            } else if (res.cancel) {
              self.afterOperate(2);
            }
          }
        })
      },

      afterOperate(status){
        let self = this;
        if(status==1){
          if(this.hehuos){
            wx.showToast({
              title: `您已参与股本合伙`,
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showModal({
              title:'提示',
              content:'主要以货币形式参与合伙运营。获得更多利益分成、开拓眼界、更新思维、搭建新的资源圈、更多了解国家宏观经济形势，是否确定通过股本合伙参与该项目？',
              success: function(res) {
                if (res.confirm) {
                  self.operateRequest(3)
                }
              }
            })
          }
        }else{
          if(this.hehuos){
            wx.showToast({
              title: `您已参与消费合伙`,
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showModal({
              title:'提示',
              content:'以少量资金参与合伙、降低风险、注重合伙体验。更加适合入门级平台会员。是否确定通过消费合伙参与该项目？',
              success: function(res) {
                if (res.confirm) {
                  self.operateRequest(2)
                }
              }
            })
          }
        }
      },

      operateRequest(type){
        let param  = {
          id:this.id,
          type,
          token:this.token
        };
        this.hehuos? objOpeByOt(param).then(this.requestCallback):objOpeByLt(param).then(this.requestCallback);
      },
      /**
       * 领头
       */
      lead(){
        let params = {
          id:this.id,
          type:1,
          token:this.token
        };
        if(this.detail.isLingTou=='项目领头'){
          objOpeByLt(params).then(this.requestCallback);
        }else{
          objOpeByOt(params).then(this.requestCallback);
        }
      },

      requestCallback(res){
        if (res.status == 1) {
          wx.showToast({
            title: res.msg,
            icon: 'success',
            duration: 2000
          });
        } else {
          if (res.status == -3) {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
            return false;
          }
          if (res.status != -1) {
            wx.showModal({
              title: '提示',
              content: res.msg,
              success: function(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/user/main'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      }
    },
    mounted(){
      this.collected =!!(this.detail&&this.detail.guanzhu_css_class == 'yes_guanzhu');
      if(this.detail&&this.detail.isHeHuoYunYing == '合伙运营'){
        this.hehuos = false
      }else{
        this.hehuos = true
      }
    },
    onLoad: function(option){
      this.id = option.id;
      this.loadDetail();
    },
    computed:{
      ...mapGetters(['token','baseUrl']),
      num1(){
        if(!this.hehuoLog||!this.detail||!this.detail.guquanshezhi) return 0;
        return this.toDecimal2(this.hehuoLog.min_count/this.detail.guquanshezhi.project_xfhh_count)
      },
      num2(){
        if(!this.hehuoLog||!this.detail||!this.detail.guquanshezhi) return 0;
        return this.toDecimal2(this.hehuoLog.other_count/this.detail.guquanshezhi.project_gbhh_count)
      },
      num3(){
        if(!this.hehuoLog||!this.detail||!this.detail.guquanshezhi) return 0;
        return this.toDecimal2(this.hehuoLog.max_count/this.detail.guquanshezhi.project_lthh_count)
      },
    }
  };
</script>




