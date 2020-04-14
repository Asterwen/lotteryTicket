<!-- 今日盈利页面 -->
<template>
  <div class="today">
    <div class="titleBgImgbox">
      <p>盈利金额</p>
      <p class="money">{{today.total}}</p>
      <span>盈亏计算公式：中奖-投注+活动+返点</span>
    </div>
    <div class="contentBox">
      <div class='left fir'>
        <span>&nbsp;{{today.payOrder}}</span>
        <p>投注金额</p>
      </div>
      <div class='center fir'>
        <span>&nbsp;{{today.win}}</span>
        <p>中奖金额</p>
      </div>
      <div class='right fir'>
        <span>&nbsp;{{today.activity}}</span>
        <p>活动礼金</p>
      </div>
      <div class='left'>
        <span>&nbsp;{{today.commission}}</span>
        <p>返点金额</p>
      </div>
      <div>
        <span>&nbsp;{{today.recharge}}</span>
        <p>充值金额</p>
      </div>
      <div class='right'>
        <span>&nbsp;{{today.withdraw}}</span>
        <p>提现金额</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      Id:0,
      today: {},
    }
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
  created() {
    this.Id = this.$route.params.Id;
    // 今日盈利接口
    this.$api.everyDayWin().then(res => {
      if (res.data.code == 0) {
        this.today = res.data.data;
      }
    }).catch(err => {
      console.log(err, '---no');
    })
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
      centerContent: 'src/assets/img/titleHeaderImg/ProfitAndLossToday.png', //中间区域内容
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
.today .titleBgImgbox {
  width: 100%;
  padding-top: 60px;
  height: 340px;
  background: linear-gradient(to bottom, #6a202d, #3b052c);
  margin-bottom: 20px;
  position: relative;
}

.today .titleBgImgbox p {
  text-align: center;
  color: #fced08;
  font-size: 28px;
  padding-top: 16px;
}

.today .titleBgImgbox p.money {
  font-size: 58px;
}

.today .titleBgImgbox span {
  position: absolute;
  left: 30px;
  bottom: 30px;
  color: #fff;
  font-size: 28px;
}

.today .contentBox {
  padding: 30px;
  background-color: #fff;
  height: 400px;
}

.today .contentBox>div {
  float: left;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 224px;
  text-align: center;
}

.today .contentBox div.left {
  border-right: 1px solid #ccc;
}

.today .contentBox div.right {
  border-left: 1px solid #ccc;
}

.today .contentBox div.fir {
  border-bottom: 1px solid #ccc;
}

.today .contentBox span {
  color: #ff6818;
  font-size: 34px;
}

.today .contentBox p {
  font-size: 30px;
  padding-top: 10px;
  color: #000;
}

</style>
