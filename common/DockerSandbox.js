var DockerSandbox = function(timeoutValue,path,folder,vmName,compilerName,fileName,codetext,outputCommand,languageName,eArguments,stdinData){

    this.timeoutValue=timeoutValue;
    this.path=path;
    this.folder=folder;
    this.vmName=vmName;
    this.compilerName=compilerName;
    this.fileName=fileName;
    this.codetext = codetext;
    this.outputCommand=outputCommand;
    this.langName=languageName;
    this.extraArguments=eArguments;
    this.stdinData=stdinData;
};


DockerSandbox.prototype.run = function(success){
    var sandbox = this;

    this.prepare( function(){
        sandbox.execute(success);
    });
};

DockerSandbox.prototype.prepare = function(success){
    var exec = require('child_process').exec;
    var fs = require('fs');
    var sandbox = this;

    exec("mkdir "+ this.path+this.folder + " && cp "+this.path+"Payload/* "+this.path+this.folder + " && chmod 777 "+ this.path+this.folder,function(st){

        fs.writeFile(sandbox.path + sandbox.folder+ "/" + sandbox.fileName, sandbox.codetext,function(err){
            if (err){
                console.log(err);
            }
            else{
                console.log(sandbox.langName+" file was saved!");
                exec("chmod 777 \'"+sandbox.path + sandbox.folder+ "/" + sandbox.fileName + "\'");
                success()
            }
        });

        fs.writeFile(sandbox.path + sandbox.folder+"/inputFile", sandbox.stdinData,function(err){
            if (err){
                console.log(err);
            }
            else{
                console.log("Input file was saved!");
                success();
            }
        });
    });

};


DockerSandbox.prototype.execute = function(success){
    var exec = require('child_process').exec;
    var fs = require('fs');
    var timerCountsBySecond = 0;
    var sandbox = this;
    //example: /Users/lzh/Desktop/workplace/personalProjects/coderunner/coderunner/common/DockerTimeout.sh 20s -e 'NODE_PATH=/usr/local/lib/node_modules' -i -t -v /Users/lzh/Desktop/workplace/personalProjects/coderunner/coderunner/temp/d3c25bbdfe00de93ea1d:/usercode virtual_sandbox /usercode/script.sh python test1.py

    var st = this.path+'common/DockerTimeout.sh ' + this.timeoutValue + 's -e \'NODE_PATH=/usr/local/lib/node_modules\' -i -t -v ' + this.path + this.folder + ':/usercode ' + this.vmName + ' /usercode/script.sh ' + this.compilerName + ' ' + this.fileName + ' ' + this.outputCommand+ ' ' + this.extraArguments;
    console.log(st)
    exec(st);
    console.log("------------------------------");
    // 每秒检查一次completed文件是否存在用以判定程序是否执行成功

    var promise = new Promise(function (resolve, reject) {

        var inspectors = setInterval(function(){

            timerCountsBySecond = timerCountsBySecond + 1;

            fs.readFile(sandbox.path + sandbox.folder + '/completed', 'utf8', function(err, programOutput) {

                if (err && timerCountsBySecond < sandbox.timeoutValue){

                    return;

                }else if (timerCountsBySecond < sandbox.timeoutValue){
                    console.log("DONE");

                    fs.readFile(sandbox.path + sandbox.folder + '/errors', 'utf8', function(err2, programError){

                        if(!programError){
                            programError=" ";
                        }

                        console.log("Error file: \n" + programError);
                        console.log("Main File: \n" + programOutput);

                        var lines = programOutput.toString().split("*-ENDOFOUTPUT-*")
                        programOutput=lines[0];
                        var timeSpent=lines[1];

                        console.log("Time: " + timeSpent);

                        resolve({programOutput,programError,timeSpent});
                    });

                }else{

                    fs.readFile(sandbox.path + sandbox.folder + '/logfile.txt', 'utf8', function(err, partialProgramOutput){
                        if (!partialProgramOutput){
                            partialProgramOutput = "";
                        }

                        fs.readFile(sandbox.path + sandbox.folder + '/errors', 'utf8', function(err2, programError){
                            if(!programError){
                                programError=""
                            }

                            programError += "time out"

                            console.log("Time: " + timerCountsBySecond - 1);

                            var timeSpent = timerCountsBySecond-1

                            resolve({partialProgramOutput,programError,timeSpent})
                        });
                    });

                }

                clearInterval(inspectors)

            });

            }, 1000);


    });

    promise.then((obj)=>{

            console.log("准备移除临时目录: " + sandbox.folder);
            console.log("------------------------------");
            exec("rm -r " + sandbox.folder);
            console.log("临时目录移除成功！");

            success(obj.programOutput,obj.programError,obj.timeSpent)
        }
    ).catch()


};


module.exports = DockerSandbox;
