import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

// styled-components
const Container = styled.div`
  color: pink;
`

const PostLinkContainer = styled(Link)`
  border: 1px solid black;
  display: block;
`

// components
function PostLink(props) {
  return (
    <PostLinkContainer to={props.to}>
      {props.title}
    </PostLinkContainer>
  )
}

// page component
export default function IndexPage({ data }) {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Container>
      <h1>the-next-base Boilerplate</h1>
      <h3>currently WIP</h3>

      {posts.map( ({ node: post }) => (
        <PostLink
          to={post.frontmatter.path}
          title={post.frontmatter.title}
          key={post.id}
        />
      ))}
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
          excerpt
        }
      }
    }
  }
`;
