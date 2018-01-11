import React from 'react';
import styled from 'styled-components'

const Title = styled.h1`

`

function AboutPage({ data }) {
  const pageData = data.markdownRemark;
  return (
    <div>
      <Title></Title>
      <div dangerouslySetInnerHTML={{ __html: pageData.html }}></div>
    </div>
  );
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
