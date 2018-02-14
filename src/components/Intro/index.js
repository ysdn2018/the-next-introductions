import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import StaticStudent from '../StaticStudent'
import {animations} from "../../utils/constants.js"

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
  background-color: white;

  animation: ${animations.fadeOut} 0.6s ${props => props.students.length*0.12+3.2}s ease-out forwards;
`

const Student = styled(StaticStudent)`
  top: 0;
  position: absolute;
`

const StudentContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => props.index == 0 ? "1" : "0"};

  background-color: white;

  animation: ${animations.fadeIn};
  animation-duration: 0s;
  animation-delay: ${props => props.index*0.12 + 2.3}s;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-timing-function: step-end;
`



// component
export default function Intro(props) {
  return (
    <Container students={props.students}>

      {props.students.map(({node}, i) =>
        <StudentContainer key={i} index={i}>
          <Student
            image={node.frontmatter.image.childImageSharp.sizes}
            verb={node.frontmatter.verb}
            noun={node.frontmatter.noun}
          />
        </StudentContainer>
      )}
    </Container>
  )
}
