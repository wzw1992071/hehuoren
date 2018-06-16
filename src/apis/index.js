import service from '@/utils/request';

export function homeLoad(data) {
  return service({
    url:'http://www/baidu.com',
    data,
    method:'POST'
  });
}
