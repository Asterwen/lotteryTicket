<template>
  <div class="trend" ref="trend">
    <!--<game-page-header :operation="operation" v-on:clickBack="clickBack" v-on:clickMore="clickMore" v-on:clickCenter="clickCenter"></game-page-header>-->
    <div class="trend_head">
    	<span @click="return_back">
    		<img src="../../../assets/img/return@3x.png"/>
    		
    	</span>
    		<img :src="this.getImg" style="width: 160px;"/>
    		<span></span>
    </div>
    <div class="right-dialog-main" v-show="rightDialog">
      <div class="triangle_border_up">
        <span></span>
      </div>
      <ul>
        <li>走势图</li>
        <li>近期开奖</li>
        <li>号码统计</li>
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
            <img src="src/assets/img/k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v2.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v3.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '2'}" @click="changeQuick3TypeActive('2')">
          <p>三同号</p>
          <span>奖金40-240元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v1.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '3'}" @click="changeQuick3TypeActive('3')">
          <p>二同号</p>
          <span>奖金15-80元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v1.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v3.png" alt="">
          </div>
        </li>
        <li :class="{'select-quick3-type-active': quick3TypeActive === '4'}" @click="changeQuick3TypeActive('4')">
          <p>三不同号</p>
          <span>奖金10-40元</span>
          <div class="quick3-type-dice-box clearfix">
            <img src="src/assets/img/k3_v2.png" alt="">
            <p>+</p>
            <img src="src/assets/img/k3_v3.png" alt="">
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





    <div class="trend-content">
      <tab :class="quick3TypeActive === '1'?'show':''"  >
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick"  >开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">和值走势</tab-item>
        <tab-item :selected="currentTab===3" @on-item-click="onItemClick">冷热</tab-item>
      </tab>
      <tab :class="quick3TypeActive === '2'?'show':'' ">
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick">开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">形态走势</tab-item>
      </tab>
      <tab :class="quick3TypeActive === '3'?'show':'' " >
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick">开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">号码分布</tab-item>
      </tab>
      <tab :class="quick3TypeActive === '4'?'show':''" >
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick">开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">形态走势</tab-item>
        <tab-item :selected="currentTab===3" @on-item-click="onItemClick">冷热</tab-item>
      </tab>
      <tab :class="quick3TypeActive === '5' ?'show':''" >
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick">开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">号码分布</tab-item>
        <tab-item :selected="currentTab===3" @on-item-click="onItemClick">冷热</tab-item>
      </tab>
      <tab :class="quick3TypeActive === '6' ?'show':''" >
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick">开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">形态走势</tab-item>
        <tab-item :selected="currentTab===3" @on-item-click="onItemClick">冷热</tab-item>
      </tab>
      <tab :class="quick3TypeActive === '7'?'show':''" >
        <tab-item :selected="currentTab===0" @on-item-click="onItemClick">开奖</tab-item>
        <tab-item :selected="currentTab===1" @on-item-click="onItemClick">基本走势</tab-item>
        <tab-item :selected="currentTab===2" @on-item-click="onItemClick">号码分布</tab-item>
        <tab-item :selected="currentTab===3" @on-item-click="onItemClick">冷热</tab-item>
      </tab>
      <!-- 和值开奖数据表格 -->
      <div class="normal-table" v-if="currentTab === 0 && quick3TypeActive === '1'">
        <div class="thead">
          <table>
            <colgroup>
              <col width="15%" />
              <col width="40%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <td @click="filterQh">期号
                <span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span>
              </td>
              <td>开奖号码</td>
              <td>和值</td>
              <td>大小</td>
              <td>单双</td>
            </thead>
          </table>
        </div>
        <div class="tbody">
          <table>
            <colgroup>
              <col width="15%" />
              <col width="40%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in kjData" :class="index%2==0?'even':'' ">
                <td v-for="ele in item" class="tdbar">{{ele}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 基本走势数据表格 -->
      <div class="normal-table" v-if="currentTab === 1">
        <div class="thead">
          <table>
            <colgroup>
              <col width="16%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
            </colgroup>
            <thead>
              <td>期号</td>
              <td>开奖号</td>
              <td>和值</td>
              <td>跨度</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </thead>
          </table>
        </div>
        <div class="tbody">
          <table>
            <colgroup>
              <col width="16%" />
              <col width="10%" />
              <col width="10%" />
              <col width="10%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
              <col width="9%" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in zsData" :class="index%2==0?'even':'' ">
                <td>
                  <span>{{item[0]}}</span>
                </td>
                <td>
                  <span>{{item[1]}}</span>
                </td>
                <td>
                  <span>{{item[2]}}</span>
                </td>
                <td>
                  <span>{{item[3]}}</span>
                </td>
                <td>
                  <span class="active" v-if="item[4]!=='' ">
                     {{item[4]}}
                  <span class="badge" v-if="calXtNum(item[1],1)">{{calXtNum(item[1],1)}}</span>
                  </span>
                  <span class="gray" v-else-if="isShowYl" >
                     {{hmyl[index][0]}}
                  </span>
                </td>
                <td>
                  <span class="active" v-if="item[5]!=='' ">
                     {{item[5]}}
                     <span class="badge" v-if="calXtNum(item[1],2)">{{calXtNum(item[1],2)}}</span>
                  </span>
                  <span class="gray" v-else-if="isShowYl">
                     {{hmyl[index][1]}}
                  </span>

                </td>
                <td>
                  <span class="active" v-if="item[6]!=='' ">
                     {{item[6]}}
                     <span class="badge" v-if="calXtNum(item[1],3)">{{calXtNum(item[1],3)}}</span>
                  </span>
                  <span class="gray" v-else-if="isShowYl">
                     {{hmyl[index][2]}}
                  </span>
                </td>
                <td>
                   <span class="active" v-if="item[7]!=='' ">
                     {{item[7]}}
                     <span class="badge" v-if="calXtNum(item[1],4)">{{calXtNum(item[1],4)}}</span>
                  </span>
                  <span class="gray" v-else-if="isShowYl">
                     {{hmyl[index][3]}}
                  </span>

                </td>
                <td>
                  <span class="active" v-if="item[8]!=='' ">
                     {{item[8]}}
                     <span class="badge" v-if="calXtNum(item[1],5)">{{calXtNum(item[1],5)}}</span>
                  </span>
                  <span class="gray" v-else-if="isShowYl">
                     {{hmyl[index][4]}}
                  </span>

                </td>
                <td>
                   <span class="active" v-if="item[9]!=='' ">
                     {{item[9]}}
                     <span class="badge" v-if="calXtNum(item[1],6)">{{calXtNum(item[1],6)}}</span>
                  </span>
                  <span class="gray" v-else-if="isShowYl">
                     {{hmyl[index][5]}}
                  </span>

                </td>
              </tr>
              <tr v-for="(item,index) in tjType" v-if="checkedTj==1">
                <td colspan="4" :class="'tj'+(index+1)">{{item}}</td>
                <td v-for="data in tjzsData[index]">{{data}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--和值走势-->
      <div class="fix-table" v-if="currentTab === 2 && quick3TypeActive === '1'">
        <div class="table-header">
          <span class="bar"></span>
          <div class="bar-content" ref="barContent">
            <table>
              <tr>
                <td v-for="(item,index) in 16">{{item+2}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="table-content">
          <div class="left-table" ref="leftTable">
            <span :class="index%2==0?'bar even':'bar' " v-for="(item,index) in qishu">{{sjqs[index]}}</span>
            <span v-for="(item,index) in tjType" :class="'bar tj'+(index+1)" v-if="checkedTj==1">{{item}}</span>
          </div>
          <div class="right-table" ref="rightTable">
            <svg  class="lineContainerSVG" ref="lineContainerSVG" v-if="checkedZx==1">
              <line v-for="(item,index) in sumLines" v-if="index+1<sumLines.length" :x1="sumLines[index][0]" :y1="sumLines[index][1]" :x2="sumLines[index+1][0]" :y2="sumLines[index+1][1]" style="stroke:rgb(186, 186, 54);stroke-width:1" />
            </svg>
            <table>
              <tr v-for="(obj, index) in hzkjData" :class="index%2==0?'even':'' ">
                <td v-for="(item,current) in obj">
                  <span class="active" v-if="item!==''">{{item}}</span>
                  <span v-else-if="isShowYl" class="gray">{{hzyl[index][current]}}</span>
                </td>
              </tr>
              <tr v-for="(item,index) in tjType" v-if="checkedTj==1">
                <td v-for="data in tjhzkjData[index]">{{data}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="eventLayer" ref="eventLayer" @touchstart.stop.prevent="touchstartMethod" @touchmove.stop.prevent="touchmoveMethod"></div>
      </div>
      <!--冷热-->
      <div class="normal-table" v-if="currentTab === 3">
        <div class="thead">
          <table>
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <td @click="filterSum">和值
                <span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span>
              </td>
              <td @click="filterLr30">30期<span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span></td>
              <td @click="filterLr50">50期<span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span></td>
              <td @click="filterLr100">100期<span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span></td>
              <td>遗漏<span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span></td>
            </thead>
          </table>
        </div>
        <div class="tbody">
          <table>
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in lrData" :class="index%2==0?'even':'' ">
                <td v-for="obj in item">{{obj}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--形态走势-->
      <div class="normal-table" v-if="currentTab === 2 && (quick3TypeActive === '4' || quick3TypeActive === '2' ||  quick3TypeActive === '6')">
        <div class="thead">
          <table>
            <colgroup>
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
            </colgroup>
            <thead>
              <td></td>
              <td>开奖号</td>
              <td>三同号</td>
              <td>三不同</td>
              <td>二同号</td>
              <td>二不同</td>
            </thead>
          </table>
        </div>
        <div class="tbody">
          <table>
            <colgroup>
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
              <col width="16%" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in xtData" :class="index%2==0?'even':'' ">
                <td v-for="(obj,current) in item">
                  <span class="enable1" v-if="obj == '三同号' ">{{obj}}</span>
                  <span class="enable2" v-else-if="obj == '三不同' ">{{obj}}</span>
                  <span class="enable3" v-else-if="obj == '二同号' ">{{obj}}</span>
                  <span class="enable4" v-else-if="obj == '二不同' ">{{obj}}</span>
                  <span class="gray" v-else-if="obj=='' && isShowYl ">{{xtyl[index][current-2]}}</span>
                  <span v-else >{{obj}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 同号形态开奖数据 -->
      <div class="normal-table" v-if="currentTab === 0 && (quick3TypeActive === '4' || quick3TypeActive === '2' || quick3TypeActive === '3' || quick3TypeActive === '5' || quick3TypeActive === '6' || quick3TypeActive === '7')"">
        <div class=" thead">
        <table>
          <colgroup>
            <col width="33%" />
            <col width="33%" />
            <col width="33%" />
          </colgroup>
          <thead>
            <td @click="filterXt">期号
              <span class="filter-arrow">
                    <img src="src/assets/img/2.png" alt="" class="up active"/>
                    <img src="src/assets/img/2.png" alt="" />
                  </span>
            </td>
            <td>开奖号码</td>
            <td>形态</td>
          </thead>
        </table>
      </div>
      <div class="tbody">
        <table>
          <colgroup>
            <col width="33%" />
            <col width="33%" />
            <col width="33%" />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in thxtData" :class="index%2==0?'even':'' ">
              <td v-for="ele in item">{{ele}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--号码分布-->
    <div class="normal-table" v-if="currentTab === 2 && quick3TypeActive === '3'">
      <div class="thead">
        <table>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <td>期号</td>
            <td>开奖号</td>
            <td>11</td>
            <td>22</td>
            <td>33</td>
            <td>44</td>
            <td>55</td>
            <td>66</td>
          </thead>
        </table>
      </div>
      <div class="tbody">
        <table>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in hmfbData" :class="index%2==0?'even':'' ">
              <td>
                <span>{{item[0]}}</span>
              </td>
              <td>
                <span>{{item[1]}}</span>
              </td>
              <td>
                <span class="rect" v-if="item[2]!=='' ">
                  {{item[2]}}
                </span>
                <span class="gray" v-else-if="isShowYl" >
                  {{t2yl[index][0]}}
                </span>
              </td>
              <td>
                <span class="rect" v-if="item[3]!=='' ">
                  {{item[3]}}
                </span>
                <span class="gray" v-else-if="isShowYl" >
                  {{t2yl[index][1]}}
                </span>
              </td>
              <td>
                <span class="rect" v-if="item[4]!=='' ">
                  {{item[4]}}
                </span>
                <span class="gray" v-else-if="isShowYl" >
                  {{t2yl[index][2]}}
                </span>
              </td>
              <td>
                <span class="rect" v-if="item[5]!=='' ">
                  {{item[5]}}
                </span>
                <span class="gray" v-else-if="isShowYl" >
                  {{t2yl[index][3]}}
                </span>
              </td>
              <td>
                <span class="rect" v-if="item[6]!=='' ">
                  {{item[6]}}
                </span>
                <span class="gray" v-else-if="isShowYl" >
                  {{t2yl[index][4]}}
                </span>
              </td>
              <td>
                <span class="rect" v-if="item[7]!=='' ">
                  {{item[7]}}
                </span>
                <span class="gray" v-else-if="isShowYl" >
                  {{t2yl[index][5]}}
                </span>
              </td>
            </tr>
            <tr v-for="(item,index) in tjType" v-if="checkedTj==1">
              <td colspan="2" :class="'tj'+(index+1)">{{item}}</td>
              <td v-for="data in tjhmfbData[index]">{{data}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 二不同号 号码分布-->
    <div class="fix-table" v-if="currentTab === 2 && (quick3TypeActive === '5' || quick3TypeActive === '7')">
      <div class="table-header">
        <span class="bar"></span>
        <span class="bar">开奖号</span>
        <div class="bar-content" ref="barContent">
          <table>
            <tr>
              <td v-for="(item,index) in this.bthm">{{item}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="table-content">
        <div class="left-table col-table" ref="leftTable">
          <table class="bar-table">
            <tr :class="index%2==0?'bar even':'bar' " v-for="(item,index) in qishu">
              <td>{{sjqs[index]}}</td> <td>{{kjhm[index]}}</td>
            </tr>
            <tr v-for="(item,index) in tjType" :class="'bar tj'+(index+1)" v-if="checkedTj==1">
              <td colspan="2">{{item}}</td>
            </tr>
          </table>
        </div>
        <div class="right-table" ref="rightTable2">

          <table>
            <tr v-for="(obj, index) in bthmfbData" :class="index%2==0?'even':'' ">
              <td v-for="(item,current) in obj">
                <span class="active" v-if="item!==''">{{item}}</span>
                <span class="gray" v-else-if="isShowYl" >{{bt2yl[index][current]}}</span>
              </td>
            </tr>
            <tr v-for="(item,index) in tjType" v-if="checkedTj==1">
              <td v-for="data in tjbthmfbData[index]">{{data}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="eventLayer" ref="eventLayer2" @touchstart.stop.prevent="touchstartMethod" @touchmove.stop.prevent="touchmoveMethod"></div>
    </div>
    <!--选号-->
    <div class="select-num" v-if="!(quick3TypeActive==6||quick3TypeActive==7 || (quick3TypeActive==1 && currentTab==1))">
      <div class="left-text">
        <div class="txt1" v-if="quick3TypeActive !== 1">选号</div>
        <div class="txt2" v-if="quick3TypeActive == 1">和值</div>
        <div class="txt2" v-if="quick3TypeActive == 2">三同号</div>
        <div class="txt2" v-if="quick3TypeActive == 3">二同号</div>
        <div class="txt2" v-if="quick3TypeActive == 4">三不同号</div>
        <div class="txt2" v-if="quick3TypeActive == 5">二不同号</div>
      </div>
      <div class="right-text" v-if="quick3TypeActive == 1" ref="selectBottomNum">
        <span v-for="item in hezhiData" :class="item.checked?'active':''"  @click="ClickHezhi($event,item)">{{item.name}}</span>
      </div>
      <div class="right-text" v-if="quick3TypeActive == 2">
        <span v-for="item in santonghaoData" :class="item.checked?'active':''"  @click="clickT3($event,item)">{{item.name}}</span>
      </div>
      <div class="right-text" v-if="quick3TypeActive == 3">
        <span v-for="item in t21" :class="item.checked?'active':''"  @click="t2Event($event,item)">{{item.name}}*</span>
      </div>
      <div class="right-text" v-if="quick3TypeActive == 4">
        <span v-for="item in rt3" :class="item.checked?'active':''"  @click="rt3Event($event,item)">{{item.name}}</span>
      </div>
      <div class="right-text" v-if="quick3TypeActive == 5">
        <span v-for="item in rt2" :class="item.checked?'active':''"  @click="rt2Event($event,item)">{{item.name}}</span>
      </div>
    </div>
    <div class="select-num" v-if="quick3TypeActive==6||quick3TypeActive==7 || (quick3TypeActive==1 && currentTab==1)">
      <p class="timeBox">距{{nextIssue}}期截止：<span class="time">{{showTime}}</span></p>
    </div>
    <!--选号提示-->
    <div class="select-tip" v-if="!(quick3TypeActive==6||quick3TypeActive==7 || (quick3TypeActive==1 && currentTab==1))">
      <div class="left">
        <p><span>·</span>若中奖：奖金
          <span v-if="jjRegion[0]" class="money1">{{jjRegion[0]}}至</span>
          <span class="money1">{{jjRegion[1]}}</span>元,
          <span v-if="!(ylRegion[0]<0 && ylRegion[1]<0)">
             盈利
          <span v-if="ylRegion[0]" class="money1">{{ylRegion[0]}}至</span>
          <span class="money1">{{ylRegion[1]}}</span>元
          </span>
          <span v-else>
             亏损
          <span v-if="ylRegion[0]" class="money1">{{ylRegion[0] < ylRegion[1]?Math.abs(ylRegion[1]):Math.abs(ylRegion[0])}}至</span>
          <span class="money1">{{ylRegion[1] < ylRegion[0]?Math.abs(ylRegion[1]):Math.abs(ylRegion[0])}}</span>元
          </span></p>
        <p><span>·</span>距{{nextIssue}}期截止：{{showTime}}</p>
      </div>
      <div class="right">
        <button @click="goBets">确定</button>
      </div>
    </div>
  </div>
  <div v-transfer-dom>
    <x-dialog v-model="showConfirm" class="dialog-confrim" :dialog-style="{'border-radius':'10px','max-width': '100%', width: '90%', 'background-color': '#fff'}">
      <div class="dialog-title">
        <div class="left"><span class="iconfont icon-shezhi"></span><span></span>走势图设置</div>
        <div class="right"><span>帮助</span><span class="iconfont icon-iconfontjiantou2"></span></div>
      </div>
      <div class="dialog-content">
        <div class="item">
          <span class="text">期数：</span>
          <ul>
            <li v-for="(item,index) in qishuArrs">
              <div class="radio-beauty-container">
                <label>
                  <input type="radio" name="radioName" :id="'radioName'+index" hidden v-model="checkedValue" :value="item" />
                  <label :for="'radioName'+index" class="radio-beauty"></label>
                  <span class="radio-name">近{{item}}期</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="item" v-if="currentTab === 1 || currentTab === 2">
          <span class="text">统计：</span>
          <ul>
            <li v-for="(item,index) in tjArrs">
              <div class="radio-beauty-container">
                <label>
                  <input type="radio" name="tjradio" :id="'tjradio'+index" hidden :value="item" v-model="checkedTj" />
                  <label :for="'tjradio'+index" class="radio-beauty"></label>
                  <span class="radio-name">{{item==1?'显示':'隐藏'}}</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="item" v-if="currentTab === 1 || currentTab === 2">
          <span class="text">遗漏：</span>
          <ul>
            <li v-for="(item,index) in ylArrs">
            <div class="radio-beauty-container" >
            <label>
            <input type="radio" name="ylradio" :id="'ylradio'+index" hidden :value="item" v-model="checkedYl"/>
            <label :for="'ylradio'+index" class="radio-beauty"></label>
            <span class="radio-name">{{item==1?'显示':'隐藏'}}</span>
            </label>
          </div>
        </li>
        </ul>
        </div>
        <div class="item" v-if="currentTab === 0">
          <span class="text">排列：</span>
          <ul>
            <li v-for="(item,index) in xsArrs">
              <div class="radio-beauty-container">
                <label>
                  <input type="radio" name="xsradio" :id="'xsradio'+index" hidden :value="item" v-model="checkedXs" />
                  <label :for="'xsradio'+index" class="radio-beauty"></label>
                  <span class="radio-name">{{item==1?'顺序':'倒序'}}</span>
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div class="item" v-if="currentTab === 2 && (quick3TypeActive==1 || quick3TypeActive==5)">
          <span class="text">折线：</span>
          <ul>
            <li v-for="(item,index) in zxArrs">
              <div class="radio-beauty-container">
                <label>
                  <input type="radio" name="zxradio" :id="'zxradio'+index" hidden :value="item" v-model="checkedZx" />
                  <label :for="'zxradio'+index" class="radio-beauty"></label>
                  <span class="radio-name">{{item==1?'显示':'隐藏'}}</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="btn-box">
          <button class="cancel" @click="onCancel">取消</button>
          <button class="confirm" @click="onConfirm">确定</button>
        </div>
      </div>
      <div @click="showConfirm=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
    <toast v-model="showToast" type="text" :time="2000" :text="tipTxt" position="middle" width="20em"></toast>
  </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { Tab, TabItem, XDialog, Toast, TransferDomDirective as TransferDom } from 'vux'
import GamePageHeader from '../../common/gamePageHeader.vue'
export default {
  name: "trend",
  directives: {
    TransferDom
  },
  components: {
    GamePageHeader,
    Tab,
    TabItem,
    XDialog,
    Toast
  },
  computed: {
    ...mapState({
      publicInfo: "publicInfo"
    }),
  },
  data() {
    return {
      Id:0,
      operation: { //头部组件状态管理
        backgroundClass: 'bgImg', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
        leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
        leftContent: '', //showType为other时，要在左侧显示的内容
        centerAlertShow: false, //中间弹层是否显示
        centerContent: [{ id: 1, name: '和值' }, { id: 2, name: '三同号' }, { id: 3, name: '二同号' }, { id: 4, name: '三不同号' }, { id: 5, name: '二不同号' }, { id: 6, name: '三不同号胆拖' }, { id: 7, name: '二不同号胆拖' }], //中间区域内容
        centerContentKey: window.localStorage.getItem('quick3TypeActive') || 1, //中间区域选中的值的id
        rightShow: false, //右侧区域是否显示
        rightShowType: 'img', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
        rightContent: 'src/assets/img/config.png', //要在右侧显示的内容
        rightContentClass: 'configClass', //右侧内容样式类名
      },
      showToast:false,
      tipTxt:'',
      gameType: window.localStorage.getItem('gameType') || 'bjfast3', //彩种
      Quick3Show: false, //头部中间弹层
      showConfirm: false, //头部右侧弹层
      qishuArrs: [30, 50, 100],
      ylArrs: [1, 0],
      tjArrs: [1, 0],
      xsArrs: [1, 0],
      thxsArrs: [1, 0],
      zxArrs: [1, 0],
      checkedValue: '',
      checkedTj: 1,
      checkedYl: 1,
      checkedXs: 0,
      checkedZx: 1,
      checkedThxs:1,
      getImg: '',
      isShowYl:true,
      Quickform: {},
      timer: null,
//    onShow: true,
      contentBoxTouchMove: '',
      fadeLeaveActiveHalf: false,
      fadeLeaveActiveEnter: true,
      fadeLeaveActive: false,
      contentBoxTouchStart: '',
      contentBoxTouchTop: '',
      quick3TypeActive: window.localStorage.getItem('quick3TypeActive') || 1,
      rightDialog: false,
      hezhiData: [
        { 'name': 3, 'leave': '128', 'bonus': '240' }, { 'name': 4, 'leave': '112', 'bonus': '80' }, {
          'name': 5,
          'leave': '29',
          'bonus': '40'
        }, { 'name': 6, 'leave': '2', 'bonus': '25' },
        { 'name': 7, 'leave': '--', 'bonus': '240' }, { 'name': 8, 'leave': '112', 'bonus': '80' }, {
          'name': 9,
          'leave': '29',
          'bonus': '40'
        }, { 'name': 10, 'leave': '2', 'bonus': '25' },
        { 'name': 11, 'leave': '--', 'bonus': '240' }, { 'name': 12, 'leave': '112', 'bonus': '80' }, {
          'name': 13,
          'leave': '29',
          'bonus': '40'
        }, { 'name': 14, 'leave': '2', 'bonus': '25' },
        { 'name': 15, 'leave': '--', 'bonus': '240' }, { 'name': 16, 'leave': '112', 'bonus': '80' }, {
          'name': 17,
          'leave': '29',
          'bonus': '40'
        }, { 'name': 18, 'leave': '2', 'bonus': '25' }
      ],
      santonghaoData: [
        { 'name': 111, 'leave': '--', 'bonus': '240' }, { 'name': 222, 'leave': '--', 'bonus': '240' }, {
          'name': 333,
          'leave': '--',
          'bonus': '240'
        }, { 'name': 444, 'leave': '--', 'bonus': '240' },
        { 'name': 555, 'leave': '--', 'bonus': '240' }, { 'name': 666, 'leave': '--', 'bonus': '240' }
      ],
      // 2个号相同数据
      t21: [{ name: 11 }, { name: 22 }, { name: 33 }, { name: 44 }, { name: 55 }, { name: 66 }],
      // 1个号不同
      t1: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      t2: [{ name: 11, bonus: '15' }, { name: 22, bonus: '15' }, { name: 33, bonus: '15' }, { name: 44, bonus: '15' }, { name: 55, bonus: '15' }, { name: 66, bonus: '15' }],
      rt3: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
      rt2: [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }],
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
          hm: []
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
          hm: []
        },
        // 二不同号胆拖
        dt2: {
          // 下注号码
          hm: []
        }

      },
      name: '',
      time: '',
      // 奖金区间
      jjRegion: [0, 0],
      // 盈利区间
      ylRegion: [0, 0],
      // 亏损
      ksRegion: [0, 0],
      // 开奖期数
      qishu: 0,
      // 实际期数
      sjqs:[],
      // 开奖号码
      kjhm: [],

      // 和值遗漏
      hzyl:[],
      // 开奖号码遗漏
      hmyl:[],
      // 形态遗漏
      xtyl:[],

      //二同号分布遗漏
      t2yl:[],
      //二不同号分布遗漏
      bt2yl:[],
      // 统计
      tjType: ['出现次数', '平均遗漏', '最大遗漏', '最大连出'],

      // 当前tab页面
      currentTab: 0,
      // 上一次点击的tab页面
      prevTab: 0,

      // 计算出现次数
      calFre: [0, 0, 0, 0, 0, 0],

      // 计算平均遗漏
      calYlNum: [0, 0, 0, 0, 0, 0],

      // 计算最大遗漏
      calMaxYl: [0, 0, 0, 0, 0, 0],

      // 最大连出
      calMaxLc: [0, 0, 0, 0, 0, 0],

      // 线段
      sumLines: [],
      // 线段
      sumLines2: [],

      // 开奖数据
      kjData: [],
      // 冷热数据
      lrData: [],
      // 基本走势数据
      zsData: [],
      // 和值开奖数据
      hzkjData: [],
      // 形态开奖数据
      xtData: [],
      // 同号形态开奖数据
      thxtData: [],
      // 号码分布数据
      hmfbData: [],
      // 基本走势统计数据
      tjzsData: [],
      // 统计和值走势数据
      tjhzkjData: [],
      // 统计号码分布
      tjhmfbData: [],

      // 统计二不同号码分布
      bthmfbData: [],
      // 二不同号码
      bthm: [],
      issue: '', //当前期数
      nextIssue: '', //下一期
      periodsData: {},
      resultVO: {},
      tableData: [],
      showTime: '', //页面显示时间，分秒格式
      deadlineTime: '', //服务器当前期截止时间，时间戳
      remainingTime: '', //服务器返回的剩余时间
      closeTime: '',
      timeNum: '',
      totalTime: 600,
      timePercent: '0%',
      startX:0,
      startY:0
    }
  },
  methods: {
    ...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
    // 头部点击返回事件处理
    clickBack(value) {
      console.log('点击了返回按钮')
      this.$router.push({ path: `/quickThree${this.Id}` })
    },
    return_back() {
		this.$router.go(-1)
	},
    // 头部点击更多事件处理
    clickMore(value) {
      console.log('点击了更多按钮')
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.showConfirm = !this.showConfirm;
    },
    // 头部点击中间事件处理
    clickCenter(value) {
      console.log('点击了中间')
      this.showConfirm = false;
      this.Quick3Show = !this.Quick3Show;
      this.operation.centerAlertShow = !this.operation.centerAlertShow;
    },
    movements() {
      let params = {}
      params.gametype = this.gameType;
      let game =this.gameType;
 	  console.log(this.gameType)
 	  this.getImg = "src/assets/img/titleHeaderImg/"+game+".png";
      this.$api.heList(params).then(res => {

        console.log(res, "---this is LotteryInfo back data")
        this.issue = res.data.data.issue
        this.nextIssue = res.data.data.nextIssue
        this.periodsData = res.data
        this.resultVO = res.data.data.resultVO
        this.tableData = res.data.data.list

        let deadlineTime = res.data.data.closeTime; //服务器当前期截至时间
        let remainingTime = res.data.data.showTime; //服务器返回的剩余时间
        this.deadlineTime = deadlineTime;
        this.remainingTime = remainingTime;
        // 倒计时初始化显示
        // 倒计时初始化显示
        let timeNum = '';
        let nowTime = new Date().getTime(); //当前时间时间戳
        if (((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0) - this.remainingTime > 1) {
          timeNum = this.remainingTime;
        } else {
          timeNum = ((Number(deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
        }
        // 开始倒计时
        this.timeNum = timeNum
      //  this.calculateTheRemainingTime(timeNum)
      //  this.countDown()
        this.qishu = res.data.data.list.length
        this.checkedValue = this.qishu
        var data = res.data.data.list
        // this.kjhm
        for(var x in data){
          var hm = data[x]['lotteryNumber'].split('-').join('')
          var issue = data[x]['issue']
          this.kjhm.push(hm)
          this.sjqs.push(issue)
        }

        this.initData()

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
      let timeNum = '';
      let nowTime = new Date().getTime();
        if (((Number(this.deadlineTime) - Number(nowTime)) / 1000).toFixed(0) - this.remainingTime > 1) {
          timeNum = this.remainingTime;
        } else {
          timeNum = ((Number(this.deadlineTime) - Number(nowTime)) / 1000).toFixed(0);
        }
      var timeFun = setInterval(() => {
        
        timeNum--;
        this.remainingTime--;
        if(timeNum == 0) {
	        	clearInterval(timeFun)
	        	this.movements()
	       }
        this.calculateTheRemainingTime(timeNum)
      }, 1000)
    },
    ClickHezhi(e, data) {
      this.selectEvent(this.Quickform.hz.hm, data)
    },
    onCancel() {
      this.showConfirm = false
    },
    onConfirm() {
      this.showConfirm = false
      if (this.checkedValue) {
        this.renderDataForQs(this.checkedValue)
      }
      if (this.checkedXs == 1) {
          this.kjSxMethod(this.kjData, 1)
          this.kjSxMethod(this.thxtData, 1)
      } else if (this.checkedXs == 0) {
          this.kjSxMethod(this.kjData, 0)
          this.kjSxMethod(this.thxtData, 0)
      }
      if (this.checkedYl == 1) {
        this.isShowYl = true
      } else if (this.checkedYl == 0) {
        this.isShowYl = false
      }


    },
    // 三同号选择号码事件
    clickT3(e, data) {
      if (this.activeTx) {
        this.activeTx = false
        this.Quickform.t3.hm = []
      }
      this.selectEvent(this.Quickform.t3.hm, data)
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
      this.calYK(target)
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
      } else if (this.quick3TypeActive == '4') {
        pool = { type: '三不同号', data: this.Quickform.rt3 }
      } else if (this.quick3TypeActive == '5') {
        pool = { type: '二不同号', data: this.Quickform.rt2 }
      } else if (this.quick3TypeActive == '6') {
        pool = { type: '三个不同号胆拖', data: this.Quickform.dt3 }
      } else if (this.quick3TypeActive == '7') {
        pool = { type: '二个不同号胆拖', data: this.Quickform.dt2 }
      }

      if (pool.data.hm.length > 0) {
        if (dataPool.length > 0) {
          dataPool.unshift(pool)
        } else {
          dataPool.push(pool)
        }
      } else {

        this.showToast = true
        this.tipTxt = '至少选择一注'
        return
      }
      this.$router.push({ 'path': `/bets${this.Id}`, 'query': { 'data': dataPool } })
    },
    changeQuick3TypeActive(active) {
      if (active == 1) {
        this.calYK(this.Quickform.hz.hm)
      } else if (active == 2) {
        this.calYK(this.Quickform.t3.hm)
      } else if (active == 3) {
        this.calYK(this.Quickform.t2.hm)
      } else if (active == 4) {
        this.calYK(this.Quickform.rt3.hm)
      } else if (active == 5) {
        this.calYK(this.Quickform.rt2.hm)
      } else if (active == 6) {
        this.calYK(this.Quickform.dt3.hm)
      } else if (active == 7) {
        this.calYK(this.Quickform.dt2.hm)
      }

      this.quick3TypeActive = active;
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.operation.centerContentKey = Number(active);
      this.fadeLeaveActiveEnter = false;
      this.contentBoxTouchMove = 0;
      this.contentBoxTouchTop = 0;
      this.currentTab = 0
      this.prevTab = 0

    },
    noQuick3Show() {
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.showConfirm = false;
    },
    clickQuick3Type() {},
    clickRightAreaText() {
      this.Quick3Show = false;
      this.operation.centerAlertShow = false;
      this.showConfirm = true
    },
    contentScroll(ele, x, y) {
      if(ele){
        ele.scrollTop -= y
        ele.scrollLeft -= x
      }

    },
    onItemClick(current) {
      if(this.currentTab !== current){
        this.currentTab = current
      }
      this.nextClick()
    },

    // 和值走势
    nextClick(){
        this.$nextTick(()=>{
        // 和值走势图标绑定滚动事件
        if (this.currentTab === 2 && (this.quick3TypeActive == 1 || this.quick3TypeActive == 5 || this.quick3TypeActive == 7)) {

          if(this.quick3TypeActive == 5 || this.quick3TypeActive == 7){
            var _eventLayer = this.$refs.eventLayer2;
          }else{
            var _eventLayer = this.$refs.eventLayer;
          }
          if(this.quick3TypeActive == 1){
            var rightTable = this.$refs.rightTable.querySelectorAll('table')[0]
            var lineContainerSVG = this.$refs.lineContainerSVG
            var rightBound = rightTable.getBoundingClientRect()

            lineContainerSVG.style.width = rightTable.scrollWidth
            lineContainerSVG.style.height = rightTable.scrollHeight
            this.drawSumLine()
          }
        }
        })
    },

     touchstartMethod(e){
        this.startX = e.touches[0].pageX
        this.startY = e.touches[0].pageY
      },


     touchmoveMethod(e){
        e.stopPropagation()
        e.preventDefault()
        var moveEndX = e.changedTouches[0].pageX
        var moveEndY = e.changedTouches[0].pageY
        var scrollX = moveEndX - this.startX
        var scrollY = moveEndY - this.startY

        this.contentScroll(this.$refs['barContent'], scrollX, scrollY)
       this.contentScroll(this.$refs['leftTable'], scrollX, scrollY)


       this.contentScroll(this.$refs['rightTable2'], scrollX, scrollY)

       this.contentScroll(this.$refs['rightTable'], scrollX, scrollY)

       this.contentScroll(this.$refs['selectBottomNum'], scrollX, scrollY)

      },



    // 计算和值
    calSum(num) {
      var arrs = num.split('')
      var val = 0
      for (var x in arrs) {
        val += Number(arrs[x])
      }
      return val
    },
    // 判断和值
    juadgeCalSum(num, current) {
      var sum = this.calSum(this.kjhm[num])
      if (sum == current) {
        return sum
      } else {
        return ''
      }
    },

    // hm1:开奖号码
    // hm2:不同的号码
    calBtHm(hm1, bt2) {

      var hm1s = hm1.split('')
      var bthm = []
      for (var x in hm1s) {
        for (var y in hm1s) {
          if (x !== y) {
            var hm = hm1s[x].toString() + hm1s[y].toString()
            var hasVal = false
            for (var z in bthm) {
              var hm1 = hm.split('').sort().join()
              var hm2 = hm.split('').sort().join()
              if (hm1 == hm2) {
                hasVal = true
              }
            }

            if (!hasVal) {
              bthm.push(hm)
            }
          }
        }
      }
      var hasBt = false
      for (var x in bthm) {
        if (bthm[x] == bt2) {
          hasBt = bthm[x]
        }
      }
      if (!hasBt) {
        return ''
      } else {
        return hasBt
      }

    },
    // 判断数值大小
    // 小：和值小于等于10
    // 大：和值大于10
    calDx(num) {
      var val = this.calSum(num)
      if (val > 10) {
        return '大'
      } else {
        return '小'
      }
    },

    // 判断单双
    calDs(num) {
      var val = this.calSum(num)
      if (val % 2 === 0) {
        return '双'
      } else {
        return '单'
      }
    },

    // 计算跨度 最大值 减去 最小值
    calKd(num) {
      var arrs = num.split('')
      var temp = []
      for (var x in arrs) {
        temp.push(Number(arrs[x]))
      }
      temp = temp.sort()
      var val = 0
      var kd = Number(temp[temp.length - 1]) - Number(temp[0])
      return kd
    },








    // 计算开奖号码的和值是否和设定的值相等 返回true 否则返回false
    drawSumLine() {

      var eles = this.$refs.rightTable.querySelectorAll('.active')
      this.sumLines = []
      var lines = []
      for (var x = 0; x <= eles.length - 1; x++) {
        var bound = eles[x].getBoundingClientRect()
        if (x % 2 == 1 && x !== eles.length - 1) {
          var left = eles[x].offsetLeft + eles[x].parentElement.offsetLeft + bound.width
        } else {
          var left = eles[x].offsetLeft + eles[x].parentElement.offsetLeft
        }

        var top = eles[x].offsetTop + eles[x].parentElement.offsetTop + bound.height / 2
        var temp = [left, top, bound.width, bound.height]
        lines.push(temp)
      }

        this.sumLines = lines

    },

    // 计算开奖号码的冷热程序
    // 比如开奖号码的和值 在30期内出现几次 再50期内出现几次
    // 也就是计算频率
    // qs: 期数
    // val: 数值
    calKjFre(qs, val) {
      var index = 0
      for (var x in this.kjhm) {
        if (x < qs) {
          var sum1 = this.calSum(this.kjhm[x])
          var sum2 = val
          if (sum1 === sum2) {
            index++
          }
        }
      }
      return index
    },

    // 计算同号
    calTh(num, type) {
      var temp = this.uniq(this.kjhm[num])
      // 3个数字都一样 则三同号
      var th1 = '三同号'
      var th2 = '三不同'
      var th3 = '二同号'
      var th4 = '二不同'
      if (temp.length == 0 && type == th1) {
        return th1
      }
      // 3个数字都不一样 则三不同
      else if (temp.length == 3 && type == th2) {
        return th2
      }

      // 2个数字一样 则二同号
      else if (temp.length == 1 && type == th3) {
        return th3
      }

      // 2个数字不一样 则二不同
      else if (temp.length == 2 && type == th4) {
        return th4
      } else {
        // if(type == th1){
        //   return 'gray'+this.xtyl[num][0]
        // }else if(type == th2){
        //   return 'gray'+this.xtyl[num][1]
        // }else if(type == th3){
        //   return 'gray'+this.xtyl[num][2]
        // }else if(type == th4){
        //   return 'gray'+this.xtyl[num][3]
        // }
        return ''

      }

    },

    // 判断开奖号码属于什么形态
    calKjhmXt(num) {
      var temp = this.uniq(num)
      // 3个数字都一样 则三同号
      var th1 = '三同号'
      var th2 = '三不同'
      var th3 = '二同号'
      var th4 = '二不同'
      if (temp.length == 0) {
        return th1
      }
      // 3个数字都不一样 则三不同
      else if (temp.length == 3) {
        return th2
      }

      // 2个数字一样 则二同号
      else if (temp.length == 1) {
        return th3
      }

      // 2个数字不一样 则二不同
      else if (temp.length == 2) {
        return th4
      } else {
        return ''
      }
    },
    // 数组去重
    uniq(array) {
      var temp = []; //一个新的临时数组
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        }
      }
      return temp;
    },

    // 判断是否有相同的数字
    // num: 开奖号
    // current: 数字
    // 返回相同的数字数量
    calXtNum(num, current) {

      var temp = num.split('')
      var index = 0
      for (var x in temp) {
        if (temp[x] == current) {
          index++
        }
      }
      if (index >= 2) {
        return index
      } else {
        return false
      }
    },

    // 判断开奖号码中是否存在某个数
    // num: 开奖号码索引
    // index: 数字
    calKjForNum(num, index,current) {
      if (this.kjhm[num].indexOf(index) >= 0) {
        return index.toString()
      } else {
        return ''
      }
    },

    // 判断开奖号码是否存在2个相同的数字
    calXtxtHm(num, current) {
      var array = this.kjhm[num]
      var temp = []; //一个新的临时数组
      var repeat = []
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
          temp.push(array[i]);
        } else {
          repeat.push(array[i])
        }
      }
      if (repeat.length == 1) {
        if (repeat[0] == current) {
          return current.toString() + current.toString()
        } else {
          // return 'gray'+this.t2yl[num][current-1]
          return ''
        }
      } else {
        // return 'gray'+this.t2yl[num][current-1]
        return ''
      }
    },

    // 和值期号排序
    filterQh(event) {
      this.filterSort(event, this.kjData, 0)
    },

    // 冷热和值排序
    filterSum(event) {
      this.filterSort(event, this.lrData, 0)
    },
    // 冷热30期排序
    filterLr30(event) {
      this.filterSort(event, this.lrData, 1)
    },
    // 冷热50期排序
    filterLr50(event) {
      this.filterSort(event, this.lrData, 2)
    },
    // 冷热100期排序
    filterLr100(event) {
      this.filterSort(event, this.lrData, 3)
    },

    // 形态期号排序
    filterXt(event) {
      this.filterSort(event, this.thxtData, 0)
    },




    // 排序函数

    filterSort(event, data, index) {

      var ele = event.currentTarget.querySelector('.active')
      var className = ele.className
      if (className.indexOf("up active") >= 0) {
        data = data.sort(this.sortNumber(index))
        ele.className = 'up'
        event.currentTarget.querySelectorAll('img')[1].className = "active"
      } else {
        data = data.sort(this.sortReverNumber(index))
        event.currentTarget.querySelectorAll('img')[0].className = "up active"
        event.currentTarget.querySelectorAll('img')[1].className = " "
      }
    },

    // 从大到小
    sortNumber(index) {
      return function(a, b) {
        if (parseInt(a[index]) - parseInt(b[index]) < 0) {
          return 1
        } else {
          return -1
        }
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

    // 顺序
    kjSxMethod(data, type) {
      if (type == 0) {
        data = data.sort(this.sortNumber(0))
      } else {
        data = data.sort(this.sortReverNumber(0))
      }
    },


    // 构建开奖数据
    createKjData(qs) {
      this.kjData = []
      for (var x = 0; x < qs; x++) {
        var data = []
        // 期数

        var qishu = this.sjqs[x]

        data.push(qishu)
        // 开奖号码
        data.push(this.kjhm[x])
        // 和值
        data.push(this.calSum(this.kjhm[x]))
        // 大小
        data.push(this.calDx(this.kjhm[x]))
        // 单双
        data.push(this.calDs(this.kjhm[x]))
        this.kjData.push(data)
      }
      // this.$set(this.$data,'kjData',this.kjData);

    },

    // 构建冷热数据
    createLrData(qs) {
      this.lrData = []
      for (var x = 3; x <= 18; x++) {x
        var data = []
        // 和值
        data.push(x)
        data.push(this.calKjFre(30, x))
        data.push(this.calKjFre(50, x))
        data.push(this.calKjFre(100,x))
        data.push('--')
        this.lrData.push(data)
      }
    },

    // 构建走势数据
    createZsData(qs) {
      this.zsData = []
      for (var x = 0; x < qs; x++) {
        var data = []
        // 期数
        var qishu = this.sjqs[x]
        data.push(qishu)
        // 开奖号
        data.push(this.kjhm[x])
        // 和值
        data.push(this.calSum(this.kjhm[x]))
        // 跨度
        data.push(this.calKd(this.kjhm[x]))
        // 开奖号码1
        data.push(this.calKjForNum(x, 1,4))
        // 开奖号码2
        data.push(this.calKjForNum(x, 2,5))
        // 开奖号码3
        data.push(this.calKjForNum(x, 3,6))
        // 开奖号码4
        data.push(this.calKjForNum(x, 4,7))

        // 开奖号码5
        data.push(this.calKjForNum(x, 5,8))
        // 开奖号码6
        data.push(this.calKjForNum(x, 6,9))

        this.zsData.push(data)
      }

    },

    // 创建和值开奖数据

    createHzkjData(qs) {
      this.hzkjData = []
      for (var x = 0; x < qs; x++) {
        var data = []
        // 期数
        // var qishu = (x+1)<10?'0'+(x+1)+'期':(x+1)+'期'
        // data.push(qishu)
        // 和值

        for (var y = 0; y < 16; y++) {
          data.push(this.juadgeCalSum(x, y + 3))
        }

        this.hzkjData.push(data)
      }

    },


    // 创建二不同号号码分布
    createBthmfbData(qs) {
      this.bthmfbData = []
      this.bthm = []

      for (var x = 1; x <= 6; x++) {

        for (var y = 1; y <= 6; y++) {
          // 判断是否已经存在

          if (x !== y) {
            var temp = x.toString()
            temp += y.toString()
            var hasVal = false
            for (var z in this.bthm) {

              var hm1 = this.bthm[z].split('').sort().join()
              var hm2 = temp.split('').sort().join()

              if (hm1 == hm2) {
                hasVal = true
              }
            }
            if (!hasVal) {
              this.bthm.push(temp)
            }
          }
        }
      }




      for (var x = 0; x < qs; x++) {
        var data = []
        for (var y = 0; y < this.bthm.length; y++) {
          data.push(this.calBtHm(this.kjhm[x], this.bthm[y]))
        }
        this.bthmfbData.push(data)
      }


    },

    // 创建形态数据
    createXtData(qs) {
      this.xtData = []
      for (var x = 0; x < qs; x++) {
        var data = []
        // 期数
        var qishu = this.sjqs[x]
        data.push(qishu)
        // 开奖号
        data.push(this.kjhm[x])

        // 三同号
        data.push(this.calTh(x, '三同号'))

        // 三不同
        data.push(this.calTh(x, '三不同'))

        // 二同号
        data.push(this.calTh(x, '二同号'))

        // 二不同
        data.push(this.calTh(x, '二不同'))

        this.xtData.push(data)

      }
    },

    // 创建同号形态开奖数据
    createthxtData(qs) {
      this.thxtData = []
      for (var x = 0; x < qs; x++) {
        var data = []
        // 期数
        var qishu = this.sjqs[x]

        data.push(qishu)
        // 开奖号码
        data.push(this.kjhm[x])
        // 形态
        data.push(this.calKjhmXt(this.kjhm[x]))

        this.thxtData.push(data)
      }
    },




    // 创建号码分布数据

    createhmfbData(qs) {
      this.hmfbData = []
      for (var x = 0; x < qs; x++) {
        var data = []
        // 期数
        var qishu = this.sjqs[x]
        data.push(qishu)
        // 开奖号
        data.push(this.kjhm[x])
        // 开奖号码1
        data.push(this.calXtxtHm(x, 1))
        // 开奖号码2
        data.push(this.calXtxtHm(x, 2))
        // 开奖号码3
        data.push(this.calXtxtHm(x, 3))
        // 开奖号码4
        data.push(this.calXtxtHm(x, 4))
        // 开奖号码5
        data.push(this.calXtxtHm(x, 5))
        // 开奖号码6
        data.push(this.calXtxtHm(x, 6))

        this.hmfbData.push(data)
      }
    },

    // 根据期数显示数据
    // qs: 期数
    renderDataForQs(qs) {
      if (qs < this.sjqs.length) {
        this.qishu = qs
      }else{
        this.qishu = this.sjqs.length-1
      }
      this.initData()
      this.nextClick()
    },

    // 统计基本走势数据
    tjMethod(data, col, row) {

      var newData = this.filterTjData(data, col, row)
      var tjData = []
      // 计算出现次数
      var fre = []
      // 计算平均遗漏
      var ylme = []
      // 计算最大遗漏
      var maxyl = []
      // 计算最大练出
      var maxlc = []

      for (var x in newData) {

        // 计算出现次数
        var index = this.calDataFre(newData[x])
        fre.push(index)
        // 计算平均遗漏和最大遗漏
        var yl = this.calAverYl(newData[x])
        ylme.push(yl[0])
        maxyl.push(yl[1])

        var lc = this.calMaxLcMethod(newData[x])
        maxlc.push(lc)

      }
      tjData.push(fre)
      tjData.push(ylme)
      tjData.push(maxyl)
      tjData.push(maxlc)

      return tjData



      // 出现次数
      // for(var x in data){
      //   var freData = ['出现次数',]
      // }

    },

    // 统计计算遗漏
    tjylData(data, col, row){

      var newData = this.filterTjData(data, col, row)
      var datatemp = []
      for (var x in newData) {
        // 计算平均遗漏和最大遗漏
        var yl = this.calTjyl(newData[x])
        datatemp.push(yl)
      }

      // 对数据进行翻转X-Y Y-X
      var news=[]
      // 改成横向数据
      for (var x = 0; x < data.length; x++) {
        var temp = []
        for(var y=0;y<row;y++){
          temp.push(datatemp[y][x])
        }
        news.push(temp)
      }
      return news
    },

    calTjyl(data){
      // var yl = 0
      // var yls = []
      // for (var x in data) {
      //   if (!data[x]) {
      //     yls.push(1)
      //     yl++
      //   } else {
      //     yls.push(yl)
      //     yl = 0
      //   }
      // }
      // return yls
      // 取一个数 跟之前的数字比 如果相同遗漏加1 如果不同则退出比较
      var yls = []
      for (var x in data) {
        var target = data[x]
        if(x!==0 && !target){
          var yl = 1
          for(var y=x-1;y>=0;y--){
            if(data[y] == target){
              yl++
            }else{
              break
            }
          }
          yls.push(yl)
        }else{
          yls.push(0)
        }
      }
      return yls

    },

    // 过滤出统计数据
    filterTjData(data, col, row) {

      // 过滤出需要进行统计的数据
      var newData = []
      for (var x in data) {
        var temp = []
        for (var y in data[x]) {
          if (y > col - 1) {
            temp.push(data[x][y])
          }
        }
        newData.push(temp)
      }

      var tjData = []
      // 改成横向数据
      for (var y = 0; y < row; y++) {
        var temp = []
        for (var x in newData) {
          if(newData[x][y]){
            if(newData[x][y].toString().indexOf('gray')>=0){
              newData[x][y] = ''
            }
          }

          temp.push(newData[x][y])
        }
        tjData.push(temp)
      }

      return tjData

    },

    // 计算出现次数
    calDataFre(data) {
      var index = 0
      for (var x in data) {
        if (data[x]) {
          index++
        }
      }
      return index
    },

    // 计算平均遗漏 和 最大遗漏
    calAverYl(data) {
      var yl = 0
      var yls = []
      for (var x in data) {
        if (!data[x]) {
          yl++
        } else {
          yls.push(yl)
          yl = 0
        }
      }
      if (yl !== 0) {
        yls.push(yl)
      }

      // 计算平均遗留
      var temp = 0
      for (var x in yls) {
        temp += yls[x]
      }
      var numCeil = Math.ceil(temp / yls.length)

      var 计算最大遗漏
      yls = yls.sort()

      return [numCeil, yls[yls.length - 1]]
    },

    // 计算最大连出
    calMaxLcMethod(data) {
      var yl = 0
      var yls = []
      for (var x in data) {
        if (data[x]) {
          yl++
        } else {
          if (yl >= 2) {
            yls.push(yl)
          } else {
            yls.push(0)
          }
          yl = 0
        }
      }
      if (yl >= 2) {
        yls.push(yl)
      }

      var maxyls = yls.sort()[yls.length - 1]
      return maxyls
    },

    // 构建和值遗漏
    createEmptyArray(row,col){
      var newArray = []
      for(var x=0;x<row;x++){
        var temp = []
        for(var y=0;y<col;y++){
          temp.push('')
        }
        newArray.push(temp)
      }
      return newArray
    },


    initData() {

      this.hzyl = this.createEmptyArray(this.qishu,16)
      this.hmyl = this.createEmptyArray(this.qishu,6)
      this.xtyl = this.createEmptyArray(this.qishu,4)
      this.t2yl = this.createEmptyArray(this.qishu,6)
      this.bt2yl = this.createEmptyArray(this.qishu,15)



      this.createKjData(this.qishu)
      this.createLrData(this.qishu)
      this.createZsData(this.qishu)
      this.createHzkjData(this.qishu)
      this.createXtData(this.qishu)
      this.createthxtData(this.qishu)
      this.createhmfbData(this.qishu)
      this.createBthmfbData(this.qishu)

      // 统计基本走势数据
      this.tjzsData = this.tjMethod(this.zsData, 4, 6)

      // 统计和值走势数据
      this.tjhzkjData = this.tjMethod(this.hzkjData, 0, 16)

      // 统计号码分布
      this.tjhmfbData = this.tjMethod(this.hmfbData, 2, 6)

      // 统计号码分布
      this.tjbthmfbData = this.tjMethod(this.bthmfbData, 0, 15)

      //号码遗漏数据
      this.hmyl = this.tjylData(this.zsData, 4, 6)

      // 和值遗漏数据
      this.hzyl = this.tjylData(this.hzkjData, 0, 16)
      // 形态遗漏数据
      this.xtyl = this.tjylData(this.xtData, 2, 4)
      // 二同号分布遗漏
      this.t2yl = this.tjylData(this.hmfbData, 2, 6)
      // 二不同号分布遗漏
      this.bt2yl = this.tjylData(this.bthmfbData, 0, 15)


    },
    // 计算奖金和盈利
    calYK(data) {

      this.zhu = data.length
      this.money = this.zhu * 2
      if (data.length == 0) {
        this.jjRegion = [0, 0]
        this.ylRegion = [0, 0]
        return
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

        if (this.quick3TypeActive == '5' && data.length >= 3) {
          var end = Number(data[data.length - 1]['jj']) * 3
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
    // 跳转到走势图
    goTrend(){

    }
  },
  created() {
    this.Id = this.$route.params.Id;
    this.movements()
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
    if(this.$route.query.hasOwnProperty('active')){
      var tab = this.$route.query.tab
      this.quick3TypeActive = this.$route.query.active
      if(tab == 1){
        if(this.quick3TypeActive == 1){
          this.currentTab = 2
          setTimeout(()=>{
            this.nextClick()
          },1000)
        }else {
          this.currentTab = 1
        }
      }else{
        this.currentTab = 0
      }


    }
    // 统计
//     this.calCs()
//     this.calYl()
//     this.calLc()
  }
}

</script>
<style lang="less">
.dialog-title {
  display: flex;
  border-bottom: 1px solid #dbdbdb;
  padding: 30px 40px;
  color: #555;
  justify-content: space-between;
  font-size: 32px;

  .icon-shezhi {
    margin-right: 10px;
  }

  .right {
    color: #86a4d3;
  }
}

.dialog-content {
  padding: 40px 40px;
  font-size: 32px;

  .item {
    display: flex;

    ul {
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      li {
        width: 50%;
        text-align: left;
        margin-bottom: 20px;
      }

      .tip {
        width: 100%;
        color: #666;
        font-size: 28px;
      }
    }

    .text {
      display: block;
      white-space: nowrap;
    }
  }

  .btn-box {
    display: flex;
    justify-content: space-between;

    button {
      width: 260px;
      box-sizing: border-box;
      text-align: center;
      border-radius: 10px;
      color: #fff;
      font-size: 32px;
      padding:10px  0px;
      &.cancel {
        background-color: #fff;
        border: 1pt solid #c8c8c8;
        color: #000;
      }

      &.confirm {
        background-color: #d7303c;
        border: 1pt solid #d7303c;
      }
    }
  }

}
.trend_head{
	width: 96%;
	height: 100px;
	padding-left: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	z-index: 99;
	background: url(../../../assets/img/k3_bbg2.png)no-repeat;
	background-size: 100%;
	span{
		box-sizing:border-box;
		width: 200px;
		height:100px;
		padding-top: 25px;
	}
	img{
		width: 25px;
		height: 40px;
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
  z-index: 5;
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



table {
  border-spacing: 0px;
  border-collapse: collapse;
}

table {

  td.even,
  tr.even {
    background-color: rgb(45, 101, 73, 0.5);
  }
}

.tj1 {
  color: rgb(152, 135, 174);
}

.tj2 {
  color: rgb(150, 204, 147);
}

.tj3 {
  color: rgb(162, 174, 142);
}

.tj4 {
  color: rgb(107, 159, 165);
}

.fix-table {

  position: relative;
  flex: 1;
  color: #c4edd5;
  overflow: hidden;

  .table-header {
    display: flex;
  }
  .table-content {
    height: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    position: relative;
    top: -60px;
  }
  .table-content .left-table {
    display: flex;
    flex-direction: column;
    border-bottom: 1pt solid #589073;

    .bar-table {
      width: 100%;
      border-spacing: 0px;
      border-collapse: collapse;
    }

    &.col-table {
      width: 280px;
    }
  }

  .table-content .right-table {
    border-bottom: 1pt solid #589073;
    td {
      span.gray {
        color: #ababab;
      }
    }
  }

  .table-header .bar,
  .table-content .left-table .bar {
    width: 140px;
    height: 60px;
    line-height: 60px;
    border: 1pt solid #589073;
    border-bottom: 0px;
    text-align: center;
    box-sizing: border-box;

    &.even {
      background-color: rgb(45, 101, 73, 0.5);
    }
  }

  .bar-content,
  .table-content .right-table {
    overflow: auto;
    white-space: nowrap;
    flex: 1;
    position: relative;
  }

  .table-content .left-table td {
    width: 50%;
    height: 59px;
    line-height: 59px;
    border: 1pt solid #589073;
    box-sizing: border-box;
  }

  .table-header td,
  .table-content .right-table td {
    width: 60px;
    height: 60px;
    line-height: 60px;
    padding: 0px;
    border-right: 1pt solid #589073;
    border-top: 1pt solid #589073;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
  }

  .table-content {
    display: flex;
  }

  .right-table {
    flex: 1;

    span.active {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 45px;
      text-align: center;
      background-color: rgba(186, 186, 54, 0.5);
    }
  }

  .table-content .left-table,
  .table-content .right-table {
    overflow: auto;
  }

  .eventLayer {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    overflow: auto;
  }

  .lineContainerSVG {
    position: absolute;
    z-index: 1;
  }

}

.trend-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  padding-top: 94px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: url('/static/img/bj.9034ba3.png') repeat;

  .vux-tab-wrap {
    padding-top: 0px;
  }

  .vux-tab-wrap,
  .vux-tab-container,
  .vux-tab {
    height: 90px;
  }

  .vux-tab-wrap {
    display: none;

    &.show {
      display: block;
    }
  }

  .vux-tab {
    background-color: transparent;

    .vux-tab-item {
      color: #c4edd5;
      font-size: 28px;
      padding: 24px 0px;
    }

    .vux-tab-item.vux-tab-selected {
      color: #ccbf6c;
    }

    .vux-tab-ink-bar {
      background-color: #ccbf6c;
    }
  }
}

.normal-table {
  flex: 1;
  display: flex;
  flex-direction: column;

  .thead {
    height: 69px;
    width: 100%;
  }

  .tbody {
    flex: 1;
    overflow: auto;
  }

  table {
    width: 100%;
    color: #c4edd5;

    td {
      border: 1px solid #589073;
      text-align: center;
      padding: 15px 0px;
      span.gray {
        color: #ababab;
      }
      span.active,
      span.rect {
        border-radius: 50%;
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 45px;
        text-align: center;
        color: #fff;
        background-color: rgba(186, 186, 54, 1);
        position: relative;
      }

      span.rect {
        border-radius: 0px;
        background-color: rgba(186, 186, 54, 0.8);
      }

      span.enable1 {
        display: inline-block;
        padding: 5px 5px;
        background-color: rgba(97, 135, 57, 1);
        color: #fff;
      }

      span.enable2 {
        display: inline-block;
        padding: 5px 10px;
        background-color: rgba(42, 147, 89, 1);
        color: #fff;
      }

      span.enable3 {
        display: inline-block;
        padding: 5px 10px;
        background-color: rgba(159, 122, 60, 1);
        color: #fff;
      }

      span.enable4 {
        display: inline-block;
        padding: 5px 10px;
        background-color: rgba(155, 151, 51, 1);
        color: #fff;
      }

      .badge {
        display: block;
        position: absolute;
        color: #000;
        top: -20px;
        right: -10px;
      }

      .filter-arrow {
        display: inline-block;
        vertical-align: middle;

        .up {
          transform: rotate(180deg);
          margin-bottom: 10px;
        }

        img {
          width: 13px;
          display: block;
          opacity: 0.5;

          &.active {
            opacity: 1;
          }
        }

      }
    }
  }
}

.radio-beauty-container {
  font-size: 0;

  label {
    display: block;
  }

  .radio-name {
    vertical-align: middle;
    font-size: 32px;
    position: relative;
    top: 2px;
  }

  .radio-beauty {
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid green;
    vertical-align: middle;
    margin: 0 15px 0 3px;
    border-radius: 50%;

    &:hover {
      box-shadow: 0 0 7px green;
      padding: 2px;
      background-color: green;
      background-clip: content-box;
    }
  }

  input[type="radio"]:checked+.radio-beauty {
    padding: 10px;
    background-color: green;
    background-clip: content-box;
  }
}

.select-num {
	display: none!important;
  display: flex;
  height: 120px;
  background: url(../../../assets/img/k3_bbg2_rever.png);
  align-items: center;
  padding: 0px 0px 0px 32px;

  .timeBox {
    width: 100%;
    text-align: center;
    font-size: 28px;
    color: #fff;

    .time {
      color: yellow;
    }
  }

  .left-text {
    margin-top: 10px;
    font-size: 28px;

    .txt1 {
      color: #9e9f9c;
      text-align: center;
    }

    .txt2 {
      color: #5c5c5c;
      text-align: center;
    }

  }

  .right-text {
    flex: 1;
    white-space: nowrap;
    margin-top: 10px;
    margin-left: 10px;
    overflow: auto;

    span {
      display: inline-block;
      width: 50px;
      height: 58px;
      line-height: 58px;
      font-size: 28px;
      border: 3px solid #585b5a;
      text-align: center;
      color: #fff;
      border-radius: 10px;
      margin: 0px 10px;

      &.active {
        border-color: #f0c930;
        color: #f0c930;
      }
    }
  }
}

.select-tip {
	display: none!important;
  height: 140px;
  background: url(../../../assets/img/k3_bbg2_rever.png);
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  color: #fff;
  align-items: center;
  padding: 0px 32px;

  button {
    background-color: #f6be30;
    color: #640b38;
    padding: 14px;
    font-size: 32px;
    border-radius: 5px;
  }

  .money1 {
    color: #a83e5d;
  }
}

</style>
