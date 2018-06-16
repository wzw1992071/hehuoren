<template>
    <div class="container">
        <user-header></user-header>
        <modify-header :text="headerInfo"></modify-header>
        <div class="equity block">
            <h2>股权设置</h2>
            <inputs :info="setArea"></inputs>
            <inputs :info="setInputs"></inputs>
            <inputs :info="setInvestment"></inputs>
            <inputs :info="setEquity"></inputs>
            <inputs :info="setProfit"></inputs>
            <inputs :info="setPartnerProfit"></inputs>
            <h3>消费合伙</h3>
            <inputs :info="cLines"></inputs>
            <inputs :info="cEquity"></inputs>
            <inputs :info="cTotal"></inputs>
            <inputs :info="cTicket"></inputs>
            <h3>股本合伙</h3>
            <inputs :info="eLines"></inputs>
            <inputs :info="eEquity"></inputs>
            <inputs :info="eTotal"></inputs>
            <inputs :info="eTicket"></inputs>
            <h3>领头合伙</h3>
            <inputs :info="lLines"></inputs>
            <inputs :info="lEquity"></inputs>
            <inputs :info="lTotal"></inputs>
            <inputs :info="lTicket"></inputs>
            <modify-textarea :info="setOther"></modify-textarea>
            <modify-input :info="setSave"></modify-input>
        </div>
        <div class="use block">
            <h2>资金用途</h2>
            <!-- selection -->
            <inputs :info="use1"></inputs>
            <inputs :info="use2"></inputs>
            <inputs :info="use3"></inputs>
            <inputs :info="use4"></inputs>
            <inputs :info="use5"></inputs>
            <inputs :info="use6"></inputs>
            <inputs :info="use7"></inputs>
            <inputs :info="use8"></inputs>
            <inputs :info="use9"></inputs>
            <inputs :info="use10"></inputs>
            <inputs :info="use11"></inputs>
            <inputs :info="use12"></inputs>
            <inputs :info="use13"></inputs>
            <inputs :info="use14"></inputs>
            <modify-textarea :info="use15"></modify-textarea>
            <modify-input :info="useSave"></modify-input>
        </div>
        <div class="control block">
            <h2>运营管控</h2>
            <inputs :info="control1"></inputs>
            <inputs :info="control2"></inputs>
            <modify-textarea :info="control3"></modify-textarea>
            <modify-textarea :info="control4"></modify-textarea>
            <!-- selection -->
            <modify-input :info="controlSave"></modify-input>
        </div>
        <div class="exit block">
            <h2>退出机制</h2>
            <single-img :info="exit1"></single-img>
            <modify-textarea :info="exit2"></modify-textarea>
            <modify-input :info="exitSave"></modify-input>
        </div>
        <div class="footer">
            <p>信任同样需要量化，理性的项目方往往更加重视运营过程中对合伙人的尊重，沟通和理解，并提前建立良好的退出机制</p>
            <modify-input :info="allSave"></modify-input>
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
                title: '完善路演类项目信息',
                intro: '请重视能提供资金外资源需求的合伙人',
                other: '',
            },
            setArea: {
                type: 2,
                title: '*营业面积(预估)',
                measurement: '平方',
                text: '100',
                handler: 'results.setting.area'
            },
            setInputs: {
                type: 2,
                title: '*项目总投入资金',
                measurement: '元',
                text: '10000',
                handler: 'results.setting.inputs'
            },
            setInvestment: {
                type: 2,
                title: '*项目方出资',
                measurement: '元',
                text: '10000',
                handler: 'results.setting.investment'
            },
            setEquity: {
                type: 2,
                title: '*项目方股份占比',
                measurement: '%',
                text: '80',
                handler: 'results.setting.equity'
            },
            setProfit: {
                type: 2,
                title: '*项目方收益比例',
                measurement: '%',
                text: '20',
                handler: 'results.setting.profit'
            },
            setPartnerProfit: {
                type: 2,
                title: '*合伙方收益比例',
                measurement: '%',
                text: '30',
                handler: 'results.setting.partnerProfit'
            },
            cLines: {
                type: 2,
                title: '*单笔额度',
                text: '1000',
                measurement: '元',
                handler: 'results.consumptions.lines'
            },
            cEquity: {
                type: 2,
                title: '*股份占比',
                text: '80',
                measurement: '%',
                handler: 'results.consumptions.equity'
            },
            cTotal: {
                type: 2,
                title: '*共计',
                text: '20',
                measurement: '份',
                handler: 'results.consumptions.total'
            },
            cTicket: {
                type: 2,
                title: '*享有可消费体验券价值',
                text: '100',
                measurement: '元',
                handler: 'results.consumptions.ticket'
            },
            eLines: {
                type: 2,
                title: '*单笔额度',
                text: '1000',
                measurement: '元',
                handler: 'results.equity.lines'
            },
            eEquity: {
                type: 2,
                title: '*股份占比',
                text: '20',
                measurement: '%',
                handler: 'results.equity.equity'
            },
            eTotal: {
                type: 2,
                title: '*共计',
                text: '10',
                measurement: '份',
                handler: 'results.equity.total'
            },
            eTicket: {
                type: 2,
                title: '*享有可消费体验券价值',
                text: '100',
                measurement: '元',
                handler: 'results.equity.ticket'
            },

            lLines: {
                type: 2,
                title: '*单笔额度',
                text: '1000',
                measurement: '元',
                handler: 'results.leader.lines'
            },
            lEquity: {
                type: 2,
                title: '*股份占比',
                text: '30',
                measurement: '%',
                handler: 'results.leader.equity'
            },
            lTotal: {
                type: 2,
                title: '*共计',
                text: '10',
                measurement: '份',
                handler: 'results.leader.total'
            },
            lTicket: {
                type: 2,
                title: '*享有可消费体验券价值',
                text: '10',
                measurement: '元',
                handler: 'results.leader.ticket'
            },
            setOther: {
                title: '*合伙人其他收益方式',
                tip: '如每季提留净利润的10%.根据每位合伙人给予该项目营业额所作出的贡献大小，予以分红……',
                default: '如每季提留净利润的10%.根据每位合伙人给予该项目营业额所作出的贡献大小，予以分红（没有其他收益方式，请填暂无）'
            },
            setSave: {
                type: 'yellow-block',
                text: '保存信息'
            },
            use1: {
                type: 2,
                title: '*加盟费用',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use2: {
                type: 2,
                title: '*预付租金费用',
                measurement: '元/月',
                text: '1',
                handler: 'results.use.val1'
            },
            use3: {
                type: 2,
                title: '*履约保证金',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use4: {
                type: 2,
                title: '*开业前员工储备培训开支',
                measurement: '元/月',
                text: '1',
                handler: 'results.use.val1'
            },
            use5: {
                type: 2,
                title: '*共计',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use6: {
                type: 2,
                title: '*合计',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use7: {
                type: 2,
                title: '*装修费用',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use8: {
                type: 2,
                title: '*首次原材料采购费用',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use9: {
                type: 2,
                title: '*企业成立开办费用',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use10: {
                type: 2,
                title: '*流动资金',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use11: {
                type: 2,
                title: '*风险储备金',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use12: {
                type: 2,
                title: '*广告费用',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use13: {
                type: 2,
                title: '*财务费用',
                measurement: '元',
                text: '1',
                handler: 'results.use.val1'
            },
            use14: {
                type: 1,
                title: '合计',
                text: '1',
                handler: 'results.use.val1'
            },
            use15: {
                title: '备注',
                default: '备注信息'
            },
            useSave: {
                type: 'yellow-block',
                text: '保存信息'
            },
            control1: {
                type: 2,
                title:'*合伙成功(85%项目资金到帐)后开业时间不超过',
                measurement: '天',
                text: '1000',
                handler: 'results.control.val1'
            },
            control2: {
                type: 2,
                title: '*毛利率不低于',
                measurement: '%',
                text: '20',
                handler: 'results.control.val2'
            },
            control3: {
                title: '*合伙人管理办法及要求',
                default: '如：1.多久召开一次全员大会。2.非合伙人大会期间项目日常方工作情况汇报对象……',
                tip: '如：1.多久召开一次全员大会。2.非合伙人大会期间项目日常方工作情况汇报对象。3.领头人如何参与项目运营及其他合伙人管理等。（请充分重视合伙人，并合理安排。在项目未来合伙运营及合伙人关系处理中，领头人将起到举足轻重的作用）'
            },
            control4: {
                title: '*资金监管',
                default: '如：1.每日财报通过合伙人Q群披露。2.项目开业前，大额资金使用。邀请领头人进行账户共管……',
                tip: '如：1.每日财报通过合伙人Q群披露。2.项目开业前，大额资金使用。邀请领头人进行账户共管。3.聘请第三方公司参与资金监管。4.安装财务监控视频等。'
            },
            controlSave: {
                type: 'yellow-block',
                text: '保存信息'
            },
            exit1: {
                title: '*上传合伙协议摘要图片，最多6张。',
                tip: '支持JPG、PNG格式，文件不大于5MB。'
            },
            exit2: {
                title: '*退出方式',
                default: '退出方式：如:股份封闭期为多久？什么时间可以自由买卖？是否设置优先回购权？……',
                tip: '退出方式：如:股份封闭期为多久？什么时间可以自由买卖？是否设置优先回购权？'
            },
            exitSave: {
                type: 'yellow-block',
                text: '保存信息'
            },
            allSave: {
                type: 'yellow-block',
                text: '保存并申请成为准路演类项目'
            },
            results: {
                setting: {
                    area: '',
                    inputs: '',
                    investment: '',
                    equity: '',
                    profit: '',
                    partnerProfit: ''
                },
                consumption: {
                    lines: '',
                    equity: '',
                    total: '',
                    ticket: ''
                },
                equity: {
                    lines: '',
                    equity: '',
                    total: '',
                    ticket: ''
                },
                leader: {
                    lines: '',
                    equity: '',
                    total: '',
                    ticket: ''
                },
                otherProfit: '',
                use: {
                    val1: '',
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
        > h3 {
            font-size: 28rpx;
            color: #ff7803;
            box-sizing: border-box;
            padding: 0 30rpx;
            height: 60rpx;
            line-height: 60rpx;
            background: #f6f6f6;
            font-weight: 600;
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
