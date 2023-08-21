<template>
	<view class="category">
		<topic></topic>
		<view class="filter">
			<view class="leftinfo">
				<view class="totalProduct">{{this.Product.length}}件 商品</view>
			</view>
			<view class="rightinfo">
				<view class="choose">
					<select name="type" id="clothtype" v-model="selectedPattern" @change="updateDetail($event)"
						v-if="type==='女装'">
						<option :value="item.name" :selected="pattern===selectedPattern"
							v-for="(item,index) in femaleType">
							{{item.name}}
						</option>
					</select>
					<select name="type" id="clothtype" v-model="selectedPattern" @change="updateDetail($event)"
						v-if="type==='男装'">
						<option :value="item.name" :selected="pattern===selectedPattern"
							v-for="(item,index) in maleType">
							{{item.name}}
						</option>
					</select>
					<select name="type" id="clothtype" v-model="selectedPattern" @change="updateDetail($event)"
						v-if="type==='童装'">
						<option :value="item.name" :selected="pattern===selectedPattern"
							v-for="(item,index) in childrenType">
							{{item.name}}
						</option>
					</select>
				</view>
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
		<view class="content">
			<view class="aboutType">
				<view class="type">{{type}}</view>
				<view class="detail">{{selectedPattern}}</view>
			</view>
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
					<!-- <router-link :to="{path:'/pages/detail/detail',query:{productid:item._id}}"> -->
						<view class="product"  @click="goToDetail(item)">
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
					<!-- </router-link> -->
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import topic from "../../components/header/header.vue"
	import LikeButton from "../../components/likeButton/likeButton.vue"
	import {
		getproductCategory,
		aboutProduct
	} from '../../api/index.js'
	export default {
		data() {
			return {
				ids: [],
				isChange: false,
				isLike: false,
				liked: {},
				currentClick: -1,
				type: '',
				pattern: '',
				selectedPattern: '',
				size: [],
				Product: [],
				femaleType: [],
				maleType: [],
				childrenType: [],
				foundItem: [],
				currentId: [],
			};
		},
		components: {
			topic,
			LikeButton
		},
		methods: {
			changeMode() {
				this.isChange = !this.isChange;
			},
			addLike(index) {
				this.$set(this.liked, index, !this.liked[index]);
				// console.log(index);
			},
			updateDetail(event) {
				this.pattern = this.selectedPattern;
				// console.log(this.selectedPattern);
				// console.log(event);
			},
			async getCategoryIDs() {
				await getproductCategory().then(
					content => {
						let {
							result: {
								data
							}
						} = content;
						// console.log(data);
						// console.log(content);
						if (data.length != 0) {
							data.forEach((item, index) => {
								this.ids.push(item._id)
							})
							//类别
							this.femaleType = data.filter(item => item.description === '女装')
								.map(item => {
									item.name = item.name.replace('女装', '');
									return item;
								});
							this.maleType = data.filter(item => item.description === '男装')
								.map(item => {
									item.name = item.name.replace('男装', '');
									return item;
								})
							this.childrenType = data.filter(item => item.description === '童装')
								.map(item => {
									item.name = item.name.replace('童装', '');
									return item;
								})
							// console.log(this.femaleType);
							// console.log('1.0',this.foundItem._id);
							this.foundItem = data.find(
								item => item.description.includes(this.type) && item.name.includes(this
									.pattern)
							);
							this.currentId = this.foundItem._id;
							if (this.currentId) {
								this.getProductFn(this.currentId)
							}

						}
						// console.log(this.ids);
					}
				)
			},
			async getProductFn(id) {
				uni.showLoading({
					title: '加载中'
				})
				// const id = this.id;
				await aboutProduct({
						id
					})
					.then(
						content => {
							let {
								result: {
									data
								}
							} = content;
							// console.log(id);
							this.Product = data;
							// console.log('Product', this.Product);
							// console.log(this.size);
							if (data.length !== 0) {
								//尺码
								data.forEach((item) => {
									this.size.push(item.size)
								})
							}
							uni.hideLoading()
						}
					)
			},
			goToDetail(item){
				uni.navigateTo({
					url:`/pages/detail/detail?productid=${item._id}`,
				})
			},
			
		},
		onLoad() {
			// this.getCategoryIDs()
		},
		watch: {
			'$route.query': {
				immediate: true,
				handler(query) {
					const id = query.id;
					const type = query.type;
					const pattern = query.pattern;
					this.id = id;
					// console.log(this.id);
					// console.log(this.ids);
					this.type = type;
					this.pattern = pattern;
					this.selectedPattern = pattern;
					if (this.id !== undefined) {
						this.getProductFn(this.id)
						// console.log(1);
						this.getCategoryIDs()
					}
				}
			},
			selectedPattern: function(newPattern) {
				if (this.id !== undefined) {
					// console.log(2);
					this.getCategoryIDs();
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
	@h-1: 46rpx;

	.category {
		.filter {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			margin-top: 10rpx;
			// line-height: 80rpx;

			.leftinfo {
				flex-grow: 1;

				.totalProduct {
					font-size: 30rpx;
					font-weight: 500;
				}
			}

			.rightinfo {
				display: flex;
				flex-grow: 1;
				justify-content: end;
				align-items: center;

				.choose {
					height: 80rpx;

					select {
						height: 100%;
						padding: 0rpx 53rpx;
						border-radius: 40rpx;
						color: @c-6;
						appearance: none;
						-moz-appearance: none;
						-webkit-appearance: none;
						background: url("../../assets/down.png") no-repeat scroll right 24rpx center transparent;
						background-size: 22rpx 22rpx;
						border: 2rpx solid @c-7;
						background-color: @c-7;

						&:focus {
							outline: 2rpx solid @c-7;
							box-shadow: none;
						}

						// &:invalid{
						// 	box-shadow: none;
						// 	color: #DD8560;
						// }

						option {
							background-color: @c-7;
							box-shadow: none;
							border: none;
						}
					}
				}

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

					// .listmode {
					// 	.img {
					// 		width: 50rpx;
					// 		height: 50rpx;

					// 		image {
					// 			width: 100%;
					// 			height: 100%;
					// 		}
					// 	}
					// }
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
										// margin-right: 30rpx;
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

	}
</style>