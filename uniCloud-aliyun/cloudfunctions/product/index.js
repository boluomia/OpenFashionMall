'use strict';
const db = uniCloud.database();
const DBProduct = db.collection('uni-cms-articles');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		id
	} = event;
	let data = await DBProduct.where({
		category_id: id
	}).get();
	//返回数据给客户端
	return data
};