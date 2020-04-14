<template>
  <div class="memberManagementBox">
    <table cellspacing="0">
      <thead>
        <tr>
          <th>账号</th>
          <th>类型</th>
          <th>下级人数</th>
          <th>登录时间</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="clickUser(item)" v-for="(item,key) in memberList" :key="key">
          <td>{{item.account}}</td>
          <td>{{message-Number(item.comments)}}级{{item.isAngent=='1'?"代理":"用户"}}</td>
          <td>{{item.sums}}</td>
          <td>{{item.createTime}}</td>
        </tr>
      </tbody>
    </table>
    <p class="pageBox" v-html='pageText' @click="clickPage"></p>
    <div class="actionsheetBox">
      <actionsheet v-model="showActionsheet" :menus="actionsheetMenu" show-cancel @on-click-menu="clickActionsheet">
        <p slot="header" v-html="headerHtml"></p>
      </actionsheet>
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
import { Actionsheet, PopupHeader, Popup } from 'vux'
export default {
  components: { Actionsheet, PopupHeader, Popup },
  data() {
    return {
      actionsheetMenu: [], //弹层数据
      selectUserID: '', //当前页的会员ID
      clickUserID: '', //点击的会员ID
      showActionsheet: false, //是否显示弹层
      memberList: [], //会员列表
      message: 0, //代理级别总数
      startLevel: 0, //初始化代理级别
      nowLevel: 0, //当前代理级别
      headerHtml: '', //弹层头部html
      start: 0, //数据开始下标，用于分页
      pageText: '点击加载更多', //全部加载完成显示：已显示全部数据
      showPopup: false,
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
    clickActionsheet(key, item) {
      // console.log(key, '---', item, '----key, item')
      if (key == 'cancel') {
        this.showActionsheet = false;
      } else {
        if (item.label == "查看下级") {
          this.selectUserID = this.clickUserID;
          this.start = 0;
          this.memberList = [];
          this.loadAgencyUserInfo();
        } else if (item.label == "查看上级") {
          this.selectUserID = '';
          this.start = 0;
          this.memberList = [];
          this.loadAgencyUserInfo('once');
        } else if (item.label == "查看返点") {
          let params = {};
          params.userId = this.clickUserID;
          this.$api.userRatio(params).then(res => {
            // console.log(res, '----this is res')
            if (res.data.code == 0) {
              this.showActionsheet = false;
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
    clickUser(item) {
      this.clickUserID = item.userId;
      let actionsheetMenu = [];
      this.headerHtml = '<span style="color:#2E56DB;font-size: 16px;">' + item.account + '</span>';
      actionsheetMenu.push({
        label: '查看返点',
      })
      if (Number(item.sums) > 0) {
        actionsheetMenu.push({
          label: '查看下级',
        })
      }
      if (this.nowLevel != this.startLevel) {
        actionsheetMenu.push({
          label: '查看上级',
        })
      }
      this.actionsheetMenu = actionsheetMenu;
      this.showActionsheet = true;
    },
    clickPage() {
      if (this.pageText == '点击加载更多') {
        this.start += 10;
        this.loadAgencyUserInfo();
      } else {
        this.pageText = '已显示全部数据'
        alert("没有更多数据了")
      }
    },
    loadAgencyUserInfo(type) {
      let params = {};
      params.userId = this.selectUserID;
      params.start = this.start;
      // console.log(params, '---this is params')
      this.$api.agencyUserInfo(params).then(res => {
        // console.log(res, '----this is res')
        if (res.data.code == 0) {
          let memberData = res.data.data;
          this.message = Number(res.data.message);
          // 记录初始化代理级别以及当前代理级别
          if (res.data.data.length > 0) {
            for (var i = 0; i < memberData.length; i++) {
              this.memberList.push(memberData[i])
            }
            if (this.memberList.length % 10 == 0) {
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
          }else{
            this.pageText = '已显示全部数据'
          }
        } else {
          alert(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      })
    },
  },
  created() {
    this.selectUserID = '';
    this.start = 0;
    this.loadAgencyUserInfo('once')
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
      centerContent: 'src/assets/img/titleHeaderImg/MembershipManagement.png', //中间区域内容
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
.memberManagementBox table {
  width: 100%;
}

.memberManagementBox table thead tr th {
  height: 80px;
  font-size: 28px;
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}

.memberManagementBox table tbody tr td {
  border-top: 2px solid #f4f4f4;
  height: 90px;
  text-align: center;
  vertical-align: middle;
  color: rgba(51, 51, 51, 1);
  font-size: 28px;
  background: #fff;
}

.memberManagementBox p {
  background: #fff;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: rgba(51, 51, 51, 1);
  font-size: 24px;
  margin-top: 2px;
}

/*弹层*/
.memberManagementBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__menu .weui-actionsheet__cell,
.memberManagementBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action .weui-actionsheet__cell {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: rgba(0, 0, 0, 1);
}

.memberManagementBox .actionsheetBox .vux-actionsheet .weui-actionsheet .weui-actionsheet__action {
  margin-top: 20px;
}

/*返点详情*/
.memberManagementBox .popupBox .vux-popup-dialog .vux-popup-header {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  color: #666;

}

.memberManagementBox .popupBox .vux-popup-dialog .vux-popup-header .vux-popup-header-right {
  color: #666;
}

.memberManagementBox .popupBox .vux-popup-dialog .everyBox {
  height: 90px;
  line-height: 90px;
  padding: 0;
  font-size: 30px;
  background: #fff;
  padding: 0 30px;
  border-bottom: 2px solid #f4f4f4;
}

.memberManagementBox .popupBox .vux-popup-dialog .everyBox span:nth-child(1) {
  color: #000;
  float: left;
}

.memberManagementBox .popupBox .vux-popup-dialog .everyBox span:nth-child(2) {
  color: #666;
  float: right;
}

</style>
