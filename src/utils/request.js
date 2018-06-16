// 使用微信request
const uri = 'http://api.schehuoren.com';
const service = ({url,method,data}) =>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:uri+url, //仅为示例，并非真实的接口地址
      data,
      method,
      header: {'content-type': 'application/json'},
      success: function(response) {
        const res = response.data;
        if(response.statusCode !== 200) { // 请求失败
          console.log('请求失败');
          return Promise.reject('error')
        }
        if(res.msg && res.msg.includes('登录')) {
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }
        // 非法token|其他客户端登录|token过期
        if(response.statusCode === 50008 || response.statusCode === 50012 || response.statusCode === 50014) {
          console.log('你已登出，可以取消继续留在该页面或者重新登录')
          return Promise.reject('error')
        } else {
          resolve(res);
        }
      },
      fail:function (error) {
        return Promise.reject(error)
      }
    })
  })
}

export default service