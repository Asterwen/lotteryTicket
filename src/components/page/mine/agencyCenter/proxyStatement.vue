<template>
  <div class="proxyStatementBox">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <!-- <div class="topInputBox">
      <div class="inputBox">
        <input type="text" v-model="inputValue" placeholder="下级报表查询">
        <span class="iconBox" @clcik.native="clickQuery">
          <x-icon type="ios-arrow-right" size="25"></x-icon>
        </span>
      </div>
    </div> -->
    <div class="contentBox">
      <div v-for="(item,key) in proxyStatementData" :key="key">
        <p>{{item.num}}</p>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="actionsheetBox">
      <actionsheet v-model="showActionsheet" :menus="actionsheetMenu" show-cancel @on-click-menu="clickActionsheet" @on-click-mask="closeActionsheet" @on-click-menu-cancel="closeActionsheet"></actionsheet>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import EventProcessingHeader from '../../../common/eventProcessingHeader.vue'
import { Actionsheet } from 'vux'
export default {
  components: {
    EventProcessingHeader,
    Actionsheet
  },
  data() {
    return {
      Id:0,
      proxyStatementData: [],
      inputValue: '',
      actionsheetMenu: [{
        label: '今天',
      }, {
        label: '昨天',
      }, {
        label: '本月',
      }],
      showActionsheet: false, //底部弹层是否显示
      operation: { //头部组件状态管理
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: 'src/assets/img/titleHeaderImg/ProxyStatement.png', //中间区域内容
        centerContentClass: 'titleHeaderImg', //中间区域样式类名
        rightShow: true, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '今天', //要在右侧显示的内容
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
      // console.log('点击了返回按钮')
      this.$router.push({ path: `/page/mine/agencyCenter/agencyCenter${this.Id}` });
    },
    // 头部点击更多事件处理
    clickMore(value) {
      // console.log('点击了更多按钮')
      this.showActionsheet = !this.showActionsheet;
    },
    loadProxyStatementData() {
      let params = {};
      if (this.operation.rightContent == "今天") {
        params.one = '1';
        params.two = '';
        params.three = '';
      } else if (this.operation.rightContent == "昨天") {
        params.one = '';
        params.two = '1';
        params.three = '';
      } else if (this.operation.rightContent == "本月") {
        params.one = '';
        params.two = '';
        params.three = '1';
      }
      this.$api.proxyInfo(params).then(res => {
        // console.log(res, '----this is res')
        if (res.data.code == 0) {
          let proxyStatementData = res.data.data[0];
          let proxyStatementArr = [{
              name: '投注金额',
              num: proxyStatementData.payOrder || 0
            }, {
              name: '中奖金额',
              num: proxyStatementData.win || 0
            }, {
              name: '活动礼金',
              num: proxyStatementData.activity || 0
            }, {
              name: '会员返点',
              num: proxyStatementData.userCommission || 0
            },
            // {
            //   name: '会员盈利',
            //   num: proxyStatementData.payOrder||0
            // },
            {
              name: '充值金额',
              num: proxyStatementData.recharge || 0
            }, {
              name: '提现金额',
              num: proxyStatementData.withdraw || 0
            },
        //    {
          //    name: '首充人数',
          //    num: proxyStatementData.firstRecharge || 0
          //  }, 
            {
              name: '注册人数',
              num: proxyStatementData.zhuren || 0
            },
            // {
            //   name: '投注人数',
            //   num: proxyStatementData.payOrder||0
            // },
            {
              name: '下级人数',
              num: proxyStatementData.proxyren || 0
            },
            // {
            //   name: '会员余额',
            //   num: proxyStatementData.payOrder||0
            // },
            {
              name: '代理返点',
              num: proxyStatementData.proxyCommission || 0
            }
          ];
          this.proxyStatementData = proxyStatementArr;
        } else {
          // console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })

    },
    clickQuery() {
      // console.log('click')
      if (this.inputValue == '') {
        alert("请输入下级")
        return false;
      }
      this.loadProxyStatementData()
    },
    clickActionsheet(key, item) {
      // console.log(key, '---', item, '----key, item')
      if (key == 'cancel') {
        this.operation.rightContent = this.operation.rightContent;
      } else {
        this.operation.rightContent = item.label;
        this.loadProxyStatementData()
      }
    },
    closeActionsheet() {
      this.showActionsheet = false;
    }
  },
  created() {
    this.Id = this.$route.params.Id;
    this.loadProxyStatementData();
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
.proxyStatementBox .topInputBox {
  height: 70px;
  padding: 20px 30px;
}

.proxyStatementBox .topInputBox .inputBox {
  height: 70px;
  background: #fff;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.proxyStatementBox .topInputBox .inputBox input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 6px;
  outline: none;
  padding-left: 25px;
  padding-right: 70px;
}

.proxyStatementBox .topInputBox .inputBox .iconBox {
  display: inline-block;
  position: absolute;
  width: 50px;
  height: 50px;
  background: #d91f37;
  border-radius: 6px;
  top: 10px;
  right: 10px;
}

.proxyStatementBox .topInputBox .inputBox .iconBox .vux-x-icon {
  fill: #fff;
}

.proxyStatementBox .contentBox div {
  background: #fff;
  width: 248px;
  height: 178px;
  float: left;
  margin-right: 2px;
  margin-bottom: 2px;
  padding-top: 70px;
}

.proxyStatementBox .contentBox div:nth-child(3),
.proxyStatementBox .contentBox div:nth-child(6),
.proxyStatementBox .contentBox div:nth-child(9),
.proxyStatementBox .contentBox div:nth-child(12),
.proxyStatementBox .contentBox div:nth-child(15) {
  margin-right: 1px;
}

.proxyStatementBox .contentBox div:nth-child(1),
.proxyStatementBox .contentBox div:nth-child(4),
.proxyStatementBox .contentBox div:nth-child(7),
.proxyStatementBox .contentBox div:nth-child(10),
.proxyStatementBox .contentBox div:nth-child(13) {
  margin-left: 1px;
}

.proxyStatementBox .contentBox div p:nth-child(1) {
  text-align: center;
  font-size: 44px;
  color: rgba(255, 156, 1, 1);
}

.proxyStatementBox .contentBox div p:nth-child(2) {
  text-align: center;
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
}

/*弹层*/
.proxyStatementBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__menu .weui-actionsheet__cell,
.proxyStatementBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action .weui-actionsheet__cell {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: rgba(0, 0, 0, 1);
}

.proxyStatementBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action {
  margin-top: 20px;
}

</style>
