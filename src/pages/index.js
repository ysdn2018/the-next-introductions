import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`
  color: pink;
`

const IndexPage = ({ data }) => (
    <Container>
      <h1>the-next-base Boilerplate</h1>
      <h3>currently WIP</h3>
    </Container>
)


export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`;

export default IndexPage
