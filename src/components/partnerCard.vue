<template>
<div>
    <alert :text="alertText" v-if="alert"></alert>
    <div class="partner-card" >
       <div class="info">
           <!-- <div class="avatar">
               <img :src="avatar">
           </div> -->
           <div class="avatar" :style="{backgroundImage: 'url('+(info.icon?baseUrl+info.icon:avatar)+')'}">
           </div>
           <div class="user-info">
               <h2>{{info.truename?info.truename:name}}</h2>
                <p>粉丝数：{{info.fensi?info.fensi: fansNumber}}</p>
           </div>
        </div> 
        <div class="subinfo">
            <p>邀请TA</p>
            <p>{{level}}</p>
        </div>
        <div class="opts">
            <div @click="concern" :class='{no_concern: info.guanzhu_css_class != "no_guanzhu"}'>
                <img src="/static/images/concer.png" alt="">
                <span>{{info.guanzhu_css_class == "no_guanzhu"? "关注" : "已关注"}}</span>
            </div>
            <div @click="roadshow">
                <img src="/static/images/roadshow.png" alt="">
                <span>报名路演</span>
            </div>
            <div @click="partnership">
                <img src="/static/images/partnership.png" alt="">
                <span>合伙经营</span>
            </div>
            <div @click="leader">
                <img src="/static/images/leader.png" alt="">
                <span>领头</span>
            </div>
        </div>
        <div @click="collect" class="collect"><img src="/static/images/collect.png"></div>
        <Invite v-if="next" :info="infos" @close="close" @invite="invite"></Invite>
    </div>

</div>
</template>

<script>
import Alert from '@/components/alert'
import service from '@/utils/request';
import Invite from "@/components/Invite";
// import MessageBox from '@/components/message-box'
export default {
    props: ["info"],
    data: function () {
        return {
            baseUrl: this.$store.getters.baseUrl,
            avatar: '/static/images/avatar.png', // 头像
            name: 'Arthur', // 名字
            fansNumber: 200, // 粉丝数
            level: '一般合伙人', // 合伙人
            alert: false,
            alertText: '',
            isConcern: false,
            isLogin: this.$store.getters.isLogin,
            userid:1,
            // userid: this.$store.getters.userInfo.userid,
            token: this.$store.getters.token,
            next: false,
            infos: {},
        }
    },
    methods: {

        //跳转
        gotodetails() {
            this.isLogin
            ?wx.navigateTo({
                //暂缺页面
                url:`/pages/hehuorendetails/main?id=${this.info.userid}`
            })
            :wx.reLaunch({
                url:`/pages/login/main`
            })
        },
        // 收藏
        collect: function () {
            let that=this
            if(!this.concerned){
                wx.showModal({
                    title: '提示',
                    content: '是否关注该合伙人？',
                    success: function(res) {
                        if (res.confirm) {
                         that.collectRequest()
                        } else if (res.cancel) {
                        console.log('用户点击取消')
                        }
                    }
                })
            }else{
                wx.showModal({
                    title: '提示',
                    content: '24小时之内将不能再次关注，是否决定取消？',
                    success: function(res) {
                        if (res.confirm) {
                         that.collectRequest()
                        } else if (res.cancel) {
                        console.log('用户点击取消')
                        }
                    }
                })
            }
        },
        collectRequest(){
            let that= this
            let params = {}
            let flag = 0
            flag = this.concerned ? 4 : 1
            params.token =this.token
            params.separate=1
            params.id=this.info.userid
            params.type=2
            params.flag=flag
            service({
                url: '/Member/guanzhu',
                method: 'post',
                data: params
            }).then(res => {
                if(res.status == 1) {
                that.concerned = !that.concerned
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                    duration: 2000
                })
                } else if(res.status == -4) {
                    wx.showModal({
                        title: '提示',
                        content: '是否立即提升？',
                        success: function(r) {
                            if (r.confirm) {
                                wx.navigateTo({
                                    url: '/pages/projectModification/main'
                                })
                            } else if (r.cancel) {
                                 wx.showToast({
                                    title: res.msg,
                                    duration: 2000
                                })
                            }
                        }
                    })
                }
            })

        },
         // 邀请
        invite: function () {
            console.log('invite')
        },
        // 关注
        concern: function () {
            // // 成功
            // let _text = this.isConcern
            // ? "您已成功关注该合伙人"
            // : "您已取消对该合伙人的关注"
            // this.alertText = _text
            // this.alert = true
            // this.isConcern = !this.isConcern
            // setTimeout(() => {
            //     this.alert = false
            // }, 1000);
            // // 失败 待补
            console.log(2)
            let that = this;
            this.baseRequest(1).then(res => {
                if (res.status == 1) {
                    that.infos = Object.assign( {}, { lists: res.reres }, { title: "关注" })
                    that.next = true;
                } else if (res.status == -2) {
                    that.createProject(res.data);
                } else {
                    console.log(res)
                }
            });
            
        },
        // 邀请领头
        leader: function () {
            console.log('leader')
        },
        // 邀请合伙
        partnership: function () {
            console.log('partnership')
        },
        // 邀请路演
        roadshow: function () {
            console.log('roadshow')
        },
        // 底部统一封装
        baseRequest(type) {
            let params = {};
            params.token =this.token;
            params.separate =1;
            params.type=type
            params.nowUserid=this.userid;
            params.to_userid = this.info.userid;
            return service({
                url: "/xiangmu/myxiangmu",
                method: "post",
                data: params
            })
        },
        createProject(msg) {
            wx.showModal({
                title: '提示',
                content: `${msg},是否立刻创建项目`,
                success: function(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url:`/pages/projectData/main`
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消') 
                    }
                }
            })
        },
    },
    components: {
        Alert,
        Invite
        // MessageBox
    },
    created() {
        console.log(this.info)
    },
}
</script>

<style scoped>
.partner-card {
    position: relative;
    box-sizing: border-box;
    margin: 30rpx auto 20rpx;
    width: 690rpx;
    padding: 60rpx 25rpx 0;
    background: #fff;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx #eee;
}

.info {
    display: flex;
    align-items: center;
    padding: 0 40rpx;
}

.info .avatar {
    width: 150rpx;
    height: 150rpx;
}

.info .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.user-info {
    margin-left: 27rpx;
}

.user-info h2 {
    font-size: 32rpx;
    color: #343434;
    margin-bottom: 17rpx;
}

.user-info p {
    font-size: 26rpx;
    color: #999;
}

.subinfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 22rpx;
    width: 100%;
    height: 50rpx;
    margin-bottom: 10rpx;
}

.subinfo p:first-child {
    color: #cbcbcb;
}

.subinfo p:last-child {
    color: #ff7803;
    line-height: 1;
    padding: 5rpx 20rpx;
    border-radius: 10rpx;
    border: solid 2rpx #ff7803;
    align-self: flex-start;
}

.opts {
    padding: 0 30rpx;
    height: 80rpx;
    border: solid 2rpx #f6f6f6;
    border-width: 2rpx 0 2rpx 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24rpx;
    color: #333;
}

.opts div {
    display: flex;
    align-items: center;
}

.opts div img {
    width: 28rpx;
    height: 26rpx;
    margin-right: 6rpx;
}

.collect {
    position: absolute;
    top: -5rpx;
    right: 50rpx;
    width: 70rpx;
    height: 70rpx;
    box-shadow: 0 0 10rpx #999;
    border-bottom-left-radius: 10rpx;
    border-bottom-right-radius: 10rpx;
}

.collect img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 56rpx;
    height: 56rpx;
}

</style>


