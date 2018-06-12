<template>
    <div class="container">
        <user-header></user-header>
        <div>
            <div class="tab">
                <div>全部消息</div>
                <div class="active">会员互动</div>
                <div>系统消息</div>
            </div>
            <div class="options">
                <div @click="toggleOption('all')"><i :class="{selected: all}"></i><span>全选</span></div>
                <div @click="toggleOption('onlyRead')"><i :class="{selected: onlyRead}"></i><span>仅显示未读</span></div>
                <div @click="markRead"><img src="/static/images/mark.png"><span>标记为已读</span></div>
                <div @click="getDelete"><img src="/static/images/delete.png"><span>删除</span></div>
            </div>
            <div class="lists">

                <div v-for="(i, index) in showMessage" :key="index" class="list-item" @click="getSelect(i)">
                    <div class="select"><i :class="{selected: selects[i]}"></i></div>
                    <div class="message"><i :class="{read: messages[i].read}"></i></div>
                    <div class="list-con">
                        <div :class="{read: messages[i].read}">{{messages[i].title}}</div>
                        <p>{{messages[i].time}}</p>
                    </div>
                    <img src="/static/images/arrow.png" class="arrow">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userHeader from '@/components/userHeader'

export default {
  data: function () {
    return {
      all: true,
      onlyRead: false,
      showMessage: [],
      selects: [],
      messages: [{
        title: '您的项目有新的【关注】消息',
        message: '你被关注了',
        read: false,
        time: '2018年5月3日23：06',
        type: 'user'
      }, {
        title: '您有新的项目资料【审核】消息',
        message: '你的审核通过了',
        read: false,
        time: '2018年4月12日14:23',
        type: 'system'
      }, {
        title: '你的项目有新的【关注】消息',
        message: '你被关注了',
        read: true,
        time: '2018年3月30日12:00',
        type: 'user'
      }]
    }
  },
  components: {
    userHeader
  },
  methods: {
    getSelect: function (i){
        let bool = this.selects[i]
        let _selects = [...this.selects]
        _selects.splice(i, 1, !bool)
        this.selects = _selects
    },
    toggleOption: function (opt) {
      if (opt == 'all') {
        this.$data.all = true
        this.$data.onlyRead = false
        // this.showMessage = this.messages
        this.getAll()
      }
      if (opt == 'onlyRead') {
        this.$data.onlyRead = true
        this.$data.all = false
        // this.showMessage = this.messages.filter(item => !item.read)
        let messages = this.$data.messages
        let array = []
        for (let i = 0; i < messages.length; i++) {
          if (!messages[i].read) {
            array.push(i)
          }
        }
        this.$data.showMessage = array
      }
    },
    getAll: function () {
      let messages = this.messages
      let arr = []
      for (let i = 0, len = messages.length; i < len; i++) {
        arr.push(i)
      }
      this.showMessage = arr
      this.selects.length = this.messages.length
      this.selects.fill(false)
    },
    markRead: function () {
        let _selects = this.selects
        let len = _selects.length
        for(let i = 0; i < len; i ++) {
            if(_selects[i]) {
                this.messages[i].read = true
            }
        }
    },
    getDelete: function () {
        let _selects = this.selects
        let len = _selects.length
        for(let i = 0; i < len; i ++) {
            if(_selects[i]) {
                this.messages.splice(i, 1)
                this.getAll()
            }
        }
    }
  },
  created() {
    this.getAll()
  }
}

</script>

<style scoped>
.tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0;
    background: #fff;
    padding: 30rpx 0 20rpx;
}

.tab div {
    text-align: center;
    position: relative;
    width: 33%;
    color: #343434;
    font-size: 30rpx;
    font-family: 'PingFang';
    font-weight: 600;
}

.tab div:after {
   content: '';
   display: block;
   width: 86rpx;
   height: 6rpx;
   background-color: rgba(0,0,0,0);
   border-radius: 3rpx;
   margin: 10rpx auto;
}

.tab div.active:after {
    background-color: #ff7803;
}

.list-item {
    padding: 20rpx 30rpx;
    margin-bottom: 2rpx;
    background: #fff;
}

.list-con {
    flex-grow: 1;
}

.list-con div {
   font-size: 28rpx; 
   color: #333;
   font-weight: 600;
   line-height: 1;
   margin-bottom: 20rpx;
}

.list-con div.read {
    font-weight: 500;
}

.list-con p {
    color: #999;
    font-size: 24rpx;
}

.options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 84rpx;
    background: #fff;
    margin: 0 auto 20rpx;
    padding: 0 30rpx;
    font-size: 24rpx;
    color: #333;
}

.options div {
    display: flex;
    align-items: center;
}

.options img {
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
}

.options div i {
    display: inline-block;
    width: 28rpx;
    height: 28rpx;
    margin-right: 8rpx;
    background-size: 100% 100%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU2RDIwNTMxNTFDMDExRThBQzE2RTk4MjAzMjA0NjFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU2RDIwNTMyNTFDMDExRThBQzE2RTk4MjAzMjA0NjFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTZEMjA1MkY1MUMwMTFFOEFDMTZFOTgyMDMyMDQ2MUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTZEMjA1MzA1MUMwMTFFOEFDMTZFOTgyMDMyMDQ2MUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6mOeAXAAABxklEQVR42mJkIA6YAbErENsAsQEQS0DFPwDxOSA+CsT7gPgAA4XAF4iPAPF/NHwfiO8C8S808RtAHEOORaJAvA3JoP1AHAHEkljUigGxPxBvQlJ/CojVibXMCIi/QTXuBGJdEhyqAMRLkSz2I6RBD0lxMQVREYNkjhsuRRxA/BWqKIKBcmCLZKkSNgX7qOAzdOCPlMhQgD1U4ggD9cFyqNmpyIIXoYLiNLCQFWr2ByibQR8qcJKBdmAe1A5QEDPUIXNoBDSgdixmgOY1EIeHgbYAZMdTWHn4m4H2AJRS/zMBCX4gfkwHCx+ACCYo5w8dLPwHY4DKze90sPAGNB4ZDkIZnHTw4RsmpNLFnoaWyQIxI7T4ZLCC+nA3DS1sg9oBr5wfQgW4aGQhqBb6C8Tc6KX6OhpY1giNvyp0iatQSyOpXKSBcsAnpCwIB9JIFaYNFSyTAuJ3UPMscSnyQbI0mALLDIH4I9ScZEKKPZAsnQ/EIiRYxA7EzdCyGaQ/hViNoJbaTSSLZ0Fbc0w41GsBcSe0iASpfwvETuQETTZSPMDwPSA+DG1l38TSSK6iRqkFis8FQHwHiwWgmmYZEMcBMS8hgwACDACkXIxk02UbpQAAAABJRU5ErkJggg==");
}

.options div i.selected {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMzYxMzcwNTFDMDExRTg5N0U1RDk2QTc4MzQxMDY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYyMzYxMzcxNTFDMDExRTg5N0U1RDk2QTc4MzQxMDY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjIzNjEzNkU1MUMwMTFFODk3RTVEOTZBNzgzNDEwNjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjIzNjEzNkY1MUMwMTFFODk3RTVEOTZBNzgzNDEwNjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6WonERAAACYklEQVR42qyWT0hVQRTG73uiPZVwU/ZSwqAoESyRsIgkMAwXmZAQKCKEuRCXQQsXLoJo0apduEhB+4MLFy2EkDTsVaBQigTZP4sSJVBEoaDS5zfyXTke5j7fe/MGfnDnzJnz3XvnzJkJecm1KlALzoEKEKV9BbwFr8AoeOE5tnoQA3HFHPgC/ir7B9CSjtB+MCwCjYEmUGTxLQQN4KnwnwDHkxWrBL858RkoT+FFD4OHQvjybhNOCOcbDkvRIuJclAMh8RwBSyCPv++JJdBVcBoUgzBYAFNgAPxTvtVgnM9HwFcdbDTBl3UwIeIB/ABdlnkNIsl2tPMciFkm9ScQ0jwHe9T8xxxrl8ZpGqMBzqmg92I27St89k7SMKkcr6Uh5nNLxXpAu/nFXjc7V5TTooOg4YCIVUqbWZ6tvWY6e4VDo6NY3JJExjYfZpr/B2ti8ILn3s6o/jdTqYxgAdNatmgGBA9aBLc2r8cvlC2cAUEdY8M3/gGH1OCvDAjqGMW+4CTLWq4YfJ0BwXeqf4yl07vNDKoTgzncqC5ZWiLildA2aDpn2RlRb3TTQaxHxbpL+/bh/J2GPOU4nobYR7+EiWZuBusgX1f1IUsdHElBbMayHe4FFALvPQeaLAlwh9mcSOw+yFLzTnFs1d8mIZW2P8XhGbOkdTNvcEUMsMgD+BH4pPyP8gzNYp68saXyJfHGjQ5bopprZuK07eZcJ0R7wb4UhCIiIw3Xk51obmqzKs0rE5S8Mgr5X2U2eE06v6YTLKvkMJehlzzZZwOOpVzXMmXWsw98DrhAmaRpVWeqtW0KMABRKSaCZ/osigAAAABJRU5ErkJggg==");
}

.list-item {
    display: flex;
    align-items: center;
}

.list-item .arrow {
    width: 21rpx;
    height: 36rpx;
}

.list-item .select,
.list-item .message{
    width: 40rpx;
    height: 40rpx;
    margin-right: 40rpx;
}

.list-item .select i,
.list-item .message i {
    display: block;
    width: 40rpx;
    height: 40rpx;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center center;
}

.list-item .select i{
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU2OEMxQTFENTFDMzExRThBNjhCREE2M0RGNzlEQTU2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU2OEMxQTFFNTFDMzExRThBNjhCREE2M0RGNzlEQTU2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTY4QzFBMUI1MUMzMTFFOEE2OEJEQTYzREY3OURBNTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTY4QzFBMUM1MUMzMTFFOEE2OEJEQTYzREY3OURBNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz565QFXAAABMElEQVR42uyYv4rCQBCHd2MsThFBBJtrrO3c1CJn4Rv4Bl5lcW+hpY9ga2Nt3iHcdddcLwpylaj4L/ebM5FFUkoyyAx8O2Q3kI/dLOyONsaUlVIT0FG84gu8u2imoKv4RQv47p3cEczBEuSATkkmBCdQAW1QjfpfSXALCmADmuAni+kKguA/e55Hkt+gBnYOmnP0jp+V3J3oL9IofnassTWj/28ZZW0L5hkJviTNoGYkqJMEOcWFu+CJu+BBlvhRwVVQyww+u2COu2Ceu6Aru1h2sQiKoAiKoAiKoAimLnhg5LVPEiwxEixGOXQsyTdQZiL4cTu5GmNCa2AFxmBhX1xSirgE3AeNuI/O/p/qWvqloLLrkNFSb0iwB2agbt0HsqgV0jepJhOvKFVZB38CDAAVUzAV2T4HggAAAABJRU5ErkJggg==");
}

.list-item .select i.selected {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY4ODgyMUI4NTFDMzExRThCRjVFQTczRTAzMUU5QzQwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY4ODgyMUI5NTFDMzExRThCRjVFQTczRTAzMUU5QzQwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njg4ODIxQjY1MUMzMTFFOEJGNUVBNzNFMDMxRTlDNDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njg4ODIxQjc1MUMzMTFFOEJGNUVBNzNFMDMxRTlDNDAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4IfJwtAAACK0lEQVR42uyYzSsEYRzHZ9ZSVtqScnFxobzb2VxImy3kD+AfwEkiHJ2JkruLKwe5iBVH5bChFCG1lrxEXrJeWtb6Pvympm3e1jLPkzz1mWfmmWebT79nn5nf88iKonglSZoBQUmssgV63DjMglZJvNIEQu4UuVewDC5AFpAdkkmCN1AAAqCQ2ouZ4BPwgBjwgUMe4QqHw5+13+9nkrugCDy7cEhQnxAvuRTRG1Rj6rVLc+9aoP/fBdWyVjBbIMFcvQjKAgnKeoJCFl6COXafzUNwEETBMeiy6ux2WG4SDGiup0EErIoQwVQ5tfSJMMRGcqxs8BY0k2OftFGeguMmcvvs00uJAhdBJjdsIlfHkgFes9hsWCN25dKNoOcH5KKU0j3bfagdwXZwAE7BRAZyJ6AW3KYzFFZDXAYWNddDFIFgmnJX35GzE8GATlszWEtDjuWZNeDmN5KFqEE7k1yi8xETObacqAbn351tVkO8QrTo3Guj10WpwW/joCETOTsRTNCqb93gvpHcA6gC207lg41g02bfR3rPHTidsNaDPYs+cep3xCOjTtArJmIi56cEgFvK/0LDd6ozW5ncjghrkjtQCeZoEiyA8t+QyyRZuAedf3lV9y/IRTAukNeLnmC+QIJ5VCddGkmWoXgFEexXT2RFUbSrqkswBc6kry1gJ4u6BdwNKtQ2NyUBPmooslqnOlxiTLADzIMSNaoSn71C9sx3zTqZ7bL2fggwAF9idC4hyw6UAAAAAElFTkSuQmCC");
}

.list-item .message i {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAaCAYAAADfcP5FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4MEQ3OUMwNTFDMzExRTg4OEMxQjNFQUJERTc2REZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4MEQ3OUMxNTFDMzExRTg4OEMxQjNFQUJERTc2REZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzgwRDc5QkU1MUMzMTFFODg4QzFCM0VBQkRFNzZERkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzgwRDc5QkY1MUMzMTFFODg4QzFCM0VBQkRFNzZERkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7GRPibAAACxUlEQVR42sSWa0gUYRSGZ7cti4QIUipCwuhKaLJbVmChEQYGSVEoQYmo0QWFTMPIQCQqShEyAyGiflSU3YwksyCKCnQLI4n8EQmCFpWEgj/KtPfAu3AYHGfXZrYDz875dr/Zffebc/P4/X6DtgOUgBVgBIwZ7psXeEAXqAsGg80eCroE8o3/b2d9eMlQYkZBGegGs6Ig4AdIBVVcl4mgg6YjXAtqo3gqRcofFAFLuTgO+sFO8DJKYt6C7eAjaAAxIugPP6zl8YmtB3ddFvMUpNBPA7fNgtaBXmabWDaD3Q27xtgV24Ls+o7r6lDMhGwKr3fAPvoS7BccFnMF5NLfDTGt9MfMgkaV3wiq6R8Ax5xKa7CHfilPyrASZLYT4Dz9k6DwH8WUgyP0T1tlstfmS4rVI2tkBk7G8sAZlTwVE5VuOzsEbtG/CTIjFCPJcVnFT6ldLwnHdoFn9B+xeIZjmap8tPCkDCcEiaWDZvqvQaLN/pUUL9YEssLttpHYfeVLNV9gsS8BtKt1UyTtP5LAvKjWc8ETEGfaF0+xM9R7V0GOk4IOMzCn8cul5A+zD7aBOdw3n7EmJ/cNrGEMyX3XwX4nBNWBGvrSSvaCTpZ6KabJ4DNP6xNYzgFPBq0ONs8bvL+BNWjSgh5wihSrBAXqsw88gS8gFmwC09kPU3gNWa4SchTcs/pBn/I9yp8JHoKNXEvrODXO/W/42Ir4mHpZQIfG2VvBk5MxZxv/bLZq7paC5oEXYBHXBTZdfxCcCzMWK3mi9WCrZGIgENiMBjsQ0iIz9XvWjFh2/B4wm/9GTuiVC+OHzD/P6fexpm0AjyWGfqlO/I5iZHJc7JIYg09gGRhgZgbZvH97Of8YTMmFopKbelyeGLsZHm18QtK4p/rYzavUgCaiWlng3LZ+FatiX0XQT5DEVJTqu4REw1bxOsRYyvorwAD095lgbSZcAgAAAABJRU5ErkJggg==");
}

.list-item .message i.read {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1MDNFN0E3NTFDMzExRTg5NEZBRjM0MkRFMkVERjQ1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ1MDNFN0E4NTFDMzExRTg5NEZBRjM0MkRFMkVERjQ1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDUwM0U3QTU1MUMzMTFFODk0RkFGMzQyREUyRURGNDUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDUwM0U3QTY1MUMzMTFFODk0RkFGMzQyREUyRURGNDUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7c4Yt1AAAC7klEQVR42sSXa4hMYRjHz57GLWR9UG4plyIpZcYHd+uyKNdll1xyaT/IBwoRSoiiVlFKkkKxrM26pV0ss0tuTeITtQ1RUgi5bpZZ/0f/U4+3M7NnZs45nvo1zznzzpn/+7zP+7zPKYhGo5ZhQ8AOMAl0tIKxVvAA7EokEnf0FwWGoP4gKfet8KwYoq6nE3QKLOYMLoK3oJ3PAn6BzqCEK/BKAgFRKfkyYgyeyM9aMC/gyGwDu0E/MBA0yU3bRb3YmxCW6qXyPzqOFjQYtKffKQRBXZU/1RS0BzwDPUNM5lbln47FYg0gIoIkq7cagz+HIOi9cT0elIugWS6DR4YgaLnLvWG22tayxe/RHwHiAYq5AGbSvwLu0/8tglpUIo8GR3g9ATQGIOY8mEO/DvVHVugTr1O2kfUSrdWcgdg4nyNVpeqbHBnT6Q9w2/YWi5TFH11Wkbrhg5hqUEr/Nifr2M90glqUP1uJmgzq8xBTCebTj3NHuZrdxoNEVA19Of3rcsyZRWqZijINtj08sERFqjjLSJ1VOVNvLFPOgpxIVapI1XpoUS6BMvrSXkzx8kd2FrOVtuQJ/WlMzEy7ySm4TYys5beg7Xp7wsZw93VwEVOqrnuDA34LOgh2sladABVq9z0C3fisGiXmMJNYmrF14IyXP4p4GLMfrKV/E6yg3wssAUPBC/AN9OV3x8EaPv8pGAQWgkJVDHOKkIhZT7+REXFsKThHv7sScwysVA2fnIuPVe5dzUaQjliFEhNnxTatjDOXXXeNfrkx5gtbnASvZ2Q6I80le8fPvWCDx2JWRTJZii3NLfbtUo/u8jC3VKf6T4R+cDabwOY0Z06+VsSaJDYKNNBPakFOlD6Ak2CflzMnn/cwvmL97RLRtsqkezh6bBWlPmAZ/UNtnTl52lymRDMYC2JOCkVY3LaowbJ9X4ONoEtAgprZt383XteTzptrtWoP/pc9B8Od/FkAjrJOFIYsRFbkIViFdvbrHwEGACjXnguerxG+AAAAAElFTkSuQmCC");
}
</style>


