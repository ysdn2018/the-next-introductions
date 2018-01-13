import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Button from '../components/Button'

import Grid from '../components/Grid'

// styled components
const Container = styled.div`
  color: black;
`

const Subtitle = styled.div`
  padding: 1rem;
  margin: 0.5rem;
  grid-column: 1;
  text-align: right;
`

const PageLinkContainer = styled(Link)`
  padding: 1rem;
  margin: 0.5rem;
  display: block;
  color: black;

  grid-column: 2;

  &:hover {
    font-style: italic;
  }
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
    <Grid
      height="100vh"
      width="100%">
      <Subtitle>dynamic pages:</Subtitle>

      {pages.map( ({ node: page }, i) => (
        <PageLink
          to={page.frontmatter.path}
          title={page.frontmatter.title}
          key={page.id}
        />
      ))}

      <Button text="this is a button component" />

    </Grid>
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
