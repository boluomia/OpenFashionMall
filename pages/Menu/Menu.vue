<template>
	<view class="Menu">
		<view class="menuhead">
			<view class="return" @click="goBack">
				<image src="../../assets/cancel1.png" alt="">
			</view>
		</view>
		<view class="category">
			<block v-for="(item,index) in apparelType">
				<view class="appareltype" :class="{active:index===currentApparelTypeIndex}" @click="isClick(index)">
					{{item.type}}
				</view>
			</block>
		</view>
		<view class="content">
			<block v-for="(item,index) in femaleType" v-if="currentItemType=='女装'">
				<router-link
					:to="{ path: '/pages/category/category', query: { type: currentItemType, pattern: item.name ,id: getIdParameter(item.name)} }">
					<view class="detailType">
						{{item.name}}
						<view class="go"></view>
					</view>
				</router-link>
			</block>
			<block v-for="(item,index) in maleType" v-if="currentItemType=='男装'">
				<router-link
					:to="{ path: '/pages/category/category', query: { type: currentItemType, pattern: item.name,id: getIdParameter(item.name) } }">
					<view class="detailType">
						{{item.name}}
						<view class="go"></view>
					</view>
				</router-link>
			</block>
			<block v-for="(item,index) in childrenType" v-if="currentItemType=='童装'">
				<router-link
					:to="{ path: '/pages/category/category', query: { type: currentItemType, pattern: item.name,id: getIdParameter(item.name) } }">
					<view class="detailType">
						{{item.name}}
						<view class="go"></view>
					</view>
				</router-link>
			</block>
		</view>
		<view class="decoration">
			<view class="img">
				<image src="../../assets/decoration.png" mode=""></image>
			</view>
		</view>
		<view class="tip">衣缘堂</view>
	</view>
</template>

<script>
	import {
		getproductCategory
	} from '../../api/index.js'
	export default {
		data() {
			return {
				currentApparelTypeIndex: 0, //女装男装童装
				currentItemType: "女装",
				currentid: '',
				allcontent: [],
				apparelType: [{
						id: 1,
						type: "女装"
					},
					{
						id: 2,
						type: "男装"
					},
					{
						id: 3,
						type: "童装"
					}
				],
				femaleType: [],
				maleType: [],
				childrenType: []
			};
		},
		methods: {
			isClick(index) {
				this.currentApparelTypeIndex = index;
				// console.log(this.currentApparelTypeIndex)
				this.currentItemType = this.apparelType[index].type;
				// console.log(this.currentItemType);
			},
			goBack() {
				// this.$router.go(-1);
				uni.navigateTo({
					url: '/pages/home/home'
				})
			},
			getIdParameter(name) {
				const foundItem = this.allcontent.find(
					item => item.description.includes(this.currentItemType) && item.name.includes(name)
				);
				return foundItem ? foundItem._id : null;
			},
			async getCategory() {
				uni.showLoading({
					title: '加载中'
				})
				await getproductCategory()

					.then(content => {

						let {
							result: {
								data
							}
						} = content;
						this.allcontent = data;
						// console.log(this.allcontent);
						// console.log(data);
						if (data.length !== 0) {
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
						}
						uni.hideLoading()
						// console.log(this.maleType);
					});
			}
		},
		onLoad() {
			this.getCategory();
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

	.Menu {
		padding: 0 30rpx;
		box-sizing: border-box;

		.menuhead {
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

		.category {
			width: 100%;
			// padding-bottom: 30rpx;
			border-bottom: 1px solid @c-5;
			display: flex;
			justify-content: space-between;

			.appareltype {
				width: 30%;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				color: @c-2;
				font-size: 30rpx;

				&.active {
					color: @c-3;
					border-bottom: 1px solid @c-4;

					&::after {
						content: "";
						display: block;
						width: 100%;
						height: 20rpx;
						// margin: 10rpx auto;
						transform: translate(45%, -50%);
						background: url("../../assets/lingxing.png");
						background-size: contain;
						background-repeat: no-repeat;

					}
				}
			}
		}

		.content {
			margin-top: 35rpx;

			.detailType {
				height: 140rpx;
				padding: 0rpx 5%;
				line-height: 140rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: @c-1;

				.go {
					width: 70rpx;
					height: 70rpx;
					background: url("../../assets/turnright.png");
					background-size: 100% 100%;
					background-repeat: no-repeat;
				}
			}

		}

		.decoration {
			margin-top: 60rpx;
			display: flex;
			justify-content: center;

			.img {
				width: 250rpx;
				height: 20rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

		}

		.tip {
			text-align: center;
			color: @c-5;
			margin-top: 20rpx;
			font-size: 28rpx;
		}
	}
</style>