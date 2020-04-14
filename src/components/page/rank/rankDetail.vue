<!-- 排行榜页面 -->
<template>
  <div class='rankDetail'>
    <header>
      <div class="headBg"></div>
      <img :src="params.headurl" alt="">
      </header>
      <p>
        <span class="rankName">{{params.nickName}}</span><br>
        <span class="rankNumber">账号：{{params.account}}</span><br>
        <span >累计中奖：{{params.win}}</span><br>
      </p>
      <h2>Ta喜欢的彩票</h2>
      <ul>
        <li><img src="../../../assets/img/hall/logo_ahk3.png" alt=""></li>
        <li><img src="../../../assets/img/hall/logo_zjd11.png" alt=""></li>
      </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
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
      listNumber: '0',
      params: {
        nickName: '',
        account: '',
        headurl: '',
        win: ''
      },
      likeGame: {

      },
      userInfo: {
        type: Object
      },
    }
  },
  created() {
    this.Id = this.$route.params.Id;
    let userDetail = this.$route.params
    this.$api.userDetail(userDetail).then(res => {
      /*请求成功后的操作*/
      if (res.data.code == 0) {
        let dataUser = res.data.data;
        this.params.headurl = "src/assets/img/header/" + dataUser.headurl;
        this.params.account = dataUser.account;
        this.params.win = dataUser.win ? dataUser.win : '0';
        if (dataUser.nickName) {
          this.params.nickName = dataUser.nickName
        } else {
          this.params.nickName = dataUser.account
        }
      } else {

      }
    }).catch(err => {})
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
      centerContent: 'src/assets/img/titleHeaderImg/PlayerInformation.png', //中间区域内容
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
.rankDetail {
  text-align: center;
}

.rankDetail header {
  width: 100%;
  height: 306px;
  position: relative;
}

.rankDetail .rankName {
  font-size: 40px;
}

.rankDetail p span.rankNumber {
  color: #666666;
}

.rankDetail p {
  line-height: 50px;
  padding-bottom: 30px;
  border-bottom: 2px solid #E5E5E5;
}

.rankDetail p span {
  font-size: 30px;
  color: 333;
}

.rankDetail .headBg {
  position: absolute;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 195px;
  background-color: #FF801A;
}

.rankDetail header img {
  width: 220px;
  height: 220px;
  border-radius: 110px;
  position: absolute;
  z-index: 100;
  left: 265px;
  top: 64px;
}

.rankDetail h2 {
  padding-top: 33px;
  font-size: 40px;
}

.rankDetail ul {
  padding: 30px 75px;
}

.rankDetail ul li {
  width: 150px;
  float: left;
}

.rankDetail ul li img {
  width: 88px;
  height: 88px;
}

</style>
