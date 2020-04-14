<template>
  <div class="bankCardListBox">
    <div class="bankCardBox">
      <div class="bankCard" v-for="(item,key) in bankCardListData" :key="key" @click="clickBankCard(item.bankId)">
        <img :src="'src/assets/img/bankLogo/'+item.bankCode+'.png'" alt="">
        <p>
          <span class="bankCardName">{{item.name}}</span>
          <br>
          <span class="bankCardType">{{item.type}}</span>
        </p>
        <div class="bankCardNumber">**** **** **** {{item.number}}</div>
      </div>
    </div>
    <div class="addBankCard" @click="addBankCard">
      <x-icon type="ios-plus-empty" size="30"></x-icon>
      <span>添加储蓄卡</span>
      <x-icon type="ios-arrow-right" size="30"></x-icon>
    </div>
    <actionsheet v-model="showActionsheet" :menus="actionsheetMenu" show-cancel @on-click-menu="clickActionsheet"></actionsheet>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Actionsheet } from 'vux'
export default {
  components: {
    Actionsheet,
  },
  data() {
    return {
      Id:0,
      bankCardListData: [],
      selectionBankCard: '', //当前选中银行卡
      showActionsheet: false, //是否显示底部操作按钮
      actionsheetMenu: [{
        label: '设置成默认',
        type: 'primary',
        otherProp: 'yes'
      }, {
        label: '解除绑定',
        type: 'warn',
        otherProp: 'no'
      }],
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    addBankCard() {
      localStorage.setItem("routerBack", JSON.stringify('/page/mine/bankCardList'));
      this.$router.push({ path: `/page/mine/bindingBankCards${this.Id}` })
    },
    clickBankCard(item) {
      this.showActionsheet = true;
      this.selectionBankCard = item;
    },
    clickActionsheet(key, item) {
      let params = {};
      params.bankId = this.selectionBankCard;
      // console.log(params)
      if (item.otherProp == 'yes') {
        this.$api.changeDefault(params).then(res => {
          // console.log(res)
          if (res.data.code == 0) {
            this.loadBankCardList()
          } else {
            alert(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        })
      } else if (item.otherProp == 'no') {
        this.$api.delCard(params).then(res => {
          // console.log(res)
          if (res.data.code == 0) {
            this.loadBankCardList()
          } else {
            alert(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        })
      }
      this.selectionBankCard = '';
    },
    loadBankCardList() {
      this.$api.toBankList().then(res => {
        // console.log(res)
        if (res.data.code == 0) {
          let backData = res.data.data;
          let bankCardListData = [];
          if (backData.length > 0) {
            for (var i = 0; i < backData.length; i++) {
              let obj = {};
              obj.img = 'src/assets/img/' + (i + 1) + '.png';
              obj.name = backData[i].banName;
              obj.type = backData[i].cardType == 0 ? '储蓄卡' : '信用卡';
              obj.number = backData[i].bankNum;
              obj.bankCode = backData[i].bankCode;
              obj.bankId = backData[i].bankId;
              bankCardListData.push(obj)
            }
          }
          this.bankCardListData = bankCardListData;
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    this.loadBankCardList()
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
      centerContent: 'src/assets/img/titleHeaderImg/BankCardList.png', //中间区域内容
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
html,
body {
  background: #f4f4f4;
}

/*银行卡列表*/
.bankCardListBox .bankCardBox {
  padding: 25px 20px 0;
}

.bankCardListBox .bankCardBox .bankCard {
  height: 180px;
  border-radius: 10px;
  padding: 25px 30px;
  margin-bottom: 20px;
  background:linear-gradient(270deg,rgba(231,82,124,1),rgba(236,88,104,1));
}
.bankCardListBox .bankCardBox .bankCard:first-child{
  background:linear-gradient(270deg,rgba(8,156,182,1),rgba(25,180,146,1));
}
.bankCardListBox .bankCardBox .bankCard img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 30px;
  float: left;
  background: #fff;
  padding: 5px;
}

.bankCardListBox .bankCardBox .bankCard p .bankCardName {
  font-size: 36px;
  color: #fff;
}

.bankCardListBox .bankCardBox .bankCard p .bankCardType {
  font-size: 30px;
  color: #fff;
}

.bankCardListBox .bankCardBox .bankCard .bankCardNumber {
  margin-top: 28px;
  font-size: 36px;
  color: #fff;
  padding-left: 120px;
}

/*添加储蓄卡*/
.bankCardListBox .addBankCard {
  height: 32px;
  padding: 25px 20px;
  background: #fff;
  line-height: 30px;
}

.bankCardListBox .addBankCard .vux-x-icon {
  height: 32px;
  vertical-align: middle;
}

.bankCardListBox .addBankCard .vux-x-icon.vux-x-icon-ios-arrow-right {
  float: right;
}

.bankCardListBox .addBankCard span {
  font-size: 32px;
  color: #333;
  vertical-align: middle;
}

/*银行卡管理*/
.bankCardListBox .weui-actionsheet.weui-actionsheet_toggle .weui-actionsheet__menu .weui-actionsheet__cell {
  height: 88px;
  line-height: 88px;
  padding: 0;
  font-size: 32px;
}

.bankCardListBox .weui-actionsheet.weui-actionsheet_toggle .weui-actionsheet__menu .weui-actionsheet__cell.vux-actionsheet-menu-warn:before {
  border-top: 10px solid #F1F1F1;
}

.bankCardListBox .weui-actionsheet.weui-actionsheet_toggle .weui-actionsheet__action .weui-actionsheet__cell {
  font-size: 32px;
}

</style>
