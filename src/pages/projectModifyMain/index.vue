<template>
    <div>
        <user-header></user-header>
        <modify-header :text="text"></modify-header>
        <!--<div v-for="(item, index) in lists" :key="index">-->
            <!--<modify-list :listItem="item" @eventHandler="getEvent(item.path)"></modify-list>-->
        <!--</div>-->
      <modify-list :listItem="lists[0]" @eventHandler="getEvent(lists[0].event, lists[0].step, 1)"></modify-list>
      <modify-list :listItem="lists[1]" @eventHandler="getEvent(lists[1].event, lists[1].step, 2)" v-if="isModify"></modify-list>
      <modify-list :listItem="lists[2]" @eventHandler="getEvent(lists[2].event, lists[2].step, 3)" v-if="isModify"></modify-list>
      <modify-list :listItem="lists[3]" @eventHandler="getEvent(lists[3].event, lists[3].step, 4)" v-if="isModify"></modify-list>

    </div>
</template>

<script>
import userHeader from '@/components/userHeader'
import modifyHeader from '@/components/modifyHeader'
import modifyList from '@/components/modifyList'
import {mapGetters} from 'vuex'
import {projectAdd} from '@/apis/project'
export default {
    data: function () {
        return {
            isModify: true,
            project:"",
            text: {
                title: '修改或升级您的项目资料',
                intro: '完善资料可获得更多合伙人青睐及达成合伙意向',
                other: '当前项目等级：一般合伙人'
            },
            lists: [
              {
                string1: '升级',
                string2: '展示类',
                string3: '项目信息',
                tip: '基本信息、开店计划',
                // 事件关键字
                event: 'projectModifyShow',
                step: 1
              },{
                string1: '升级',
                string2: '预热类',
                string3: '项目信息',
                tip: '创始人、团队、顾问导师、新闻报道',
                event: 'projectUpdatePreheating',
                step: 2
              },{
                string1: '升级',
                string2: '热门类',
                string3: '项目信息',
                tip: '商业模式、项目大事记、店铺状况...',
                event: '/projectUpdateHot',
                // step: 8
                step: 200
              },{

                string1: '升级',
                string2: '热演类',
                string3: '项目信息',
                tip: '新店开设、老店重组、股东信息...',
                event: 'projectUpdateRoadshow',
                step: 14
              }
            ],
            listItem: {
            }
        }
    },
    components: {
        userHeader,
        modifyHeader,
        modifyList
    },
    methods: {
//        getEvent: function (path) {
//            wx.navigateTo({
//                url: `/pages/${path}/main?id=${this.projectId}`
//            })
//        }
      getEvent: function (path, step, i) {
        let params = {
          step,
          token:this.token,
          separate:1,
          projectid:this.project.id
        };
        wx.removeStorage({key:`hehuoren_project_${step}`})
        projectAdd(params).then(res=>{
          if(res && res.step == step){
            wx.setStorage({
              key:`hehuoren_project_${step}`,
              data:JSON.stringify(res.data)
            })
            if(this.project.grade >= i-1 ) {
              wx.navigateTo({
                url: `/pages/${path}/main?info=${JSON.stringify(this.project)}`
              })
            } else {
              wx.showToast({
                title: '请先填写完上一步资料',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
//        let params = new URLSearchParams()
//        params.append('step', step)
//        params.append('token', this.token)
//        params.append('separate', 1)
//        let _projectid = this.$route.query.projectid
//        if(_projectid) {
//          params.append('projectid', _projectid)
//        }
//        localStorage.removeItem(`hehuoren_project_${step}`)
//        request({
//          url: '/project/add',
//          method: 'post',
//          data: params
//        }).then(res => {
//          console.log(res)
//          if(res && res.step == step){
//            localStorage.setItem(`hehuoren_project_${step}`, JSON.stringify(res.data))
//            if(this.$route.query.grade >= i-1 ) {
//              this.$router.push({path: path})
//            } else {
//              Toast({
//                message: '请先填写完上一步资料',
//                duration: 1000
//              })
//            }
//          }
//        })
      }
    },
    mounted() {
      if(!Object.keys(this.project).includes('grade')) {
        this.lists[0].string1 = '新建'
        this.isModify = false
      } else {
        for(let i = 0; i < this.project.grade; i++) {
          this.lists[i].string1 = '修改'
        }
      }
    },
    computed:{
      ...mapGetters(['token'])
    },
    onLoad: function(option){
        this.project = JSON.parse(option.info);
        console.log(this.project)
    },
}
</script>


<style>
body, page {
    background: #f6f6f6;
}
</style>

