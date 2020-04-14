<template>
  <div class="question">
    <div class="dantuo" v-if="this.$route.query.type == 1">
      <h2>什么是胆拖？</h2>
      <p>在胆拖投注中，我们把号码分成胆码和拖码两部分，胆码就是您认为出现的机会非常大的号码，它在所投注的每一注彩票里都固定出现，拖码即补充的其他可能会出的不同号码。由拖码与胆码共同组成一注完整的投注号码</p>
      <p>以双色球为例：</p>
      <p>假设您认为红球 01 02 03 04 05 必出，红球 31 32 33 可能会出，蓝球选择16</p>
      <p>那么则将 01 02 03 04 05 作为胆码，它们在每注彩票中都固定出现；将 31 32 33 作为拖码</p>
      <p>表示为（01 02 03 04 05）31 32 33:16</p>
      <p>这样胆码和拖码组合出来就是以下几注号码</p>
      <p>01 02 03 04 05 31：16</p>
      <p>01 02 03 04 05 32：16</p>
      <p>01 02 03 04 05 33：16</p>
    </div>
    <div class="wanfashuoming" v-if="this.$route.query.type == 2">
      <h2>开奖时间：10分钟一期</h2>
      <p>玩法规则：每期开奖出3个数字作为开奖号码，每个数字取值范围为1-6(相当于摇3个骰子)</p>
      <h2>奖项设置:</h2>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      Id:0,
      showHeaderArea: { //头部区域数据
        leftAreaShow: true, //左侧区域是否显示
        red: true,
        centerAreaShowLogo: true
      }
    };
  },
  created(){
    this.Id = this.$route.params.Id;
  },
  components: {},
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: true, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: this.$route.query.type == 1?"什么是胆拖？":"快3玩法", //中间区域内容
      centerContentClass: '', //中间区域样式类名
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
<style lang="less" scoped>
.wanfashuoming {
  background: #fff url(../../../assets/img/kaijiang_rule.png) no-repeat center;
  background-position-y: 350px;
  background-size: 88%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 94px;
  box-sizing: border-box;
  z-index: 1;
  overflow: auto;
}

.dantuo {
  background: #f2f3ed;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 94px;
  box-sizing: border-box;
  z-index: 1;
  overflow: auto;

  h2 {
    font-size: 28px;
    line-height: 80px;
    text-indent: 20px;
    color: #a30d0d;
    font-weight: normal;
  }

  p {
    font-size: 28px;
    line-height: 50px;
    padding: 0 38px 0 54px;
    color: #000000;
  }
}

.wanfashuoming {
  h2 {
    font-size: 28px;
    line-height: 80px;
    text-indent: 20px;
    color: #a30d0d;
    padding-left: 30px;
    font-weight: normal;
  }

  p {
    font-size: 28px;
    line-height: 50px;
    padding: 0 38px 0 54px;
    color: #000000;
  }
}

</style>
