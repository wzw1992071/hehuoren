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
          v-if="type == 3"
          :show.sync = 'show'
          :lists="lists"
          :title="optionsTitle"
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
            val: '',
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
        getVal: function (target) {
            if(this.type==3){
                this.text=target

//                this.$emit('change', {
//                    text: target.name,
//                    handler: this.handler,
//                    val:target.value
//                })
            }else{
                this.$emit('change', {
                    text: this.text,
                    handler: this.handler,
                })
            }

        }
    },
    computed:{
      'type': function () {
        let _info = this.info;
        return _info.type ? _info.type : 1
      },
      'handler': function () {
        let _info = this.info;
        return _info.handler ? _info.handler : ''
      },
      'measurement': function () {
        let _info = this.info;
        return  _info.measurement ? _info.measurement : ""
      },
      'options': function () {
        let _info = this.info;
        return _info.options ? _info.options : []
      },
      'text': function () {
        let _info = this.info;
        return _info.options
          ? _info.options[0]
            ? _info.options[0].typename
              ? _info.options[0].typename
              : _info.options[0].code
                ? _info.options[0].code
                : _info.options[0]
            : _info.text
          : _info.text
      },
      'title': function () {
        let _info = this.info;
        return _info.title ? _info.title : ""
      },
      'optionsTitle': function () {
        let _info = this.info;
        return _info.optionsTitle ? _info.optionsTitle : []
      },
      'tip': function () {
        let _info = this.info;
        return _info.tip ? _info.tip : ''
      },
      'lists':function () {
        let _info = this.info;
        return _info.options
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
