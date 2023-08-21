<template>
	<view class="totalAddress">
		<view class="header">
			<view class="returnbtn" @click="goToCheckout"></view>
			<view class="title">我的收获地址</view>
		</view>
		<view class="headerblank"></view>
		<view class="content">
			<block v-for="(item,index) in totalAddress">
				<view class="item" @click="chooseAddress(item)">
					<view class="baseinfo">
						<view class="consumerinfo">
							<view class="name">{{item.consumernick}}</view>
							<view class="telephone">{{item.phonenumber}}</view>
							<view class="default" v-if="item.defaultaddress===true">默认</view>
						</view>
						<view class="address">
							<view class="city">{{item.city}} {{item.address}}</view>
							<!-- <view class="detail">
								
							</view> -->
						</view>
					</view>
					<view class="editinfo" @click.stop="goToEdit(item)"></view>
				</view>
			</block>
		</view>
		<view class="blank"></view>
		<view class="addAddress" @click="goToAdd">+ 添加收获地址</view>
	</view>
</template>

<script>
	import {
		checkTokenFn,
		allAddress
	} from '../../api/index.js'
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				totalAddress: [],
				addressid: '',
				content: []
			};
		},
		methods: {
			...mapMutations(['setAddress']),
			goToAdd() {
				uni.navigateTo({
					url: '/pages/address/address?goods=' + encodeURIComponent(JSON.stringify(
						this.content)),
				});
			},
			goToCheckout(){
				uni.navigateTo({
					url: '/pages/checkout/checkout?goods=' + encodeURIComponent(JSON.stringify(
						this.content)),
				});
			},
			async goToEdit(item) {
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
						that.timerId = setTimeout(() => {
							uni.$emit('address', {
								addressData: item
							})
						}, 300)
					})
					.then(
						uni.navigateTo({
							url: '/pages/editAddress/editAddress?goods=' + encodeURIComponent(JSON.stringify(
								that.content)),
						})
					)
			},
			//校验Token
			async checkFn() {
				let token = uni.getStorageSync('uni_id_token')
				return await checkTokenFn(token)
			},
			async getAllAddressFn() {
				let option = {};
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
			async chooseAddress(item) {
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
						// console.log(item);
						that.timerId = setTimeout(() => {
							uni.$emit('chooseaddress', {
								addressInfo: item
							})
						}, 300)
					})
					.then(() => {
						uni.navigateTo({
							url: '/pages/checkout/checkout?goods=' + encodeURIComponent(JSON.stringify(
								that.content))
						});
						// let address = item;
						// this.setGoods(address);
						// that.$store.commit('setAddress', address);
						// uni.$app.globalData.nowaddress = item;
						// uni.navigateTo({
						// 	url: '/pages/checkout/checkout'
						// })
					})
					.catch(() => {
						console.log('error');
						uni.hideLoading();
						// uni.navigateTo({
						// 	url: '/pages/login/login'
						// })
					});
			}
		},
		onLoad(options) {
			this.getAllAddressFn();
			const goods = JSON.parse(decodeURIComponent(options.goods));
			this.content = goods;
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
	@c-12: #808080;
	@h-1: 35rpx;

	.totalAddress {
		padding: 0 30rpx;
		width: 100%;
		box-sizing: border-box;

		.addAddress {
			width: 92%;
			// padding: 0 60rpx 0 0;
			magrin: 0 auto;
			box-sizing: border-box;
			line-height: 100rpx;
			height: 100rpx;
			position: fixed;
			// left: 0;
			bottom: 30rpx;
			background-color: @c-4;
			text-align: center;
			color: #ffffff;
			border-radius: 80rpx;
		}

		.blank {
			height: 100rpx;
			padding-bottom: 30rpx;
		}
		.headerblank{
			height: 85rpx;
			// margin-top: 88rpx;
		}
		.header{
			margin-top: 14rpx;
			width: 100%;
			padding: 14rpx 0rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: #ffffff;
			.title{
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
			.returnbtn{
				background: url('../../assets/return.png');
				width: 47rpx;
				height: 47rpx;
				background-size: 100% 100%;
				background-repeat: no-repeat;
			}
		}
		.content {
			width: 100%;
			margin: 35rpx 0;

			.item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-bottom: 30rpx;

				.baseinfo {
					width: 90%;

					.consumerinfo {
						display: flex;
						margin-bottom: 10rpx;

						.name {
							color: @c-1;
							font-weight: bold;
							font-size: 26rpx;
							height: 40rpx;
							line-height: 40rpx;
							margin-right: 20rpx;
							max-width: 160rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.telephone {
							font-size: 26rpx;
							color: @c-1;
							height: 40rpx;
							line-height: 40rpx;
						}

						.default {
							margin-left: 20rpx;
							font-size: 24rpx;
							height: 35rpx;
							line-height: 35rpx;
							color: @c-4;
							padding: 0 10rpx;
							border: 2rpx solid @c-4;
						}
					}

					.address {
						width: 100%;
						display: flex;
						flex-wrap: wrap;

						.city {
							font-size: 24rpx;
							color: @c-2;
							// margin-right: 15rpx;
							height: @h-1;
							line-height: @h-1;
						}

						// .detail {
						// 	font-size: 24rpx;
						// 	color: @c-2;
						// 	height: @h-1;
						// 	line-height: @h-1;
						// }
					}
				}

				.editinfo {
					width: 40rpx;
					height: 40rpx;
					background: url("../../assets/edit.png");
					background-repeat: no-repeat;
					background-size: 100% 100%;
					// margin-left: 40rpx;
				}
			}
		}
	}
</style>