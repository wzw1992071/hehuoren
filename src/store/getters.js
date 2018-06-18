const getters = {
    isLogin: state => state.user.isLogin,
    token: state => state.user.token,
    userInfo:state => state.user.userInfo,
    baseUrl:()=> 'http://api.schehuoren.com/',
}

export default getters
