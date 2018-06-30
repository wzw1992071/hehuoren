import Vue from 'vue'
import App from './App'
import store from './store/index'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填
    // 首页：^pages/index/main, 开发可更改首页方便调试
    pages: [
      'pages/index/main', // 首页
      'pages/logs/main', // 日志
      'pages/partner/main', // 合伙人
      '^pages/login/main', // 登陆
      'pages/sign/main', // 注册
      'pages/user/main', // 个人中心
      'pages/advise/main', // 我要吐槽
      'pages/message/main', // 消息
      'pages/messageDetail/main', // 消息详情
      'pages/project/main', // 我的项目
      'pages/projectData/main', // 创建项目
      'pages/manual/main', // 手册
      'pages/projectdetails/main', // 项目详情
      'pages/projectModification/main',
      'pages/generalPartner/main', //一般合伙人
      'pages/certifiedPartner/main', //认证合伙人
      'pages/experiencePartner/main', //经验合伙人
      'pages/institutionalPartners/main', //机构合伙人
      'pages/projectShow/main', // 项目列表(优质项目)
      'pages/over/main', // 项目完成
      'pages/projectModifyMain/main', // 我的项目修改主页
      'pages/projectModifyShow/main', // 修改展示类
      'pages/projectUpdatePreheating/main', // 升级预演类
      'pages/projectUpdateHot/main', // 完善热门类
      'pages/projectUpdateRoadshow/main', // 完善路演类
      'pages/logs/main', // 日志
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '合火人',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#FF7803',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/images/iconHome.png',
        selectedIconPath: '/static/images/selectedIconHome.png'
      },{
        pagePath: 'pages/projectShow/main',
        text: '项目集锦',
        iconPath: '/static/images/iconProject.png',
        selectedIconPath: '/static/images/selectedIconProject.png'
      },{
        pagePath: 'pages/partner/main',
        text: '合火人风采',
        iconPath: '/static/images/iconPartner.png',
        selectedIconPath: '/static/images/selectedIconPartner.png'
      },{
        pagePath: 'pages/user/main',
        text: '我的',
        iconPath: '/static/images/iconUser.png',
        selectedIconPath: '/static/images/selectedIconUser.png'
      }]
    }
  }
}
