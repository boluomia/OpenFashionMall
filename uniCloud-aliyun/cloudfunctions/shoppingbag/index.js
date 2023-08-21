'use strict';
const db = uniCloud.database();
const Shoppingbag = db.collection('shoppingbag');
exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ', event);
	const {
		uid
	} = event;
	let {
		data
	} = await Shoppingbag.where({
		uid: uid
	}).get();
	if (data && data.length > 0) {
		let mergedData = data.reduce((acc, curr) => {
			let existingItem = acc.find(item =>
				item.uid === curr.uid &&
				item.productid === curr.productid &&
				item.img === curr.img &&
				item.size === curr.size &&
				item.color === curr.color &&
				item.title === curr.title &&
				item.price === curr.price
			);
			if (existingItem) {
				existingItem.count++;
			} else {
				curr.count = 1;
				acc.push(curr);
			}
			return acc;
		}, []);

		return {
			code: 200,
			data: mergedData
		};
	} else {
		return {
			code: 404,
			data: []
		};
	}
};