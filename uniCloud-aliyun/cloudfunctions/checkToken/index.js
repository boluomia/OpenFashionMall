const uniID = require('uni-id')
exports.main = async function(event,context) {
    const payload = await uniID.checkToken(event.uniIdToken)
	console.log(payload)
  const {
    code,
    token,
    tokenExpired,
	uid
  } = payload
  if(code) { // code不为0代表token校验未通过
    return payload
  }
  // 其他业务代码
  return {
	  code:0,
	  msg:'校验通过',
	  uid
  }
}
