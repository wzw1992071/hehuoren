<template>
    <div class="modify-header">
        <h1>{{text?text.title:''}}</h1>
        <p>{{text?text.intro:''}}</p>
        <p>{{text?text.other:''}}</p>
    </div>
</template>

<script>
export default {
    props: ['text'],
    created () {
    }
}
</script>

<style scoped lang="less">
.modify-header {
    background: #fff;
    padding: 40rpx;
    text-align: center;
    margin-bottom: 26rpx;
    h1 {
        color: #ff7803;
        font-size: 30rpx;
        margin-bottom: 20rpx;
        font-weight: 600;
    }
    p {
        font-size: 24rpx;
        line-height: 1.5;
    }
}

</style>


