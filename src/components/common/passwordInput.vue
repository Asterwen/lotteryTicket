<template>
  <div class="passwordBox">
    <popup v-model="showPasswordInputKey" @on-hide="closePasswordInput(false)">
      <div class="inputBox">
        <p>
          <span v-for="(it,ke) in maxNum" :key="ke"><i v-if="passwordArr.length>ke">*</i></span>
        </p>
      </div>
      <ul class="keyboardBox">
        <li v-for="(item,key) in keyboardArr" :key="key" v-html="item" @click="clickKeyboard(item)"></li>
      </ul>
    </popup>
  </div>
</template>
<script>
import { PopupHeader, Popup } from 'vux'
import Bus from './bus.js'
export default {
  components: {
    PopupHeader,
    Popup
  },
  props: ['showKey'],
  data() {
    return {
      showPasswordInputKey: false,//是否显示密码输入弹层
      passwordNum: 0,
      passwordArr: [],//输入的密码
      maxNum: 4,//密码最大输入位数
      keyboardArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, '删除', 0, '确定'],//键盘显示数字
    }
  },
  created() {},
  methods: {
    // 点击键盘
    clickKeyboard(item) {
      if (item == '确定') {
        this.showPasswordInputKey = false;
        if (this.passwordArr.length < this.maxNum) {
          return;
        }
        this.$emit('backFun', this.passwordArr.join(','))
      } else if (item == '删除') {
        this.passwordArr.pop()
      } else {
        if (this.passwordArr.length >= this.maxNum) {
          alert("最多输入四位密码")
        } else {
          this.passwordArr.push(item)
        }

      }
    },
    // 键盘初始化
    closePasswordInput(key) {
      this.passwordNum = 0;
      this.passwordArr = [];
      this.showPasswordInputKey = key;
    }
  },
  mounted: function() {
    var vm = this;
    Bus.$on('showKey', (data) => {
      vm.showPasswordInputKey = data
    })
  },
}

</script>
<style>
.passwordBox .inputBox {
  padding: 44px 0;
  background: #FCFCFC;
}

.passwordBox .inputBox p {
  background: #FCFCFC;
  height: auto;
  text-align: center;
  padding: 10px 0;
}

.passwordBox .inputBox p span {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 50px;
  text-align: center;
  line-height: 50px;
  border-bottom: 4px solid #999;
  overflow: hidden;
}

.passwordBox .keyboardBox {
  padding: 20px;
  background: #D2D5DC;
  overflow: hidden;
}

.passwordBox .keyboardBox li {
  float: left;
  background: #FCFCFC;
  width: 221px;
  height: 90px;
  border-radius: 5px;
  margin: 7px;
  cursor: pointer;
  text-align: center;
  line-height: 90px;
  color: #000;
  font-size: 36px;
  box-shadow: 2px 2px 2px #A3A5A4;
}

</style>
