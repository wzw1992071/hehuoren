import service from '@/utils/request';

/**
 * 获取首页数据
 * @param data
 */
export function homeLoad(data) {
  return service({
    url:'/',
    data,
    method:'POST'
  });
}

/**
 * 获取消息
 * @param data
 */
export function myMassage(data) {
  return service({
    url:'/member/member_my_msg',
    data,
    method:'POST'
  });
}

/**
 * 获取项目集锦
 * @param data
 */
export function getProjects(data,token) {
  return service({
    url:`/xiangmu?token=${token}`,
    data,
    method:'POST'
  });
}
/**
 *
 * @param data
 * @param token
 */
export function getProjectDetail(data,token){
  return service({
    url:`/xiangmu/show_info?token=${token}`,
    data,
    method:'GET'
  });
}