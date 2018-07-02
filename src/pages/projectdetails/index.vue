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
    <div class="describe">
      <div class="title" @click="showIt(0)">
        <span>项目描述</span>
        <span>
        <img v-if="!showList[0]" src="/static/images/h1close.png">
          <img v-if="showList[0]" src="/static/images/h1open.png">
      </span>
      </div>
      <div class="describe-content" v-show="showList[0]">
        <p v-if="detail" class="p"> {{detail.description}} </p>
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
      <h1 class="title" @click="showIt(1)">
        <span>团队介绍</span>
        <span>
          <img v-if="!showList[1]" src="/static/images/h1close.png">
          <img v-if="showList[1]" src="/static/images/h1open.png">
        </span>
      </h1>
      <div class="content" v-show="showList[1]">
        <p class="dec">{{detail&&detail.team_description}}</p>
        <ul>
          <li v-if="detail&&detail.founder">
            <span>创始人</span>
            <div class="info">
              <p>{{detail&&detail.founder['founder_xingming']}}</p>
              <p>{{detail&&detail.founder['founder_description']}}</p>
            </div>
            <div class="head">
              <img :src="detail&&baseUrl+detail.founder['founder_icon']" alt="">
            </div>
          </li>
          <li v-if="detail&&detail.daoshi" v-for="(item, index) in detail.daoshi" :key="item">
            <span>顾问导师</span>
            <div class="info">
              <p>{{item['daoshi_xingming']}}</p>
              <p>{{item['daoshi_description']}}</p>
            </div>
            <div class="head">
              <img :src="baseUrl+item['daoshi_icon']" alt="">
            </div>
          </li>
          <li v-if="detail&&detail.team" v-for="(item, index) in detail.team" :key="item">
            <span>团队成员</span>
            <div class="info">
              <p>{{item['team_xingming']}}</p>
              <p>{{item['team_description']}}</p>
            </div>
            <div class="head">
              <img :src="baseUrl+item['team_icon']" alt="">
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="details">
      <h1 @click="showIt(2)" class="title">
        <span>详细信息</span>
        <span>
          <img v-if="!showList[2]" src="/static/images/h1close.png">
          <img v-if="showList[2]" src="/static/images/h1open.png">
        </span>
      </h1>
      <div v-show="showList[2]">
        <h2 class="title-s" @click="showIt3(0)">
          <span>现有店铺概况</span>
          <span>
          <img v-if="!showList3[0]" src="/static/images/h2close.png">
          <img v-if="showList3[0]" src="/static/images/h2open.png">
        </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.shop" v-show="showList3[0]">
          <div v-for="(item, index) in detail.shop" :key="index" >
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
                    <image :src="sitem?sitem.project_img:null" class="slide-image"/>
                  </div>
                </swiper-item>
              </block>
            </swiper>
          </div>
        </div>
        <h2 class="title-s" @click="showIt3(1)">
          <span>市场调研</span>
          <span>
              <img v-if="!showList3[1]" src="/static/images/h2close.png">
              <img v-if="showList3[1]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.xiangmu_scdy" v-show="showList3[1]">
          <p>
            {{detail.xiangmu_scdy}}
          </p>
        </div>
        <h2 class="title-s" @click="showIt3(2)">
          <span>竞争优势</span>
          <span>
              <img v-if="!showList3[2]" src="/static/images/h2close.png">
              <img v-if="showList3[2]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.xiangmu_jzys" v-show="showList3[2]">
          <p>
            {{detail.xiangmu_jzys}}
          </p>
        </div>
        <h2 class="title-s" @click="showIt3(3)">
          <span>商业模式</span>
          <span>
              <img v-if="!showList3[3]" src="/static/images/h2close.png">
              <img v-if="showList3[3]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.xiangmu_syms" v-show="showList3[3]">
          <p>
            {{detail.xiangmu_syms}}
          </p>
        </div>
        <h2 class="title-s" @click="showIt3(4)">
          <span>项目品鉴</span>
          <span>
              <img v-if="!showList3[4]" src="/static/images/h2close.png">
              <img v-if="showList3[4]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.pingjian" v-show="showList3[4]">
          <p> 订座电话：{{detail.pingjian.pingjian_mobile}} </p>
          <p> 本平台会员折扣优惠：{{detail.pingjian.pingjian_sales}}折 </p>
          <p> 联系人：{{detail.pingjian.pingjian_lianxiren}} </p>
          <p> 地址：{{detail.pingjian.pingjian_address}} </p>
        </div>
        <h2 class="title-s" @click="showIt3(5)">
          <span>项目大事记</span>
          <span>
              <img v-if="!showList3[5]" src="/static/images/h2close.png">
              <img v-if="showList3[5]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.dsj" v-show="showList3[5]">
          <p>
            {{detail.dsj.dsj_content}}
          </p>
        </div>
        <h2 class="title-s" @click="showIt3(6)">
          <span>相关视频</span>
          <span>
              <img v-if="!showList3[6]" src="/static/images/h2close.png">
              <img v-if="showList3[6]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.video" v-show="showList3[6]">
          <div v-for="(vitem,index) in detail.video" :key="index">
            <p>{{vitem.video_title}}:</p>
            <video :src="vitem.video_href" controls></video>
          </div>
        </div>
      </div>
    </div>
    <div class="details">
      <h1 class="title" @click="showIt(3)">
        <span>合伙需求 </span>
        <span>
          <img v-if="!showList[3]" src="/static/images/h1close.png">
          <img v-if="showList[3]" src="/static/images/h1open.png">
        </span>
      </h1>
      <div v-show="showList[3]">
        <div v-if="detail&&detail.guquanshezhi">
          <h2 class="title-s" @click="showIt2(0)">
            <span>股权设置</span>
            <span>
              <img v-if="!showList2[0]" src="/static/images/h2close.png">
              <img v-if="showList2[0]" src="/static/images/h2open.png">
            </span>
          </h2>
          <div class="details-text" v-show="showList2[0]">
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
        </div>
        <h2 class="title-s" @click="showIt2(1)" v-if="detail&&detail.zijinyongtu">
          <span>资金用途</span>
          <span>
              <img v-if="!showList2[1]" src="/static/images/h2close.png">
              <img v-if="showList2[1]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.zijinyongtu" v-show="showList2[1]">
          <p> 是否加盟：{{detail.zijinyongtu.zjyt_jiameng}} </p>
          <p> 加盟费：{{detail.zijinyongtu.zjyt_jiameng_money}}元 </p>
          <p> 预付租金费用：{{detail.zijinyongtu.zjyt_yufuzujin}}元/季 </p>
          <p> 开业前的员工储备培训开支：{{detail.zijinyongtu.zjyt_peixunfei_allmoney}}元 </p>
          <p> 共计：{{detail.zijinyongtu.zjyt_gongzi_mouth}}月 </p>
          <p> 开业后员工开支：{{detail.zijinyongtu.zjyt_zhuangxiu}}元 </p>
          <p> 装修费用：{{detail.zijinyongtu.zjyt_zhuangxiu}}元 </p>
        </div>
        <h2 class="title-s" @click="showIt2(2)" v-if="detail&&detail.yunyingguankong">
          <span>运营管控</span>
          <span>
              <img v-if="!showList2[2]" src="/static/images/h2close.png">
              <img v-if="showList2[2]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.yunyingguankong" v-show="showList2[2]">
          <p> 合伙成功后开店时间不可超过：{{detail.yunyingguankong.yygk_kaidianshijian}}天 </p>
          <p> 毛利率不得低于：{{detail.yunyingguankong.yygk_maolilv}}% </p>
          <p> 分红周期：{{detail.yunyingguankong.yygk_fenhongshijian}}天/次 </p>
          <p> 股东管理办法及要求：{{detail.yunyingguankong.yygk_gudongguanli}} </p>
          <p> 资金监管：{{detail.yunyingguankong.yygk_zijinjianguan}} </p>
          <p class="show-text"> 为保障项目方与合伙人共同的权益，项目方郑重承诺：如项目方未履行以上运营管控方案，由此造成的一切损失，由项目方全部承担。 </p>
        </div>
        <h2 class="title-s" @click="showIt2(3)">
          <span>退出机制</span>
          <span>
              <img v-if="!showList2[3]" src="/static/images/h2close.png">
              <img v-if="showList2[3]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-if="detail&&detail.xiangmu_tuichu_one" v-show="showList2[3]">
          <p> {{detail.xiangmu_tuichu_one}} </p>
        </div>
        <h2 class="title-s" @click="showIt2(4)" v-if="detail&&detail.tuichu_image&&detail.tuichu_image.length">
          <span>合伙协议摘要</span>
          <span>
              <img v-if="!showList2[4]" src="/static/images/h2close.png">
              <img v-if="showList2[4]" src="/static/images/h2open.png">
            </span>
        </h2>
        <div class="details-text" v-show="showList2[4]" v-if="detail&&detail.tuichu_image&&detail.tuichu_image.length">
          <p class="details-img">
            <img
              v-if="detail.tuichu_image.length"
              v-for="(item,index) in detail.tuichu_image"
              :src="item.tuichu_image ? beasUrl+item.team_icon : ''"
              :key="index">
          </p>
        </div>
      </div>
    </div>

    <div class="details">
      <h1 class="title" @click="showIt(4)">
        <span>合伙详情</span>
        <span>
          <img v-if="!showList[4]" src="/static/images/h1close.png">
          <img v-if="showList[4]" src="/static/images/h1open.png">
        </span>
      </h1>
      <div v-show="showList[4]">
        <div class="scroll-bar" v-if="detail&&detail.guquanshezhi">
          <p> 消费合伙单笔 {{detail.guquanshezhi.project_xfhh_danbi}} 元 | 股份占比(
            {{detail.guquanshezhi.project_xfhh_gufen}}%) </p>
          <p> 已合伙 {{hehuoLog.min_count}} 份 | 共计 {{detail.guquanshezhi.project_xfhh_count}} 份 </p>
          <ul class="clear_left_float">
            <li> 完成度：</li>
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
          <p> 股本合伙单笔 {{detail.guquanshezhi.project_gbhh_danbi}} 元 | 股份占比(
            {{detail.guquanshezhi.project_gbhh_gufen}}%) </p>
          <p> 已合伙 {{hehuoLog.other_count}} 份 | 共计 {{detail.guquanshezhi.project_gbhh_count}} 份 </p>
          <ul class="clear_left_float">
            <li> 完成度：</li>
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
          <p> 领头合伙单笔 {{detail.guquanshezhi.project_lthh_danbi}} 元 | 股份占比(
            {{detail.guquanshezhi.project_lthh_gufen}}%) </p>
          <p> 已合伙 {{hehuoLog.max_count}} 份 | 共计 {{detail.guquanshezhi.project_lthh_count}} 份 </p>
          <ul class="clear_left_float">
            <li> 完成度：</li>
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
  import {getProjectDetail,focuseProject,objOpeByLt,objOpeByOt,sendProjectSms} from '@/apis/index'
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
        showList: [1, 0, 0, 0, 0],
        showList2: [0, 0, 0, 0],
        showList3: [0,0,0,0,0,0,0],
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
        },this.token).then(res=>{
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
//      查看地址
      checkAddress(){

      },
      showIt3(i){
        if(i == 0 && !this.detail.shop.length) {
          this.remindMessaage('现有店铺概况', 7)
          return false
        }
        if(i == 1 && !this.detail.xiangmu_scdy) {
          this.remindMessaage('市场调研', 7)
          return false
        }
        if(i == 2 && !this.detail.xiangmu_jzys) {
          this.remindMessaage('竞争优势', 7)
          return false
        }
        if(i == 3 && !this.detail.xiangmu_syms) {
          this.remindMessaage('商业模式', 7)
          return false
        }
        if(i == 4 && !this.detail.pingjian) {
          this.remindMessaage('项目品鉴', 7)
          return false
        }
        if(i == 5 && !this.detail.dsj) {
          this.remindMessaage('项目大事记', 7)
          return false
        }
        if(i == 6 && !this.detail.video) {
          this.remindMessaage('相关视频', 7)
          return false
        }
        this.showList3.splice(i,1,!this.showList3[i])
      },
      showIt2(i){
        if(i == 0 && !this.detail.guquanshezhi) {
          this.remindMessaage('股权设置', 8)
          return false
        }
        if(i == 1 && !this.detail.zijinyongtu) {
          this.remindMessaage('资金用途', 8)
          return false
        }
        if(i == 2 && !this.detail.yunyingguankong) {
          this.remindMessaage('运营管控', 8)
          return false
        }
        if(i == 3 && !this.detail.xiangmu_tuichu_one) {
          this.remindMessaage('退出机制', 8)
          return false
        }
        this.showList2.splice(i,1,!this.showList2[i])
      },
      showIt(i) {
        let grade = this.userInfo.grade
        if(grade > 1) {
          if(i == 4 && !this.detail.guquanshezhi) {
            this.remindMessaage('合伙详情', 8)
            return false
          }
          if(i == 3 && !this.detail.guquanshezhi) {
            this.remindMessaage('合伙需求', 8)
            return false
          }
          if(i == 2 && !this.detail.shop) {
            this.remindMessaage('详细信息', 7)
            return false
          }
          if(i == 1 && !this.detail.team_description) {
            this.remindMessaage('团队介绍', 6)
            return false
          }

          this.showList.splice(i,1,!this.showList[i])
        } else {
          if(i < 2) {
            this.showList.splice(i,1,!this.showList[i])
          } else {
            wx.showModal({
              title: '提示',
              content: '您当前合伙人等级是一般合伙人，无法查看此板块内容，是否去升级合伙人等级？',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/projectModification/main'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      },
      remindMessaage(message, reqtype){
        let self = this;
        wx.showModal({
          title: '提示',
          content: `当前项目还未发布相关${message}，是否立即邀请项目方尽早发布？`,
          success: function(res) {
            if (res.confirm) {
              self.send_projectsms(reqtype)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      send_projectsms(reqtype) {
        sendProjectSms({
          token:this.token,
          separate:1,
          xiangmuid:this.detail.id,
          reeqtype:reqtype
        }).then(res=>{
          let msg = res.msg?res.msg:res.data;
            wx.showModal({
              title: '提示',
              content: msg,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/user/main'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
        })
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
      ...mapGetters(['token','baseUrl','userInfo']),
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

<style scoped  lang='less'>
  .inner {
    background-color: #f6f6f6;
  }
  .con {
    background: #fff;
    margin-bottom: .2rem;
  }
  .describe {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 0.01rem solid #f5f5f5;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .2rem;
      height: .8rem;
      color: #ff7803;
      font-size: 0.34rem;
      padding-left: .3rem;
      text-align: center;
      image{
        width: 36rpx;
        height: 24rpx;
      }
    }
  }
  .describe .describe-content{
    padding: 0 .3rem .3rem;
    p{
      font-size: 0.28rem;
      padding-bottom: 0.44rem;
    }
  }

  .address {
    padding: 0.1rem 0;
    font-size: 0.2rem;
    background-color: #fff;
    border-top: .02rem solid #f5f5f5;
    padding-top:.4rem
  }
  .address li {
    width: 25%;
    text-align: center;
  }
  .address li span{
  }
  .address li:nth-child(1),
  .address li:nth-child(2),
  .address li:nth-child(3) {
    border-right: 0.01rem solid #f5f5f5;
    box-sizing: border-box;
  }
  .address li img {
    width: 0.3rem;
    height: 0.4rem;
    vertical-align: middle;
    position: relative;
    top: -0.02rem;
    display: block;
    margin: 0 auto .2rem;
  }
  .address li:nth-child(2) img,
  .address li:nth-child(4) img{
    width: 0.42rem;
  }

  .team {
    margin-top: 0.2rem;
    margin-bottom: .2rem;
    background-color: #fff;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .2rem;
      height: .8rem;
      color: #ff7803;
      font-size: 0.34rem;
      padding-left: .3rem;
      text-align: center;
      image{
    width: 36rpx;
    height: 24rpx;
  }
    }
    .content{
        .dec{
          font-size: 0.28rem;
          padding-bottom: 0.22rem;
          padding-left: 0.32rem;
        }
        ul {
          li {
            height: 1.4rem;
            border-bottom: 0.01rem solid #f5f5f5;
            padding: 0px 0.3rem;
            font-size: 0.28rem;
            display:flex;
            align-items: center;
            justify-content: space-between;
            span{
              flex: 1;
            }
            .head{
              overflow: hidden;
              width: .9rem;
              height: .9rem;
              border-radius: .45rem;
              margin-left: .2rem;
              background: #000;
              image{
                width: 100%;
                height: 100%;
              }
            }
            .info{
              height: 100%;
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
            }
          }
        }

    }
  }

.details {
  margin-top: 0.2rem;
  background-color: #fff;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    height: .8rem;
    color: #ff7803;
    font-size: 0.34rem;
    padding-left: .3rem;
    text-align: center;
    image{
      width: 36rpx;
      height: 24rpx;
    }
  }
}

.title-s{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: .8rem;
  font-size: 0.34rem;
  padding: 0 .2rem;
  padding-left: .3rem;
  text-align: center;
  image{
    width: 36rpx;
    height: 24rpx;
  }
}
.details-text {
  padding: .04rem 0.3rem;
  border-bottom: 0.01rem solid #f5f5f5;
  p {
    font-size: 0.26rem;
    line-height: .36rem;
    padding: .02rem;
    display:flex;
    justify-content: space-between;
    span{
      flex: 1;
      width: 50%;
    }
  }
  .tip{
    position: relative;
    padding-bottom:.2rem;
    span{
      position: absolute;
      bottom: 0;
      left: 0;
      height: .1rem;
      width: 1rem;
      background: #ff7803;
    }
  }
  .show-text {
    color: #154ff5;
    margin-top: 0.32rem;
  }
  .details-img {
    width: 100%;
  }
}

.scroll-bar {
  background-color: #fff;
  margin-top: .2rem;
  padding: .3rem;
  p {
    font-size: 0.26rem;
    color: rgba(51, 51, 51, 1);
    line-height: 0.36rem;
  }
ul {
  li {
    font-size: 0.26rem;
  }
  li:nth-child(1),
  li:nth-child(3) {
    width: 17%;
  }
  li:nth-child(3) {
    text-align: right;
  }
  li:nth-child(2) {
    width: 66%;
    .scroll-box {
      width: 100%;
      height: 0.26rem;
      border-radius: 0.1rem;
      box-shadow: -0.05rem -0.05rem 0.1rem #e8e8e8 inset; /* For Latest Opera */
      overflow: hidden;
      position: relative;
      top: 0.08rem;
      span {
        color: transparent;
        width: 0%;
        height: 0.26rem;
        background-color: rgba(255, 120, 3, 1);
        display: block;
        border-radius: 10px;
      }
    }
  }
}
.woxiang {
  color: #cbcbcb;
  font-size: 0.26rem;
  border-bottom: 0.01rem solid rgba(245, 245, 245, 1);
}
.bottom-list {
  padding: 0.26rem 0rem 0rem 0rem;
  li {
      width: 25% !important;
      text-align: center;
      line-height: 0.24rem;
      border-right: 1px solid #f5f5f5;
      box-sizing: border-box;
      a {
        display: block;
        text-align: center;
      }
      img {
        width: 0.3rem;
        height: 0.3rem;
        position: relative;
        top: -0.02rem;
      }
    }
    li:nth-child(4) {
      border: 0;
    }
  }
}
.class-info {
  width: 90%;
}
._swiper {
  margin-top: 0.2rem;
}
._swiper .class-info ._image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 90%;
  height: 70%;
  z-index: -1;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.slide-image {
  width: 100%;
}
.swiper-container {
  margin-top: 0.2rem;
  padding-bottom: 0.8rem;
}
video {
  width: 100%;
}
.project-card {
  position: relative;
  box-sizing: border-box;
  margin: 0rem auto;
/*width: 90%;*/
  width: 96%;
  padding: 0.4rem;
  background: #fff;
  border-radius: 0.2rem;
  overflow: hidden;
}

.project-card.gray {
  background: #f6f6f6;
}

.img {
  width: 100%;
  height: 3.6rem;
  position: relative;
  z-index: 1;
}

.img > img {
  width: 100%;
  height: 3.6rem;
  border-radius: 0.2rem;
}

.heat-img {
  position: absolute;
  background: #eee;
  width: 0.87rem;
  height: 0.87rem;
  border-radius: 50%;
  right: 0.48rem;
  bottom: -0.43rem;
}

.heat-img.gray {
  background: #f6f6f6;
}

.heat-img img {
  width: 0.43rem;
  height: 0.38rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.collect {
  position: absolute;
  top: -0.05rem;
  right: 0.5rem;
  width: 0.7rem;
  height: 0.7rem;
  box-shadow: 0 0 0.1rem #eee;
  background: #fff;
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
  z-index: 2;
  font-size: 0.24rem;
  color: #f00;
  text-align: center;
}

.collect span {
  line-height: 0.6rem;
}

.collect img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 0.56rem;
  height: 0.56rem;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.info {
  max-width: 4.5rem;
  padding-left: 0.2rem;
  box-sizing: border-box;
}

.info p:last-child {
  max-height: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.name {
  display: flex;
  max-width: 4.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin: 0.2rem 0 0.16rem;
}

.name span {
  display: inline-block;
}

.name span:first-child {
  font-size: 0.32rem;
  color: #333;
  font-weight: 600;
  display: inline-block;
  width: 4.5rem;
}

.name span:nth-child(3),
.name span:nth-child(2) {
  font-size: 0.22rem;
  border: solid 0.02rem;
  line-height: 1;
  padding: 0.05rem 0.22rem;
  border-radius: 0.08rem;
  margin: .1rem 0;
}

.name span:nth-child(2) {
  margin-right: 0.2rem;
}

.slogan,
.type {
  font-size: 0.28rem;
  color: #999;
  margin-top: 0.12rem;
}

.type {
  font-size: 0.24rem;
}

.heat {
  font-size: 0.28rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: baseline;
}

.heat span:last-child {
  font-weight: normal;
  color: #3a6ebd;
  font-size: 0.54rem;
}

.heat span:last-child.hot {
  color: #3fabff;
}

.address {
  font-size: 0.18rem;
  color: #999;
}
.con {
  background-color: initial;
  padding-top: 0.2rem;
}
.mark {
  position: relative;
  right: 0.2rem;
}
.heat-img {
  position: absolute;
  background: #fff;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  bottom: -0.76rem;
}

.heat-img.gray {
  background: #f6f6f6;
}

.heat-img img {
  width: 0.86rem;
  height: 0.76rem !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.name .remenlei {
  border-color: #f5db47;
  color: #f5db47;
}
.name .yurelei {
  border-color: #3adb99;
  color: #3adb99;
}
.name .luyanlei {
  border-color: #ff7803;
  color: #ff7803;
}

.name .red {

  border-color: #f00;
  color: #f00;
}
.name .zhanshilei {
  border-color: #3a6edb;
  color: #3a6edb;
}

.mock {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  ul {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3D(-50%, -50%, 0);
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.2rem;
    width: 100%;
    .header {
      display: flex;
      font-size: 0.3rem;
      font-weight: bold;
    // justify-content: space-around;
      span {
        display: inline-block;
        text-align: center;
      }
      span:first-child {
        width: 2rem;
      }
      span:last-child {
        flex-grow: 1;
      }
    }
    li {
      min-height: 0.5rem;
      font-size: 0.24rem;
      line-height: 0.36rem;
      padding: 0.07rem 0;
      display: flex;
      span {
        text-align: center;
      }
      .area {
        display: inline-block;
        width: 2rem;
      }
      .jiedao {
        display: inline-block;
        text-align: left;
        word-break: break-all;
        max-width: 4.5rem;
      }
    }
  }
}

.h2 {
  font-size: .3rem;
  color: #333;
  padding: .3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
img {
  width: .36rem;
  height: .2rem;
}
}

.where_is {
  border-top: solid .02rem #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 .3rem;
  font-size: 0;
  a {
    flex: 3rem;
    text-align: center;
    color: #333;
    display: flex;
    align-items: center;
    padding:.3rem 0;
    justify-content: center;
    img {
      width: .22rem;
      height: .29rem;
      margin-right: .1rem;
    }
    span {
      font-size: .24rem;
    }
  }
}
.img{
  background-size: cover;
  background-position: center;
  border-radius:.3rem;
}
</style>



