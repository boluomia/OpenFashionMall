<template>
	<view class="checkout">
		<view class="header">
			<view class="returnbtn" @click="goToShoppingbag"></view>
			<view class="title">确认订单</view>
		</view>
		<view class="headerblank"></view>
		<view class="address" @click="goToAddress">
			<view class="leftmsg" v-if="address.length===0&&defaultAddress.length===0">
				<view class="title">收货地址</view>
				<view class="tip">请选择收获地址</view>
			</view>
			<view class="leftmsg" v-if="defaultAddress.length!==0&&address.length===0">
				<view class="title">{{defaultAddress.address}}</view>
				<view class="tip">{{defaultAddress.phonenumber}}</view>
			</view>
			<view class="leftmsg" v-if="address.length!==0">
				<view class="title">{{address.address}}</view>
				<view class="tip">{{address.consumernick}} {{address.phonenumber}}</view>
			</view>
			<view class="rightmsg"></view>
		</view>
		<view class="content">
			<block v-for="(item,index) in content" :key="index">
				<view class="item">
					<view class="info">
						<view class="leftinfo">
							<view class="img">
								<image :src="`${item.img}`" mode="widthFix"></image>
							</view>
						</view>
						<view class="rightinfo">
							<view class="title">
								{{item.title}}
							</view>
							<view class="msg">
								<view class="color">{{item.color}}</view>
								<view class="fuhao">;</view>
								<view class="size">{{item.size}}</view>
							</view>
							<view class="count">
								<view class="decrement" @click="decrement(index,item)"></view>
								<view class="num">{{item.count}}</view>
								<view class="increment" @click="increment(index,item)"></view>
							</view>
							<view class="price">￥{{item.price}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="blank"></view>
		<view class="bottom">
			<view class="leftmsg">
				<view class="name">合 计：</view>
				<view class="totalprice">￥{{totalprice}}</view>
			</view>
			<view class="rightmsg" @click="submit">
				确认下单
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkTokenFn,
		allAddress
	} from '../../api/index.js'
	import {
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				checkboxStatus: [],
				selectedPrices: [],
				content: [],
				address: [],
				totalAddress: [],
				defaultAddress: []
			};
		},
		methods: {
			decrement(index, item) {
				item.count--
				if (item.count <= 0) {
					uni.showToast({
						title: "不能再少了哟",
						icon: "none"
					})
					item.count = 1;
				}
			},
			increment(index, item) {
				item.count++
			},
			//校验Token
			async checkFn() {
				let token = uni.getStorageSync('uni_id_token')
				return await checkTokenFn(token)
			},
			submit() {
				uni.showToast({
					title: "支付成功",
					success() {
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/paysuccess/paysuccess',
							});
						}, 2000);
					}
				})
			},
			goToAddress() {
				uni.navigateTo({
					url: '/pages/totalAddress/totalAddress?goods=' + encodeURIComponent(JSON.stringify(this
						.content)),
				});
			},
			//校验Token
			async checkFn() {
				let token = uni.getStorageSync('uni_id_token')
				return await checkTokenFn(token)
			},
			goToShoppingbag() {
				uni.navigateTo({
					url: '/pages/shoppingbag/shoppingbag'
				});
			},
			async getAllAddressFn() {
				let option = {};
				let that = this;
				await this.checkFn()
					.then(
						content => {
							// console.log(content);
							let {
								result
							} = content;
							if (result.code === 0) {
								option.uid = result.uid
							} else {
								return Promise.reject();
							}
							// console.log(option.uid);
						}
					)
					.then(() => {
						allAddress(option).then(content => {
							let {
								result: {
									data
								}
							} = content;
							this.totalAddress = data;
							// this.addressid = data._id;
							// console.log(data);
							// console.log(this.addressid);
							if (this.totalAddress.length !== 0) {
								// console.log(1);
								this.totalAddress.forEach((address) => {
									// console.log(address);
									if (address.defaultaddress === true) {
										// console.log(address);
										this.defaultAddress = address
									}
								})
							}
							// console.log(this.defaultAddress);
							uni.hideLoading()
						})
					})
					.then(() => {
						// this.totalAddress.forEach(address => {
						// 	if (address.defaultaddress === true) {
						// 		that.defaultaddress = address;
						// 		// console.log(that.defaultAddress);
						// 		console.log(address);
						// 		// console.log(this.totalAddress);
						// 	}
						// 	// console.log(that.defaultAddress);
						// });
						// console.log(that.defaultAddress);
						// console.log(that.totalAddress);
						uni.hideLoading()
					})
					.catch(() => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/login/login'
						})
					});
			},

		},
		computed: {
			totalprice() {
				return this.content.reduce((total, item, index) => {
					return total + item.price * item.count;
				}, 0);
			},
			// ...mapGetters(['getGoods', 'getAddress'])
		},
		onLoad(options) {
			// this.allBagFn()
			let that = this;
			// uni.$on('goods', function(res) {
			// 	console.log('1.0',res.goodsData);
			// 	that.content=res.goodsData;
			// })
			uni.$on('chooseaddress', function(res) {
				// console.log('1.0',res.addressInfo);
				that.address = res.addressInfo;
				that.defaultAddress = res.addressInfo;
				// console.log(that.address);
			})
			const goods = JSON.parse(decodeURIComponent(options.goods));
			// const address = JSON.parse(decodeURIComponent(options.address));
			// console.log(goods);
			// console.log(address);
			this.content = goods;
			// const goods = uni.$app.globalData.buygoods;
			// const address = uni.$app.globalData.nowaddress;
			// console.log(goods);
			// console.log(address);
			// console.log(this.getGoods);
			// console.log(this.getAddress);
			this.getAllAddressFn();

		},
		onUnload() {
			// console.log('3.0');
			// uni.$off('goods');
			uni.$off('chooseaddress');
		}
	}
</script>

<style lang="less" scoped>
	@c-1: #333333;
	@c-2: #888888;
	@c-3: #000000;
	@c-4: #DD8560;
	@c-5: #DEDEDE;
	@c-5: #cccccc;
	@c-6: #555555;
	@c-7: #f9f9f9;
	@c-8: #969696;
	@c-9: #f3f3f3;
	@c-10: #c8c8c8;
	@c-11: #cccccc;
	@h-1: 48rpx;

	.checkout {
		.headerblank{
			height: 85rpx;
			// margin-top: 88rpx;
		}
		.header {
			margin-top: 14rpx;
			width: 100%;
			padding: 14rpx 30rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: #ffffff;

			.title {
				height: 60rpx;
				line-height: 60rpx;
				position: absolute;
				margin-left: 35%;
				flex-grow: 1;
				// display: flex;
				// justify-content: center;
				// transform: translateX(-7%);
				// left: 140rpx;
				// right: 140rpx;
				min-width: 0;
				font-weight: bold;
			}

			.returnbtn {
				background: url('../../assets/return.png');
				width: 47rpx;
				height: 47rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
		}

		.address {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0rpx 30rpx 0rpx;
			margin: 0rpx 30rpx;
			border-bottom: 2rpx solid @c-11;

			.leftmsg {
				.title {
					color: @c-1;
					font-size: 30rpx;
					font-weight: 700;
					height: @h-1;
					line-height: @h-1;
				}

				.tip {
					color: @c-2;
					font-size: 28rpx;
				}
			}

			.rightmsg {
				background: url("../../assets/turnright.png");
				height: 70rpx;
				width: 70rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}

		}

		.content {
			padding: 0 30rpx;
			margin: 0rpx 0rpx 30rpx 0rpx;

			.item {
				display: flex;
				align-items: center;
				padding: 30rpx 0rpx;
				box-sizing: border-box;
				position: relative;
				border-bottom: 4rpx solid @c-7;

				&:last-child {
					border-bottom: none;
				}

				.info {
					display: flex;
					justify-content: start;
					width: auto;

					.leftinfo {
						.img {
							width: 200rpx;
							height: 268rpx;
							overflow: hidden;

							image {
								width: 100%;
							}
						}
					}

					.rightinfo {
						padding-left: 30rpx;
						height: 268rpx;
						display: flex;
						flex-grow: 1;
						flex-direction: column;
						justify-content: space-between;
						box-sizing: border-box;

						.title {
							color: @c-1;
							overflow: hidden;
							// margin: 10rpx 0 20rpx 0;
							font-size: 28rpx;
							line-height: @h-1;
							max-height: @h-1*2;
							text-overflow: clip;
						}

						.msg {
							margin: 10rpx 0;
							display: flex;

							.color {
								color: @c-1;
								font-size: 28rpx;
							}

							.size {
								color: @c-1;
								font-size: 28rpx;
							}

							.fuhao {
								margin: 0rpx 8rpx;
							}
						}

						.count {
							display: flex;
							align-items: center;

							.decrement,
							.increment {
								height: 50rpx;
								width: 50rpx;
								border-radius: 50%;
								border: 2rpx solid @c-9;
								color: @c-6;
								text-align: center;
							}

							.decrement {
								background: url("../../assets/decrement.png");
								background-size: 50% 100%;
								background-repeat: no-repeat;
								background-position: center;
							}

							.increment {
								background: url("../../assets/increment.png");
								background-size: 50% 50%;
								background-repeat: no-repeat;
								background-position: center;
							}

							.num {
								margin: 0rpx 20rpx;
								font-size: 28rpx;
							}
						}

						.price {
							color: @c-4;
							font-size: 34rpx;
							width: 50%;
							overflow: hidden;
							text-overflow: ellipsis;
							// margin-bottom: 10rpx;
						}
					}
				}
			}
		}

		.bottom {
			position: fixed;
			// padding: 0 60rpx 0 0;
			padding: 0 30rpx;
			width: 100%;
			box-sizing: border-box;
			bottom: 0;
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #ffffff;
			border-top: 2rpx solid @c-10;

			.all {
				color: @c-1;
				font-size: 32rpx;
			}

			.checkbox {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid @c-11;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				margin-right: 30rpx;
				align-items: center;

				&.active {
					border: none;
					background-color: #ffffff;
					text-align: center;
					line-height: 40rpx;
					border: 2rpx solid @c-11;

					i {
						background: url('../../assets/check.png') no-repeat center center;
						background-size: 100%;
						width: 30rpx;
						height: 30rpx;
						display: inline-block;
					}
				}
			}

			.leftmsg {
				display: flex;
				flex-grow: 1;
				justify-content: start;
				margin-right: 20rpx;

				.name {
					font-size: 32rpx;
					color: @c-1;
				}

				.totalprice {
					font-size: 36rpx;
					color: @c-4;
				}
			}

			.rightmsg {
				font-size: 34rpx;
				color: #ffffff;
				border: 2rpx solid @c-4;
				padding: 10rpx 40rpx;
				border-radius: 40rpx;
				background-color: @c-4;
			}

		}

		.blank {
			height: 120rpx;
			background-color: #ffffff;
		}
	}
</style>