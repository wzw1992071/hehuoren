<template>
    <div class="container">
        <user-header></user-header>
        <modify-header :text="headerInfo"></modify-header>
        <div class="mode block">
            <h2>竞争&模式</h2>
            <p>如市场规模，用户规模，目标客户群，同行业竞争对手概况等。最多300字。</p>
            <modify-textarea :info="modeResearch"></modify-textarea>
            <modify-textarea :info="modeAdvantage"></modify-textarea>
            <modify-textarea :info="modeMode"></modify-textarea>
            <modify-input :info="modeSave"></modify-input>
        </div>
        <div class="images block">
            <h2>项目图片</h2>
            <p>建议选择有代表性的图片，如现有门店，产品，团队面貌等。</p>
            <single-img :info="imagesInfo"></single-img>
            <modify-input :info="imagesSave"></modify-input>
        </div>
        <div class="video block">
            <h2>项目视频(选填可跳过填写下一栏)</h2>
            <p>如创始人录制的项目介绍视频等。</p>
            <inputs :info="videoTitle"></inputs>
            <inputs :info="videoLink"></inputs>
            <modify-input :info="videoDelete"></modify-input>
            <modify-input :info="videoAdd"></modify-input>
            <modify-input :info="videoSave"></modify-input>
        </div>
        <div class="event block">
            <h2>项目大事记(选填可跳过填写下一栏)</h2>
            <p>如创始人录制的项目介绍视频等。</p>
            <inputs :info="eventDate"></inputs>
            <modify-textarea :info="eventContent"></modify-textarea>
            <modify-input :info="eventDelete"></modify-input>
            <modify-input :info="eventAdd"></modify-input>
            <modify-input :info="eventSave"></modify-input>
        </div>
        <div class="shop block">
            <h2>现有店铺概况(首次开店可选填)</h2>
            <inputs :info="shopName"></inputs>
            <inputs :info="shopAddress"></inputs>
            <inputs :info="shopInputs"></inputs>
            <inputs :info="shopCycle"></inputs>
            <inputs :info="shopTime"></inputs>
            <inputs :info="shopFlow"></inputs>
            <inputs :info="shopConsumption"></inputs>
            <inputs :info="shopQuarterIncome"></inputs>
            <inputs :info="shopQuarterProfit"></inputs>
            <inputs :info="shopIncome"></inputs>
            <inputs :info="shopProfit"></inputs>
            <modify-input :info="shopDelete"></modify-input>
            <modify-input :info="shopAdd"></modify-input>
            <modify-input :info="shopSave"></modify-input>
        </div>
        <div class="project block">
            <h2>项目品鉴(首次开店可选)</h2>
            <inputs :info="projectPosition"></inputs>
            <inputs :info="projectPhone"></inputs>
            <inputs :info="projectContact"></inputs>
            <inputs :info="projectDiscount"></inputs>
            <p>折扣信息仅限本平台会员专享</p>
            <modify-input :info="projectSave"></modify-input>
        </div>
        <div class="question block">
            <h2>项目品鉴(首次开店可选)</h2>
            <p>项目路演是优质项目与智慧合伙人线下交流的开端。因此整个合伙经营过程中显得尤为重要。提前最好路演的策划与准备工作。以更主动的态势，让合伙人更加深入详细的了解项目。建立良好的信息基础。才能以最快的速度达成合伙意向</p>
            <selection
                :list="questionRoadshow"
            ></selection>
            <selection
                :list="questionPlan"
            ></selection>
            <selection
                :list="questionCycle"
            ></selection>
            <selection
                :list="questionSite"
            ></selection>
            <selection
                :list="questionIdentify"
            ></selection>
            <selection
                :list="questionHelp"
            ></selection>
            <modify-input :info="questionSave"></modify-input>
        </div>
        <div class="footer">
            <p>真实的填写每一个项目信息，会让项目在合伙运营期间更加的顺畅。</p>
            <modify-input :info="allSave"></modify-input>
            <modify-input :info="allContinue"></modify-input>
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
import selection from '@/components/selection'

export default {
    data: function () {
        return {
            headerInfo: {
                title: '完善热门类项目信息',
                intro: '建议由创始人亲自填写',
                other: '',
            },
            modeResearch: {
                title: '*市场调研',
                default: '如市场规模，用户规模，目标客户群，同行业竞争对手概况等。最多300字。',
                tip: '如市场规模，用户规模，目标客户群，同行业竞争对手概况等。最多300字。'
            },
            modeAdvantage: {
                title: '*竞争优势',
                default: '简单描述项目的产供销，如何赢得客户，如何盈利简单描述项目的产供销，如何赢得客户，如何盈利简单描述项目的产供销，如何赢得客户，如何盈利',
                tip: '简单描述项目的产供销，如何赢得客户，如何盈利'
            },
            modeMode: {
                title: '*商业模式',
                default: '商商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式商业模式业模式',
                tip: ''
            },
            modeSave: {
                type: 'yellow-block',
                text: '保存信息'
            },
            imagesInfo: {
                title: '*上传新图片',
                tip: '支持JPG、PNG格式，文件不大于5MB。'
            },
            imagesSave: {
                type: 'yellow-block',
                text: '保存图片信息'
            },
            videoTitle: {
                type: 1,
                title: '视频标题',
                text: '标题',
                handler: 'results.video.title'
            },
            videoLink: {
                type: 1,
                title: '视频链接',
                text: 'www.xxxxx.com',
                handler: 'results.video.link'
            },
            videoDelete: {
                type: 'blue-line',
                text: '- 删除该视频'
            },
            videoAdd: {
                type: 'yellow-line',
                text: '+ 增加视频'
            },
            videoSave: {
                type: 'yellow-block',
                text: '保存视频'
            },
            eventDate: {
                type: 1,
                title: '日期',
                text: '2018.2.2',
                handler: 'results.event.date'
            },
            eventContent: {
                title: '事件内容',
                default: '事件内容事件内容事件内容事件内容事件内容事件内容事件内容事件内容',
                tip: ''
            },
            eventDelete: {
                type: 'blue-line',
                text: '- 删除大事记'
            },
            eventAdd: {
                type: 'yellow-line',
                text: '+ 增加大事记'
            },
            eventSave: {
                type: 'yellow-block',
                text: '保存大事记'
            },
            shopName: {
                type: 1,
                title: '*店铺名称',
                text: '餐饮美食',
                handler: 'results.shop.name'
            },
            shopAddress: {
                type: 1,
                title: '*店铺地址',
                text: '高新区',
                handler: 'results.shop.address'
            },
            shopInputs: {
                type: 2,
                title: '*店铺筹备总投入',
                text: '0',
                measurement: '元',
                handler: 'results.shop.inputs'
            },
            shopCycle: {
                type: 2,
                title: '*从筹备到运营周期',
                text: '0',
                measurement: '天',
                handler: 'results.shop.cycle'
            },
            shopTime: {
                type: 2,
                title: '*盈利可分红时间',
                text: '0',
                measurement: '天',
                handler: 'results.shop.time'
            },
            shopFlow: {
                type: 2,
                title: '*客流量',
                text: '0',
                measurement: '位/日',
                handler: 'results.shop.flow'
            },
            shopConsumption: {
                type: 2,
                title: '*人均消费',
                text: '0',
                measurement: '元',
                handler: 'results.shop.consumption'
            },
            shopQuarterIncome: {
                type: 2,
                title: '*上季度营业收入',
                text: '0',
                measurement: '元',
                handler: 'results.shop.quarterIncome'
            },
            shopQuarterProfit: {
                type: 2,
                title: '*上季度净利润',
                text: '0',
                measurement: '元',
                handler: 'results.shop.quarterProfit'
            },
            shopIncome: {
                type: 2,
                title: '*上年度营业收入',
                text: '0',
                measurement: '元',
                handler: 'results.shop.income'
            },
            shopProfit: {
                type: 2,
                title: '*上年度净利润',
                text: '0',
                measurement: '元',
                handler: 'results.shop.profit'
            },
            shopDelete: {
                type: 'blue-line',
                text: '- 删除店铺'
            },
            shopAdd: {
                type: 'yellow-line',
                text: '+ 增加店铺'
            },
            shopSave: {
                type: 'yellow-block',
                text: '保存店铺信息'
            },
            projectPosition: {
                type: 1,
                title: '*店铺位置',
                text: '位置',
                handler: 'results.project.position'
            },
            projectPhone: {
                type: 1,
                title: '订座电话',
                text: '13688886666',
                handler: 'results.project.phone'
            },
            projectContact: {
                type: 1,
                title: '*联系人',
                text: '联系人',
                handler: 'results.project.contact'
            },
            projectDiscount: {
                type: 2,
                title: '*折扣信息',
                text: '1',
                measurement: '折',
                handler: 'results.project.discount'
            },
            projectSave: {
                type: 'yellow-block',
                text: '保存店铺信息'
            },
            questionRoadshow: {
                title: '*过往是否举行过项目路演：',
                list: ['是', '否'],
                handler: 'results.question.roadshow'
            },
            questionPlan: {
                title: '*是否已准备好商业计划书：',
                list: ['是', '否'],
                handler: 'results.question.plan'
            },
            questionCycle: {
                title: '*项目路演的筹备周期为：',
                list: ['1个月', '1~3个月', '3~6个月', '1年'],
                handler: 'results.question.cycle'
            },
            questionSite: {
                title: '*自身有无路演场地：',
                list: ['是', '否'],
                handler: 'results.question.site'
            },
            questionIdentify: {
                title: '*路演中项目说明人身份为：',
                list: ['核心团队成员', '非核心团队成员'],
                handler: 'results.question.identify'
            },
            questionHelp: {
                title: '*是否需要合伙人平台协助参与项目路演筹备工作：',
                list: ['是', '否'],
                handler: 'results.question.help'
            },
            questionSave: {
                type: 'yellow-block',
                text: '保存店铺信息'
            },
            allSave: {
                type: 'yellow-block',
                text: '保存并申请成为热门类资料'
            },
            allContinue: {
                type: 'blue-block',
                text: '+ 继续完善资料提升项目等级'
            },
           results: {
               mode: {
                   research: '',
                   advantage: '',
                   mode: ''
               },
               images: {

               },
               video: {
                   title: '',
                   link: ''
               },
               event: {
                   date: '',
                   content: ''
               },
               shop: {
                   name: '',
                   address: '',
                   inputs: '',
                   cycle: '',
                   time: '',
                   flow: '',
                   consumption: '',
                   quarterIncome: '',
                   quarterProfit: '',
                   income: '',
                   profit: ''
               },
               project: {
                   position: '',
                   phone: '',
                   contact: '',
                   discount: ''
               },
               question: {
                   roadshow: false,
                   plan: false,
                   cycle: '',
                   site: false,
                   identify: '',
                   help: false
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
        inputs,
        selection
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
            text-align: left;
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
