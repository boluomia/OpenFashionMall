<template>
	<view class="my">
		<view class="head">
			<div class="left">
				<view class="headimg">
					<image src="../../assets/1.png" mode=""></image>
				</view>
			</div>
			<div class="right">
				<view class="nickname">哈哈哈</view>
				<div class="signature">
					哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
				</div>
			</div>
		</view>
		<view class="list">
			<view class="want">
				<view class="img">
					<image src="../../assets/like.png" mode="widthFix"></image>
				</view>
				<view class="title">想要</view>
			</view>
			<view class="feet">
				<view class="img">
					<image src="../../assets/recentlook.png" mode="widthFix"></image>
				</view>
				<view class="title">足迹</view>
			</view>
		</view>
		<view class="order">
			<view class="orderhead">
				<view class="title">订单</view>
				<view class="allorder">
					<view class="total">全部</view>
					<view class="totalicon">
						<view class="img">
							<image src="../../assets/turnright.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<block v-for="(item,index) in category">
					<view class="item">
						<view class="icon">
							<view class="img">
								<image :src="item.src" mode="widthFix"></image>
							</view>
						</view>
						<view class="name">{{item.type}}</view>
					</view>
				</block>
			</view>
		</view>
		<view class="tools">
			<view class="title">我的工具</view>
			<view class="content">
				<block v-for="(item,index) in tools">
					<view class="item">
						<view class="icon" :style="{ 'background-image': 'url(' + item.src + ')' }"></view>
						<view class="type">{{item.type}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				category: [{
						id: 1,
						src: "https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/pay.png",
						type: '待付款'
					},
					{
						id: 2,
						src: "https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/nosend.png",
						type: '待发货'
					},
					{
						id: 3,
						src: "https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/sended.png",
						type: '待收获'
					},
					{
						id: 4,
						src: "https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/say.png",
						type: '待评价'
					}
				],
				tools: [
					{
						id: 1,
						type: '个人信息',
						src:'https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/modify.png'
					},
					{
						id: 2,
						type: '收货地址',
						src: 'https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/address.png'
					},
					{
						id: 3,
						type: '退出登录',
						src: 'https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/myicon/exit.png'
					}
				]
			};
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
	@c-9: #cccccc;
	@c-10: #f9f9f9;

	.my {
		padding: 0 30rpx;

		.head {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.left {
				.headimg {
					width: 140rpx;
					height: 140rpx;
					overflow: hidden;
					border-radius: 50%;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}

			.right {
				flex-grow: 1;
				margin-left: 40rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.nickname {
					color: @c-1;
					font-weight: bold;
					height: 50rpx;
					line-height: 50rpx;
				}

				.signature {
					// width: 100%;
					max-width: 400rpx;
					font-size: 28rpx;
					height: 50rpx;
					line-height: 50rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

		}

		.list {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-between;

			.want,
			.feet {
				display: flex;
				flex-grow: 1;
				justify-content: center;
				align-items: center;
				border: 3rpx solid @c-9;
				padding: 13rpx 0;

				.img {
					width: 40rpx;
					height: 40rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.title {
					font-size: 26rpx;
					color: @c-1;
					margin-left: 20rpx;
				}
			}

			.want {
				border-bottom-left-radius: 30rpx;
				border-top-left-radius: 30rpx;
				border-right: none;
			}

			.feet {
				border-bottom-right-radius: 30rpx;
				border-top-right-radius: 30rpx;
			}
		}

		.order {
			margin-top: 30rpx;

			.orderhead {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 60rpx;
				line-height: 60rpx;

				.title {
					font-size: 28rpx;
					font-weight: bold;
					padding-left: 10rpx;
					box-sizing: border-box;
				}

				.allorder {
					display: flex;
					align-items: center;

					.total {
						font-size: 26rpx;
						color: #888888;
					}

					.totalicon {
						.img {
							height: 50rpx;
							width: 50rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

					}
				}
			}

			.content {
				display: flex;
				justify-content: space-around;
				margin-top: 20rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.icon {
						border: 4rpx solid @c-10;
						padding: 20rpx;
						box-sizing: border-box;
						border-radius: 50%;
						background-color: @c-10;

						.img {
							width: 50rpx;
							height: 50rpx;
						}

						image {
							width: 100%;
							height: 100%;
						}
					}

					.name {
						margin-top: 10rpx;
						font-size: 26rpx;
						color: @c-1;
					}
				}
			}
		}
		.tools{
			margin-top: 50rpx;
			.title {
				font-size: 28rpx;
				font-weight: bold;
				padding-left: 10rpx;
				box-sizing: border-box;
			}
			.content{
				margin-top: 30rpx;
				padding-left: 10rpx;
				box-sizing: border-box;
				.item{
					display: flex;
					margin-bottom: 20rpx;
					.icon{
						width: 45rpx;
						height: 45rpx;
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
					.type{
						font-size: 28rpx;
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>