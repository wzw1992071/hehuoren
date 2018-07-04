const getters = {
    isLogin: state => state.user.isLogin,
    token: state => state.user.token,
    userInfo:state => state.user.userInfo,
    baseUrl:()=> 'http://api.schehuoren.com/',
    msgNumber:state => state.user.msgNumber,
}

export default getters
