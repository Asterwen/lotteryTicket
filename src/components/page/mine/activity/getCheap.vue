<!-- 乐享优惠 -->
<template>
  <div class="getCheap">
    <div class="titleBgImgbox">
    </div>
    <!--     <div class="getCheapnow">
      <p>昨日投注：<span>0</span></p>
      <p>当前等级：<span>VIP1</span></p>
      <p>加奖比例：<span>VIP1</span></p>
      <p>可得加奖：<span>0</span></p>
      <span>不可领取</span>
    </div> -->
    <div class="contentBox">
      <h2>活动详情</h2>
      <p>即日起所有会员【银行转账】方式提交入款，即可获取得存款金额1%的入款优惠。次次存！次次送！</p>
      <h2>存款方式</h2>
      <x-table full-bordered style="background-color:#fff;">
        <thead>
          <tr>
            <th>单笔存款</th>
            <th>赠送比例</th>
            <th>奖金上限</th>
            <th>流水限制</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100元或以上</td>
            <td>1%</td>
            <td>无上限</td>
            <td>1倍流水</td>
          </tr>
        </tbody>
      </x-table>
      <h2>优惠条款</h2>
      <ul>
        <li>1.例：充值1000元实际到账1010元。</li>
        <li>2.存款优惠无需申请，存款成功后系统将自动添加到会员账户内，为了您的款项及时到账达，存款位数请添加小数，如：5000.01 或 10000.24</li>
        <li>3.每位玩家，每户，每一地址，每一电子邮箱地址，每一电话号码，相同支付方式(相同借记卡/信用卡/银行账户)及IP地址视为同一会员，公司保留冻结、取消该团体或个人账户及账户结余的权利。</li>
        <li>4.本平台的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利。</li>
        <li>5.公司入款账号不定期更新，会员每次存款前请务必查看最新公司入款账号，入款至已过期账号，公司将无法查收，恕不负责，为此请注意以免造成不必要的损失。</li>
        <li>6.本平台拥有此活动绝对解释权、本公司不定期做停止或取消优惠活动并不会做出任何书面解释。</li>
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
    return {
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
      centerContent: 'src/assets/img/titleHeaderImg/PleasureOffer.png', //中间区域内容
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
.getCheap .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/dailyCheapbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.getCheap .getCheapnow {
  padding: 20px 30px;
}

.getCheap .contentBox {
  min-height: 641px;
  padding: 30px;
  background-color: #fff;
}

.getCheap .contentBox h2 {
  display: inline-block;
  font-size: 30px;
  padding: 5px 20px;
  color: #333;
  background-color: #e2dede;
}

.getCheap .contentBox p {
  font-size: 26px;
  padding: 30px 0;
}

.getCheap .contentBox table {
  margin: 30px 0;
  font-size: 26px;
}

.getCheap .contentBox table th {
  background-color: #528edc;
  color: #fff;
  padding: 10px 20px;
}

.getCheap .contentBox table td {
  padding: 10px 20px;
}

.getCheap .contentBox li {
  font-size: 26px;

}

</style>
