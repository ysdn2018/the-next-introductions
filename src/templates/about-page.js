import React from 'react';
import styled from 'styled-components'

// styled components
const Title = styled.h1`

`

// page template component
export default function AboutPage({ data }) {
  const pageData = data.markdownRemark;

  return (
    <div>
      <Title>{pageData.title}</Title>
      <h2>{pageData.subtitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: pageData.html }}></div>
    </div>
  );
};


// template query
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
