<!-- 聊天界面 -->
<template>
  <div v-bind:style="{height: veryHeight+'rem'}" class="frameWrap">
    <iframe :src="url" frameborder="0"></iframe>
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
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      veryHeight:'',
      url:'http://running_number.appflint.com/newpay/appim.html?pay_chat_money=100.00&socket_our_name=1111&socket_user_name=6427&pay_unique=2024Tu4A0d8soHuoWqvjaljd&pay_chat_id=6427',
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
      centerContent: '官方代理充值', //中间区域内容
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
    // console.log(document.documentElement.clientHeight);
    // console.log(document.documentElement.Height);
    let Height = document.documentElement.clientHeight - 50;
    let Width = document.documentElement.clientWidth;
    this.veryHeight = (Height/Width)*7.5;
    // console.log(this.veryHeight);

  }
}

</script>
<style>
.about {
  background-color: #fff;
}
.frameWrap{
  width: 100%;
  height: 100%;
}
iframe{
  width: 100%;
  height: 100%;
}
.about h3 {
  font-size: 36px;
  padding: 10px 38px;
  background-color: #fff;
  font-weight: 400;
}

.about h2 {
  padding: 30px 38px;
  height: 60px;
  line-height: 60px;
  font-size: 40px;
  font-weight: 400;
  background-color: #fff;
  color: #333;
  border-bottom: 2px solid #f4f4f4;
}

.about p {
  background-color: #fff;
  font-size: 30px;
  line-height: 50px;
  padding: 10px 30px;
}

</style>
