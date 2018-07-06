import service from '@/utils/request';


/**
 * 新加项目数据
 * @param data
 */
export function projectAdd(data) {
  return service({
    url:'/project/add',
    data,
    method:'POST'
  });
}
