<template>
    <div class="container">
        <user-header></user-header>
        <div class="form">
            <div class="form-title">
                <div class="title">标题</div>
                <div class="subtitle">简洁清晰，传达明确意见</div>
            </div>
            <div class="text">
                <textarea name="" id="" cols="3" rows="3" v-model="advise" placeholder="描述您在平台使用过程中遇到的问题或者投诉。我们会仔细倾听您的意见并尽快给您反馈。"></textarea>
            </div>
        </div>
        <div class="form">
            <div class="form-title">
                <div class="title">反馈内容</div>
                <textarea class="subtitle" v-model="advises" placeholder="描述您在平台使用过程中遇到的问题或者投诉。我们会仔细倾听您的意见并尽快给您反馈。"></textarea>
            </div>
        </div>
        <button class="submit" type="submit" @click="submit">提交</button>
    </div>
</template>

<script>
import userHeader from '@/components/userHeader.vue'
import service from '@/utils/request';
export default {
    data: function () {
        return {
            advise: '',
            advises:'',
            alert: false,
            alertText: '',
        }
    },
    components: {
        userHeader
    },
    methods: {
        submit () {
            var _this = this
            // console.log(this.$store.getters.token)
            service({
               url: `/member/apiTocao?separate=1&token=${this.$store.getters.token}&txt_sumbit=true&title=${this.advise}&content=${this.advises}`,
               method: "POST", 
            }).then(response => {
                    _this.advise = ''
                    _this.advises = ''
                    wx.showToast({
                        title:response.msg
                    });
                })           
        }
    }
}
</script>

<style>
.container {
    padding-bottom: 50rpx;
}
.form {
    font-family: 'PingFang';
    padding: 30rpx;
    background: #fff;
    margin-bottom: 10rpx;
}
.form-title {
    display: flex;
    align-items: flex-start;
    font-size: 26rpx;
    color: #333;
    justify-content: space-between;
    line-height: 1.8;
    margin-bottom: 20rpx;
}

.title {
    font-weight: bold;
    position: relative;
    padding-left: 20rpx;
}

.title:before {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 6rpx;
    height: 30rpx;
    display: inline-block;
    background: #D62636;

}

.subtitle {
    width: 467rpx;
}

.text {
    font-size: 24rpx;
}

.form textarea {
    width: 100%;
    height: 100rpx;
}

.submit {
    width: 510rpx;
    height: 80rpx;
    color: #fff;
    background-color: #D62636;
    border-radius: 40rpx;
    text-align: center;
    line-break: 80rpx;
    font-size: 30rpx;
    margin-top: 180rpx;
}
</style>



