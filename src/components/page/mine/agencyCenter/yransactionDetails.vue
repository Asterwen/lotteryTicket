<template>
  <div class="transitionDetail">
    <div class="searchWrap">
      <div class="searchContent">
        <input type="text" placeholder="下级投注查询">
        <div class="sub">
          <button></button>
        </div>
      </div>
    </div>
    <tab id="ofTop" :class=" tabFixed == true ? 'isFixed' :''" :line-width="1"  bar-active-color="#d91d37" default-color="#666" active-color="#d91d37">
      <tab-item selected @on-item-click="onItemClick">已中奖</tab-item>
      <tab-item @on-item-click="onItemClick">未中奖</tab-item>
      <tab-item @on-item-click="onItemClick">等待开奖</tab-item>
    </tab>
    <div class="selfRecordWrap">
      <div v-if="listNumber == '0'" class="selfWrap1">
        <div class="record_list" v-for='item in list1.data' :key='item.id'>
          <ul>
            <li><em class="recordName">{{item.name}}</em>￥{{item.money}}<span>+{{item.getMoney}}</span></li>
            <li class="">{{item.time}}<span>已中奖</span></li>
          </ul>
        </div>
        <div class="noMore" v-if='list1.showAll'>已显示全部数据</div>
      </div>
      <div v-if="listNumber == '1'" class="selfWrap2">
        <div class="record_list" v-for='item in list2.data' :key='item.id'>
          <ul>
            <li><em class="recordName">{{item.name}}</em>￥{{item.money}}</li>
            <li class="">{{item.time}}<span class="samePosition">未中奖</span></li>
          </ul>
        </div>
        <div class="noMore" v-if='list2.showAll'>已显示全部数据</div>
      </div>
      <div v-if="listNumber == '2'" class="selfWrap3">
        <div class="record_list" v-for='item in list3.data' :key='item.id'>
          <ul>
            <li><em class="recordName">{{item.name}}</em>￥{{item.money}}</li>
            <li class="">{{item.time}}<span class="samePosition">等待开奖</span></li>
          </ul>
        </div>
        <div class="noMore" v-if='list3.showAll'>已显示全部数据</div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell, Tab, TabItem, XTable, Search } from 'vux'
export default {
  components: {
    Group, 
    Cell, 
    Tab, 
    TabItem, 
    XTable,
    Search
  },
  data() {
    return {
      hidstoryData: [],
      listNumber: 0,
      tabFixed: false,
      list1:{
        showAll : true,
        data:[{ time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },{ time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },{ time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },{ time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' }]
      },
      list2:{
        showAll : true,
        data:[{ time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' }]
      },
      list3:{
        showAll : true,
        data:[{ time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' },
        { time: "2018-11-28 14:52", name: '吉林快3',getMoney:'12323', money: '2018', username: 'dd20181128521478' , getmoney: '100000.20' }]
      }
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    loadData() {
      this.$api.proxyOrderDetail().then(res => {
        // console.log(res)
        if (res.data.code == 0) {
          let dataArr = res.data.data;
          this.list1.date = dataArr.process;
          this.list2.date = dataArr.lose;
          this.list3.date = dataArr.win;
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          scrollTop = scrollTop+48;
      let offsetTop = document.querySelector('#ofTop').offsetTop;
      if(scrollTop>offsetTop){
        this.tabFixed = true
      }else{
        this.tabFixed = false
      }
    },
    onItemClick(index) {
      //切换目录
      this.listNumber = index
    },
    transTime(time) {
      let d = new Date(time); //根据时间戳生成的时间对象
      let date = {};
      let form = {}
      form.month = d.getMonth() + 1;
      form.day = d.getDate();
      form.hour = d.getHours();
      form.minutes = d.getMinutes();
      for (let i in form) {
        if (form[i] < 10) {
          form[i] = '0' + form[i].toString();
        }
      }
      date.year = (d.getFullYear()) + '-' + form.month + '-' + form.day
      date.hour = form.hour + ':' + form.minutes
      return date;
    },
  },
  created() {
    this.loadData()

  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/BettingDetails.png', //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false, //是否显示底部导航
    });
    //监听页面滚动
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
  window.removeEventListener('scroll', this.handleScroll)
  }
}

</script>
<style style='less'>
.transitionDetail {
  background: #f4f4f4;
}
.transitionDetail .searchWrap{
  /*width: 100%;*/
  padding: 20px 30px;
  /*height: 110px;*/
}
.transitionDetail .searchContent{
  position: relative;
  padding: 10px 12px;
  width: 666px;
  height: 50px;
  background-color: #fff;
  border-radius: 6px;
}
.transitionDetail .sub{
  width:50px;
  height: 50px;
  float: right;
  background: #d91f37 url(/src/assets/img/center-right.png) center no-repeat;
  border-radius: 6px;
}
.transitionDetail .searchContent input{
  display: inline-block;
  padding-left: 30px;
  font-size: 28px;
  color: #C0C0C0;
  width: 500px;
  height: 50px;
  outline: none;
}
.transitionDetail div.isFixed{
  position: fixed;
  width: 100%;
  top: 96px;
  left: 0;
  z-index: 1001;
}



.transitionDetail .vux-tab-wrap{
  height: 90px;
  line-height: 90px;
  padding-top: 0;
}
.transitionDetail .vux-tab{
  height: 90px;

}
.transitionDetail .vux-tab .vux-tab-item{
  line-height: 90px;
  line-height: 90px;
  font-size: 28px;
  background:rgba(227,227,227,1);
}
.transitionDetail .vux-tab-container{
  height: 90px;
}
.transitionDetail  li{
  line-height: 34px;
  position: relative;
  
}
.transitionDetail  ul{
  padding: 15px 30px;
  background-color: #fff;
  border-bottom: 2px solid #F4F4F4;
  font-size: 24px;
  color: #999999;
}
.transitionDetail  em{
  padding-right: 20px;
  font-style: normal;
  font-size: 28px;
  color: #333333;
  float: left;
}
.transitionDetail .selfWrap1 span{
  color: #D91D37;
  float: right;
}
.transitionDetail .selfWrap2 span{
  color: #333333;
  float: right;
}
.transitionDetail .selfWrap3 span{
  color: #1EAA1B;
  float: right;
}
.transitionDetail span.samePosition{
  position: absolute;
  right: 0px;
  top: -20px;
}
.transitionDetail .noMore{
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #333333;
  font-size: 24px;
  background-color: #fff;
}

</style>
