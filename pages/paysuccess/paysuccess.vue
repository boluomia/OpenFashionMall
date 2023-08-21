<template>
	<view class="payresult">
		<topic></topic>
		<view class="paysuccess">
			<view class="img">
				<image src="../../assets/操作成功.png" mode="widthFix"></image>
			</view>
			<view class="result">支付成功</view>
		</view>
	</view>
</template>

<script>
	import topic from "../../components/header/header.vue"
	export default {
		data() {
			return {
				
			};
		},
		components: {
			topic
		},
	}
</script>

<style lang="less" scoped>
	@c-1: #333333;
	.payresult{
		.paysuccess{
			display: flex;
			align-items: center;
			.img{
				width: 400rpx;
				image{
					width: 100%;
				}
			}
			.result{
				color: @c-1;
				font-weight: bold;
			}
		}
	}
</style>
