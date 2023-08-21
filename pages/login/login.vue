<template>
	<view class="content">
		<view class="username">
			<input type="text" v-model="username" placeholder="用户名" />
		</view>
		<view class="password">
			<input type="password" v-model="password" placeholder="密码" />
		</view>
		<view class="btn">
			<button class="register" @click="register()">注册</button>
			<button class="login" @click="login()">登录</button>
		</view>
		<!-- <button class="logout" @click="logout()">退出</button> -->
		<!-- <text>{{token}}</text> -->
		<!-- <button class="check" @click="bottonFn">检测</button> -->
	</view>
</template>

<script>
	import {
		checkTokenFn
	} from '../../api/index.js';
	export default {
		data() {
			return {
				title: 'Hello',
				username: "",
				password: "",
				token: ""
			}
		},
		onLoad() {

		},
		methods: {
			req(action, params) {
				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						name: 'shoplogin',
						data: {
							action,
							params
						},
						success: res => {
							resolve(res.result);
						},
						fail: res => {
							reject(res.result);
						}
					})
				})
			},
			register() {
				this.req("register", {
					username: this.username,
					password: this.password
				}).then(res => {
					console.log(res);
					uni.setStorageSync('uni_id_token', res.token);
					uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
					this.token = res.token;
					if (res.code === 20101) {
						uni.showToast({
							icon: 'none',
							title: '用户名不可为空',
						})
					}
					if (res.code === 0) {
						uni.showToast({
							icon: "success",
							title: '注册成功',
						})
					}

					if (res.code === 20102) {
						uni.showToast({
							icon: 'none',
							title: '此账号已注册',
						})
					}
				})
			},
			login() {
				this.req("login", {
						username: this.username,
						password: this.password
					})
					.then(res => {
						console.log(res);
						uni.setStorageSync('uni_id_token', res.token);
						uni.setStorageSync('uni_id_token_expired', res.tokenExpired);
						this.token = res.token;
						if (res.code === 90002) {
							uni.showToast({
								icon: 'error',
								title: '用户名不可为空',
							})
						}
						if (res.code === 10002) {
							uni.showToast({
								icon: 'error',
								title: '用户不存在',
							})
						}
						if (res.code === 10102) {
							uni.showToast({
								icon: 'error',
								title: '密码错误',
							})
						}
						if (res.code === 0) {
							uni.showToast({
								icon: 'success',
								title: '登录成功',
							})
							setTimeout(() => {
								uni.navigateTo({
									url:"/pages/home/home"
								});
							}, 1000);
						}
					})
			},
			logout() {
				this.req("logout", {}).then(res => {
					console.log(res);
					this.token = "";
				})
			},
			bottonFn() {
				let token = uni.getStorageSync('uni_id_token')
				checkTokenFn(token)
					.then(res => {
						console.log(res);
					})
			},

		}
	}
</script>

<style lang="less" scoped>
	@c-7: #f9f9f9;

	.content {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;

		.username,
		.password {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			background-color: @c-7;
			margin-top: 30rpx;
			padding: 0 30rpx;
			box-sizing: border-box;

			input {
				height: 100rpx;
				line-height: 100rpx;
				background-color: ;
			}
		}

		.btn {
			display: flex;
			margin-top: 30rpx;
			justify-content: space-around;
		}


	}
</style>