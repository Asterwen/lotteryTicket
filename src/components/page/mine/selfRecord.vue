<template>
  <div class="selfRecord">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <tab :line-width="1" custom-bar-width="80px" bar-active-color="#d91d37" default-color="#666" active-color="#d91d37">
      <tab-item selected @on-item-click="onItemClick">所有类型</tab-item>
      <tab-item :selected="listNumber == 1?true:false" @on-item-click="onItemClick">充值记录</tab-item>
      <tab-item :selected="listNumber == 2?true:false" @on-item-click="onItemClick">提现记录</tab-item>
    </tab>
    <div class="selfRecordWrap">

      <div v-if="listNumber == '0'" class="selfWrap1">
        <div class="record_list" v-for='item in selfRecordData[0].list' :key='item.id'>
          <ul>
            <li class="record_time">{{item.dates}} {{item.datetimes}}<span class="self_yue">账户余额：{{item.dealAmount}}元</span></li>
            <li class=""><span>类型:</span>{{item.type}}<span class="pay_money" :class="{ 'getMoney':item.doIGet }">{{item.amount}}元</span></li>
            <li class=""><span>订单号:</span>{{item.dealOrder}}</li>
          </ul>
        </div>
        <p class="moreBox" @click="getMore(0)">{{selfRecordData[0].moreText}}</p>
      </div>

      <div v-if="listNumber == '1'" class="selfWrap2">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>时间</th>
              <th>订单号</th>
              <th>类型</th>
              <th>金额</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in selfRecordData[1].list' :key='item.id'>
              <td>{{item.year}}<br>{{item.hour}}</td>
              <td>{{item.orderHeader}}<br>{{item.orderFooter}}</td>
              <td>充值</td>
              <td class='tixian' :class="{ 'fss':item.fss }">{{item.amount}}</td> 
              <td class='suc' :class="{ 'fss':item.fss }">{{item.status}}</td>
            </tr>
          </tbody>
        </x-table>
        <p class="moreBox" @click="getMore(1)">{{selfRecordData[1].moreText}}</p>
      </div>

      <div v-if="listNumber == '2'" class="selfWrap3">
        <div class="record_list" v-for='item in selfRecordData[2].list' :key='item.id'>
          <ul>
            <li class="record_time">{{item.year}} {{item.hour}}<span class="self_yue" :class="{ 'fss':item.fss,'waiting':item.waiting }" style="color:#5e82f7">{{item.status}}</span><span class="self_yue">提现状态:</span></li>
            <li class=""><span>手续费:</span><span style="color:#d91f37;">{{item.fee}}</span>元<span class="pay_money waiting" :class="{ 'fss':item.fss,'waiting':item.waiting }" style="color:#5e82f7">{{item.amount}}元</span></li>
            <li class=""><span>订单号:</span>{{item.orderHeader}}{{item.orderFooter}}</li>
          </ul>
        </div>
        <p class="moreBox" @click="getMore(2)">{{selfRecordData[2].moreText}}</p>
      </div>
      
      <!-- <div v-if="listNumber == '2'" class="selfWrap3">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>时间</th>
              <th>订单号</th>
              <th>类型</th>
              <th>到账金额</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in selfRecordData[2].list' :key='item.id'>
              <td>{{item.year}}<br>{{item.hour}}</td>
              <td>{{item.orderHeader}}<br>{{item.orderFooter}}</td>
              <td>提现</td>
              <td class='chongzhi' :class="{ 'fss':item.fss,'waiting':item.waiting }">-{{item.amount}}</td>
              <td class='suc' :class="{ 'fss':item.fss,'waiting':item.waiting }">{{item.status}}</td>
            </tr>
          </tbody>
        </x-table>
        <p class="moreBox" @click="getMore(2)">{{selfRecordData[2].moreText}}</p>
      </div> -->

    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import EventProcessingHeader from '../../common/eventProcessingHeader.vue'
import { Group, Cell, Tab, TabItem, XTable } from 'vux'
export default {
  components: {
    EventProcessingHeader,
    Cell,
    Group,
    Tab,
    TabItem,
    XTable
  },
  data() {
    return {
      Id:0,
      fss:false,
      listNumber: '0',
      selfRecordData: [{
        start: 0,
        list: [],
        moreText: '点击加载更多数据', //已加载全部数据
      }, {
        start: 0,
        list: [],
        moreText: '点击加载更多数据', //已加载全部数据
      }, {
        start: 0,
        list: [],
        moreText: '点击加载更多数据', //已加载全部数据
      }],
      operation: { //头部组件状态管理
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: 'src/assets/img/titleHeaderImg/TransactionRecord.png', //中间区域内容
        centerContentClass: 'titleHeaderImg', //中间区域样式类名
        rightShow: false, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
      },
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 头部点击返回事件处理
    clickBack(value) {
      // this.$router.push({ path: `/page/mine${this.Id}` })
      if(JSON.parse(localStorage.getItem('routerBackT'))){
        this.$router.push({ path: JSON.parse(localStorage.getItem('routerBackT'))})
        window.localStorage.removeItem('routerBackT')
      }else{
        this.$router.push({ path: `/page/mine${this.Id}`})
      }
    },
    // 头部点击更多事件处理
    clickMore(value) {},
    onItemClick(index) {
      this.listNumber = index;
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
    // 点击加载更多
    getMore(num) {
      // console.log(num)
      if (this.selfRecordData[num].moreText == "已加载全部数据") {
        return false;
      }
      this.selfRecordData[num].start += 10;
      if (num == 0) {
        this.loadTadeDetail();
      } else if (num == 1) {
        this.loadrecordLog();
      } else if (num == 2) {
        this.loadcashWithdrawalLog();
      }
    },
    // 交易记录数据加载
    loadTadeDetail() {
      let params = {};
      params.start = this.selfRecordData[this.listNumber].start;
      this.$api.tadeDetail(params).then(res => {
        /*请求成功后的操作*/
        if (res.data.code == 0) {
          let datalist = res.data.data.list
          datalist.forEach((item, index) => {
            switch (item.type) {
              case '1':
                item.type = '充值'
                item['doIGet'] = true;
//              item.amount = '+' + item.amount;
                if(item.amount>0){
                		item.amount = '+' + item.amount;
                }
                break;
              case '2':
                item.type = '下注'
                item['doIGet'] = false;
                item.amount = '-' + item.amount;
                break;
              case '3':
                item.type = '兑奖'
                item['doIGet'] = true;
                item.amount = '+' + item.amount;
                break;
              case '4':
                item.type = '提现'
                item['doIGet'] = false;
                item.amount = '-' + item.amount;
                break;
              case '5':
                item.type = '加奖'
                item['doIGet'] = true;
                item.amount = '+' + item.amount;
                break;
              case '6':
                item.type = '佣金'
                item['doIGet'] = true;
                item.amount = '+' + item.amount;
                break;
            }
            this.selfRecordData[0].list.push(item)
//          if(item.amount>0){
//              		item.amount = '+' + item.amount;
//              }else{
//              		item.amount =  item.amount;
//              }
          })
          
          if (this.selfRecordData[0].list.length % 10 == 0) {
            this.selfRecordData[0].moreText = "点击加载更多数据"
          } else {
            this.selfRecordData[0].moreText = "已加载全部数据"
          }
        } else {}
      }).catch(err => {})
    },
    // 充值记录数据加载
    loadrecordLog() {
      let params = {};
      params.start = this.selfRecordData[this.listNumber].start;
      params.type = 1;
      this.$api.recordLog(params).then(res => {
        /*请求成功后的操作*/
        if (res.data.code == 0) {
          let datalist1 = res.data.data.list
          datalist1.forEach((item, index) => {
            let showTime = this.transTime(item.createTime);
            let orderLength = item.insideOrder.length;
            let orderHarfLength = Math.floor(orderLength / 2) + 1;
            item.orderHeader = item.insideOrder.substring(0, orderHarfLength);
            item.orderFooter = item.insideOrder.substring(orderHarfLength, orderLength);
            item.year = showTime.year;
            item.hour = showTime.hour;
            if (item.status == 2) {
            	 item.amount= "+"+item.amount;
              item.status = '成功'
            } else {
              item.fss = true;
              item.status = '扣除'
            }
            this.selfRecordData[1].list.push(item)
          })
          if (this.selfRecordData[1].list.length % 10 == 0) {
            this.selfRecordData[1].moreText = "点击加载更多数据"
          } else {
            this.selfRecordData[1].moreText = "已加载全部数据"
          }
        } else {}
      }).catch(err => {})
    },
    // 提现记录数据加载
    loadcashWithdrawalLog() {
      let params = {};
      params.start = this.selfRecordData[this.listNumber].start;
      params.type = 0;
      this.$api.recordLog(params).then(res => {
        /*请求成功后的操作*/
        if (res.data.code == 0) {
          let datalist1 = res.data.data.list
          datalist1.forEach((item, index) => {
            let showTime = this.transTime(item.createTime);
            let orderLength = item.insideOrder.length;
            let orderHarfLength = Math.floor(orderLength / 2) + 1;
            item.orderHeader = item.insideOrder.substring(0, orderHarfLength);
            item.orderFooter = item.insideOrder.substring(orderHarfLength, orderLength);
            item.year = showTime.year;
            item.hour = showTime.hour;
            if (item.status == 1) {
              item.status = '成功'
            } else if(item.status == 2){
              //提现失败
              item.fss = true;
              item.status = '失败'
            }else{
              //提现进行中
              item.waiting = true;
              item.status = '进行中'
            }
            this.selfRecordData[2].list.push(item)
          })
          if (this.selfRecordData[2].list.length % 10 == 0) {
            this.selfRecordData[2].moreText = "点击加载更多数据"
          } else {
            this.selfRecordData[2].moreText = "已加载全部数据"
          }
        } else {}
      }).catch(err => {})
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    this.listNumber = 0;
    // console.log('1',localStorage.getItem('selfRecordTab'))
    if(localStorage.getItem('selfRecordTab')){
      this.listNumber = localStorage.getItem('selfRecordTab');
    }
    this.loadTadeDetail();
    this.loadrecordLog();
    this.loadcashWithdrawalLog();
    // //根据返回的数据判断是否中奖
    // listDate.forEach((item,index)=>{
    //   if(item.getmoney > 0){
    //     item['doIGet'] = false;
    //     item.getmoney = '+' + item.getmoney;
    //   }else{
    //     item['doIGet'] = true;
    //   }
    // })
    // this.list1 = listDate;
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: false, //是否显示公共头部
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false, //是否显示底部导航
    });
  },
}

</script>
<style>
.selfRecord {
  background-color: #F4F4F4;
  /*min-height: 600px;*/
}

.selfRecord thead tr {
  height: 90px;
  font-size: 28px;
  color: #999;
}

.selfControl .vux-tap-active {
  margin-top: 8px;
}

.selfRecord td {
  padding: 0 10px;
}

.selfRecord tbody tr {
  height: 120px;
  font-size: 28px;
  color: #333;
}

.selfRecord tbody tr .suc {
  color: #d91f37;
}
.selfRecord .selfWrap3 tbody tr .fss{
  color: green;
}
.selfRecord .selfWrap3 tbody tr .waiting{
  color: #5e82f7;
}
.waiting{
  color: #5e82f7;
}
.selfRecord tbody tr .tixian {
  color: #d91d37;
}

.selfRecord tbody tr .chongzhi {
  color: #C21D2B;
}

.selfRecord .vux-slider {
  overflow: visible;
}

.selfRecord .self_yue {
  float: right;
}

.selfRecord .vux-tab-wrap {
  padding-top: 0;
  height: 86px;
  margin-bottom: 20px;
}

.selfRecord .vux-tab-container {
  height: 86px;
}

.selfRecord .vux-tab-container .vux-tab {
  height: 86px;
  line-height: 86px;
}

.selfRecord .vux-tab .vux-tab-item {
  line-height: 86px;
  font-size: 30px;
}

.selfRecord .record_list {
  text-align: left;
  margin-bottom: 10px;
}

.selfRecord .textright {
  text-align: right;
}

.selfRecord .record_list ul {
  position: relative;
  padding: 30px;
  width: 690px;
  height: 130px;
  background-color: #fff;
  border-bottom: 1px solid rgba(244, 244, 244, 1);
  /*margin-top: 6px;*/
}

.selfRecord .record_list ul li {
  /*width:108px;*/
}

.selfRecord .record_time span {
  padding-left: 20px;
}

.selfRecord .record_list ul li {
  list-style: none;
  /*float: left;*/
  font-size: 28px;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.selfRecord .record_list ul li span {
  font-size: 26px;
  color: #666;
  padding-right: 12px;
}

.selfRecord .record_list li .pay_money {

  color: green;
  float: right;
}

.selfRecord .record_list ul span.getMoney {
  color: #d91d37;
}

.selfRecord tbody tr td.fss {
  color: green;
}

.selfRecord .moreBox {
  line-height: 66px;
  text-align: center;
  color: #666;
}

</style>
