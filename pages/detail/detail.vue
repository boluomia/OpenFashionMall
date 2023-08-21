<template>
	<view class="detail" v-if="Product.length!==0">
		<view class="detailbanner">
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
				<block v-for="(item,index) in Product[0].thumbnail">
					<swiper-item>
						<view class="swiper-item">
							<image mode="widthFix" :src="`${item}`" alt="">
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="info">
			<view class="title">
				{{Product[0].title}}
			</view>
			<view class="price">￥{{Product[0].price}}</view>
			<view class="color">
				<view class="name">颜色</view>
				<view class="totalColor">
					<block v-for="(item,index) in color[0].split(',')">
						<view class="def" :class="{active:index===currentColor}" @click="addChoose(index)">{{item}}
						</view>
					</block>
				</view>
			</view>
			<view class="size">
				<view class="name">尺码</view>
				<view class="totalSize">
					<block v-for="(item,index) in size[0].split(',')">
						<view class="def" :class="{active:index===currentSize}" @click="addActive(index)">{{item}}
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="operate">
			<view class="shopbag" @click="addProduct">
				<!-- <view class="like-button">
					<image v-if="liked" src="../../assets/heart-on.png" mode="widthFix"></image>
					<image v-else src="../../assets/heart-white.png" mode="widthFix"></image>
				</view> -->
				<view class="order">加入购物袋</view>
			</view>
			<view class="buy">
				<view class="rightnow">
					立即购买
				</view>
			</view>
		</view>
		<view class="detailcontent">
			<block v-for="(item,index) in contentimg">
				<view class="pic">
					<view class="img">
						<image :src="`${item.image}`" mode="widthFix"></image>
					</view>
				</view>
			</block>
		</view>
		<view class="blank"></view>
	</view>
</template>

<script>
	import topic from "../../components/header/header.vue"
	import LikeButton from "../../components/likeButton/likeButton.vue"
	import {
		deatilProduct,
		checkTokenFn,
		addBag,
		allBag
	} from '../../api/index.js'
	export default {
		data() {
			return {
				detailId: [],
				Product: [],
				size: [],
				contentimg: [],
				// color: ["黑色", "白色"],
				color: [],
				// liked: false,
				count: 1,
				currentSize: 0,
				currentColor: 0,
				canToggleLike: true,
			};
		},
		components: {
			topic,
			LikeButton
		},
		methods: {
			toggleLike() {
				if (this.canToggleLike) {
					this.liked = !this.liked;
					this.canToggleLike = false;
					//节流
					setTimeout(() => {
						this.canToggleLike = true;
					}, 1000);
				}
			},
			addActive(index) {
				this.currentSize = index;
			},
			addChoose(index) {
				this.currentColor = index;
			},
			async checkFn() {
				let token = uni.getStorageSync('uni_id_token')
				return await checkTokenFn(token)
			},
			async detailProductFn(productid) {
				uni.showLoading({
					title: '加载中'
				})
				await deatilProduct({
						productid
					})
					.then(
						content => {
							let {
								result: {
									data
								}
							} = content;
							// console.log(data);
							let detailimg = data[0].content.ops;
							if (data.length !== 0) {
								this.Product = data;
								//尺码
								data.forEach((item) => {
									this.size.push(item.size)
								})
								data.forEach((item) => {
									this.color.push(item.color)
								})
								detailimg.forEach((item) => {
									this.contentimg.push(item.insert)
								})

							}
							// console.log(this.size);
							// console.log(this.color);
							// console.log(detailimg);
							// console.log(this.contentimg);
							// console.log(this.contentimg[0].image);
							// console.log('Product', this.Product);
							uni.hideLoading()
						}
					)
			},
			async addProduct() {
				let option = {};
				uni.showLoading({
					title: '加载中'
				})
				await this.checkFn().then(
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
						let size = this.size[0].split(',');
						let color = this.color[0].split(',');
						option.productid = this.detailId;
						option.img = this.Product[0].thumbnail[0];
						option.color = color[this.currentColor];
						option.size = size[this.currentSize];
						option.count = parseInt(this.count);
						option.title = this.Product[0].title;
						option.price = parseFloat(this.Product[0].price);
						// console.log(option.productid, option.size, option.title, option.color);
					})
					.then(() => {
						addBag(option).then(
							content => {
								// console.log(content);
								let {
									result: {
										errCode
									}
								} = content;
								uni.hideLoading()
								if (errCode === 0) {
									uni.showToast({
										title: '加购成功'
									})
								} else {
									uni.showToast({
										title: '加购失败',
										icon: "error"
									})
								}
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
			async allBagFn() {
				await allBag()
					.then(
						content => {
							let {
								result: {
									data
								}
							} = content;
							console.log(data);
						}
					)
			}
		},
		computed: {
			filteredContentimg() {
				return this.contentimg.filter(item => !item.includes('\n'));
			}
		},
		onLoad(option) {
			// console.log(2);
			this.detailId = option.productid;
			this.detailProductFn(this.detailId)
			// this.allBagFn()
		},
		// created() {
		// 	console.log(1);
		// 	this.detailId = option.productid;

		// 	this.detailProductFn(this.detailId)
		// }
		// watch: {
		// 	'$route.query': {
		// 		immediate: true,
		// 		handler(query) {
		// 			this.detailId = query.productid;
		// 			if (this.detailId !== undefined) {
		// 				this.detailProductFn(this.detailId)
		// 				// console.log(this.detailId);
		// 			}
		// 			// console.log(this.detailId);
		// 		}
		// 	}
		// }
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
	@c-9: #ffffff;

	uni-swiper .uni-swiper-dot-active {
		background-color: @c-2;
	}

	.detail {
		width: 100%;

		.detailbanner {
			width: 100%;
			height: 920rpx;
			padding: 0 30rpx;
			margin-top: 20rpx;
			box-sizing: border-box;

			uni-swiper {
				width: 100%;
				height: 100%;

				.uni-swiper-wrapper {
					width: 100%;
					height: 100%;

					.swiper-item {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

		.info {
			padding: 0 30rpx;
			margin-top: 40rpx;
			box-sizing: border-box;

			.title {
				font-size: 30rpx;
				line-height: 45rpx;
				color: @c-6;
			}

			.price {
				color: @c-4;
				font-size: 34rpx;
				margin: 10rpx 0;
			}

			.color {
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;

				.name {
					color: @c-6;
					font-size: 28rpx;
				}

				.totalColor {
					display: flex;

					.def {
						height: 50rpx;
						line-height: 50rpx;
						padding: 0 20rpx;
						text-align: center;
						color: @c-6;
						font-size: 28rpx;
						margin-left: 20rpx;
						border: 2rpx solid transparent;

						&.active {
							border: 2rpx solid @c-1;
							border-radius: 30rpx;
						}
					}
				}
			}

			.size {
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				.name {
					color: @c-6;
					font-size: 28rpx;
				}

				.totalSize {
					display: flex;

					.def {
						width: 50rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						border: 2rpx solid @c-5;
						border-radius: 50%;
						color: @c-6;
						font-size: 26rpx;
						margin-left: 20rpx;

						&.active {
							background-color: @c-1;
							border: 2rpx solid @c-1;
							color: #ffffff;
						}
					}
				}
			}
		}

		.blank {
			height: 112rpx;
		}

		.operate {
			display: flex;
			justify-content: space-between;
			background-color: @c-1;
			height: 112rpx;
			line-height: 112rpx;
			margin-top: 50rpx;
			position: fixed;
			width: 100%;
			bottom: 0;
			z-index: 100;

			.shopbag {
				display: flex;
				width: 50%;
				height: 100%;
				color: @c-9;
				justify-content: center;
				border-right: 2rpx solid @c-9;

				.order {
					font-size: 30rpx;
				}

				.like-button {
					height: 100%;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
					}
				}

			}

			.buy {
				flex-grow: 1;

				.rightnow {
					text-align: center;
					color: @c-9;
					font-size: 30rpx;
				}
			}
		}

		.detailcontent {
			padding: 30rpx;
			box-sizing: border-box;
			width: 100%;

			.pic {
				width: 100%;

				.img {
					width: 100%;

					image {
						width: 100%;
					}
				}
			}
		}
	}
</style>