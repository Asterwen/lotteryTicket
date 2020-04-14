import Vue from "vue";
import Router from "vue-router";

// 大厅
import Home from "../components/page/index/index";
// 测试
import Ceshi from "../components/page/index/text";

//刮刮乐
import Scratchmusic from "../components/page/guagua/Scratchmusic";
import Fivepieces from "../components/page/guagua/Fivepieces";
import Twentypieces from "../components/page/guagua/Twentypieces";
import purchase from "../components/page/guagua/purchase";
// 快三
import QuickThree from "../components/page/index/quickThree";
import question from "../components/page/index/question";
import Trend from "../components/page/index/trend";
import Bets from "../components/page/index/bets";

// 十一选五
import ElevenChooseFive from "../components/page/index/elevenChooseFive/elevenChooseFive";
import BettingPage from "../components/page/index/elevenChooseFive/bettingPage";
import TrendPage from "../components/page/index/elevenChooseFive/trendPage";

// 历史开奖记录
import History from "../components/page/history/history";
import TypeHistory from "../components/page/history/typeHistory";
import PalyRule from "../components/page/history/palyRule";

// 个人中心
import Mine from "../components/page/mine/mine";
import SelfRecord from "../components/page/mine/selfRecord";
import MineHeader from "../components/page/mine/mineCommon/mineHeader";
import MineFooter from "../components/page/mine/mineCommon/mineFooter";
import Recharge from "../components/page/mine/recharge";
import CashWithdrawal from "../components/page/mine/cashWithdrawal";
import BindingBankCards from "../components/page/mine/bindingBankCards";
import BankCardList from "../components/page/mine/bankCardList";
import SelfControl from "../components/page/mine/selfControl";
import SelfRealName from "../components/page/mine/selfRealName";
import SelfChangeName from "../components/page/mine/selfChangeName";
import SelfCountSafe from "../components/page/mine/selfCountSafe";
import SelfKefu from "../components/page/mine/selfKefu";
import SelfPW from "../components/page/mine/selfPW";
import SelfNike from "../components/page/mine/selfNike";
import MineForget from "../components/page/mine/mineForget";
import SetPS from "../components/page/mine/SetPS";
import SelfHeadImg from "../components/page/mine/selfHeadImg";
import Today from "../components/page/mine/today";
import SelfSet from "../components/page/mine/selfSet";
import About from "../components/page/mine/about";
import Protocal from "../components/page/mine/protocal";
import Private from "../components/page/mine/private";
import Chat from "../components/page/mine/chat";
import OrderList from "../components/page/mine/orderList";

//活动中心
import Daily from "../components/page/mine/activity/daily";
import GetCheap from "../components/page/mine/activity/getCheap";
import JoinUs from "../components/page/mine/activity/joinUs";
import Level from "../components/page/mine/activity/level";
import Secret from "../components/page/mine/activity/secret";
import AllJoin from "../components/page/mine/activity/allJoin";
import Activity from "../components/page/mine/activity/activity";

// 代理中心
import AgencyCenter from "../components/page/mine/agencyCenter/agencyCenter"; //代理中心
import AgencyStatement from "../components/page/mine/agencyCenter/agencyStatement"; //代理说明
import BettingDetails from "../components/page/mine/agencyCenter/bettingDetails"; //投注明细
import MemberManagement from "../components/page/mine/agencyCenter/memberManagement"; //会员管理
import ProxyStatement from "../components/page/mine/agencyCenter/proxyStatement"; //代理报表
import SubordinateOpen from "../components/page/mine/agencyCenter/subordinateOpen"; //下级开户
import SubordinateReport from "../components/page/mine/agencyCenter/subordinateReport"; //下级报表
import YransactionDetails from "../components/page/mine/agencyCenter/yransactionDetails"; //交易明细
import AgencyIntro from "../components/page/mine/agencyCenter/agencyIntro"; //交易明细

// 排行榜
import Rank from "../components/page/rank/rank";
import RankDetail from "../components/page/rank/rankDetail";

// 我的购买记录
import Record from "../components/page/record/record";
import RecordDetail from "../components/page/record/recordDetail";

//登陆注册忘记密码
import Login from "../components/page/log/login";
import Sign from "../components/page/log/sign";
import Forget from "../components/page/log/forget";
import store from "../store/store";

//全局遮罩层
import Common from "../components/page/commen/commen";
import Commontwo from "../components/page/commen/commentwo";

//充值帮助
// import Rechargehelp from "../components/page/commen/Rechargehelp"
import Rechargehelp from "../components/page/commen/Rechargehelp"

Vue.use(Router);
// export default {install};
// export default new Router
const router = new Router({
  // install,
  routes: [{
      path: "/",
      redirect: "/page/index188888889"
    },
    // 大厅
    {
      path: "/page/index:Id",
      name: "Home",
      component: Home
    },
    {
      path: "/page/index/text",
      name: "Ceshi",
      component: Ceshi
    },

    // 快三
    {
      path: "/quickThree:Id",
      name: "quickThree",
      component: QuickThree
    },
    {
      path: "/question:Id",
      name: "question",
      component: question
    },
//  刮刮乐
    {
      path: "/Scratchmusic:Id",
      name: "Scratchmusic",
      component: Scratchmusic
    },
    {
      path: "/Fivepieces:Id",
      name: "Fivepieces",
      component: Fivepieces
    },
    {
      path: "/Twentypieces:Id",
      name: "Twentypieces",
      component: Twentypieces
    },
//	刮刮乐购买页面
    {
      path: "/purchase:Id",
      name: "purchase",
      component: purchase
    },
    {
      // 查看走势页面
      path: "/trend:Id",
      name: "trend",
      component: Trend
    },
    {
      // 下注页面
      path: "/bets:Id",
      name: "bets",
      meta: {
        requireAuth: true
      },
      component: Bets
    },
    // 十一选五
    {
      path: "/page/index/elevenChooseFive/elevenChooseFive:Id",
      name: "elevenChooseFive",
      component: ElevenChooseFive
    },
    {
      path: "/page/index/elevenChooseFive/bettingPage:Id",
      name: "bettingPage",
      component: BettingPage
    },
    {
      path: "/page/index/elevenChooseFive/trendPage:Id",
      name: "trendPage",
      component: TrendPage
    },

    // 历史开奖记录
    {
      path: "/page/history:Id",
      name: "history",
      component: History
    },
    {
      path: "/page/history/typeHistory:Id",
      name: "typeHistory",
      component: TypeHistory
    },
    {
      path: "/page/history/palyRule:Id",
      name: "palyRule",
      component: PalyRule
    },
    //活动中心
    {
      path: "/page/mine/activity/daily:Id",
      name: "daily",
      component: Daily
    },
    {
      path: "/page/mine/activity/getCheap",
      name: "getCheap",
      component: GetCheap
    },
    {
      path: "/page/mine/activity/orderList",
      name: "orderList",
      component: OrderList
    },
    {
      path: "/page/mine/activity/joinUs",
      name: "joinUs",
      component: JoinUs
    },
    {
      path: "/page/mine/activity/level:Id",
      name: "level",
      component: Level
    },
    {
      path: "/page/mine/activity/secret",
      name: "secret",
      component: Secret
    },
    {
      path: "/page/mine/activity/allJoin",
      name: "allJoin",
      component: AllJoin
    },
    {
      path: "/page/mine/activity/activity:Id",
      name: "activity",
      component: Activity
    },
    // 个人中心
    {
      path: "/page/mine:Id",
      name: "mine",
      meta: {
        requireAuth: true
      },
      component: Mine
    },
    {
      path: "/page/mine/selfRecord:Id",
      name: "selfRecord",
      component: SelfRecord
    },
    {
      path: "/page/mine/about:Id",
      name: "About",
      component: About
    },
    {
      path: "/page/mine/protocal:Id",
      name: "Protocal",
      component: Protocal
    },
    {
      path: "/page/mine/selfSet:Id",
      name: "selfSet",
      component: SelfSet
    },
    {
      path: "/page/mine/today:Id",
      name: "today",
      component: Today
    },
    {
      path: "/page/mine/selfKefu:Id",
      name: "selfKefu",
      component: SelfKefu
    },
    {
      path: "/page/mine/mineHeader:Id",
      name: "mineHeader",
      component: MineHeader
    },
    {
      path: "/page/mine/mineFooter",
      name: "mineFooter",
      component: MineFooter
    },
    {
      path: "/page/mine/recharge:Id",
      name: "recharge",
      component: Recharge
    },
    {
      path: "/page/mine/cashWithdrawal:Id",
      name: "cashWithdrawal",
      component: CashWithdrawal
    },
    {
      path: "/page/mine/bindingBankCards:Id",
      name: "bindingBankCards",
      component: BindingBankCards
    },
    {
      path: "/page/mine/bankCardList:Id",
      name: "bankCardList",
      component: BankCardList
    },
    {
      path: "/page/mine/selfNike:Id",
      name: "selfNike",
      component: SelfNike
    },
    {
      path: "/page/mine/private:Id",
      name: "private",
      component: Private
    },
    {
      path: "/page/mine/mineForget:Id",
      name: "mineForget",
      component: MineForget
    },
    {
      path: "/page/mine/selfControl:Id",
      name: "selfControl",
      component: SelfControl
    },
    {
      path: "/page/mine/selfRealName:Id",
      name: "selfRealName",
      component: SelfRealName
    },
    {
      path: "/page/mine/selfChangeName",
      name: "selfChangeName",
      component: SelfChangeName
    },
    {
      path: "/page/mine/selfCountSafe:Id",
      name: "selfCountSafe",
      component: SelfCountSafe
    },
    {
      path: "/page/mine/selfHeadImg:Id",
      name: "selfHeadImg",
      component: SelfHeadImg
    },
    {
      path: "/page/mine/chat",
      name: "chat",
      component: Chat
    },
    {
      path: "/page/mine/selfPW:Id",
      name: "selfPW",
      component: SelfPW
    },
    {
      path: "/page/mine/setPS:Id",
      name: "setPS",
      component: SetPS
    },
    // 代理中心
    {
      path: "/page/mine/agencyCenter/agencyCenter:Id",
      name: "agencyCenter",
      component: AgencyCenter
    },
    {
      path: "/page/mine/agencyCenter/agencyStatement",
      name: "agencyStatement",
      component: AgencyStatement
    },
    {
      path: "/page/mine/agencyCenter/bettingDetails",
      name: "bettingDetails",
      component: BettingDetails
    },
    {
      path: "/page/mine/agencyCenter/agencyIntro:Id",
      name: "agencyIntro",
      component: AgencyIntro
    },
    {
      path: "/page/mine/agencyCenter/memberManagement:Id",
      name: "memberManagement",
      component: MemberManagement
    },
    {
      path: "/page/mine/agencyCenter/proxyStatement:Id",
      name: "proxyStatement",
      component: ProxyStatement
    },
    {
      path: "/page/mine/agencyCenter/subordinateOpen:Id",
      name: "subordinateOpen",
      component: SubordinateOpen
    },
    {
      path: "/page/mine/agencyCenter/subordinateReport:Id",
      name: "subordinateReport",
      component: SubordinateReport
    },
    {
      path: "/page/mine/agencyCenter/yransactionDetails",
      name: "yransactionDetails",
      component: YransactionDetails
    },
    // 排行榜
    {
      path: "/page/rank:Id",
      name: "rank",
      component: Rank
    },
    {
      path: "/page/rank/rankDetail:Id",
      name: "rankDetail",
      component: RankDetail
    },
    // 我的购买记录
    {
      path: "/page/record:Id",
      name: "record",
      meta: {
        requireAuth: true
      },
      component: Record
    },
    {
      path: "/page/record/recordDetail:Id",
      name: "recordDetail",
      component: RecordDetail
    },

    //登陆注册忘记密码
    {
      path: "/page/log:Id",
      name: "login",
      component: Login
    },
    {
      path: "/page/log/forget:Id",
      name: "forget",
      component: Forget
    },

    {
      path: "/page/log/sign:Id",
      name: "sign",
      component: Sign
    },
    //全局遮罩层
    {
      path: "/commen",
      name: "common",
      component: Common
    },
//  app下载
    {
      path: "/commentwo",
      name: "commontwo",
      component: Commontwo
    },
    //充值帮助
    {
      path: "/page/commen/rechargehelp:Id",
      name: "rechargehelp",
      component: Rechargehelp
    }
  ]
});

// landingStatus
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断是否需要登录权限
    let landingStatus;
    if (localStorage.getItem("publicInfo") == undefined) {
      landingStatus = false;
    } else {
      landingStatus = JSON.parse(localStorage.getItem("publicInfo"))
        .landingStatus;
    }

    if (
      store.state.publicInfo.landingStatus == false &&
      landingStatus == false
    ) {
      // 判断是否登录
      // this.$router.push({ path: '/page/log' })
      let Id = to.fullPath.substr(to.fullPath.length - 9);
      console.log('halouhalou123123', to.fullPath.substr(to.fullPath.length - 9))
      if (Id == undefined || null) {
        Id = to.fullPath.substr(to.fullPath.length - 9);
        console.log('内', Id)
      }
      // 没登录则跳转到登录界面
      next({
        path: `/page/log${Id}`,
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
