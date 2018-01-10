import React from 'react';

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <div>
      <h1>{data.frontmatter.title}</h1>
    </div>
  );
};

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
