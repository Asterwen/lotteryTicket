<template>
  <div class="betDetail">
    <tab :line-width="1" custom-bar-width="80px" bar-active-color="#d91d37" default-color="#666" active-color="#d91d37">
      <tab-item selected @on-item-click="onItemClick">所有类型</tab-item>
      <tab-item @on-item-click="onItemClick">充值记录</tab-item>
      <tab-item @on-item-click="onItemClick">提现记录</tab-item>
    </tab>
    <div class="betDetailWrap">
      <div v-if="listNumber == '0'" class="selfWrap1">
        <div class="record_list" v-for='item in list1' :key='item.id'>
          <ul>
            <li class="record_time">{{item.dates}} {{item.datetimes}}<span class="self_yue">账户余额：{{item.dealAmount}}元</span></li>
            <li class=""><span>类型:</span>{{item.type}}<span class="pay_money" :class="{ 'getMoney':item.doIGet }">{{item.amount}}元</span></li>
            <li class=""><span>订单号:</span>{{item.dealOrder}}</li>
          </ul>
        </div>
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
            <tr v-for='item in list2' :key='item.id'>
              <td>{{item.year}}<br>{{item.hour}}</td>
              <td>{{item.orderHeader}}<br>{{item.orderFooter}}</td>
              <td>充值</td>
              <td class='tixian'>+{{item.amount}}</td>
              <td class='suc'>{{item.status}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
      <div v-if="listNumber == '2'" class="selfWrap3">
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
            <tr v-for='item in list3' :key='item.id'>
              <td>{{item.year}}<br>{{item.hour}}</td>
              <td>{{item.orderHeader}}<br>{{item.orderFooter}}</td>
              <td>提现</td>
              <td class='chongzhi'>-{{item.amount}}</td>
              <td class='suc'>{{item.status}}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

import { Group, Cell, Tab, TabItem, XTable } from 'vux'
export default {
  components: {
    Cell,
    Group,
    Tab,
    TabItem,
    XTable
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    onItemClick(index) {
      this.listNumber = index
      // console.log('on item click:', index)
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
  data() {
    return {
      listNumber: '0',
      list1: {},
      list2: {},
      list3: {},
      userInfo: {
        type: Object
      },
    }
  },
  created() {
    let checkPage = {}
    checkPage.start = 0
    //代理 交易记录
    this.$api.tadeDetail(checkPage).then(res => {
      /*请求成功后的操作*/
      if (res.data.code == 0) {
        let datalist = res.data.data.list
        datalist.forEach((item, index) => {
          switch (item.type) {
            case '1':
              item.type = '充值'
              item['doIGet'] = false;
              item.amount = '+' + item.amount;
              break;
            case '2':
              item.type = '下注'
              item['doIGet'] = true;
              item.amount = '-' + item.amount;
              break;
            case '3':
              item.type = '兑奖'
              item['doIGet'] = false;
              item.amount = '+' + item.amount;
              break;
            case '4':
              item.type = '提现'
              item['doIGet'] = true;
              item.amount = '-' + item.amount;
              break;
          }
        })
        this.list1 = datalist;
      } else {}
    }).catch(err => {})

    //代理 充值记录 
    let charge = {
      start: 0,
      type: 1
    }
    this.$api.recordLog(charge).then(res => {
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
          if (item.status == 0) {
            item.status = '成功'
          } else {
            item.status = '失败'
          }
        })
        this.list2 = datalist1;
      } else {}
    }).catch(err => {})

    //代理 提现记录
    let charge1 = {
      start: 0,
      type: 0
    }
    this.$api.recordLog(charge1).then(res => {
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
          if (item.status == 0) {
            item.status = '成功'
          } else {
            item.status = '失败'
          }
        })
        this.list3 = datalist1;
      } else {}
    }).catch(err => {})


    // let listDate = [
    // {time:"2018-11-28 14:52",restmoney:'13123',gametime:'201811261447期',username:'dd20181128521478',msg:'100008.00元',getmoney:'1000.20'},
    // {time:"2018-11-28 14:52",restmoney:'13123',gametime:'201811261447期',username:'dd20181128521478',msg:'100008.00元',getmoney:'1000.20'},
    // {time:"2018-11-28 14:52",restmoney:'13123',gametime:'201811261447期',username:'dd20181128521478',msg:'100008.00元',getmoney:'-10.2'}
    // ];
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
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/TransactionDetails.png', //中间区域内容
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
  },
}

</script>
<style>
.betDetail {
  background-color: #F4F4F4;
  /*min-height: 600px;*/
}

.betDetail thead tr {
  height: 90px;
  font-size: 28px;
  color: #999;
}

.selfControl .vux-tap-active {
  margin-top: 8px;
}

.betDetail td {
  padding: 0 10px;
}

.betDetail tbody tr {
  height: 120px;
  font-size: 28px;
  color: #333;
}

.betDetail tbody tr .suc {
  color: #15982B;
}

.betDetail tbody tr .tixian {
  color: #2390C8;
}

.betDetail tbody tr .chongzhi {
  color: #C21D2B;
}

.betDetail .vux-slider {
  overflow: visible;
}

.betDetail .self_yue {
  float: right;
}

.betDetail .vux-tab-wrap {
  padding-top: 0;
  height: 86px;
  margin-bottom: 20px;
}

.betDetail .vux-tab-container {
  height: 86px;
}

.betDetail .vux-tab-container .vux-tab {
  height: 86px;
  line-height: 86px;
}

.betDetail .vux-tab .vux-tab-item {
  line-height: 86px;
  font-size: 30px;
}

.betDetail .record_list {
  text-align: left;
  margin-bottom: 10px;
}

.betDetail .textright {
  text-align: right;
}

.betDetail .record_list ul {
  position: relative;
  padding: 30px;
  width: 690px;
  height: 130px;
  background-color: #fff;
  border-bottom: 1px solid rgba(244, 244, 244, 1);
  /*margin-top: 6px;*/
}

.betDetail .record_list ul li {
  /*width:108px;*/
}

.betDetail .record_time span {
  padding-left: 20px;
}

.betDetail .record_list ul li {
  list-style: none;
  /*float: left;*/
  font-size: 28px;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.betDetail .record_list ul li span {
  font-size: 26px;
  color: #666;
  padding-right: 12px;
}

.betDetail .record_list li .pay_money {
  color: #d91d37;
  float: right;
}

.betDetail .record_list ul span.getMoney {
  color: green;
}

</style>
