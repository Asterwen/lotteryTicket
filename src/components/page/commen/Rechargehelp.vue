<template>
  <div class="RechargehelpBox">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <ul class="wrappp">
      <li>
        <h2>1.充值未到账怎么办？</h2>
        <p>充值付款后，金额会将在30秒发放到您的钱包。如遇服务器拥堵，金额到账可能会有延迟，请耐心等待，可退出重进钱包界面查看资金到账情况。若超过30分钟仍未到账，请点击充值按钮下方的“充值遇到问题，去反馈”，提交充值问题反馈，我们会尽快为您处理！</p>
      </li>
      <li>
        <h2>2.充值未需要注意什么？</h2>
        <p>充值一次，发起一笔订单，获取实时支付方式。请勿直接对历史交易账号进行“私下转账”否则充值无法到账并不予补发。</p>
      </li>
      <li>
        <h2>3.误充或充错账号，可以退款吗？</h2>
        <p>误充或充错账号后，不能退款喔，建议您在充值前仔细核对充值账号与充值信息，以免发生误充、充错账号的情况。</p>
      </li>
      <li>
        <h2>4.关于充值防骗！</h2>
        <p>请您不要接受他人以代充为借口向您所要账号密码行为，任何情况下不要将密码泄露给他人。平台内部充值入口为唯一充值入口，请不要相信通过其他渠道传达代充行为，以免因不被保护的充值行为给您造成资金损失！</p>
      </li>
    </ul>
  </div>
</template>
<script>
//Rechargehelp.vue 充值帮助
// import EventProcessingHeader from '../../common/eventProcessingHeader.vue'
import EventProcessingHeader from '../../../components/common/eventProcessingHeader.vue'
import { mapState, mapActions } from "vuex";
export default {
    components:{
        EventProcessingHeader
    },
    computed: {
        ...mapState({
        publicInfo: "publicInfo"
        }),
    },
    created(){
      this.Id = this.$route.params.Id;
    },
    data(){
        return{
            Id:0,
            operation: { //头部组件状态管理
                backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
                leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
                leftContent: '', //showType为other时，要在左侧显示的内容
                centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
                centerContent: 'src/assets/img/titleHeaderImg/Recharge.png', //中间区域内容
                centerContentClass: 'titleHeaderImg', //中间区域样式类名
                rightShow: false, //右侧区域是否显示
                rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
                rightContent: '', //要在右侧显示的内容
                rightContentClass: '', //右侧内容样式类名
            },
        }
    },
    methods:{
        ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
        clickBack(value) {
            this.$router.push({ path: `/page/mine/recharge${this.Id}` })
        },
        clickMore(value) {},
    },
    mounted() {
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: false, //是否显示公共头部
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false, //是否显示底部导航
    });
  },
};
</script>
<style>
.RechargehelpBox {
  width: 100%;
  height: 100%;
}
.wrappp li {
    padding: 0.38rem 0.3rem;
    border-bottom: 0.02rem solid rgba(219,219,219,1);
}
.wrappp ul {
    list-style: none;
}
.wrappp p {
    padding-left: 0.48rem;
    background: url('../../../assets/img/mine/answer.png') left top no-repeat;
    background-size: 0.36rem;
    font-size: 0.28rem;
    color: #666666;
}
.wrappp h2 {
    padding-left: 0.48rem;
    background: url('../../../assets/img/mine/ask.png') left top no-repeat;
    background-size: 0.36rem;
    font-size: 0.3rem;
    color: #333333;
}
</style>


