
/*
	This file stores the compiler/interpretor details that are provided to DockerSandbox.sh	by the app.js
	The index is the key field,
	First column contains the compiler/interpretor that will be used for translation
	Second column is the file name to use when storing the source code
	Third column is optional, it contains the command to invoke the compiled program, it is used only for compilers
	Fourth column is just the language name for display on console, for verbose error messages
	Fifth column is optional, it contains additional arguments/flags for compilers

	You can add more languages to this API by simply adding another row in this file along with installing it in your
	Docker VM.

	此文件存储由app.js提供给dockersandbox .sh的编译器/解释器详细信息
	索引是键字段，
	第一列包含用于翻译的编译器/解释器
	第二列是在存储源代码时要使用的文件名
	第三列是可选的，它包含调用编译程序的命令，它只用于编译器
	第四列只是用于在控制台显示详细错误消息的语言名称
	第五列是可选的，它包含编译器的附加参数/标志
	只需在文件中添加另一行并将其安装到您的
	Docker VM。

	Author: Osman Ali 
	Date: 3 - JUN - 2014
	*Revised on: 30th June 2014 (Added Column number 4 to display the name of languages to console)
*/

exports.compilerArray= [ ["python",												"file.py",		"",									"Python",			""],
						 ["ruby",												"file.rb",		"",									"Ruby",				""],
						 ["clojure",											"file.clj",		"",									"Clojure",			""],
						 ["php",												"file.php",		"",									"Php",				""],
						 ["nodejs",												"file.js",		"",									"Nodejs",			""],
						 ["scala",												"file.scala",	"",									"Scala",			""],
						 ["\'go run\'",											"file.go",		"",									"Go",				""],
						 ["\'g++ -o /usercode/a.out\' ",						"file.cpp",		"/usercode/a.out",					"C/C++",			""],
						 ["javac",												"file.java",	"\'./usercode/javaRunner.sh\'",		"Java",				""],
						 ["\'vbnc -nologo -quiet\'",							"file.vb",		"\'mono /usercode/file.exe\'",		"VB.Net",			""],
						 ["gmcs",												"file.cs",		"\'mono /usercode/file.exe\'",		"C#",				""],
						 ["/bin/bash",											"file.sh",		" ",								"Bash",				""],
						 ["gcc ",												"file.m",		" /usercode/a.out",					"Objective-C",		"\' -o /usercode/a.out -I/usr/include/GNUstep -L/usr/lib/GNUstep -lobjc -lgnustep-base -Wall -fconstant-string-class=NSConstantString\'"],
						 ["/usercode/sql_runner.sh",							"file.sql",		"",									"MYSQL",			""],
						 ["perl",												"file.pl",		"",									"Perl",				""],
						 ["\'env HOME=/opt/rust /opt/rust/.cargo/bin/rustc\'",	"file.rs",		"/usercode/a.out",					"Rust",				"\'-o /usercode/a.out\'"] ];
