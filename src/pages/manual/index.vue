<template>
    <div class="container">
        <div class="tab">
            <div>
                <div
                    v-for="(item, index) in tabs"
                    :key="index"
                    :class="{active:active[index]}"
                    @click="getActive(index)"
                >
                    {{ item }}
                </div>
            </div>
            <div class="option"><img src="/static/images/optionsYellow.png"></div>
        </div>
        <div class="content content-1">
            <div class="subtab">
                <div
                    v-for="(item, index) in subTabs"
                    :key="index"
                    :class="{active:subActive[index]}"
                    @click="getSubActive(index)"
                    >
                    {{ item }}
                </div>
            </div>
            <div class="text">
                <div class="text-1">
                    <h1>成都恒之道企业管理中心（有限合伙）用户咨询服务协议</h1>
                    <h2>第一条 定义与解释</h2>
                    <p><b>1.1</b> 除本协议另有规定外，下列用语或术语应当具有以下定义：</p>
                    <p><b>恒之道：</b> 指成都恒之道企业管理中心（有限合伙）</p>
                    <p><b>合火人：</b> 指恒之道企业管理中心运营的为“合火人”网络平台会员提供项目合伙运营咨询、项目财务咨询以及其他信息对接服务的互联网平台</p>
                    <p><b>合伙人：</b> 指符合恒之道或者合火人网络平台规定的、同意遵守本协议的约定自愿申请并经合火人网络平台审核通过，使用本平台发布项目、寻找项目的用户（也可称为平台会员）。包括自然人、合伙企业、有限责任公司、股份有限公司等民事主体。</p>
                    <p><b>项目方：</b> 指合伙人使用本平台发布项目信息后，在此项目中该合伙人称为项目方；如果项目方为自然人，尚未设立公司或者其他实体运营项目，本协议项下适用于该自然人的权利义务同样适用于后续承继该运营项目的公司或其他实体；在此项目中，其它认证用户依然称为合伙人；</p>
                    <p><b>合伙运营咨询服务：</b> 指恒之道基于合火人为平台会员提供在线信息对接、交流、互动；线下协助项目路演、合伙协议签订、注册成立，运营的服务；平台会员可多次使用合火人网络平台进行合伙运营咨询服务。</p>
                    <p><b>项目公司：</b> 指项目方在本平台发布项目信息后，针对该项目依法注册成立的企业；包括合伙制企业、有限公司、股份有限公司等民事主体。</p>
                    <p><b>1.2</b> 本协议提及的条款和附件，均是指本协议的条款和附件。</p>
                    <p><b>1.3</b> 本协议的附件与本协议具有同等法律效力。</p>
                    <h2>第二条 协议当事人</h2>
                    <p><b>2.1</b> 恒之道与用户经友好协商，依据《中华人民共和国合同法》、《中华人民共和国公司法》及其他相关法律、法规的规定，本着平等、自愿、等价有偿的原则，就恒之道企业管理中心基于合火人网络平台向用户提供在线信息对接、交流、互动；线下协助项目路演、合伙协议签定、注册成立、运营的咨询服务事宜，达成本咨询服务协议，以资共同遵守。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            tabs: ['条规条款', '风险告知', '服务内容', '常见问题'],
            active: [true, false, false, false],
            subTabs: ['服务条款', '领头人', '合格合火人', '成功规则'],
            subActive: [true, false, false, false]
        }
    },
    methods:{
        getActive: function (i) {
            let arr = [false, false, false, false]
            arr[i] = true
            this.active = arr;
        },
        getSubActive: function (i) {
            let arr = [false, false, false, false]
            arr[i] = true
            this.subActive = arr;
        }
    },
    create () {
    }
}
</script>

<style >
page {
    background: #f6f6f6;
    font-family: 'PingFang';
}

.container {
    background: #f6f6f6;
}

.tab {
    display: flex;
    padding: 40rpx 40rpx 0;
    height: 80rpx;
    background: #fff;
}

.tab>div:first-child {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    font-size: 24rpx;
    color: #343434;
    /* font-weight: 600; */
}

.tab div div.active {
    font-weight: 600;
}

.tab div div:after {
    content: '';
    display: block;
    width: 60rpx;
    height: 8rpx;
    border-radius: 4rpx;
    background-color: none;
    margin: 8rpx auto 0;
}

.tab div div.active:after {
    background-color: #ff7803;
}

.option {
    width: 40rpx;
    height: 40rpx;
    margin-left: 40rpx;
}

.option img {
    width: 40rpx;
    height: 40rpx;
}

.content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 100rpx;
}

.subtab {
    width: 190rpx;
    justify-self: flex-start;
}

.subtab div{
    width: 100%;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 24rpx;
    color: #343434;
    background: #fff;
    border: solid 2rpx #ccc;
    border-width: 0 2rpx 2rpx 0;
}

.subtab div:first-child {
    border-top-width: 2rpx;
}

.subtab div.active {
    border-color: rgba(0, 0, 0, 0);
    color: #FF7803;
    background: rgba(0, 0, 0, 0);
}


.text {
    width: 505rpx;
    color: #343434;
    margin-right: 34rpx;
    line-height: 1.5;
}

.text h1 {
    font-size: 30rpx;
    text-align: center;
    font-weight: 600;
}

.text h2 {
    font-size: 26rpx;
    margin-top: 50rpx;
    margin-bottom: 30rpx;
    font-weight: bold;
}

.text p {
    font-size: 24rpx;
    margin-top: 10rpx;
}

.text p b {
    display: inline;
    font-weight: 600;
}
</style>


