var fs = require('fs');

// 参数自定义

/**	
 * root 	项目根目录
 * distMd 	目标md文件名
 * url 		供用于访问的项目地址
 */
var root = __dirname,
	distMd = 'list.md';
	url = 'https://airen.github.io/DemoHouse/';


//
// 读取目录
//
function readDir() {
	return new Promise(function(resolve, reject) {
		fs.readdir(root, function(err, res) {
			if(!err) {
				resolve(res);
			} else {
				reject(err);
			}
		})
	})
}

//
// 删除md文件 
//
function rmFile() {
	return new Promise(function(resolve, reject) {
		fs.unlink(root + '/' + distMd, function(err) {
			if(err) {
				reject(err);
			}
		})
	})
}

//
// 写入MD
//
function writeFile(r) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(root + '/' + distMd, "- ["+ r +"]("+ url + r +"/index.html)\r\n" , {"flag": "a+"}, function(err) {
			if(err) {
				reject(err);
			}
		})
	})
}

//
// 判断是否是目录
//
function stat(r) {
	return new Promise(function(resolve, reject) {
		fs.stat(root + "/" + r, function(err, res) {
			if(!err) {
				resolve({stats: res, fileName: r});
			} else {
				reject(err);
			}
		})
	})
}

// 
// run
//
readDir().then(function(res) {
	// 清除源文件
	rmFile(root + '/' + distMd);

	// 遍历当前目录数据
	// 默认Root目录下的目录内都存在index.html
	// 生成md文件
	for(r of res) {
		stat(r).then(function(res) {
			res.stats.isDirectory() && !/\./.test(res.fileName) && writeFile(res.fileName);
		}).catch(function(err) {
			throw err;
		});
	}
}).catch(function(err) {
	throw err;
})
