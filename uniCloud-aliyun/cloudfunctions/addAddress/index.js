'use strict';
const db = uniCloud.database();
const allAddress = db.collection('shop-address');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	if (event.defaultaddress === true) {
		await allAddress.where({
			uid: event.uid,
			defaultaddress: true
		}).update({
			defaultaddress: false
		})
	}
	let data = await allAddress.add(event)
	//返回数据给客户端
	return data
};