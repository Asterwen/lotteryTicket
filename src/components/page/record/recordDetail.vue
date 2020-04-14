<template>
  <div class="recordDetail">
    <header>
      <img class="recordGameType" src="../../../assets/img/hall/logo_ahk3.png" alt="">
      <img class="recordImg" :src="detailDate.orderType" alt="">
      <h2>{{detailDate.gameName}}</h2>
      <p>第{{detailDate.gameNumber}}期</p>
      <ul class='recordTitle'>
        <li v-if="detailDate.getMoney" style='color: #d91d37;'>中奖金额:{{detailDate.winNum}}元</li>
        <li>
          <span>开奖号码:</span>
          <span v-if="notOpen">等待开奖</span>
          <img v-for="(item,index) in openImgList" :src="item" alt="">
        </li>
        <li>
          <span>订单号:</span>
          <em id="recordDanhao">{{detailDate.gameOrder}}</em>
          <a v-clipboard:copy="detailDate.gameOrder" v-clipboard:success="onCopy" v-clipboard:error="onError" href="javascript:;">复制</a>
        </li>
        <li>
          <span>投注时间:</span>{{detailDate.gameYear}} {{detailDate.gameHour}}
        </li>
        <li>
          <span>总投注金额:</span>{{detailDate.totalNum}}注 {{detailDate.totalAmount}}元
        </li>
      </ul>
    </header>
    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;margin-top: 30px;">
      <thead>
        <tr>
          <th>注号</th>
          <th>玩法</th>
          <th>投注号码</th>
          <th>投注金额</th>
          <th>中奖金额</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(item,index) in detailList' :key='item.id' class='recordWin'>
          <td>{{index +1}}</td>
          <td>{{item.gamePlay}}</td>
          <td>{{item.buyInfo}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.win}}</td>
        </tr>
      </tbody>
    </x-table>
    <footer>
      <span @click="goToVote()">投注{{toVote.name}}</span>
    </footer>
    <toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { XTable, Toast } from 'vux'
export default {
  components: {
    XTable,
    Toast
  },
  data() {
    return {
      Id:0,
      detailDate: {
        orderType: '',
        gameName: '',
        gameOrder: '',
        getMoney: false,
        winNum: '',
        gameNumber: '',
        gameYear: '',
        gameHour: '',
        totalNum: '',
        totalAmount: '',
        openNumber: '1233'
      },
      notOpen: false, //等待开奖
      toast: {
        showValue: false,
        textValue: '成功'
      }, //消息提示框
      toVote: {
        name: this.$route.params.gameTransName
      },
      openImgList: [], //开奖号码图片数据
      detailList: {},
      appPlayList: '',
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 复制成功
    onCopy(e) {
      this.toast.textValue = '复制成功'
      this.toast.showValue = true
    },
    // 复制失败
    onError(e) {
      this.toast.textValue = '请重试~'
      this.toast.showValue = true
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
    // 去下注，跳转快三
    goToVote() {
      window.localStorage.setItem('quick3TypeActive', 1);
      this.$router.push({ path: `/quickThree${this.Id}?name=北京快3` })
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    let params = {
      dealOrder: this.$route.params.dealOrder,
      tableName: this.$route.params.tableName
    }
    this.$api.recordDetail(params).then(res => {
      /*请求成功后的操作*/
      let getData = res.data.data;
      if (res.data.code == 0) {
        // 中奖标识图标
        let showTime = this.transTime(getData.list[0].createTime);
        switch (getData.list[0].lotteryStatus) {
          case '0':
            //未开奖
            this.detailDate.orderType = 'src/assets/img/waitOpen.png'
            this.notOpen = true
            for (let i = 0; i < getData.list.length; i++) {
              getData.list[i].win = '等待开奖'
            }
            break;
          case '1':
            //未中奖
            this.detailDate.orderType = 'src/assets/img/noPrice.png'
            break;
          case '2':
            //中奖
            this.detailDate.orderType = 'src/assets/img/getWinner.png'
            break;
        }
        //彩票类型
        this.detailDate.gameName = getData.list[0].gameName
        this.detailDate.gameOrder = getData.list[0].dealOrder
        this.detailDate.gameNumber = getData.list[0].issue
        this.detailDate.gameYear = showTime.year
        this.detailDate.gameHour = showTime.hour
        this.detailDate.totalNum = getData.totalnum
        this.detailDate.totalAmount = getData.totalAmount

        if (getData.wintotal > 0) {
          this.detailDate.getMoney = true
          this.detailDate.winNum = getData.wintotal
        }

        //购买彩票列表
        this.detailList = getData.list
        let imgNumber = getData.lotteryNum.split('-');
        for (let i = 0; i < imgNumber.length; i++) {
          imgNumber[i] = 'src/assets/img/k3_v' + imgNumber[i] + '.png'
        }
        this.openImgList = imgNumber
      } else {}
    }).catch(err => {})
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
      centerContent: 'src/assets/img/titleHeaderImg/OrderDetails.png', //中间区域内容
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
  }
}

</script>
<style>
.recordDetail header {
  position: relative;
  text-align: center;
  width: 100%;
  background: url(../../../assets/img/historyTop.png) top center no-repeat;
  background-size: 750px;
  font-size: 32px;
  color: #333;
}

.recordDetail footer {
  width: 750px;
  height: 90px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #000;
  text-align: center;
}

.recordDetail footer span {
  display: inline-block;
  width: 392px;
  height: 56px;
  line-height: 56px;
  margin: 0 auto;
  margin-top: 16px;
  font-size: 32px;
  color: #fff;
  background-color: #D91D37;
  border-radius: 10px;
}

.recordDetail header>h2 {
  font-size: 32px;
}

.recordDetail header img.recordGameType {
  width: 86px;
  margin-top: 20px;
}

.recordDetail header img.recordImg {
  position: absolute;
  width: 162px;
  right: 30px;
  top: 120px;
}

.recordDetail header p {
  font-size: 28px;
}

.recordDetail .recordTitle li {
  text-align: left;
  padding-left: 30px;
  font-size: 28px;
  color: #333;
  line-height: 50px;
}

.recordDetail .recordTitle li span {
  color: #666;
  letter-spacing: 2px;
  padding-right: 10px;
}

.recordDetail .recordTitle li em {
  font-style: normal;
  /* padding-right: 30px; */
}

.recordDetail .recordTitle li img {
  margin-top: 0;
  width: 42px;
  padding-right: 6px;
  /*height: 34px;*/
  vertical-align: middle;
}

.recordDetail .recordTitle li a {
  display: inline-block;
  width: 150px;
  height: 55px;
  border-radius: 8px;
  line-height: 55px;
  color: #fff;
  background-color: rgba(217, 29, 55, 1);
  text-align: center;
}

.recordDetail thead th {
  height: 76px;
  font-size: 24px;
  color: #666;
}

.recordDetail tbody td {
  height: 60px;
}

.recordDetail .recordDetail tr {
  height: 76px;
}

.recordDetail .recordDetail tr.recordWin td {
  color: #d91d37;
}

.recordDetail .vux-toast .weui-toast {
  padding: 10px 15px;
}

</style>
