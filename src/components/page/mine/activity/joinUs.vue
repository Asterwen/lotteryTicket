<!-- 代理加盟 -->
<template>
  <div class="secret">
    <div class="titleBgImgbox">
    </div>
    <div class="contentBox">
      <h3>【代理简介】</h3>
      <p>乐彩高频平台属于多元化的产品，沿用最公平、公正、公开的系统，配备全新最优代理合作模式，支持个人或者团队合作，零风险，零成本，高收益。以投注金额为基础方式计算，不必担心输赢，只要您的下级团队有投注额度，无论投注多少和输赢，您都可以实时获得返点赚取佣金，免流水，随时提现！</p>
      <p>无论您拥有的是网路资源，或者是人脉资源，我们竭诚欢迎您加入乐彩高频平台合作伙伴的行列，绝对是您最理智的选择！《言出必行，诚信天下》期待您的加入！</p>
      <h3 style="color: rgb(255, 0, 0)">如何赚取返点为下级开户？</h3>
      <p>点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；<br>如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；</p>
      <h3 style="color: rgb(227, 108, 9)">下级返点比例设置说明介绍：</h3>
      <p>如果您要抽您下级1%，就全部都下降1.0，比如：您自身是8.0您就设置为7.0，自身是7.5您就设置为6.5</p>
      <p>如果您要抽您下级1.5%，就是全部都下降1.5，比如：您自身是8.0您就设置6.5，自身是7.5您就设置6.0</p>
      <p>抽1%的意思就是，您的下级如果下注金额达到1万，您可以抽100.跟充值多少没有关系，有的人充值100块下注金额能打到10多万，等于您可以抽1千多</p>
      <p>注：您抽下级1%，他赔率就会比您自身少0.2，,如您自身是196，您的下级赔率会是194，下注100中奖了会比您少2块，2块哪里去了呢，就是被您抽走了！</p>
      <h3 style="color: rgb(255, 0, 0)">返佣算法：您的下线今天彩票游戏总打码100万，那么您的返佣就是1000000*1%=10000元。可直接提现，无需打码！</h3>
      <span style='box-sizing:inherit; font-family:微软雅黑, "Microsoft YaHei"; font-size:16px; color:rgb(0, 0, 0);'>温馨提示：</span>
      <p>返点不同赔率也不同，点击返点赔率表，可查看返点赔率；<br>返点越低，赔率就越低，建议为下级设置的返点不要过低；<br>可在代理报表、投注明细、交易明细查看代理的发展情况；<br>建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。</p>
      <h2>【代理优势】</h2>
      <p>a.代理门槛低<br>b.实时获取返点佣金<br>c.零风险，零成本，高收益<br>d.不限制投注量和投注人数皆可获得高返点佣金<br>e.返点佣金，无须流水，无条件可随时提现</p>
      <p>我们抛弃传统模式，只为合作伙伴创造最优势的盈利回报模式！足不出户，随时随地无条件提现佣金。</p>
      <p>佣金获取与提现<br>1.根据团队有效投注量实时返点获取佣金<br>2无需流水，绑定银行卡后随时可申请提现</p>
      <p class="alert">注意事项：<br>1：杜绝非法变现套利，违规者冻结会员账号。<br>2：为了避免文字上的差异，乐彩高频保留对所有活动的最终解释权。<br></p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { XTable } from 'vux'
export default {
  components: {
    XTable
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    goLink(link) {
      this.$router.push({ path: link })
    },
  },
  created() {},
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/AgentAlliance.png', //中间区域内容
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
.secret .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/acdaili.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /*margin-bottom: 20px;*/
}

.secret .contentBox {
  padding: 30px;
}

.secret .contentBox h2 {
  font-size: 36px;
  padding: 30px 0;
  font-weight: 400;
}

.secret .contentBox h3 {
  padding-top: 30px;
  font-size: 30px;
  font-weight: 400;
  color: rgb(102, 102, 102);
}

.secret .contentBox p {
  font-size: 30px;
  color: rgb(0, 0, 0);
  padding: 30px 0;
}

.secret .contentBox li {
  font-size: 30px;
  color: rgb(102, 102, 102);
  line-height: 48px;
}

.secret .contentBox p.alert {
  color: rgb(255, 0, 0);
  font-size: 36px;
}

</style>
