
const crypto = require('crypto');

var str = '123safasfdaoasfpasjdasd456';
var key = 'xqb';
var php = 'NWJiNTkzYjcxZDEzYjk4YjVlMTNjYjM4OWQ0NDExNWU2MTgyYWFiYw==';
var sig = crypto.createHash('md5').update(str).digest('hex');

console.log(sig);
console.log(php.length);