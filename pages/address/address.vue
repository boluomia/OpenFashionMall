<template>
	<view class="address">
		<view class="people">
			<view class="title">收货人</view>
			<view class="ipt">
				<input type="text" placeholder="名字" v-model="nameValue">
			</view>
		</view>
		<view class="telephone">
			<view class="title">手机号码</view>
			<view class="ipt">
				<input type="text" placeholder="手机号" v-model="phoneValue">
			</view>
		</view>
		<view class="area">
			<view class="title">所在地区</view>
			<view class="ipt">
				<view @click="showMulLinkageThreePicker" class="choose">{{cityName}}</view>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker"
					:pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm">
				</mpvue-city-picker>
			</view>
		</view>
		<view class="detailaddress">
			<view class="title">详细地址</view>
			<view class="ipt">
				<textarea v-model="addressValue" name="address" id="detailaddress" cols="30" rows="10"
					placeholder="小区楼栋/乡村名称"></textarea>
			</view>
		</view>
		<view class="default">
			<view class="title">设为默认收获地址</view>
			<view class="chosebtn">
				<view class="checkbox" :class="{ active: isDefault }" @click="changeActive">
					<i></i>
				</view>
			</view>
		</view>
		<view class="save" @click="addNewAddressFn">保存</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		checkTokenFn,
		addAddress
	} from '../../api/index.js'
	export default {
		data() {
			return {
				isDefault: false,
				cityName: "请选择",
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#DD8560',
				nameValue: '',
				phoneValue: '',
				addressValue: '',
				content: []
			};
		},
		methods: {
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.cityName = e.label
			},
			onCancel(e) {
				console.log(e)
			},
			changeActive() {
				this.isDefault = !this.isDefault
			},
			//校验Token
			async checkFn() {
				let token = uni.getStorageSync('uni_id_token')
				return await checkTokenFn(token)
			},
			async addNewAddressFn() {
				let option = {};
				let that = this;
				uni.showLoading({
					title: '加载中'
				})
				await this.checkFn()
					.then(
						content => {
							console.log(content);
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
						// console.log('test1');
						const phoneRegex = /^1[3456789]\d{9}$/;
						if (this.nameValue.length !== 0 && this.cityName !== '请选择' && this.addressValue.length !==
							0) {
							console.log('test2');
							if (this.phoneValue.length !== 0 && phoneRegex.test(this.phoneValue)) {
								option.consumernick = this.nameValue;
								option.phonenumber = parseInt(this.phoneValue);
								option.city = this.cityName;
								option.address = this.addressValue;
								option.defaultaddress = this.isDefault;
								// console.log('test3');
								addAddress(option)
									.then(content => {
										// console.log('address',content);
										// console.log('test999');
										if (content.success === true) {
											uni.hideLoading();
											console.log(content);
											console.log('test4');
										}
									})
									.then(() => {
										console.log('test5');
										uni.navigateTo({
											url: '/pages/totalAddress/totalAddress?goods=' +
												encodeURIComponent(JSON.stringify(
													that.content))
										});
									});
							} else {
								// console.log('test6');
								uni.showToast({
									title: '手机号码不正确',
									icon: 'error'
								});
							}
						} else {
							// console.log('test7');
							if (this.nameValue.length === 0) {
								uni.hideLoading();
								// console.log('test8');
								uni.showToast({
									title: '收货人不能为空',
									icon: 'error'
								});
							} else if (this.phoneValue.length === 0) {
								uni.hideLoading();
								// console.log('test9');
								uni.showToast({
									title: '手机号码不能为空',
									icon: 'error'
								});
							} else if (this.cityName === '请选择') {
								uni.hideLoading();
								// console.log('test10');
								uni.showToast({
									title: '尚未选择所在地区',
									icon: 'error'
								});
							} else if (this.addressValue.length === 0) {
								uni.hideLoading();
								// console.log('test11');
								uni.showToast({
									title: '尚未填写详细地址',
									icon: 'error'
								});
							}
						}
						// console.log(option.uid, option.consumernick, option.phonenumber, option.city, option.address,option.defaultaddress);
					})
					.catch(() => {
						// console.log('test12');
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/login/login'
						})
					});
			}
		},
		components: {
			mpvueCityPicker
		},
		onLoad(options) {
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

	.address {
		padding: 0 30rpx;
		width: 100%;
		box-sizing: border-box;

		.people,
		.telephone,
		.area,
		.default {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 40rpx;
			font-size: 28rpx;

			.title {
				font-weight: bold;
				font-size: 32rpx;
				min-width: 150rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin-right: 10rpx;
				font-size: 30rpx;
			}

			.ipt {
				flex-grow: 1;
				height: 70rpx;
				line-height: 70rpx;
				background-color: @c-7;
				border-radius: 30rpx;
				padding: 0 0 0 40rpx;

				input {
					height: 70rpx;
					line-height: 70rpx;
					font-size: 28rpx;
					// text-indent: 30rpx;
				}

			}
		}

		.area {
			.ipt {
				.choose {
					color: @c-12;
				}
			}
		}

		.detailaddress {
			display: flex;
			justify-content: space-between;
			margin-top: 40rpx;
			font-size: 28rpx;

			.title {
				font-weight: bold;
				font-size: 32rpx;
				min-width: 150rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin-right: 10rpx;
				font-size: 30rpx;
			}

			.ipt {
				flex-grow: 1;
				height: 150rpx;
				// line-height: 70rpx;
				background-color: @c-7;
				border-radius: 30rpx;
				padding: 10rpx 40rpx 0 40rpx;

				textarea {
					width: 100%;
					height: 100%;
					line-height: 50rpx;
					overflow-y: auto;
					font-size: 28rpx;
					resize: vertical;
				}
			}
		}

		.save {
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

		.default {
			.chosebtn {
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
			}
		}
	}
</style>