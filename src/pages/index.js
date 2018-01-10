import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`

`

class IndexPage extends React.Component {
  render() {
    return(
      <Container>

        <h1>hey</h1>



      </Container>
    )
  }
}

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
