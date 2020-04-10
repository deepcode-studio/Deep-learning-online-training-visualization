require.config({ paths: { 'vs': '../node_modules/monaco-editor/min/vs' } });
require(['vs/editor/editor.main'], function () {

    // 初始化变量
    var fileCounter = 0;
    var editorArray = [];
    var defaultCode = [
        'print("helloworld")'
    ].join('\n');

    // 定义编辑器主题
    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        // colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    });
    monaco.editor.setTheme('myTheme');

    // 新建一个编辑器
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
        });
        editorArray.push(editor);
        return editor;
    }

    // 新建一个 div
    function addNewEditor(code, language) {
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        new_container.className = "container";
        document.getElementById("root").appendChild(new_container);
        newEditor(new_container.id, code, language);
        fileCounter += 1;
    }

    addNewEditor(defaultCode, 'python');


    // 新建 button
    var btn = document.createElement("button");
    btn.id = "show-content";
    btn.innerHTML = "运行";


    var header = document.getElementById("header");
    header.appendChild(btn);

    // 点击 button 弹出编辑器内容，若要编译界面点击“运行”不显示：此网页显示******（code），删除此段代码即可
    document.getElementById("show-content").addEventListener("click", function () {
        document.getElementById("footer").innerText = ""
        // 获取编辑器内容
        // alert(editorArray[0].getValue());
        var xmlHttp = new XMLHttpRequest();
        //2.绑定监听函数
        xmlHttp.onreadystatechange = function(){
            //判断数据是否正常返回
            if(xmlHttp.readyState==4&&xmlHttp.status==200){
                //6.接收数据
                var res = xmlHttp.responseText;
                console.log(res)
                var result = JSON.parse(res);
                // document.getElementById("footer").innerText = "output:"+result.output+"errors:"+result.errors+"spent time:"+result.time
                document.getElementById("footer").innerText = "output: "+result.output
            }
        }
        //3.绑定处理请求的地址,true为异步，false为同步
        //GET方式提交把参数加在地址后面?key1:value&key2:value
        xmlHttp.open("POST","/compile",true);
        //4.POST提交设置的协议头（GET方式省略）
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //POST提交将参数，如果是GET提交send不用提交参数
        //5.发送请求
        xmlHttp.send("code="+editorArray[0].getValue());
    });
	
	// 语法高亮
	var languageSelected = document.querySelector('.language');
	languageSelected.onchange = function () {
	    monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], languageSelected.value)
	}
	
	
	
	
	
	
	
});