/*
  this is where the pages are generated
*/
const path = require('path');
const fs = require('fs');

const staticImagePath = "./static/assets/";

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.mediaType == "image/png" || node.internal.mediaType === `image/jpeg`) {
    if (!fs.existsSync(staticImagePath)){
      fs.mkdirSync(staticImagePath);
    }

    fs.createReadStream("./src/content/" + node.relativePath).pipe(fs.createWriteStream(staticImagePath + node.base));
  }
}
