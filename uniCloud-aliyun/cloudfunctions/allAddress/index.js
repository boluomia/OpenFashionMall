'use strict';
const db = uniCloud.database();
const allAddress = db.collection('shop-address');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		uid
	} = event;
	let data=await allAddress.where({
		uid:uid
	}).get()
	//返回数据给客户端
	return data
};
