import {loginIn, loginOut, updateInfo} from '@/apis/login'

const user = {
  state: {
    isLogin: false,// 登录标识
    token: "",//token
    userInfo: null,// 用户信息
  },
  mutations: {
    //登出
    LOGOUT: state => {
      // 修改state登录状态
      state.isLogin = false;
      state.token = "";
      state.userInfo = null;
      /*删除本地token*/
      wx.removeStorage({key: 'token'});
      /*删除本地userInfo*/
      wx.removeStorage({key: 'userInfo'})
    },
    //设置token
    SET_TOKEN: (state, token) => {
      state.token = token;
      wx.setStorage({
        key:"token",
        data:token
      });
      state.isLogin = true
    },
    // 登录
    LOGIN: (state) => {
      state.isLogin = true
    },
    // 设置用户信息
    SET_USERINFO: (state, userinfo) => {
      // vuex 存一份
      state.userInfo = userinfo;
      // storge 存一份
      wx.setStorage({
        key:"userInfo",
        data:userinfo
      });
    },
    // 更新用户信息
    UPDATE_USERINFO: (state) => {
      //存储
      wx.getStorage({
        key:'token',
        success:function (res) {
         if(!!res.data) {
           state.isLogin = true;
           state.token = res.data;
           wx.getStorage({
             key:'userInfo',
             success:function (response) {
               state.userInfo = response.data;
             }
           })
         }
        }
      })
    }
  },
  actions: {
    logout: ({commit}) => {
      commit('LOGOUT')
      wx.navigateTo({
        url: '/pages/login/main'
      })
    },
    Login({commit}, params) {
      return new Promise((resolve, reject) => {
        loginIn(params).then(response => {
          if (response.status == 1) {
            // 当登陆成功后
            const data = response.data;
            commit('SET_TOKEN',data.token);
            updateInfo(data.token).then(res=>{
              commit('SET_USERINFO', res.data.rosData)
            });
            resolve(response.msg)
          }else{
            reject(response.msg)
          }

        }).catch(error => {
          reject('请输入正确的用户名和密码')
        })
      })
    },
    SetUserinfo({commit}, userInfo) {
      commit('SET_USERINFO', userInfo)
    },
    UpdateInfo({commit}) {
      commit('UPDATE_USERINFO')
    }
  }
}

export default user

