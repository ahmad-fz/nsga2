const fs = require("fs");
const readline = require("readline");


function readLine(path = "", callback) {
  let rl = readline.createInterface(fs.createReadStream(path));
  rl.on("line", callback);
}

function readFile(path = "", callback) {
  fs.readFile(path, callback);
}


module.exports = {
  readLine: readLine,
  readFile: readFile,
};

