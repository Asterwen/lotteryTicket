<!-- 神秘彩金 -->
<template>
  <div class="secret">
    <div class="titleBgImgbox">
    </div>
    <div class="contentBox">
      <h2>活动对象：</h2>
      <h2>【乐彩高频】所有新老会员</h2>
      <h2>活动内容：</h2>
      <h2>在乐彩高频进行投注的会员，均有机会获得我们乐彩高频赠送出的神秘彩金，此彩金无需申请，彩金发放纯属随机，希望所有会员能多多关注支持乐彩高频，祝您成为下一个幸运儿。　</h2>
      <h3>【活动详情】</h3>
      <p>乐彩高频将不定期派发神秘彩金给予在乐彩高频全体会员们，彩金没有门槛限制、不设上限金额，只要您在乐彩高频有注册过账号，只要您曾经登录过乐彩高频，就算您不曾在我公司存款游戏过，都有可能收到我们为您随机派发的惊喜彩金。</p>
      <h3>【注意事项】</h3>
      <ul>
        <li>1、此活动需在会员有绑定正确有效的注册信息。</li>
        <li>2、神秘彩金发放纯属随机，时间不定，金额不限。</li>
        <li>3、乐彩高频拥有此活动绝对解释权、本公司将不定期做停止或取消优惠活动并不会做出任何书面解释。</li>
        <li>4、为了避免文字上的差异，乐彩高频保留对所有活动的最终解释权。</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { XTable } from 'vux'
export default {
  components: {
    XTable
  },
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
    goLink(link) {
      this.$router.push({ path: link })
    },
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
      centerContent: 'src/assets/img/titleHeaderImg/MysteryJackpot.png', //中间区域内容
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
.secret .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/centerSecret.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /*margin-bottom: 20px;*/
}

.secret .contentBox {
  padding: 30px;
}

.secret .contentBox h2 {
  font-size: 36px;
  padding: 30px 0;
  font-weight: 400;
}

.secret .contentBox h3 {
  padding: 30px 0;
  font-size: 30px;
  font-weight: 400;
  color: rgb(102, 102, 102);
}

.secret .contentBox p {
  font-size: 30px;
  color: rgb(102, 102, 102);
}

.secret .contentBox li {
  font-size: 30px;
  color: rgb(102, 102, 102);
  line-height: 48px;
}

</style>
