<template>
    <div class="container">
        <user-header></user-header>
        <div>
           {{msg}}
        </div>
    </div>
</template>
<script>
    import userHeader from '@/components/userHeader'
    import service from '@/utils/request';
    export default {
        data(){
            return{
                id:'',
                type:'',
                msg:''
            }
        },
        components: {
            userHeader
        },
        computed:{
        
        },
        methods: {

        },
        onLoad(option){
            this.id = option.id;
            this.type = option.type;
            this.msg = option.msg;
        },
    }
</script>

<style scoped>


</style>