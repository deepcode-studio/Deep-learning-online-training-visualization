var express = require('express');
var router = express.Router();

var sandBox = require('../common/DockerSandbox');
var arr = require('../common/compilers');
var appRoot = require('app-root-path');


var pool = new require('../common/mysqlpool')({
    poolsize: 50,
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'coderunner'
    }
});

function random(size) {
    //返回一个随机值作为目录名
    return require("crypto").randomBytes(size).toString('hex');
}

function parsieTheQueryData(data){
    var list = {};
    for(var i=0;i<data.length;i++){
        list[data[i]["name"]] = data[i]["code"];
    }
    return list;

}


// router.post('/', function(req, res, next) {
//     pool.query('SELECT * FROM codefile c where tid= 0 and c.rid = (select rid from codefile where name = ?)', ['test1.py'],function(err, results){
//
//         var language = 0; // 测试值，python, 实际根据前端确定
//         var stdin = " ";  // 测试值, 程序运行时的输入参数，实际根据前端确定
//         console.log(res)
//         var folder= 'temp/' + random(10);
//         var path=appRoot.path +"/";
//         var vm_name='virtual_sandbox';
//         var timeout_value=10;
//         var codeFileList = parsieTheQueryData(results);
//         var entranceFileName = "test1.py" // 测试值，实际根据前端确定
//
//         var sandboxType = new sandBox(
//             timeout_value,
//             path,
//             folder,
//             vm_name,
//             arr.compilerArray[language][0],
//             entranceFileName,
//             codeFileList,
//             arr.compilerArray[language][2],
//             arr.compilerArray[language][3],
//             arr.compilerArray[language][4],
//             stdin
//         );
//
//         sandboxType.run(function(ProgramOutput,programError,timeSpent){
//             console.log("ProgramOutput: \n"+ ProgramOutput)
//             console.log("programError: \n" + programError)
//             console.log("timeSpent: \n" + timeSpent + "s")
//             // res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
//         });
//
//     });

router.post('/', function(req, res, next) {

        var language = 0; // 测试值，python, 实际根据前端确定
        var stdin = " ";  // 测试值, 程序运行时的输入参数，实际根据前端确定
        var folder= 'temp/' + random(10);
        var path=appRoot.path +"/";
        var vm_name='virtual_sandbox';
        var timeout_value=10;
        var codetext = req.body.code;
        var entranceFileName = "test1.py" // 测试值，实际根据前端确定

        var sandboxType = new sandBox(
            timeout_value,
            path,
            folder,
            vm_name,
            arr.compilerArray[language][0],
            entranceFileName,
            codetext,
            arr.compilerArray[language][2],
            arr.compilerArray[language][3],
            arr.compilerArray[language][4],
            stdin
        );

        sandboxType.run(function(ProgramOutput,programError,timeSpent){
            console.log("ProgramOutput: \n"+ ProgramOutput)
            console.log("programError: \n" + programError)
            console.log("timeSpent: \n" + timeSpent + "s")
            res.send({output:ProgramOutput, errors:programError, time:timeSpent});
            // return res.send({output:ProgramOutput, errors:programError, time:timeSpent});

        });
    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    // sandboxType.run(function(data,exec_time,err)
    // {
    //     //console.log("Data: received: "+ data)
    //     res.send({output:data, langid: language,code:code, errors:err, time:exec_time});
    // });

});

module.exports = router;