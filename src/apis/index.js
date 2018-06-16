import service from '@/utils/request';

export function homeLoad(data) {
  return service({
    url:'/',
    data,
    method:'POST'
  });
}

export function myMassage(data) {
  return service({
    url:'/member/member_my_msg',
    data,
    method:'POST'
  });
}
