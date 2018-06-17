import service from '@/utils/request';

export function loginIn(data) {
  return service({
    url:'/index.php?m=Mobile&c=member&a=login',
    data,
    method:'POST'
  })
}

export function updateInfo(token) {
  return service({
    url:'/member',
    method:'POST',
    data:{
      separate:1,
      token
    }
  })
}


export function loginOut(token) {
  return service({
    url:'/member/loginout',
    method:'POST',
    data:{
      separate:1,
      token
    }
  })
}
