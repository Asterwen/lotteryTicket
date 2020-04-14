import ajax from './ajax'
import qs from 'qs'
// 注册登陆
const invitationCode = (params) => { //验证邀请码 done
  return ajax.post(`lecai_login/invitationCode`, qs.stringify(params))
}
const login = (params) => { //登陆 done
  return ajax.post(`lecai_login/Login`, qs.stringify(params))
}
const sign = (params) => { //注册 done
  return ajax.post(`lecai_login/register`, qs.stringify(params))
}
const registerApp = (params) => { //APP注册 done
  return ajax.post(`lecai_login/registerApp`, qs.stringify(params))
}
const signOut = (params) => { //退出登录 done
  return ajax.post(`lecai_login/loginout`, qs.stringify(params))
}
const code = (params) => { //短信验证码 done
  return ajax.post(`lecai_login/tgoBa1ck23Code.do`, qs.stringify(params))
}
const modify = (params) => { //修改用户数据
  return ajax.post(`lecai_login/modify`, qs.stringify(params))
}
const amountInfo = (params) => { //获取账户金额
  return ajax.post(`lecai_login/amountInfo`, qs.stringify(params))
}
const forget = (params) => { //未登陆修改密码 done
  return ajax.post(`lecai_login/wloginModfy`, qs.stringify(params))
}
const logForget = (params) => { //登陆后修改密码 done
  return ajax.post(`lecai_login/loginPassModfy`, qs.stringify(params))
}
const userInfo = (params) => { //获取用户信息
  return ajax.post(`lecai_login/userInfo`, qs.stringify(params))
}
const modify_copy = (params) => { //修改用户数据_copy
  return ajax.post(`lecai_login/modify_1545987950479`, qs.stringify(params))
}
const setTradePassWord = (params) => { //设置用户交易密码
  return ajax.post(`lecai_login/setTradePassWord`, qs.stringify(params))
}
const tradePassWorde = (params) => { //修改用户交易密码 done
  return ajax.post(`lecai_login/tradePassWorde`, qs.stringify(params))
}
//活动中心
const userVip = (params) => { //每日加奖和晋级奖励
  return ajax.post(`/common/userVip`, qs.stringify(params))
}
const everyDayDraw = (params) => { //领取奖励
  return ajax.post(`/common/everyDayDraw`, qs.stringify(params))
}
const everyDayWin = (params) => { //今日盈利
  return ajax.post(`/common/everyDayWin`, qs.stringify(params))
}

// 银行卡管理
const changeDefault = (params) => { //设置默认银行卡 done
  return ajax.post(`lecai_bankInof/changeDefault`, qs.stringify(params))
}
const delCard = (params) => { //删除银行卡 done
  return ajax.post(`lecai_bankInof/delCard`, qs.stringify(params))
}
const addBind = (params) => { //添加银行卡 done
  return ajax.post(`lecai_bankInof/addBind`, qs.stringify(params))
}
const toBankList = (params) => { //银行卡列表 done
  return ajax.post(`lecai_bankInof/toBankList`, qs.stringify(params))
}

// 排行榜
const rankList = (params) => { //排行榜
  return ajax.post(`lecai_rank/rankList`, qs.stringify(params))
}
const rankWin = (params) => { //中奖信息
  return ajax.post(`lecai_rank/rankWin`, qs.stringify(params))
}
const userDetail = (params) => { //中奖信息详情
  return ajax.post(`lecai_rank/userDetail`, qs.stringify(params))
}

// 下单
const pay = (params) => { //下注y
  return ajax.post(`payOrder/pay`, qs.stringify(params))
}
const LotteryInfo = (params) => { //彩种 开奖时间 期数
  return ajax.post(`payOrder/LotteryInfo`, qs.stringify(params))
}
const PlayInfo = (params) => { //彩种 开奖时间 期数
  return ajax.post(`payOrder/playInfo`, qs.stringify(params))
}
const heList = (params) => { //号码走势
  return ajax.post(`/tendency/heList`, qs.stringify(params))
}
// 充值提现
const withdrawInfo = (params) => { //充值和提现信息获取 done
  return ajax.post(`lecai_recharge/withdrawInfo`, qs.stringify(params))
}
const doWithDraw = (params) => { //确认提现 done
  return ajax.post(`lecai_withdraw/doWithDraw`, qs.stringify(params))
}
const rechargePay = (params) => { //确认充值 done
  return ajax.post(`lecai_recharge/rechargePay`, qs.stringify(params))
}
const chargeState = (params) => { //支付状态查询 done
  return ajax.post(`lecai_recharge/chargeState`, qs.stringify(params))
}

// 记录
const record = (params) => { //用户购买记录 done
  return ajax.post(`lecai_record/record`, qs.stringify(params))
}
const recordDetail = (params) => { //用户购买详细 done
  return ajax.post(`lecai_record/recordDetail`, qs.stringify(params))
}
const recordLog = (params) => { //充值和提现记录 done
  return ajax.post(`lecai_recharge/record`, qs.stringify(params))
}
const tadeDetail = (params) => { //交易详细页 done
  return ajax.post(`lecai_record/tadeDetail`, qs.stringify(params))
}

// 代理
const open = (params) => { //代理开户 done
  return ajax.post(`proxy/open`, qs.stringify(params))
}
// const tadeDetail = (params) => { //交易明细
//   return ajax.post(`proxy/sssss`, qs.stringify(params))
// }
const proxyOrderDetail = (params) => { //投注明细 
  return ajax.post(`proxy/proxyOrderDetail`, qs.stringify(params))
}
const agencyUserInfo = (params) => { //会员管理 done
  return ajax.post(`proxy/userInfo`, qs.stringify(params))
}
const report = (params) => { //下级报表 done
  return ajax.post(`proxy/report`, qs.stringify(params))
}
const proxyInfo = (params) => { //代理报表 done
  return ajax.post(`proxy/proxyInfo`, qs.stringify(params))
}
const userRatio = (params) => { //查看用户返佣 done
  return ajax.post(`proxy/userRatio`, qs.stringify(params))
}
const invideCode = (params) => { //查询邀请码 done
  return ajax.post(`proxy/invideCode`, qs.stringify(params))
}
const userRatioById = (params) => { //下级开户返点
  return ajax.post(`proxy/userRatioById`, qs.stringify(params))
}

// 彩票
const getLottery = (params) => { //所有彩种当期期开奖显示 done
  return ajax.post(`lottery/getLottery`, qs.stringify(params))
}
const getLotterying = (params) => { //彩票列表 done
  return ajax.post(`lottery/getLotterying`, qs.stringify(params))
}

//刮刮乐
const PayOrderGgl = (params) => { //下单
  return ajax.post(`payOrder/PayOrderGgl`, qs.stringify(params))
}
const openOrderGgl = (params) => { //开奖
  return ajax.post(`payOrder/openOrderGgl`, qs.stringify(params))
}
const lotteryGgl = (params) => { //兑奖
  return ajax.post(`payOrder/lotteryGgl`, qs.stringify(params))
}
const gglCurrentNumByUserId = (params) => { //查询当前用户可刮奖数量
  return ajax.post(`/payOrder/gglCurrentNumByUserId`, qs.stringify(params))
}

const apiList = {
  invitationCode,
  sign,
  registerApp,
  login,
  code,
  modify,
  amountInfo,
  forget,
  userInfo,
  modify_copy,
  changeDefault,
  delCard,
  addBind,
  toBankList,
  rankList,
  rankWin,
  userDetail,
  pay,
  LotteryInfo,
  withdrawInfo,
  doWithDraw,
  rechargePay,
  record,
  recordDetail,
  recordLog,
  tadeDetail,
  PlayInfo,
  chargeState,
  logForget,
  tradePassWorde,
  setTradePassWord,
  getLottery,
  getLotterying,
  PayOrderGgl,
  openOrderGgl,
  lotteryGgl,
  gglCurrentNumByUserId,
  userVip,
  everyDayDraw,
  open,
  agencyUserInfo,
  report,
  userRatio,
  invideCode,
  everyDayWin,
  signOut,
  heList,
  proxyOrderDetail,
  proxyInfo,
  userRatioById
}

export default apiList
