<template>
	<view class="home">
		<topic></topic>
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image mode="widthFix"
							src="https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/cloudstorage/bbce8c7f-ca05-4d2d-885f-5e0a79bed828.png"
							alt="">
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image mode="widthFix"
							src="https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/cloudstorage/2591ba20-aef8-4247-aa0e-8a7640c20972.png"
							alt="">
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image mode="widthFix"
							src="https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/cloudstorage/e49db8c7-26bb-4292-9ac7-e44a80954424.png"
							alt="">
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="newitem">
				<view class="newhead">
					<view class="title">新 品 推 荐</view>
					<view class="decoration">
						<image src="../../assets/decoration.png" mode=""></image>
					</view>
				</view>
				<view class="newcontent">
					<view class="newcategory">
						<view class="totaltype">
							<block v-for="(item,index) in newType">
								<view class="type" :class="{active:index===currentNewTypeIndex}"
									@click="isClick(index)">
									{{item.type}}
								</view>
							</block>
						</view>
						<view class="typecontent">
							<block>
								<view class="contentitem">
									<view class="img">
										<image src="../../assets/1.png" mode="widthFix"></image>
									</view>
									<view class="topic">
										<view class="title">
											21WN reversible angora cardigan
										</view>
									</view>

									<view class="price">
										￥120
									</view>
								</view>
								<view class="contentitem">
									<view class="img">
										<image
											src="https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/cloudstorage/bbce8c7f-ca05-4d2d-885f-5e0a79bed828.png"
											mode="widthFix"></image>
									</view>
									<view class="topic">
										<view class="title">
											【黑天鹅系列】AIVEI欣贺艾薇2023夏新甜酷设计感水钻网纱黑色T恤
										</view>
									</view>

									<view class="price">
										￥120
									</view>
								</view>
								<view class="contentitem">
									<view class="img">
										<image src="../../assets/4.png" mode="widthFix"></image>
									</view>
									<view class="topic">
										<view class="title">
											Oblong bag
										</view>
									</view>
									<view class="price">
										￥120
									</view>
								</view>
								<view class="contentitem">
									<view class="img">
										<image src="../../assets/3.png" mode="widthFix"></image>
									</view>
									<view class="topic">
										<view class="title">
											21WN reversible angora cardigan
										</view>
									</view>
									<view class="price">
										￥120
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
				<view class="more">
					<view class="lookmore">查 看 更 多</view>
					<view class="righticon">
						<image src="../../assets/rightarrow.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="justforyou">
				<view class="fouyouhead">
					<view class="title">为 你 推 荐</view>
					<view class="decoration">
						<image src="../../assets/decoration.png" mode=""></image>
					</view>
				</view>
				<view class="foryoucontent">
					<view class="foryou">
						<block>
							<view class="contentitem">
								<view class="img">
									<image src="../../assets/1.png" mode="widthFix"></image>
								</view>
								<view class="title">
									21WN reversible angora cardigan
								</view>
								<view class="price">
									￥120
								</view>
							</view>
							<view class="contentitem">
								<view class="img">
									<image
										src="https://mp-f54ce820-c168-43fc-9171-88a642fd351e.cdn.bspapp.com/cloudstorage/bbce8c7f-ca05-4d2d-885f-5e0a79bed828.png"
										mode="widthFix"></image>
								</view>

								<view class="title">
									【黑天鹅系列】AIVEI欣贺艾薇2023夏新甜酷设计感水钻网纱黑色T恤
								</view>
								<view class="price">
									￥120
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topic from "../../components/header/header.vue"
	export default {
		data() {
			return {
				currentNewTypeIndex: 0,
				newType: [{
						id: 1,
						type: "连衣裙"
					},
					{
						id: 2,
						type: "上衣"
					},
					{
						id: 3,
						type: "裤子"
					},
					{
						id: 4,
						type: "半身裙"
					},
					{
						id: 5,
						type: "外套"
					},
				],
				newTypeContent: []
			};
		},
		components: {
			topic
		},
		methods: {
			isClick(index) {
				this.currentNewTypeIndex = index;
				// console.log(this.currentNewTypeIndex);
			},
		}
	}
</script>

<style lang="less" scoped>
	@h-1: 36rpx;
	@c-1: #333333;
	@c-2: #888888;
	@c-3: #000000;
	@c-4: #DD8560;

	.home {
		width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
		padding: 0rpx 0rpx 120rpx 0rpx;
		box-sizing: border-box;

		.banner {
			width: 100%;
			height: 1000rpx;

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

		.content {
			padding: 0 30rpx;
			box-sizing: border-box;
			margin-top: 60rpx;
			width: 100%;

			.newitem {
				width: 100%;

				.newhead {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.title {
						width: 100%;
						text-align: center;
						font-weight: bold;
						color: @c-1;
					}

					.decoration {
						width: 250rpx;
						height: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.newcontent {
					width: 100%;
					margin-top: 65rpx;

					.newcategory {
						width: 100%;

						.totaltype {
							width: 100%;
							display: flex;
							justify-content: space-between;
							padding: 0rpx 40rpx;
							box-sizing: border-box;

							.type {
								color: @c-2;
								font-size: 30rpx;

								&.active {
									color: @c-3;

									&::after {
										content: "";
										display: block;
										width: 100%;
										height: 12rpx;
										margin: 10rpx auto;
										transform: translateX(40%);
										background: url("../../assets/Rectangle.png");
										background-repeat: no-repeat;

									}
								}
							}
						}

						.typecontent {
							margin-top: 25rpx;
							width: 100%;
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;

							.contentitem {
								width: 330rpx;
								margin-bottom: 30rpx;

								.img {
									width: 100%;
									height: 400rpx;
									overflow: hidden;

									image {
										width: 100%;
									}
								}

								.topic {
									// display: flex;
									// align-items: center;
									// justify-content: center;

									.title {
										padding: 0rpx 15rpx;
										margin: 15rpx 0rpx;
										overflow: hidden;
										line-height: @h-1;
										font-size: 26rpx;
										text-align: center;
										text-overflow: clip;
										height: 2*@h-1;
										color: @c-1;
									}
								}


								.price {
									text-align: center;
									color: @c-4;
								}
							}
						}

					}
				}

				.more {
					margin-top: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.lookmore {
						font-size: 26rpx;
					}

					.righticon {
						width: 36rpx;
						height: 36rpx;
						margin-left: 20rpx;

						image {
							width: 100%;
						}
					}
				}
			}

			.justforyou {
				width: 100%;
				margin-top: 60rpx;

				.fouyouhead {
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.title {
						width: 100%;
						text-align: center;
						font-weight: bold;
						color: @c-1;
					}

					.decoration {
						width: 250rpx;
						height: 20rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.foryoucontent {
					width: 100%;
					margin-top: 65rpx;

					.foryou {
						margin-top: 25rpx;
						width: 100%;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;

						.contentitem {
							width: 330rpx;
							margin-bottom: 30rpx;

							.img {
								width: 100%;
								height: 400rpx;
								overflow: hidden;

								image {
									width: 100%;
								}
							}

							.title {
								padding: 0rpx 15rpx;
								margin: 15rpx 0rpx;
								overflow: hidden;
								line-height: @h-1;
								font-size: 26rpx;
								text-align: center;
								text-overflow: clip;
								max-height: 2*@h-1;
								color: @c-1;
							}

							.price {
								text-align: center;
								color: @c-4;
								font-size: 32rpx;
							}
						}
					}
				}
			}
		}


	}
</style>