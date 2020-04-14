<template>
  <div class="selfCountSafe">
    <group>
      <cell title='登录密码' value="修改" @click.native="toChangePass()" :border-intent='false'>
      </cell>
      <cell title='安全密码' value="修改" @click.native="toSafePass()" :border-intent='false' style="margin-top: 1px;margin-bottom: 1px;">
        <!-- <span class="clearify">修改</span> -->
      </cell>
    </group>
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
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    toChangePass(){
      this.$router.push({ path: `/page/mine/mineForget${this.Id}` })
    },
    toSafePass(){
      this.$router.push({ path: `/page/mine/selfPW${this.Id}` })
    }
  },
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      }
    }
  },
  created() {
    this.Id = this.$route.params.Id;
    let userMsg = [{
      userName: '三哥',
      userImg: '../../../assets/img/dice4_guess.png',
      touzhuDate: [
        { time: "2018-11-28 14:52", gametype: '吉林快3', gametime: '201811261447期', username: 'dd20181128521478', msg: '投注：100008.00元', getmoney: '100000.20' },
        { time: "2018-11-28 14:52", gametype: '吉林快3', gametime: '201811261447期', username: 'dd20181128521478', msg: '投注：100008.00元', getmoney: '100000.20' },
        { time: "2018-11-28 14:52", gametype: '吉林快3', gametime: '201811261447期', username: 'dd20181128521478', msg: '投注：100008.00元', getmoney: '0' }
      ]
    }];
    this.userInfo = userMsg;
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
      centerContent: 'src/assets/img/titleHeaderImg/AccountSecurity.png', //中间区域内容
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
.selfCountSafe {
  background-color: rgba(238, 239, 240, 1);
}
.selfCountSafe .weui-cell_access .weui-cell__ft{
  display: none;
}
.selfCountSafe .weui-cells {
  margin-top: 0;
}
.selfCountSafe .weui-cell__ft{
  color: #23272F;
}
.selfCountSafe .weui-cell img{
  padding-top: 8px;
  width: 40px;
  margin-right: 12px;
}
.selfCountSafe .vux-label{
  font-size: 30px;
}
.selfCountSafe .weui-cell_access .weui-cell__ft:after {
  border-color: #101010;
}

.selfCountSafe .vux-no-group-title {
  background-color: #fff;
}

.selfCountSafe .weui-cell {
  position: relative;
  height: 90px;
  border-bottom: 2px solid #f4f4f4;
  padding: 0 42px;
  font-size: 30px;
}

</style>
