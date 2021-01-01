const fs = require('fs')
const path = require('path');
var fs_Extra = require('fs-extra');


const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        if (dirPath.includes('node_modules')) {
            return;
        }
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}


const copyAllFiles = (allFiles) => {
    allFiles.forEach((f, i) => {
        fs_Extra.copySync(f, `./destFolder/${f.replace(/^.*[\\\/]/, '')}`);
    })
}


const allFiles = getAllFiles(__dirname);
copyAllFiles(allFiles);

