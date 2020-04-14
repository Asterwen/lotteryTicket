<template>
  <div class="cashWithdrawalBox">
    <!-- <Common></Common> -->
    <toast
      style="width:auto"
      v-model="toast.showValue"
      type="text"
      :time="1200"
      is-show-mask
      position="middle"
    >{{toast.textValue }}</toast>
    <mine-header :show-btn="false" :back-user-info="backUserInfo" v-if="isRouterAlive"></mine-header>
    <group>
      <cell-box is-link @click.native="choiceBankCards(BankCardData.type)">
        <img :src="BankCardData.img" alt>
        <p>
          <span class="cardName" v-html="BankCardData.name"></span>
          <br>
          <span class="cardNumber" v-html="BankCardData.cardNumber"></span>
        </p>
      </cell-box>
    </group>
    <div class="rechargeContentBox">
      <p class="title">提现金额{{showKey}}</p>
      <div class="inputBox">
        <x-icon type="ios-ionic-outline" size="30"></x-icon>
        <input type="number" @blur="inputBlur" v-model="inputMoney" placeholder="最低提现金额100">
        <x-icon type="ios-close" size="30" @click="clearInput"></x-icon>
      </div>
      <p class="promptTextBox">
        <span>温馨提示</span>
        <br>
        <span>1.提现手续费1%</span>
        <br>
        <!-- <span>2.每日提现时间09:00-23:00，其他时间无法提现</span> -->
      </p>
    </div>
    <div class="popupBox">
      <popup v-model="showPopup">
        <popup-header
          left-text="取消"
          right-text="确定"
          title="银行卡列表"
          :show-bottom-border="false"
          @on-click-left="showPopup = false"
          @on-click-right="definiteChoice"
        ></popup-header>
        <div class="BankCardBigBox">
          <div
            class="BankCardBox"
            v-for="(item,key) in BankCardList"
            :key="key"
            @click="bankCardsChoicee(item)"
          >
            <img :src="item.img" alt>
            <p>
              <span class="cardListName" v-html="item.name"></span>
              <br>
              <span class="cardListNumber" v-html="item.cardNumber"></span>
            </p>
            <i :class="BankCardDataDome.bankId==item.bankId?'active':''"></i>
          </div>
          <p class="addBankCardBox" @click="addBankCard">添加银行卡</p>
        </div>
      </popup>
    </div>
    <password-input :showKey="showKey" v-on:backFun="backFun"></password-input>
    <footer @click="clickBtn">确定提现</footer>
    <!-- <mine-footer btn-text="确定提现"></mine-footer> -->
    <div class="cashWithdrawalToast">
      <!-- <toast v-model="showalert" type="text" :time="800" text="提现金额最低100元" position="middle"></toast> -->
      
    </div>
     <!-- v-transfer-dom -->
    <div>
      <confirm v-model="sucssShow" ref="sucss" title="温馨提示" confirm-text="取消" cancel-text="查看记录" @on-cancel="viewOrder" @on-confirm="ContinueBet">
        <p style="text-align:center;color: red;">提现成功</p>
      </confirm>
    </div>

    <div class="boxzhezhao" v-if="commen">
      提现中,请稍后...
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import {
  Group,
  Cell,
  CellBox,
  PopupHeader,
  Popup,
  TransferDom,
  XSwitch,
  Radio,
  Confirm,
  Toast,
  // TransferDomDirective as TransferDom
} from "vux";
// import MineFooter from './mineCommon/mineFooter.vue'
import PasswordInput from "../../common/passwordInput.vue";
import MineHeader from "./mineCommon/mineHeader.vue";
import Commen from "../commen/commen.vue"
import Bus from "../../common/bus.js";
export default {
  // inject:['reload'],
  // provide(){
  //   roload:this.reload
  // },
  // directives: {
  //   TransferDom
  // },
  components: {
    // MineFooter,
    MineHeader,
    PasswordInput,
    Group,
    Cell,
    CellBox,
    PopupHeader,
    Popup,
    // TransferDom,
    XSwitch,
    Radio,
    Toast,
    Confirm,
    Commen
    // TransferDomDirective
  },
  data() {
    return {
      Id:0,
      commen:false,
      sucssShow: false,
      isRouterAlive:true,
      BankCardData: {}, //当前选中银行卡数据
      inputMoney: "", //提现金额输入款值
      showPopup: false, //银行卡列表开关
      BankCardList: [], //银行卡列表
      BankCardDataDome: {}, //当前选中银行卡选择临时存储
      userInfo: {}, //头部组件中闯过来的个人信息
      showKey: false,
      showalert: false,
      toast: {
        showValue: false,
        textValue: ""
      }
    };
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    })
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    },
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    clickBtn() {
      let locaPublicInfo = JSON.parse(localStorage.getItem('publicInfo'));
      let Money = JSON.parse(localStorage.getItem('Money'))
      if (!this.BankCardData.bankId || this.BankCardData.type == false) {
        // alert('请选择提现账户');
        this.toast.textValue = "请选择提现账户";
        this.toast.showValue = true;
        return;
      }else if(!locaPublicInfo.userInfo.withdraw){
        //没有交易密码则跳转设置
        localStorage.setItem("routerBack", JSON.stringify(`/page/mine/cashWithdrawal${this.Id}`));
        this.$router.push({ path: `/page/mine/selfRealName${this.Id}` })
        return;
      } else if (this.inputMoney == "" || Number(this.inputMoney) < 100) {
        // alert('请输入正确提现金额');
        this.inputMoney = '';
        this.toast.textValue = "请输入正确提现金额";
        this.toast.showValue = true;
        return;
      } else if (parseFloat(this.inputMoney) > parseFloat(Money)) {
        // alert('请小于可提金额');
        this.inputMoney = '';
        this.toast.textValue = "请小于可提金额";
        this.toast.showValue = true;
        return;
      }
      Bus.$emit("showKey", true);
    },
    clearInput() {
      this.inputMoney = "";
    },
    choiceBankCards(type) {
      if (type) {
        this.showPopup = true;
      } else {
        this.$router.push({ path: `/page/mine/bindingBankCards${this.Id}` });
      }
    },
    definiteChoice() {
      this.BankCardData = this.BankCardDataDome;
      this.showPopup = false;
    },
    bankCardsChoicee(item) {
      item.type = true;
      this.BankCardDataDome = item;
    },
    addBankCard() {
      localStorage.setItem("routerBack", JSON.stringify(`/page/mine/cashWithdrawal${this.Id}`));
      this.$router.push({ path: `/page/mine/bindingBankCards${this.Id}` });
    },
    backUserInfo(info) {
      this.userInfo = info;
    },
    backFun(value) {
      if (!value) {
        alert("请输入四位安全密码");
        return;
      }
      let params = {};
      params.bankId = this.BankCardData.bankId;
      params.amount = this.inputMoney;
      params.dealPsw = value;
      this.commen = true;
      this.$api
        .doWithDraw(params)
        .then(res => {
          // console.log(res, "---yes");
          if (res.data.code == 0) {
            this.inputMoney = '';
            this.sucssShow = true;
            this.commen = false;
            this.reload();
          } else {
            this.inputMoney = '';
            this.commen = false;
            this.toast.textValue = res.data.message;
            this.toast.showValue = true;
          }
          
        })
        .catch(err => {
          this.toast.textValue = '服务器忙,请稍后重试!';
            this.toast.showValue = true;
          console.log(err, "---no");
          this.commen = false;
        });
    },
    inputBlur() {
      if (Number(this.inputMoney) < 100) {
        this.showalert = true;
      } else {
        this.showalert = false;
      }
    },
    viewOrder() {
      this.sucssShow = false
      this.$router.push({ path: `/page/mine/selfRecord${this.Id}` });
      localStorage.setItem("routerBackT", JSON.stringify(`/page/mine/cashWithdrawal${this.Id}`));
      localStorage.setItem('selfRecordTab',2)
    },
    ContinueBet() {
      this.sucssShow = false
      // this.$router.push({ path: '/quickThree' })
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    let noHaveData = {
      type: false,
      name: "添加银行卡",
      img:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546420094202&di=e27d0004528c23ad00e7076d814b45ce&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171215%2Fca23e71e1510431295d815050973132b.jpeg",
      cardNumber: "请绑定提现银行卡"
    };
    this.$api
      .toBankList()
      .then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          let backData = res.data.data;
          let BankCardList = [];
          if (backData.length > 0) {
            for (var i = 0; i < backData.length; i++) {
              let obj = {};
              obj.img =
                "src/assets/img/bankLogo/" + backData[i].bankCode + ".png";
              obj.name = backData[i].banName;
              obj.type = backData[i].cardType == 0 ? "储蓄卡" : "信用卡";
              obj.cardNumber = "**** **** **** " + backData[i].bankNum;
              obj.bgClass = backData[i].bankCode;
              obj.bankId = backData[i].bankId;
              BankCardList.push(obj);
              if (i == 0) {
                obj.type = true;
                this.BankCardData = obj;
                this.BankCardDataDome = obj;
              }
            }
          } else {
            this.BankCardData = noHaveData;
            this.BankCardDataDome = noHaveData;
          }
          this.BankCardList = BankCardList;
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: "bgColorRed", //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: "icon", //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: "", //showType为other时，要在左侧显示的内容
      centerShowType: "img", //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: "src/assets/img/titleHeaderImg/CashWithdrawal.png", //中间区域内容
      centerContentClass: "titleHeaderImg", //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: "text", //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: "", //要在右侧显示的内容
      rightContentClass: "", //右侧内容样式类名
      rightTumpLink: "" //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false //是否显示底部导航
    });
  },
  
};
</script>
<style>
.cashWithdrawalBox {
  
  padding-top: 250px;
}
.cashWithdrawalBox .vux-toast .weui-toast {
  padding: 5px 8px;
  width: auto !important;
}
.cashWithdrawalBox .weui-cells.vux-no-group-title {
  margin-top: 0;
}

.cashWithdrawalBox .vux-cell-box.weui-cell.vux-tap-active.weui-cell_access {
  height: 150px;
}

.cashWithdrawalBox .vux-cell-box.weui-cell.vux-tap-active.weui-cell_access img {
  height: 116px;
  width: 116px;
  margin-left: 22px;
  margin-right: 24px;
  float: left;
  border-radius: 50%;
}

.cashWithdrawalBox
  .vux-cell-box.weui-cell.vux-tap-active.weui-cell_access
  p
  .cardName {
  font-size: 32px;
  color: #333333;
}

.cashWithdrawalBox
  .vux-cell-box.weui-cell.vux-tap-active.weui-cell_access
  p
  .cardNumber {
  font-size: 28px;
  color: #999999;
}

.cashWithdrawalBox .weui-cell_access.vux-cell-box:after {
  width: 22px;
  height: 22px;
  right: 40px;
}

.cashWithdrawalBox .rechargeContentBox {
  background: #fff;
  height: 600px;
  margin-top: 20px;
  padding: 22px 30px;
}

.cashWithdrawalBox .rechargeContentBox .title {
  font-size: 28px;
  color: #999;
  margin-bottom: 50px;
}

.cashWithdrawalBox .rechargeContentBox .inputBox {
  margin-left: 55px;
  margin-bottom: 60px;
}

.cashWithdrawalBox .rechargeContentBox .inputBox input {
  text-align: center;
  font-size: 50px;
  display: inline-block;
  width: 500px;
  height: 80px;
  border: none;
  border-bottom: 2px solid #e5e5e5;
  outline: none;
}

.cashWithdrawalBox
  .rechargeContentBox
  .inputBox
  input::-webkit-input-placeholder {
  color: #999;
  font-size: 50px;
  text-align: center;
}

.cashWithdrawalBox .rechargeContentBox .inputBox .vux-x-icon {
  width: 36px;
  height: 36px;
  fill: #999;
  vertical-align: middle;
  margin-top: -6px !important;
}

.cashWithdrawalBox .rechargeContentBox .promptTextBox {
  margin-left: 55px;
}

.cashWithdrawalBox .rechargeContentBox .promptTextBox span {
  display: inline-block;
  margin-bottom: 36px !important;
  font-size: 24px;
  color: #333;
}

.cashWithdrawalBox .rechargeContentBox .promptTextBox span:nth-child(1) {
  color: #e64346;
  font-weight: bold;
}

/*弹层*/
.cashWithdrawalBox .popupBox .vux-popup-header {
  height: 97px;
  line-height: 97px;
  border-bottom: 2px solid #e5e5e5;
}

.cashWithdrawalBox .popupBox .vux-popup-header .vux-popup-header-left,
.cashWithdrawalBox .popupBox .vux-popup-header .vux-popup-header-right {
  font-size: 28px;
  color: #999;
  padding: 0 20px;
}

.cashWithdrawalBox .popupBox .vux-popup-header .vux-popup-header-title {
  font-size: 32px;
  color: #333;
}

.cashWithdrawalBox .popupBox .BankCardBigBox {
  padding: 0 20px;
  background: #fff;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox {
  padding: 30px 10px;
  border-bottom: 2px solid #e5e5e5;
  height: 94px;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox img {
  height: 94px;
  width: 94px;
  margin-right: 32px;
  border-radius: 50%;
  vertical-align: middle;
  float: left;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox p {
  display: inline-block;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox p .cardListNumber {
  color: #666;
  font-size: 28px;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox p .cardListName {
  color: #666;
  font-size: 32px;
  margin-right: 50px;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox i {
  display: inline-block;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: 2px solid #999;
  vertical-align: middle;
  float: right;
  margin-top: 33px;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .BankCardBox i.active {
  background: #f64343;
  border-color: #f64343;
}

.cashWithdrawalBox .popupBox .BankCardBigBox .addBankCardBox {
  color: #36b5e4;
  font-size: 28px;
  text-align: center;
  padding: 50px 0;
}
.boxzhezhao{
  width: 100%;
  height: 101.5%;
  border: 1px solid red;
  background: #000000;
  opacity: 0.5;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
footer {
  background-color: #d91d37;
  height: 88px;
  font-size: 36px;
  line-height: 88px;
  color: #fff;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

/*提示框*/
.cashWithdrawalBox .cashWithdrawalToast .weui-toast {
  padding: 5px 10px;
  z-index: 6666;
}

.cashWithdrawalBox .cashWithdrawalToast .weui-toast .weui-toast__content {
  font-size: 32px;
}
</style>
