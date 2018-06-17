
import { login, logout_api, updateInfo, remove_local_data } from '@/apis/login'
import { getToken, setToken, removeToken } from '@/utils/auth'//这里要改
import router from './../../router/index'
import Cookies from 'js-cookie'//cookie要改

const user = {
  state: {
    isLogin: Cookies.get('login') ? true : false,
    token: getToken(),
    userInfo: localStorage.getItem('hehuoren_userinfo') ? JSON.parse(localStorage.getItem('hehuoren_userinfo')) : {},
    showRouter:'',
    modifyProjectId: null,
    current_grade: null
  },
  mutations: {
    SET_PROJECT_ID: (state, id) => {
      state.modifyProjectId = id
    },
    TOGGLE_LOGIN: state => {
      let _isLogin = state.isLogin
      state.isLogin = !_isLogin
    },
    LOGOUT: state => {
      // 修改state登录状态
      state.isLogin = false
      // 清除cookie保存的登录状态
      Cookies.remove('login')
      Cookies.remove('hehuorenINFO')
      // 清除cookie保存的token
      removeToken()
      // 清除localstoage保存的合伙人信息
      localStorage.removeItem('hehuore_userinfo')
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      state.isLogin = true
    },
    SET_USERID: (state, userid) => {
      state.showTouter = userid
    },
    LOGIN: (state) => {
      state.isLogin = true
    },
    SET_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
      //   router.push({path: '/'})
      wx.navigateTo({
        url: '/pages/index/main'
      })

      localStorage.setItem('hehuoren_userinfo', JSON.stringify(userinfo))
    },
    UPDATE_USERINFO: (state, userinfo) => {
      state.userInfo = userinfo
      localStorage.setItem('hehuoren_userinfo', JSON.stringify(userinfo))
    },
    SHOW_ROUTER:(state, showRouter)=>{
      state.isLogin = showRouter
    },
    SET_GRADE:(state, grade) => {
      state.current_grade = grade
    }
  },
  actions: {
    toggleLogin: ({ commit }) => {
      commit('TOGGLE_LOGIN')
    },
    logout: ({ commit }) => {
      logout_api().then(() => {
        commit('LOGOUT')
        wx.navigateTo({
          url: '/pages/login/main'
        })
      })
      remove_local_data('hehuoren_form_1')
    },
    Login({ commit }, userInfo) {
      const tel = userInfo.tel.trim()
      const separate = 1
      return new Promise((resolve, reject) => {
        login(tel, userInfo.psw, separate).then(response => {
          if(response.status == 1) {
            // 当登陆成功后
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            Cookies.set('login', true)
            Cookies.set('hehuorenINFO', userInfo)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Sign({ commit }, userInfo) {
      console.log('sign in')
    },
    SetUserinfo({commit}, userInfo) {
      commit('SET_USERINFO', userInfo)
    },
    UpdateInfo({commit}, userinfo) {
      commit('UPDATE_USERINFO', userinfo)
    },
    setProjectID({commit}, id) {
      commit('SET_PROJECT_ID', id)
    },
    setGrade({commit}, grade) {
      commit('SET_GRADE', grade)
    }
  }
}

export default user

