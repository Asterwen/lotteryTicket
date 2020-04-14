<!-- 关于我们 -->
<template>
  <div class="about" :style="'min-height:'+clientHeight+'px;'">
    <h2>关于我们</h2>
    <p>乐彩高频成立于2014年，长期秉持＂客户第一、用户至上＂的服务宗旨，为广大用户提供最优质的购彩体验，为广大用户提供＂安全、可靠、极致＂的服务体验。多渠道的收付款方式，多元化的投注玩法让广大用户享受高品质的购彩体验。</p>
    <h3>诚信为本：</h3>
    <p>作为专业的彩票投注平台，我们承诺，为每一位用户提供最安全、最公平的购彩服务。</p>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell, XSwitch } from 'vux'
import mswitch from "../../common/switch";
export default {
  components: {
    Cell,
    Group,
    XSwitch,
    mswitch
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),


  },
  data() {
    return {
      userInfo: {
        type: Object
      },
      toast: {
        showValue: false,
        textValue: ''
      },
      clientHeight:'',
    }
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
      centerContent: '关于我们', //中间区域内容
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
  },
  created(){
    let clientHeight = document.documentElement.clientHeight -90;
    this.clientHeight = clientHeight;
  }
}

</script>
<style>
.about{
  background-color: #fff;
}
.about h3{
  font-size: 36px;
  padding:20px 38px;
  background-color: #fff;
  font-weight: 400;
}
.about h2{
  padding: 30px 38px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  font-weight: 400;
  background-color: #fff;
  color: #333;
  border-bottom: 2px solid #f4f4f4;
}
.about p{
  background-color: #fff;
  font-size: 30px;
  line-height: 50px;
  padding: 30px;
}

</style>
