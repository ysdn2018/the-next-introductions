import React from 'react';

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <div>
      <h1></h1>
    </div>
  );
};

export const aboutPageQuery = graphql`
  query ExamplePage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
