<template>
    <div class="container">
        <user-header></user-header>
        <modify-header :text="headerInfo"></modify-header>
        <div class="block">
            <single-img :info="proLogo"></single-img>
            <inputs @change="getVal" :info="proName"></inputs>
            <inputs @change="getVal" :info="proOrigin"></inputs>
            <inputs @change="getVal" :info="proShortintro"></inputs>
            <modify-textarea :info="proIntro"></modify-textarea>
        </div>
        <div class="block">
            <inputs @change="getVal" :info="proIndustry"></inputs>
            <inputs @change="getVal" :info="proField"></inputs>
            <inputs @change="getVal" :info="proStage"></inputs>
        </div>
        <div class="block">
            <inputs @change="getVal" :info="proAddress1"></inputs>
            <inputs @change="getVal" :info="proDetail1" v-if="inputShow[0]"></inputs>
            <inputs @change="getVal" :info="proAddress2"></inputs>
            <inputs @change="getVal" :info="proDetail2" v-if="inputShow[1]"></inputs>
            <inputs @change="getVal" :info="proAddress3"></inputs>
            <inputs @change="getVal" :info="proDetail3" v-if="inputShow[2]"></inputs>
            <inputs @change="getVal" :info="proAddress4"></inputs>
            <inputs @change="getVal" :info="proDetail4" v-if="inputShow[3]"></inputs>
        </div>
        <div class="footer">
            <modify-input @handleEvent="save" :info="projectSave"></modify-input>
            <modify-input  :info="projectContinue"></modify-input>
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
            inputShow:[true, false, false, false],
            headerInfo: {
                title: '完善展示类项目信息',
                intro: '',
                other: '介绍您的项目，一分钟让合伙人知道您在做什么',
            },
            proLogo: {
                title: '*上传项目logo',
                tip: '项目logo而非公司logo。支持JPG、PNG格式，文件不大于5MB。'
            },
            proName: {
                type: 1,
                title: '*项目名称',
                text: '名称名称',
                tip: '尽量不要使用公司名称。建议使用项目或品牌名称。最多16字。',
                handle: 'pro.name'
            },
            proOrigin: {
                type: 3,
                title: '*品牌来源',
                options: ['自主品牌', '代理品牌'],
                optionsTitle: '品牌来源',
                handler: 'pro.origin',
            },
            proShortintro: {
                type: 1,
                title: '*一句话介绍自己',
                text: '白领阶层消费啥啥啥的教科书',
                tip: '推荐两种简单的描述方法(最多25字)：1.类比法：举出模式类似的知名项目。如"顺旺基"-中国的麦当劳。2.差别法：说明目标人群和其需求。如"常乐足道"-亚健康人群的调理专家.',
                handle: 'pro.shortintro'
            },
            proIntro: {
                title: '*项目介绍',
                default: `简单介绍项目概况。针对的目标客户群。让合伙人快速了解你的项目优势。`,
                tip: `简单介绍项目概况。针对的目标客户群。让合伙人快速了解你的项目优势。`,
                handler: 'pro.intro'
            },
            proIndustry: {
                type: 3,
                title: '*所属行业',
                options: ['餐饮美食', '娱乐休闲', '美容健身'],
                optionsTitle: '所属行业',
                handler: 'pro.industry'
            },
            proField: {
                type: 3,
                title: '*细分领域',
                options: ['烤鱼', '烧烤', '火锅'],
                optionsTitle: '餐饮美食',
                handler: 'pro.field'
            },
            proStage: {
                type: 3,
                title: '*所属阶段',
                options: ['首次开业', '正常营业', '周年店庆'],
                optionsTitle: '所属阶段',
                handler: 'pro.stage'
            },
            proAddress1: {
                type: 3,
                title: '预期开店地址1',
                options: ['武侯区', '高新区', '双流区'],
                optionsTitle: '区域选择',
                handler: 'pro.address1.regional'
            },
            proDetail1: {
                type: 1,
                title: '请输入街道',
                text: 'XX市XX区XX号',
                handler: 'pro.address1.detail',
                tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
            },
            proAddress2: {
                type: 3,
                title: '预期开店地址1',
                options: ['武侯区', '高新区', '双流区'],
                optionsTitle: '区域选择',
                handler: 'pro.address2.regional'
            },
            proDetail2: {
                type: 1,
                title: '请输入街道',
                text: 'XX市XX区XX号',
                handler: 'pro.address2.detail',
                tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
            },
            proAddress3: {
                type: 3,
                title: '预期开店地址1',
                options: ['武侯区', '高新区', '双流区'],
                optionsTitle: '区域选择',
                handler: 'pro.address3.regional'
            },
            proDetail3: {
                type: 1,
                title: '请输入街道',
                text: 'XX市XX区XX号',
                handler: 'pro.address3.detail',
                tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
            },
            proAddress4: {
                type: 3,
                title: '预期开店地址1',
                options: ['武侯区', '高新区', '双流区'],
                optionsTitle: '区域选择',
                handler: 'pro.address4.regional'
            },
            proDetail4: {
                type: 1,
                title: '请输入街道',
                text: 'XX市XX区XX号',
                handler: 'pro.address4.detail',
                tip: `请至少填写一个预期开店地址，也可为实际开店地址。(准确输入开店地址，精准锁定项目后期运营中给力的合伙人)`
            },
            projectSave: {
                text: '保存并申请成为展示类项目',
                type: 'yellow-block'
            },
            projectContinue: {
                text: '+ 继续完善资料提升项目等级',
                type: 'blue-block'
            },
            pro: {
                name: '',
                origin: '',
                shortintro: '',
                intro: '',
                industry: '',
                field: '',
                stage: '',
                address1: {
                    regional: '',
                    detail: ''
                },
                address2: {
                    regional: '',
                    detail: ''
                },
                address3: {
                    regional: '',
                    detail: ''
                },
                address4: {
                    regional: '',
                    detail: ''
                },
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
           console.log(this.$data)
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
