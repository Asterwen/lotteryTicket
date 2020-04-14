<template>
  <div class="selfControl">
    <group>
      <cell title='头像' :isLink='true' @click.native="selfHeadImg" :border-intent='false'><img slot="icon" :src="user.headUrl"></cell>
        <cell title='昵称' :value="user.nickName" :isLink='true' @click.native="selfNike" :border-intent='false'></cell>
    </group>
    <group style="margin-top: 10px;">
      <cell title='身份信息' :isLink='true' @click.native="selfRealName" :border-intent='false'>
        <span v-if="realName" class="clearify">已认证</span>
      </cell>
<!--       <cell class="verifyPhone" :value="user.phone+' 已认证'" title='手机号认证' :border-intent='false' style="margin-top: 1px;margin-bottom: 1px;">
      </cell> -->
      <cell title='银行卡' :isLink='true' @click.native="bankCardList" :border-intent='false'></cell>
    </group>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell } from 'vux'
export default {
  components: {
    Cell,
    Group,
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    log(str) {
      // console.log(str)
    },
    showbox() {
      this.showPop = true
    },
    changPW(){
      //点击身份信息本地存储
      localStorage.setItem("routerBack", JSON.stringify('/page/mine/selfControl'));
      // this.$router.push({ path: '/page/mine/selfRealName' })
    },
    selfHeadImg(){
      this.$router.push({ path: `/page/mine/selfHeadImg${this.Id}` })
    },
    selfNike(){
      this.$router.push({ path: `/page/mine/selfNike${this.Id}` })
    },
    selfRealName(){
      this.$router.push({ path: `/page/mine/selfRealName${this.Id}` })
    },
    bankCardList(){
      this.$router.push({ path: `/page/mine/bankCardList${this.Id}` })
    }
  },
  data() {
    return {
      Id:0,
      showPop: false,
      user:{
        phone:'',
        headUrl:'',
        nickName:''
      },
      userInfo: {},
      realName: false
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
    // console.log(this.publicInfo);
    if(this.publicInfo.userInfo.payAble == true){
      this.realName = true
    }
    if(this.publicInfo.userInfo.phone){
      let rePhone = this.publicInfo.userInfo.phone.substr(3,4);
          rePhone = this.publicInfo.userInfo.phone.replace(rePhone,'****');
      this.user.phone = rePhone;
    }
    let localNike = JSON.parse(localStorage.getItem("publicInfo"));
    this.user.nickName = this.publicInfo.userInfo.nickName;
    // console.log(this.publicInfo.userInfo.nickName)
    // this.user.headUrl = localNike.userInfo.headUrl;
    this.user.headUrl = 'src/assets/img/header/'+this.publicInfo.userInfo.handUrl
    // console.log(this.publicInfo.userInfo.handUrl)
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
      centerContent: 'src/assets/img/titleHeaderImg/PersonalInformation.png', //中间区域内容
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
.selfControl {
  background-color: rgba(238, 239, 240, 1);
}

.selfControl .weui-cell__hd {
  position: absolute;
  right: 60px;
}

/*.selfControl .weui-cell_access .weui-cell__ft:after {
  border-color: #101010;
}*/

.selfControl .weui-cell__hd img {
  width: 70px;
  border-radius: 50%;
  display: block;
  margin-right: 25px;
}

.selfControl .vux-no-group-title {
  background-color: #F4F4F4;
}

.selfControl .weui-cell {
  padding: 5px 20px 5px 42px;
}

.selfControl span.clearify {
  color: #D91D37;
  font-size: 28px;
  padding-right: 20px;
}

.selfControl .weui-cells:before {
  border: none;
}

.selfControl .vux-no-group-title {
  margin-top: 0;
}

.selfControl .weui-cell_access .weui-cell__ft:after {
  width: 0.2rem;
  height: 0.2rem;
  border-color: rgba(153, 153, 153, 1);
}
.selfControl .verifyPhone {
  height: 70px;
  background-color: #fff;
  /*display: none !important;*/
}
.selfControl .weui-cell__ft{
  font-size: 30px;
  color: #666;
  /*padding-right: 40px;*/
}
.selfControl .verifyPhone .weui-cell__ft{
  font-size: 30px;

  /*padding-right: 30px;*/
  color: #d91f37;
}

.selfControl .vux-label {
  font-size: 32px;
  letter-spacing: 2px;
  color: #333;
}

.selfControl .weui-cells:after {
  border: none;
}

.selfControl .verifyPhone .weui-cell_access .weui-cell__ft::after {
  color: #fff;
  display: none;
}

.selfControl .weui-cell:before {
  border: none;
}

.selfControl .vux-tap-active {
  height: 80px;
  margin-top: 1px;
  background-color: #fff;
}

</style>
