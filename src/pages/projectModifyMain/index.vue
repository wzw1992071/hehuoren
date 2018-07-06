<template>
    <div>
        <user-header></user-header>
        <modify-header :text="text"></modify-header>
        <div v-for="(item, index) in lists" :key="index">
            <modify-list :listItem="item" @eventHandler="getEvent(item.path)"></modify-list>
        </div>
    </div>
</template>

<script>
import userHeader from '@/components/userHeader'
import modifyHeader from '@/components/modifyHeader'
import modifyList from '@/components/modifyList'

export default {
    data: function () {
        return {
            projectId:"",
            text: {
                title: '修改或升级您的项目资料',
                intro: '完善资料可获得更多合伙人青睐及达成合伙意向',
                other: '当前项目等级：一般合伙人'
            },
            lists: [
                {
                    string1: '修改',
                    string2: '展示类',
                    string3: '项目信息',
                    tip: '基本信息、开店计划',
                    // 事件关键字
                    event: '展示类',
                    path:'projectModifyShow'
                },{
                    string1: '升级',
                    string2: '预热类',
                    string3: '项目信息',
                    tip: '创始人、团队、顾问导师、新闻报道',
                    event: '预热类',
                    path:'projectUpdatePreheating'
                },{
                    string1: '升级',
                    string2: '热门类',
                    string3: '项目信息',
                    tip: '商业模式、项目大事记、店铺状况...',
                    event: '热门类',
                    path:'projectUpdateHot'
                },{

                    string1: '升级',
                    string2: '热演类',
                    string3: '项目信息',
                    tip: '新店开设、老店重组、股东信息...',
                    event: '热演类',
                    path:'projectUpdateRoadshow'
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
        getEvent: function (path) {
            wx.navigateTo({
                url: `/pages/${path}/main?id=${this.projectId}`
            })
        }
    },
    onLoad: function(option){
        this.projectId = option.id;
    },
}
</script>


<style>
body, page {
    background: #f6f6f6;
}
</style>

