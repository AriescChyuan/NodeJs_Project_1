const crypto = require('crypto');

module.exports = function getRePassword(password){
    //密碼加密
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(password);
    const rePassword = hashPassword.digest('hex');
    return rePassword;
}