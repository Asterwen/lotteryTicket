import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    usermenty:{
      pageNo:0
    },
    publicInfo: {
      // 登录状态
      landingStatus: false,
      moneyAble: '',
      // 用户信息
      userInfo: {
        id: '', //用户id
        realName: '', //真实姓名
        nickName: '', //用户昵称
        phone: '', //手机号
        handUrl: '', //用户头像
        payAble: false, //是否设置了支付密码 实名认证
        card: '1', // 0是有银行卡  1是没有银行卡
        identityNum: '', //实名认证身份证号码
        isAngent: '0', //0是用户，1是代理，用于判断是否显示代理中心
        withdraw: false,
        token:''
      },
      // 当前操作页面链接,上一个页面链接及back链接，当出现需要校验状态跳转时保留当前操作页面链接，方便校验后回到当前页面
      operationPageLink: {
        type: 'normal',
        normalArr: [],
        specialArr: [],
      },
      // 当前选中底部导航
      bottomNavigation: {
        activeNum: 0, //当前选中的底部导航下标
        show: true, //是否显示底部导航
      },
      // 公共头部状态管理
      publicHeaderStatus: {
        isShow: true, //是否显示公共头部
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShow: false, //左侧区域是否显示
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: '', //中间区域内容
        centerContentClass: '', //中间区域样式类名
        rightShow: false, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
        rightTumpLink: '', //点击右侧跳转链接
      },
    }
  },
  mutations: {
    // 页面刷新时设置publicInfo
    setPublicInfo(state, publicInfo) {
      state.publicInfo = publicInfo;
    },
    // 设置登陆状态
    setLandingStatus(state, status) {
      state.publicInfo.landingStatus = status;
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.publicInfo.userInfo = userInfo;
      state.publicInfo.userInfo.status = true;
    },
    // 设置当前操作页面链接,上一个页面链接及back链接
    setOperationPageLink(state, operationPageLink) {
      state.publicInfo.operationPageLink = operationPageLink;
    },
    // 设置底部导航
    setBottomNavigation(state, bottomNavigation) {
      state.publicInfo.bottomNavigation = bottomNavigation;
    },
    // 设置公共头部状态
    setPublicHeaderStatus(state, publicHeaderStatus) {
      state.publicInfo.publicHeaderStatus = publicHeaderStatus;
    },
  },
  actions: {
    // 页面刷新时设置publicInfo
    setPublicInfo(context, publicInfo) {
      context.commit('setPublicInfo', publicInfo)
    },
    // 设置登陆状态
    setLandingStatus(context, status) {
      context.commit('setLandingStatus', status)
    },
    // 设置用户信息
    setUserInfo(context, userInfo) {
      context.commit('setUserInfo', userInfo)
    },
    // 设置当前操作页面链接,上一个页面链接及back链接
    setOperationPageLink(context, operationPageLink) {
      context.commit('setOperationPageLink', operationPageLink)
    },
    // 设置底部导航
    setBottomNavigation(context, bottomNavigation) {
      context.commit('setBottomNavigation', bottomNavigation)
    },
    // 设置公共头部状态
    setPublicHeaderStatus(context, publicHeaderStatus) {
      context.commit('setPublicHeaderStatus', publicHeaderStatus)
    },
  }
})
export default store
