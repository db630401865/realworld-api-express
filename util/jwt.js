var jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

exports.decode = promisify(jwt.decode)



// 生成jwt
// jwt.sign第一个参数是数据，第二个参数是私钥签名
// jwt.sign({ foo: 'bar' }, 'shhhhh',function(err, token) {
//   console.log(token);
// }); 

// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MzIzODkxODh9.N1nCAh_E3fuVeuR3zqZH-2oh25AaMKo5l2_IfqXA0sc',
// 'shhhhh',
// (err, ret)=>{
//   if(err){
//     return console.log('token 认证失败');
//   }
//   console.log(ret);
// })
