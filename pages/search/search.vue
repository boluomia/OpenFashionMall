<template>
	<view class="search">
		<view class="inputsearch">
			<view class="searchicon" @click="goToSearchResult">
				<image src="../../assets/Search.png" mode="widthFix" alt="搜索"></image>
			</view>
			<view class="input">
				<input v-model="iptvalue" @keydown.enter="goToSearchResult" type="text" placeholder="搜索内容"
					placeholder-style="color: #555555">
			</view>
			<view class="cancelbtn" @click="goBack">
				<image src="../../assets/cancel2.png" mode="widthFix" alt="取消">
			</view>
		</view>
		<view class="recentsearch" v-show="history.length!==0">
			<view class="title">历史搜索</view>
			<view class="totalsearch">
				<block v-for="(item,index) in history" :key="index">
					<view class="searchitem" @click="aboutSearch(index)">
						<view class="item">
							<view class="searchcontent">{{item}}</view>
						</view>
						<view class="remove" @click.stop="removeItem(index)"></view>
					</view>
				</block>
			</view>
		</view>
		<view class="hotsearch">
			<view class="title">热门搜索</view>
			<view class="totalHot">
				<block v-for="(item,index) in hotSearch">
					<view class="hotitem">
						<text class="item">{{item}}</text>
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
				iptvalue: '',
				history: [],
				hotSearch: ["运动休闲", "夏日牛仔自由", "夏日都市简雅衣橱"]
			};
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			},
			goToSearchResult() {
				let historyContent = JSON.parse(localStorage.getItem('searchHistory')) || [];
				if (this.iptvalue.trim() !== '') {
					historyContent.push(this.iptvalue.trim());
					// 使用Set对数组进行去重
					let uniqueHistory = Array.from(new Set(historyContent));
					localStorage.setItem('searchHistory', JSON.stringify(uniqueHistory));
					this.history = uniqueHistory;
					this.$router.push({
						path: '/pages/searchResult/searchResult',
						query: {
							search: this.iptvalue.trim()
						}
					});
					this.iptvalue = '';
				}
			},
			removeItem(index) {
				let historyContent = JSON.parse(localStorage.getItem('searchHistory')) || [];
				historyContent.splice(index, 1);
				localStorage.setItem('searchHistory', JSON.stringify(historyContent));
				this.history = historyContent;
			},
			historySearch() {
				let value = this.iptvalue;
				// console.log(value);
			},
			aboutSearch(index) {
				// console.log(index);
				this.$router.push({
					path: '/pages/searchResult/searchResult',
					query: {
						search: this.history[index]
					}
				});
			}
		},
		onLoad() {
			this.history=JSON.parse(localStorage.getItem('searchHistory')) || [];
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

	.search {
		padding: 0 30rpx;
		box-sizing: border-box;

		.inputsearch {
			margin-top: 10rpx;
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 2rpx solid @c-6;

			.searchicon {
				width: 40rpx;
				height: 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.cancelbtn {
				width: 30rpx;
				height: 30rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.input {
				flex-grow: 1;

				input {
					text-indent: 30rpx;
					color: @c-6;
				}
			}

		}

		.recentsearch {
			margin-top: 50rpx;

			.title {
				color: @c-2;
				font-size: 30rpx;
			}

			.totalsearch {
				margin-top: 25rpx;
				display: flex;
				flex-wrap: wrap;
				// justify-content: space-between;

				.searchitem {
					max-width: 100%;
					border: 2rpx solid @c-7;
					box-sizing: border-box;
					border-radius: 40rpx;
					height: 72rpx;
					line-height: 72rpx;
					// width: 150rpx;
					display: flex;
					// justify-content: space-evenly;
					align-items: center;
					padding: 0rpx 37rpx;
					background-color: @c-7;
					margin-bottom: 25rpx;
					margin-right: 30rpx;
					text-overflow: ellipsis;

					.item {
						font-size: 28rpx;
						color: @c-6;
						margin-right: 15rpx;
						box-sizing: border-box;
						height: 100%;
						overflow: hidden;
						// white-space: nowrap;
						text-overflow: ellipsis;

					}

					.remove {
						margin-top: 5rpx;
						height: 24rpx;
						width: 24rpx;
						background: url("../../assets/cancel3.png");
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
				}

			}
		}

		.hotsearch {
			margin-top: 30rpx;

			.title {
				color: @c-2;
				font-size: 30rpx;
			}

			.totalHot {
				margin-top: 25rpx;

				.hotitem {
					.item {
						display: inline-block;
						border: 2rpx solid @c-7;
						box-sizing: border-box;
						border-radius: 40rpx;
						height: 72rpx;
						line-height: 72rpx;
						font-size: 28rpx;
						margin-bottom: 30rpx;
						padding: 0rpx 40rpx;
						color: @c-6;
						background-color: @c-7;
					}

				}
			}

		}
	}
</style>