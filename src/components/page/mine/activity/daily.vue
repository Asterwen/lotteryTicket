<!-- 每日加奖 -->
<template>
  <div class="daily">
    <div class="titleBgImgbox">
    </div>
    <div class="dailynow">
      <p>昨日投注：<span>{{info.sum}}</span></p>
      <p>当前等级：<span>{{info.vip}}</span></p>
      <p>加奖比例：<span>{{info.raio?info.raio+'%':0}}</span></p>
      <p>可得加奖：<span>{{info.amount}}</span></p>
      <span @click="getReword()" v-bind:class="{ 'getClick':info.canClick }" >{{info.text}}</span>
    </div>
    <div class="contentBox">
      <h2>加奖比例</h2>
      <x-table full-bordered style="background-color:#fff;">
        <thead>
          <tr>
            <th>等级/<br>投注额</th>
            <th>100+</th>
            <th>50000+</th>
            <th>500000+</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info.list" :key="item.id">
            <td>{{item.level}}</td>
            <td>{{item.rewardOne?item.rewardOne+'%':0}}</td>
            <td>{{item.rewardTwo?item.rewardTwo+'%':0}}</td>
            <td>{{item.rewardThree?item.rewardThree+'%':0}}</td>
          </tr>
        </tbody>
      </x-table>
      <h2>活动说明</h2>
      <p>
        1、每日加奖在每日凌晨00:20后开放领取；<br>2、加奖比例是根据会员等级以及昨日累计投注金额进行一定比例的加奖；<br>3、需Vip3以上且昨日投注额大于或等于100才能获得加奖；<br>
        4、撤单和其他无效投注将不计算在内；<br>
        5、活动奖金逾期未领取（截止到当天23:59），视为自动放弃活动资格。
      </p>
    </div>
    <toast v-model="toast.showValue" type="text" :time="1200" is-show-mask position="middle">{{toast.textValue }}</toast>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { XTable, Toast } from 'vux'
export default {
  components: {
    XTable,
    Toast
  },
  data() {
    return {
      info: {},
      agencyCenterList: [],
      params: {
        state: '1'
      },
      toast: {
        showValue: false,
        textValue: '',
      },
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
    getReword() {
      // console.log(this.info.state)
      if (this.info.state == 0) {
        this.info.state = 1;
        this.$api.everyDayDraw(this.params).then(res => {
          /*请求成功后的操作*/
          if (res.data.code == 0) {
            this.toast.textValue = '领取成功';
            this.toast.showValue = true;
            this.info.text = '已领取';
            this.info.canClick = false;
            
          }
        })
      }
    }
  },
  created() {
    this.$api.userVip(this.params).then(res => {
      /*请求成功后的操作*/
      if (res.data.code == 0) {
        let datalist = res.data.data;
        this.info = datalist;
        if (datalist.state == 0) {
          this.info.text = '可以领取'
          this.info.canClick = true
        } else {
          this.info.text = '不可领取'
        }
        // this.info
        // console.log(datalist);
      }
    })

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
      centerContent: 'src/assets/img/titleHeaderImg/DailyBonus.png', //中间区域内容
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
.daily .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/dailybg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20px;
}

.daily .dailynow {
  padding: 20px 30px;
}

.daily .dailynow p {
  font-size: 40px;
  color: #000;
}

.daily .dailynow p span {
  color: #d91f37;
}

.daily .dailynow>span {
  display: inline-block;
  width: 580px;
  margin-left: 55px;
  margin-top: 50px;
  text-align: center;
  line-height: 80px;
  font-size: 46px;
  font-weight: bolder;
  border-radius: 6px;
  height: 80px;
  background-color: #e8e8e8;
  color: #666;
  box-shadow: 0 12px 10px #bababa;
}

.daily .contentBox {
  padding: 30px 30px 0 30px;
}

.daily .contentBox h2 {
  padding-left: 20px;
  border-left: 10px solid #109a5a;
  font-size: 44px;
  font-weight: 400;
  color: #109a5a;
  margin-bottom: 40px;
  margin-top: 40px;
}

.daily .vux-table td {
  height: 80px;
  font-size: 32px;
  color: #666666;
  font-weight: 300;
}

.daily .vux-table th {
  font-weight: 300;
  color: #666666;
  height: 80px;
  font-size: 32px;
  background-color: #f2f7ff;
}

.daily .vux-table td:first-child {
  padding: 0 20px;
}

.daily .contentBox p {
  color: #000;
  font-size: 36px;
}

.daily span.getClick {
  color: #fff;
  background-color: #d91f37;
  box-shadow: 0 12px 10px #bababa;
}

</style>
