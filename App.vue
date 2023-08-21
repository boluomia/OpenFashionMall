<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	uni-swiper .uni-swiper-dot-active {
		background-color: #ffffff;
	}

	a {
		text-decoration: none;
	}

	uni-checkbox .uni-checkbox-input {
		margin: 0 30rpx 0 0;
		width: 80rpx;
		border-radius: 50%; 
	}
	.custom-checkbox .uni-checkbox__input:checked {
	  
	}
	uni-checkbox:not([disabled]) .uni-checkbox-input:hover{
		border-color: #d8d8d8;
	}
	input[type="checkbox"]:checked+label::before {
	  background-color: #ff0000; /* 这里可以替换为你想要的颜色 */
	}
</style>