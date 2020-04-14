<template>
  <div class="quickThreeBox">
    <game-page-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore" v-on:clickCenter="clickCenter"></game-page-header>
    <div class="right-dialog-main" v-show="rightDialog">
      <div class="triangle_border_up">
        <span></span>
      </div>
      <ul>
        <li @click="goTrendZs">走势图</li>
        <!--<li @click="goTrendKj">近期开奖</li>-->
        <!--<li>号码统计</li>-->
        <li @click="goQuestion('2')">玩法说明</li>
      </ul>
    </div>
    <div class="select-quick3-type" v-if="Quick3Show">
      <h3><p>普通</p></h3>
      <ul class="select-quick3-type-list clearfix">
        <li :class="{'select-quick3-type-active': quick3TypeActive === '1'}" @click="changeQuick3TypeActive('1')">
          <p>和值</p>
          <span>奖金9-240元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v2.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v3.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '2'}" @click="changeQuick3TypeActive('2')">
          <p>三同号</p>
          <span>奖金40-240元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v1.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '3'}" @click="changeQuick3TypeActive('3')">
          <p>二同号</p>
          <span>奖金15-80元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v3.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '4'}" @click="changeQuick3TypeActive('4')">
          <p>三不同号</p>
          <span>奖金10-40元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3k3_v2.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3k3_v3.png" alt="">
            <p>+</p>
            <img src="src/assets/img/dice5_guess.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '5'}" @click="changeQuick3TypeActive('5')">
          <p>二不同号</p>
          <span>奖金8元</span>
          <div class="quick3-type-dice-box clearfix">
            <img class="two-differ-img" src="src/assets/img/k3_v3.png" alt="">
            <p>+</p>
            <img src="src/assets/img/dice5_guess.png" alt="">
          </div>
        </li>
      </ul>
      <h3><p>胆拖</p></h3>
      <ul class="select-quick3-type-list clearfix">
        <li :class="{'select-quick3-type-active': quick3TypeActive === '6'}" @click="changeQuick3TypeActive('6')">
          <p>三不同号</p>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '7'}" @click="changeQuick3TypeActive('7')">
          <p>二不同号</p>
        </li>
      </ul>
    </div>
    <div class="contentBox" @click="noQuick3Show" style="">
      <div class="contentBox-main">
        <flexbox :gutter="0" class="topFlexbox">
          <flexbox-item>
            <div v-show="issueShow" class="flex-demo">
              <p>{{issue}}期开奖：<span></span> </p>
              <div class="openBut" @click="openQuickHistory">
                <img class="sz" :src="'src/assets/img/k3k3_v' + this.imgnum[0] + '.png'" alt="">
                <img class="sz" :src="'src/assets/img/k3k3_v' + this.imgnum[1] + '.png'" alt="">
                <img class="sz" :src="'src/assets/img/k3k3_v' + this.imgnum[2] + '.png'" alt="">
                <img class="kaijiangbtn"
                     :class="{'kaijiangbtn-inverse': (this.contentBoxTouchTop != 0 || this.contentBoxTouchTop != 0)}"
                     src="src/assets/img/kaijiangbtn.png" alt="">
              </div>
              </div>
              <div v-show="noissueShow" class="flex-demo">
                <p>{{issue}}期开奖：<span></span> </p>
                <div class="openBut" @click="openQuickHistory">
                  <span class="ddkj">等待开奖</span>
                  <img class="kaijiangbtn"
                     :class="{'kaijiangbtn-inverse': (this.contentBoxTouchTop != 0 || this.contentBoxTouchTop != 0)}"
                     src="src/assets/img/kaijiangbtn.png" alt="">
              </div>
                </div>
          </flexbox-item>
          <flexbox-item>
            <div class="flex-demo">
              <p>距{{nextIssue}}期截止</p>
              <div><span>{{showTime}}</span></div>
            </div>
            <div class="progress" :style="'width:'+timePercent"></div>
          </flexbox-item>
        </flexbox>
        <div v-show="isShow" class="quick3-history" @click="goTrend">
          <ul class="quick3-history-th clearfix">
            <li>期次</li>
            <li>开奖号码</li>
            <li>和值</li>
            <li>大小</li>
            <li>单双</li>
          </ul>
          <ul class="quick3-history-tr clearfix" v-for="item in tableData">
            <li>{{item.issue}}期</li>
            <li>
              <img :src="'src/assets/img/k3k3_v' + item.lotteryNumber.split('-')[0] + '.png'" alt="">
              <img :src="'src/assets/img/k3k3_v' + item.lotteryNumber.split('-')[1] + '.png'" alt="">
              <img :src="'src/assets/img/k3k3_v' + item.lotteryNumber.split('-')[2] + '.png'" alt="">
              <p>{{item.lotteryNumber}} </p>
            </li>
            <li>{{item.comments}}</li>
            <li>{{item.comments1}}</li>
            <li>{{item.comments2}}</li>
          </ul>
          <p class="quick3-history-more">点击以上开奖号码区域可查看更多</p>
        </div>
        <div v-show="onShow" class="quick3-history" @click="goTrend">
          <ul class=" quick3-history-th-new clearfix">
            <li>期次</li>
            <li>开奖号码</li>
            <li>形态</li>
          </ul>
          <ul class="quick3-history-tr-new  clearfix" v-for="item in listData">
            <li>{{item.issue}}期</li>
            <li>
              <img :src="'src/assets/img/k3k3_v' + item.lotteryNumber.split('-')[0] + '.png'" alt="">
              <img :src="'src/assets/img/k3k3_v' + item.lotteryNumber.split('-')[1] + '.png'" alt="">
              <img :src="'src/assets/img/k3k3_v' + item.lotteryNumber.split('-')[2] + '.png'" alt="">
              <p>{{item.lotteryNumber}} </p>
            </li>
            <li>{{item.comments1}}</li>
          </ul>
          <p class="quick3-history-more">点击以上开奖号码区域可查看更多</p>
        </div>
        <transition name="fade">
          <!--和值-->
          <div v-if="quick3TypeActive === '1'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
            <div class="btn-select">
              <img src="src/assets/img/k2_shake_icon.png" alt="">
              <p>摇一摇机选</p>
            </div>
            <h2>猜开奖号码相加的和</h2>
            <div class="btn-hezhi-main">
              <ul class="clearfix">
                <li v-for="(item, index) in hezhiData" :data-num="item.name" :class="item.checked?'active':''" @click="ClickHezhi($event,item)">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;">
                    <p>{{item.name}}</p><span>奖金：{{item.bonus}}</span>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0">遗漏：</template>
                    {{item.leave}}
                  </div>
                </li>
              </ul>
            </div>
            <h2>快速选号</h2>
            <div class="btn-hezhi-fast">
              <ul class="clearfix" style="border-width: 1px;">
                <li style="border-width: 1px;" @click="quickClick($event,'da')" :class="activeDa?'active':''">大</li>
                <li style="border-width: 1px;" @click="quickClick($event,'xiao')" :class="activeXiao?'active':''">小</li>
                <li style="border-width: 1px;" @click="quickClick($event,'dan')" :class="activeDan?'active':''">单</li>
                <li style="border-width: 1px;" @click="quickClick($event,'shuang')" :class="activeShuang?'active':''">双</li>
              </ul>
            </div>
          </div>
          <!--三同号-->
          <div v-if="quick3TypeActive === '2'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
            <div class="btn-select">
              <img src="src/assets/img/k2_shake_icon.png" alt="">
              <p>摇一摇机选</p>
            </div>
            <h2>&nbsp;</h2>
            <h2>猜豹子号 （3个号相同）</h2>
            <div class="btn-hezhi-main btn-santonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in santonghaoData" :class="item.checked?'active':''" @click="clickT3($event,item)" v-if="index!==santonghaoData.length-1">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;">
                    <p>{{item.name}}</p><span>奖金：{{item.bonus}}</span>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0">遗漏：</template>
                    {{item.leave}}
                  </div>
                </li>
              </ul>
            </div>
            <div class="btn-hezhi-main">
              <ul class="clearfix" style="margin-top: 25px;">
                <li style="width: 92%;">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="santonghaoData[santonghaoData.length-1].checked?'active':''" @click="clickXtEvent">
                    <p>三同号通选</p>
                    <span>任意一个豹子开出,即中40元</span>
                  </div>
                  <div class="hezhi-leave" style="text-align: left">
                    <template>遗漏：</template>
                    --
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--二同号-->
          <div v-if="quick3TypeActive === '3'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
            <div class="btn-select">
              <img src="src/assets/img/k2_shake_icon.png" alt="">
              <p>摇一摇机选</p>
            </div>
            <h2>&nbsp;</h2>
            <h2>猜对子号 （2个号相同）</h2>
            <div class="ertonghao-title" style="background-image: url('src/assets/img/ertonghao2.png')">
              选择同号和不同号的组合，奖金80元
            </div>
            <h2>同号</h2>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in t21">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="t21Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
            <h2>不同号</h2>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in t1">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="t1Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
            <div class="ertonghao-title" style="background-image: url('src/assets/img/ertonghao1.png')">
              猜开奖中两个指定的相同号码，奖金15元
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in t2">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="t2Event($event,item)">
                    <p>{{item.name}}*</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--三不同号-->
          <div v-if="quick3TypeActive === '4'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
            <div class="btn-select">
              <img src="src/assets/img/k2_shake_icon.png" alt="">
              <p>摇一摇机选</p>
            </div>
            <h2>&nbsp;</h2>
            <div class="ertonghao-title ertonghao-title-fourFont" style="background-image: url('src/assets/img/ertonghao3.png');">
              选3个不同号码，与开奖相同即中40元
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in rt3">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="rt3Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
            <h2>&nbsp;</h2>
            <div class="ertonghao-title ertonghao-title-threeFont" style="background-image: url('src/assets/img/ertonghao4.png');">
              123/234/345/456任一开出即中10元
            </div>
            <div class="btn-hezhi-main">
              <ul class="clearfix" style="margin-top: 25px;">
                <li style="width: 92%;">
                  <div class="btn-list btn-hezhi-list btn-sanlianhao-list" style="border-width: 1px;" :class="activeLh?'active':'' " @click="rt3LhEvent($event)">
                    <p>三连号通选</p>
                  </div>
                  <div class="hezhi-leave" style="text-align: left">
                    <template>遗漏：</template>
                    --
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--二不同号-->
          <div v-if="quick3TypeActive === '5'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
            <div class="btn-select">
              <img src="src/assets/img/k2_shake_icon.png" alt="">
              <p>摇一摇机选</p>
            </div>
            <h2>&nbsp;</h2>
            <div class="ertonghao-title ertonghao-none-fourFont">
              选2个不同号码，猜中中奖的任意2位即中8元
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in rt2">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="rt2Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--三不同号胆拖-->
          <div v-if="quick3TypeActive === '6'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" style="padding: 0;">
            <div class="ertonghao-title ertonghao-none-fourFont" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
              选3个不同号码，与开奖相同即中40元
            </div>
            <div class="why-dantuo" @click="goQuestion('1')">
              什么是胆拖？
            </div>
            <h2>&nbsp;</h2>
            <div class="ertonghao-title" style="background-image: url('src/assets/img/ertonghao5.png')">
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in dt3">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="dt3Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
            <div class="ertonghao-title" style="background-image: url('src/assets/img/ertonghao6.png')">
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in dt31">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="dt31Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--二不同号胆拖-->
          <div v-if="quick3TypeActive === '7'" :class="[{'fade-enter-active': fadeLeaveActiveEnter}]" ref="contentBoxTouch" :style="{'transform': 'translateY(' + (contentBoxTouchTop) + 'px)'}" class="select-main" style="padding: 0;" @touchstart.stop="contentTouchstart" @touchmove.stop.prevent="contentTouchmove" @touchend.stop="contentTouchend">
            <div class="ertonghao-title ertonghao-none-fourFont">
              选2个不同号码，猜中中奖的任意2位即中8元
            </div>
            <div class="why-dantuo" @click="goQuestion('1')">
              什么是胆拖？
            </div>
            <h2>&nbsp;</h2>
            <div class="ertonghao-title" style="background-image: url('src/assets/img/ertonghao5.png')">
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in dt2">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="dt2Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
            <div class="ertonghao-title" style="background-image: url('src/assets/img/ertonghao6.png')">
            </div>
            <div class="btn-hezhi-main btn-ertonghao-main">
              <ul class="clearfix">
                <li v-for="(item, index) in dt21">
                  <div class="btn-list btn-hezhi-list" style="border-width: 1px;" :class="item.checked?'active':'' " @click="dt21Event($event,item)">
                    <p>{{item.name}}</p>
                  </div>
                  <div class="hezhi-leave">
                    <template v-if="index === 0"></template>
                    --
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="kuai3-footer">
      <div class="kuai3-left-btn" v-if="!isEmpty" @click="jxEvent">
        机选
      </div>
      <div class="kuai3-left-btn empty" v-else @click="emptyData">
        清空
      </div>
      <div class="kuai3-confirm-btn" @click="goBets">
        确认
      </div>
      <h6>
        共{{zhu}}注：<span>{{money}}元</span>
      </h6>
      <div class="packet-popup" v-if="isJx">
        <ul>
          <li @click="xzEvent(1)">
            <span class="packet">1</span>
            <span class="text">1注</span>
          </li>
          <li @click="xzEvent(5)">
            <span class="packet">5</span>
            <span class="text">5注</span>
          </li>
          <li @click="xzEvent(10)">
            <span class="packet">10</span>
            <span class="text">10注</span>
          </li>
        </ul>
        <div class="zhijiao"></div>
      </div>
    </div>
    <div :class="openRegModal?'kuai3-footer-hint active':'kuai3-footer-hint' ">
      <img src="src/assets/img/kuai3-footer-hint.png" alt="">
      若中奖：奖金
      <span v-if="jjRegion[0]">{{jjRegion[0]}}至</span>
      <span>{{jjRegion[1]}}</span>元,
      <span v-if="!(ylRegion[0]<0 && ylRegion[1]<0)">
             盈利
          <span v-if="ylRegion[0]">{{ylRegion[0]}}至</span>
      <span>{{ylRegion[1]}}</span>元
      </span>
      <span v-else>
             亏损
          <span v-if="ylRegion[0]">{{ylRegion[0] < ylRegion[1]?Math.abs(ylRegion[1]):Math.abs(ylRegion[0])}}至</span>
      <span>{{ylRegion[1] < ylRegion[0]?Math.abs(ylRegion[1]):Math.abs(ylRegion[0])}}</span>元
      </span>
    </div>
    <toast v-model="showToast" type="text" :time="2000" :text="tipTxt" position="middle" width="20em"></toast>
    <div v-transfer-dom>
      <confirm v-model="confirmShow" ref="confirm" title="清空" @on-cancel="onCancel" @on-confirm="onConfirm">
        <p style="text-align:center;">你确定清空当前的投注内容？</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, Divider, Toast, Confirm, TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapActions } from "vuex"
import GamePageHeader from '../../common/gamePageHeader.vue'
window.dataPool = []
export default {
  name: "quick-three",
  directives: {
    TransferDom
  },
  components: {
    GamePageHeader,
    Flexbox,
    FlexboxItem,
    Toast,
    Confirm
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  data() {
    return {
      Id: 0,
      operation: { //头部组件状态管理
        backgroundClass: 'bgImg', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerAlertShow: false, //中间弹层是否显示
        centerContent: [{ id: 1, name: '和值' }, { id: 2, name: '三同号' }, { id: 3, name: '二同号' }, { id: 4, name: '三不同号' }, { id: 5, name: '二不同号' }, { id: 6, name: '三不同号胆拖' }, { id: 7, name: '二不同号胆拖' }], //中间区域内容
        centerContentKey: window.localStorage.getItem('quick3TypeActive') || 1, //中间区域选中的值的id
        rightShow: false, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '助手', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
      },
      Quick3Show: false, //头部中间弹层
      rightDialog: false, //头部右侧弹层
      issueShow: false,
      noissueShow: false,
      isShow: true,
      onShow: false,
      confirmShow: false,
      periodsData: {},
      tableData: [],
      listData: [],
      formData: [],
      playCode: 'A',
      imgnum: '',
      resultVO: {},
      issuenum: '',
      lotteryNumber: '',
      issue: '', //当前期数
      nextIssue: '', //下一期
      gameType: window.localStorage.getItem('gameType') || 'bjfast3', //彩种
      playType: 'B', //玩法
      tipTxt: '',
      timeFun: Object,
      showToast: false,
      // 奖金区间
      jjRegion: [0, 0],
      // 盈利区间
      ylRegion: [0, 0],
      // 亏损
      ksRegion: [0, 0],
      // 不同类型的下注方式
      Quickform: {
        // 和值
        hz: {
          // 下注号码
          hm: []
        },
        // 三同号
        t3: {
          // 下注号码
          hm: []
        },
        // 二同号
        t2: {
          // 下注号码
          hm: [],
          dm: [],
          tm: []
        },
        // 三不同号
        rt3: {
          // 下注号码
          hm: []
        },
        // 二不同号
        rt2: {
          // 下注号码
          hm: []
        },
        // 三不同号胆拖
        dt3: {
          // 下注号码
          hm: [],
          dm: [],
          tm: []
        },
        // 二不同号胆拖
        dt2: {
          // 下注号码
          hm: [],
          dm: [],
          tm: []
        }

      },
      timer: null,
      contentBoxTouchMove: '',
      fadeLeaveActiveHalf: false,
      fadeLeaveActiveEnter: true,
      fadeLeaveActive: false,
      contentBoxTouchStart: '',
      contentBoxTouchTop: '',
      quick3TypeActive: window.localStorage.getItem('quick3TypeActive') || 1,
      hezhiData: [
        { 'name': 3, 'leave': '128', 'bonus': '240' },
        { 'name': 4, 'leave': '112', 'bonus': '80' },
        {
          'name': 5,
          'leave': '29',
          'bonus': '40'
        }, { 'name': 6, 'leave': '2', 'bonus': '25' },
        { 'name': 7, 'leave': '--', 'bonus': '16' }, { 'name': 8, 'leave': '112', 'bonus': '12' }, {
          'name': 9,
          'leave': '29',
          'bonus': '10'
        }, { 'name': 10, 'leave': '2', 'bonus': '9' },
        { 'name': 11, 'leave': '--', 'bonus': '9' }, { 'name': 12, 'leave': '112', 'bonus': '10' }, {
          'name': 13,
          'leave': '29',
          'bonus': '12'
        }, { 'name': 14, 'leave': '2', 'bonus': '16' },
        { 'name': 15, 'leave': '--', 'bonus': '25' }, { 'name': 16, 'leave': '112', 'bonus': '40' }, {
          'name': 17,
          'leave': '29',
          'bonus': '80'
        }, { 'name': 18, 'leave': '2', 'bonus': '240' }
      ],
      santonghaoData: [
        { 'name': 111, 'leave': '--', 'bonus': '240' }, { 'name': 222, 'leave': '--', 'bonus': '240' }, {
          'name': 333,
          'leave': '--',
          'bonus': '240'
        }, { 'name': 444, 'leave': '--', 'bonus': '240' },
        { 'name': 555, 'leave': '--', 'bonus': '240' }, { 'name': 666, 'leave': '--', 'bonus': '240' },
        { 'name': '111222333444555666', 'leave': '--', 'bonus': '40' }
      ],
      // 2个号相同数据
      t21: [{ name: 11 }, { name: 22 }, { name: 33 }, { name: 44 }, { name: 55 }, { name: 66 }],
      // 1个号不同号
      t1: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      t2: [{ name: 11, bonus: '15' }, { name: 22, bonus: '15' }, { name: 33, bonus: '15' }, { name: 44, bonus: '15' }, { name: 55, bonus: '15' }, { name: 66, bonus: '15' }],
      rt3: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      rt2: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      dt3: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      dt31: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      dt2: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      dt21: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      name: '',
      openRegModal: false,
      showTime: '', //页面显示时间，分秒格式
      deadlineTime: '', //服务器当前期截止时间，时间戳
      remainingTime: '', //服务器返回的剩余时间
      closeTime: '',
      timeNum: '',
      totalTime: 600,
      timePercent: '0%',
      zhu: 0,
      money: 0,
      // 大小单双激活状态
      activeDa: false,
      activeXiao: false,
      activeDan: false,
      activeShuang: false,
      activeTx: false,
      // 三连号通选
      activeLh: false,
      // 大小单双
      dxds: {
        da: [],
        xiao: [],
        dan: [],
        shuang: [],
        dx: [],
        dd: [],
        sx: [],
        sd: []
      },
      isEmpty: false,
      forBack: '',
      isJx: false
    }
  },


  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 头部点击返回事件处理
    clickBack(value) {
      if (this.isEmpty) {
        this.confirmShow = true
      } else if (this.forBack) {
        this.$router.push({ path: '/' + this.forBack })
      } else {
        this.$router.push({ path: `/page/index${this.Id}` })
      }
    },
    onCancel() {
      this.confirmShow = false
    },
    onConfirm() {
      this.emptyData()
      this.$router.push({ path: `/page/index${this.Id}` })
    },
    // 头部点击更多事件处理
    clickMore(value) {
      // console.log('点击了更多按钮')
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.rightDialog = !this.rightDialog;
    },
    // 头部点击中间事件处理
    clickCenter(value) {
      // console.log('点击了中间')
      this.rightDialog = false;
      this.Quick3Show = !this.Quick3Show;
      this.operation.centerAlertShow = !this.operation.centerAlertShow;
    },
    initda() {
      const that = this
      let params = {}
      params.gameType = this.gameType
      this.$api.LotteryInfo(params).then(res => {
        // console.log(res, "---this is LotteryInfo back data")
        this.issue = res.data.data.issue
        this.nextIssue = res.data.data.nextIssue
        this.periodsData = res.data
        this.resultVO = res.data.data.resultVO
        if (this.resultVO != '' && this.resultVO != null) {
          this.issueShow = true;
          this.noissueShow = false;
          this.imgnum = res.data.data.resultVO.num
        } else {
          this.noissueShow = true;
          this.issueShow = false;
        }
        this.tableData = res.data.data.list

        let deadlineTime = res.data.data.closeTime; //服务器当前期截至时间
        let remainingTime = res.data.data.showTime; //服务器返回的剩余时间
        this.deadlineTime = deadlineTime;
        this.remainingTime = remainingTime;
        // 倒计时初始化显示
        that.timeNum = '';
        let nowTime = new Date().getTime(); //当前时间时间戳
        if (((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0) - this.remainingTime > 1) {
          that.timeNum = this.remainingTime;
        } else {
          that.timeNum = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
        }
        // 开始倒计时
        // this.timeNum = timeNum;
        that.calculateTheRemainingTime(that.timeNum)
        that.countDown();
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 计算剩余时间
    calculateTheRemainingTime(timeNum) {
      let leftTime = '';
      let rightTime = '';
      let hour = '';
      let minute = '';
      let second = '';
      if (timeNum >= 36000) { //十个小时及以上
        this.totalTime = 43200;
        leftTime = Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((3600 <= timeNum) && (timeNum < 36000)) { //一个小时到十个小时
        this.totalTime = 25200;
        leftTime = '0' + Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((600 <= timeNum) && (timeNum < 3600)) { //十分钟到一个小时
        this.totalTime = 3600;
        leftTime = Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((60 <= timeNum) && (timeNum < 600)) { //一分钟到十分钟
        this.totalTime = 600;
        leftTime = '0' + Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((10 <= timeNum) && (timeNum < 60)) { //十秒到一分钟
        this.totalTime = 600;
        leftTime = '00';
        rightTime = timeNum;
      } else if ((0 <= timeNum) && (timeNum < 10)) { //零到十秒
        this.totalTime = 600;
        leftTime = '00';
        rightTime = '0' + timeNum;
      } else { //其他
        this.totalTime = 600;
        leftTime = '00';
        rightTime = '00';
      }
      this.showTime = leftTime + ":" + rightTime;
      this.timePercent = ((timeNum / this.totalTime).toFixed(2) * 100).toString() + '%';
    },
    // 倒计时
    countDown() {
      const that = this
      let timeNum = '';
      let nowTime = new Date().getTime();
      if (((Number(this.deadlineTime) - Number(nowTime)) / 1000).toFixed(0) - this.remainingTime > 1) {
        timeNum = this.remainingTime;
      } else {
        timeNum = ((Number(this.deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
      }
      this.timeFun = setInterval(() => {
        timeNum--;
        this.remainingTime--;
        if (timeNum < 0) {
          clearInterval(that.timeFun)
          setTimeout(() => {
            that.initda()
          }, 500)
        }
        this.calculateTheRemainingTime(timeNum)
      }, 1000)
    },
    initdata() {
      let params = {}
      params.gameType = this.gameType
      params.playType = this.playType
      this.$api.PlayInfo(params).then(res => {
        this.listData = res.data.data
        // console.log(res.data.data)
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 分类大小单双
    createDxds() {
      for (var x in this.hezhiData) {
        if (this.hezhiData[x].name <= 10) {
          this.dxds.xiao.push(this.hezhiData[x])
        }
        if (this.hezhiData[x].name > 10) {
          this.dxds.da.push(this.hezhiData[x])
        }
        if (this.hezhiData[x].name % 2 !== 0) {
          this.dxds.dan.push(this.hezhiData[x])
          if (this.hezhiData[x].name <= 10) {
            this.dxds.dx.push(this.hezhiData[x])
          }
          if (this.hezhiData[x].name > 10) {
            this.dxds.dd.push(this.hezhiData[x])
          }
        }
        if (this.hezhiData[x].name % 2 == 0) {
          this.dxds.shuang.push(this.hezhiData[x])
          if (this.hezhiData[x].name <= 10) {
            this.dxds.sx.push(this.hezhiData[x])
          }
          if (this.hezhiData[x].name > 10) {
            this.dxds.sd.push(this.hezhiData[x])
          }
        }
      }

    },
    ClickHezhi(e, data) {
      this.selectEvent(this.Quickform.hz.hm, data)
    },
    // 三同号选择号码事件
    clickT3(e, data) {
      if (this.activeTx) {
        this.activeTx = false
        this.Quickform.t3.hm = []
      }
      this.selectEvent(this.Quickform.t3.hm, data)
    },
    // 选择号码事件
    selectEvent(target, data) {
      // 保存号码和奖金

      if (data.checked) {
        data.checked = false
        for (var x in target) {
          if (target[x].num == data.name) {
            target.splice(x--, 1)
          }
        }
      } else {
        data.checked = true
        var temp = { num: data.name, jj: data.bonus }
        target.push(temp);
      }
      if (this.quick3TypeActive == 1) {

        this.recodeDxds(target)
      }
      this.calYK(target)
    },
    //机选
    //  Pauseevent() {
    //    if(this.quick3TypeActive == '1') {
    //      this.randomHz()
    //    }
    //  },
    //  //随机生成和值
    //  randomHz() {
    //    var data = []
    //    for (var x = 0; x < 16; x++) {
    //      data.push(x + 3)
    //    }
    //    var index = Math.ceil(Math.random() * 15)
    //    var temp = { type: '和值', data: { hm: [{ num: data[index] }] } }
    //  },
    // 三同号 3个号 通选事件
    clickXtEvent() {
      var data = this.santonghaoData[this.santonghaoData.length - 1]
      if (data.checked) {
        data.checked = false
        this.playCode = 'B000'
        for (var x in this.Quickform.t3.hm) {
          if (this.Quickform.t3.hm[x].sum == data.name) {
            this.Quickform.t3.hm.splice(x, 1)
          }
        }
        this.calYK(this.Quickform.t3.hm)
      } else {

        data.checked = true
        this.playCode = 'B'
        var temp = { num: data.name, jj: data.bonus }
        this.Quickform.t3.hm.push(temp)
        this.calYK(this.Quickform.t3.hm)
      }

    },

    // 根据和值显示大小单双
    recodeDxds(data) {
      var da = this.calIsDxdxIndex(data, this.dxds.da, 'da')
      if (da) {
        return
      }
      var xiao = this.calIsDxdxIndex(data, this.dxds.xiao, 'xiao')
      if (xiao) {
        return
      }
      var dan = this.calIsDxdxIndex(data, this.dxds.dan, 'dan')
      if (dan) {
        return
      }
      var shuang = this.calIsDxdxIndex(data, this.dxds.shuang, 'shuang')
      if (shuang) {
        return
      }
      var dx = this.calIsDxdxIndex(data, this.dxds.dx, 'dx')
      if (dx) {
        return
      }
      var dd = this.calIsDxdxIndex(data, this.dxds.dd, 'dd')
      if (dd) {
        return
      }
      var sx = this.calIsDxdxIndex(data, this.dxds.sx, 'sx')
      if (sx) {
        return
      }
      var sd = this.calIsDxdxIndex(data, this.dxds.sd, 'sd')
      if (sd) {
        return
      }

    },

    calIsDxdxIndex(data, obj, type) {
      var index = 0
      for (var x in data) {

        for (var y in obj) {
          if (data[x].num == obj[y].name) {
            index++
            continue
          }
        }
      }

      if (type == 'da') {
        if (index == obj.length && index == data.length) {
          this.activeDa = true
        } else {
          this.activeDa = false
        }
        return this.activeDa

      } else if (type == 'xiao') {
        if (index == obj.length && index == data.length) {
          this.activeXiao = true
        } else {
          this.activeXiao = false
        }
        return this.activeXiao
      } else if (type == 'dan') {
        if (index == obj.length && index == data.length) {
          this.activeDan = true
        } else {
          this.activeDan = false
        }
        return this.activeDan
      } else if (type == 'shuang') {
        if (index == obj.length && index == data.length) {
          this.activeShuang = true
        } else {
          this.activeShuang = false
        }
        return this.activeShuang
      } else if (type == 'dx') {
        if (index == obj.length && index == data.length) {
          this.activeDan = true
          this.activeXiao = true
          return true
        } else {
          this.activeDan = false
          this.activeXiao = false
          return false
        }
      } else if (type == 'dd') {
        if (index == obj.length && index == data.length) {
          this.activeDan = true
          this.activeDa = true
          return true
        } else {
          this.activeDan = false
          this.activeDa = false
          return false

        }
      } else if (type == 'sx') {
        if (index == obj.length && index == data.length) {
          this.activeShuang = true
          this.activeXiao = true
          return true

        } else {
          this.activeShuang = false
          this.activeXiao = false
          return false

        }
      } else if (type == 'sd') {
        if (index == obj.length && index == data.length) {
          this.activeShuang = true
          this.activeDa = true
          return true
        } else {
          this.activeShuang = false
          this.activeDa = false
          return false

        }
      }

    },


    // 大小单双选择
    quickClick(event, type) {



      this.Quickform.hz.hm = []
      for (var x in this.hezhiData) {
        this.hezhiData[x].checked = false
      }
      if (type === 'da') {
        if (this.activeDa) {
          this.activeDa = false
          if (this.activeDan) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dan)
          } else if (this.activeShuang) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.shuang)
          }
        } else {
          this.activeDa = true
          this.activeXiao = false
          if (this.activeDan) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dd)
          } else if (this.activeShuang) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.ds)
          } else {
            this.setHzData(this.Quickform.hz.hm, this.dxds.da)
          }
        }
      }
      if (type === 'xiao') {
        if (this.activeXiao) {
          this.activeXiao = false
          if (this.activeDan) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dan)
          } else if (this.activeShuang) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.shuang)
          }
        } else {
          this.activeXiao = true
          this.activeDa = false
          if (this.activeDan) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dx)
          } else if (this.activeShuang) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.sx)
          } else {
            this.setHzData(this.Quickform.hz.hm, this.dxds.xiao)
          }

        }

      }
      if (type === 'dan') {
        if (this.activeDan) {
          this.activeDan = false
          if (this.activeDa) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.da)
          } else if (this.activeXiao) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.xiao)
          }
        } else {
          this.activeDan = true
          this.activeShuang = false
          if (this.activeDa) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dd)
          } else if (this.activeXiao) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dx)
          } else {
            this.setHzData(this.Quickform.hz.hm, this.dxds.dan)
          }
        }
      }
      if (type === 'shuang') {
        if (this.activeShuang) {
          this.activeShuang = false
          if (this.activeDa) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.da)
          } else if (this.activeXiao) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.xiao)
          }
        } else {
          this.activeShuang = true
          this.activeDan = false
          if (this.activeDa) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.sd)
          } else if (this.activeXiao) {
            this.setHzData(this.Quickform.hz.hm, this.dxds.sx)
          } else {
            this.setHzData(this.Quickform.hz.hm, this.dxds.shuang)
          }
        }

      }


      this.calYK(this.Quickform.hz.hm)
    },

    setHzData(obj, data) {
      for (var x in data) {
        data[x].checked = true
        var temp = { num: data[x].name, jj: data[x].bonus }
        obj.push(temp)
      }
    },
    t21Event(event, data) {
      if (data.checked) {
        data.checked = false
      } else {
        data.checked = true
        // 判断t1是否有同号 比如44 t1就不能有4
        for (var x in this.t1) {
          if (this.t1[x].checked && data.name.toString().indexOf(this.t1[x].name.toString()) >= 0) {
            this.t1[x].checked = false
          }
        }
      }
      this.matchT21()
    },

    t1Event(event, data) {
      if (data.checked) {
        data.checked = false
      } else {

        data.checked = true
        // 判断t1是否有同号 比如44 t1就不能有4
        for (var x in this.t21) {
          if (this.t21[x].checked && this.t21[x].name.toString().indexOf(data.name.toString()) >= 0) {
            this.t21[x].checked = false
          }
        }
      }
      this.matchT21()
    },
    t2Event(event, data) {
      if (data.checked) {
        data.checked = false
        for (var x in this.Quickform.t2.hm) {
          if (this.Quickform.t2.hm[x].num.toString() == data.name.toString()) {
            this.Quickform.t2.hm.splice(x--, 1)
          }
        }
      } else {
        data.checked = true
        var temp = { num: data.name, jj: 15 }
        var hasVal = false
        for (var x in this.Quickform.t2.hm) {
          if (this.Quickform.t2.hm[x].num.toString() == data.name.toString()) {
            hasVal = true
          }
        }
        if (!hasVal) {
          this.Quickform.t2.hm.push((temp))
        }
      }

      this.calYK(this.Quickform.t2.hm)

    },
    // 二同号匹配
    matchT21() {

      this.Quickform.t2.dm = []
      this.Quickform.t2.tm = []
      this.Quickform.t2.hm = []
      for (var x in this.t21) {
        if (this.t21[x].checked) {
          this.Quickform.t2.dm.push(this.t21[x].name)
          for (var y in this.t1) {
            if (this.t1[y].checked) {
              this.Quickform.t2.tm.push(this.t1[y].name)
              var hm = this.t21[x].name.toString() + this.t1[y].name.toString()
              var temp = { num: hm, jj: 80 }
              var hasVal = false
              for (var z in this.Quickform.t2.hm) {
                if (this.Quickform.t2.hm[z].num.toString() == hm.toString()) {
                  hasVal = true
                }
              }
              if (!hasVal) {
                this.Quickform.t2.hm.push(temp)
              }
            }
          }
        }
      }

      this.Quickform.t2.tm = this.unique(this.Quickform.t2.tm)
      // 判断t2
      for (var x in this.t2) {
        if (this.t2[x].checked) {
          var temp = { num: this.t2[x].name, jj: this.t2[x].bonus }
          this.Quickform.t2.hm.push(temp)
        }
      }

      this.calYK(this.Quickform.t2.hm)
    },

    // 三不同号
    rt3Event(event, data) {
      if (data.checked) {
        data.checked = false
      } else {
        data.checked = true
      }



      this.Quickform.rt3.hm = []
      var num1 = []
      // 选择第一个号码

      for (var x in this.rt3) {
        if (this.rt3[x].checked) {
          num1.push(this.rt3[x].name)
        }
      }

      var hm = []
      var num = ''
      if (num1.length >= 3) {
        for (var x in num1) {

          for (var y in num1) {

            for (var z in num1) {
              if (num1[x] !== num1[y] && num1[x] !== num1[z] && num1[y] !== num1[z]) {

                num = num1[x].toString()
                num += num1[y].toString()
                num += num1[z].toString()
                var hasVal = false
                for (var u in hm) {
                  var hm1 = hm[u].split('').sort().join()
                  var hm2 = num.split('').sort().join()
                  if (hm1 == hm2) {
                    hasVal = true
                  }

                }
                if (!hasVal) {
                  hm.push(num)
                }
              }
            }
          }
        }
      }
      if (hm.length > 0) {
        for (var x in hm) {
          var temp = { num: hm[x], jj: 40 }
          this.Quickform.rt3.hm.push(temp)
        }

      }
      if (this.activeLh) {
        var temp = { num: '123234345456', jj: '10' }
        this.Quickform.rt3.hm.push(temp)
      }
      this.calYK(this.Quickform.rt3.hm)

    },

    // 二不同号
    rt2Event(event, data) {
      if (data.checked) {
        data.checked = false
      } else {
        data.checked = true
      }



      this.Quickform.rt2.hm = []
      var num1 = []
      // 选择第一个号码

      for (var x in this.rt2) {
        if (this.rt2[x].checked) {
          num1.push(this.rt2[x].name)
        }
      }

      var hm = []
      var num = ''
      if (num1.length >= 2) {
        for (var x in num1) {
          for (var y in num1) {
            if (num1[x] !== num1[y]) {
              num = num1[x].toString()
              num += num1[y].toString()
              var hasVal = false
              for (var u in hm) {
                var hm1 = hm[u].split('').sort().join()
                var hm2 = num.split('').sort().join()
                if (hm1 == hm2) {
                  hasVal = true
                }
              }
              if (!hasVal) {
                hm.push(num)
              }
            }
          }
        }
      }
      if (hm.length > 0) {
        for (var x in hm) {
          var temp = { num: hm[x], jj: 8 }
          this.Quickform.rt2.hm.push(temp)
        }

      }
      this.calYK(this.Quickform.rt2.hm)
    },
    // 三连号通选
    rt3LhEvent() {
      if (this.activeLh) {
        this.activeLh = false
        for (var x in this.Quickform.rt3.hm) {
          if (this.Quickform.rt3.hm[x].num == '123234345456') {
            this.Quickform.rt3.hm.splice(x--, 1)
          }
        }
      } else {
        this.activeLh = true
        var temp = { num: '123234345456', jj: '10' }
        this.Quickform.rt3.hm.push(temp)
      }
      this.calYK(this.Quickform.rt3.hm)
    },
    // 三不同号胆拖
    dt3Event(event, data) {
      var checkedIndex = 0
      if (!data.checked) {
        for (var x in this.dt3) {
          if (this.dt3[x].checked) {
            checkedIndex++
          }
        }
        if (checkedIndex == 2) {
          this.showToast = true
          this.tipTxt = '三不同号最多只能选择两个胆码'
          return
        }
      }
      this.Quickform.dt3.hm = []
      this.dt22Event(data, this.Quickform.dt3, this.dt3, this.dt31, 3)

    },
    dt31Event(event, data) {

      var checkedIndex = 0
      if (!data.checked) {
        for (var x in this.dt31) {
          if (this.dt31[x].checked) {
            checkedIndex++
          }
        }
        if (checkedIndex == 5) {
          this.showToast = true
          this.tipTxt = '三不同号最多选择5个拖码'
          return
        }
      }
      this.Quickform.dt3.hm = []
      this.dt11Event(data, this.Quickform.dt3, this.dt3, this.dt31, 3)

    },

    // 二个不同号胆拖
    dt2Event(event, data) {
      if (!data.checked) {
        var checkedIndex = 0
        for (var x in this.dt2) {
          if (this.dt2[x].checked) {

            checkedIndex++
          }
        }
        if (checkedIndex == 1) {
          this.showToast = true
          this.tipTxt = '二不同号最多只能选择一个胆码'
          return
        }
      }
      this.Quickform.dt2.hm = []
      this.dt22Event(data, this.Quickform.dt2, this.dt2, this.dt21, 2)

    },
    dt21Event(event, data) {
      var checkedIndex = 0
      if (!data.checked) {
        for (var x in this.dt21) {
          if (this.dt21[x].checked) {
            checkedIndex++
          }
        }
        if (checkedIndex == 5) {
          this.showToast = true
          this.tipTxt = '二不同号最多选择5个拖码'
          return
        }
      }
      this.Quickform.dt2.hm = []
      this.dt11Event(data, this.Quickform.dt2, this.dt2, this.dt21, 2)

    },

    // 胆拖事件
    dt11Event(data, obj, dt1, dt2, fre) {

      if (data.checked) {
        data.checked = false
      } else {
        data.checked = true
        // 判断t1是否有同号 比如44 t1就不能有4
        for (var x in dt1) {
          if (dt1[x].checked && data.name.toString().indexOf(dt1[x].name.toString()) >= 0) {
            dt1[x].checked = false
          }
        }
      }
      this.dxSelect(obj, dt1, dt2, fre)
    },
    // 胆拖事件
    dt22Event(data, obj, dt1, dt2, fre) {

      if (data.checked) {
        data.checked = false
      } else {
        data.checked = true
        // 判断t1是否有同号 比如44 t1就不能有4
        for (var x in dt2) {
          if (dt2[x].checked && data.name.toString().indexOf(dt2[x].name.toString()) >= 0) {
            dt2[x].checked = false
          }
        }
      }
      this.dxSelect(obj, dt1, dt2, fre)
    },
    // 胆拖选号
    dxSelect(obj, data1, data2, fre) {
      var arrs = []
      var arrs2 = []
      obj.dm = []
      obj.tm = []
      // 获取选择的选项
      for (var x in data1) {
        if (data1[x].checked) {
          obj.dm.push(data1[x].name)
          arrs.push(data1[x].name)
        }
      }
      for (var y in data2) {
        if (data2[y].checked) {
          obj.tm.push(data2[y].name)
          arrs2.push(data2[y].name)
        }
      }
      var hm = []
      var num = ''

      if (fre == 3) {

        if (arrs.length == 1) {
          for (var x in arrs) {
            for (var y in arrs2) {
              for (var z in arrs2) {
                if (arrs[x] !== arrs2[y] && arrs[x] !== arrs2[z] && arrs2[y] !== arrs2[z]) {

                  num = arrs[x].toString()
                  num += arrs2[y].toString()
                  num += arrs2[z].toString()
                  var hasVal = false
                  for (var u in hm) {
                    var hm1 = hm[u].split('').sort().join()
                    var hm2 = num.split('').sort().join()
                    if (hm1 == hm2) {
                      hasVal = true
                    }
                  }
                  if (!hasVal) {
                    hm.push(num)
                  }
                }
              }
            }
          }
        }
        if (arrs.length == 2) {
          for (var z in arrs2) {
            num = arrs[0].toString()
            num += arrs[1].toString()
            num += arrs2[z].toString()
            hm.push(num)

          }
        }



        if (hm.length > 0) {
          for (var x in hm) {
            var temp = { num: hm[x], jj: 40 }

            obj.hm.push(temp)
          }
        }
      }
      if (fre == 2) {

        for (var x in arrs) {
          for (var y in arrs2) {
            if (arrs[x] !== arrs2[y]) {

              num = arrs[x].toString()
              num += arrs2[y].toString()
              var hasVal = false
              for (var u in hm) {
                var hm1 = hm[u].split('').sort().join()
                var hm2 = num.split('').sort().join()
                if (hm1 == hm2) {
                  hasVal = true
                }
              }
              if (!hasVal) {
                hm.push(num)
              }

            }
          }
        }

        if (hm.length > 0) {
          for (var x in hm) {
            var temp = { num: hm[x], jj: 8 }
            obj.hm.push(temp)
          }
        }
      }

      this.calYK(obj.hm)

    },

    // 二不同号筛选
    confirmQuick3() {
      // console.log(this.Quickform);
    },
    clickRightAreaText() {
      this.rightDialog = !this.rightDialog;
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
    },

    // 跳转到统计页面
    goTrend() {
      this.$router.push({ 'path': `/trend${this.Id}` })
    },
    // 跳转到下单页面
    goBets() {
      var dataPool = []
      var pool = {}
      var type = ''
      if (this.quick3TypeActive == '1') {
        pool = { type: '和值', data: this.Quickform.hz }
      } else if (this.quick3TypeActive == '2') {
        pool = { type: '三同号', data: this.Quickform.t3 }
      } else if (this.quick3TypeActive == '3') {
        pool = { type: '二同号', data: this.Quickform.t2 }
        if (this.Quickform.t2.tm.length == 0 && this.Quickform.t2.dm.length > 0) {
          this.showToast = true
          this.tipTxt = '二同号单选请至少选择1个不同号码'
          return
        }
        if (this.Quickform.t2.dm.length == 0 && this.Quickform.t2.tm.length > 0) {
          this.showToast = true
          this.tipTxt = '二同号单选请至少选择1个相同号码'
          return
        }

      } else if (this.quick3TypeActive == '4') {
        pool = { type: '三不同号', data: this.Quickform.rt3 }
        if (this.Quickform.rt3.hm.length > 1 && this.Quickform.rt3.hm.length < 2) {
          this.showToast = true
          this.tipTxt = '三不同号请至少选择3个号码'
          return
        }
      } else if (this.quick3TypeActive == '5') {
        pool = { type: '二不同号', data: this.Quickform.rt2 }
      } else if (this.quick3TypeActive == '6') {
        pool = { type: '三个不同号胆拖', data: this.Quickform.dt3 }
      } else if (this.quick3TypeActive == '7') {
        pool = { type: '二个不同号胆拖', data: this.Quickform.dt2 }
      }

      if (pool.data.hm.length > 0) {
//    	debugger
        if (dataPool.length > 0) {
          dataPool.unshift(pool)
        } else {
		    if (localStorage.getItem("publicInfo") != undefined) {
		       dataPool.push(pool)
		    }
        }
      } else {

        this.showToast = true
        this.tipTxt = '至少选择一注'
        return
      }
      this.$router.push({ 'path': `/bets${this.Id}`, 'query': { 'data': dataPool } })
    },
    goQuestion(val) {
      window.localStorage.setItem('quick3TypeActive', this.quick3TypeActive);
      this.$router.push({ 'path': `/question${this.Id}`, 'query': { 'type': val || '1' } })
    },
    openQuickHistory() {
      if (this.contentBoxTouchTop != 0 || this.contentBoxTouchTop != 0) {
        this.contentBoxTouchMove = 0;
        this.contentBoxTouchTop = 0;
      } else {
        this.contentBoxTouchMove = (546 / (375 / window.innerWidth) / 4);
        this.contentBoxTouchTop = (546 / (375 / window.innerWidth) / 4);
      }
    },
    changeQuick3TypeActive(active) {
      window.localStorage.setItem('quick3TypeActive', active);
      if (active == 1) {
        this.calYK(this.Quickform.hz.hm);
        this.isShow = true
        this.onShow = false
      } else if (active == 2) {
        this.calYK(this.Quickform.t3.hm);
        this.isShow = false
        this.onShow = true
      } else if (active == 3) {
        this.calYK(this.Quickform.t2.hm)
        this.isShow = false
        this.onShow = true
      } else if (active == 4) {
        this.calYK(this.Quickform.rt3.hm)
        this.isShow = false
        this.onShow = true
      } else if (active == 5) {
        this.calYK(this.Quickform.rt2.hm)
        this.isShow = false
        this.onShow = true
      } else if (active == 6) {
        this.calYK(this.Quickform.dt3.hm)
        this.isShow = false
        this.onShow = true
        this.isEmpty = true
      } else if (active == 7) {
        this.calYK(this.Quickform.dt2.hm)
        this.isShow = false
        this.onShow = true
        this.isEmpty = true
      }
      this.quick3TypeActive = active;
      this.fadeLeaveActiveEnter = false;
      this.contentBoxTouchMove = 0;
      this.contentBoxTouchTop = 0;
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.operation.centerContentKey = Number(active);
    },
    noQuick3Show() {
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.rightDialog = false;
    },
    clickQuick3Type() {},
    // 根据号码和奖金算出盈亏
    selectDataCheck(data) {

    },

    // 数组去重
    unique(arr) {
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i]);
        }
      }
      return hash;
    },

    // 计算奖金和盈利
    calYK(data) {

      this.zhu = data.length
      this.money = this.zhu * 2
      if (data.length == 0) {
        this.jjRegion = [0, 0]
        this.ylRegion = [0, 0]
        if (this.quick3TypeActive !== '6' && this.quick3TypeActive !== '7') {
          this.isEmpty = false
        }
        this.openRegModal = false
        return
      } else {
        this.isEmpty = true
        this.openRegModal = true
      }

      // 找出奖金最小和奖金最大数组排序
      data = data.sort(this.sortReverNumber('jj'))
      if (data.length == 1) {
        var jj = Number(data[0]['jj'])
        this.jjRegion = [0, jj]
        var yl = jj - 2
        this.ylRegion = [0, yl]
      } else {
        var start = Number(data[0]['jj'])
        var end = Number(data[data.length - 1]['jj'])
        if (this.quick3TypeActive == '2' && data.length >= 2) {
          var th = 0
          var normal = 0
          var hasVal = false
          for (var x in data) {
            if (data[x].num == '111222333444555666') {
              hasVal = true
              th = data[x].jj
            } else {
              normal = data[x].jj
            }
          }
          if (hasVal) {
            end = parseInt(th) + parseInt(normal)
          }

        }
        if (this.quick3TypeActive == '3') {

          var hasTh = false
          var normal = 0
          var th = 0
          for (var x in data) {
            if (data[x].num.toString().length == 2) {
              var hasVal = false
              for (var y in this.Quickform.t2.dm) {
                if (this.Quickform.t2.dm[y].toString() == data[x].num.toString()) {
                  hasVal = true
                  th = data[x].jj
                }
              }
            } else {
              normal = data[x].jj
            }
          }
          if (hasVal) {
            end = parseInt(th) + parseInt(normal)
          }
        }
        if (this.quick3TypeActive == '5' && data.length >= 3) {
          var end = Number(data[data.length - 1]['jj']) * 3
        }
        if (this.quick3TypeActive == '7' && data.length >= 2) {
          var end = Number(data[data.length - 1]['jj']) * 2
        }
        if (this.quick3TypeActive == '4') {

          var lh = ''
          for (var x in data) {
            if (data[x].num == '123234345456') {
              lh = data[x]
            }
          }
          // 存在连号
          if (lh) {
            // 判断号码 是否存在
            var hasLh = false
            for (var x in data) {
              if (data[x].num !== '123234345456') {

                if (lh.num.indexOf(data[x].num) >= 0) {
                  if (data.length == 21) {
                    start = data[x].jj
                  }
                  hasLh = true
                }
              }
            }
            if (hasLh) {
              end += 10
            }
          }
        }
        if (start == end) {
          this.jjRegion = [0, end]
        } else {
          this.jjRegion = [start, end]
        }

        var yls = start - data.length * 2
        var yle = end - data.length * 2

        if (yls == yle) {
          this.ylRegion = [0, yle]
        } else {
          if (yle < yls) {
            this.ylRegion = [yle, yls]
          } else {
            this.ylRegion = [yls, yle]
          }
        }

      }
    },

    // 清空选择的数据
    emptyData() {

      if (this.quick3TypeActive == '1') {
        this.Quickform.hz.hm = []
        this.rectCheckedBtn(this.hezhiData)
      } else if (this.quick3TypeActive == '2') {
        this.Quickform.t3.hm = []
        this.rectCheckedBtn(this.santonghaoData)
      } else if (this.quick3TypeActive == '3') {
        this.Quickform.t2.hm = []
        this.rectCheckedBtn(this.t21)
        this.rectCheckedBtn(this.t1)
        this.rectCheckedBtn(this.t2)
      } else if (this.quick3TypeActive == '4') {
        this.Quickform.rt3.hm = []
        this.rectCheckedBtn(this.rt3)
      } else if (this.quick3TypeActive == '5') {
        this.Quickform.rt2.hm = []
        this.rectCheckedBtn(this.rt2)
      } else if (this.quick3TypeActive == '6') {
        this.Quickform.dt3.hm = []
        this.rectCheckedBtn(this.dt3)
        this.rectCheckedBtn(this.dt31)
      } else if (this.quick3TypeActive == '7') {
        this.Quickform.dt2.hm = []
        this.rectCheckedBtn(this.dt2)
        this.rectCheckedBtn(this.dt21)
      }
      this.calYK([])

    },
    // 重置激活元素
    rectCheckedBtn(data) {
      for (var x in data) {
        data[x].checked = false
      }
    },
    // 从小到大
    sortReverNumber(index) {
      return function(a, b) {
        if (parseInt(a[index]) - parseInt(b[index]) < 0) {
          return -1
        } else {
          return 1
        }
      }
    },
    jxEvent() {
      if (this.isJx) {
        this.isJx = false
      } else {
        this.isJx = true
      }
    },
    xzEvent(num) {
      var data = this.judgeType()
      var type = data.type
      var temp = {
        num: num,
        type: type
      }
      this.$router.push({ 'path': `/bets${this.Id}`, 'query': { 'jx': temp } })
    },
    judgeType() {
      var pool = {}
      if (this.quick3TypeActive == '1') {
        pool = { type: '和值' }
      } else if (this.quick3TypeActive == '2') {
        pool = { type: '三同号' }
      } else if (this.quick3TypeActive == '3') {
        pool = { type: '二同号单选' }
      } else if (this.quick3TypeActive == '4') {
        pool = { type: '三不同号' }
      } else if (this.quick3TypeActive == '5') {
        pool = { type: '二不同号' }
      } else if (this.quick3TypeActive == '6') {
        pool = { type: '三个不同号胆拖' }
      } else if (this.quick3TypeActive == '7') {
        pool = { type: '二个不同号胆拖' }
      }
      return pool
    },
    goTrendZs() {
      this.$router.push({ 'path': `/trend${this.Id}`, 'query': { 'active': this.quick3TypeActive, 'tab': 1 } })
    },
    goTrendKj() {
      this.$router.push({ 'path': `/trend${this.Id}`, 'query': { 'active': this.quick3TypeActive, 'tab': 0 } })
    },
    contentTouchstart(e) {
      this.fadeLeaveActiveEnter = true;
      this.contentBoxTouchStart = e.touches[0].clientY;
      this.contentBoxTouchMove = this.contentBoxTouchTop;
    },
    contentTouchmove(e) {
      if ((e.touches[0].clientY - this.contentBoxTouchStart) > 0 && (e.touches[0].clientY - this.contentBoxTouchStart) < (546 / (375 / window.innerWidth) / 2 + (60 / (375 / window.innerWidth)) / 2)) {
        this.contentBoxTouchTop = Number(this.contentBoxTouchMove) + Number(e.touches[0].clientY - this.contentBoxTouchStart);
        // this.contentBoxTouchTop = this.contentBoxTouchMove;
      } else if (this.contentBoxTouchTop > 0) {
        // this.contentBoxTouchTop = Number(this.contentBoxTouchMove) - Number(e.touches[0].clientY - this.contentBoxTouchStart);
        this.contentBoxTouchTop = Number(this.contentBoxTouchMove) + Number(e.touches[0].clientY - this.contentBoxTouchStart);
        e.preventDefault();
      }
    },
    contentTouchend(e) {
      var target = this.$refs.contentBoxTouch
      if (this.contentBoxTouchTop > 0 && this.contentBoxTouchTop < (546 / (375 / window.innerWidth) / 8)) {
        this.contentBoxTouchTop = 0;
      } else if ((this.contentBoxTouchTop > (546 / (375 / window.innerWidth) / 8) && this.contentBoxTouchTop < (546 / (375 / window.innerWidth) / 4)) || (this.contentBoxTouchTop > (546 / (375 / window.innerWidth) / 4) && this.contentBoxTouchTop < ((546 / (375 / window.innerWidth) / 4) + (546 / (375 / window.innerWidth) / 8)))) {
        this.contentBoxTouchTop = (546 / (375 / window.innerWidth) / 4);
        this.contentBoxTouchMove = this.contentBoxTouchTop;
      } else if ((this.contentBoxTouchTop > ((546 / (375 / window.innerWidth) / 4) + (546 / (375 / window.innerWidth) / 8)) && this.contentBoxTouchTop < (546 / (375 / window.innerWidth) / 2)) || (this.contentBoxTouchTop > (546 / (375 / window.innerWidth) / 2))) {
        this.contentBoxTouchTop = (546 / (375 / window.innerWidth) / 2);
        this.contentBoxTouchMove = this.contentBoxTouchTop;
      }
    }
  },
  created() {
    this.Id = this.$route.params.Id;
    let name = this.$route.query.name;
    this.name = name;
    this.initda();
    this.initdata();
    this.createDxds()
  },


  watch: {
    contentBoxTouchTop(curVal, oldVal) {
      if (curVal < 0) {
        this.contentBoxTouchMove = 0;
        this.contentBoxTouchTop = 0;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timeFun)
    this.timeFun = Object
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
    let centerKey = window.localStorage.getItem('quick3TypeActive') || this.publicInfo.quickThreeData.centerKey;

    if (this.quick3TypeActive == '6' || this.quick3TypeActive == '7') {
      this.isEmpty = true
    }


    if (this.$route.hasOwnProperty('query')) {
      if (this.$route.query.hasOwnProperty('forBack')) {
        this.forBack = this.$route.query.forBack
        // console.log(this.forBack)
      }
    }



  },
  deactivated() {
    this.$destroy()
  }
}

</script>
<style lang="less">
/* 开始过渡阶段,动画出去阶段 */
.fade-enter-active,
.fade-leave-active,
.fade-leave-active-half {
  transition: all 0.5s ease-out;
}

/* 进入开始 */
.fade-enter {
  transform: translateY(-1px);
}

.fade-enter-active {
  transform: translateY(0);
}

/* 出去终点 */
.fade-leave-active-half {
  transform: translateY(270px);
}

.fade-leave-active {
  transform: translateY(540px);
}

.quickThreeBox .contentBox {
  .btn-list {
    background: rgba(0, 0, 0, .2);
    border: 1px solid #67b799;
    color: #fff;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }

  li.active {
    .btn-list {
      border-color: #f0c930;
      color: #f0c930;
    }
  }

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 94px;
  box-sizing: border-box;
  z-index: 1;
  overflow: auto;

  .contentBox-main {
    background: url(../../../assets/img/bj.png);
    width: 100%;
    height: 100%;

    .openBut {
      position: relative;

      img.sz {
        width: 30px;
        height: 30px;
      }

      img.kaijiangbtn {
        position: absolute;
        display: block;
        top: 17px;
        left: 290px;
        width: 28px !important;
        height: 18px !important;
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        transition: transform .5s;

        &.kaijiangbtn-inverse {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          transition: transform .5s;
        }
      }
    }
  }

  .quick3-history {
    width: 100%;
    height: 546px;
    position: absolute;
    z-index: 7;

    .quick3-history-more {
      line-height: 30px;
      color: #fff;
      text-align: center;
      margin-top: 10px;
    }

    .quick3-history-th,
    .quick3-history-tr {
      li {
        float: left;
        color: #a6bca7;
        line-height: 57px;
        font-size: 24px;
        border-bottom: 1px solid #15330f;

        p {
          text-indent: 0;
        }

        img {
          display: block;
          float: left;
          width: 30px;
          margin: 10px 12px 0 0;

          &:nth-child(1) {
            margin-left: 80px;
          }
        }

        &:nth-child(1) {
          width: 172px;
          text-align: center;
        }

        &:nth-child(2) {
          width: 290px;
          text-indent: 125px;
        }

        &:nth-child(3) {
          font-size: 26px;
          width: 95px;
          text-align: center;
        }

        &:nth-child(4) {
          font-size: 26px;
          width: 95px;
          text-align: center;
        }

        &:nth-child(5) {
          font-size: 26px;
          width: 95px;
          text-align: center;
        }
      }
    }

    .quick3-history-th-new,
    .quick3-history-tr-new {
      li {
        float: left;
        color: #a6bca7;
        line-height: 57px;
        font-size: 24px;
        border-bottom: 1px solid #15330f;

        p {
          text-indent: 0;
        }

        img {
          display: block;
          float: left;
          width: 30px;
          margin: 10px 12px 0 0;

          &:nth-child(1) {
            margin-left: 80px;
          }
        }

        &:nth-child(1) {
          width: 3.2rem;
          text-align: center;
        }

        &:nth-child(2) {
          width: 4.5rem;
          text-indent: 125px;
        }

        &:nth-child(3) {
          font-size: 26px;
          width: 2rem;
          text-align: center;
        }

        &:nth-child(4) {
          font-size: 26px;
          width: 95px;
          text-align: center;
        }

        &:nth-child(5) {
          font-size: 26px;
          width: 95px;
          text-align: center;
        }
      }
    }

    .quick3-history-tr,
    .quick3-history-tr-new {
      li {
        line-height: 48px;
        border: none;

        &:nth-child(1) {
          background: url(../../../assets/img/list.png) no-repeat right center;
          background-size: 10px;
        }
      }
    }
  }

  .select-main {
    background: url(../../../assets/img/bj.png);
    padding-top: 66px;
    height: calc(~'100% - 380px');
    position: relative;
    overflow: auto;
    z-index: 8;

    .btn-select {
      position: absolute;
      width: 226px;
      height: 68px;
      background: url(../../../assets/img/rec1.png) no-repeat center;
      background-size: 100%;
      top: 22px;
      left: 0;

      img {
        display: block;
        float: left;
        width: 55px;
      }

      p {
        float: left;
        font-size: 28px;
        color: #fff;
        line-height: 68px;
        margin-left: 6px;
      }
    }

    h2 {
      font-size: 28px;
      color: #fff;
      line-height: 28px;
      text-align: center;
      margin-bottom: 22px;
      font-weight: normal;
    }

    .btn-hezhi-main {
      li {
        float: left;
        width: 20%;
        margin: 0 0 0 4%;
      }

      &.btn-santonghao-main li {
        width: 28%;
      }

      &.btn-ertonghao-main li {
        width: 12.8%;
        margin: 0 0 0 3%;

        .btn-hezhi-list {
          height: auto;
        }
      }

      .btn-hezhi-list {
        width: 100%;
        height: 88px;

        p {
          font-size: 38px;
          font-weight: bold;
          line-height: 54px;
          text-align: center;
        }

        span {
          display: block;
          font-size: 24px;
          line-height: 24px;
          text-align: center;
        }

        &.btn-sanlianhao-list {
          height: 66px;

          p {
            line-height: 66px;
          }
        }

        &.active {
          border-color: #f0c930;
          color: #f0c930;
        }
      }

      .hezhi-leave {
        font-size: 28px;
        color: #67b799;
        line-height: 70px;
        text-align: center;
      }
    }

    .btn-hezhi-fast {
      ul {
        width: 92%;
        margin: 0 auto;
        border-top: 1px solid #67b799;
        border-right: 1px solid #67b799;
        border-bottom: 1px solid #67b799;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;

        li {
          background: rgba(0, 0, 0, .2);
          float: left;
          width: 25%;
          box-sizing: border-box;
          height: 70px;
          line-height: 70px;
          font-weight: bold;
          font-size: 38px;
          color: #fff;
          text-align: center;
          border-left: 1px solid #67b799;

          &.active {
            border-color: #f0c930;
            color: #f0c930;
          }
        }
      }
    }

    .ertonghao-title {
      width: 100%;
      height: 50px;
      background-size: auto 50px;
      background-position: left 10px;
      background-repeat: no-repeat;
      margin: 0 0 20px;
      padding-top: 10px;
      font-size: 24px;
      line-height: 50px;
      color: #a4bc60;
      text-indent: 110px;

      &.ertonghao-title-fourFont {
        text-indent: 135px;
      }

      &.ertonghao-title-threeFont {
        text-indent: 110px;
      }

      &.ertonghao-none-fourFont {
        text-indent: 4%;
      }
    }

    .why-dantuo {
      display: block;
      text-indent: 4%;
      font-size: 24px;
      line-height: 24px;
      color: #aee7a0;
    }
  }
}

.kuai3-footer {
  width: 100%;
  height: 128px;
  background: url(../../../assets/img/k3_bottom_bg2.png) no-repeat top center;
  background-size: 100%;
  position: absolute;
  bottom: 0;
  z-index: 2;

  .kuai3-left-btn,
  .kuai3-confirm-btn {
    width: 115px;
    height: 65px;
    position: absolute;
    top: 30px;
    left: 30px;
    background: #37393b;
    color: #fff;
    font-size: 32px;
    line-height: 65px;
    text-align: center;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    font-weight: bold;
  }

  .kuai3-left-btn {
    color: #ffba00;

    &.empty {
      color: #bfbfbf;
    }

  }

  .kuai3-confirm-btn {
    left: auto;
    right: 30px;
    background: #ffba00;
    color: #000;
  }

  h6 {
    font-size: 32px;
    color: #fff;
    text-align: center;
    line-height: 128px;

    span {
      color: #ffba00;
    }
  }


}

.kuai3-footer-hint {
  width: 100%;
  height: 60px;
  position: absolute;
  font-size: 26px;
  color: #fff;
  line-height: 60px;
  bottom: 68px;
  background: #13432a;
  z-index: 1;
  transition: all 0.5s;

  &.active {
    bottom: 128px;
  }

  img {
    display: block;
    width: 14px;
    height: 14px;
    float: left;
    margin: 22px 15px 0 20px;
  }
}

.right-dialog-main {
  width: 120px;
  background-color: #fff;
  padding: 0 20px;
  position: absolute;
  top: 80px;
  right: 26px;
  z-index: 2;

  .triangle_border_up {
    width: 0;
    height: 0;
    border-width: 0 13px 15px;
    border-style: solid;
    border-color: transparent transparent #fff;
    /*透明 透明  灰*/
    position: absolute;
    top: -15px;
    right: 10px;
  }

  li {
    line-height: 86px;
    font-size: 26px;
    color: #000000;
    text-align: center;
    border-bottom: 2px solid #f4f4f4;
  }
}

.select-quick3-type {
  width: 100%;
  height: 575px;
  position: absolute;
  top: 94px;
  background: url(../../../assets/img/quick3-type-bg.png);
  z-index: 2;
  border-bottom: 4px solid #15330f;

  h3 {
    width: 92%;
    height: 30px;
    font-weight: normal;
    margin: 0 auto 28px;
    position: relative;
    border-bottom: 1px solid #6f907f;

    &:first-child {
      height: 40px;
    }

    p {
      font-size: 32px;
      color: #fff;
      width: 120px;
      line-height: 40px;
      background: url(../../../assets/img/quick3-type-bg.png);
      position: absolute;
      left: 50%;
      margin-left: -60px;
      bottom: -20px;
      text-align: center;
    }
  }

  .select-quick3-type-list {
    display: flex;
    flex-wrap: wrap;

    li {
      float: left;
      width: 28%;
      margin: 10px 0 10px 4%;
      background: rgba(77, 137, 92, .5);
      background-size: 100% 100%;
      border: 4px solid #6f9d84;
      box-sizing: border-box;
      -webkit-border-radius: 14px;
      -moz-border-radius: 14px;
      border-radius: 14px;

      &.select-quick3-type-active {
        border-color: #e9ca52;
        background: rgba(0, 0, 0, .2);
      }

      p {
        font-size: 34px;
        color: #fff;
        line-height: 58px;
        text-align: center;
      }

      span {
        display: block;
        font-size: 22px;
        line-height: 26px;
        color: #aed3ba;
        text-align: center;
      }

      .quick3-type-dice-box {
        padding: 10px 0 13px;
        font-size: 34px;

        img {
          display: block;
          float: left;
          width: 36px;
          height: 36px;

          &:first-child {
            margin-left: 26px;
          }

          &.two-differ-img {
            margin-left: 55px;
          }
        }

        p {
          float: left;
          line-height: 34px;
          font-weight: bold;
        }
      }
    }
  }
}

.quickThreeBox .contentBox .topFlexbox .vux-flexbox-item:nth-child(1) {
  text-align: center;
  color: #fff;
  background-clip: padding-box;
  border-right: 1px solid rgba(15, 65, 42, 1);
  border-bottom: 4px solid rgba(15, 65, 42, 1);
  height: 120px;
  overflow: hidden;
}

.quickThreeBox .contentBox .topFlexbox .vux-flexbox-item:nth-child(2) {
  text-align: center;
  color: #fff;
  background-clip: padding-box;
  border-left: 1px solid rgba(15, 65, 42, 1);
  border-bottom: 4px solid rgba(15, 65, 42, 1);
  height: 120px;
  position: relative;
}

.quickThreeBox .contentBox .topFlexbox .vux-flexbox-item .flex-demo p {
  font-size: 32px;
  line-height: 32px;
  margin: 14px 0 10px;
}

.quickThreeBox .contentBox .topFlexbox .vux-flexbox-item .flex-demo div {
  line-height: 100%;
}

.quickThreeBox .contentBox .topFlexbox .vux-flexbox-item .flex-demo div img {
  width: 45px;
  height: 45px;
  margin: 8px 10px;
}

.quickThreeBox .contentBox .topFlexbox .vux-flexbox-item .flex-demo div span {
  font-size: 44px;
  line-height: 120%
}

.progress {
  position: absolute;
  left: 0px;
  bottom: -4px;
  height: 4px;
  width: 100%;
  background: linear-gradient(45deg, #353573, #3fcae8);
  transition: all 0.5s
}

.packet-popup {
  position: absolute;
  left: 50px;
  top: -240px;

  ul {
    background-color: #fff;
    padding: 0px 20px 0px 10px;
  }

  li {
    padding: 5px 0px;
    border-bottom: 1px solid #ddd;

    span {
      display: inline-block;
      font-size: 30px;
    }
  }

  .text {
    width: 72px;
    text-align: right;
  }

  .packet {
    display: inline-block;
    width: 74px;
    height: 70px;
    line-height: 95px;
    text-align: center;
    background: url("../../../assets/img/moneyPacket.jpg") no-repeat;
    background-size: 100% 100%;
    font-size: 26px;
    font-weight: bold;
    color: #fff;
  }

  .zhijiao {
    width: 0px;
    height: 0px;
    border-color: transparent white;
    border-width: 0px 0px 25px 25px;
    border-style: solid;
    margin-top: -2px;
  }
}

</style>
