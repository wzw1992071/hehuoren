<template>

<div class="invite" @click.self="close">
    <div class="card">
        <div class="title">
            <div class="text">选择一个项目({{info.title}})</div>
            <div class="close" @click="close">
                <img src="/static/images/close.png">
            </div>
        </div>
        <div class="content">
            <div class="item" v-for="(item, index) in info.lists" :key="index" @click="invite(item)">
                <span
                    class="grade"
                    :class="{
                        green:item.gread.includes('展示'),
                        origin: item.gread.includes('预热'),
                        red: item.gread.includes('热门')
                    }"
                >{{item.gread}}</span>
                <span class="project">{{item.title}}</span>
                <span class="isInvite" :class="{active: !item.showYaoQing.includes('已')}">{{item.showYaoQing}}</span>
            </div>
        </div>
    </div>
</div>

</template>

<script>
// import MessageBox from '@/components/message-box'
export default {
    props: ['info'],
    data: function() {
        return {

        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        invite(item) {
            let msg
            switch (this.info.title) {
                case '关注':
                   msg = '是否确定关注该项目？主动关注更多项目，也会得到更多项目方对您的关注！' 
                    break;
                case '邀请领头':
                    msg = `项目方最坚定、可信的合伙人，长远发展的战略伙伴。为其他合伙人树立榜样，建立信心。是否确定领头该项目？`
                    break;
                case '邀请股本合伙':
                    msg = `主要以货币形式参与合伙运营。获得更多利益分成、开拓眼界、更新思维、搭建新的资源圈、更多了解国家宏观经济形势，是否确定通过股本合伙参与该项目？`;
                    break;
                case '邀请消费合伙':
                    msg = `以少量资金参与合伙、降低风险、注重合伙体验。更加适合入门级平台会员。是否确定通过消费合伙参与该项目？`;
                    break;
                case '邀请路演':
                    msg = `与项目方面对面交流，更加全面真实了解项目详情。是否确定参加该项目线下路演？`;
                    break;
                default:
                    break;
            }
            wx.showModal({
                title: '提示',
                content: msg,
                success: function(res) {
                    if (res.confirm) {
                        // action => {this.$emit('invite', item)}
                    } else if (res.cancel) {
                        return false
                    }
                }
            })
            // MessageBox.confirm(msg).then(action => {
            //     this.$emit('invite', item)
            // }).catch(e => {
            //     return false
            // })
        }
    },
    mounted() {
        console.log(this.info)
    },
}
</script>

<style lang="less" scoped>
@origin: #ff7803;
@green: #3adb99;
.invite {
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);
    .card {
        font-family: 'PingFang';
        width: 6rem;
        height: 8rem;
        background: #fff;
        border-radius: .2rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        .title {
            padding: 0 .2rem;
            border-top-left-radius: .2rem;
            border-top-right-radius: .2rem;
            height: .88rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(245, 245, 245, 1);
            .text {
                font-size: .3rem;
                color: #333;
                font-weight: bold;
            }
            .close{
                position: relative;
                width: .3rem;
                height: .3rem;
                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    width: .3rem;
                    height: .3rem;
                }
            }
        }
        .content {
            padding: 0 .2rem;
            .item {
                display: flex;
                align-items: center;
                height: .8rem;
                border-bottom: solid .02rem rgba(244,244,244,1);
                span {
                    display: inline-block;
                }
                .grade {
                    font-size: .22rem;
                    border: solid .02rem @origin;
                    padding: 0 .02rem;
                    border-radius: .02rem;
                    color: @origin;
                    margin-right: .2rem;
                }
                .grade.origin {
                    border-color: @origin;
                    color: @origin;
                }
                .grade.green {
                    border-color: @green;
                    color: @green;
                }
                .grade.red {
                    border-color: #f00;
                    color: #f00;
                }
                .project {
                    font-size: .3rem;
                    color: #333;
                }
                .isInvite {
                    font-size: .26rem;
                    color: #999;
                    margin-left: auto;
                }
                .isInvite.active {
                    color: #f00;
                }
            }
        }
    }
}
</style>

