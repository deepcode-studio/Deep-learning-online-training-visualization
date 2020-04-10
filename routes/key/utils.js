var crypto = require('crypto');

// 加密方法
exports.encrypt = function(data, key){
  return crypto.publicEncrypt(key, Buffer.from(data));
};

// 解密方法
exports.decrypt = function(encrypted, key){
  return crypto.privateDecrypt(key, encrypted);
};