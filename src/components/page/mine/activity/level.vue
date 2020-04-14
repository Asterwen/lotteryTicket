<!-- 晋级奖励 -->
<template>
  <div class="level">
    <div class="titleBgImgbox">
    </div>
    <div class="levelnow">
      <p>当前等级：<span>{{info.vip}}</span></p>
      <!-- <p>每日加奖：<span>{{info.amount}}</span></p> -->
      <!-- <span @click="getReword()" v-bind:class="{ 'getClick':info.canClick }" >{{info.text}}</span> -->
    </div>
    <div class="contentBox">
      <h2>晋级机制</h2>
      <x-table full-bordered style="background-color:#fff;">
        <thead>
          <tr>
            <th>等级</th>
            <th>成长积分</th>
            <th>普级金额</th>
            <th>投注100+<br>加奖率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info.list" :key="item.id">
            <td>{{item.level}}</td>
            <td>{{item.rewardOne}}</td>
            <td>{{item.rewardOne}}</td>
            <td>{{item.rewardThree?item.rewardThree+'%':0}}</td>
          </tr>
        </tbody>
      </x-table>
      <h2>活动说明</h2>
      <p>1、会员达到VIP3后，每晋升一个等级，都能获得每日加奖比例的提升。<br>2、充值1元可获得1成长积分。<br>例1：奥巴马达到VIP3后，如果昨日投注200元，次日将会获得200*0.1%=0.2元。<br>例2：本拉登达到VIP7后，如果昨日投注200元，次日将会获得200*0.5%=1元。</p>
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
      info: {},
      params: {
        state: '0'
      },
      levelList: [{
          level: 'VIP1',
          cord: 0,
          reward: 0,
          jump: 0
        },
        {
          level: 'VIP2',
          cord: 10,
          reward: 1,
          jump: 1
        },
        {
          level: 'VIP3',
          cord: 200,
          reward: 5,
          jump: 6
        },
        {
          level: 'VIP4',
          cord: 1000,
          reward: 10,
          jump: 16
        },
        {
          level: 'VIP5',
          cord: 10000,
          reward: 58,
          jump: 74
        },
        {
          level: 'VIP6',
          cord: 50000,
          reward: 318,
          jump: 392
        },
        {
          level: 'VIP7',
          cord: 250000,
          reward: 1588,
          jump: 1980
        },
        {
          level: 'VIP8',
          cord: 1000000,
          reward: 6588,
          jump: 8568
        },
        {
          level: 'VIP9',
          cord: 5000000,
          reward: 35888,
          jump: 44456
        }
      ],
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
    getReword() {
      if (this.info.state == 0) {
        this.$api.everyDayDraw(this.params).then(res => {
          /*请求成功后的操作*/
          if (res.data.code == 0) {
            this.canClick = false
            this.info.text = '已领取'
          }
        })
      }
    }
  },
  created() {

    this.$api.userVip(this.params).then(res => {
      /*请求成功后的操作*/
      // console.log(res);
      if (res.data.code == 0) {
        let datalist = res.data.data;
        this.info = datalist;
        if (datalist.state == 0) {
          this.info.text = '可以领取'
          this.info.canClick = true
        } else {
          this.info.text = '不可领取'
        }
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
      centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
      centerContent: '晋级奖励', //中间区域内容
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
.level .titleBgImgbox {
  height: 300px;
  background-image: url('../../../../assets/img/activityAndAgency/levelbg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20px;
}

.level .levelnow {
  padding: 20px 30px;
}

.level .levelnow p {
  font-size: 40px;
  color: #000;
}

.level .levelnow p span {
  color: #d91f37;
}

.level .levelnow>span {
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

.level .contentBox {
  padding: 30px 30px 0 30px;
}

.level .contentBox h2 {
  padding-left: 20px;
  border-left: 10px solid #109a5a;
  font-size: 44px;
  font-weight: 400;
  color: #109a5a;
  margin-bottom: 40px;
  margin-top: 40px;
}

.level .vux-table td {
  height: 80px;
  font-size: 32px;
  color: #666666;
  font-weight: 300;
}

.level .vux-table th {
  font-weight: 300;
  color: #666666;
  height: 80px;
  padding:10px 0;
  font-size: 32px;
  background-color: #f2f7ff;
}

.level .vux-table td:first-child {
  padding: 0 20px;
}

.level .contentBox p {
  color: #000;
  font-size: 36px;
}

</style>
