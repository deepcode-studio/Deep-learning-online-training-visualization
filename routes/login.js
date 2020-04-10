var express = require('express');
var router = express.Router();
// var md5 = require('blueimp-md5')
var mysql = require('mysql');
var utils = require('./key/utils');
var keys = require('./key/keys');


var pool = new require('../common/mysqlpool')({
    poolsize: 50,
    mysql: {
        host: '127.0.0.1',
        user: 'root',
		port:'3306',
        password: '123456',
        database: 'coderunner'
    }
});

/*GET login page*/
router.get('/',function(req,res){
	if(req.session.user){
		res.redirect('/')
	}else{
		res.render('login.html') 
	}
});

router.post('/',function(req,res){	
	var body = req.body;
	var user={															
				email:body.username,
				password:body.password
			};


	pool.query('SELECT * FROM `users`', function(error,ret){
	var i;
	if(error) throw error;
		else {
			for (i = 0; i < ret.length; i++) {				//判断用户是否已存在									
				if(ret[i].email == user.email){
					// console.log(utils.decrypt(ret[i].password, keys.privKey).toString())
					// if(user.password == utils.decrypt(ret[i].password, keys.privKey).toString()){  //解密
					if(user.password == ret[i].password){  //解密
						req.session.user = user       		 //记录登录状态
						req.get('/')
						res.status(200).redirect('/')
						return;
					}else{
						res.status(200).render('login.html',{
							messege2:'密码错误',
							form:body
						})
						return;
					}
					
				}
			}
			res.status(200).render('login.html',{
				messege1:'账号错误',
				form:body
			})
		}
	})
})

module.exports = router;