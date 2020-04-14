<template>
  <div class="centerPage">
    <mine-header :show-btn="true"></mine-header>
    <group>
      <cell title='交易记录' :isLink='true' @click.native="selfRecord" :border-intent='false'><img slot="icon" src="../../../assets/img/mine/center-5.png"></cell>
        <cell title='今日盈亏' @click.native="today" :isLink='true'><img slot="icon" src="../../../assets/img/mine/today.png"></cell>
    </group>
    <group style="margin-top: 10px;">
      <cell title='个人信息' :isLink='true' @click.native="selfControl" :border-intent='false'><img slot="icon" src="../../../assets/img/mine/center-4.png"></cell>
        <cell title='账户安全' :isLink='true' @click.native="selfCountSafe" :border-intent='false' style="margin-top: 1px;margin-bottom: 1px;"><img slot="icon" src="../../../assets/img/mine/center-3.png"></cell>
          <cell style="border-bottom:1px solid #f4f4f4;" title='代理中心' @click.native="agencyCenter" :isLink='true' v-if="isAngent"><img slot="icon" src="../../../assets/img/mine/center-2.png"></cell>
            <cell style="border-bottom:1px solid #f4f4f4;" title='活动中心' :isLink='true' @click.native="activity"><img slot="icon" src="../../../assets/img/mine/mineActivity.png"></cell>
    </group>
    <group style="margin-top: 10px;">
      <cell title='联系客服' :isLink='true' @click.native="selfKefu" :border-intent='false'><img slot="icon" src="../../../assets/img/mine/center-6.png"></cell>
        <cell style="margin-top: 0.02rem;" title='设置' :isLink='true' @click.native="selfSet" :border-intent='false'><img slot="icon" src="../../../assets/img/mine/center-1.png"></cell>
    </group>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import MineHeader from './mineCommon/mineHeader.vue'
import { Group, Cell } from 'vux'
export default {
  components: {
    MineHeader,
    Cell,
    Group
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    selfRecord(){
      this.$router.push({ path: `/page/mine/selfRecord${this.Id}` })
    },
    today(){
      this.$router.push({ path: `/page/mine/today${this.Id}` })
    },
    selfControl(){
      this.$router.push({ path: `/page/mine/selfControl${this.Id}` })
    },
    selfCountSafe(){
      this.$router.push({ path: `/page/mine/selfCountSafe${this.Id}` })
    },
    agencyCenter(){
      this.$router.push({ path: `/page/mine/agencyCenter/agencyCenter${this.Id}` })
    },
    activity(){
      this.$router.push({ path: `/page/mine/activity/activity${this.Id}` })
    },
    selfKefu(){
      this.$router.push({ path: `/page/mine/selfKefu${this.Id}` })
    },
    selfSet(){
      this.$router.push({ path: `/page/mine/selfSet${this.Id}` })
    }
  },
  data() {
    return {
      Id:0
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
    // 判断是否是代理
    isAngent: function() {
      return this.publicInfo.userInfo.isAngent == '1' ? true : false;
    },
  },
  created() {
    this.Id = localStorage.getItem('Id');
    localStorage.setItem('selfRecordTab',0);
  },
  mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: true, //是否显示公共头部
      backgroundClass: 'bgColorBlack', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
      leftShow: false, //左侧区域是否显示
      leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
      leftContent: '', //showType为other时，要在左侧显示的内容
      centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: 'src/assets/img/titleHeaderImg/PersonalCenter.png', //中间区域内容
      centerContentClass: 'titleHeaderImg', //中间区域样式类名
      rightShow: false, //右侧区域是否显示
      rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
      rightContent: '', //要在右侧显示的内容
      rightContentClass: '', //右侧内容样式类名
      rightTumpLink: '', //点击右侧跳转链接
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: 4, //当前选中的底部导航下标
      show: true, //是否显示底部导航
    });
  }
}

</script>
<style>
.centerPage {
  padding-top: 350px;
  background-color: rgba(238, 239, 240, 1);
}

.centerPage .weui-cell_access .weui-cell__ft:after {
  border-color: #101010;
}

.centerPage .weui-cell__hd img {
  width: 42px;
  display: block;
  margin-right: 25px;
}

.centerPage .vux-no-group-title {
  background-color: #F4F4F4;
}

.centerPage .weui-cell {
  padding: 0.133333rem 0.3rem;
}

.centerPage .weui-cells:before {
  border: none;
}

.centerPage .vux-no-group-title {
  margin-top: 0;
}

.centerPage .weui-cell_access .weui-cell__ft:after {
  width: 0.2rem;
  height: 0.2rem;
  border-color: rgba(153, 153, 153, 1);
}

.centerPage .vux-label {
  font-size: 30px;
  letter-spacing: 2px;
  color: #333;
}

.centerPage .weui-cells:after {
  border: none;
}

.centerPage .weui-cell:before {
  border: none;
}

.centerPage .vux-tap-active {
  height: 70px;
  margin-top: 1px;
  background-color: #fff;
}

</style>
