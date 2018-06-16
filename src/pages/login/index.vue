<template>
    <div class="login">
        <div class="login-con">
            <div class="logo">
                <div class="logo-con">
                    <img src="/static/images/logo-yellow.png" alt="">
                </div>
            </div>
            <div class="logo-name">登陆</div>
            <div class="form">
                <div class="inp">
                    <img src="/static/images/iconPhone.png" alt="">
                    <input type="text" v-model="login_param.tel" placeholder="请输入电话号码">
                </div>
                <div class="inp psw">
                    <img src="/static/images/iconPassword.png" alt="">
                    <input type="password" v-model="login_param.psd" placeholder="请输入密码">
                </div>
                <div class="submit">
                    <button type="submit" @click="login">登陆</button>
                    <a href="/pages/sign/main">注册</a>
                </div>
                <a href="/pages/index/main" class="change">修改/忘记密码</a>
            </div>
        </div>
    </div>
</template>

<script>
// import user from '../../utils/request.js'
export default {
    data(){
        return {
            login_param:{
                tel:"",
                psd:"",
                separate:1
            },
            isLogin: this.$store.getters.isLogin
            
        }
    },
    methods:{
        login: function() {
            let _tel = this.tel;
            let _psw = this.psw;
            let params = new URLSearchParams();
            params.append("separate", 1);
            this.$store
                .dispatch("Login", {
                tel: _tel,
                psw: _psw
                })
                .then(() => {
                let _token = this.$store.getters.token
                if(_token) {
                    params.append("token", _token);
                    let _afterLogin = this.afterLogin
                    _afterLogin(params)
                } else {
                    Toast('请输入正确的用户名和密码');
                }
            })
        },
        afterLogin(params){
            request({
                url: "/member",
                method: "post",
                data: params
            }).then(res => {
                if (res.data && res.data.rosData) {
                this.$store.dispatch("SetUserinfo", res.data.rosData);
                }
            })
        },
},
mounted (){
    console.log(1)
}
}
</script>

<style>
    body, page {
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
        height: 80rpx;
        font-size: 24rpx;
        line-height: 1.5;
        text-indent: 70rpx;
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

    .form .inp.psw img{
        width: 30rpx;
    }

    .form .inp input{
        height: 80rpx;
        margin-bottom: 40rpx;
        border-bottom: solid 2rpx #333;
        padding-left: 120rpx;
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

    .change {
        font-size: 24rpx;
        color: #cdcdcd;
        text-align: center;
        text-decoration: underline;
    }

</style>


