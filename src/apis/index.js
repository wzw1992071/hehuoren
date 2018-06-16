import service from '@/utils/request';

export function homeLoad(data) {
  return service({
    url:'http://www.schehuoren.com',
    data,
    method:'POST'
  });
}
