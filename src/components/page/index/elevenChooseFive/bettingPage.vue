<template>
  <div class="bettingPageBox">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <header>
      <p>距&nbsp;<span class="nowStage" v-html="nowStage"></span>&nbsp;期截止&nbsp;:&nbsp;<span class="remainingTimeShow" v-html="remainingTimeShow"></span></p>
      <div class="topOperationBox">
        <span @click="clickOptionalNumber"><img src="../../../../assets/img/ElevenChooseFive/plus.png" alt=""><span>自选号码</span></span>
        <span @click="ShakeOneShakeMachineSelection"><img src="../../../../assets/img/ElevenChooseFive/plus.png" alt=""><span>机选一注</span></span>
        <span @click="clickClearOrderData"><img src="../../../../assets/img/ElevenChooseFive/empty.png" alt=""><span>清空列表</span></span>
      </div>
      <div class="drawerBgBox">
        <div></div>
      </div>
    </header>
    <div class="contentBgBox" :style="'min-height:'+(clientHeight-262)+'px'">
      <div class="contentBox">
        <ul>
          <li v-for="(item,key) in orderDataArr" :key="key">
            <img @click="deleteOrderData(item)" src="../../../../assets/img/ElevenChooseFive/delete.png" class="delete" alt="">
            <img @click="editOrderData(item)" src="../../../../assets/img/ElevenChooseFive/right.png" class="right" alt="">
            <p>
              <span class="buyInfo">{{item.buyInfo}}</span><br>
              <span class="otherInfo">{{backMethodName(item.code)}}    {{item.num}}注{{item.amount}}元</span>
            </p>
          </li>
        </ul>
        <p>我已阅读并同意委托投注规则</p>
      </div>
    </div>
    <footer>
      <div class="topBox">
        <div class="multipleBox">投<input type="number" v-model="multiple" @blur="multipleBlur" placeholder="1">倍</div>
      </div>
      <div class="bottomBox">
        <div class="paymentBtn" @click="clickToPay">付款</div>
        <p><span class="money">共{{totalMoney}}元</span><br><span class="buyInfo">{{totalNotes}}注{{stage}}期{{multiple}}倍</span></p>
      </div>
    </footer>
    <!-- 信息提示框 -->
    <div class="toastBox">
      <toast v-model="toastBox.show" type="text" :time="toastBox.time" :text="toastBox.text" :position="toastBox.position"></toast>
    </div>
    <!-- confirm操作提示框 -->
    <div class="confirmBox">
      <confirm v-model="confirmBox.show" :title="confirmBox.title" :confirm-text="confirmBox.confirmText" :cancel-text="confirmBox.cancelText" @on-cancel="confirmBox.cancelFun" @on-confirm="confirmBox.confirmFun">
        <p style="text-align:center;color: #d91f37" v-html="confirmBox.content"></p>
      </confirm>
    </div>
  </div>
</template>
<script>
import EventProcessingHeader from '../../../common/eventProcessingHeader.vue'
import { mapState, mapActions } from "vuex";
import { Toast, Confirm } from 'vux'
export default {
  components: {
    EventProcessingHeader,
    Toast,
    Confirm
  },
  data() {
    return {
      operation: { //头部组件状态管理
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: 'src/assets/img/titleHeaderImg/ShandongElevenElectionFive.png', //中间区域内容
        centerContentClass: 'titleHeaderImg', //中间区域样式类名
        rightShow: false, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
      },
      orderDataArr: JSON.parse(window.localStorage.getItem("orderDataArr")) || [], //订单数组
      nowStage: '1', //当前期号
      remainingTimeShow: '00:00', //当前期剩余时间
      deadlineTime: '', //服务器当前期截至时间
      remainingTime: '', //服务器返回的剩余时间
      clientHeight: 0,
      centerContent: [],
      nowPlayMethod: {},
      numberArr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ], //号码数组
      codeArr: [
        { name: '任选二', code: 'A2' },
        { name: '任选三', code: 'A3' },
        { name: '任选四', code: 'A4' },
        { name: '任选五', code: 'A5' },
        { name: '任选六', code: 'A6' },
        { name: '任选七', code: 'A7' },
        { name: '任选八', code: 'A8' },
        { name: '前一', code: 'B1' },
        { name: '前二直选', code: 'C' },
        { name: '前二组选', code: 'D' },
        { name: '前三直选', code: 'E' },
        { name: '前三组选', code: 'F' },
        { name: '任选二胆拖', code: 'G2' },
        { name: '任选三胆拖', code: 'G3' },
        { name: '任选四胆拖', code: 'G4' },
        { name: '任选五胆拖', code: 'G5' },
        { name: '任选六胆拖', code: 'G6' },
        { name: '任选七胆拖', code: 'G7' },
        { name: '任选八胆拖', code: 'G8' },
        { name: '前二组选胆拖', code: 'H2' },
        { name: '前三组选胆拖', code: 'H3' }
      ], //玩法编码数组
      stage: 1, //期数
      multiple: 1, //倍数
      nowGameType: 'jl11vv5', //当前彩种
      toastBox: { //信息提示框
        show: false,
        position: 'middle',
        time: 800,
        text: ''
      },
      timer: null, //倒计时
      confirmBox: {
        show: false,
        confirmText: '保存',
        cancelText: '清除',
        confirmFun: this.saveOrderDataAndBack,
        cancelFun: this.clearOrderDataAndBack,
        content: '是否清除或保存本次选号',
        title: ''
      }, //操作确认框
    }
  },
  watch: {
    stage: function(newValue, oldValue) {
      this.stage = this.stage.replace(/\D/g, '');
    },
    multiple: function(newValue, oldValue) {
      this.multiple = this.multiple.toString().replace(/\D/g, '');
    },
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
    totalNotes: function() {
      let notes = 0;
      for (var i = 0; i < this.orderDataArr.length; i++) {
        notes += this.orderDataArr[i].num;
      }
      // console.log(this.orderDataArr)
      return notes;
    },
    totalMoney: function() {
      return this.totalNotes * this.stage * this.multiple * 2;
    },
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 投注倍数失去焦点校验
    multipleBlur() {
      if (this.multiple == '') {
        this.multiple = 1;
      }
      console.log(this.multiple)
    },
    // 头部点击返回事件处理
    clickBack(value) {
      // console.log('点击了返回按钮')
      let orderDataArr = JSON.parse(window.localStorage.getItem("orderDataArr"))
      if (orderDataArr.length != 0) {
        this.confirmBox = {
          show: true,
          confirmText: '保存',
          cancelText: '清除',
          confirmFun: this.saveOrderDataAndBack,
          cancelFun: this.clearOrderDataAndBack,
          content: '是否清除或保存本次选号',
          title: ''
        }
      } else {
        this.$router.push({ path: '/page/index' + localStorage.getItem('Id') })
      }
    },
    // 头部点击更多事件处理
    clickMore(value) {
      // console.log('点击了更多按钮')
    },
    // 自选号码
    clickOptionalNumber() {
      this.$router.push({ path: '/page/index/elevenChooseFive/elevenChooseFive' + localStorage.getItem('Id') })
    },
    // 清除并退出
    clearOrderDataAndBack() {
      this.orderDataArr = [];
      let queryArr = JSON.stringify(this.orderDataArr);
      window.localStorage.setItem('orderDataArr', queryArr);
      this.$router.push({ path: '/page/index' + localStorage.getItem('Id') })
    },
    // 保存并退出
    saveOrderDataAndBack() {
      this.$router.push({ path: '/page/index' + localStorage.getItem('Id') })
    },
    // 删除订单
    deleteOrderData(item) {
      let arr = [];
      for (var i = 0; i < this.orderDataArr.length; i++) {
        if (item.id != this.orderDataArr[i].id) {
          arr.push(this.orderDataArr[i])
        }
      }
      this.orderDataArr = arr;
      let queryArr = JSON.stringify(this.orderDataArr);
      window.localStorage.setItem('orderDataArr', queryArr);
    },
    // 编辑订单
    editOrderData(item) {},
    // 清空列表
    clickClearOrderData() {
      this.confirmBox = {
        show: true,
        confirmText: '确定',
        cancelText: '取消',
        confirmFun: this.clearOrderDataArr,
        cancelFun: this.hideConfirm,
        content: '您确定要清空当前的投注内容？',
        title: ''
      }
    },
    hideConfirm() {
      this.confirmBox = {
        show: false,
        confirmText: '保存',
        cancelText: '清除',
        confirmFun: this.clearOrderDataArr,
        cancelFun: this.clearOrderDataAndBack,
        content: '是否清除或保存本次选号',
        title: ''
      }
    },
    clearOrderDataArr() {
      if (this.orderDataArr.length == 0) {
        return false;
      }
      this.orderDataArr = [];
      let queryArr = JSON.stringify(this.orderDataArr);
      window.localStorage.setItem('orderDataArr', queryArr);
    },
    // 获取当期数据
    loadLotteryInfo() {
      let params = {};
      params.gameType = this.nowGameType;
      console.log(params, '----this is params')
      this.$api.LotteryInfo(params).then(res => {
        console.log(res, "---this is LotteryInfo back data")
        this.nowStage = res.data.data.nextIssue;
        let deadlineTime = res.data.data.closeTime; //服务器当前期截至时间
        let remainingTime = res.data.data.showTime; //服务器返回的剩余时间
        this.deadlineTime = deadlineTime;
        this.remainingTime = remainingTime;
        console.log(deadlineTime, '服务器当前期截至时间')
        console.log(remainingTime, '服务器返回的剩余时间')
        // 倒计时初始化显示
        let timeNum = '';
        let nowTime = new Date().getTime(); //当前时间时间戳
        let calculationTime = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0); //计算出来的剩余时间
        console.log(calculationTime, '计算出来的剩余时间')
        if (Math.abs(calculationTime - this.remainingTime) > 1) {
          timeNum = this.remainingTime;
        } else {
          timeNum = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
        }
        console.log(timeNum, '最终倒计时所用时间')
        // 开始倒计时
        this.calculateTheRemainingTime(timeNum);
        this.countDown(timeNum);
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 点击去付款
    clickToPay() {
      this.confirmBox = {
        show: true,
        confirmText: '确定',
        cancelText: '取消',
        confirmFun: this.toPay,
        cancelFun: this.hideConfirm,
        content: '订单总金额' + this.totalMoney + '元<br>总注数' + this.totalNotes + '注',
        title: '订单确认'
      }
    },
    // 付款
    toPay() {
      if (this.remainingTime <= 60) {
        this.toastBox = { //信息提示框
          show: true,
          position: 'middle',
          time: 800,
          text: '开奖前60秒，禁止购买'
        }
        return;
      }
      let params = {};
      params.amount = this.totalMoney;
      params.buyNum = this.totalNotes;
      params.gameType = this.nowGameType;
      params.datas = JSON.stringify(this.orderDataArr);
      params.buyPeriods = this.nowStage;
      console.log(params, '----this is params')
      this.$api.pay(params).then(res => {
        console.log(res, '---this is back data')
        // 下单成功，清空购物车
        if (res.data.code == 0) {
          this.toastBox = { //信息提示框
            show: true,
            position: 'middle',
            time: 800,
            text: '下单成功'
          }
          this.orderDataArr = [];
          let queryArr = JSON.stringify(this.orderDataArr);
          window.localStorage.setItem('orderDataArr', queryArr);
        }
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 剩余时间格式化
    calculateTheRemainingTime(timeNum) {
      let leftTime = '';
      let rightTime = '';
      let hour = '';
      let minute = '';
      let second = '';
      if (timeNum >= 36000) { //十个小时及以上
        leftTime = Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((3600 <= timeNum) && (timeNum < 36000)) { //一个小时到十个小时
        leftTime = '0' + Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((600 <= timeNum) && (timeNum < 3600)) { //十分钟到一个小时
        leftTime = Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((60 <= timeNum) && (timeNum < 600)) { //一分钟到十分钟
        leftTime = '0' + Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((10 <= timeNum) && (timeNum < 60)) { //十秒到一分钟
        leftTime = '00';
        rightTime = timeNum;
      } else if ((0 <= timeNum) && (timeNum < 10)) { //零到十秒
        leftTime = '00';
        rightTime = '0' + timeNum;
      } else { //其他
        leftTime = '00';
        rightTime = '00';
      }
      this.remainingTimeShow = leftTime + ":" + rightTime;
    },
    // 倒计时
    countDown(timeNum) {
      this.timer = window.setInterval(() => {
        timeNum--;
        if (timeNum < 0) {
          window.clearInterval(this.timer)
          setTimeout(() => {
            this.loadLotteryInfo();
          }, 500)
        }
        this.calculateTheRemainingTime(timeNum)
      }, 1000)
    },
    // 返回玩法名称
    backMethodName(code) {
      let codeArr = this.codeArr;
      let name = '';
      for (var i = 0; i < codeArr.length; i++) {
        if (codeArr[i].code == code) {
          name = codeArr[i].name;
        }
      }
      return name;
    },
    // 返回玩法编码
    backMethodCode(name) {
      let codeArr = this.codeArr;
      let code = '';
      for (var i = 0; i < codeArr.length; i++) {
        if (codeArr[i].name == name) {
          code = codeArr[i].code;
        }
      }
      return code;
    },
    // 机选一注
    ShakeOneShakeMachineSelection() {
      let centerContentKey = window.localStorage.getItem('centerContentKey')
      this.nowPlayMethod = this.centerContent[Number(centerContentKey) - 1];
      // 选号
      let ShakeOneShakeMachineSelectionArr = this.getRandomArrayElements(this.nowPlayMethod.choiceNum);
      let obj = {};
      obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
      obj.num = 1; //注数
      obj.amount = 2; //金额
      obj.id = new Date().getTime();
      if (this.nowPlayMethod.type == 'previousTwo') {
        obj.buyInfo = ShakeOneShakeMachineSelectionArr.join('|');
      } else if (this.nowPlayMethod.type == 'previousThree') {
        obj.buyInfo = ShakeOneShakeMachineSelectionArr.join('|');
      } else if (this.nowPlayMethod.type == 'ordinary') {
        ShakeOneShakeMachineSelectionArr.sort(this.sortNumber)
        obj.buyInfo = ShakeOneShakeMachineSelectionArr.join(',');
      } else {
        ShakeOneShakeMachineSelectionArr.sort(this.sortNumber)
        obj.code = this.backMethodCode(this.nowPlayMethod.choiceName); //编码
        obj.buyInfo = ShakeOneShakeMachineSelectionArr.join(',');
      }
      this.orderDataArr.unshift(obj)
      let queryArr = JSON.stringify(this.orderDataArr);
      window.localStorage.setItem('orderDataArr', queryArr);
    },
    // 数组排序
    sortNumber(a, b) { return a - b },
    // 从数组中随机取数，入参count：取数个数
    getRandomArrayElements(count) {
      let arr = this.numberArr;
      let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  created() {
    let clientHeight = document.documentElement.clientHeight;
    // console.log(clientHeight, "--页面已刷新")
    this.clientHeight = clientHeight;
    this.loadLotteryInfo();
    this.centerContent = [
      { id: 1, name: '任选二', choiceName: '任选二', choiceNum: '2', type: 'ordinary', promptText: '至少选2个号码，猜对任意2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 6, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 2, name: '任选三', choiceName: '任选三', choiceNum: '3', type: 'ordinary', promptText: '至少选3个号码，猜对任意3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 19, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 3, name: '任选四', choiceName: '任选四', choiceNum: '4', type: 'ordinary', promptText: '至少选4个号码，猜对任意4个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 78, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 4, name: '任选五', choiceName: '任选五', choiceNum: '5', type: 'ordinary', promptText: '至少选5个号码，猜对全部5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 540, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 5, name: '任选六', choiceName: '任选六', choiceNum: '6', type: 'ordinary', promptText: '至少选6个号码，选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 90, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 6, name: '任选七', choiceName: '任选七', choiceNum: '7', type: 'ordinary', promptText: '至少选7个号码，选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 26, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 7, name: '任选八', choiceName: '任选八', choiceNum: '8', type: 'ordinary', promptText: '至少选8个号码，选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 9, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 8, name: '前一', choiceName: '前一', choiceNum: '1', type: 'ordinary', promptText: '至少选1个号码，猜对第1个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 13, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 9, name: '前二直选', choiceName: '前二直选', choiceNum: '2', type: 'previousTwo', promptText: '每位至少选1个号码，按位猜对前2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 130, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/TenThousandPosition.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/ThousandBit.png', selectedNumber: [], omissionArr: [] }] },
      { id: 10, name: '前二组选', choiceName: '前二组选', choiceNum: '2', type: 'ordinary', promptText: '至少选2个号码，猜对前2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 65, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 11, name: '前三直选', choiceName: '前三直选', choiceNum: '3', type: 'previousThree', promptText: '每位至少选1个号码，按位猜对前3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 1170, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/TenThousandPosition.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/ThousandBit.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/HundredBit.png', selectedNumber: [], omissionArr: [] }] },
      { id: 12, name: '前三组选', choiceName: '前三组选', choiceNum: '3', type: 'ordinary', promptText: '至少选3个号码，猜对前3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 195, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 13, name: '任选二胆拖', choiceName: '任选二', choiceNum: '2', type: 'dragOn', promptText: '猜对任意2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 6, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 14, name: '任选三胆拖', choiceName: '任选三', choiceNum: '3', type: 'dragOn', promptText: '猜对任意3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 19, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 15, name: '任选四胆拖', choiceName: '任选四', choiceNum: '4', type: 'dragOn', promptText: '猜对任意4个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 78, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 16, name: '任选五胆拖', choiceName: '任选五', choiceNum: '4', type: 'dragOn', promptText: '猜对全部5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 540, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 17, name: '任选六胆拖', choiceName: '任选六', choiceNum: '6', type: 'dragOn', promptText: '选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 90, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 18, name: '任选七胆拖', choiceName: '任选七', choiceNum: '7', type: 'dragOn', promptText: '选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 26, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 19, name: '任选八胆拖', choiceName: '任选八', choiceNum: '8', type: 'dragOn', promptText: '选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 9, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 20, name: '前二组选胆拖', choiceName: '前二组选', choiceNum: '2', type: 'dragOn', promptText: '猜对前2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 65, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
      { id: 21, name: '前三组选胆拖', choiceName: '前三组选', choiceNum: '3', type: 'dragOn', promptText: '猜对前3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 195, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] }
    ]
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
.bettingPageBox {
  background: #F9F8F0;
}

/*头部区域*/
.bettingPageBox header>p {
  height: 80px;
  background: #FFFFFF;
  border-bottom: 2px solid #E5E5E5;
  line-height: 80px;
  text-align: center;
  font-size: 32px;
  color: #333333;
}

.bettingPageBox header>p .remainingTimeShow {
  color: #D91D37;
}

.bettingPageBox .topOperationBox {
  padding: 50px 30px 40px;
  background: #F9F8F0;
}

.bettingPageBox .topOperationBox>span {
  display: inline-block;
  width: 200px;
  height: 56px;
  margin-right: 30px;
  border: 2px solid #E5E5E5;
  border-radius: 6px;
  text-align: center;
  line-height: 56px;
  font-size: 28px;
  font-weight: 500;
  background: #fff;
  color: #333333;
}

.bettingPageBox .topOperationBox>span img {
  width: 28px;
  height: 28px;
  vertical-align: middle;
  margin-right: 16px;
}

.bettingPageBox .topOperationBox>span:last-child {
  margin-right: 0;
}

.bettingPageBox .drawerBgBox {
  padding: 0 30px;
  background: #F9F8F0;
  height: 10px;
  overflow: hidden;
  position: relative;
}

.bettingPageBox .drawerBgBox div {
  height: 10px;
  background: #999999;
  opacity: 0.38;
  border-radius: 4px;
  display: inline-block;
  width: 690px;
  position: absolute;
  top: 0;
  left: 30px;
}

/*主体部分*/
.bettingPageBox .contentBgBox {
  background: transparent;
  padding: 0 30px;
  overflow: scroll;
  position: relative;
}

.bettingPageBox .contentBgBox .contentBox {
  background: #FFFFFF;
  width: 654px;
  height: auto;
  position: absolute;
  top: -5px;
  left: 48px;
  z-index: 555;
  padding: 25px 0 0;
}

.bettingPageBox .contentBgBox .contentBox>p {
  background: #F9F8F0;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #999;
}

.bettingPageBox .contentBgBox .contentBox ul {
  border-bottom: 1px dotted #999999;
}

.bettingPageBox .contentBgBox .contentBox ul li {
  border-top: 1px dotted #999999;
  height: 89px;
  line-height: 89px;
}

.bettingPageBox .contentBgBox .contentBox ul li img.delete {
  width: 31px;
  height: 31px;
  float: left;
  margin: 29px 25px 0 10px;
}

.bettingPageBox .contentBgBox .contentBox ul li img.right {
  width: 13px;
  height: 25px;
  float: right;
  margin: 34px 25px 0 0;
}

.bettingPageBox .contentBgBox .contentBox ul li p {
  display: inline-block;
  line-height: 100%;
  vertical-align: middle;
}

.bettingPageBox .contentBgBox .contentBox ul li p .buyInfo {
  font-size: 30px;
  font-weight: bold;
  display: inline-block;
  color: #FF0008;
  margin-bottom: 12px;
}

.bettingPageBox .contentBgBox .contentBox ul li p .otherInfo {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
}

/*底部区域*/
.bettingPageBox footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  height: 168px;
  width: 100%;
}

.bettingPageBox footer .topBox {
  height: 60px;
  background: #fff;
  padding: 0 30px;
  font-size: 28px;
  color: #333333;
  line-height: 60px;
}

.bettingPageBox footer .topBox input {
  width: 140px;
  height: 40px;
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 4px;
  outline: none;
  text-align: center;
  font-size: 28px;
  color: #333333;
  font-weight: bold;
  margin: 0 20px;
}

.bettingPageBox footer .topBox .stageBox {
  width: 50%;
  float: left;
  text-align: left;
}

.bettingPageBox footer .topBox .multipleBox {
  width: 50%;
  float: right;
  text-align: right;
}

.bettingPageBox footer .bottomBox {
  height: 128px;
  background: #252625;
  text-align: center;
  line-height: 128px;
  position: relative;
}

.bettingPageBox footer .bottomBox .paymentBtn {
  width: 115px;
  height: 65px;
  background: #FFBA00;
  border-radius: 6px;
  text-align: center;
  line-height: 65px;
  float: right;
  position: absolute;
  top: 20px;
  right: 30px;
}

.bettingPageBox footer .bottomBox p {
  line-height: 100%;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
}

.bettingPageBox footer .bottomBox p .money {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 32px;
  font-weight: 500;
  color: #D3B50E;
}

.bettingPageBox footer .bottomBox p .buyInfo {
  font-size: 24px;
  font-weight: 500;
  color: #FFFFFF;
}

/*信息提示框*/
.bettingPageBox .toastBox .weui-toast {
  width: auto !important;
  padding: 10px 25px;
}

</style>
