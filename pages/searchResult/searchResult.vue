<template>
	<view class="searchResult">
		<topic></topic>
		<view class="inpSearch">
			<view class="ipt">
				<input type="text" @keydown.enter="searchFn" :value="searchQuery" placeholder-style="color: #555555"
					v-model="searchQuery">
			</view>
			<view class="btn">
				<view class="clearbtn" @click="clearBtn">
					<view class="img"></view>
				</view>
				<view class="searchbtn" @click="searchFn"></view>
			</view>
		</view>
		<view class="filter">
			<view class="leftinfo">
				<view class="totalProduct">{{Product.length}}件 商品</view>
			</view>
			<view class="rightinfo">
				<view class="mode">
					<view class="gridmode" v-if="!isChange" @click="changeMode">
						<view class="img">
							<image src="../../assets/gridmode.png" mode=""></image>
						</view>
					</view>
					<view class="listmode" v-else @click="changeMode">
						<view class="img">
							<image src="../../assets/listmode.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content" v-if="Product.length!==0">
			<view class="gridmode" v-if="!isChange">
				<block v-for="(item,index) in Product">
					<!-- <router-link :to="{path:'/pages/detail/detail',query:{productid:item._id}}"> -->
					<!-- <router-link to="/pages/detail/detail"> -->
					<view class="product" @click="goToDetail(item)">
						<view class="img">
							<image :src="`${item.thumbnail[0]}`" mode="widthFix"></image>
						</view>
						<view class="title">{{item.title}}</view>
						<view class="price">￥{{item.price}}</view>
					</view>
					<!-- </router-link> -->
				</block>
			</view>
			<view class="listmode" v-else>
				<block v-for="(item,index) in Product">
					<view class="product" @click="goToDetail(item)">
						<view class="leftimg">
							<image :src="`${item.thumbnail[0]}`" mode="widthFix"></image>
						</view>
						<view class="rightinfo">
							<view class="title">
								{{item.title}}
							</view>
							<view class="msg">
								<view class="price">￥{{item.price}}</view>
								<view class="bottom">
									<view class="size">
										<view class="name">尺码</view>
										<view class="totalSize">
											<block v-for="(sizetype, i) in size[index].split(',')">
												<view class="def">{{sizetype}}</view>
											</block>
										</view>
									</view>
									<like-button></like-button>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="null" v-else>
			<image src="../../assets/null.png" mode="widthFix"></image>
			<view class="text">暂无相关内容</view>
		</view>
	</view>
</template>

<script>
	import topic from "../../components/header/header.vue"
	import LikeButton from "../../components/likeButton/likeButton.vue"
	import {
		searchItem
	} from '../../api/index.js'
	export default {
		data() {
			return {
				isChange: false,
				size: [],
				searchQuery: '',
				Product: []
			};
		},
		methods: {
			changeMode() {
				this.isChange = !this.isChange;
			},
			clearBtn() {
				this.searchQuery = ''
			},
			goToDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?productid=${item._id}`,
				})
			},
			async searchFn() {
				let option = {};
				uni.showLoading({
					title: '加载中'
				})
				// console.log(this.searchQuery);
				option.keyword = this.searchQuery;
				await searchItem(option)
					.then((content) => {
						// console.log(content);
						let {
							result
						} = content;
						this.Product = result
						if (result.length !== 0) {
							//尺码
							result.forEach((item) => {
								this.size.push(item.size)
							})
							// console.log(this.size);
						}
						uni.hideLoading()
						// console.log(this.Product);
					})
			}
		},
		components: {
			topic,
			LikeButton
		},
		created() {
			const searchParam = this.$route.query.search;
			this.searchQuery = searchParam;
		},
		onLoad() {
			this.searchFn();
		},
		watch: {
			'$route.query': {
				immediate: true,
				handler(query) {
					const searchQuery = query.search;
					this.searchQuery = searchQuery;
					if(this.searchQuery!==undefined){
						this.searchFn()
					}
					// console.log(this.searchQuery);
				}
			}
		},
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
	@c-9: #f8f8f8;
	@c-10: #c3c3c3;
	@h-1: 46rpx;

	.searchResult {
		.inpSearch {
			margin: 0 30rpx;
			display: flex;
			height: 90rpx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid @c-10;

			.inp {
				flex-grow: 1;
			}

			.btn {
				display: flex;

				.clearbtn {
					width: 50rpx;
					height: 50rpx;
					background-color: @c-9;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					.img {
						width: 50%;
						height: 50%;
						background: url("../../assets/cancel3.png");
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
				}

				.searchbtn {
					width: 46rpx;
					height: 46rpx;
					background: url("../../assets/Search.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
					margin-left: 20rpx;
				}
			}
		}

		.filter {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			margin-top: 10rpx;

			.leftinfo {
				flex-grow: 1;

				.totalProduct {
					font-size: 30rpx;
					font-weight: 500;
				}
			}

			.rightinfo {
				.mode {
					margin-left: 20rpx;

					.gridmode,
					.listmode {
						width: 80rpx;
						height: 80rpx;
						background-color: @c-7;
						border-radius: 50%;
						display: flex;
						justify-content: center;
						align-items: center;

						.img {
							width: 40rpx;
							height: 40rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}

		.content {
			padding: 0 30rpx;
			box-sizing: border-box;

			.aboutType {
				display: flex;
				margin-top: 30rpx;

				.type,
				.detail {
					width: 150rpx;
					height: 60rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 2rpx solid @c-5;
					border-radius: 40rpx;
					color: @c-1;
					font-size: 28rpx;
				}

				.type {
					margin-right: 20rpx;
				}
			}

			.gridmode {
				margin-top: 40rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.product {
					width: 330rpx;
					margin-bottom: 30rpx;

					.img {
						width: 100%;
						height: 440rpx;
						overflow: hidden;

						image {
							width: 100%;
							// height: 100%;
						}
					}

					.title {
						width: 100%;
						height: 60rpx;
						line-height: 60rpx;
						color: @c-6;
						font-size: 30rpx;
						overflow: hidden;
						text-overflow: clip;
					}

					.price {
						color: @c-4;
						font-size: 32rpx;
					}
				}
			}

			.listmode {
				margin-top: 40rpx;


				.product {
					display: flex;
					margin-bottom: 30rpx;
					justify-content: start;

					.leftimg {
						width: 200rpx;
						height: 268rpx;

						image {
							width: 200rpx;
						}
					}

					.rightinfo {
						padding-left: 30rpx;
						display: flex;
						flex-grow: 1;
						flex-direction: column;
						justify-content: space-between;

						.title {
							color: @c-1;
							overflow: hidden;
							margin: 10rpx 0 20rpx 0;
							font-size: 28rpx;
							line-height: @h-1;
							max-height: @h-1*2;
							text-overflow: clip;
						}

						.msg {
							.price {
								color: @c-4;
								font-size: 34rpx;
								margin-bottom: 10rpx;
							}

							.bottom {
								display: flex;
								justify-content: space-between;

								.size {
									display: flex;
									align-items: center;

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
										}
									}
								}
							}
						}
					}
				}
			}
		}

		.null {
			display: flex;
			flex-direction: column;
			align-items: center;

			.text {
				color: @c-2;
				font-size: 28rpx;
			}
		}
	}
</style>