import React from 'react';

// page template component
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

// template query
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
