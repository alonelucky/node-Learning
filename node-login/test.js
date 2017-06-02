/**
 * Created by Administrator on 2017/6/2.
 */
const crypto = require('crypto');

var key = '';
var str = '我是需要加密的';

var hash = crypto.createHmac('sha256',key).update(str).digest('hex');


myHash = function(str){
    return crypto.createHmac('sha1',key).update(str).digest('hex');
}

console.log(myHash('21321321321'));
