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
            state.isLogin = false
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