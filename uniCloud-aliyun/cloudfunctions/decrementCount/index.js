'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
const Shoppingbag = db.collection('shoppingbag');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		uid,
		productid
	} = event
	let data = await Shoppingbag.where({
		uid: uid,
		productid: productid
	}).update({
		count: dbCmd.inc(-1)
	})

	//返回数据给客户端
	return data
};