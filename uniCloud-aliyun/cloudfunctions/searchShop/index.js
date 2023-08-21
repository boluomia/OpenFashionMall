'use strict';
const db = uniCloud.database();
const dbCmd = db.command
const DBProduct = db.collection('uni-cms-articles');
exports.main = async (event, context) => {
// event为客户端上传的参数
console.log('event : ', event);
let {
	keyword
} = event;
keyword = keyword.split("").join("|")
let result = await DBProduct.where(dbCmd.or({
    title: new RegExp(keyword, 'g')
})).get();
// 返回数据给客户端
return result.data;
};