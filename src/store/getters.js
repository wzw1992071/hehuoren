const getters = {
    isLogin: state => state.user.isLogin,
    token: state => state.user.token,
    baseUrl:()=> 'http://api.schehuoren.com/',
}

export default getters
