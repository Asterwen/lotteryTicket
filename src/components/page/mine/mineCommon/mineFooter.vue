<template>
  <div class="mineFooterBox">
    <tabbar>
      <tabbar-item @on-item-click="clickItem">
        <span slot="label">{{text}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
import Bus from '../../../common/bus.js'
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  props: ['btnText', 'clickBox'],
  data() {
    return {
      text: '确定'
    }
  },
  methods: {
    clickItem() {
      Bus.$emit('showKey', true)
      if (this.clickBox) {
        this.clickBox()
      }
    }
  },
  created() {
    if (this.btnText) {
      this.text = this.btnText;
    }
  }
}

</script>
<style>
.mineFooterBox .weui-tabbar {
  background-color: #d91d37;
  height: 88px;
  position: fixed;

}

.mineFooterBox .weui-tabbar .weui-tabbar__item.vux-tabbar-simple .weui-tabbar__label {
  height: 88px;
  font-size: 36px;
  line-height: 88px;
  color: #fff;
}

</style>
