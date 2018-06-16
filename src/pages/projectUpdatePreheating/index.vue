<template>
    <div class="container">
        <user-header></user-header>
        <modify-header :text="headerInfo"></modify-header>
        <!-- <modify-input :info="info" @handleEvent="save('event1')"></modify-input> -->
        <modify-textarea :info="textarea"></modify-textarea>
        <div class="founder block">
            <h2>创始人信息</h2>
            <single-img :info="founderAvatar"></single-img>
            <inputs @change="getVal" :info="founderName"></inputs>
            <inputs @change="getVal" :info="founderPhone"></inputs>
            <inputs @change="getVal" :info="founderWechat"></inputs>
            <inputs @change="getVal" :info="founderPosition"></inputs>
            <modify-textarea :info="founderDescription"></modify-textarea>
            <modify-input :info="founderSave"></modify-input>
        </div>
        <div class="others block">
            <h2>其他成员信息</h2>
            <single-img :info="founderAvatar"></single-img>
            <inputs @change="getVal" :info="othersName"></inputs>
            <inputs @change="getVal" :info="othersPhone"></inputs>
            <inputs @change="getVal" :info="othersWechat"></inputs>
            <inputs @change="getVal" :info="othersPosition"></inputs>
            <modify-textarea :info="othersDescription"></modify-textarea>
            <modify-input :info="othersDelete"></modify-input>
            <modify-input :info="othersAdd"></modify-input>
            <modify-input :info="othersSave"></modify-input>
        </div>
        <div class="teacher block">
            <h2>顾问导师(选填可跳过填写下一栏)</h2>
            <p>邀请资深人士最为项目的导师能提升项目影响力。请如实填写。</p>
            <single-img :info="teacherAvatar"></single-img>
            <inputs @change="getVal" :info="teacherName"></inputs>
            <inputs @change="getVal" :info="teacherPosition"></inputs>
            <modify-textarea :info="teacherDescription"></modify-textarea>
            <modify-input :info="teacherDelete"></modify-input>
            <modify-input :info="teacherAdd"></modify-input>
            <modify-input :info="teacherSave"></modify-input>
        </div>
        <div class="news block">
            <h2>新闻报道(选填可跳过填写下一栏)</h2>
            <p>建议只填写主流媒体及科技媒体对您项目的报道</p>
            <inputs @change="getVal" :info="newsTitle"></inputs>
            <inputs @change="getVal" :info="newsLink"></inputs>
            <modify-input :info="newsDelete"></modify-input>
            <modify-input :info="newsAdd"></modify-input>
            <modify-input :info="newsSave"></modify-input>
        </div>
        <div class="footer">
            <p>智慧合伙人会更多关注与青睐资料填写更为完善的项目。</p>
            <modify-input :info="projectSave"></modify-input>
            <modify-input :info="projectContinue"></modify-input>
        </div>
    </div>
</template>

<script>
import userHeader from '@/components/userHeader'
import modifyHeader from '@/components/modifyHeader'
import modifyInput from '@/components/modifyInput'
import modifyTextarea from '@/components/modifyTextarea'
import singleImg from '@/components/singleImg'
import inputs from '@/components/inputs'

export default {
    data: function () {
        return {
            headerInfo: {
                title: '完善预热类项目信息',
                intro: '创始团队的实力和完备性是合伙人非常看中的要素',
                other: '请尽可能将团队成员填写清晰',
            },
            textarea: {
                title: '*团队介绍',
                tip: '介绍团队最突出的亮点。如来自腾讯，百度的团队。组建3年持续创业的团队。团队在餐饮行业深根10多年且有丰富的经验等。',
                default: '介绍团队最突出的亮点。如来自腾讯，百度的团队。组建3年持续创业的团队。团队在餐饮行业深根10多年且有丰富的经验等。'
            },
            founderAvatar: {
                title: '*真实头像',
                tip: '支持JPG,PNG格式，文件大小不大于5MB'
            },
            founderName: {
                type: 1,
                title: '*真实姓名',
                text: '姓名',
                handler: 'results.founder.name',
            },
            founderPhone: {
                type: 1,
                title: '*常用手机',
                text: '16688886666',
                handler: 'results.founder.phone',
            },
            founderWechat: {
                type: 1,
                title: '*微信号',
                text: '16688886666',
                handler: 'results.founder.wechat',
            },
            founderPosition: {
                type: 3,
                title: '*项目中的职位',
                options: ['技术负责人', '技术指导', '会计'],
                optionsTitle: '职位',
                handler: 'results.founder.position'
            },
            founderDescription: {
                title: '*个人描述',
                tip: '展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。',
                default: '展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。'
            },
            founderSave: {
                text: '+ 保存创始人信息',
                type: 'yellow-block'
            },
            othersAvatar: {
                title: '*真实头像',
                tip: '支持JPG,PNG格式，文件大小不大于5MB'
            },
            othersName: {
                type: 1,
                title: '*真实姓名',
                text: '姓名',
                handler: 'results.others.name',
            },
            othersPhone: {
                type: 1,
                title: '*常用手机',
                text: '16688886666',
                handler: 'results.others.phone',
            },
            othersWechat: {
                type: 1,
                title: '*微信号',
                text: '16688886666',
                handler: 'results.others.wechat',
            },
            othersPosition: {
                type: 3,
                title: '*项目中的职位',
                options: ['技术负责人', '技术指导', '会计'],
                optionsTitle: '职位',
                handler: 'results.others.position'
            },
            othersDescription: {
                title: '*个人描述',
                tip: '展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。',
                default: '展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。'
            },
            othersSave: {
                text: '保存创始人信息',
                type: 'yellow-block'
            },
            othersAdd: {
                text: '+ 增加团队成员信息',
                type: 'yellow-line'
            },
            othersDelete: {
                text: '- 删除该成员',
                type: 'blue-line'
            },
            teacherAvatar: {
                title: '顾问头像',
                tip: '支持JPG,PNG格式，文件大小不大于5MB'
            },
            teacherName: {
                type: 1,
                title: '顾问姓名',
                text: '姓名',
                handler: 'results.teacher.name',
            },
            teacherPosition: {
                type: 3,
                title: '顾问方向',
                options: ['技术负责人', '技术指导', '会计'],
                optionsTitle: '职位',
                handler: 'results.teacher.position'
            },
            teacherDescription: {
                title: '个人描述',
                default: '展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。展现个性和亮点。体现和别人不一样的地方。行业从业经验，兴趣爱好等。'
            },
            teacherSave: {
                text: '保存导师信息',
                type: 'yellow-block'
            },
            teacherAdd: {
                text: '+ 增加新导师',
                type: 'yellow-line'
            },
            teacherDelete: {
                text: '- 删除该导师',
                type: 'blue-line'
            },
            newsTitle: {
                type: 1,
                title: '新闻标题',
                text: '标题',
                handler: 'results.news.title',
            },
            newsLink: {
                type: 1,
                title: '新闻链接',
                text: 'www.news.com',
                handler: 'results.news.link',
            },
            newsSave: {
                text: '保存新闻',
                type: 'yellow-block'
            },
            newsAdd: {
                text: '+ 增加新闻',
                type: 'yellow-line'
            },
            newsDelete: {
                text: '- 删除该新闻',
                type: 'blue-line'
            },
            projectSave: {
                text: '保存并申请成为预热类信息',
                type: 'yellow-block'
            },
            projectContinue: {
                text: '+ 进一步完善资料提升等级',
                type: 'blue-block'
            },
            results: {
                founder: {
                    name: '',
                    phone: '',
                    wechat: '',
                    position: '',
                    description: ''
                },
                others: {
                    name: '',
                    phone: '',
                    wechat: '',
                    position: '',
                    description: ''
                },
                teacher: {
                    name: '',
                    position: '',
                    description: ''
                },
                news: {
                    title: '',
                    link: ''
                }
            }
        }
    },
    components: {
        userHeader,
        modifyHeader,
        modifyInput,
        modifyTextarea,
        singleImg,
        inputs
    },
    methods: {
        save: function (evt) {
            console.log(evt)
        },
        getVal: function (params) {
           let _val =  params.val
           let _key = params.handler
        //    暂时处理方法
           let arr = _key.split('.')
           if(arr.length == 1) {
               this.$data[arr[0]] = _val
           } else if(arr.length == 2) {
               this.$data[arr[0]][arr[1]] = _val
           } else if(arr.length == 3) {
               this.$data[arr[0]][arr[1]][arr[2]] = _val
           }
           console.log(this.$data[arr[0]])
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    width: 100%;
    .block {
        margin-top: 20rpx;
        background: #fff;
        padding: 30rpx 0;
        h2 {
            font-size: 30rpx;
            color: #ff7803;
            line-height: 1.5;
            text-align: center;
            font-weight: 600;
            margin-bottom: 20rpx;
        }
        > p{
            padding: 0 20rpx;
            text-align: center;
            font-size: 24rpx;
            color: #cdcdcd;
        }
    }
    .footer {
        margin-top: 20rpx;
        padding: 30rpx;
        > p {
            padding: 0 20rpx;
            text-align: center;
            font-size: 24rpx;
            color: #cdcdcd;
        }
    }
}
</style>
