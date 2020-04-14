<!-- 全名代理 -->
<template>
  <div class="secret">
    <div class="titleBgImgbox">
    </div>
    <div class="contentBox">
      <h3>【代理简介】</h3>
      <ul>
        <li>1:当月下级会员 首充100 送18彩金</li>
        <li>2:当月下级会员 首充200 送28彩金</li>
        <li>3:当月下级会员 首充500 送38彩金</li>
        <li>4:当月下级会员 首充1000 送58彩金</li>
        <li>5:当月下级会员 首充5000 送88彩金</li>
        <li>6:当月下级会员 首充10000 送188彩金</li>
        <li>7:当月下级会员 首充 50000 送588彩金 </li>
      </ul>
      <h2 style="color: rgb(255, 0, 0)">下级会员人数奖励</h2>
      <ul>
        <li>1: 当月下级会员人数 5+ 会员达到vip4：送58元</li>
        <li>2: 当月下级会员人数 10+ 会员达到vip4：送128元</li>
        <li>3: 当月下级会员人数 20+ 会员达到vip4：送288元</li>
        <li>4: 当月下级会员人数 50+ 会员达到vip4：送588元</li>
        <li>5: 当月下级会员人数 100+会员达到vip4：送1288元</li>
      </ul>
      <h2 style="color: rgb(255, 0, 0)">下级会员流水奖励</h2>
      <ul>
        <li>1: 当月团队5人以上 总打码50-100万:送188元</li>
        <li>2: 当月团队5人以上 总打码100-300万:送388元</li>
        <li>3: 当月团队5人以上 总打码300-600万:送888元</li>
        <li>4: 当月团队5人以上 总打码600-1000万:送1888元</li>
        <li>5: 当月团队5人以上 总打码1000万以上: 送3888元</li>
      </ul>
      <span>注：（会员人数奖励与下级会员流水奖励必须同时达到才可以申请此奖金,否则无法申请）达到要求的用户请于每月6-12号联系代理专员</span>
      <span>如果您的下级会员也是代理，他下级会员的投注人数，也将自动计入您线下的投注人数。</span>
      <h2 style="color: rgb(255, 0, 0)">如何为下级开户?</h2>
      <ul>
        <li>登录会员账号-我的账户-代理中心-下级开户</li>
        <li>点击下级开户，可查看自身返点也可为下级设置返点。 </li>
      </ul>
      <h2 style="color: rgb(255, 0, 0)">下级返点比例设置说明介绍：</h2>
      <ul>
        <li>如果您要赚取您下级1%，就全部都下降1.0，比如：您自身是8.0您就设置为7.0，自身是7.5您就设置为6.5</li>
        <li>如果您要赚取您下级1.5%，就是全部都下降1.5，比如：您自身是8.0您就设置6.5，自身是7.5您就设置6.0</li>
        <li>赚取1%的意思就是，您的下级如果下注金额达到1万，您可以抽100.跟充值多少没有关系，有的人充值100块下注金额能打到10多万，等于您可以抽1千多</li>
        <li>注：您赚取下级1%，他赔率就会比您自身少0.2，,如您自身是19.6，您的下级赔率会是19.4，下注100中奖了会比您少2块，2块哪里去了呢，就是被您</li>
      </ul>
      <h2 style="color: rgb(255, 0, 0)">返点何时结算？</h2>
      <p>不是月结也不是日结，是现结！您的下级每次下注，您即可获取返点，返点在您的会员账户里面查看。</p>
      <h2 style="color: rgb(255, 0, 0)">返佣算法：您的下线今天彩票游戏总打码100万，那么您的返佣就是1000000*1%=10000元。可直接提现，无需打码！</h2>
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
      centerContent: 'src/assets/img/titleHeaderImg/UniversalAgency.png', //中间区域内容
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
  background-image: url('../../../../assets/img/activityAndAgency/allJoinbg.png');
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

.secret .contentBox>span {
  display: inline-block;
  padding-top: 30px;
  font-size: 28px;
  color: rgb(102, 102, 102);
}

.secret .contentBox p {
  font-size: 30px;
  color: rgb(0, 0, 0);
  padding: 30px 0;
}

.secret .contentBox li {
  font-size: 30px;
  color: #000;
  line-height: 48px;
}

.secret .contentBox p.alert {
  color: rgb(255, 0, 0);
  font-size: 36px;
}

</style>
