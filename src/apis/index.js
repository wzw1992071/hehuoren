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
 * 关注项目
 * @param data
 */
export function focuseProject(data) {
  return service({
    url:`/Member/guanzhu`,
    data,
    method:'POST'
  });
}
/**
 *
 * @param data
 * @param token
 * 获取项目详情
 */
export function getProjectDetail(data,token){
  return service({
    url:`/xiangmu/show_info?token=${token}`,
    data,
    method:'GET'
  });
}

/**
 * 项目操作：领头人
 * @param data
 *
 */
export function objOpeByLt(data){
  return service({
    url:`/xiangmu/touzi`,
    data,
    method:'GET'
  });
}
/**
 *
 * @param data
 */
export function objOpeByOt(data){
  return service({
    url:`/xiangmu/cancaltouzi`,
    data,
    method:'GET'
  });
}





















