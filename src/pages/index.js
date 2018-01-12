import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Button from '../components/Button'

// styled components
const Container = styled.div`
  color: pink;
`

const PageLinkContainer = styled(Link)`
  border: 1px solid black;
  display: block;
`

// components
function PageLink(props) {
  return (
    <PageLinkContainer to={props.to}>
      {props.title}
    </PageLinkContainer>
  )
}

// page component
export default function IndexPage({ data }) {
  const pages = data.allMarkdownRemark.edges;

  return (
    <Container>
      <h1>the-next-base Boilerplate</h1>
      <h3>currently WIP</h3>

      {pages.map( ({ node: page }) => (
        <PageLink
          to={page.frontmatter.path}
          title={page.frontmatter.title}
          key={page.id}
        />
      ))}

      <Button text="this is a button component" />

    </Container>
  )
}

// data query
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
        }
      }
    }
  }
`;
