// 使用微信request
const service = ({url,method,data}) =>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url, //仅为示例，并非真实的接口地址
      data,
      method,
      header: {'content-type': 'application/json'},
      success: function(res) {
        resolve(res);
      },
      fail:function (error) {
        reject(error)
      }
    })
  })
}

export default service
