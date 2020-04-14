<template>
	<!-- vue滑动测试 -->
	<div class="textBox">
		<div class="back" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd" ref="back">
			<div class="back-l" ref="left"></div>
			<div class="back-r" ref="right"></div>
		</div>
		<div class="box">
			<div class="numberBox" @touchstart.prevent="start" @touchmove.prevent="move" @touchend="end" ref="numberBox" :style="'top:'+topNum+'px'">
				<span @click.stop="clickTop">点击这里</span>
				<p v-for="(item,key) in 8" :key="key" :style="'background:rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')'">{{key}}</p>
			</div>
			<table>
				<thead>
					<tr>
						<th>01</th>
						<th>02</th>
						<th>03</th>
						<th>04</th>
						<th>05</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
					</tr>
					<tr>
						<td>1</td>
						<td>2</td>
						<td>3</td>
						<td>4</td>
						<td>5</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		data() {
			return {
				currentPlay: 'red',
				percent: 0,
				deltaY: 0,
				newTouch: {},
				topNum: 0,
			}
		},
		created() {
			this.touch = {}
			// console.log(window.innerWidth)
		},
		methods: {
			...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
			clickTop() {
				if (this.topNum == 0) {
					this.topNum = 200;
				} else {
					this.topNum = 0;
				}
			},
			touchStart(e) {
				const touch = e.touches[0]
				// console.log(touch, '---this is touch')
				this.touch.startX = touch.pageX
				this.touch.startY = touch.pageY
			},

			touchMove(e) {
				// console.log("move");
				const touch = e.touches[0];
				//横向和纵向偏离位置
				const deltaX = touch.pageX - this.touch.startX
				const deltaY = touch.pageY - this.touch.startY
				if (Math.abs(deltaY) > Math.abs(deltaX)) {
					return
				}
				const left = this.currentPlay == 'red' ? 0 : -window.innerWidth
				var offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
				//记录滑动的距离占屏幕宽度的百分比，如果滑动太少则不切换
				this.percent = Math.abs(offsetWidth / window.innerWidth)
				//移动红黄块
				this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
				//设置动画时间      
				this.$refs.back.style["transitionDuration"] = 10
			},
			touchEnd() {
				// console.log("end");
				// console.log(this.percent, '----this is his.percent');
				let offsetWidth
				let percent
				//当前为红色，滑动占比大于0.1则切换，否则回到原位置
				if (this.currentPlay === 'red') {
					if (this.percent > 0.1) {
						this.currentPlay = 'yellow'
						offsetWidth = -window.innerWidth
					} else {
						offsetWidth = 0
					}
				} else {
					//当前为黄色，滑动占比大于0.9则切换，否则回到原位置
					if (this.percent < 0.9) {
						this.currentPlay = 'red'
						offsetWidth = 0
					} else {
						offsetWidth = -window.innerWidth
					}
				}
				//这里的transform是针对最开始的位置而言，而不是移动过程中的位置
				this.$refs.back.style["transform"] = `translate3d(${offsetWidth}px,0,0)`
				this.$refs.back.style["transitionDuration"] = 10
			},
			start(e) {
				const touch = e.touches[0];
				// console.log(touch, '---this is touch');
				this.newTouch.startX = touch.pageX;
				this.newTouch.startY = touch.pageY;
				// console.log(this.newTouch, "---这是开始前参数")
			},
			move(e) {
				// console.log("move");
				const touch = e.touches[0];
				//横向和纵向偏离位置
				let deltaY = touch.pageY - this.newTouch.startY;
				// console.log(deltaY, this.topNum, "---y轴偏移量")
				this.deltaY = deltaY;
				if (this.topNum >= 204 && deltaY > 30) {
					deltaY = 30;
				}
				this.$refs.numberBox.style["transform"] = 'translateY(' + deltaY + 'px)';
				this.$refs.numberBox.style["transitionDuration"] = 10;
			},
			end(e) {
				if (Math.abs(this.deltaY) < 50) {
					this.topNum = this.topNum;
				} else {
					if (this.deltaY > 0) {
						this.topNum += 200;
					} else if (this.deltaY < 0) {
						this.topNum -= 200;
					}
				}
				if (this.topNum < 0) {
					this.topNum = 0;
				}
				if (this.topNum > 400) {
					this.topNum = 400;
				}
				this.$refs.numberBox.style["transform"] = 'translateY(0)';
				this.$refs.numberBox.style["transitionDuration"] = 10
			},
			contentTouchstart(e) {
				this.fadeLeaveActiveEnter = true;
				this.contentBoxTouchStart = e.touches[0].clientY;
				this.contentBoxTouchMove = this.contentBoxTouchTop;
			},
			contentTouchmove(e) {
				if ((e.touches[0].clientY - this.contentBoxTouchStart) > 0 && (e.touches[0].clientY - this.contentBoxTouchStart) <
					(546 / (375 / window.innerWidth) / 2 + (60 / (375 / window.innerWidth)) / 2)) {
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
				} else if ((this.contentBoxTouchTop > (546 / (375 / window.innerWidth) / 8) && this.contentBoxTouchTop < (546 / (
						375 / window.innerWidth) / 4)) || (this.contentBoxTouchTop > (546 / (375 / window.innerWidth) / 4) && this.contentBoxTouchTop <
						((546 / (375 / window.innerWidth) / 4) + (546 / (375 / window.innerWidth) / 8)))) {
					this.contentBoxTouchTop = (546 / (375 / window.innerWidth) / 4);
					this.contentBoxTouchMove = this.contentBoxTouchTop;
				} else if ((this.contentBoxTouchTop > ((546 / (375 / window.innerWidth) / 4) + (546 / (375 / window.innerWidth) / 8)) &&
						this.contentBoxTouchTop < (546 / (375 / window.innerWidth) / 2)) || (this.contentBoxTouchTop > (546 / (375 /
						window.innerWidth) / 2))) {
					this.contentBoxTouchTop = (546 / (375 / window.innerWidth) / 2);
					this.contentBoxTouchMove = this.contentBoxTouchTop;
				}
			},

		},
		mounted() {
			// 设置公共头部
			this.setPublicHeaderStatus({
				isShow: true, //是否显示公共头部
				backgroundClass: 'bgColorRed', //背景样式class名，bgImg：快三背景图；bgColorRed：红色背景；bgColorBlack：黑色背景
				leftShow: false, //左侧区域是否显示
				leftShowType: 'icon', //icon：默认返回小箭头图标；text：默认文字“返回”；other：在content中写入要输入的内容
				leftContent: '', //showType为other时，要在左侧显示的内容
				centerShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；
				centerContent: '测试页面', //中间区域内容
				centerContentClass: 'titleHeaderImg', //中间区域样式类名
				rightShow: false, //右侧区域是否显示
				rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
				rightContent: '', //要在右侧显示的内容
				rightContentClass: '', //右侧内容样式类名
				rightTumpLink: '', //点击右侧跳转链接
			});
			// 设置公共底部
			this.setBottomNavigation({
				activeNum: 0, //当前选中的底部导航下标
				show: false, //是否显示底部导航
			});
		},
	}
</script>
<style>
	.textBox .box {
		width: 100%;
		height: 900px;
		background: pink;
		position: relative;
	}

	.textBox .box>p {
		line-height: 200%;
		text-align: center;
		font-size: 30px;
	}

	.textBox .numberBox {
		height: auto;
		width: 100%;
		position: absolute;
		top: 60px;
		left: 0;
		transition: all 0.5s ease-out;
	}

	.textBox .numberBox span {
		display: inline-block;
		height: 60px;
		width: 100%;
		text-align: center;
		color: #fff;
		background: #000;
		line-height: 60px;
	}

	.textBox .numberBox p {
		line-height: 300%;
		text-align: center;
		font-size: 30px;
	}

	.textBox table {
		width: 100%;
	}

	.textBox th,
	.textBox td {
		text-align: center;
		line-height: 300%;
		border: 1px solid #000;
	}
</style>
<style scoped>
	.textBox .back {
		position: fixed;
		top: 1100px;
		width: 100%;
		height: 100px;
		white-space: nowrap;
	}

	.textBox .back-l {
		position: relative;
		display: inline-block;
		width: 100%;
		height: 100%;
		background-color: red;
	}

	.textBox .back-r {
		display: inline-block;
		position: relative;
		width: 100%;
		height: 100%;
		background-color: yellow;
	}
</style>
