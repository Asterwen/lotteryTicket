<template>
  <div class="selfSet">
    <toast
      v-model="toast.showValue"
      type="text"
      :time="1200"
      is-show-mask
      position="middle"
    >{{toast.textValue }}</toast>
    <ul>
      <router-link to="">
        <li class='tolink'><span>推送和提醒</span></li>
      </router-link>
      <!-- <router-link to="./protocal"> -->
        <li class='tolink' @click="ClickLink('法律声明')"><span>法律声明</span></li>
      <!-- </router-link> -->
      <!-- <router-link to="./private"> -->
        <li class='tolink' @click="ClickLink('隐私声明')"><span>隐私声明</span></li>
      <!-- </router-link> -->
      <!-- <router-link to="./about"> -->
        <li class='tolink' @click="ClickLink('关于我们')"><span>关于我们</span></li>
      <!-- </router-link> -->
    </ul>
    <button @click="signOut()">退出登录</button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Group, Cell, XSwitch, Toast } from 'vux'
import mswitch from "../../common/switch";
export default {
  components: {
    Cell,
    Group,
    XSwitch,
    mswitch,
    Toast
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
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation", "setLandingStatus", "setOperationPageLink"]),
    signOut() {
      this.$api.signOut().then(res => {
        /*请求成功后的操作*/
        // console.log(res);
        if (res.data.code == 0) {
          localStorage.clear(); 
          // localStorage.removeItem('publicInfo');
          // console.log('退出成功');
          this.toast.textValue = '退出成功';
          this.toast.showValue = true;
          this.setLandingStatus(false);
          this.setOperationPageLink({
            type: 'normal',
            normalArr: [`/page/index${this.Id}`],
            specialArr: [],
          })
          this.$router.push({
            path: `/page/log${this.Id}`
          })
        }
      })
    },
    ClickLink(ite){
      if(ite == '法律声明'){
        this.$router.push({ path: `/page/mine/protocal${this.Id}` });
      }else if(ite == '隐私声明'){
        this.$router.push({ path: `/page/mine/private${this.Id}` });
      }else if(ite == '关于我们'){
        this.$router.push({ path: `/page/mine/about${this.Id}` });
      }
    }
  },
  data() {
    return {
      Id:0,
      userInfo: {
        type: Object
      },
      toast: {
        showValue: false,
        textValue: ''
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
      centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: '设置中心', //中间区域内容
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
}

</script>
<style>
.selfSet {}

.selfSet li {
  padding: 10px 42px;
  height: 70px;
  line-height: 70px;
  font-size: 30px;
  background-color: #fff;
  color: #333;
  border-bottom: 1px solid #f4f4f4;
}

.selfSet li.tolink {
  background: #fff url(../../../assets/img/center-right.png) right center no-repeat;
  background-size: 14px;
  background-position: 700px;
}

.selfSet button {
  width: 600px;
  height: 88px;
  color: #fff;
  line-height: 88px;
  text-align: center;
  font-size: 36px;
  background-color: #d91f37;
  border-radius: 10px;
  position: fixed;
  right: 75px;
  bottom: 143px;
  border: none;
}

</style>
