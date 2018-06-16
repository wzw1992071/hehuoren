import service from '@/utils/request';

export function homeLoad(data) {
  return service({
    url:'http://www.schehuoren.com',
    data,
    method:'POST'
  });
}

export function myMassage(data) {
  return service({
    url:'http://www.schehuoren.com/member/member_my_msg',
    data,
    method:'POST'
  });
}
