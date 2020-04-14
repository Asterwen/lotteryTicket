<!-- 隐私声明 -->
<template>
  <div class="about" :style="'min-height:'+clientHeight+'px;'">
    <h2>隐私声明</h2>
    <p>在登录时向我们提供您的个人信息是基于对我们的信任，我们会以专业、谨慎和负责的态度对待您的个人信息。我们认为隐私权是您的重要权利，我们尊重您的隐私权，您提供的信息只能用于帮助我们为您提供更好的服务，因此，我们制定了个人信息保密制度以保护您的个人信息。凡以任何方式登录本平台或直接、间接使用本平台资料者，视为自愿接受本平台声明的约束。我们的隐私权保护条款如下：</p>
    <h3>个人信息的收集</h3>
    <p>在您注册、使用本平台服务时，经您的同意，我们收集与个人身份有关的信息。如果您无法提供相应信息，可能会不能使用对应服务。我们也会基于优化用户体验的目的，收集其他有关的信息，以便优化我们的平台服务。</p>
    <h3>隐私的保护</h3>
    <p>保护用户隐私是本平台的一项基本政策。本平台不会公布或传播您在本平台注册的任何资料，但下列情况除外：</p>
    <p>1）事先获得用户的明确授权；<br>
      2）用户对自身信息保密不当原因，导致用户非公开信息泄露；<br>
      3）由于网络线路、黑客攻击、计算机病毒、政府管制等原因造成的资料泄露、丢失、被盗用或被篡改等；<br>
      4）根据有关法律法规的要求； <br>
      5）依据法院或仲裁机构的裁判或裁决，以及其他司法程序的要求；<br>
      6）按照相关政府主管部门的要求；</p>
    <h2>自我更新与信息公开</h2>
    <p>我们鼓励您自我更新和修改个人信息以使其安全和有效。您能在任何时候非常容易地获取并修改您的个人信息，您可以随时自行决定修改、删除您在平台上的相关资料。您是唯一对您的账号和密码信息负有保密责任的人，任何情况下，请小心妥善保管。</p>
    <p>无论何时您自愿在公开场合披露个人信息， 此种信息可能被他人收集及使用，因此造成您的个人信息泄露，平台不承担责任。</p>
    <h3>提示</h3>
    <p>我们可能会不时修改我们的隐私政策，这些修改会反映在本声明中，我们的任何修改都会将您的权益和满意度置於首位，我们希望您在每次访问我们的平台时都查阅我们的隐私声明，用户继续享用服务，则视为接受服务条款的变动。</p>
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
      centerContent: '隐私声明', //中间区域内容
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
.about {
  background-color: #fff;
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
