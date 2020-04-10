var express = require('express');
var router = express.Router();
var md5 = require('blueimp-md5');
var mysql = require('mysql');
var utils = require('./key/utils');
var keys = require('./key/keys');

var pool = new require('../common/mysqlpool')({
    poolsize: 50,
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'coderunner'
    }
});

/* get signup page */
router.get('/',function(req,res){
	res.render('signup.html');		
})

router.post('/',function(req,res){
	
var body = req.body 			

	pool.query('SELECT * FROM `users`', function(error,ret,files){
	var i;
	if(error) throw error;
	else {												
			for (i = 0; i < ret.length; i++) {
				if(ret[i].email == body.account){
					res.status(200).render('signup.html',{
					messege:'该邮箱已注册！',
					form:body
					})
					return;                        //记得return
				}
			}

	if(body.password1 !=body.password2){				//判断密码是否一致
			res.status(200).render('signup.html', {
				messege:'密码不一致',
				form:body
				})
			}else{
				var user={
					email:body.account,
					password:utils.encrypt(body.password1, keys.pubKey)    //加密
				};
				pool.query('insert into users set ?',user,function(err,ret){      //将用户数据加入到数据库中
					if(err) throw err;
					else {
							req.session.user = user;				//记录登录状态
							res.status(200).redirect('/')	
						}

					})
		
				}
	
			}					
		})																				

})

module.exports = router;