const user = {
    state: {
        isLogin: true
    },
    mutations: {
        TOGGLE_LOGIN: state => {
            let _isLogin = state.isLogin
            state.isLogin = !_isLogin
        },
        LOGOUT: state => {
            state.isLogin = false;
            wx.navigateTo({
              url: '/pages/login/main'
            })
        }
    },
    actions: {
        toggleLogin: ({commit}) => {
            commit('TOGGLE_LOGIN')
        },
        logout: ({commit}) => {
            commit('LOGOUT')
        }
    }
}

export default user
