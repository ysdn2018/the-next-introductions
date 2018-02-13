import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import StaticStudent from '../StaticStudent'

/*
  Base component
  Copy this directory and rename to your choosing
*/


// styled components
const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
`

const Student = styled(StaticStudent)`
  top: 0;
  position: absolute;
`

// component
export default function Intro(props) {
  return (
    <Container>
      {props.students.map(({node}, i) =>
          <Student
            key={i}
            index={i}
            image={node.frontmatter.image.childImageSharp.sizes}
            verb={node.frontmatter.verb}
            noun={node.frontmatter.noun}
          />
      )}
    </Container>
  )
}
