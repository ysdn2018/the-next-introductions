/*
  this is where the pages are generated
*/
const Path = require('path');
const fs = require('fs');

const staticImagePath = "./static/images/";

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if ((node.internal.mediaType == "image/png" || node.internal.mediaType === `image/jpeg`) && process.env.NODE_ENV === 'production') {
    if (!fs.existsSync(staticImagePath)){
      fs.mkdirSync(staticImagePath);
    }

    fs.createReadStream("./src/content/" + node.relativePath).pipe(fs.createWriteStream(staticImagePath + node.base));
  }
}



exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /intersection-observer/,
      loader: "null-loader",
    });
  }
};
