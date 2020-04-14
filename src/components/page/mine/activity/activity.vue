<template>
  <div class="activity">
    <ul>
      <!-- <router-link to="./level"> -->
        <li @click="lecelClick('晋级奖励')">
          <div class="afir">
            <div class='asec'>1</div>
          </div><span>晋级奖励</span>
        </li>
      <!-- </router-link> -->
      <!-- <router-link to="./daily"> -->
        <li @click="lecelClick('每日加奖')">
          <div style="background-color: #d57651" class="afir">
            <div class='asec'>2</div>
          </div><span>每日加奖</span>
        </li>
      <!-- </router-link> -->
      <!-- <router-link to="./getCheap">
        <li>
          <div style="background-color: #2e85d5" class="afir">
            <div class='asec'>3</div>
          </div><span>乐享优惠</span>
        </li>
      </router-link>
      <router-link to="./allJoin">
        <li>
          <div style="background-color: #2ec3d5" class="afir">
            <div class='asec'>4</div>
          </div><span>全民代理 月入百万</span>
        </li>
      </router-link>
      <router-link to="./joinUs">
        <li>
          <div style="background-color: #d5519d" class="afir">
            <div class='asec'>5</div>
          </div><span>代理加盟 携手共赢</span>
        </li>
      </router-link>
      <router-link to="./secret">
        <li>
          <div style="background-color: #d5465b" class="afir">
            <div class='asec'>6</div>
          </div><span>神秘彩金 喜从天降</span>
        </li>
      </router-link> -->
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  ready() {

  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    lecelClick(iteName){
      // console.log('是的是的是的')
      if(iteName == '晋级奖励'){
        this.$router.push({ path: `/page/mine/activity/level${this.Id}` });
      }else if(iteName == '每日加奖'){
        this.$router.push({ path: `/page/mine/activity/daily${this.Id}` });
      }
    }
  },
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      },
      index: 1
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    })
  },
  created() {
    this.Id = this.$route.params.Id;
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
      centerContent: 'src/assets/img/titleHeaderImg/ActivityCenter.png', //中间区域内容
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
  }
}

</script>
<style>
.activity li {
  width: 100%;
  padding: 10px 0;
  height: 80px;
  margin-bottom: 8px;
  font-size: 32px;
  line-height: 70px;
  background: #fff url(../../../../assets/img/center-right.png) right center no-repeat;
  background-size: 14px;
  background-position: 700px;
}

.activity li span {
  display: inline-block;
  vertical-align: middle;
  color: #000;
}

.activity div.afir {
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #fe8580;
  margin-left: 30px;
  margin-right: 30px;
  vertical-align: middle;
}

.activity div.asec {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 4px solid #fff;
  text-align: center;
  line-height: 42px;
  color: #fff;
  margin: 9px 0 0 10px;
}

</style>
