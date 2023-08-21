<template>
	<view class="shoppingbag">
		<view class="bagHead">
			<view class="return" @click="goBack">
				<image src="../../assets/cancel1.png" alt="">
			</view>
		</view>
		<view class="bag">
			购 物 袋
		</view>
		<view class="content">
			<block v-for="(item,index) in content" :key="index">
				<view class="item">
					<view class="chosebtn">
						<view class="checkbox" :class="{ active: checkboxStatus[index] }" @click="changeActive(index)">
							<i></i>
						</view>
					</view>
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
					<view class="remove" @click="removeitem(index)"></view>
				</view>
			</block>
		</view>
		<view class="blank"></view>
		<view class="bottom">
			<view class="checkbox" :class="{ active:selectAll}" @click="toggleAllSelected">
				<i></i>
			</view>
			<view class="all">全选</view>
			<view class="leftmsg">
				<view class="name">合 计：</view>
				<view class="totalprice">￥{{totalprice}}</view>
			</view>
			<!-- <router-link to="/pages/checkout/checkout"> -->
			<view class="rightmsg" @click="settlementFn">
				结算
			</view>
			<!-- </router-link> -->
		</view>
	</view>
</template>

<script>
	import {
		allBag,
		checkTokenFn,
		addItemCount,
		decreItemCount,
		deleteItem
	} from '../../api/index.js'
	export default {
		data() {
			return {
				checkboxStatus: [],
				selectedPrices: [],
				content: [],
				chooseItem: [],
				selectAll: false,
				items: [{
					id: 1
				}, {
					id: 2
				}]
			};
		},
		methods: {
			goBack() {
				// this.$router.go(-1);
				// console.log(this.$router);
				// console.log(this.$router.go(-1));
				// history.go(-1)
				uni.navigateTo({
					url:'/pages/home/home'
				})
			},
			//校验Token
			async checkFn() {
				let token = uni.getStorageSync('uni_id_token')
				return await checkTokenFn(token)
			},
			//-1
			async decrement(index, item) {
				item.count--
				if (item.count <= 0) {
					uni.showToast({
						title: "不能再少了哟",
						icon: "none"
					})
					item.count = 1;
				} else {
					let option = {};
					let that = this;
					uni.showLoading({
						title: '加载中'
					})
					await that.checkFn()
						.then(
							content => {
								let {
									result
								} = content;
								if (result.code === 0) {
									option.uid = result.uid
								} else {
									return Promise.reject();
								}
							}
						)
						.then(() => {
							option.productid = item.productid;
						})
						.then(() => {
							decreItemCount(option).then(content => {
								// console.log(content);
								uni.hideLoading()
							})
						})
						.catch(() => {
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/login/login'
							})
						});
				}
			},
			//+1
			async increment(index, item) {
				let option = {};
				let that = this;
				uni.showLoading({
					title: '加载中'
				})
				await that.checkFn()
					.then(
						content => {
							let {
								result
							} = content;
							if (result.code === 0) {
								option.uid = result.uid
							} else {
								return Promise.reject();
							}
						}
					)
					.then(() => {
						option.productid = item.productid;
					})
					.then(() => {
						addItemCount(option).then(content => {
							// console.log(content);
							item.count++
							uni.hideLoading()
						})
					})
					.catch(() => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/login/login'
						})
					});
			},
			//移除
			removeitem(index) {
				let that = this;
				uni.showModal({
					title: '再考虑下吗？',
					content: '确定删除吗',
					success: function(res) {
						if (res.confirm) {
							let option = {};
							uni.showLoading({
								title: '加载中'
							})
							// console.log(that.checkFn);
							that.checkFn()
								.then(
									content => {
										let {
											result
										} = content;
										if (result.code === 0) {
											option.uid = result.uid
										} else {
											return Promise.reject();
										}
									}
								)
								.then(() => {
									option._id = that.content[index]._id;
									// console.log(option._id );
								})
								.then(() => {
									deleteItem(option).then(content => {
										// console.log(content);
										// if (content.success === true) {
										// 	uni.hideLoading()
										// }
										uni.hideLoading()
									})
								})
								.then(() => {
									that.allBagFn()
								})
								.catch(() => {
									uni.hideLoading();
									uni.navigateTo({
										url: '/pages/login/login'
									})
								});

						} else if (res.cancel) {
							// console.log('用户点击取消');
							return;
						}
					}

				})
			},
			changeActive(index) {
				this.$set(this.checkboxStatus, index, !this.checkboxStatus[index]);
				// this.checkboxStatus[index] = !this.checkboxStatus[index];
				if (this.checkboxStatus.includes(false)) {
					this.selectAll = false;
				}
				if (this.checkboxStatus.every((status) => status === true)) {
					this.selectAll = true;
				}
				if (this.checkboxStatus[index]) {
					this.selectedPrices.push(this.content[index].price);
					this.chooseItem.push(this.content[index])
				} else {
					const priceIndex = this.selectedPrices.indexOf(this.content[index].price);
					if (priceIndex !== -1) {
						this.selectedPrices.splice(priceIndex, 1);
					}
					const chooseIndex = this.chooseItem.indexOf(this.content[index]);
					if (chooseIndex !== -1) {
						this.chooseItem.splice(chooseIndex, 1);
					}
				}
				// console.log(this.selectedPrices);
				// console.log(this.chooseItem);
			},
			toggleAllSelected() {
				this.selectAll = !this.selectAll;
				if (this.selectAll) {
					this.checkboxStatus = this.checkboxStatus.map(() => true);
					this.selectedPrices = this.content.map(item => item.price);
					this.chooseItem = this.content.map(item => item);

				} else {
					this.checkboxStatus = this.checkboxStatus.map(() => false);
					this.selectedPrices = [];
					this.chooseItem = [];
				}
				// console.log(this.selectedPrice);
				// console.log(this.chooseItem);
			},
			async allBagFn() {
				let option = {};
				await this.checkFn()
					.then(
						content => {
							let {
								result
							} = content;
							if (result.code === 0) {
								option.uid = result.uid
							} else {
								return Promise.reject();
							}
						}
					)
					.then(() => {
						allBag(option).then(
							content => {
								let {
									result: {
										data
									}
								} = content;
								this.content = data;
								this.content.forEach(() => {
									this.checkboxStatus.push(false)
								});
								// console.log(this.content);
							}
						)
					})
					.catch(() => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/login/login'
						})
					});
			},
			async settlementFn() {
				let option = {};
				let that = this;
				uni.showLoading({
					title: '加载中'
				})
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
					// .then(() => {
					// 	that.timerId=setTimeout(()=>{
					// 		// console.log('hhh',that.chooseItem);
					// 		uni.$emit('goods', {
					// 			goodsData:that.chooseItem
					// 		})
					// 	},300)
					// })
					.then(() => {
						uni.navigateTo({
							url: '/pages/checkout/checkout?goods='+ encodeURIComponent(JSON.stringify(that.chooseItem))
						})
						// uni.$app.globalData.buygoods = that.chooseItem;
						// let goods=that.chooseItem;
						// that.$store.commit('setGoods', goods);
						// uni.navigateTo({
						// 	url: "/pages/checkout/checkout"
						// })
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
					if (this.checkboxStatus[index]) {
						return total + item.price * item.count;
					} else {
						return total;
					}
				}, 0);
			}
		},
		onLoad() {
			this.allBagFn()
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
	@h-1: 46rpx;

	.shoppingbag {
		padding: 0 30rpx;
		box-sizing: border-box;

		.bagHead {
			height: 90rpx;
			display: flex;
			align-items: center;

			.return {
				width: 32rpx;
				height: 32rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.bag {
			font-weight: 700;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 36rpx;
		}

		.content {
			margin-top: 20rpx;

			.item {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;
				box-sizing: border-box;
				position: relative;

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

				.remove {
					position: absolute;
					bottom: 10rpx;
					right: 10rpx;
					width: 25rpx;
					height: 25rpx;
					background: url("../../assets/cancel1.png");
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}
		}

		.bottom {
			position: fixed;
			padding: 0 60rpx 0 0;
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
				justify-content: end;
				align-items: center;
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