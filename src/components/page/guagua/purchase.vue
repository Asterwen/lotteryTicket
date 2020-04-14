<template>
	<div class="purchase">
		<div class="purchase_nav">
			<p>
				<img src="../../../assets/image/toux2.png" />
				<span>{{objuser.nickName}}</span>
				<span v-if="objuser.nickName!=''">游客</span>
			</p>
			<p>余额：{{objuser.withDrawBalance}}</p>
		</div>
		<div class="purchase_banner">
			<img src="../../../assets/image/banner.png" />
		</div>
		<ul class="purchase_main">
			<li>
				<img src="../../../assets/image/WechatIMG14.png" />
				<div>
					<p>招财金猪</p>
					<p>最高奖金 1 万元</p>
					<p>面值 {{money1}} 元</p>
				</div>
				<div>
					<img src="../../../assets/image/goumai1.png" @click="sublimt('5')" />
					<p>所剩 {{five}} 张没刮</p>
				</div>
			</li>
			<li>
				<img src="../../../assets/image/WechatIMG18.png" />
				<div>
					<p>中国红</p>
					<p>最高奖金 10 万元</p>
					<p>面值 {{money2}} 元</p>
				</div>
				<div>
					<img src="../../../assets/image/goumai3.png" @click="sublimt('10')" />
					<p>所剩 {{ten}} 张没刮</p>
				</div>
			</li>
			<li>
				<img src="../../../assets/image/WechatIMG17.png" />
				<div>
					<p>甜蜜蜜</p>
					<p>最高奖金 25 万元</p>
					<p>面值 {{money3}} 元</p>
				</div>
				<div>
					<img src="../../../assets/image/goumai2.png" @click="sublimt('20')" />
					<p>所剩 {{twenty}} 张没刮</p>
				</div>
			</li>
		</ul>
		<div class="purchase_Mask" v-show="isFlag">
			<div class="Mask">
				<div class="Mask_one">
					<img src="../../../assets/image/WechatIMG14.png" />
					<p>选择购买数量</p>
					<img src="../../../assets/image/guanbi.png" class="clone" @click="clone()" />
				</div>
				<div class="Mask_two">
					<div class="Numbe">
						<img src="../../../assets/image/jian.png" @click="handleChangeone()" />
						<input type="number" :value="reHinput" />
						<img src="../../../assets/image/jia.png" @click="handleChangetwo()" />
					</div>
					<ul class="reHList">
						<li @click="reActive($event)">10</li>
						<li @click="reActive($event)">50</li>
						<li @click="reActive($event)">100</li>
					</ul>
					<p>总价：{{money4}}元</p>
				</div>
				<div class="Mask_three">
					<p>余额{{objuser.withDrawBalance}}&nbsp;&nbsp;
						<a @click="clickRecharge()">去充值</a>
					</p>
					<img src="../../../assets/image/lijigm.png" @click="purchase()" />
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'Scratchmusic',
		data() {
			return {
				Id: 0,
				reHinput: 1,
				isFlag: false,
				money1: 5,
				money2: 10,
				money3: 20,
				money: "",
				money4: "", //总价
				five: 0, //5块
				ten: 0, //10块
				twenty: 0, //20块
				objuser: {} //个人信息
			}
		},
		created() {
			this.Id = this.$route.params.Id;
			this.fetchData()
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchData'
		},
		methods: {
			...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
			sublimt(type) {
				this.isFlag = true
				this.money = type
				this.money4 = type
			},
			clone() {
				this.isFlag = false
			},
			fetchData() {
				this.$api.gglCurrentNumByUserId().then(res => {
					this.five = res.data.data.five
					this.ten = res.data.data.ten
					this.twenty = res.data.data.twenty
				}).catch(err => {
					console.log(err, '---this is err');
				})

				this.$api.withdrawInfo().then(res => {
					if(res.data.code == 0) {
						this.objuser = res.data.data
					} else if(res.data.code == 1) {
						Toast(res.data.message)
					}
				}).catch(err => {
					console.log(err, '---no');
				})
			},
			handleChangeone() {
				var num = this.reHinput - 1
				this.reHinput--
					if(num < 1) {
						this.reHinput = 1
					}
				this.money4 = this.reHinput * this.money;
				//		    		console.log(num)
			},
			handleChangetwo() {
				var num = this.reHinput + 1
				this.reHinput++
					if(num > 100) {
						this.reHinput = 100
					}
				//		    		console.log(num)
				this.money4 = this.reHinput * this.money;
			},
			reActive(c) {
				$('.reActive').removeClass('reActive')
				c.target.className = 'reActive'
				this.reHinput = Number(c.target.innerText)
				this.money4 = this.reHinput * this.money;
			},
			clickRecharge() {
				this.$router.push({
					path: `/page/mine/recharge${this.Id}`
				})
			},
			//			立即购买
			purchase() {
				if(this.objuser.withDrawBalance < this.money4) {
					Toast('余额不足，去充值')
				} else {
					let params = {}
					params.gglType = this.money
					params.payNum = 1
					this.$api.PayOrderGgl(params).then(res => {
						//					console.log(res)
						if(res.data.code == 0) {
							this.isFlag = false
							MessageBox.alert('下单成功' + '，去刮奖').then(action => {
								if(this.money == 5) {
									this.$router.push({
										'path': `/Fivepieces${this.Id}`
									})
								} else if(this.money == 10) {
									this.$router.push({
										'path': `/Scratchmusic${this.Id}`
									})
								} else if(this.money == 20) {
									this.$router.push({
										'path': `/Twentypieces${this.Id}`
									})
								}
							});
						} else if(res.data.code == 1) {

						}
					}).catch(err => {
						console.log(err, '---this is err');
					})
				}
			}
		},
		deactivated() {
			this.$destroy()
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
				centerContent: 'src/assets/image/WechatIMG10.png', //中间区域内容
				centerContentClass: 'titleHeaderImg', //中间区域样式类名
				rightShow: false, //右侧区域是否显示
				rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
				rightContent: '', //要在右侧显示的内容
				rightContentClass: '', //右侧内容样式类名
				rightTumpLink: '', //点击右侧跳转链接
			});
		}
	}
</script>

<style lang="scss">
	* {
		touch-action: pan-y;
	}
	
	.purchase {
		width: 100%;
		height: 100vh;
		min-height: 100%;
		overflow: auto;
		background: #1E1E20;
		.purchase_nav {
			box-sizing: border-box;
			padding: 0 20px;
			width: 750px;
			height: 88px;
			background: rgba(30, 30, 32, 1);
			display: flex;
			justify-content: space-between;
			align-items: center;
			p:nth-of-type(1) {
				display: flex;
				align-items: center;
				img {
					width: 60px;
					height: 60px;
					border-radius: 50%;
					margin-right: 15px;
				}
				span {
					font-size: 28px;
					color: rgba(255, 255, 255, 1);
				}
			}
			p:nth-of-type(2) {
				font-size: 28px;
				color: rgba(255, 241, 90, 1);
			}
		}
		.purchase_banner {
			width: 750px;
			height: 352px;
			img {
				width: 100%;
			}
		}
		.purchase_main {
			box-sizing: border-box;
			width: 750px;
			li {
				box-sizing: border-box;
				padding: 15px;
				width: 710px;
				height: 216px;
				background: rgba(47, 44, 41, 1);
				border: 2px solid rgba(154, 123, 81, 1);
				border-radius: 8px;
				margin: 30px auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				img:nth-of-type(1) {
					width: 166px;
					height: 182px;
				}
				div {
					p:nth-of-type(1) {
						font-size: 32px;
						color: rgba(193, 182, 148, 1);
					}
					p:nth-of-type(2),
					p:nth-of-type(3) {
						line-height: 60px;
						font-size: 28px;
						color: rgba(191, 163, 107, 1);
					}
				}
				div:nth-of-type(2) {
					text-align: center;
					img {
						width: 130px;
						height: 130px;
					}
					p {
						font-size: 24px;
						color: #ff4b4d;
					}
				}
			}
		}
		.purchase_Mask {
			position: absolute;
			top: 0;
			left: 0;
			box-sizing: border-box;
			padding: 30% 15%;
			width: 100%;
			height: 100%;
			z-index: 99;
			background: rgba(0, 0, 0, 0.6);
			.Mask {
				width: 545px;
				height: 825px;
				text-align: center;
				background: #4C4032;
				.Mask_one {
					padding-top: 54px;
					position: relative;
					img {
						width: 224px;
						height: 224px;
						border-radius: 4px;
					}
					p {
						font-size: 28px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(131, 111, 83, 1);
						margin: 20px 0 10px;
					}
					.clone {
						position: absolute;
						top: 0;
						right: 0;
						width: 65px;
						height: 65px;
					}
				}
				.Mask_two {
					width: 100%;
					height: 220px;
					background: rgba(62, 54, 43, 1);
					.Numbe {
						box-sizing: border-box;
						width: 100%;
						height: 100px;
						display: flex;
						justify-content: center;
						align-items: center;
						img {
							width: 48px;
							height: 48px;
						}
						input {
							margin: 0 15px;
							width: 105px;
							height: 48px;
							text-align: center;
							background: rgba(92, 79, 63, 1);
							border: 2px solid rgba(130, 104, 50, 1);
							font-size: 32px;
							font-weight: 800;
							color: rgba(255, 182, 0, 1);
						}
					}
					.reHList {
						box-sizing: border-box;
						padding: 0 80px;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						li {
							width: 98px;
							height: 48px;
							border-radius: 6px;
							line-height: 48px;
							text-align: center;
							background: #FFB600;
							font-size: 32px;
							color: #FFFFFF;
						}
						.reActive {
							background: #2D95F5;
							color: #FFFFFF;
						}
					}
					p {
						font-size: 28px;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(217, 204, 181, 1);
						margin-top: 15px;
					}
				}
				.Mask_three {
					p {
						font-size: 28px;
						color: #836F53;
						margin: 20px 0;
						a {
							color: #FFB600;
						}
					}
					img {
						width: 346px;
						height: 126px;
					}
				}
			}
		}
	}
</style>