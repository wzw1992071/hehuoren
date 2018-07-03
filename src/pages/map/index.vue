<template>
    <div class="map">
      <map id="map"
           :longitude="chengdupoints.lng"
           :latitude="chengdupoints.lat"
           scale="14"
           :markers="markers"
           show-location
           style="width: 100%; height:100%">

      </map>
    </div>
</template>

<script type="text/ecmascript-6">
    import {loadMapHhr,loadMapXm} from '@/apis/index'
    export default {
        name: '',
        data(){
          return{
            id:"",
            type:"",
            points:[],
            scale:14,
            markers:[],
            chengdupoints:{
              lat:'30.5848738084',
              lng:'104.0770741491'
            },
          }
        },
        methods:{
          loadPoint(){
            if(this.type==1){
              loadMapXm({
                id:this.id,
                separate:1
              }).then(res=>{
                this.points = res.data.baiduMapJS||[];
                this.pointTrans(1);
              })
            }else{
              loadMapHhr({
                id:this.id,
                separate:1
              }).then(res=>{
                this.points = res.data.baiduMapJS||[];
                this.pointTrans(2);
              })
            }
          },
          pointTrans(type){
            let marks = [];
            for(let i=0;i<this.points.length;i++){
              marks.push({
                iconPath: "/static/images/gps.jpg",
                id: i,
                latitude: this.points[i].lat,
                longitude:this.points[i].lng,
                width: 10,
                height: 14,
                label:{
                  content:type===1?"预期项目地址":"合伙人预期地址"
                }
              })
            }
            this.markers = marks;
          }
        },
        onLoad: function(option){
          this.id = option.id;
          this.type = option.type;
          this.loadPoint();
        }
    }
</script>

<style scoped>
  .map{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
