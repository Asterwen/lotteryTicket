<!-- 法律声明 -->
<template>
  <div class="protocal" :style="'min-height:'+clientHeight+'px;'">
    <h2>法律声明</h2>
    <p>本平台提供的任何内容（包括但不限于数据、文字、图表、图象、声音或录象等）的版权均属于本平台或相关权利人。未经本平台或相关权利人事先的书面许可，您不得以任何方式擅自复制、再造、传播、出版、转帖、改编或陈列本平台的内容。同时，未经本平台书面许可，对于本平台上的任何内容，任何人不得在非本平台所属的服务器上做镜像。任何未经授权使用本平台的行为都将违反《中华人民共和国著作权法》和其他法律法规以及有关国际公约的规定。</p>
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
      clientHeight: '',
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
      centerContent: '法律声明', //中间区域内容
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
  created() {
    let clientHeight = document.documentElement.clientHeight - 90;
    this.clientHeight = clientHeight;
  }
}

</script>
<style>
.protocal {
  background-color: #fff;
}

.protocal h3 {
  font-size: 40px;
  padding: 20px 38px;
  background-color: #fff;
  font-weight: 400;
}

.protocal h2 {
  padding: 30px 38px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  font-weight: 400;
  background-color: #fff;
  color: #333;
  border-bottom: 2px solid #f4f4f4;
}

.protocal p {
  background-color: #fff;
  font-size: 32px;
  line-height: 50px;
  padding: 30px;
}

</style>
