import React from 'react';
import styled from 'styled-components'

// page template component
function ExamplePage({ data }) {
  const pageData = data.markdownRemark.frontmatter;
  return (
    <div>
      <h3>Description</h3>
      <div>{pageData.description}</div>

      <h3>List</h3>

      {pageData.exampleList.map( ({ text }) => (
        <div key={text}>
          {text}
        </div>
      ))}

    </div>
  );
};

export default ExamplePage;

// template query
export const aboutPageQuery = graphql`
  query ExamplePage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        path
        title
        description
        exampleList {
          text
        }
      }
    }
  }
`;
