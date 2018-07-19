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

export function getProjectInfo(data) {
  return service({
    url:'/project/add',
    data,
    method:'POST'
  });
}

export function getHYDetails(data) {
  return service({
    url:'/Index/get_hangyedetaillist',
    data,
    method:'GET'
  });
}


