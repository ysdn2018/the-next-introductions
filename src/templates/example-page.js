import React from 'react';
import styled from 'styled-components'

function ExamplePage({ data }) {
  const pageData = data.markdownRemark.frontmatter;
  return (
    <div>
      <h3>Description</h3>
      <div>{pageData.description}</div>

      <h3>List</h3>
      {pageData.exampleList.map( ({ text }) => (
        <div>{text}</div>
      ))}
    </div>
  );
};

export default ExamplePage;

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
