<template>
  <div class="agencyCenterBox">
    <div class="titleBgImgbox">
      <p>招代理</p>
      <p>互惠互利&nbsp;&nbsp;双进双赢</p>
    </div>
    <div class="contentBox">
      <p v-for="(item,key) in agencyCenterList" :key="key" :class="item.isKey = true?item.classA:null" @click="goLink(item.name)">
        <span class="word">{{item.name}}</span>
        <x-icon type="ios-arrow-right" size="18"></x-icon>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      Id:0,
      agencyCenterList: [],
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    goLink(linkName) {
      if(linkName == '代理说明'){
        // console.log(linkName);
        this.$router.push({ path: `/page/mine/agencyCenter/agencyIntro${this.Id}` });
      }else if(linkName == '代理报表'){
        // console.log(linkName);
        this.$router.push({ path: `/page/mine/agencyCenter/proxyStatement${this.Id}` });
      }else if(linkName == '下级报表'){
        // console.log(linkName);
        this.$router.push({ path: `/page/mine/agencyCenter/subordinateReport${this.Id}` });
      }else if(linkName == '下级开户'){
        // console.log(linkName);
        this.$router.push({ path: `/page/mine/agencyCenter/subordinateOpen${this.Id}` });
      }else if(linkName == '会员管理'){
        // console.log(linkName);
        this.$router.push({ path: `/page/mine/agencyCenter/memberManagement${this.Id}` });
      }
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    let agencyCenterList = [{
      id:0,
      name: '代理说明',
      link: '/page/mine/agencyCenter/agencyIntro',
      isKey:true,
      classA:'classA'
    }, {
      id:1,
      name: '代理报表',
      link: '/page/mine/agencyCenter/proxyStatement'
    }, {
      id:2,
      name: '下级报表',
      link: '/page/mine/agencyCenter/subordinateReport',
      isKey:true,
      classA:'classA'
    }, {
      id:3,
      name: '下级开户',
      link: '/page/mine/agencyCenter/subordinateOpen'
    }, {
      id:4,
      name: '会员管理',
      link: '/page/mine/agencyCenter/memberManagement'
    }];
    // , {
    //   name: '投注明细',
    //   link: '/page/mine/agencyCenter/yransactionDetails'
    // }, {
    //   name: '交易明细',
    //   link: '/page/mine/agencyCenter/bettingDetails'
    // }
    this.agencyCenterList = agencyCenterList;
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
      centerContent: 'src/assets/img/titleHeaderImg/AgencyCenter.png', //中间区域内容
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
.agencyCenterBox .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/agencyCenterBgImg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20px;
}

.agencyCenterBox .titleBgImgbox p:nth-child(1) {
  text-align: center;
  font-size: 116px;
  font-family: 'HYa4gj';
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.agencyCenterBox .titleBgImgbox p:nth-child(2) {
  text-align: center;
  font-size: 63px;
  font-family: 'HYa4gj';
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.agencyCenterBox .contentBox .classA{
  margin-bottom:40px;
  /* background:yellow; */
}
.agencyCenterBox .contentBox p {
  background: #fff;
  display: block;
  height: 90px;
  margin-bottom: 2px;
  line-height: 90px;
  padding: 0 30px;
}

.agencyCenterBox .contentBox p span {
  font-size: 30px;
  color: rgba(34, 34, 34, 1);
  vertical-align: middle;
}

.agencyCenterBox .contentBox p .vux-x-icon {
  vertical-align: middle;
  fill: #999999;
  float: right;
  margin-top: 27px;
}

</style>
