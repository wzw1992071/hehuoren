<template>
    <div class="container">
        <user-header></user-header>
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
        </div>

        <!-- should v-for -->
        <project-card :gray="1" @event="navigation"></project-card>
        <project-card :gray="1"></project-card>
        <project-card :gray="1"></project-card>
    </div>
</template>

<script>
import userHeader from "@/components/userHeader";
import projectCard from "@/components/projectCard";

export default {
    data: function () {
        return {
            tabs: ['发布的', '关注的', '洽谈的', '合伙中'],
            active: [true, false, false, false]
        }
    },
    components: {
        userHeader,
        projectCard
    },
    methods: {
        getActive: function (i) {
            let arr = [false, false, false, false]
            arr[i] = true
            this.active = arr;
        },
        navigation: function () {
            try {
                wx.navigateTo({
                    url: '/pages/projectdetails/main'
                })
            } catch (e) {

            }
        }
    }
}
</script>

<style>
page {
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

</style>


