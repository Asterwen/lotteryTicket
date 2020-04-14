<template>
  <div class="subordinateReportBox">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <table cellspacing="0">
      <thead>
        <tr>
          <th>账号</th>
          <th>报表人数</th>
          <th>盈利</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="clickUser(item)" v-for="(item,key) in subordinateReportData" :key="key">
          <td>{{item.account}}</td>
          <td>{{item.sums}}</td>
          <td>{{item.total}}</td>
          <td>{{message-Number(item.comments)}}级{{item.isAngent=='1'?"代理":"用户"}}</td>
        </tr>
      </tbody>
    </table>
    <p class="pageBox" v-html='pageText' @click="clickPage"></p>
    <div class="rightActionsheetBox">
      <actionsheet v-model="showRightActionsheet" :menus="rightActionsheetMenu" show-cancel @on-click-menu="clickRightActionsheet" @on-click-mask="closeRightActionsheet" @on-click-menu-cancel="closeRightActionsheet"></actionsheet>
    </div>
    <div class="userActionsheetBox">
      <actionsheet v-model="showUserActionsheet" :menus="userActionsheetMenu" show-cancel @on-click-menu="clickUserActionsheet" @on-click-mask="closeUserActionsheet" @on-click-menu-cancel="closeUserActionsheet"></actionsheet>
    </div>
    <div class="popupBox">
      <popup v-model="showPopup">
        <popup-header right-text="关闭" title="返点详情" :show-bottom-border="false" @on-click-right="showPopup = false"></popup-header>
        <div class="everyBox" v-for="(item1,key1) in popupList" :key="key1">
          <span>{{item1.name}}</span><span>{{item1.ratio}}</span>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import EventProcessingHeader from '../../../common/eventProcessingHeader.vue'
import { Actionsheet, PopupHeader, Popup } from 'vux'
export default {
  components: { EventProcessingHeader, Actionsheet, PopupHeader, Popup },
  data() {
    return {
      Id:0,
      operation: { //头部组件状态管理
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: 'src/assets/img/titleHeaderImg/SubordinateReport.png', //中间区域内容
        centerContentClass: 'titleHeaderImg', //中间区域样式类名
        rightShow: true, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '今天', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
      },
      rightActionsheetMenu: [{
        label: '今天',
      }, {
        label: '昨天',
      }, {
        label: '本月',
      }], //点击右侧底部弹层数据
      userActionsheetMenu: [], //点击用户底部弹层数据
      showRightActionsheet: false, //点击右侧底部弹层是否显示
      showUserActionsheet: false, //点击用户底部弹层是否显示
      subordinateReportData: [], //页面数据数组
      message: 0, //代理级别总数
      selectUserID: '', //当前页的会员ID
      clickUserID: '', //点击的会员ID
      pageText: '点击加载更多', //全部加载完成显示：已显示全部数据
      start: 0, //数据开始下标，用于分页
      startLevel: 0, //初始化代理级别
      nowLevel: 0, //当前代理级别
      headerHtml: '', //返点详情页头部html
      showPopup: false, //是否显示返点详情页
      popupList: [{
        name: '快3',
        ratio: '',
        gameType: 'fast3'
      }, {
        name: '时时彩',
        ratio: '',
        gameType: 'ssckj'
      }, {
        name: '11选5',
        ratio: '',
        gameType: '11vv5'
      }], //返点详情页内容
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  watch: {},
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
      this.showRightActionsheet = !this.showRightActionsheet;
    },
    // 点击右侧弹层菜单
    clickRightActionsheet(key, item) {
      // console.log(key, '---', item, '----key, item')
      if (key == 'cancel') {
        this.operation.rightContent = this.operation.rightContent;
        this.showRightActionsheet = false;
      } else {
        if (this.operation.rightContent == item.label) {
          this.showRightActionsheet = false;
        } else {
          this.operation.rightContent = item.label;
          this.start = 0;
          this.subordinateReportData = [];
          this.loadSubordinateReport();
        }
      }
    },
    // 点击用户弹层菜单
    clickUserActionsheet(key, item) {
      // console.log(key, '---', item, '----key, item')
      if (key == 'cancel') {
        this.showUserActionsheet = false;
      } else {
        if (item.label == "查看下级") {
          this.operation.rightContent="今天";
          this.selectUserID = this.clickUserID;
          this.start = 0;
          this.subordinateReportData = [];
          this.loadSubordinateReport();
        } else if (item.label == "查看上级") {
          this.operation.rightContent="今天";
          this.selectUserID = '';
          this.start = 0;
          this.subordinateReportData = [];
          this.loadSubordinateReport('once');
        } else if (item.label == "查看返点") {
          let params = {};
          params.userId = this.clickUserID;
          this.$api.userRatio(params).then(res => {
            // console.log(res, '----this is res')
            if (res.data.code == 0) {
              this.showUserActionsheet = false;
              for (var m = 0; m < res.data.data.length; m++) {
                for (var n = 0; n < this.popupList.length; n++) {
                  if (res.data.data[m].gameType == this.popupList[n].gameType) {
                    this.popupList[n].ratio = res.data.data[m].userRatio;
                  }
                }
              }
              this.showPopup = true;
            } else {
              alert(res.data.message)
            }
          }).catch(err => {
            console.log(err);
          })
        }
      }
    },
    // 关闭点击右侧弹层
    closeRightActionsheet() {
      this.showRightActionsheet = false;
    },
    // 关闭点击用户弹层
    closeUserActionsheet() {
      this.showUserActionsheet = false;
    },
    // 点击用户
    clickUser(item) {
      this.clickUserID = item.userId;
      let userActionsheetMenu = [];
      this.headerHtml = '<span style="color:#2E56DB;font-size: 16px;">' + item.account + '</span>';
      userActionsheetMenu.push({
        label: '查看返点',
      })
      if (Number(item.sums) > 0) {
        userActionsheetMenu.push({
          label: '查看下级',
        })
      }
      if (this.nowLevel != this.startLevel) {
        userActionsheetMenu.push({
          label: '查看上级',
        })
      }
      this.userActionsheetMenu = userActionsheetMenu;
      this.showUserActionsheet = true;
    },
    // 点击下一页
    clickPage() {
      if (this.pageText == '点击加载更多') {
        this.start += 10;
        this.loadSubordinateReport();
      } else {
        this.pageText = '已显示全部数据'
        alert("没有更多数据了")
      }
    },
    // 加载数据
    loadSubordinateReport(type) {
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
      params.proxy = this.selectUserID;
      params.start = this.start;
      // console.log(params, '----this is params')
      this.$api.report(params).then(res => {
        // console.log(res, '----this is res')
        if (res.data.code == 0) {
          let subordinateReportData = res.data.data;
          this.message = Number(res.data.message);
          // 记录初始化代理级别以及当前代理级别
          if (res.data.data.length > 0) {
            for (var i = 0; i < subordinateReportData.length; i++) {
              this.subordinateReportData.push(subordinateReportData[i])
            }
            if (this.subordinateReportData.length % 10 == 0) {
              this.pageText = '点击加载更多'
            } else {
              this.pageText = '已显示全部数据'
            }
            if (type && type == "once") {
              this.startLevel = Number(res.data.message) - Number(res.data.data[0].comments);
              this.nowLevel = Number(res.data.message) - Number(res.data.data[0].comments);
            } else {
              this.nowLevel = Number(res.data.data[0].comments);
            }
          }
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    this.Id = this.$route.params.Id;
    this.selectUserID = '';
    this.start = 0;
    this.loadSubordinateReport("once")
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
.subordinateReportBox table {
  width: 100%;
}

.subordinateReportBox table thead tr th {
  height: 80px;
  font-size: 28px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.subordinateReportBox table tbody tr td {
  border-top: 2px solid #f4f4f4;
  height: 90px;
  text-align: center;
  vertical-align: middle;
  color: rgba(51, 51, 51, 1);
  font-size: 28px;
  background: #fff;
}

.subordinateReportBox p {
  background: #fff;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  margin-top: 2px;
}

/*弹层*/
.subordinateReportBox .rightActionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__menu .weui-actionsheet__cell,
.subordinateReportBox .rightActionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action .weui-actionsheet__cell,
.subordinateReportBox .userActionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__menu .weui-actionsheet__cell,
.subordinateReportBox .userActionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action .weui-actionsheet__cell {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: rgba(0, 0, 0, 1);
}

.subordinateReportBox .rightActionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action,
.subordinateReportBox .userActionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action {
  margin-top: 20px;
}

/*返点详情*/
.subordinateReportBox .popupBox .vux-popup-dialog .vux-popup-header {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: #666;

}

.subordinateReportBox .popupBox .vux-popup-dialog .vux-popup-header .vux-popup-header-right {
  color: #666;
}

.subordinateReportBox .popupBox .vux-popup-dialog .everyBox {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  background: #fff;
  padding: 0 30px;
  border-bottom: 2px solid #f4f4f4;
}

.subordinateReportBox .popupBox .vux-popup-dialog .everyBox span:nth-child(1) {
  color: #000;
  float: left;
}

.subordinateReportBox .popupBox .vux-popup-dialog .everyBox span:nth-child(2) {
  color: #666;
  float: right;
}

</style>
