<template>
  <div class="bets">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <div class="container" style="background: url('src/assets/img/bj.png') repeat;">
      <div class="box">
        <p class="time">距{{nextIssue}}期截止:
          <span class="orange">{{showTime}}</span></p>
        <div class="btn-box">
          <button @click="goQuickThree">
            <span class="iconfont icon-tianjia"></span>
            <span>自选号码</span>
          </button>
          <button @click="createHm()">
            <span class="iconfont icon-tianjia" ></span>
            <span>机选一注</span>
          </button>
          <button @click="emptyData">
            <span class="iconfont icon-lajixiang"></span>
            <span>清空列表</span>
          </button>
        </div>
        <div class="data-pool">
          <div class="top"></div>
          <div class="center">
            <div class="item" v-for="(item,index) in xzData">
              <span class="iconfont icon-guanbi" @click="deleteData(index)"></span>
              <div class="center-bar">
                <div class="box">
                  <div class="hm" v-if="item.type == '二个不同号胆拖' || item.type == '三个不同号胆拖' ||item.type == '二同号单选'">
                    <span v-for="(target,num1) in item.data.dm">{{num1!==item.data.dm.length-1?target+',':target}}</span>#<span v-for="(target,num2) in item.data.tm">{{num2!==item.data.tm.length-1?target+',':target}}</span>
                  </div>
                  <div class="hm" v-else-if="item.type=='二不同号' || item.type == '三不同号'" v-for="(ele,index) in item.data.bts">{{index!==item.data.bts.length-1?ele+',':ele}}</div>
                  <div class="hm" v-else v-for="(ele,cindex) in item.data.hm">{{cindex!==item.data.hm.length-1?ele.num+',':ele.num}}</div>
                </div>
                <div class="hmb">
                  <span class="xt">{{item.type}}</span><span class="zz">{{item.data.hm.length}}注</span><span>{{item.data.hm.length*2}}</span>元
                </div>
              </div>
              <span class="iconfont icon-iconfontjiantou2"></span>
            </div>
          </div>
          <div class="bottom"></div>
        </div>
        <div class="gz">
          <input type="checkbox" checked>
          <span>已阅读并同意《委托投注规则》</span>
        </div>
      </div>
      <div :class="'bar-box '+showKeyBoard?'active':''">
        <div class="select-module">
          <!--<div class="left">
            <span>连续买</span>
            <input type="text" readonly @click="keboarEvent" v-model="qishu" data-type="qishu" />
            <span>期</span>
          </div>-->
          <div class="right">
            <span>投</span>
            <input type="text" readonly @click="keboarEvent" v-model="beishu" data-type="beishu" />
            <span>倍</span>
          </div>
        </div>
        <div class="xz-bar" v-if="!showKeyBoard">
          <!--<button class="zh">智能追号</button>-->
          <div class="center">
            <div class="total">共{{zhushu*qishu*beishu*2}}元</div>
            <div class="xzt">{{zhushu}}注{{qishu}}期{{beishu}}倍</div>
          </div>
          <button class="fk" @click="payment">付款</button>
        </div>
        <div class="keyboar" v-if="showKeyBoard">
          <div class="tip" v-if="keboardyType == 'qishu' ">
            <input type="checkbox" checked name="zjstatus"><span>中奖后停止追号</span>
          </div>
          <table>
            <thead>
              <tr v-if="keboardyType == 'qishu' ">
                <th @click="addVal(10,'empty')">追10期</th>
                <th @click="addVal(20,'empty')">追20期</th>
                <th @click="addVal(78,'empty')">追78期(一天)</th>
              </tr>
              <tr v-if="keboardyType == 'beishu' ">
                <th @click="addVal(10,'empty')">追10倍</th>
                <th @click="addVal(20,'empty')">追20倍</th>
                <th @click="addVal(50,'empty')">追50倍</th>
              </tr>
            </thead>
            <tr>
              <td @click="addVal(1)">1</td>
              <td @click="addVal(2)">2</td>
              <td @click="addVal(3)">3</td>
            </tr>
            <tr>
              <td @click="addVal(4)">4</td>
              <td @click="addVal(5)">5</td>
              <td @click="addVal(6)">6</td>
            </tr>
            <tr>
              <td @click="addVal(7)">7</td>
              <td @click="addVal(8)">8</td>
              <td @click="addVal(9)">9</td>
            </tr>
            <tr>
              <td @click="showKeyBoard=false" class="confirm">确定</td>
              <td @click="addVal(0)">0</td>
              <td @click="deleteVal()">
                <span class="iconfont icon-shanchuqingkong"></span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <toast v-model="showToast" type="text" :time="800" :text="tipTxt" position="middle" width="20em"></toast>
    <div v-transfer-dom>
      <confirm v-model="confirmShow" ref="confirm" title="清空" @on-cancel="onCancel" @on-confirm="onConfirm">
        <p style="text-align:center;">你确定清空当前的投注内容？</p>
      </confirm>
      <confirm v-model="payConfirm" ref="payConfirm" title="期次改变提示" @on-cancel="onPayCancel" @on-confirm="onPayConfirm">
        <p style="text-align:center;">期次已切换，当前期次为{{nextIssue}},您要继续投注吗？</p>
      </confirm>
      <confirm v-model="sucssShow" ref="sucss" title="温馨提示" confirm-text="继续投注" cancel-text="查看订单" @on-cancel="viewOrder" @on-confirm="ContinueBet">
        <p style="text-align:center;color: red;">投注成功</p>
      </confirm>
      <confirm v-model="topupShow" ref="sucss" title="温馨提示" confirm-text="去充值" cancel-text="取消" @on-cancel="iscancel" @on-confirm="topup">
        <p style="text-align:center;color: red;">余额不足，请充值后下单</p>
      </confirm>
      <confirm v-model="confirmpayShow" ref="sucss" title="订单确认" confirm-text="确认" cancel-text="取消" @on-cancel="iscancel" @on-confirm="topay">
        <p style="text-align:center;color: red;">订单总金额:{{this.paymentData.amount}}元</p>
        <p style="text-align:center;color: red;">总注数:{{this.paymentData.buyNum}}注</p>
      </confirm>
      <confirm v-model="removeShow" ref="sucss" title="" confirm-text="保存" cancel-text="清除" @on-cancel="remove" @on-confirm="save">
        <p style="text-align:center;color: red;">是否清除或保存本次选号</p>
      </confirm>
      <!--<confirm v-model="removeShow" ref="sucss" title="" confirm-text="继续投注" cancel-text="查看订单" @on-cancel="remove" @on-confirm="save">
        <p style="text-align:center;color: red;">投注成功</p>
      </confirm>-->
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import EventProcessingHeader from '../../common/eventProcessingHeader.vue'
import { Toast, Confirm, TransferDomDirective as TransferDom } from 'vux'
// import { clearInterval } from 'timers';

export default {
  name: "bets",
  directives: {
    TransferDom
  },
  components: {
    EventProcessingHeader,
    Toast,
    Confirm
  },
  data() {
    return {
      Id: 0,
      periodsData: {},
      isShowBack: false,
      nextIssue: '',
      showTime: '', //页面显示时间，分秒格式
      deadlineTime: '', //服务器当前期截止时间，时间戳
      remainingTime: '', //服务器返回的剩余时间
      closeTime: '',
      timeNum: '',
      totalTime: 600,
      timePercent: '0%',
      index: '',
      pageHeader: '新快三',
      // 连续买几期
      qishu: 1,
      // 投几倍
      beishu: 1,
      // 几注
      zhushu: 1,
      confirmShow: false,
      payConfirm: false,
      sucssShow: false,
      topupShow: false,
      confirmpayShow: false,
      removeShow: false,
      paymentData: {
        amount: '',
        buyNum: '',
        gameType: window.localStorage.getItem('gameType') || 'bjfast3',
        datas: '',
        buyPeriods: ''
      },
      timeFun: Object,
      code: '',
      //显示键盘
      showKeyBoard: false,

      // 键盘类型
      keboardyType: '',

      showToast: false,
      tipTxt: '',
      xzData: [],

      operation: { //头部组件状态管理
        backgroundClass: 'bgImg', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: '', //中间区域内容
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
      if (this.xzData == '' || this.xzData == null) {
        this.xzData = []
        this.zhushu = 0
        window.localStorage.removeItem('xzData')
        this.$router.push({ path: `/page/index${this.Id}` })
      } else {
        this.removeShow = true
      }

      // 这里写是否清除或保存本次选号判断
    },
    // 头部点击更多事件处理
    clickMore(value) {
      // console.log('点击了更多按钮')
    },
    // 键盘事件
    keboarEvent(event) {
      var type = event.currentTarget.getAttribute('data-type')
      this.keboardyType = type

      this.showKeyBoard = true
    },
    initda() {
      const that = this
      let params = {}
      params.gameType = this.paymentData.gameType
      this.$api.LotteryInfo(params).then(res => {
        this.nextIssue = res.data.data.nextIssue
        this.periodsData = res.data
        // this.imgnum = res.data.data.resultVO.num
        // this.tableData = res.data.data.list


        let deadlineTime = res.data.data.closeTime; //服务器当前期截至时间
        let remainingTime = res.data.data.showTime; //服务器返回的剩余时间
        this.deadlineTime = deadlineTime;
        this.remainingTime = remainingTime;
        // 倒计时初始化显示
        that.timeNum = '';
        let nowTime = new Date().getTime(); //当前时间时间戳
        if (((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0) - this.remainingTime > 1) {
          that.timeNum = this.remainingTime;
        } else {
          that.timeNum = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
        }
        // 开始倒计时
        // this.timeNum = timeNum;
        clearInterval(that.timeFun)
        that.calculateTheRemainingTime(that.timeNum)
        that.countDown();
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 计算剩余时间
    calculateTheRemainingTime(timeNum) {
      let leftTime = '';
      let rightTime = '';
      let hour = '';
      let minute = '';
      let second = '';
      if (timeNum >= 36000) { //十个小时及以上
        this.totalTime = 43200;
        leftTime = Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((3600 <= timeNum) && (timeNum < 36000)) { //一个小时到十个小时
        this.totalTime = 25200;
        leftTime = '0' + Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((600 <= timeNum) && (timeNum < 3600)) { //十分钟到一个小时
        this.totalTime = 3600;
        leftTime = Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((60 <= timeNum) && (timeNum < 600)) { //一分钟到十分钟
        this.totalTime = 600;
        leftTime = '0' + Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((10 <= timeNum) && (timeNum < 60)) { //十秒到一分钟
        this.totalTime = 600;
        leftTime = '00';
        rightTime = timeNum;
      } else if ((0 <= timeNum) && (timeNum < 10)) { //零到十秒
        this.totalTime = 600;
        leftTime = '00';
        rightTime = '0' + timeNum;
      } else { //其他
        this.totalTime = 600;
        leftTime = '00';
        rightTime = '00';
      }
      this.showTime = leftTime + ":" + rightTime;
      this.timePercent = ((timeNum / this.totalTime).toFixed(2) * 100).toString() + '%';
    },
    // 倒计时
    countDown() {
      const that = this
      let timeNum = '';
      let nowTime = new Date().getTime();
      if (((Number(this.deadlineTime) - Number(nowTime)) / 1000).toFixed(0) - this.remainingTime > 1) {
        timeNum = this.remainingTime;
      } else {
        timeNum = ((Number(this.deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
      }
      this.timeFun = setInterval(() => {
        timeNum--;
        this.remainingTime--;
        if (timeNum < 0) {
          clearInterval(that.timeFun)
          setTimeout(() => {
            that.initda()
          }, 500)
        }
        this.calculateTheRemainingTime(timeNum)
      }, 1000)
    },
    formatType(obj) {
      if (obj == '和值') {
        return 'A';
      } else if (obj == '三同号') {
        return 'B'
      } else if (obj == '三同号通选') {
        return 'B000'
      } else if (obj == '二同号单选') {
        return 'CA'
      } else if (obj == '二同号复选') {
        return 'CB'
      } else if (obj == '三不同号') {
        return 'DA'
      } else if (obj == '三连号通选') {
        return 'F'
      } else if (obj == '二不同号') {
        return 'EA'
      } else if (obj == '三个不同号胆拖') {
        return 'DB'
      } else if (obj == '二个不同号胆拖') {
        return 'EB'
      }
    },
    payment() {
      //最后60秒不可付款
      if (this.timeNum <= 60) {
        this.showToast = true
        this.tipTxt = '开奖前60秒，禁止购买'
        return;
      }
      // console.log(this.xzData, this.beishu, '------')
      let xzData = this.xzData;
      let arr = [];
      for (let i = 0; i < xzData.length; i++) {
        let obj = {};
        obj.code = this.formatType(xzData[i].type);
        let numStr = '';
        if (xzData[i].type == '二同号单选' || xzData[i].type == '三个不同号胆拖' || xzData[i].type == '二个不同号胆拖') {
          let dmArr = xzData[i].data.dm;
          let tmArr = xzData[i].data.tm;
          for (let m = 0; m < dmArr.length; m++) {
            numStr += dmArr[m] + ','
          }
          numStr = numStr.slice(0, numStr.length - 1);
          numStr += '#';
          for (let n = 0; n < tmArr.length; n++) {
            numStr += tmArr[n] + ','
          }
        } else if (xzData[i].type == '二不同号' || xzData[i].type == '三不同号') {
          let btsArr = xzData[i].data.bts;
          for (let k = 0; k < btsArr.length; k++) {
            numStr += btsArr[k] + ','
          }
        } else {
          let numArr = xzData[i].data.hm;
          for (let j = 0; j < numArr.length; j++) {
            numStr += numArr[j].num + ','
          }
        }
        numStr = numStr.slice(0, numStr.length - 1);
        obj.buyInfo = numStr;
        obj.amount = xzData[i].data.hm.length * this.beishu * 2;
        obj.num = xzData[i].data.hm.length * this.beishu;
        arr.push(obj);
      }
      // console.log(arr, '---this is arr')
      let params = this.paymentData;
      let dat = JSON.stringify(arr)
      this.paymentData.amount = this.zhushu * this.qishu * this.beishu * 2
      this.paymentData.buyNum = this.beishu //这里把this.zhushu改成了this.beishu，请留意
      this.paymentData.gameType = 'bjfast3'
      this.paymentData.buyPeriods = this.nextIssue
      this.paymentData.datas = dat
      if (this.zhushu == 0) {
        this.showToast = true
        this.tipTxt = '至少选择一注'
        return
      }
      if (this.timeNum <= 0) {
        this.payConfirm = true
        let params = {}
        params.gameType = this.paymentData.gameType
        this.$api.LotteryInfo(params).then(res => {
          this.nextIssue = res.data.data.nextIssue
        })
        return
      }
      // if (!this.publicInfo.userInfo.payAble) {
      //   this.$router.push({ 'path': '/page/mine/setPS' })
      //   return false;
      // } else {
      this.confirmpayShow = true
      // }
    },
    goQuickThree() {
      this.$router.push({ 'path': `/quickThree${this.Id}`, 'query': { 'forBack': 'bets' } })

    },
    addVal(num, type) {
      if (this.keboardyType == 'qishu') {
        if (type == 'empty') {
          this.qishu = num.toString()
        } else {
          this.qishu += num.toString()
        }

        if (Number(this.qishu) > 274) {
          this.showToast = true
          this.tipTxt = '最大274'
          this.qishu = 1
        }
        if (Number(this.qishu) <= 0) {
          this.showToast = true
          this.tipTxt = '最小1'
          this.qishu = 1
        }
      }
      if (this.keboardyType == 'beishu') {
        if (type == 'empty') {
          this.beishu = num.toString()
        } else {
          this.beishu += num.toString()
        }

        if (Number(this.beishu) > 9999) {
          this.showToast = true
          this.tipTxt = '最大9999'
          this.beishu = 1
        }
        if (Number(this.beishu) <= 0) {
          this.showToast = true
          this.tipTxt = '最小1'
          this.beishu = 1
        }
      }
    },
    deleteVal() {
      if (this.keboardyType == 'qishu') {
        this.qishu = this.qishu.toString().substring(0, this.qishu.length - 1)

      }
      if (this.keboardyType == 'beishu') {
        this.beishu = this.beishu.toString().substring(0, this.beishu.length - 1)
      }
    },
    createHm(type) {
      if (type) {
        var type = type
      } else {
        if (this.xzData.length > 0) {
          var type = this.xzData[0].type
        } else {
          var type = '和值'
        }
      }


      if (type == '和值') {
        this.randomHz()
      } else if (type == '三同号') {
        this.random3t()
      } else if (type == '三同号通选') {
        this.randomTx3t()
      } else if (type == '三连号通选') {
        this.randomLhtx()
      } else if (type == '二同号单选') {
        this.random2t(type)
      } else if (type == '二同号复选') {
        this.random2t(type)
      } else if (type == '三不同号') {
        this.randomRt3()
      } else if (type == '二不同号') {
        this.randomRt2()
      } else if (type == '三个不同号胆拖') {
        this.randomD3()
      } else if (type == '二个不同号胆拖') {
        this.randomD2()
      }
      this.zhushu += 1
    },
    // 随机生成和值
    randomHz() {
      var data = []
      for (var x = 0; x < 16; x++) {
        data.push(x + 3)
      }
      var index = Math.ceil(Math.random() * 15)
      var temp = { type: '和值', data: { hm: [{ num: data[index] }] } }
      this.xzData.unshift(temp)
      this.saveCache()
    },
    // 随机生成三同号
    random3t() {
      var data = []
      for (var x = 0; x < 6; x++) {
        var str1 = (x + 1).toString() + (x + 1).toString() + (x + 1).toString()
        data.push(str1)
      }
      var index = Math.ceil(Math.random() * 5)
      var temp = { type: '三同号', data: { hm: [{ num: data[index] }] } }
      this.xzData.unshift(temp)
      this.saveCache()
    },
    // 生成三同号通选
    randomTx3t() {
      var temp = { type: '三同号通选', data: { hm: [{ num: '三同号通选' }] } }
      this.xzData.unshift(temp)
      this.saveCache()

    },
    // 随机生成二同号
    random2t(type) {

      var data = []
      for (var x = 0; x < 6; x++) {
        var str1 = (x + 1).toString() + (x + 1).toString()
        data.push(str1)
      }
      var index = Math.ceil(Math.random() * 5)

      if (type == '二同号单选') {
        var dm = data[index].toString()
        var tmIndex = Math.ceil(Math.random() * 5)
        var tm = data[tmIndex].toString().substring(0, 1)
        var temp = this.filterData([{ type: '二同号单选', data: { hm: [{ num: dm }], dm: [dm], tm: [tm] } }])
        this.xzData.unshift(temp[0])
      } else {

        var temp = this.filterData([{ type: '二同号复选', data: { hm: [{ num: data[index] }] } }])
        this.xzData.unshift(temp[0])
      }
      this.saveCache()
    },
    // 三连号通选
    randomLhtx() {
      var temp = { type: '三连号通选', data: { hm: [{ num: '三连号通选' }] } }
      this.xzData.unshift(temp)
      this.saveCache()

    },
    // 随机生成三不同号
    randomRt3(text) {

      var typeText = text || '三不同号'
      var num = ''
      var hm = []

      var arrs = [1, 2, 3, 4, 5, 6]
      var num1 = arrs
      if (arrs.length >= num) {
        for (var x in num1) {
          for (var y in num1) {

            for (var z in num1) {
              if (num1[x] !== num1[y] && num1[x] !== num1[z] && num1[y] !== num1[z]) {

                num = num1[x].toString()
                num += num1[y].toString()
                num += num1[z].toString()
                var hasVal = false
                for (var u in hm) {
                  var hm1 = hm[u].split('').sort().join()
                  var hm2 = num.split('').sort().join()
                  if (hm1 == hm2) {
                    hasVal = true
                  }

                }
                if (!hasVal) {
                  hm.push(num)
                }
              }
            }
          }
        }
      }
      var data = hm
      var index = Math.ceil(Math.random() * (hm.length - 1))
      var temp = this.filterData([{ type: typeText, data: { hm: [{ num: data[index] }] } }])
      this.xzData.unshift(temp[0])
      this.saveCache()

    },
    // 随机生成二不同号
    randomRt2(text) {

      var typeText = text || '二不同号'
      var num = ''
      var hm = []

      var arrs = [1, 2, 3, 4, 5, 6]
      var num1 = arrs

      for (var x in num1) {
        for (var y in num1) {
          if (num1[x] !== num1[y]) {

            num = num1[x].toString()
            num += num1[y].toString()
            var hasVal = false
            for (var u in hm) {
              var hm1 = hm[u].split('').sort().join()
              var hm2 = num.split('').sort().join()
              if (hm1 == hm2) {
                hasVal = true
              }
            }
            if (!hasVal) {
              hm.push(num)
            }

          }
        }
      }




      var data = hm
      var index = Math.ceil(Math.random() * (hm.length - 1))
      var temp = this.filterData([{ type: typeText, data: { hm: [{ num: data[index] }] } }])



      this.xzData.unshift(temp[0])
      this.saveCache()

    },

    //三个不同号胆拖
    randomD3() {
      this.randomRt3()
    },
    //三个不同号胆拖
    randomD2() {
      this.randomRt2()
    },
    // 清空列表
    deleteData(index) {
      this.xzData.splice(index, 1)
      var xzData = JSON.stringify(this.xzData)
      window.localStorage.setItem('xzData', xzData)
      this.getZs()
    },
    // 清空列表
    emptyData() {
      this.confirmShow = true

    },
    // 获取注数
    getZs() {
      // 获取注数
      this.zhushu = 0
      for (var x in this.xzData) {
        this.zhushu += this.xzData[x].data.hm.length
      }
    },

    unique(arr) {
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i]);
        }
      }
      return hash;
    },
    // 从小到大
    sortReverNumber(index) {
      return function(a, b) {
        if (parseInt(a[index]) - parseInt(b[index]) < 0) {
          return -1
        } else {
          return 1
        }
      }
    },
    // 保存到本地
    saveCache() {
      var json = JSON.stringify(this.xzData)
      window.localStorage.setItem('xzData', json)
    },
    // 数据梳理
    filterData(data) {
      var newSource = []
      for (var x in data) {
        // 从小到大
        if (data[x].type == '和值') {
          data[x].data.hm = data[x].data.hm.sort(this.sortReverNumber('num'))
          var temp = { type: data[x].type, data: { hm: data[x].data.hm } }
          newSource.push(temp)
        }


        //  将通选 独立成一组
        else if (data[x].type == '三同号') {

          var sl = []
          var t3 = []
          var datasource = JSON.parse(JSON.stringify(data[x]))

          for (var y in datasource.data.hm) {
            if (datasource.data.hm[y].num == '111222333444555666') {
              datasource.data.hm[y].num = '三同号通选'
              sl.push(datasource.data.hm[y])
            } else {
              t3.push(datasource.data.hm[y])
            }
          }
          if (sl.length > 0) {
            var temp = { type: '三同号通选', data: { hm: sl } }
            newSource.push(temp)
          }
          if (t3.length > 0) {
            var temp = { type: datasource.type, data: { hm: t3 } }
            newSource.push(temp)
          }


        }
        //二同号单选和二同号复选分开 单选需要用#分开
        else if (data[x].type == '二同号') {

          // data[x].data.hm = data[x].data.hm.sort(this.sortReverNumber('num'))
          var single = []
          var muti = []
          var datasource = JSON.parse(JSON.stringify(data[x]))

          for (var y in datasource.data.hm) {

            if (datasource.data.hm[y].num.toString().length == 2) {
              datasource.data.hm[y].num = datasource.data.hm[y].num + '*'
              muti.push(datasource.data.hm[y])
              // data[x].data.hm.splice(y--,1)
            } else {
              single.push(datasource.data.hm[y])
            }
          }

          if (single.length > 0) {
            var temp = { type: datasource.type + '单选', data: { hm: single, dm: datasource.data.dm, tm: datasource.data.tm } }
            newSource.push(temp)
          }
          if (muti.length > 0) {
            var temp = { type: data[x].type + '复选', data: { hm: muti } }
            newSource.push(temp)
          }


        } else if (data[x].type == '二同号单选') {


          var single = []
          var datasource = JSON.parse(JSON.stringify(data[x]))

          for (var y in datasource.data.hm) {

            single.push(datasource.data.hm[y])

          }

          var temp = { type: datasource.type, data: { hm: single, dm: datasource.data.dm, tm: datasource.data.tm } }
          newSource.push(temp)


        } else if (data[x].type == '二同号复选') {


          var muti = []
          var datasource = JSON.parse(JSON.stringify(data[x]))

          for (var y in datasource.data.hm) {

            datasource.data.hm[y].num = datasource.data.hm[y].num + '*'
            muti.push(datasource.data.hm[y])
          }

          var temp = { type: datasource.type, data: { hm: muti } }
          newSource.push(temp)


        }

        // 三不同号
        else if (data[x].type == '三不同号') {
          var sl = []
          var t3 = []
          var datasource = JSON.parse(JSON.stringify(data[x]))

          for (var y in datasource.data.hm) {
            if (datasource.data.hm[y].num == '123234345456') {
              datasource.data.hm[y].num = '三连号通选'
              sl.push(datasource.data.hm[y])
            } else {
              t3.push(datasource.data.hm[y])
            }
          }

          if (sl.length > 0) {
            var temp = { type: '三连号通选', data: { hm: sl } }
            newSource.push(temp)
          }
          if (t3.length > 0) {

            var bts = []
            for (var z in t3) {
              var split = t3[z].num.toString().split('')
              for (var y in split) {
                bts.push(split[y])
              }
            }
            bts = this.unique(bts).sort()
            var temp = { type: data[x].type, data: { hm: t3, bts: bts } }
            newSource.push(temp)
          }

        } else if (data[x].type == '二不同号') {
          var bt = []
          var bts = []
          for (var y in data[x].data.hm) {
            bt.push(data[x].data.hm[y])
          }
          for (var z in bt) {
            var split = bt[z].num.toString().split('')
            for (var y in split) {
              bts.push(split[y])
            }
          }
          bts = this.unique(bts).sort()
          var temp = { type: data[x].type, data: { hm: data[x].data.hm, bts: bts } }
          newSource.push(temp)

        } else {

          if (data[x].data.dm) {
            var temp = { type: data[x].type, data: { hm: data[x].data.hm, dm: data[x].data.dm, tm: data[x].data.tm } }
          } else {
            var temp = { type: data[x].type, data: { hm: data[x].data.hm } }
          }

          newSource.push(temp)
        }

      }
      return newSource
    },
    iscancel() {
      this.topupShow = false
    },
    topup() {
      this.topupShow = false
      this.$router.push({ path: '/page/mine/recharge${this.Id}' })
    },
    topay() {
      // console.log(this.xzData, this.beishu, '------')
      let xzData = this.xzData;
      let arr = [];
      for (let i = 0; i < xzData.length; i++) {
        let obj = {};
        obj.code = this.formatType(xzData[i].type);
        let numStr = '';
        if (xzData[i].type == '二同号单选' || xzData[i].type == '三个不同号胆拖' || xzData[i].type == '二个不同号胆拖') {
          let dmArr = xzData[i].data.dm;
          let tmArr = xzData[i].data.tm;
          for (let m = 0; m < dmArr.length; m++) {
            numStr += dmArr[m] + ','
          }
          numStr = numStr.slice(0, numStr.length - 1);
          numStr += '#';
          for (let n = 0; n < tmArr.length; n++) {
            numStr += tmArr[n] + ','
          }
        } else if (xzData[i].type == '二不同号' || xzData[i].type == '三不同号') {
          let btsArr = xzData[i].data.bts;
          for (let k = 0; k < btsArr.length; k++) {
            numStr += btsArr[k] + ','
          }
        } else {
          let numArr = xzData[i].data.hm;
          for (let j = 0; j < numArr.length; j++) {
            numStr += numArr[j].num + ','
          }
        }
        numStr = numStr.slice(0, numStr.length - 1);
        obj.buyInfo = numStr;
        obj.amount = xzData[i].data.hm.length * this.beishu * 2;
        obj.num = xzData[i].data.hm.length * this.beishu;
        arr.push(obj);
      }
      let params = this.paymentData;
      let dat = JSON.stringify(arr)
      this.paymentData.amount = this.zhushu * this.qishu * this.beishu * 2
      this.paymentData.buyNum = this.beishu //这里把this.zhushu改成了this.beishu，请留意
      this.paymentData.gameType = window.localStorage.getItem('gameType') || 'bjfast3';
      this.paymentData.buyPeriods = this.nextIssue
      this.paymentData.datas = dat
      if (this.zhushu == 0) {
        this.showToast = true
        this.tipTxt = '至少选择一注'
        return
      }
      if (this.timeNum <= 0) {
        this.payConfirm = true
        let params = {}
        params.gameType = this.paymentData.gameType

        this.$api.LotteryInfo(params).then(res => {
          this.nextIssue = res.data.data.nextIssue
        })
        return
      }
      this.$api.pay(params).then(res => {
        this.code = res.data.code
        this.confirmpayShow = false
        if (this.code == 9) {
          this.topupShow = true
        } else if (this.code == 1) {
          this.showToast = true
          this.tipTxt = '下单失败'
        } else {
          this.emptyAllData()
          this.topupShow = false
          this.sucssShow = true
        }
      }).catch(err => {
        console.log('000');
      })
    },
    onCancel() {
      this.confirmShow = false
    },
    onConfirm() {
      this.confirmShow = false
      this.emptyAllData()
    },
    viewOrder() {
      this.sucssShow = false
      this.$router.push({ path: `/page/record${this.Id}` })
    },
    ContinueBet() {
      this.sucssShow = false
      this.$router.push({ path: `/quickThree${this.Id}` })
    },
    remove() {
      this.xzData = []
      this.zhushu = 0
      window.localStorage.removeItem('xzData')
      this.$router.push({ path: `/page/index${this.Id}` })
      this.removeShow = false
    },
    save() {
      var jsonData = JSON.stringify(this.xzData)
      window.localStorage.setItem('xzData', jsonData)
      this.getZs()
      this.removeShow = false
      this.$router.push({ path: `/page/index${this.Id}` })
      this.showToast = true
      this.tipTxt = '已保存，下次进入彩种时将自动调出'
      return
    },
    // 清空所有数据
    emptyAllData() {
      this.xzData = []
      this.zhushu = 0
      window.localStorage.removeItem('xzData')
    },
    onPayCancel() {
      this.payConfirm = false
    },
    // 确定投注下一期
    onPayConfirm() {
      this.payConfirm = false
      this.$api.pay(params).then(res => {
        //      console.log('123456')
        this.$router.push({ path: `/page/index${this.Id}` })
        this.emptyData()
      }).catch(err => {
        console.log('000');
      })
    }
  },
  created() {
    this.operation.centerContent = 'src/assets/img/titleHeaderImg/' + this.paymentData.gameType + '.png'
    this.Id = this.$route.params.Id;
    this.initda();
  },
  beforeDestroy() {
    clearInterval(this.timeFun)

    this.timeFun = Object
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
    if (this.$route.query.hasOwnProperty('jx')) {
      var xzData = window.localStorage.getItem('xzData')
      if (xzData) {
        xzData = JSON.parse(xzData)
        this.xzData = xzData
      } else {
        this.xzData = []
      }
      var type = this.$route.query.jx.type
      var num = this.$route.query.jx.num
      for (var x = 0; x < num; x++) {
        this.createHm(type)
      }
      this.getZs()
    } else {
      var queryData = this.filterData(this.$route.query.data)
      var xzData = window.localStorage.getItem('xzData')
      if (xzData) {
        xzData = JSON.parse(xzData)
        for (var x in queryData) {
          xzData.unshift(queryData[x])
        }
        this.xzData = xzData
      } else {
        this.xzData = queryData
      }
      var jsonData = JSON.stringify(this.xzData)
      window.localStorage.setItem('xzData', jsonData)
      this.getZs()
    }

    // var queryData = this.filterData(this.$route.query.data)
    // //  let flag=this.$route.query.flag;
    // //  console.log(flag,"-----this is flag");
    // //  if(flag==undefined){
    // var xzData = window.localStorage.getItem('xzData')
    // if (xzData) {
    //   xzData = JSON.parse(xzData)
    //   for (var x in queryData) {
    //     xzData.unshift(queryData[x])
    //   }
    //   this.xzData = xzData
    //
    // } else {
    //   this.xzData = queryData
    // }
    // var jsonData = JSON.stringify(this.xzData)
    // window.localStorage.setItem('xzData', jsonData)
    // this.getZs()
    //  }


  },
  deactivated() {
    this.$destroy()
  }
}

</script>
<style lang="less">
.bets .container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 94px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .box {
    padding: 20px;
    flex: 1;
    overflow: auto;
    width: 85%;
    margin: 0 auto;
  }
}

.bets .tabbarBox .weui-tabbar {
  display: none;
}

.time {
  color: #fff;
  font-size: 28px;
  text-align: center;

  .orange {
    color: #ecbf53;
  }
}

.btn-box {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;

  button {
    color: #b4e5ca;
    font-size: 32px;
    background-color: rgba(51, 110, 77, 0.5);
    border: none;
    padding: 10px 10px;
  }
}

.gz {
  padding: 20px 0px;
  color: #b4e5ca;
  text-align: center;
  font-size: 32px;

  input,
  span {
    vertical-align: middle;
  }
}

.data-pool {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 0px;

  .top {}

  .center {}

  .bottom {}

  .item {
    display: flex;
    justify-content: space-between;
    color: rgb(180, 188, 185);
    align-items: center;
    border-top: 1px solid rgb(231, 231, 231);
    padding: 10px 20px;

    .iconfont {
      font-size: 44px;
    }

    .icon-guanbi {
      margin-right: 20px;
    }

    .center-bar {
      flex: 1;
      font-size: 24px;

      .box {
        display: flex;
        overflow: auto;
        flex-wrap: wrap;
        margin: 0;
        padding: 10px 0;

        .hm {
          margin-right: 5px;
        }
      }
    }

    .hm {
      color: #d91f37;
      font-size: 30px;
    }

    .xt {
      margin-right: 20px;
    }

    .zz {
      margin-right: 10px;
    }

    .hmb {
      color: #333333;
    }
  }

}

.select-module {
  background-color: rgba(31, 81, 49, 0.5);
  color: #fff;
  font-size: 32px;
  display: flex;
  justify-content: space-between;
  /*flex-direction: row-reverse;*/
  /*添加投几期后后去掉*/
  align-items: center;
  padding: 20px 20px;

  input {
    background-color: rgb(182, 220, 202);
    color: rgb(31, 81, 49);
    font-size: 32px;
    border: none;
    padding: 0px;
    width: 168px;
    height: 58px;
    border-radius: 5px;
    margin: 0px 23px;
    text-align: center;
  }
}

.xz-bar {
  height: 140px;
  background: url(../../../assets/img/k3_bbg2_rever.png);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;

  button {
    padding: 0px 24px;
    color: rgb(87, 33, 0);
    height: 70px;
    border: none;
    border-radius: 10px;
    font-size: 32px;
  }

  .center {
    margin-left: 250px;
    /*添加智能追号后去掉*/
    color: #fff;
    text-align: center;
    font-size: 32px;
  }

  .zh {
    background-color: #fff;
  }

  .fk {
    background-color: rgb(244, 155, 50);
  }

  .total {
    color: rgb(229, 201, 97);
  }

  .xzt {
    font-size: 28px;
  }
}

.keyboar {

  background-color: #fff;

  .tip {
    font-size: 28px;
    color: #666;
    padding: 10px 20px;

    input {
      margin-right: 10px;
    }

    input,
    span {
      vertical-align: middle;
    }
  }

  table {
    border-spacing: 0px;
    border-collapse: collapse;
    width: 100%;

    th {
      font-size: 32px;
      color: #8b8b8b;
      padding: 13px 0px;
      border: 1pt solid #cdcdcd;
    }

    td {
      border: 1pt solid #cdcdcd;
      width: 33%;
      text-align: center;
      padding: 20px 0px;
      color: #000;
      font-size: 50px;

      .icon-shanchuqingkong {
        font-size: 50px;
      }

      &.confirm {
        background-color: #d7303c;
        color: #fff;
      }
    }
  }
}

</style>
