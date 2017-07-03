<template>
  <div id="app">
    <div class="Header_head">
      <span class="Header_logo"></span>
      <div class="weizhi">
        <span id="wxb">
          <img src="./assets/lun/wxb.png" alt="">
        </span>
        <span @click="setInt">{{area.city_name}}</span>
        <span id="xian"></span>
        <span @click="setWea">{{area.weather?area.weather.temperature:''}} 度</span>
        <span id="duoyun">
            <img src="./assets/lun/duoyun.png" alt="">
        </span>
      </div>
    </div>

    <div id="sou" v-show="memeda">
        <el-input
        placeholder="请输入要查询天气的城市"
        icon="search"
        v-model="cityname"
        @change="getWeather" class="put">
        </el-input>
    </div>

    <div id="weat" v-show="weat" >
        <span id="data">{{area.date}} 农历 {{area.moon}}</span>
        <ul class="Header_items" >
          <li class="Header_item" v-for="item in w">
            <span>{{item.week}}</span>
            <span>{{item.date}}</span>
            <span>{{item.info.day[2]}}</span>
            <span id="duo">
              <img src="./assets/lun/duoyun.png" alt="">
            </span>
            <span>{{item.info.day[1]}}</span>
            <span>{{item.info.day[3]}}</span>
            <span>优</span>
          </li>

        </ul>
    </div>
    <div>
      <p id="welcom" v-show="haha">欢迎使用墨迹天气</p>
      <img class="tian" src="./assets/lun/tian.jpg" alt="">
    </div>
    <div id="weather-bg">
        <div class="IndexWeather_title"></div>
        <div class="IndexWeather_phone"></div>
        <div class="IndexWeather_desc">
            <div class="IndexWeather_time">
                <b>分钟极</b>
                <span>短时预报分钟</span>
            </div>
            <div class="IndexWeather_KM">
                <b>公里极</b>
                <span>预报范围缩小到1公里</span>
            </div>
            <div class="IndexWeather_AI">
                <b>AI智能</b>
                <span>
                  机械学习技术结合
                </span>
            </div>
            <div class="IndexWeather_view">
                <b>可视化</b>
                <span>
                    全球数据预报可视化
                </span>
            </div>
        </div>
    </div>

    <div class="IndexInfo_info">
        <title class="IndexInfo_title"></title>
        <div class="IndexInfo_more">
            <a href="#">更多资讯 ></a>
        </div>
        <div class="IndexInfo_list" >
            <ul >
              <li v-for="item in news" class="IndexInfo_item">
                  <p class="IndexInfo_pic">
                      <img v-if="item.img" width="100%" height="100%":src="item.img" alt="">
                      <img v-else="item.img" width="100%" height="100%"src="./assets/lun/tian.jpg" alt="">

                  </p>
                  <p class="IndexInfo_text">
                      <a href="">{{item.title}}</a>
                      <b>{{item.pdate_src}}</b>
                      <span>{{item.content}}</span>
                  </p>
              </li>
            </ul>
        </div>
    </div>
  </div>  
</template>

<script>
  export default{
    data() {
      return {
        input2: '',
        memeda:false,
        haha:true,
        weat:false,
        // w 表示天气
        w : [],
        area:{},
        cityname : '',
        news:[]
      }
    },
    methods: {
      setInt(){
        if(!this.haha){
          this.haha = true;
          this.memeda = false;
          return;
        }
        this.haha = false,
        this.memeda = true
      },
      setWea(){
        if(this.weat){
          this.weat = false;
          return;
        }

        this.weat=true;
      },
      handClick(){},

      getWeather(){
        // 调用函数
        if(!this.cityname){
          this.cityname = '北京'
        }

        // 请求天气
        this.$http.get('/afd/api/Weather/Query',{
          params : {
            key : 'f9d34cb7fe574d23be415dfd7adfd2e8',
            cityname : this.cityname
          }
        }).then(function(msg){
          // console.log(msg.data.result.weather); 
          // console.log(msg.data.result.realtime)

         var areas =  msg.data.result.realtime;

          this.area = areas;
          // console.log(areas);

          this.w = msg.data.result.weather;
          // 清除当前天气的值
          this.cityname = ''
        }.bind(this)).catch(function(err){
          console.log(err);
          // if(err){
          //   alert('别闹');
          // }
        })
      },

      //获取新闻
      getNew(){
          //请求新闻
          this.$http.get('/afd/api/ActNews/Query',{
            params:{
              key:'af4caf5be4734c30a042c206c98efb17',
              keyword:'滑坡'
            }
          }).then(function(msg){
            // console.log(msg.data.result);
            this.news = msg.data.result;
          }.bind(this)).catch(function(err){
            console.log(err);
          })
      },

      //知乎
      getZhi(){
        this.$http.get('/zhi/api/last-stories').then(function(msg){
            console.log(msg);
        }.bind(this)).catch(function(err){
          console.log(err)
        })
      }
    },
    created(){
      // 获取天气
      this.getWeather();
      this.getNew();
      this.getZhi();
    }

  }
</script>
<style>

li{
  list-style: none;
}
.logo {
    display: block;
    width: 11.5625rem;
    float: left;
    margin: 1.25rem 0.9375rem;
    text-align: left;
}
.Header_head {
    width: 100%;
    height: 2.75rem;
    color: #fff;
    background: #262a32;
}
.Header_logo {
    float: left;
    width: 5.625rem;
    height: 1.4375rem;
    margin: 0.65625rem 0 0 0.6562rem;
    background: url(./assets/lun/logo.png) no-repeat;
    background-size: 100%;  
}
#sou{ 
  width:100%;
  height:2.75rem;
  line-height: 2.75rem;
  background: #000000;
}
.put{
  width:80%;
  margin:0 auto;
  margin-left:10%;
}
.IndexWeather_title {
    display: block;
    width: 12.1875rem;
    height: 10.3125rem;
    margin: 0 auto;
    padding: 1.2rem 0;
    background: url(./assets/lun/weather.png) no-repeat 50%;
    background-size: 100%
}
#weather-bg{
  background: url(./assets/lun/bg_weather.jpg) no-repeat;
    background-size: 100%;
}
.IndexWeather_phone{
  display: block;
    width: 20.0rem;
    height: 19.625rem;
    margin: 0 auto;
    background: url(./assets/lun/phone.png) no-repeat 50%;
    background-size: 100%;
}
.tian{
  width:100%;
  height:13.1875rem;
}
#wxb{
  display: block;
  width:1.5625rem;
  height:1.5625rem;
}
#wxb>img{
  width: 100%;
  height:100%;
}
.weizhi{
  float: right;
  height:2.75rem;
  line-height: 2.75rem;
}
.weizhi span{
  float: left;
  display: block;
}
#duoyun img{
  width:1.5rem;
  height:1.5rem;
  margin-left: 0.3125rem;
}
#xian{
  width:1px;
  background: #fff;
  height:15px;
  margin-top: 0.9375rem;
  margin-left: 0.625rem;
  margin-right: 0.625rem;
}
#welcom{
  width:100%;
  height:2.75rem;
  line-height:2.75rem; 
  background: #30343F;
  text-align: center;
  margin:0;
  color:#fff;
  font-size: 1.0rem;
}
#weat{
    width: 100%;
    position: absolute;
    background: rgba(0,0,0,.7);
    z-index: 2;
    color: #fff;
}
#data{
  width:100%;
  display: block;
  font-size: 1.0rem;
  color: #fff;
  height: 2.75rem;
  line-height: 2.75rem;
  background: #000000;
}
.Header_items {
    position: relative;
    width: 100%;
    z-index: 2;
    padding-left:0;
}
.Header_item {
    float: left;
    width: 25%;
    margin: 1.2rem 0;
    padding: .13333rem 0;
    border-right: 1px solid hsla(0,0%,100%,.2);
    line-height: 1;
    text-align: center;
    display: block;
    overflow: hidden;
}
.Header_item span {
    display: block;
    margin-top: 0.3125rem;
    padding: .13333rem 0;
    font-size: 0.875rem;
}
#duo{
  width:2.1875rem;
  height:2.1875rem;
  margin-left: 1.875rem;
}
#duo>img{
  width:100%;
  height:100%;
}
.IndexWeather_desc{
  padding: 0 .4rem;
  font-size: 0.75rem;
  height: 7.375rem;
  color: #fff;
}
.IndexWeather_AI, .IndexWeather_KM, .IndexWeather_time, .IndexWeather_view {
    float: left;
    margin: .4rem 0.2rem 0;
    padding-left: 1.06667rem;
    line-height: 1.5;
}
.IndexWeather_time {
    margin-left: 0.625rem;
    background: url(./assets/lun/time.png) no-repeat 0;
    background-size: 2rem 2rem; 
}
.IndexWeather_AI span, .IndexWeather_KM span, .IndexWeather_time span, .IndexWeather_view span {
    display: block;
    font-size: 10px;
    margin-left: 2.1875rem;
  }

.IndexWeather_AI b, .IndexWeather_KM b, .IndexWeather_time b, .IndexWeather_view b {
    display: block;
    font-size: 15px;
    font-weight: 100;
    margin-left: 2.1875rem;
}
.IndexWeather_KM {
    margin-left: 1.4rem;
    background: url(./assets/lun/KM.png) no-repeat 0;
    background-size: 2rem 2rem; 
}
.IndexWeather_AI {
    background: url(./assets/lun/AI.png) no-repeat 0;
    background-size: 2rem 2rem; 
}
.IndexWeather_view {
    background: url(./assets/lun/view.png) no-repeat 0;
    background-size:2rem 2rem; 
}

.IndexInfo_info {
    width: 100%;
    color: #fff;
    background: url(./assets/lun/bg_info.jpg) no-repeat;
    /*background-size: 100%;*/
}

.IndexInfo_title {
    display: block;
    width: 7.625rem;
    height: 6.1875rem;
    margin: 0 auto;
    padding: 1.2rem 0 .53333rem;
    background: url(./assets/lun/info.png) no-repeat center 2.5rem;
    background-size: 100%;
    color: #fff;
}
.IndexInfo_more, .IndexInfo_more a {
    color: #aaaeb7;
    text-decoration: none;
}
.IndexInfo_more {
    margin: 0 auto;
    padding-right: .34667rem;
    line-height: 1;
    text-align: center;
    font-size: 14px;
}

.IndexInfo_list {
    padding: .8rem .66667rem 1.06667rem;
    position: relative;
}
.IndexInfo_list>ul{
    margin-left: -1.25rem;
}
.IndexInfo_pic {
    float: left;
    width: 4.375rem;
    height:5.5rem;
    margin: 0 .4rem 0 0;
    overflow: hidden;
}
.IndexInfo_pic img{
  display: block;
}
.IndexInfo_item{
    display: block;
    padding-bottom: .4rem;
    margin-bottom: .4rem;
    border-bottom: 1px solid hsla(0,0%,100%,.1);
}
.IndexInfo_text a {
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
}

.IndexInfo_text b {
    display: block;
    font-size: 12px;
    font-weight: 100;
    color: #989ba3;
}

.IndexInfo_text span {
    margin: .18667rem 0 0;
    font-size: 12px;
    color: #b8bcc6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>