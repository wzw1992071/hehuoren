// 已完成
<template>
    <div class="login">
        <div class="login-con">
            <div class="logo">
                <div class="logo-con">
                    <img src="/static/images/logo-yellow.png" alt="">
                </div>
            </div>
            <div class="logo-name">注册</div>
            <div class="form">
                <div class="inp">
                    <img src="/static/images/iconPhone.png" alt="">
                    <input type="text" placeholder="请输入电话号码" v-model="mobile">
                </div>
                <div class="inp verify">
                    <img src="/static/images/verify.png" alt="">
                    <input type="text" placeholder="输入6位验证码"  v-model="code">
                    <button class="resend" :class="{disabled}" @click="resend">重新发送{{countdown? countdown : ''}}</button>
                </div>
                <div class="inp psw">
                    <img src="/static/images/iconPassword.png" alt="">
                    <input type="password" placeholder="请输入密码"  v-model="password">
                </div>
                <div class="inp psw">
                    <img src="/static/images/iconPassword.png" alt="">
                    <input type="password" placeholder="请再次输入密码" v-model="psw2">
                </div>
                <div class="inp">
                    <img src="/static/images/recommend.png" alt="">
                    <input type="text" placeholder="推荐人手机号码(选填)"  v-model="tuijian_mobile">
                </div>
                <div class="submit">
                    <button type="submit" :class="{yes:agree}" @click="sign">注册</button>
                    <a href="/pages/login/main">登陆</a>
                </div>
            </div>
        <div class="footer">
            <div class="agree" @click="getAgree">
                <i><img v-if="agree" src="/static/images/blueTick.png"></i>
                <p>同意<a href="/pages/index/main">《用户咨询服务协议》</a>及<a href="/pages/index/main">《风险告知书》</a>并愿意自行承担由此产生的所有风险。</p>
            </div>
            <!-- <div class="create">
                <button :class="{yes:agree}">+创建项目</button>
            </div> -->
        </div>

        </div>
    </div>
</template>

<script>
import service from '@/utils/request';
export default {
    data: function () {
        return {
            countdown: 0,
            disabled: false,
            agree: false,
            mobile: '',
            password: '',
            code: '',
            tuijian_mobile: '',
            separate: 1,
            psw2: '',
            sendCode: '发送验证码'
        }
    },
    methods: {
        resend:function () {
            let _time = 60
            let _that = this
            function _count() {
                setTimeout(() => {
                    if(_time > 0) {
                        _time--                   
                        _that.disabled = true
                        _that.countdown = _time
                        _count()
                    } else {
                        _that.disabled = false
                    }
                }, 1000);
            }
            if(!this.disabled) {
                // _count()
                service({
                        url: `/index.php?m=Mobile&c=member&a=sendsms&tel=${this.mobile}`,
                        method:'GET'
                    })
                    .then(function(){
                        if(response.status === 'success') {
                            _count()
                        }else{
                            wx.showToast({
                                icon:'none',
                                title:'response.msg'
                            });
                        }
                    })
                    .catch(function(){
                        
                    })
            }
        },
        getAgree: function () {
            let _agree = this.agree
            this.agree = !_agree
        },
        sign: function () {
            if (this.agree) {
                if(this.password !== this.psw2 && this.password !== '') {
                    console.log('密码不一致')
                    wx.showToast({
                        icon:'none',
                        title:'密码不一致'
                    });
                } else if(this.password === '') {
                    wx.showToast({
                        icon:'none',
                        title:'密码不能为空'
                    });
                    console.log('密码不能为空')
                } else {
                    let params = {}
                    params.mobile = this.mobile.trim();
                    params.code = this.code
                    params.password = this.password
                    params.tuijian_mobile = this.tuijian_mobile
                    params.separate = this.separate
                    service({
                        url: '/index.php?m=Mobile&c=member&a=regist',
                        data: params,
                        method: 'POST'
                    }).then(res => {
                        let self = this
                        if(res.status == 1) {
                            wx.showToast({
                                title:'注册成功'
                            });
                            setTimeout(() => {
                                wx.reLaunch({
                                    url:'/pages/login/main'
                                })
                            }, 1000);
                        } else {
                            wx.showToast({
                                title:'response.msg'
                            });
                        }
                    }).catch(e => {
                        console.log('what\'s wrong?')
                    }) 
                }
            }
        }
    }
}
</script>

<style>
    page {
        background-color: rgba(255,247,241,1);
    }

    .login {
        font-family: 'PingFang';
        padding-top: 200rpx;
    }

    .login-con {
        padding: 50rpx 0;
        width: 580rpx;
        box-shadow: 0px 0px 40rpx #eee;
        margin: 0 auto;
        border-radius: 30rpx;
        position: relative;
        z-index: 10;
    }

    .logo {
        left: 50%;
        top: -150rpx;
        width: 190rpx;
        height: 190rpx;
        position: relative;
        background-color: rgba(255,247,241,1);
        transform: translate3d(-50%, 0, 0);
        padding: 20rpx;
        box-shadow: 0 -10rpx 30rpx #eee;
        z-index: 20;
        border-radius: 30rpx;
    }

    .logo .logo-con {
        position: absolute;
        width: 150rpx;
        height: 150rpx;
        box-shadow: 0px 0px 10rpx #eee;
        background: #fff;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    .logo img {
        background-color: #fff;
        width: 130rpx;
        height: 130rpx;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }

    .logo-name {
        text-align: center;
        color: #ff7803;
        margin-top: -140rpx;
        font-size: 32rpx;
        line-height: 94rpx;
    }

    .form {
        width: 450rpx;
        margin: 0 auto;
    }

    .form .inp {
        width: 100%;
        height: 80rpx;
        font-size: 24rpx;
        line-height: 1.5;
        /* text-indent: 70rpx; */
        position: relative;
        padding-bottom: 40rpx;
    }

    .form .inp:hover {
        border-bottom-color: #FF7803;
    }

    .form .inp img {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        left: 10rpx;
        top: 10rpx;
    }

    .form .inp input{
        height: 80rpx;
        margin-bottom: 40rpx;
        border-bottom: solid 2rpx #333;
        padding-left: 80rpx;
    }

    .form .inp input:focus {
        border-bottom: #ff7803;
    }

    .submit {
        font-size: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 50rpx;
    }

    .submit button{
        width: 50%;
        text-align: center;
        height: 60rpx;
        border-radius: 30rpx;
        background-color: #FF7803;
        color: #fff;
        font-size: 24rpx;
        line-height: 60rpx;
    }

    .submit a {
        display: inline-block;
        width: 50%;
        line-height: 60rpx;
        color: #ff7803;
        text-decoration: underline;
        text-align: center;
        font-size: 24rpx;
    }

    .form .inp.verify{
        width: 250rpx;
    }

    .form .resend {
        width: 162rpx;
        height: 60rpx;
        border-radius: 30rpx;
        color: #fff;
        text-indent: 0;
        padding: 0;
        background: #ff7803;
        text-align: center;
        line-height: 60rpx;
        font-size: 24rpx;
        display: inline-block;
        position: absolute;
        top: 0;
        right: -200rpx;
    }

    .form .resend.disabled {
        background: #f6f6f6;
        color: #333;
    }

    .form .inp.psw input {
        position: relative;
    }

    .form .inp.psw img {
        width: 30rpx;
    }

    .form .inp.psw input:after {
        content: '';
        display: inline-block;
        width: 40rpx;
        height: 23rpx;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAXCAYAAAB50g0VAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACs0lEQVRIx63XT6hVVRTH8c+7ZpAFNZCyUw8kDBqYSStpELwGJREVPEkkSAp8RoOSiEprUtaoAl/0bxJFkA2iwqQIo6xAwkGxSCgH2qQQukoE8YqilGpw75PD4zzv3hd/cCbrrPVb333uufusPWEMRcRybMRNuA4rF0n9Bz/gIPZk5ie1vSYqwaZwH6ZxwRhr+wlv4+XMPHHWACNiG27DLWNAdelPfIA3MvPLsQEjYh1ew9qCpgeQmMPlWIc1BXWv4/HM/LUKMCKexY6CBnvwRGYe7fC4Aztx7QiP33BPZn40EjAiAm/i6hGmf2A6Mz8ftYKIeBpPFiz2fcxk5lwnYERsxu4CI7i5BK7l/SnWF6Qew+p5yF7L4K4KuEM1cENtwN8FeZP4OiIaWDKE24K3Kppt7Pf7xzqe0p1N02xqmmau3+8fb9/r9/snm6Y5FzcW+C/HTNM0+yYiYi2+rYD7JTMv7oCbxcOt0KbMfG9BzjU4VNHreM/gxazR4Q64NQvgYFdH7Y/KfuZ5reihqQQ82RG7sCO2rCN2Cv9W9DrVw5ZKwCs7Yl8Nr7Ze6ci7FOdV9Dqnl5nv4KWKopURsaodyMz/DF7+WXyGBzJzZ0dtyTbT1ubT+2BEPIfthYV7M3NDZTMR8fPwKZZofWbuP70PZuYOvFpYPB0Rl1XCPV8Bd0Nm7qe1UQ8hH8RWlIxC+yJidSHcVjxWkHoAU5l5cD4wsYjhJXgXUwWmj2bmrkV8VhgMC/cX+DyTmU8tDI4at7bhBcMvzhl0GB/iG4NxaxLX416j/7XfYfti0/bIgTUirsJDuN1gzjtbSuzOzBfPlFQ88kfEUjyCGawqrevQF5jNzI9LkqvOJC3YW3G3wTs6WVDyPfYaHJxqvvvjAbZAG4NT3RW4COdjKf4aXidwBJmZv4/T43/EC9CRRHUhZwAAAABJRU5ErkJggg==");
    }
.agree {
    margin: 0 auto 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.agree i{
    display: inline-block;
    margin-right: 20rpx;
    width: 35rpx;
    height: 35rpx;
    background-size: 30rpx 30rpx;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAQ0lEQVRIx2NMbL33n2EAANNAWDpq8ciwmAWXxPxqJUZqWIAr14y8oB61eNTiUYtHLR61eNTiUYvhgHG0XT1q8bCzGADuAgnDtGMDTAAAAABJRU5ErkJggg==");
    position: relative;
}

.agree i img {
    width: 34rpx;
    height: 29rpx;
    position: absolute;
    right: 0;
    top: 0;
}

.agree p {
    font-size: 20rpx;
    color: #333;
    line-height: 1.5;
    width: 384rpx;
}

.agree p a {
    display: inline;
    color: #3A6EDB;
}

.create {
    font-size: 0;
}

.create button {
    outline: none;
    width: 510rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: none;
    border: solid 3rpx #cdcdcd;
    color: #cdcdcd;
    font-size: 30rpx;
    line-height: 80rpx;
}

.create button.yes {
    background-color: #FF7803;
    color: #fff;
}

</style>

