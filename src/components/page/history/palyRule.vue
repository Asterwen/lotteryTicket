<template>
  <div class="playRuleBox">
    <event-processing-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore"></event-processing-header>
    <p><span>开奖时间：</span>10分钟一期</p>
    <p><span>玩法规则：</span>每期开出3个数字作为开奖号码，每个数字 取值范围为1-6(相当于摇3个骰子)</p>
    <p><span>奖项设置：</span></p>
    <table>
      <thead>
        <tr>
          <th>玩法</th>
          <th>中奖条件</th>
          <th>奖金</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in playRuleData" :key="key">
          <td>{{item.method}}</td>
          <td>{{item.condition}}</td>
          <td>{{item.bonus}}</td>
        </tr>
      </tbody>
    </table>
    <div class="bottomFixedBox">
      <span @click="toBetting">投注{{name}}</span>
    </div>
  </div>
</template>
<script>
import EventProcessingHeader from '../../common/eventProcessingHeader.vue'
import { mapState, mapActions } from "vuex";
export default {
  components: { EventProcessingHeader },
  data() {
    return {
      Id:0,
      playRuleData: [{
        method: '和值',
        condition: '猜中开奖号码相加的和',
        bonus: '9~240元'
      }, {
        method: '三同号单选',
        condition: '猜中111、222、333、444、 555、666中指定一个',
        bonus: '240元'
      }, {
        method: '三同号通选',
        condition: '111、222、333、444、555、 666任意一个开出',
        bonus: '40元'
      }, {
        method: '二同号单选',
        condition: '猜中3个号（有2个号相同）',
        bonus: '80元'
      }, {
        method: '二同号复选',
        condition: '猜中开奖中形同的2个号',
        bonus: '15元'
      }, {
        method: '三不同号',
        condition: '猜中3个号（各不相同）',
        bonus: '40元'
      }, {
        method: '二不同号',
        condition: '猜中开奖中不相同的2个号',
        bonus: '8元'
      }, {
        method: '三连号 通选',
        condition: '123、234、345、456任意 一个开出',
        bonus: '10元'
      }],
      name: '',
      type: '',
      operation: { //头部组件状态管理
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；
        centerContent: 'src/assets/img/titleHeaderImg/OrderDetails.png', //中间区域内容
        centerContentClass: 'titleHeaderImg', //中间区域样式类名
        rightShow: false, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
      },
      backLink: '',
      gameType: ''
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    toBetting() {
      window.localStorage.setItem('quick3TypeActive', 1);
      window.localStorage.setItem('gameType', this.gameType);
      this.$router.push({ path: `/quickThree${this.Id}` })
    },
    // 头部点击返回事件处理
    clickBack(value) {
      // console.log('点击了返回按钮')
      this.$router.push({ path: `/page/history/typeHistory${this.Id}` })
    },
    // 头部点击更多事件处理
    clickMore(value) {
      // console.log('点击了更多按钮')
    },
  },
  created() {
    this.Id = this.$route.params.Id;
    this.name = window.localStorage.getItem("historyKey").split(',')[0]
    if (this.name == '重庆时时彩') {
      this.operation.centerContent = 'src/assets/img/titleHeaderImg/ChongqingTimelyColorfulPlayMethod.png';
    } else if (this.name == '山东11选5') {
      this.operation.centerContent = 'src/assets/img/titleHeaderImg/ElevenChooseFive.png';
    }
    if (window.localStorage.getItem("historyKey").split(',')[1].indexOf('fast3') != -1) {
      this.name = '快三';
      this.operation.centerContent = 'src/assets/img/titleHeaderImg/QuickThreePlay.png';
    }
    this.gameType = window.localStorage.getItem("historyKey").split(',')[1];
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
}

</script>
<style>
.playRuleBox {
  background: #f4f4f4;
  padding: 56px 30px 128px;

}

.playRuleBox p {
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 40px;
}

.playRuleBox p span {
  font-weight: bold;
}

.playRuleBox table {
  width: 100%;
  border: 1px solid #222222;
}

.playRuleBox table thead tr th {
  border-right: 1px solid #222222;
  font-size: 28px;
  color: rgba(51, 51, 51, 1);
  padding: 20px 0;
}

.playRuleBox table thead tr th:nth-child(3) {
  border-right: none;
}

.playRuleBox table tbody tr td {
  border-top: 1px solid #222222;
  border-right: 1px solid #222222;
  font-size: 24px;
  text-align: center;
  vertical-align: middle;
  color: rgba(102, 102, 102, 1);
  padding: 20px 0;
}

.playRuleBox table tbody tr td:nth-child(3) {
  border-right: none;
}

.playRuleBox .bottomFixedBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: #000000;
  text-align: center;
  line-height: 90px;
}

.playRuleBox .bottomFixedBox span {
  width: 392px;
  height: 57px;
  background: rgba(217, 29, 55, 1);
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  line-height: 57px;
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
}

</style>
