


const mysql = require('mysql');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '123456',
    database        : 'node'
});

// 向外保罗这个函数就行了(为了防止之前的query函数冲突错误这里向外暴露其他的名字,比如queryPromise)
function queryPromise(sql){
    return new Promise(function(resolve,reject){
        pool.query(sql,function (err,data) {
            if(err){
                reject(err);
            }
            resolve(data);
        })
    })
}


// 调用测试
queryPromise('select * from node1')
    .then((data)=>{
        console.log(data);
    })

// async调用(在该文件外调用)
async function queryAsync(){
    let q1 = await queryPromise(deleteSql);

    if(q1){
        await queryPromise(insertSql);
    }
}