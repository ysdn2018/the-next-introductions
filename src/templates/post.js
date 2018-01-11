import React from 'react';

function Post({ data }) {
  const post = data.markdownRemark;
  return (
    <div>
      <h3>{post.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  );
};

export default Post;

export const aboutPageQuery = graphql`
  query PostPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
