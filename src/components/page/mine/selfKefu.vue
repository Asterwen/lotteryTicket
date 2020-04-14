<template>
  <div class="selfKefu">
    <div class="selfKefuWrap">
      <img src="../../../assets/img/mine/kefutouxiang.png" alt=""><br>
      <p>服务时间: 8:00 ~ 18:00</p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell } from 'vux'
export default {
  components: {
    Cell,
    Group
  },
  created(){
    this.Id = this.$route.params.Id;
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
      Id:0,
      userInfo: {
        type: Object
      },
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
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/ContactCustomerService.png', //中间区域内容
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
.selfKefuWrap img {
  display: inline-block;
  width: 500px;
  height: 500px;
  margin-left: 125px;
  padding-top: 100px;
}

.selfKefu p {
  text-align: center;
  font-size: 30px;
}

</style>
