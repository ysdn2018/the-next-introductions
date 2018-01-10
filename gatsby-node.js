/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
 const fs = require(`fs`);
 const path = require('path');
 const { createFilePath } = require(`gatsby-source-filesystem`);

 const staticImagePath = "./static/images/";

 exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {

   if (node.internal.mediaType == "image/png" || node.internal.mediaType === `image/jpeg`) {
     if (!fs.existsSync(staticImagePath)){
       fs.mkdirSync(staticImagePath);
     }

     fs.createReadStream("./src/" + node.relativePath).pipe(fs.createWriteStream(staticImagePath + node.base));
   }
 }

 exports.createPages = ({ boundActionCreators, graphql }) => {
   const { createPage } = boundActionCreators;

   return graphql(`
     {
       allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
         edges {
           node {
             excerpt(pruneLength: 400)
             html
             id
             frontmatter {
               templateKey
               path
               date
               title
               subtitle
             }
           }
         }
       }
     }
   `).then(result => {
     if (result.errors) {
       result.errors.forEach(e => console.error(e.toString()));
       return Promise.reject(result.errors);
     }
     result.data.allMarkdownRemark.edges.forEach(({ node }) => {
       createPage({
         path: node.frontmatter.path,
         component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
         context: {} // additional data can be passed via context
       });
     });
   });
 };
