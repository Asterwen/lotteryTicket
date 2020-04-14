<template>
	<div class="Twentypieces">
		<!-- 大的背景盒子-->
		<div class="guajiang">
			<img src="../../../assets/image/WechatIMG8.png" class="Imgtop" @click="Imgtop()"/>
		</div>
		
		<div class="Twentypieces_main">
			<!-- 定位的盒子-->
			<div class="canvasBox" @touchmove.prevent>
				<!-- 放内容的盒子-->
				<div class="prize">
					<div class="prize_left">
						<span class="tishi">中奖号码</span>
						<div>
							<figure v-for="(data,item) in lotteryNumber">
								<p>{{data}}</p>
								<span>LINGBA</span>
							</figure>
							
						</div>
					</div>
					<div class="prize_right">
						<span class="tishi">你的号码</span>
						<ul>
							<li v-for="(val,item) in matchList" :class="val.split(':')[0]==comment1 ? 'bgColor' : '' ">
								<p>{{val.split(':')[0]}}</p>
								<span>¥{{val.split(':')[1]}}</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- 蒙版画布-->
				<canvas id="canvas"></canvas>
			</div>
		</div>
		<img src="../../../assets/image/WechatIMG11.png" @click="imageData()" class="Twentypieces_footer" v-show="isFlag"/>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		inject: ['reload'],
		name: 'Twentypieces',
		data(){
			return{
				isFlag: false,
				// isImg: require('../../../assets/image/banner2.jpg'),
				dataId: 0,  
				money: 0,  //中奖钱数
				comment1: 0,  //中奖提示号码
				lotteryNumber: [],  //中奖号码
				matchList: []  //你的号码
			}
		},
		created(){
			this.fetchData()
			$(document.body).css({
			   "overflow-x":"hidden",
			   "overflow-y":"hidden"
			 });
//			 $(document.body).toggleClass("html-body-overflow");
//			document.querySelector('.element').addEventListener('touchmove', stopScroll, false);
//			var mo=function(e){e.preventDefault();};
//			function stop(){
//			        document.body.style.overflow='hidden';        
//			        document.addEventListener("touchmove",mo,false);//禁止页面滑动
//			}
//			document.body.addEventListener('touchmove', function (event) {
//			    event.preventDefault();
//			}, false);
//			$(document).on('touchmove',function(e){
//			 e.preventDefault();
//			 })
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchData'
		},
		methods:{
			...mapActions(["setPublicHeaderStatus", "setBottomNavigation"]),
			Imgtop(){
				$(".Imgtop").css("display","none")
				$(".Twentypieces_main").css("opacity","1")
			},
			fetchData() {
				let params = {}
				params.gglType = 20
				this.$api.openOrderGgl(params).then(res => {
					if(res.data.code == 0){
						this.lotteryNumber = res.data.data.lotteryNumber.split(',')
						this.dataId = res.data.data.id
						this.matchList = res.data.data.myNumber.split(',')
						this.comment1 = res.data.data.comment1
						this.money = res.data.data.money
					}else if(res.data.code == 1){
						Toast(res.data.message)
					}
				}).catch(err => {
			        console.log(err, '---this is err');
			   })
			},
			imageData(){
				canvas.setAttribute('class', 'disappear');
				let params = {}
				params.gglType = 20
				params.id = this.dataId 
				this.$api.lotteryGgl(params).then(res => {
					if(res.data.code == 0){
						if(res.data.data!=null){
							MessageBox.confirm(res.data.message + '您已中奖' + this.money + '元，请刮下一张').then(action => {
							  	this.reload()
							}, action => {});
						}else{
							MessageBox.confirm(res.data.message + '您已中奖' + this.money + '元，请继续购买').then(action => {
							  	this.$router.go(-1)
							}, action => {});
						}
					}else if(res.data.code == 1){
						Toast(res.data.message)
					}
				}).catch(err => {
			        console.log(err, '---this is err');
			  })
			}
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
				centerContent: 'src/assets/img/titleHeaderImg/Recharge.png', //中间区域内容
				centerContentClass: 'titleHeaderImg', //中间区域样式类名
				rightShow: false, //右侧区域是否显示
				rightShowType: 'text', //text：在content中输入纯文字；img：在content中输入图片路径；other：在content中写入要输入的内容
				rightContent: '', //要在右侧显示的内容
				rightContentClass: '', //右侧内容样式类名
				rightTumpLink: '', //点击右侧跳转链接
			});
			
			var that = this
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext('2d');
			/* 画布偏移量，下面用到的时候再介绍*/
			var arr = getOffset(canvas);
			var oLeft = arr[0];
			var oTop = arr[1];
			/* 初始化画布*/
			ctx.beginPath();
			ctx.fillStyle = "pink"
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.closePath();
			/* 增加触摸监听*/
			document.addEventListener("touchstart", function() {
				/* 初始化画笔*/
				ctx.beginPath();
				/* 画笔粗细*/
				ctx.lineWidth = 10;
				/* 设置组合效果*/
				ctx.globalCompositeOperation = 'destination-out';
				/* 移动画笔原点*/
				ctx.moveTo(event.touches[0].pageX - oLeft, event.touches[0].pageY - oTop);
			}, false)
			document.addEventListener("touchmove", function() {
				/* 根据手指移动画线，使之变透明*/
				ctx.lineTo(event.touches[0].pageX - oLeft, event.touches[0].pageY - oTop);
//				ctx.lineTo(event.touches[0].clientX - oLeft, event.touches[0].clientY - oTop);
				/* 填充*/
				ctx.stroke();
			})
			/* 之所以会用到下面的那个函数getOffset（obj）
			 * 是因为event.touches[0].pageX、pageY获取的是相对于可视窗口的距离
			 * 而lineTo画笔的定位是根据画布位置定位的
			 * 所以就要先获取到画布(canvas)相对于可视窗口的距离，然后计算得出触摸点相对于画布的距离 
			 * */
			/* 获取该元素到可视窗口的距离*/
			function getOffset(obj) {
				var valLeft = 0,
					valTop = 0;

				function get(obj) {
					valLeft += obj.offsetLeft;
					valTop += obj.offsetTop;
					/* 不到最外层就一直调用，直到offsetParent为body*/
					if(obj.offsetParent.tagName != 'BODY') {
						get(obj.offsetParent);
					}
					return [valLeft, valTop];
				}
				return get(obj);
			}

			document.addEventListener("touchend", function() {
				/* 获取imageData对象*/
				var imageDate = ctx.getImageData(0, 0, canvas.width, canvas.height);
				/* */
				var allPX = imageDate.width * imageDate.height;
				
				var iNum = 0; //记录刮开的像素点个数
				for(var i = 0; i < allPX; i++) {
					if(imageDate.data[i * 4 + 3] == 0) {
						iNum++;
					}
				}
				if(iNum >= allPX * 3 / 4) {
					// disappear里面写了缓慢清除的css3动画效果
					canvas.setAttribute('class', 'disappear');
				}
//				debugger
				if(iNum > 0){
					that.isFlag = true
				}
			}, false)
			
		}
	}
</script>

<style lang="scss">
	.Twentypieces {
		width: 100%;
		height: 100vh;
		min-height: 100%;
		background: url("../../../assets/image/mimi.png") no-repeat;
		background-size: 100%;
		overflow: hidden;
	}
	/*.guajiang{
		position: relative;
		width: 94%;
		height: 41%;
		border-radius: 5px;
		margin: 78% auto;
	}*/
	.Imgtop{
		width: 200px;
		position: absolute;
		top: 58%;
		left: 37%;
		animation: mymove 1s infinite;
		z-index: 11;
	}
	@keyframes mymove {
		0 {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
	.Twentypieces_main {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		/*z-index: 99;*/
		/*display: none;*/
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		/*padding-bottom: 10%;*/
		.canvasBox {
			position: relative;
			box-sizing: border-box;
			padding-right: 20px;
			width: 94%;
			height: 520px;
			border-radius: 5px;
			background: #FFFFFF;
			/*margin: 70% auto;*/
			position: absolute;
			top: 35%;
			left: 3%;
			text-align: center;
			
			.prize {
				box-sizing: border-box;
				padding: 20px 0px;
				width: 100%;
				height: 100%;
				display: flex;
				font-family:PingFangSC-Regular;
				.prize_left {
					box-sizing: border-box;
					width: 25%;
					height: 100%;
					border-right: 2px dashed #000000;
					display: flex;
					justify-content: center;
					align-items: center;
					.tishi {
						font-size: 24px;
						writing-mode: tb-rl;
					}
					div{
						figure {
							margin: 20px 10px;
							color:#F64343;
							p {
								font-size: 36px;
								/*font-family: FZCYJW--GB1-0;*/
								font-weight: bold;
							}
							span {
								font-size: 16px;
								font-family: REEJI-Shine-BoldGB10;
								font-weight: 400;
							}
						}
					}
				}
				.prize_right {
					width: 75%;
					height: 100%;
					/*border: 1px dashed #000000;*/
					display: flex;
					justify-content: space-between;
					align-items: center;
					.tishi {
						font-size: 24px;
						writing-mode: tb-rl;
						margin-left: 10px;
					}
					ul{
						width: 100%;
						height: 480px;				
						display: flex;
						align-items: center;
							flex-wrap: wrap;
						li{
							width: 25%;
							p {
									font-size: 36px;
									/*font-family:FZCYJW--GB1-0;*/
									color: rgba(0, 0, 0, 1);
									font-weight: bold;
								}
								span {
									font-size: 22px;
									/*font-family:PingFangSC-Regular;*/
									color: rgba(0, 0, 0, 1);
								}
						}
					}
				}
			}
		}
	}
	.Twentypieces_footer{
		box-sizing: border-box;
		width: 90%;
		position: fixed;
		bottom: 0;
		margin-left: 5%;
	}
	#canvas {
		width: 96%;
		height: 96%;
		position: absolute;
		left: 2%;
		top: 2%;
		background-color: transparent;
		
	}
	
	.disappear {
		-webkit-animation: disa 2s 1;
		animation: disa 2s 1;
		-webkit-animation-fill-mode: forwards;
		-moz-animation-fill-mode: forwards;
		-o-animation-fill-mode: forwards;
		animation-fill-mode: forwards;
	}
	
	.bgColor{ 
    	color:#FE8580; 
    	/*background-color: #FFFFFF;*/
    	animation: changeshadow 1s  ease-in  infinite ;
    	/* 其它浏览器兼容性前缀 */
	    -webkit-animation: changeshadow 1s linear infinite;
	    -moz-animation: changeshadow 1s linear infinite;
	    -ms-animation: changeshadow 1s linear infinite;
	    -o-animation: changeshadow 1s linear infinite;
    } 
    @keyframes changeshadow {  
        0%{ text-shadow: 0 0 4px #FE8580}  
        50%{ text-shadow: 0 0 40px #FE8580}  
        100%{ text-shadow: 0 0 4px #FE8580}  
    }
    /* 添加兼容性前缀 */
	@-webkit-keyframes changeshadow {
	  0%{ text-shadow: 0 0 4px #FE8580}  
          50%{ text-shadow: 0 0 40px #FE8580}  
          100%{ text-shadow: 0 0 4px #FE8580}  
	}
	@-moz-keyframes changeshadow {
	    0%{ text-shadow: 0 0 4px #FE8580}  
            50%{ text-shadow: 0 0 40px #FE8580}  
            100%{ text-shadow: 0 0 4px #FE8580}  
	}
	@-ms-keyframes changeshadow {
	    0%{ text-shadow: 0 0 4px #FE8580}  
            50%{ text-shadow: 0 0 40px #FE8580}  
            100%{ text-shadow: 0 0 4px #FE8580}  
	}
	@-o-keyframes changeshadow {
	    0%{ text-shadow: 0 0 4px #FE8580}  
            50%{ text-shadow: 0 0 40px #FE8580}  
            100%{ text-shadow: 0 0 4px #FE8580}  
	}
	
	@keyframes disa {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>