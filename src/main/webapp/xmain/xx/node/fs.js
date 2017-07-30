//====> Buffer
+function () {
    "use strict";

    let buf0 = Buffer.from('中国', 'ucs-2');
    let buf1 = Buffer.from('中国', 'utf-8');
// let buf2 = Buffer.from('中国', 'gbk');
    let buf3 = Buffer.from('中国');

    let str0 = Buffer.from([45, 78, 0xfd, 0x56]).toString('ucs-2');
    let str1 = Buffer.from([228, 184, 173, 229, 155, 189]).toString('utf-8');
// let str2 = Buffer.from([214, 208, 185, 250]).toString('gkb');
    let str3 = Buffer.from('中国').toString('base64');
    console.log(str3);
};

//====> Path
+function() {
    "use strict";

    let path = require('path');
    console.log(path.delimiter);
    console.log(path.sep);
    let fp = 'd:\\meng\\test\\index.html';
    console.log(path.dirname(fp));
    console.log(path.basename(fp));
    console.log(path.extname(fp));
};

//======> FileSystem
+function() {
    "use strict";

    let fs = require('fs');
// let fis = fs.readFileSync('./first.js');
// fs.writeFileSync('./first2.js', fis);
// fs.writeFileSync('./first3.js', 'hello world!');
// fs.writeFileSync('./first4.js', Buffer.from('中国'));
    let rs = fs.createReadStream('./first.js');
    let ws = fs.createWriteStream('./first2.js');
// frs.pipe(fws);
    rs.on('data', function(chunk) {
        if (ws.write(chunk) === false) {
            rs.pause();
        }
    });
    ws.on('drain', function() {
        "use strict";
        rs.resume();
    });
    rs.on('end', function() {
        "use strict";
        ws.end();
    });
};

//=====> Encoding
+function() {
    "use strict";

    let fs = require('fs');
    let utf8 = fs.readFileSync('./fs/utf8.txt', 'utf8');
    let utf8bom = fs.readFileSync('./fs/utf8bom.txt', 'utf8');
    let ucs2le = fs.readFileSync('./fs/ucs2le.txt', 'ucs2');
    let utf16le = fs.readFileSync('./fs/ucs2le.txt', 'utf16le');
    let ucs2be = fs.readFileSync('./fs/ucs2be.txt', 'ucs2');
    let gbk = fs.readFileSync('./fs/gbk.txt');

    let strbin = fs.readFileSync('./fs/gbk.txt', 'binary');
    console.log(strbin);


}();
