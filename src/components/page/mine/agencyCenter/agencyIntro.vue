<!-- 代理说明页面 -->
<template>
  <div class="agencyIntro">
    <div class="titleBgImgbox">
      <p>什么是代理</p>
      <p>互惠互利&nbsp;&nbsp;双进双赢</p>
    </div>
    <div class="contentBox">
      <img src="../../../../assets/img/activityAndAgency/shuoming.png" alt="">
    </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
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
      centerContent: 'src/assets/img/titleHeaderImg/AgencyStatement.png', //中间区域内容
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
.agencyIntro .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/agencyCenterBgImg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20px;
}

.agencyIntro .titleBgImgbox p:nth-child(1) {
  font-family: HYa4gj, 微软雅黑, 宋体;
  text-align: center;
  font-size: 116px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.agencyIntro .titleBgImgbox p:nth-child(2) {
  text-align: center;
  font-size: 63px;
  font-family: 'HYa4gj';
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.agencyIntro .contentBox {
  padding: 30px;
}

.agencyIntro .contentBox img {
  width: 690px;
}

</style>
