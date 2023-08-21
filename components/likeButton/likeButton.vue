<template>
	<view class="like-button" @click.stop="toggleLike">
		<image v-if="liked" src="../../assets/heart-on.png" mode="widthFix"></image>
		<image v-else src="../../assets/heart.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		name: "likeButton",
		data() {
			return {
				liked: false,
				canToggleLike: true
			};
		},
		methods: {
			toggleLike() {
				if (this.canToggleLike) {
					this.liked = !this.liked;
					if (this.liked) {
						uni.showToast({
							title: "加购成功",
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: "取消加购",
							icon: 'none'
						});
					}
					this.canToggleLike = false;
					setTimeout(() => {
						this.canToggleLike = true;
					}, 1000);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.like-button {
		width: 40rpx;
		height: 40rpx;

		image {
			width: 100%;
		}
	}
</style>