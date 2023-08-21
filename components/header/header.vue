<template>
	<view class="header">
		<view class="content">
			<view class="leftbox">
				<router-link to="/pages/home/home">
					<view class="home">
						<image src="../../assets/home.png" alt="">
					</view>
				</router-link>
				<router-link to="/pages/Menu/Menu">
					<view class="menu">
						<image src="../../assets/Menu.png" alt="">
					</view>
				</router-link>

				<router-link to="/pages/search/search">
					<view class="search">
						<image src="../../assets/Search.png" alt="">
					</view>
				</router-link>
			</view>
			<view class="centerbox">
				<view class="name">衣缘堂</view>
			</view>
			<view class="rightbox">
				<router-link to="/pages/shoppingbag/shoppingbag">
					<view class="shopbag">
						<image src="../../assets/shoppingbag.png" alt="">
					</view>
				</router-link>
				<router-link to="/pages/my/my">
					<view class="my">
						<image src="../../assets/my.png" alt="">
					</view>
				</router-link>
			</view>
		</view>
		<view class="blank"></view>
	</view>
</template>

<script>
	export default {
		name: "topic",
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	@c-1: #333333;

	.header {
		width: 100%;
		height: 100rpx;

		.blank {
			height: 100rpx;
			width: 100%;
		}

		.content {
			position: fixed;
			height: 100rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			top: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #ffffff;
			z-index: 100;

			.leftbox,
			.centerbox,
			.rightbox {
				display: flex;

				.home,
				.menu,
				.search,
				.my,
				.shopbag {
					width: 46rpx;
					height: 46rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.menu,
				.home {
					margin-right: 30rpx;
				}

				.my {
					margin-left: 30rpx;
				}

				.name {
					margin-right: 70rpx;
					color: @c-1;
					font-size: 32rpx;
				}
			}

		}



	}
</style>