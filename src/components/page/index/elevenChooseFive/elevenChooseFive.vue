<template>
  <div class="elevenChooseFiveBox">
    <game-page-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore" v-on:clickCenter="clickCenter"></game-page-header>
    <!-- 头部右侧弹层 -->
    <div class="headerRightBox" v-show="showRightAlert">
      <ul>
        <li v-for="(item0,key0) in rightAssistantData" :key="key0" @click="clickRightAssistant(item0.link)">{{item0.name}}</li>
      </ul>
    </div>
    <!-- 玩法选择 -->
    <div class="playMethodBox" v-show="operation.centerAlertShow">
      <p class="playMethodTitleBox">
        <b></b>
        <span>普通</span>
        <b></b>
      </p>
      <div class="playMethodContentBox">
        <span :class="item1.id==operation.centerContentKey?'active':''" v-for="(item1,key1) in operation.centerContent" :key="key1" v-if="item1.type!='dragOn'" @click="clickPlayMethod(item1)">{{item1.choiceName}}</span>
      </div>
      <p class="playMethodTitleBox">
        <b></b>
        <span>胆拖</span>
        <b></b>
      </p>
      <div class="playMethodContentBox">
        <span :class="item2.id==operation.centerContentKey?'active':''" v-for="(item2,key2) in operation.centerContent" :key="key2" v-if="item2.type=='dragOn'" @click="clickPlayMethod(item2)">{{item2.choiceName}}</span>
      </div>
    </div>
    <!-- 主体区域 -->
    <div class="elevenChooseFiveContentBox" @click="clickBody">
      <!-- 顶部倒计时 -->
      <div class="titleBox">
        距 <span class="nowStage" v-html="nowStage"></span> 期截至: <span class="remainingTimeShow" v-html="remainingTimeShow"></span>
      </div>
      <!-- 开奖历史 -->
      <div class="lotteryHistoryBox" @click="goTrendPage">
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th></th>
              <th>01</th>
              <th>02</th>
              <th>03</th>
              <th>04</th>
              <th>05</th>
              <th>06</th>
              <th>07</th>
              <th>08</th>
              <th>09</th>
              <th>10</th>
              <th>11</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item6,key6) in historyList" :key="key6">
              <td><span class="tableLeft">{{item6.issue.substr(-2)}}期</span></td>
              <td v-for="(item7,key7) in numberArr" :key="key7"><span :class="'tableNum '+[item6.lotteryNumber.split('-').indexOf(item7)==-1?'':'active']">{{item7}}</span></td>
            </tr>
          </tbody>
        </table>
        <p class="lookMore" v-show="showLookMore">点击以上走势图区域可查看更多</p>
      </div>
      <!-- 选号 -->
      <div class="selectionNumberBgBox" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd" ref="selectionNumberBgBox" :style="'min-height:'+(clientHeight-154)+'px;top:'+selectionNumberBgBoxTopNum+'px'">
        <div class="DropDownArrow"><img @click="clickDropDownArrow" src="../../../../assets/img/ElevenChooseFive/DropDownArrow.png" alt=""></div>
          <div class="selectionNumberBox" v-show="operation.centerContentKey==item3.id" v-for="(item3,key3) in operation.centerContent" :key="key3">
            <div class="topBox">
              <img v-if="item3.type!='dragOn'" @click="ShakeOneShakeMachineSelection" src="../../../../assets/img/ElevenChooseFive/ShakeOneShakeMachineSelection.png" alt="">
              <p v-else-if="item3.type=='dragOn'" @click="goQuestion">什么是胆拖？</p>
            </div>
            <p class="promptText">{{item3.promptText}}<span>{{item3.winningAmount}}</span>元</p>
            <div class="numberBgBox">
              <div class="numberBox" v-if="item4.isShow" v-for="(item4,key4) in item3.selectedArr" :key="key4">
                <div class="leftBox">
                  <img :src="item4.img" alt="" :style="'margin-bottom:'+[item3.type=='dragOn'?48:24]+'px'">
                  <img src="../../../../assets/img/ElevenChooseFive/Omission.png" alt="">
                </div>
                  <div class="rightBox">
                    <p class="rightBoxText" v-if="item3.type=='dragOn'&&key4==0"><span>我认为必出的号码</span><span>至少选1个，最多{{item3.choiceNum-1}}个</span></p>
                    <p class="rightBoxText" v-if="item3.type=='dragOn'&&key4==1">我认为可能出的号码</p>
                    <p class="everyNumberBox" v-for="(item5,key5) in numberArr" :key="key5">
                      <span class="number" v-show="nowPlayMethod.selectedArr[key4].selectedNumber.indexOf(item5)==-1" @click="selectionNumber(item5,key4,true)">{{item5}}</span>
                      <span class="number active" v-show="nowPlayMethod.selectedArr[key4].selectedNumber.indexOf(item5)!=-1" @click="selectionNumber(item5,key4,false)">{{item5}}</span>
                      <br>
                      <span class="omission">{{omissionArr[key5]?omissionArr[key5]:'--'}}</span>
                    </p>
                    <div class="allElection" @click="clickAllElection(key4)" v-if="item4.showAllElection">全选</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="profitInfoBox" v-show="profitInfoKey">{{profitInfo}}</div>
        <!-- 底部区域 -->
        <footer>
          <span class="footerLeftBox" :style="'color:'+[footerLeftText=='清空'?'#fff':'#FFBA00']" @click="clickFooterLeftBox()">{{footerLeftText}}</span>
          <span class="footerRightBox"  @click="clickFooterRightBox">确定</span>
          <p v-show="nowPlayMethod.totalNum>0">共 <span v-html="totalNum"></span> 注：<span class="money"> <span v-html="totalPrice"></span> 元</span></p>
        </footer>
        <!-- 底部机选弹框 -->
        <div class="footerAlertBox" v-show="showFooterAlert">
          <ul>
            <li v-for="(item10,key10) in footerAlertBoxData" :key="key10" @click="clickFooterAlertBox(item10.num)">
              <div class="imgBox">
                {{item10.num}}
              </div>
              {{item10.name}}
            </li>
          </ul>
          <b></b>
        </div>
        <!-- 信息提示框 -->
        <div class="toastBox">
          <toast v-model="toastBox.show" type="text" :time="toastBox.time" :text="toastBox.text" :position="toastBox.position"></toast>
        </div>
      </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Toast } from 'vux'
import GamePageHeader from '../../../common/gamePageHeader.vue'
export default {
  components: { GamePageHeader, Toast },
  data() {
    return {
      operation: { //头部组件状态管理
        backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerAlertShow: false, //中间弹层是否显示
        centerContent: [ //详细备注请参考nowPlayMethodDemo
          { id: 1, name: '任选二', choiceName: '任选二', choiceNum: '2', type: 'ordinary', promptText: '至少选2个号码，猜对任意2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 6, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 2, name: '任选三', choiceName: '任选三', choiceNum: '3', type: 'ordinary', promptText: '至少选3个号码，猜对任意3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 19, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 3, name: '任选四', choiceName: '任选四', choiceNum: '4', type: 'ordinary', promptText: '至少选4个号码，猜对任意4个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 78, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 4, name: '任选五', choiceName: '任选五', choiceNum: '5', type: 'ordinary', promptText: '至少选5个号码，猜对全部5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 540, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 5, name: '任选六', choiceName: '任选六', choiceNum: '6', type: 'ordinary', promptText: '至少选6个号码，选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 90, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 6, name: '任选七', choiceName: '任选七', choiceNum: '7', type: 'ordinary', promptText: '至少选7个号码，选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 26, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 7, name: '任选八', choiceName: '任选八', choiceNum: '8', type: 'ordinary', promptText: '至少选8个号码，选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 9, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 8, name: '前一', choiceName: '前一', choiceNum: '1', type: 'ordinary', promptText: '至少选1个号码，猜对第1个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 13, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 9, name: '前二直选', choiceName: '前二直选', choiceNum: '2', type: 'previousTwo', promptText: '每位至少选1个号码，按位猜对前2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 130, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/TenThousandPosition.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/ThousandBit.png', selectedNumber: [], omissionArr: [] }] },
          { id: 10, name: '前二组选', choiceName: '前二组选', choiceNum: '2', type: 'ordinary', promptText: '至少选2个号码，猜对前2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 65, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 11, name: '前三直选', choiceName: '前三直选', choiceNum: '3', type: 'previousThree', promptText: '每位至少选1个号码，按位猜对前3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 1170, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/TenThousandPosition.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/ThousandBit.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/HundredBit.png', selectedNumber: [], omissionArr: [] }] },
          { id: 12, name: '前三组选', choiceName: '前三组选', choiceNum: '3', type: 'ordinary', promptText: '至少选3个号码，猜对前3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 195, selectedArr: [{ isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 13, name: '任选二胆拖', choiceName: '任选二', choiceNum: '2', type: 'dragOn', promptText: '猜对任意2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 6, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 14, name: '任选三胆拖', choiceName: '任选三', choiceNum: '3', type: 'dragOn', promptText: '猜对任意3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 19, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 15, name: '任选四胆拖', choiceName: '任选四', choiceNum: '4', type: 'dragOn', promptText: '猜对任意4个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 78, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 16, name: '任选五胆拖', choiceName: '任选五', choiceNum: '5', type: 'dragOn', promptText: '猜对全部5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 540, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 17, name: '任选六胆拖', choiceName: '任选六', choiceNum: '6', type: 'dragOn', promptText: '选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 90, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 18, name: '任选七胆拖', choiceName: '任选七', choiceNum: '7', type: 'dragOn', promptText: '选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 26, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 19, name: '任选八胆拖', choiceName: '任选八', choiceNum: '8', type: 'dragOn', promptText: '选号包含5个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 9, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 20, name: '前二组选胆拖', choiceName: '前二组选', choiceNum: '2', type: 'dragOn', promptText: '猜对前2个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 65, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/BoldCode.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/TowingCode.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] },
          { id: 21, name: '前三组选胆拖', choiceName: '前三组选', choiceNum: '3', type: 'dragOn', promptText: '猜对前3个开奖号即中', profitInfo: '', totalNum: 0, totalPrice: 0, profitInfoKey: false, winningAmount: 195, selectedArr: [{ isShow: true, showAllElection: false, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: true, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }, { isShow: false, showAllElection: true, img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', selectedNumber: [], omissionArr: [] }] }
        ], //中间区域内容name，及玩法选择内容choiceName
        centerContentKey: window.localStorage.getItem('centerContentKey') || 1, //中间区域选中的值的id
        rightShow: false, //右侧区域是否显示
        rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: '助手', //要在右侧显示的内容
        rightContentClass: '', //右侧内容样式类名
      },
      nowGameType: 'jl11vv5', //当前彩种
      rightAssistantData: [{ name: '走势图', link: '' }, { name: '近期开奖', link: '' }, { name: '号码统计', link: '' }, { name: '玩法说明', link: '' }], //右侧弹层数据
      footerAlertBoxData: [{ name: '1注', num: 1 }, { name: '5注', num: 5 }, { name: '10注', num: 10 }], //底部机选数据
      showLeftAlert: false, //是否显示左侧弹层
      showRightAlert: false, //是否显示右侧弹层
      showFooterAlert: false, //是否显示底部弹层
      clientHeight: 0, //屏幕高度
      nowPlayMethodDemo: {
        id: 1, //自定义ID
        name: '任选二', //玩法名称，用于页面头部切换玩法处显示
        choiceName: '任选二', //玩法名称，用于页面头部切换玩法处内部显示
        choiceNum: '2', //当前玩法组合基数，用于计算已选号码组合注数
        type: 'ordinary', //类型，ordinary：普通玩法，dragOn：胆拖，previousTwo：前二直选，previousThree：前三直选
        promptText: '至少选2个号码，猜对任意2个开奖号即中', //说明文字
        profitInfo: '', //盈亏信息
        totalNum: 0, //总注数
        totalPrice: 0, //总金额
        profitInfoKey: false, //是否显示盈利信息
        winningAmount: 6, //奖金
        selectedArr: [{ //选号区域，普通区域/胆码区域/万位
          isShow: true, //是否显示该区域
          showAllElection: true, //是否显示全选按钮
          img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png', //号码前面图片
          selectedNumber: [], //已选中的号码
          omissionArr: [], //遗漏数据数组
        }, { //选号区域，拖码区域/千位
          isShow: false,
          showAllElection: true,
          img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png',
          selectedNumber: [],
          omissionArr: []
        }, { //选号区域，百位
          isShow: false,
          showAllElection: true,
          img: 'src/assets/img/ElevenChooseFive/SelectionNumber.png',
          selectedNumber: [],
          omissionArr: []
        }]
      }, //当前选择玩法demo
      nowStage: '', //当前期号
      remainingTimeShow: '00:00', //当前期剩余时间
      deadlineTime: '', //服务器当前期截至时间
      remainingTime: '', //服务器返回的剩余时间
      numberArr: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'], //号码数组
      toastBox: { //信息提示框
        show: false,
        position: 'middle',
        time: 800,
        text: ''
      },
      orderDataArr: JSON.parse(window.localStorage.getItem("orderDataArr")) || [], //订单数组
      selectionNumberBgBoxTopNum: 44, //选号盒子距离顶部距离
      deltaY: 0, //Y轴位移
      newTouch: {}, //初始数据
      historyList: [], //历史开奖列表
      historyListData: [
        [],
        []
      ], //历史开奖列表数据
      timer: null, //倒计时
      omissionArr: [], //遗漏数据数组
      showLookMore: false, //是否显示点击查看更多的文字
    }
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
    nowPlayMethod: function() {
      let obj = this.operation.centerContent[(this.operation.centerContentKey - 1)];
      return obj
    },
    profitInfo: function() { //盈亏信息
      return this.nowPlayMethod.profitInfo;
    },
    totalNum: function() { //总注数
      return this.nowPlayMethod.totalNum;
    },
    totalPrice: function() { //总金额
      return this.nowPlayMethod.totalPrice;
    },
    profitInfoKey: function() { //是否显示盈利信息
      return this.nowPlayMethod.profitInfoKey;
    },
    footerLeftText: function() { //底部左侧文字
      if (this.nowPlayMethod.type == "dragOn") {
        return "清空"
      } else {
        if (this.nowPlayMethod.totalNum > 0) {
          return "清空"
        } else {
          return "机选"
        }
      }
    },
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 头部点击返回事件处理
    clickBack(value) {
      // console.log('点击了返回按钮');
      this.operation.centerAlertShow = false;
      this.showRightAlert = false;
      this.showFooterAlert = false;
      let orderDataArr = JSON.parse(window.localStorage.getItem("orderDataArr"))
      if (orderDataArr.length != 0) {
        this.$router.push({ path: '/page/index/elevenChooseFive/bettingPage' + localStorage.getItem('Id') })
      } else {
        this.$router.push({ path: this.publicInfo.operationPageLink.normalArr[this.publicInfo.operationPageLink.normalArr.length - 2] })
      }
    },
    // 头部点击更多事件处理
    clickMore(value) {
      // console.log('点击了更多按钮');
      this.operation.centerAlertShow = false;
      this.showLeftAlert = false;
      this.showFooterAlert = false;
      this.showRightAlert = !this.showRightAlert;
    },
    // 头部点击中间事件处理
    clickCenter(value) {
      // console.log('点击了中间');
      this.showLeftAlert = false;
      this.showRightAlert = false;
      this.showFooterAlert = false;
      this.operation.centerAlertShow = !this.operation.centerAlertShow;
    },
    // 点击玩法选择切换玩法
    clickPlayMethod(item) {
      this.operation.centerContentKey = item.id;
      window.localStorage.setItem('centerContentKey', item.id);
      this.operation.centerAlertShow = false;
      this.selectionNumberBgBoxTopNum = 44;
    },
    // 点击头部右侧助手
    clickRightAssistant(link) {
      this.showRightAlert = false;
      if (link == '') {
        return false;
      }
      this.$router.push({ path: link + localStorage.getItem('Id') })
    },
    touchStart(e) {
      const touch = e.touches[0];
      // console.log(touch, '---this is touch');
      this.newTouch.startX = touch.pageX;
      this.newTouch.startY = touch.pageY;
      // console.log(this.newTouch, "---这是开始前参数")
    },
    touchMove(e) {
      // console.log("move");
      const touch = e.touches[0];
      //横向和纵向偏离位置
      let deltaY = touch.pageY - this.newTouch.startY;
      // console.log(deltaY, this.selectionNumberBgBoxTopNum, "---y轴偏移量")
      this.deltaY = deltaY;
      if (this.selectionNumberBgBoxTopNum >= 352 && deltaY > 56) {
        deltaY = 56;
      }
      this.$refs.selectionNumberBgBox.style["transform"] = 'translateY(' + deltaY + 'px)';
      this.$refs.selectionNumberBgBox.style["transitionDuration"] = 10;
    },
    touchEnd(e) {
      if (Math.abs(this.deltaY) < 50) {
        this.selectionNumberBgBoxTopNum = this.selectionNumberBgBoxTopNum;
      } else {
        if (this.selectionNumberBgBoxTopNum <= 44) {
          this.selectionNumberBgBoxTopNum = 44;
          this.showLookMore = false;
        }
        if (this.selectionNumberBgBoxTopNum == 44) {
          if (this.deltaY > 0) {
            this.selectionNumberBgBoxTopNum = 212;
            this.historyList = this.historyListData[0]
          } else {
            this.selectionNumberBgBoxTopNum = 44;
          }
          this.showLookMore = false;
        } else if (this.selectionNumberBgBoxTopNum == 212) {
          if (this.deltaY > 0) {
            this.selectionNumberBgBoxTopNum = 352;
            this.historyList = this.historyListData[1];
            this.showLookMore = true;
          } else {
            this.selectionNumberBgBoxTopNum = 44;
            this.historyList = this.historyListData[0];
            this.showLookMore = false;
          }
        } else if (this.selectionNumberBgBoxTopNum == 352) {
          if (this.deltaY > 0) {
            this.selectionNumberBgBoxTopNum = 352;
            this.showLookMore = true;
          } else {
            this.selectionNumberBgBoxTopNum = 212;
            this.historyList = this.historyListData[0];
            this.showLookMore = false;
          }
        }
        if (this.selectionNumberBgBoxTopNum > 352) {
          this.selectionNumberBgBoxTopNum = 352;
        }
      }
      this.$refs.selectionNumberBgBox.style["transform"] = 'translateY(0)';
      this.$refs.selectionNumberBgBox.style["transitionDuration"] = 10
    },
    // 跳转走势图页面
    goTrendPage() {
      this.$router.push({ path: '/page/index/elevenChooseFive/trendPage' + localStorage.getItem('Id') })
    },
    // 点击底部机选
    clickFooterLeftBox() {
      if (this.footerLeftText == "清空") {
        this.nowPlayMethod.selectedArr[0].selectedNumber = [];
        this.nowPlayMethod.selectedArr[1].selectedNumber = [];
        this.nowPlayMethod.selectedArr[2].selectedNumber = [];
        this.nowPlayMethod.profitInfo = '';
        this.nowPlayMethod.profitInfoKey = false;
        this.nowPlayMethod.totalPrice = 0;
        this.nowPlayMethod.totalNum = 0;
        this.operation.centerContent[(Number(this.nowPlayMethod.id) - 1)] = this.nowPlayMethod;
      } else if (this.footerLeftText == "机选") {
        this.showFooterAlert = !this.showFooterAlert;
      }
    },
    // 点击底部确定
    clickFooterRightBox() {
      if (this.nowPlayMethod.totalNum < 1) {
        this.ShakeOneShakeMachineSelection();
        return false;
      }
      let arr = this.nowPlayMethod.selectedArr[0].selectedNumber;
      let brr = this.nowPlayMethod.selectedArr[1].selectedNumber;
      let crr = this.nowPlayMethod.selectedArr[2].selectedNumber;
      let obj = {};
      obj.buyInfo = ''; //内容
      let nowTime = '';
      if (this.nowPlayMethod.type == 'previousTwo') {
        let twoArr = this.previousTwoAlgorithm(arr, brr);
        nowTime = new Date().getTime();
        obj = {};
        obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        obj.num = twoArr.length; //注数
        obj.amount = twoArr.length * 2; //金额
        obj.buyInfo = arr.join(',') + '#' + brr.join(',');
        obj.id = nowTime;
        this.orderDataArr.unshift(obj)
        // for (let i = 0; i < twoArr.length; i++) {
        //   nowTime = new Date().getTime();
        //   obj = {};
        //   obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        //   obj.num = 1; //注数
        //   obj.amount = 2; //金额
        //   obj.buyInfo = twoArr[i].join('#');
        //   obj.id = nowTime + i;
        //   this.orderDataArr.unshift(obj)
        // }
      } else if (this.nowPlayMethod.type == 'previousThree') {
        let threeArr = this.previousThreeAlgorithm(arr, brr, crr);
        nowTime = new Date().getTime();
        obj = {};
        obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        obj.num = threeArr.length; //注数
        obj.amount = threeArr.length * 2; //金额
        obj.id = nowTime;
        obj.buyInfo = arr.join(',') + '#' + brr.join(',') + '#' + crr.join(',');
        this.orderDataArr.unshift(obj)
        // for (let j = 0; j < threeArr.length; j++) {
        //   nowTime = new Date().getTime();
        //   obj = {};
        //   obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        //   obj.num = 1; //注数
        //   obj.amount = 2; //金额
        //   obj.id = nowTime + j;
        //   obj.buyInfo = threeArr[j].join('#')
        //   this.orderDataArr.unshift(obj)
        // }
      } else if (this.nowPlayMethod.type == 'ordinary') {
        nowTime = new Date().getTime();
        obj = {};
        obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        obj.num = this.nowPlayMethod.totalNum; //注数
        obj.amount = this.nowPlayMethod.totalPrice; //金额
        obj.buyInfo = arr.join(',');
        obj.id = nowTime;
        this.orderDataArr.unshift(obj)
      } else if (this.nowPlayMethod.type == 'dragOn') {
        nowTime = new Date().getTime();
        obj = {};
        obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        obj.num = this.nowPlayMethod.totalNum; //注数
        obj.amount = this.nowPlayMethod.totalPrice; //金额
        obj.buyInfo = arr.join(',') + '#' + brr.join(',');
        obj.id = nowTime;
        this.orderDataArr.unshift(obj)
      }
      let queryArr = JSON.stringify(this.orderDataArr);
      window.localStorage.setItem('orderDataArr', queryArr);
      this.$router.push({ path: '/page/index/elevenChooseFive/bettingPage' + localStorage.getItem('Id') })
    },
    // 点击底部机选注数
    clickFooterAlertBox(num) {
      // console.log(num, '---机选注数')
      let selectionArr = [];
      // console.log(this.orderDataArr)
      let nowTime = '';
      for (var i = 0; i < num; i++) {
        nowTime = new Date().getTime();
        selectionArr = this.getRandomArrayElements(this.nowPlayMethod.choiceNum);
        let obj = {};
        obj.code = this.backMethodCode(this.nowPlayMethod.name); //编码
        obj.num = 1; //注数
        obj.amount = 2; //金额
        obj.buyInfo = ''; //内容
        obj.id = nowTime + i;
        if (this.nowPlayMethod.type == 'previousTwo') {
          obj.buyInfo = selectionArr.join('#');
        } else if (this.nowPlayMethod.type == 'previousThree') {
          obj.buyInfo = selectionArr.join('#');
        } else if (this.nowPlayMethod.type == 'ordinary') {
          obj.buyInfo = selectionArr.join(',');
        }
        this.orderDataArr.unshift(obj)
      }
      this.showFooterAlert = false;
      // console.log(this.orderDataArr)
      let arr = JSON.stringify(this.orderDataArr);
      window.localStorage.setItem('orderDataArr', arr);
      this.$router.push({ path: '/page/index/elevenChooseFive/bettingPage' + localStorage.getItem('Id') })
    },
    // 点击其他区域，隐藏弹层
    clickBody() {
      this.showFooterAlert = false;
      this.operation.centerAlertShow = false;
      this.showLeftAlert = false;
      this.showRightAlert = false;
    },
    // 返回玩法编码
    backMethodCode(name) {
      let codeArr = [
        { name: '任选二', code: 'A2' },
        { name: '任选三', code: 'A3' },
        { name: '任选四', code: 'A4' },
        { name: '任选五', code: 'A5' },
        { name: '任选六', code: 'A6' },
        { name: '任选七', code: 'A7' },
        { name: '任选八', code: 'A8' },
        { name: '前一', code: 'B1' },
        { name: '前二直选', code: 'C' },
        { name: '前二组选', code: 'D' },
        { name: '前三直选', code: 'E' },
        { name: '前三组选', code: 'F' },
        { name: '任选二胆拖', code: 'G2' },
        { name: '任选三胆拖', code: 'G3' },
        { name: '任选四胆拖', code: 'G4' },
        { name: '任选五胆拖', code: 'G5' },
        { name: '任选六胆拖', code: 'G6' },
        { name: '任选七胆拖', code: 'G7' },
        { name: '任选八胆拖', code: 'G8' },
        { name: '前二组选胆拖', code: 'H2' },
        { name: '前三组选胆拖', code: 'H3' }
      ];
      let code = '';
      for (var i = 0; i < codeArr.length; i++) {
        if (codeArr[i].name == name) {
          code = codeArr[i].code;
        }
      }
      return code;
    },
    // 获取当期数据
    loadLotteryInfo() {
      let params = {};
      params.gameType = this.nowGameType;
      console.log(params, '----this is params')
      this.$api.LotteryInfo(params).then(res => {
        console.log(res, "---this is LotteryInfo back data")
        this.nowStage = res.data.data.nextIssue;
        this.historyListData[0] = res.data.data.list.slice(0, 5).reverse();
        this.historyListData[1] = res.data.data.list.slice(0, 10).reverse();
        for (let a = 0; a < this.numberArr.length; a++) {
          let num = 0;
          for (let b = 0; b < this.historyListData[1].length; b++) {
            if (this.historyListData[1][b].lotteryNumber.split('-').indexOf(this.numberArr[a]) == -1) {
              num++
            }
          }
          this.omissionArr[a] = num;
        }
        this.historyList = this.historyListData[0];
        let deadlineTime = res.data.data.closeTime; //服务器当前期截至时间
        let remainingTime = res.data.data.showTime; //服务器返回的剩余时间
        this.deadlineTime = deadlineTime;
        this.remainingTime = remainingTime;
        console.log(deadlineTime, '服务器当前期截至时间')
        console.log(remainingTime, '服务器返回的剩余时间')
        // 倒计时初始化显示
        let timeNum = '';
        let nowTime = new Date().getTime(); //当前时间时间戳
        let calculationTime = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0); //计算出来的剩余时间
        console.log(calculationTime, '计算出来的剩余时间')
        if (Math.abs(calculationTime - this.remainingTime) > 1) {
          timeNum = this.remainingTime;
        } else {
          timeNum = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
        }
        console.log(timeNum, '最终倒计时所用时间')
        // 开始倒计时
        this.calculateTheRemainingTime(timeNum);
        this.countDown(timeNum);
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 剩余时间格式化
    calculateTheRemainingTime(timeNum) {
      let leftTime = '';
      let rightTime = '';
      let hour = '';
      let minute = '';
      let second = '';
      if (timeNum >= 36000) { //十个小时及以上
        leftTime = Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((3600 <= timeNum) && (timeNum < 36000)) { //一个小时到十个小时
        leftTime = '0' + Math.floor(timeNum / 3600);
        rightTime = Math.floor(timeNum % 3600 / 60).toString().length == 1 ? '0' + Math.floor(timeNum % 3600 / 60) : Math.floor(timeNum % 3600 / 60);
      } else if ((600 <= timeNum) && (timeNum < 3600)) { //十分钟到一个小时
        leftTime = Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((60 <= timeNum) && (timeNum < 600)) { //一分钟到十分钟
        leftTime = '0' + Math.floor(timeNum / 60);
        rightTime = (timeNum % 60).toString().length == 1 ? '0' + (timeNum % 60) : (timeNum % 60);
      } else if ((10 <= timeNum) && (timeNum < 60)) { //十秒到一分钟
        leftTime = '00';
        rightTime = timeNum;
      } else if ((0 <= timeNum) && (timeNum < 10)) { //零到十秒
        leftTime = '00';
        rightTime = '0' + timeNum;
      } else { //其他
        leftTime = '00';
        rightTime = '00';
      }
      this.remainingTimeShow = leftTime + ":" + rightTime;
    },
    // 倒计时
    countDown(timeNum) {
      this.timer = window.setInterval(() => {
        timeNum--;
        if (timeNum < 0) {
          window.clearInterval(this.timer)
          setTimeout(() => {
            this.loadLotteryInfo();
          }, 500)
        }
        this.calculateTheRemainingTime(timeNum)
      }, 1000)
    },
    // 获取下单彩票列表
    loadPlayInfo() {
      this.$api.PlayInfo(params).then(res => {
        this.listData = res.data.data
        // console.log(res.data.data)
      }).catch(err => {
        console.log(err, '---this is err');
      })
    },
    // 摇一摇机选，出现于非胆拖玩法（普通+前二直选+前三直选）
    ShakeOneShakeMachineSelection() {
      // 选号
      let ShakeOneShakeMachineSelectionArr = this.getRandomArrayElements(this.nowPlayMethod.choiceNum);
      if (this.nowPlayMethod.type == 'previousTwo') {
        this.nowPlayMethod.selectedArr[0].selectedNumber = [];
        this.nowPlayMethod.selectedArr[1].selectedNumber = [];
        this.nowPlayMethod.selectedArr[0].selectedNumber.push(ShakeOneShakeMachineSelectionArr[0]);
        this.nowPlayMethod.selectedArr[1].selectedNumber.push(ShakeOneShakeMachineSelectionArr[1]);
      } else if (this.nowPlayMethod.type == 'previousThree') {
        this.nowPlayMethod.selectedArr[0].selectedNumber = [];
        this.nowPlayMethod.selectedArr[1].selectedNumber = [];
        this.nowPlayMethod.selectedArr[2].selectedNumber = [];
        this.nowPlayMethod.selectedArr[0].selectedNumber.push(ShakeOneShakeMachineSelectionArr[0]);
        this.nowPlayMethod.selectedArr[1].selectedNumber.push(ShakeOneShakeMachineSelectionArr[1]);
        this.nowPlayMethod.selectedArr[2].selectedNumber.push(ShakeOneShakeMachineSelectionArr[2]);
      } else if (this.nowPlayMethod.type == 'ordinary') {
        this.nowPlayMethod.selectedArr[0].selectedNumber = ShakeOneShakeMachineSelectionArr;
      }
      // 计算注数及盈亏
      this.calculationProfitInfo();
    },
    // 点击号码，除胆拖外，其他玩法没有校验（胆拖+其他）
    selectionNumber(number, key, flag) {
      // 选中或取消选中更新数据，页面渲染
      if (flag) { //选中
        if (this.nowPlayMethod.type == 'dragOn') { //胆拖
          if (key == 0) {
            // 1、最多选择（choiceNum-1）个胆码
            // 2、胆码选择后，对应的拖码消失
            if (this.nowPlayMethod.selectedArr[0].selectedNumber.length > (this.nowPlayMethod.choiceNum - 2)) {
              this.toastBox = { //信息提示框
                show: true,
                position: 'middle',
                time: 800,
                text: this.nowPlayMethod.choiceName + '最多只能选择' + (this.nowPlayMethod.choiceNum - 1) + '个胆码'
              }
              return false;
            } else if (this.nowPlayMethod.selectedArr[1].selectedNumber.indexOf(number) != -1) {
              this.nowPlayMethod.selectedArr[0].selectedNumber.push(number)
              this.removeArrObj(this.nowPlayMethod.selectedArr[1].selectedNumber, number)
            } else {
              this.nowPlayMethod.selectedArr[key].selectedNumber.push(number)
            }
          } else if (key == 1) {
            // 1、最多选择10个拖码
            // 2、拖码选择后，对应的胆码消失
            if (this.nowPlayMethod.selectedArr[1].selectedNumber.length > 9) {
              this.toastBox = { //信息提示框
                show: true,
                position: 'middle',
                time: 800,
                text: this.nowPlayMethod.choiceName + '最多只能选择10个拖码'
              }
              return false;
            } else if (this.nowPlayMethod.selectedArr[0].selectedNumber.indexOf(number) != -1) {
              this.nowPlayMethod.selectedArr[1].selectedNumber.push(number)
              this.removeArrObj(this.nowPlayMethod.selectedArr[0].selectedNumber, number)
            } else {
              this.nowPlayMethod.selectedArr[key].selectedNumber.push(number)
            }
          }
        } else { //其他
          this.nowPlayMethod.selectedArr[key].selectedNumber.push(number)
        }
      } else { //取消选中
        this.removeArrObj(this.nowPlayMethod.selectedArr[key].selectedNumber, number)
      }
      // 计算注数及盈亏
      this.calculationProfitInfo();
    },
    // 点击全选按钮，全选按钮出现于胆拖以及除前一之外所有普通玩法（胆拖+普通）
    clickAllElection(key) {
      // 选号
      if (this.nowPlayMethod.type == 'dragOn') { //胆拖
        if (this.nowPlayMethod.selectedArr[0].selectedNumber.length == 0) {
          this.toastBox = { //信息提示框
            show: true,
            position: 'middle',
            time: 800,
            text: '请先选择胆码'
          }
          return false;
        }
        this.nowPlayMethod.selectedArr[key].selectedNumber = [];
        for (let m = 0; m < this.numberArr.length; m++) {
          if (this.nowPlayMethod.selectedArr[0].selectedNumber.indexOf(this.numberArr[m]) == -1) {
            this.nowPlayMethod.selectedArr[key].selectedNumber.push(this.numberArr[m]);
          }
        }
      } else if (this.nowPlayMethod.type == 'ordinary') { //普通
        this.nowPlayMethod.selectedArr[key].selectedNumber = [];
        for (let i = 0; i < this.numberArr.length; i++) {
          this.nowPlayMethod.selectedArr[key].selectedNumber.push(this.numberArr[i]);
        }
      }
      // 计算注数及盈亏
      this.calculationProfitInfo();
    },
    // 数组排序
    sortNumber(a, b) { return a - b },
    // 计算当前注数，计算盈利信息
    calculationProfitInfo() {
      let arr = this.nowPlayMethod.selectedArr[0].selectedNumber;
      let brr = this.nowPlayMethod.selectedArr[1].selectedNumber;
      let crr = this.nowPlayMethod.selectedArr[2].selectedNumber;
      let choiceNum = Number(this.nowPlayMethod.choiceNum);
      // 计算注数分为四种情况：普通，前二直选，前三直选，胆拖
      if (this.nowPlayMethod.type == 'dragOn') { //胆拖
        if (arr.length > 0 && brr.length > 0) {
          if ((arr.length + brr.length) > choiceNum) {
            this.optionalAlgorithm((choiceNum - arr.length), brr.length)
          } else if ((arr.length + brr.length) == choiceNum) {
            this.nowPlayMethod.totalNum = 1;
            this.nowPlayMethod.totalPrice = 2;
          } else {
            this.nowPlayMethod.totalNum = 0;
            this.nowPlayMethod.totalPrice = 0;
          }
        } else {
          this.nowPlayMethod.totalNum = 0;
          this.nowPlayMethod.totalPrice = 0;
        }
      } else if (this.nowPlayMethod.type == 'ordinary') { //普通
        if (arr.length > choiceNum) {
          this.optionalAlgorithm(choiceNum, arr.length)
        } else if (arr.length == choiceNum) {
          this.nowPlayMethod.totalNum = 1;
          this.nowPlayMethod.totalPrice = 2;
        } else {
          this.nowPlayMethod.totalNum = 0;
          this.nowPlayMethod.totalPrice = 0;
        }
      } else if (this.nowPlayMethod.type == 'previousTwo') { //前二直选
        if (arr.length > 0 && brr.length > 0) {
          this.previousTwoAlgorithm(arr, brr)
        } else {
          this.nowPlayMethod.totalNum = 0;
          this.nowPlayMethod.totalPrice = 0;
        }
      } else if (this.nowPlayMethod.type == 'previousThree') { //前三直选
        if (arr.length > 0 && brr.length > 0 && crr.length > 0) {
          this.previousThreeAlgorithm(arr, brr, crr)
        } else {
          this.nowPlayMethod.totalNum = 0;
          this.nowPlayMethod.totalPrice = 0;
        }
      }
      //计算盈利分
      if (this.nowPlayMethod.totalNum >= 1) {
        let profitAndLoss = ''; //盈利||亏损
        // 1、中奖情况只有一种
        if (this.nowPlayMethod.name == "任选五" || this.nowPlayMethod.name == "前一" || this.nowPlayMethod.name == "前二直选" || this.nowPlayMethod.name == "前二组选" || this.nowPlayMethod.name == "前三直选" || this.nowPlayMethod.name == "前三组选" || this.nowPlayMethod.name == "前二组选胆拖" || this.nowPlayMethod.name == "前三组选胆拖" || this.nowPlayMethod.name == "任选五胆拖") {
          if ((this.nowPlayMethod.winningAmount - this.nowPlayMethod.totalPrice) >= 0) {
            profitAndLoss = "盈利" + (this.nowPlayMethod.winningAmount - this.nowPlayMethod.totalPrice);
          } else {
            profitAndLoss = "亏损" + -(this.nowPlayMethod.winningAmount - this.nowPlayMethod.totalPrice);
          }
          this.nowPlayMethod.profitInfo = '· 若中奖：奖金' + this.nowPlayMethod.winningAmount + '元，' + profitAndLoss + '元';
        }
        // 2、包含五个号
        else if (this.nowPlayMethod.name == "任选六" || this.nowPlayMethod.name == "任选七" || this.nowPlayMethod.name == "任选八") {
          let winningAmount = ''
          if (this.nowPlayMethod.totalNum == 1) {
            winningAmount = this.nowPlayMethod.winningAmount;
            profitAndLoss = "盈利" + (winningAmount - this.nowPlayMethod.totalPrice);
          } else {
            winningAmount = this.MChoiceN((this.nowPlayMethod.choiceNum - 5), (this.nowPlayMethod.selectedArr[0].selectedNumber.length - 5)) * Number(this.nowPlayMethod.winningAmount);
            if ((winningAmount - this.nowPlayMethod.totalPrice) >= 0) {
              profitAndLoss = "盈利" + (winningAmount - this.nowPlayMethod.totalPrice);
            } else {
              profitAndLoss = "亏损" + -(winningAmount - this.nowPlayMethod.totalPrice);
            }
          }
          this.nowPlayMethod.profitInfo = '· 若中奖：奖金' + winningAmount + '元，' + profitAndLoss + '元';
        } else if (this.nowPlayMethod.name == "任选二" || this.nowPlayMethod.name == "任选三" || this.nowPlayMethod.name == "任选四") {
          // **** 放弃算法，暂时采用死数据方式 *****
          let profitArr = [{ name: '任选二', arr: [{ num: 2, text: '奖金6元，盈利4元' }, { num: 3, text: '奖金6至18元，盈利0至12元' }, { num: 4, text: '奖金6至36元，盈利-6至24元' }, { num: 5, text: '奖金6至60元，盈利-14至40元' }, { num: 6, text: '奖金6至60元，盈利-24至30元' }, { num: 7, text: '奖金6至60元，盈利-36至18元' }, { num: 8, text: '奖金6至60元，盈利-50至4元' }, { num: 9, text: '奖金18至60元，亏损12至54元' }, { num: 10, text: '奖金36至60元，亏损30至54元' }, { num: 11, text: '奖金60元，亏损50元' }] }, { name: '任选三', arr: [{ num: 3, text: '奖金19元，盈利17元' }, { num: 4, text: '奖金19至76元，盈利11至68元' }, { num: 5, text: '奖金19至190元，盈利-1至170元' }, { num: 6, text: '奖金19至190元，盈利-21至150元' }, { num: 7, text: '奖金19至190元，盈利-51至120元' }, { num: 8, text: '奖金19至190元，盈利-93至78元' }, { num: 9, text: '奖金18至60元，盈利-149至22元' }, { num: 10, text: '奖金76至190元，亏损50至164元' }, { num: 11, text: '奖金190元，亏损140元' }] }, { name: '任选四', arr: [{ num: 4, text: '奖金78元，盈利76元' }, { num: 5, text: '奖金78至390元，盈利68至380元' }, { num: 6, text: '奖金78至390元，盈利48至360元' }, { num: 7, text: '奖金78至390元，盈利8至320元' }, { num: 8, text: '奖金78至390元，盈利-62至250元' }, { num: 9, text: '奖金78至390元，盈利-174至138元' }, { num: 10, text: '奖金78至390元，亏损30至342元' }, { num: 11, text: '奖金390元，亏损270元' }] }]
          for (var i = 0; i < profitArr.length; i++) {
            if (profitArr[i].name == this.nowPlayMethod.name) {
              for (var j = 0; j < profitArr[i].arr.length; j++) {
                if (profitArr[i].arr[j].num == this.nowPlayMethod.selectedArr[0].selectedNumber.length) {
                  this.nowPlayMethod.profitInfo = profitArr[i].arr[j].text;
                }
              }
            }
          }
        } else if (this.nowPlayMethod.name == "任选二胆拖" || this.nowPlayMethod.name == "任选三胆拖" || this.nowPlayMethod.name == "任选四胆拖" || this.nowPlayMethod.name == "任选六胆拖" || this.nowPlayMethod.name == "任选七胆拖" || this.nowPlayMethod.name == "任选八胆拖") {
          // **** 放弃算法，暂时采用死数据方式 *****
          let twoThreeFourSixSevenEightArr = [{
            name: '任选二胆拖',
            arr: [
              ['6,6', '6,12', '6,18', '6,24', '6,24', '6,24', '6,24', '12,24', '18,24', '24,24']
            ]
          }, {
            name: '任选三胆拖',
            arr: [
              ['0,0', '19,19', '19,57', '19,114', '19,114', '19,114', '19,114', '19,114', '57,114', '114,114'],
              ['19,19', '19,38', '19,57', '19,57', '19,57', '19,57', '19,57', '38,57', '57,57']
            ]
          }, {
            name: '任选四胆拖',
            arr: [
              ['0,0', '0,0', '78,78', '78,312', '78,312', '78,312', '78,312', '78,312', '78,312', '312,312'],
              ['0,0', '78,78', '78,234', '78,234', '78,234', '78,234', '78,234', '78,234', '234,234'],
              ['78,78', '78,156', '78,156', '78,156', '78,156', '78,156', '78,156', '156,156']
            ]
          }, {
            name: '任选六胆拖',
            arr: [
              ['0,0', '0,0', '0,0', '0,0', '90,90', '90,180', '90,270', '90,360', '90,450', '90,540'],
              ['0,0', '0,0', '0,0', '90,90', '90,180', '90,270', '90,360', '90,450', '90,540'],
              ['0,0', '0,0', '90,90', '90,180', '90,270', '90,360', '90,450', '90,540'],
              ['0,0', '90,90', '90,180', '90,270', '90,360', '90,450', '90,540'],
              ['90,90', '90,180', '90,270', '90,360', '90,450', '90,540']
            ]
          }, {
            name: '任选七胆拖',
            arr: [
              ['0,0', '0,0', '0,0', '0,0', '0,0', '26,26', '52,78', '78,156', '104,260', '130,390'],
              ['0,0', '0,0', '0,0', '0,0', '26,26', '26,78', '26,156', '26,260', '26,390'],
              ['0,0', '0,0', '0,0', '26,26', '26,78', '26,156', '26,260', '26,390'],
              ['0,0', '0,0', '26,26', '26,78', '26,156', '26,260', '26,390'],
              ['0,0', '26,26', '26,78', '26,156', '26,260', '26,390'],
              ['26,26', '26,52', '26,78', '26,104', '26,130']
            ]
          }, {
            name: '任选八胆拖',
            arr: [
              ['0,0', '0,0', '0,0', '0,0', '0,0', '0,0', '9,9', '27,36', '54,90', '90,180'],
              ['0,0', '0,0', '0,0', '0,0', '0,0', '9,9', '18,36', '27,90', '36,180'],
              ['0,0', '0,0', '0,0', '0,0', '9,9', '9,36', '9,90', '9,180'],
              ['0,0', '0,0', '0,0', '9,9', '9,36', '9,90', '9,180'],
              ['0,0', '0,0', '9,9', '9,36', '9,90', '9,180'],
              ['0,0', '9,9', '9,27', '9,54', '9,90'],
              ['9,9', '9,18', '9,27', '9,36']
            ]
          }];
          let one = this.nowPlayMethod.selectedArr[0].selectedNumber.length;
          let two = this.nowPlayMethod.selectedArr[1].selectedNumber.length;
          let str = {};
          for (var i = 0; i < twoThreeFourSixSevenEightArr.length; i++) {
            if (twoThreeFourSixSevenEightArr[i].name == this.nowPlayMethod.name) {
              str = twoThreeFourSixSevenEightArr[i].arr[(one - 1)][(two - 1)];
            }
          }
          let min = str.split(',')[0];
          let max = str.split(',')[1];
          let winningAmountHtml = '';
          let profitHtml = '';
          if (min == max) {
            winningAmountHtml = min;
            profitHtml = (min - this.nowPlayMethod.totalPrice);
            this.nowPlayMethod.profitInfo = '· 若中奖：奖金' + winningAmountHtml + '元，盈利' + profitHtml + '元';
          } else {
            winningAmountHtml = min + '至' + max;
            profitHtml = (min - this.nowPlayMethod.totalPrice) + '至' + (max - this.nowPlayMethod.totalPrice);
            this.nowPlayMethod.profitInfo = '· 若中奖：奖金' + winningAmountHtml + '元，盈利' + profitHtml + '元';
          }
        }
        this.nowPlayMethod.profitInfoKey = true;
      } else {
        this.nowPlayMethod.profitInfo = '';
        this.nowPlayMethod.profitInfoKey = false;
      }
      arr.sort(this.sortNumber)
      brr.sort(this.sortNumber)
      crr.sort(this.sortNumber)
      this.operation.centerContent[(Number(this.nowPlayMethod.id) - 1)] = this.nowPlayMethod;
    },
    // 删除数组中指定元素
    removeArrObj(array, obj) {
      var index = array.indexOf(obj);
      if (index > -1) {
        array.splice(index, 1);
      }
    },
    // 从数组中随机取数，入参count：取数个数
    getRandomArrayElements(count) {
      let arr = this.numberArr;
      let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    // 点击下拉箭头
    clickDropDownArrow() {
      if (this.selectionNumberBgBoxTopNum == 44) {
        this.selectionNumberBgBoxTopNum = 212;
        this.historyList = this.historyListData[0];
      } else {
        this.selectionNumberBgBoxTopNum = 44;
      }
    },
    // m选n，返回长度
    MChoiceN(n, m) {
      if (!n || n < 1) {
        return false;
      }
      let resultArrs = []
      let flagArr = []
      let isEnd = false
      let i, j, leftCnt
      for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0
      }
      resultArrs.push(flagArr.concat())
      while (!isEnd) {
        leftCnt = 0
        for (i = 0; i < m - 1; i++) {
          if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              flagArr[j] = j < leftCnt ? 1 : 0
            }
            flagArr[i] = 0
            flagArr[i + 1] = 1
            var aTmp = flagArr.concat()
            resultArrs.push(aTmp)
            if (aTmp.slice(-n).join('').indexOf('0') === -1) {
              isEnd = true
            }
            break
          }
          flagArr[i] === 1 && leftCnt++
        }
      }
      return resultArrs.length;
    },
    // 计算总注数及总金额，m选n，
    // 《普通》，适用于任选系列，前一，前二组选，前三组选，(n, m)，n：玩法，m：选中号码数量
    // 《胆拖》，适用于任选系列，前二组选，前三组选，(n-k,m)，n：玩法，k：选中的胆码的数量，m：选中的拖码的数量
    optionalAlgorithm(n, m) {
      if (!n || n < 1) {
        return false;
      }
      let resultArrs = []
      let flagArr = []
      let isEnd = false
      let i, j, leftCnt
      for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0
      }
      resultArrs.push(flagArr.concat())
      while (!isEnd) {
        leftCnt = 0
        for (i = 0; i < m - 1; i++) {
          if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              flagArr[j] = j < leftCnt ? 1 : 0
            }
            flagArr[i] = 0
            flagArr[i + 1] = 1
            var aTmp = flagArr.concat()
            resultArrs.push(aTmp)
            if (aTmp.slice(-n).join('').indexOf('0') === -1) {
              isEnd = true
            }
            break
          }
          flagArr[i] === 1 && leftCnt++
        }
      }
      this.nowPlayMethod.totalNum = resultArrs.length;
      this.nowPlayMethod.totalPrice = this.nowPlayMethod.totalNum * 2;
      return resultArrs;
    },
    // 前二直选算法
    previousTwoAlgorithm(arr, brr) {
      let resultArrs = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < brr.length; j++) {
          let crr = [];
          if (arr[i] != brr[j]) {
            crr.push(arr[i])
            crr.push(brr[j])
            resultArrs.push(crr)
          }
        }
      }
      this.nowPlayMethod.totalNum = resultArrs.length;
      this.nowPlayMethod.totalPrice = this.nowPlayMethod.totalNum * 2;
      return resultArrs;
    },
    // 前三直选算法
    previousThreeAlgorithm(arr, brr, crr) {
      let resultArrs = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < brr.length; j++) {
          let crr = [];
          if (arr[i] != brr[j]) {
            crr.push(arr[i])
            crr.push(brr[j])
            resultArrs.push(crr)
          }
        }
      }
      let newArr = [];
      for (let m = 0; m < resultArrs.length; m++) {
        for (let n = 0; n < crr.length; n++) {
          if (resultArrs[m].indexOf(crr[n]) == -1) {
            let newBrr = [];
            newBrr[0] = resultArrs[m][0];
            newBrr[1] = resultArrs[m][1];
            newBrr.push(crr[n])
            newArr.push(newBrr)
          }
        }
      }
      this.nowPlayMethod.totalNum = newArr.length;
      this.nowPlayMethod.totalPrice = newArr.length * 2;
      return newArr;
    },
    // 跳转胆拖说明页面
    goQuestion() {
      this.$router.push({ path: '/question' + localStorage.getItem('Id'), query: { type: 1 } })
    },
  },
  created() {
    let clientHeight = document.documentElement.clientHeight;
    this.clientHeight = clientHeight;
    this.loadLotteryInfo();
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  mounted() {
    // 获取当前选中彩种，预留
    // let query=this.$route.query;
    // this.nowGameType=this.nowGameType;
    // 设置公共头部
    this.setPublicHeaderStatus({
      isShow: false, //是否显示公共头部
    });
    // 设置公共底部
    this.setBottomNavigation({
      activeNum: this.publicInfo.bottomNavigation.activeNum, //当前选中的底部导航下标
      show: false, //是否显示底部导航
    });
  }
}

</script>
<style>
.elevenChooseFiveBox {
  position: relative;
}

/*头部右侧弹层*/
.elevenChooseFiveBox .headerRightBox {
  width: 160px;
  height: 352px;
  background-image: url('../../../../assets/img/ElevenChooseFive/rightAssistant.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 65px;
  right: 25px;
  z-index: 999999;
  padding-top: 14px;
  box-shadow: 0 0 5px rgba(217, 29, 55, 0.3)
}

.elevenChooseFiveBox .headerRightBox ul {
  padding: 0 20px;
}

.elevenChooseFiveBox .headerRightBox ul li {
  text-align: center;
  font-size: 28px;
  line-height: 86px;
  font-weight: 500;
  color: #000000;
  border-bottom: 2px solid #F4F4F4;
}

.elevenChooseFiveBox .headerRightBox ul li:last-child {
  border-bottom: none;
}

/*玩法选择层*/
.elevenChooseFiveBox .playMethodBox {
  padding: 35px 30px 20px;
  width: 690px;
  height: auto;
  min-height: 720px;
  background: #F9F8F0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.35);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 888;
}

.elevenChooseFiveBox .playMethodBox .playMethodTitleBox {
  margin-bottom: 30px;
}

.elevenChooseFiveBox .playMethodBox .playMethodTitleBox b {
  height: 2px;
  background: #D9D9D3;
  display: inline-block;
  width: 275px;
  vertical-align: middle;
}

.elevenChooseFiveBox .playMethodBox .playMethodTitleBox span {
  padding: 0 30px;
  font-size: 32px;
  font-family: 'PingFang-SC-Medium';
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  vertical-align: middle;
}

.elevenChooseFiveBox .playMethodBox .playMethodContentBox span {
  width: 210px;
  height: 60px;
  background: #FFFFFF;
  border: 2px solid #D9D9D3;
  border-radius: 6px;
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  text-align: center;
  line-height: 60px;
  display: inline-block;
  margin: 0 24px 30px 0;
}

.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(3),
.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(6),
.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(9),
.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(12),
.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(15),
.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(18),
.elevenChooseFiveBox .playMethodBox .playMethodContentBox span:nth-child(21) {
  margin-right: 0;
}

.elevenChooseFiveBox .playMethodBox .playMethodContentBox span.active {
  background-image: url('../../../../assets/img/ElevenChooseFive/playMethodActive.png');
  background-repeat: no-repeat;
  background-size: cover;
}

/*中间主体区域*/
.elevenChooseFiveBox .elevenChooseFiveContentBox {
  background: #F9F8F0;
  position: relative;
}

/*头部当前期及倒计时*/
.elevenChooseFiveBox .elevenChooseFiveContentBox .titleBox {
  background: #F9F8F0;
  border-bottom: 1px solid #D9D9D3;
  height: 88px;
  line-height: 88px;
  text-align: center;
  color: #333333;
  font-size: 28px;
  font-weight: 500;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .titleBox .remainingTimeShow {
  color: #D91D37;
}

/*历史开奖*/
.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox {}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox .lookMore {
  text-align: center;
  padding: 15px 0;
  color: #333333;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table {
  width: 100%;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table th {
  font-weight: bold;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table th,
.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table td {
  text-align: center;
  border-right: 1px solid #D9D9D3;
  border-bottom: 1px solid #D9D9D3;
  width: 56px;
  height: 56px;
  font-size: 24px;
  color: #908982;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table tr th:nth-child(12),
.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table tr td:nth-child(12) {
  border-right: none;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table .tableLeft {
  display: inline-block;
  width: 120px;
  font-size: 24px;
  font-weight: bold;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .lotteryHistoryBox table tbody tr td .active {
  width: 38px;
  height: 38px;
  background: rgba(221, 70, 91, 1);
  border-radius: 50%;
  color: #fff;
  display: inline-block;
}

/*选择号码区域整体 */
.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox {
  position: absolute;
  left: 0;
  z-index: 555;
  background: #F9F8F0;
  border-top: 1px solid #D9D9D3;
  width: 100%;
  padding-bottom: 128px;
  transition: all 0.5s ease-out;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .DropDownArrow {
  text-align: center;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .DropDownArrow img {
  width: 118px;
  height: 36px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .topBox img {
  width: 226px;
  height: 68px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .topBox p {
  padding-left: 30px;
  font-size: 28px;
  line-height: 68px;
  font-weight: 500;
  color: #3A59F9;
  display: inline-block;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .promptText {
  font-size: 28px;
  font-weight: 500;
  color: #333333;
  padding-left: 30px;
  margin: 20px 0 30px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .promptText span {
  color: #D91D37;
}

/*号码区域*/
.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox {
  padding: 30px 30px 0;
  border-bottom: 1px solid #D9D9D3;
  overflow: hidden;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox:last-child {
  border-bottom: none;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .leftBox {
  float: left;
  width: 102px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .leftBox img {
  width: 85px;
  height: 43px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .leftBox img:nth-child(1) {
  vertical-align: top;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .leftBox img:nth-child(2) {
  vertical-align: bottom;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox {
  width: 572px;
  float: right;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .rightBoxText {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  display: block;
  overflow: hidden;
  line-height: 43px;
  margin-bottom: 15px;
  padding: 0 14px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .rightBoxText span:nth-child(1) {
  float: left;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .rightBoxText span:nth-child(2) {
  float: right;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .everyNumberBox {
  width: 94px;
  text-align: center;
  display: inline-block;
  margin-bottom: 20px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .everyNumberBox .number {
  width: 62px;
  height: 62px;
  border: 2px solid #C2C2C2;
  border-radius: 50%;
  margin: 0 14px 20px;
  display: inline-block;
  text-align: center;
  line-height: 62px;
  font-size: 36px;
  font-weight: bold;
  color: #D91D37;
  cursor: pointer;
  background: #fff;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .everyNumberBox .number.active {
  background: #D91D37;
  border: 2px solid #D91D37;
  color: #fff;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .everyNumberBox .omission {
  font-size: 28px;
  font-weight: 500;
  color: #C6BDB0;
  line-height: 43px;
}

.elevenChooseFiveBox .elevenChooseFiveContentBox .selectionNumberBgBox .selectionNumberBox .numberBgBox .numberBox .rightBox .allElection {
  display: inline-block;
  width: 88px;
  height: 59px;
  background: #FFFFFF;
  border: 2px solid #C1C1C1;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 500;
  color: #333333;
  text-align: center;
  line-height: 59px;
  vertical-align: top;
}

/*盈亏信息*/
.elevenChooseFiveBox .profitInfoBox {
  border-top: 1px solid #D9D9D3;
  height: 66px;
  line-height: 66px;
  text-align: left;
  color: #333333;
  font-size: 28px;
  position: fixed;
  bottom: 128px;
  left: 0;
  z-index: 9999;
  width: 100%;
  background: #fff;
  padding-left: 30px;
}

/*底部区域*/
.elevenChooseFiveBox footer {
  width: 100%;
  height: 128px;
  background: #252625;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 777;
}

.elevenChooseFiveBox footer .footerLeftBox {
  width: 115px;
  height: 65px;
  background: #37393B;
  border-radius: 6px;
  text-align: center;
  line-height: 65px;
  display: inline-block;
  float: left;
  margin: 32px 0 0 30px;
  font-size: 30px;
  font-weight: 500;
}

.elevenChooseFiveBox footer p {
  font-size: 32px;
  font-weight: 500;
  color: #FFFFFF;
  text-align: center;
  line-height: 128px;
}

.elevenChooseFiveBox footer p .money {
  color: #D3B50E;
}

.elevenChooseFiveBox footer .footerRightBox {
  width: 115px;
  height: 65px;
  background: #FFBA00;
  border-radius: 6px;
  font-size: 32px;
  font-weight: 500;
  color: #000000;
  display: inline-block;
  float: right;
  margin: 32px 30px 0 0;
  text-align: center;
  line-height: 65px;
}

/*底部左侧弹框*/
.elevenChooseFiveBox .footerAlertBox {
  width: 170px;
  height: 214px;
  position: fixed;
  bottom: 108px;
  left: 30px;
  z-index: 8888;
  box-shadow: 0 0 5px rgba(37, 38, 37, 0.3)
}

.elevenChooseFiveBox .footerAlertBox b {
  display: inline-block;
  width: 0;
  height: 0;
  border-width: 15px 15px 0;
  border-style: solid;
  border-color: #fff transparent transparent transparent;
  position: absolute;
  bottom: 0px;
  left: 30px;
  z-index: 1000;
}

.elevenChooseFiveBox .footerAlertBox ul {
  padding: 0 15px;
  background: #fff;
}

.elevenChooseFiveBox .footerAlertBox ul li {
  text-align: left;
  font-size: 28px;
  line-height: 66px;
  height: 66px;
  font-weight: 500;
  color: #000000;
  border-bottom: 2px solid #666;
}

.elevenChooseFiveBox .footerAlertBox ul li .imgBox {
  width: 55px;
  height: 55px;
  display: inline-block;
  background-image: url('../../../../assets/img/ElevenChooseFive/moneyPacket.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  float: left;
  margin-top: 5px;
}

.elevenChooseFiveBox .footerAlertBox ul li:last-child {
  border-bottom: none;
}

/*信息提示框*/
.elevenChooseFiveBox .toastBox .weui-toast {
  width: auto !important;
  padding: 10px 25px;
}

</style>
