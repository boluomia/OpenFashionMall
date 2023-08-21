const db = uniCloud.database();
const DBCategory = db.collection('uni-cms-categories');
const DBProduct = db.collection('uni-cms-articles');
const ShoppingBag = db.collection('shoppingbag');
const ShoppingSettlement = db.collection('shoppingsettlement');
const ShoppingAddress = db.collection('shop-address');
//所有分类
export const getproductCategory = (data = {}) => {
	return DBCategory.get()
}
//相关分类的商品
export const aboutProduct = (data = {}) => {
	return uniCloud.callFunction({
		name: 'product',
		data: {
			...data
		}
	})
}
//具体商品
export const deatilProduct = (data = {}) => {
	return uniCloud.callFunction({
		name: 'detailProduct',
		data: {
			...data
		}
	})
}
//检验token
export const checkTokenFn = (data) => {
	return uniCloud.callFunction({
		name: 'checkToken',
		data: {
			uniIdToken: data
		}
	})
}
//加入购物车
export const addBag = (data = {}) => {
	return ShoppingBag.add(data)
}
//加入订单
export const addSettlement = (data = {}) => {
	return ShoppingSettlement.add(data)
}
//添加收获地址
export const addAddress = (data = {}) => {
	return uniCloud.callFunction({
		name: 'addAddress',
		data: {
			...data
		}
	})
}
//修改收获地址
export const modifyAddress = (data = {}) => {
	return uniCloud.callFunction({
		name: 'modifyAddress',
		data: {
			...data
		}
	})
}
//获取所有收获地址
export const allAddress = (data = {}) => {
	return uniCloud.callFunction({
		name: 'allAddress',
		data: {
			...data
		}
	})
}
//查询购物车
export const allBag = (data = {}) => {
	return uniCloud.callFunction({
		name: 'shoppingbag',
		data: {
			...data
		}
	})
}
//增加数量
export const addItemCount = (data = {}) => {
	return uniCloud.callFunction({
		name: 'addCount',
		data: {
			...data
		}
	})
}
//减少数量
export const decreItemCount = (data = {}) => {
	return uniCloud.callFunction({
		name: 'decrementCount',
		data: {
			...data
		}
	})
}
//删除商品
export const deleteItem = (data = {}) => {
	return uniCloud.callFunction({
		name: 'deleteItem',
		data: {
			...data
		}
	})
}
//模糊查询
export const searchItem = (data = {}) => {
	return uniCloud.callFunction({
		name: 'searchShop',
		data: {
			...data
		}
	})
}
//登录/注册/退出
export const req = (action, params) => {
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
}