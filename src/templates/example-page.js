import React from 'react';
import styled from 'styled-components'


// styled-components
const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
`


// page template component
export default function ExamplePage({ data }) {
  const pageData = data.markdownRemark.frontmatter;
  return (
    <Container>
      <h3>Description</h3>
      <div>{pageData.description}</div>

      <h3>List</h3>

      {pageData.exampleList.map( ({ text }) => (
        <div key={text}>
          {text}
        </div>
      ))}

    </Container>
  );
};


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
