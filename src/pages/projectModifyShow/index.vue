<template>
    <div class="container">
      <user-header></user-header>
      <modify-header :text="headerInfo"></modify-header>
      <div class="block">
        <single-img :info="proLogo" @geturl="geturl"></single-img>
        <inputs @change="getVal" :info="proName"></inputs>
        <inputs @change="getVal" :info="proOrigin"></inputs>
        <inputs @change="getVal" :info="proShortintro"></inputs>
        <modify-textarea :info="proIntro" @handleEvent="getVal"></modify-textarea>
      </div>
      <div class="block">
        <inputs @change="getVal" :info="proIndustry"></inputs>
        <inputs @change="getVal" :info="proField"></inputs>
        <inputs @change="getVal" :info="proStage"></inputs>
      </div>
      <div class="block">
        <div @click="toggleInputs(0)">
          <inputs @change="getVal" :info="proAddress1"></inputs>
        </div>
        <div class="street">
          <inputs @change="getVal" :info="proDetail1" v-if="inputShow[0]" :key='0' @keyup="getStreet(arguments, 0)"></inputs>
          <ul v-if="street1.length">
            <li v-for="(item, i) in street1" :key="i" @click="setSteet(item, 0)">
              {{item?item.name:null}}
            </li>
          </ul>
        </div>
        <div @click="toggleInputs(1)">
          <inputs @change="getVal" :info="proAddress2"></inputs>
        </div>
        <div class="street">
          <inputs @change="getVal" :info="proDetail2" v-if="inputShow[1]" :key="1" @keyup="getStreet(arguments, 1)"></inputs>
          <ul v-if="street2.length">
            <li v-for="(item, i) in street2" :key="i" @click="setSteet(item, 1)">
              {{item?item.name:null}}
            </li>
          </ul>
        </div>
        <div @click="toggleInputs(2)">
          <inputs @change="getVal" :info="proAddress3"></inputs>

        </div>
        <div class="street">
          <inputs @change="getVal" :info="proDetail3" v-if="inputShow[2]" :key="2" @keyup="getStreet(arguments, 2)"></inputs>
          <ul v-if="street3.length">
            <li v-for="(item, i) in street3" :key="i" @click="setSteet(item, 2)">
              {{item?item.name:null}}
            </li>
          </ul>

        </div>
        <div @click="toggleInputs(3)">
          <inputs @change="getVal" :info="proAddress4"></inputs>
        </div>
        <div class="street">
          <inputs @change="getVal" :info="proDetail4" v-if="inputShow[3]" :key="3" @keyup="getStreet(arguments, 3)"></inputs>
          <ul v-if="street4.length">
            <li v-for="(item, i) in street4" :key="i" @click="setSteet(item, 3)">
              {{item?item.name:null}}
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <modify-input :info="projectSave" @handleEvent="Save(1)"></modify-input>
        <modify-input :info="projectContinue" @handleEvent="Save(2)"></modify-input>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import userHeader from '@/components/userHeader'
import modifyHeader from '@/components/modifyHeader'
import modifyInput from '@/components/modifyInput'
import modifyTextarea from '@/components/modifyTextarea'
import singleImg from '@/components/singleImg'
import inputs from '@/components/inputs'
import {getProjectInfo, getHYDetails} from '@/apis/project'
import {mapGetters} from 'vuex'

export default {
  data: function() {
    return {
      // 保存所需数据
      step: 1, // ?展示类固定传1
      title: "", // 项目名称
      area: [], // 城市area
      projectfrom: "", // 品牌来源
      yijuhua: "", // 一句话介绍
      description: "", // 项目介绍
      xiangmu_hy: null, //int hangye的ID
      xiangmu_hy_detail: null, //int 细分领域 ID
      jieduan: null, // int jieduan ID
      shop_area: [], // Array<String> area中的name
      shop_jiedao: [], // 街道
      projectid: null,
      logo: "",
      areas: [],
      street1: [],
      street2: [],
      street3: [],
      street4: [],

      baiduKey: this.$store.getters.baiduKey,

      hangye: [],

      inputShow: [1, 0, 0, 0],
      headerInfo: {
        title: "完善展示类项目信息",
        intro: "",
        other: "介绍您的项目，一分钟让合伙人知道您在做什么"
      },
      proLogo: {
        title: "*上传项目logo",
        tip: "项目logo而非公司logo。支持JPG、PNG格式，文件不大于5MB。",
        handler: "logo",
        img: ""
      },
      proName: {
        type: 1,
        title: "*项目名称",
        text: "名称名称",
        tip: "尽量不要使用公司名称。建议使用项目或品牌名称。最多16字。",
        handler: "title"
      },
      proOrigin: {
        type: 3,
        title: "*品牌来源",
        text: "",
        options: ["自主品牌", "连锁加盟"],
        optionsTitle: "品牌来源",
        handler: "projectfrom"
      },
      proShortintro: {
        type: 1,
        title: "*一句话介绍自己",
        text: "",
        tip: '推荐两种简单的描述方法(最多25字)：1.类比法：举出模式类似的知名项目。如"顺旺基"-中国的麦当劳。2.差别法：说明目标人群和其需求。如"常乐足道"-亚健康人群的调理专家.',
        handler: "yijuhua"
      },
      proIntro: {
        title: "*项目介绍",
        default: `简单介绍项目概况。针对的目标客户群。让合伙人快速了解你的项目优势。`,
        tip: `简单介绍项目概况。针对的目标客户群。让合伙人快速了解你的项目优势。`,
        handler: "description"
      },
      proIndustry: {
        type: 3,
        title: "*所属行业",
        options: ["餐饮美食", "娱乐休闲", "美容健身"],
        optionsTitle: "所属行业",
        handler: "xiangmu_hy",
        text: ""
      },
      proField: {
        type: 3,
        title: "*细分领域",
        options: [],
        optionsTitle: "餐饮美食",
        handler: "xiangmu_hy_detail",
        text: "首次创建此处为空",
      },
      proStage: {
        type: 3,
        title: "*所属阶段",
        options: [
          { id: 1, typename: "首次开业" },
          { id: 2, typename: "开设分店" },
          { id: 3, typename: "老店重组" }
        ],
        optionsTitle: "所属阶段",
        handler: "jieduan",
        text:""
      },
      proAddress1: {
        type: 3,
        title: "*预期开店地址1",
        options: [],
        text: "",
        optionsTitle: "区域选择",
        handler: "shop_area.0"
      },
      proDetail1: {
        type: 1,
        base: "proDetail1",
        title: "*请输入街道",
        text: "XX市XX区XX号",
        handler: "shop_jiedao.0",
        tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
      },
      proAddress2: {
        type: 3,
        title: "预期开店地址2",
        options: [],
        text: "",
        optionsTitle: "区域选择",
        handler: "shop_area.1"
      },
      proDetail2: {
        type: 1,
        title: "请输入街道",
        text: "XX市XX区XX号",
        base: "proDetail2",
        handler: "shop_jiedao.1",
        tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
      },
      proAddress3: {
        type: 3,
        title: "预期开店地址3",
        text: "",
        options: [],
        optionsTitle: "区域选择",
        handler: "shop_area.2"
      },
      proDetail3: {
        type: 1,
        title: "请输入街道",
        text: "XX市XX区XX号",
        base: "proDetail3",
        handler: "shop_jiedao.2",
        tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
      },
      proAddress4: {
        type: 3,
        title: "预期开店地址4",
        options: [],
        optionsTitle: "区域选择",
        handler: "shop_area.3"
      },
      proDetail4: {
        type: 1,
        base: "proDetail4",
        title: "请输入街道",
        text: "XX市XX区XX号",
        handler: "shop_jiedao.3",
        tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
      },
      projectSave: {
        text: "保存并申请成为展示类项目",
        type: "yellow-block"
      },
      projectContinue: {
        text: "+ 继续完善资料提升项目等级",
        type: "blue-block"
      }
    };
  },
  components: {
    userHeader,
    modifyHeader,
    modifyInput,
    modifyTextarea,
    singleImg,
    inputs
  },
  methods: {
    Save: function(type) {
      let _data = {};
      _data.logo = this.logo;
      _data.title = this.title;
      this.area = [];
      for (let i = 0; i < this.areas.length; i++) {
        if (this.shop_area.includes(this.areas[i].name)) {
          this.area.push(this.areas[i].area);
        }
      }
      _data.area = this.area.splice(0, 4).join(",")+',';
      _data.projectfrom = this.projectfrom;
      _data.yijuhua = this.yijuhua;
      _data.description = this.description;
      _data.xiangmu_hy = this.xiangmu_hy ? this.xiangmu_hy : "";
      _data.xiangmu_hy_detail = this.xiangmu_hy_detail
        ? this.xiangmu_hy_detail
        : "";
      _data.jieduan = this.jieduan ? this.jieduan : "首次开店";
      if (this.shop_area != []) {
        _data.shop_area = "*####*" + this.shop_area.join("*####*");
      } else {
        Toast({
          message: "请选择预期开业地址",
          duration: 1000
        });
        return false;
      }
      if (this.shop_jiedao != []) {
        let arr = this.shop_jiedao
        _data.shop_jiedao = '*####*'
        for(var i = 0; i < arr.length; i++) {
          if(typeof arr[i] == 'string') {
            _data.shop_jiedao += arr[i] + '*####*'
          } else {
            _data.shop_jiedao += arr[i].name + '*####*'
          }
        }
      } else {
        Toast({
          message: "请输入街道",
          duration: 1000
        });
        return false;
      }
      _data.step = 1;
      let _string = JSON.stringify(_data);
      this.requestSave(_string).then(res => {
        if (res.status == 1) {
          Toast({
            message: res.msg,
            duration: 1000
          });
          if (res.projectid) {
            this.projectid = res.projectid;
          }
          localStorage.removeItem("hehuoren_project_1");
          let _projectid = this.projectid;
          let token = this.$store.getters.token;
          getProjectInfo(1, token, _projectid).then(res => {
            if (res && res.step == 1) {
              localStorage.setItem(
                `hehuoren_project_1`,
                JSON.stringify(res.data)
              );
              this.init();
            }
          });
          getProjectInfo(2, token, _projectid).then(res => {
            if (res && res.step == 2) {
              localStorage.setItem(
                "hehuoren_project_2",
                JSON.stringify(res.data)
              );
              type == 2 &&
              this.$router.push({
                path: "/projectUpdatePreheating",
                query: { projectid: this.projectid }
              });
              type == 1 &&
              this.$router.push({
                path: "/over",
                query: { type: 2, grade: 1, projectid: this.projectid }
              });
            } else {
              Toast({
                message: res.msg ? res.msg : res.data,
                duration: 1000
              });
            }
          });
        } else {
          Toast({
            message: res.msg ? res.msg : res.data,
            duration: 1000
          });
        }
      });
    },
    geturl(file) {
      let key = file.handler;
      let val = file.val;
      if (val.status == 1) {
        this.$data[key] = val.new_url;
      } else {
        Toast({
          message: val.msg ? val.msg : val.data,
          duration: 1000
        });
      }
    },
    getVal: function(params) {
      let _val = params.val;
      let _key = params.handler;
      let _type = typeof _val;
      if (_type == "object") {
        if (_val.id) {
          _val = _val.id;
        } else if (_val.name) {
          _val = _val.name;
        }
      }
      let arr = _key.split(".");
      if (arr.length == 1) {
        this.$data[_key] = _val;
      } else if (arr.length == 2) {
        this.$data[arr[0]][arr[1]] = _val;
      }

      if (_key == "xiangmu_hy") {
        getHYDetails(_val).then(res => {
          let _obj = this.proField;
          this.proField = Object.assign({}, _obj, { options: res.data });
        });
      }
    },
    toggleInputs(i) {
      this.inputShow.fill(0);
      this.inputShow.splice(i, 1, 1);
    },
    requestSave(data) {
      let params = new URLSearchParams();
      let url;
      let token = this.$store.getters.token;
      url = `/project/project_conf`;
      params.append("token", token);
      params.append("separate", 1);
      params.append("data_json", data);
      this.projectid ? params.append("projectid", this.projectid) : null;
      return request({
        url: url,
        data: params,
        method: "POST"
      });
    },
    getStreet(args, i) {
      let val = args[0];
      let query = this.shop_area[i] + val.val;
      let k = `street${i + 1}`;
      delete this.$data[val.base].outval;
      if (val.val != "") {
        this.baiduStreet(query).then(res => {
          if (res.status == 0) {
            let data = res.result;
            this.$data[k] = data;
          }
        });
      } else {
        this.$data[k] = [];
      }
    },
    setSteet(item, i) {
      let key = `proDetail${i + 1}`;
      let k = `street${i + 1}`;
      this.$data[key].text = item.name;
      this.$data[key].outval = item.name;
      this.$data[key] = Object.assign({}, this.$data[key], {
        outval: item.name
      });
      this.shop_jiedao[i] = item;
      this.$data[k] = [];
    },
    baiduStreet(query) {
      // return Axios({
      //   url: `https://api.map.baidu.com/place/v2/suggestion?query=${query}&region=成都&city_limit=true&output=json&ak=${this.baiduKey}`,
      //   method: "get"
      // });
      return this.$jsonp(
        `https://api.map.baidu.com/place/v2/suggestion?query=${query}&region=成都&city_limit=true&output=json&ak=${
          this.baiduKey
          }`
      );
      // return fetch(`http://api.map.baidu.com/place/v2/suggestion?query=${query}&region=成都&city_limit=true&output=json&ak=${this.baiduKey}`)
    },
    init() {
      let self = this;
      let data;
      wx.getStorage({
        key:"hehuoren_project_1",
        success:function(res){
          if(!!res.data) {
            data = JSON.parse(res.data);
            self.projectDeal(data)
          }else{
            getProjectInfo({
              step: 1,
              token: '',
              separate: 1,
              projectid: self.projectid
            }).then(
              res => {
                data = res.data;
                self.projectDeal(data);
              }
            );
          }
        }
      });
    },
    projectDeal(data){
      if(!data) return
      let streets;
      let cities = Object.values(data.city);
      this.areas = cities;
      this.proAddress1.options = []
      this.proAddress2.options = []
      this.proAddress3.options = []
      this.proAddress4.options = []
      console.log(cities)
      for (let i = 0; i < cities.length; i++) {
        this.proAddress1.options.push(cities[i]);
        this.proAddress2.options.push(cities[i]);
        this.proAddress3.options.push(cities[i]);
        this.proAddress4.options.push(cities[i]);
      }
      let _hangye = data.hangye;
      this.hangye = [];
      this.hangye = this.hangye.concat(_hangye);
      this.proIndustry = Object.assign({}, this.proIndustry, {
        options: _hangye
      });

      let infos = data.xiangmuinfo;
      if (infos) {
        this.logo = infos.logo;
        this.proLogo.img = infos.logo;
        this.proName.text = this.title = infos.title;
        this.area = infos.area.split(",");
        this.shop_area = [];
        for (var i = 0; i < this.area.length; i++) {
          let addr = Object.values(this.areas).find( item => item.area == this.area[i]);
          if(addr){
            this.$data[`proAddress${i + 1}`] = Object.assign( {}, this.$data[`proAddress${i + 1}`], { text: addr.name });
            this.shop_area.push(addr.name);
          }
        }
        this.proIndustry.text = data.hangyeInfo.typename ? data.hangyeInfo.typename : null;
        this.proField.text = data.hangyedetailInfo.typename ? data.hangyedetailInfo.typename : this.proField.options[0];
        this.proShortintro.text = this.yijuhua = infos.yijuhua;
        this.proIntro.default = this.description = infos.description;
        this.projectfrom = this.proOrigin.text = infos.projectfrom;
        this.xiangmu_hy = infos.xiangmu_hy;
        this.xiangmu_hy_detail = infos.xiangmu_hy_detail;
        this.jieduan = infos.jieduan;
        this.proStage.text = this.proStage.options[infos.jieduan - 1].typename;
        this.shop_area = infos.shop_area ? infos.shop_area.split(",") : this.shop_area;
        this.shop_jiedao = infos.shop_jiedao ? infos.shop_jiedao : this.shop_jiedao;
        this.proOrigin.text = this.projectfrom = infos.projectfrom;
        if(infos.planshopcontent) {
          streets = Object.values(infos.planshopcontent)
          for(let i = 0; i < streets.length; i++) {
            this.shop_area.push(streets[i].shop_jiedao)
            let _street_key = "proDetail"
            _street_key = _street_key+(i+1)
            this.$data[_street_key].text = streets[i].shop_jiedao
            this.$data[_street_key].outval = streets[i].shop_jiedao
          }
        }
      }
      this.projectid = data.projectid ? data.projectid : null;
      data.hangyeInfo && data.hangyeInfo.id &&
      getHYDetails({
        separate:1,
        token:this.token,
        id:data.hangyeInfo.id
      }).then(res=>{
        if (res.status == 1) {
          for (let i = 0; i < res.data.length; i++) {
            this.proField.options.push(res.data[i]);
          }
        }
      })
    }
  },
  onLoad: function(option){
    let project = JSON.parse(option.info);
    this.projectid = project.id;
    this.init();
  },
  computed:{
    ...mapGetters(['token'])
  }
};
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
    .block {
        margin-top: 20rpx;
        background: #fff;
        padding: 30rpx 0;
        h2 {
            font-size: 30rpx;
            color: #ff7803;
            line-height: 1.5;
            text-align: center;
            font-weight: 600;
            margin-bottom: 20rpx;
        }
        > p{
            padding: 0 20rpx;
            text-align: center;
            font-size: 24rpx;
            color: #cdcdcd;
        }
        .street {
          position: relative;
          ul {
            position: absolute;
            background: #fff;
            right: 0;
            left: 2rem;
            top: 0.8rem;
            z-index: 10;
            box-shadow: 0 0 0.2rem #979797;
            padding: 0.2rem;
            li {
              font-size: 0.24rem;
              color: #555;
              min-height: 0.5rem;
              padding: .07rem 0;
              line-height: 0.36rem;
              border-bottom: solid 0.02rem #eee;
            }
            li:last-child {
              border-bottom: none;
            }
          }
        }
    }
    .footer {
        margin-top: 20rpx;
        padding: 30rpx;
        > p {
            padding: 0 20rpx;
            text-align: center;
            font-size: 24rpx;
            color: #cdcdcd;
        }
    }
}
</style>
