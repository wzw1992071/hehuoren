<template>
    <div class="inputs">
        <div v-if="type == 1" class="type-one type" :class="{istip: tip}">
            <div class="title">{{title}}</div>
            <input type="text" class="text" :placeholder="text" v-model="val" @change="change">
        </div>
        <div v-if="type == 2" class="type-two type">
            <div class="title">{{title}}</div>
            <input type="text" class="text" :placeholder="text" v-model="val" @change="change">
            <span class="measurement">{{ measurement }}</span>
        </div>
        <div v-if="type == 3" class="type-three type" @click="toggleShow">
            <div class="title">{{title}}</div>
            <div class="text">{{text}}</div>
            <div class="arrow"><img src="/static/images/arrowDownFine.png"></div>
        </div>
        <option-card
            v-if="type == 3 && show "
            :lists="options"
            :title="optionsTitle"
            @close="close"
            @selected="getVal"
        ></option-card>
        <div class="tip" v-if="tip">{{tip}}</div>
    </div>
</template>

<script>
import optionCard from '@/components/optionCard'

export default {
    props: ['info'],
    data: function () {
        return {
            // 弹出选项列表显示状态
            show: false,
            type: 1,
            // type 1, type 2, type 3
            title: '',
            // type 1, type 2
            text: '',
            // type 2
            measurement: '',
            // type 3
            optionsTitle: '',
            options: ['', '', ''],
            // 值
            val: '',
            // 值的接收者
            handler: '',
            tip: ''
        }
    },
    components: {
        optionCard
    },
    methods: {
        change: function () {
            this.$emit('change', {
                val: this.val,
                handler: this.handler
            })
        },
        toggleShow: function () {
            this.show = !this.show
        },
        close: function () {
            this.show = false
        },
        getVal: function (val) {
            this.text = val
            this.$emit('change', {
                val: this.text,
                handler: this.handler
            }) 
            this.close()
        }
    },
    created () {
        let _info = this.info
        if(_info) {
            this.type = _info.type ? _info.type : this.type
            this.handler = _info.handler ? _info.handler : this.handler
            this.measurement = _info.measurement ? _info.measurement : this.measurement
            this.options = _info.options ? _info.options : this.options
            this.text = _info.text ? _info.text : this.text
            this.text = _info.options ? _info.options[0] : this.text
            this.title = _info.title ? _info.title : this.title
            this.optionsTitle = _info.optionsTitle ? _info.optionsTitle : this.optionsTitle
            this.tip = _info.tip ? _info.tip : this.tip
        }
    }
}
</script>

<style lang="less" scoped>
.inputs {
    > .type {
        width: 100%;
        height: 140rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30rpx;
        box-sizing: border-box;
        border-bottom: solid 2rpx #f6f6f6;
        .title {
            font-size: 26rpx;
            color: #333;
            font-weight: 600;
        }
        .text {
            font-size: 26rpx;
            color: #333;
            height: 100rpx;
            line-height: 100rpx;
        }
    }
    .type-one {
        .title {
            flex-grow: 1;
        }
        .text {
            text-align: left;           
            flex-grow: 2;
        }
    }
    .type-two {
        .title {
            flex-grow: 1;
        }
        .text {
            text-align: right;
            flex-grow: 2;
        }
        .measurement {
            display: block;
            margin-left: 20rpx;
            font-size: 26rpx;
            color: #333;
        }
    }
    .type-three {
        .title {
            flex-grow: 1;
        }
        .text {
            text-align: left;
            flex-grow: 2;
        }
        .arrow {
            font-size: 0;
            width: 36rpx;
            height: 20rpx;
            img {
                width: 36rpx;
                height: 21rpx;
            }
        }       
    }
    > .istip {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30rpx 0;
        box-sizing: border-box;
        border-bottom: 0;
        height: 80rpx;
        .title {
            font-size: 26rpx;
            color: #333;
            font-weight: 600;
        }
        .text {
            font-size: 26rpx;
            color: #333;
            height: 50rpx;
            line-height: 50rpx;
        }
    }
    .tip {
        border: solid 2rpx #f6f6f6;
        border-width: 0 0 2rpx;
        font-size: 24rpx;
        color: #ccc;
        line-height: 1.5;
        padding: 0 30rpx 30rpx;
    }
}
</style>
