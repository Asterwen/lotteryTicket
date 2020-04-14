<template>
  <div class="agencyStatementBox">
    这是代理说明页面
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
.historyBox {
  background: #f4f4f4;
}

.historyBox .everyoneBox {
  height: 150px;
  padding: 20px 10px 25px 30px;
  background: #fff;
  margin-bottom: 2px;
  position: relative;
}

.historyBox .everyoneBox .leftBox {
  height: 150px;
}

.historyBox .everyoneBox .leftBox .titleBox {
  font-size: 24px;
  color: #999999;
  margin-bottom: 20px;
}

.historyBox .everyoneBox .leftBox .titleBox span {
  font-size: 30px;
  color: #333333;
  margin-right: 14px;
}

/*快三*/
.historyBox .everyoneBox .leftBox .contentBox .quickThreeBox .imgBox {
  width: 245px;
  height: 85px;
  background: rgba(25, 96, 59, 1);
  border-radius: 10px;
  float: left;
  margin-right: 29px;
  line-height: 85px;
  text-align: center;
}

.historyBox .everyoneBox .leftBox .contentBox .quickThreeBox .imgBox img {
  width: 44px;
  height: 44px;
  vertical-align: middle;
  margin: 0 10px;
}

.historyBox .everyoneBox .leftBox .contentBox .quickThreeBox p {
  font-size: 30px;
  color: #333;
  line-height: 85px;
}

/*时时彩，十一选五*/
.historyBox .everyoneBox .leftBox .contentBox .timeHonoredBox .imgBox {
  float: left;
  margin-right: 10px;
}

.historyBox .everyoneBox .leftBox .contentBox .timeHonoredBox .imgBox span {
  width: 70px;
  height: 70px;
  display: inline-block;
  background: #D91D37;
  line-height: 70px;
  text-align: center;
  border-radius: 50%;
  font-size: 32px;
  color: #fff;
  margin-right: 10px;
}

.historyBox .everyoneBox .leftBox .contentBox .timeHonoredBox p {
  font-size: 30px;
  color: #333;
  line-height: 70px;
}

/*右侧箭头*/
.historyBox .everyoneBox .rightBox {
  position: absolute;
  right: 10px;
  top: 60px;
}

.historyBox .everyoneBox .rightBox .vux-x-icon {
  vertical-align: middle;
  fill: #999999;
}

</style>
