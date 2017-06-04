/**
 * Created by Administrator on 2017/6/3.
 */
var fs = require('fs');

// 基本加密配置
var data = fs.readFileSync('./.env').toString();
exports.shaSettings = {
    key:data
}