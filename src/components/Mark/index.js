import React from 'react'
import styled from 'styled-components'

// styled components
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.8rem;


    &:hover > div:first-child::after {
      content: " ";
      position: absolute;
      background-color: black;
      height: 2px;
      width: 57px;
      top: 3.2rem;
      left: 1px;
    }

    &:hover > div:nth-child(2)::after {
      content: " ";
      position: absolute;
      background-color: black;
      height: 55px;
      width: 2px;
      top: 2.9rem;
      left: -4px;
    }
`

const MarkText = styled.div`
  text-transform: uppercase;
  line-height: 1;
  position: relative;
`

const The = MarkText.extend`

`

const Next = MarkText.extend`
  writing-mode: vertical-lr;
  display: inline;
  margin-top: 0.3rem;
  width: 4rem;
`

// component
export default function Mark(props) {
  return (
    <Container>
      <The>The</The>
      <Next>Next</Next>
    </Container>
  )
}
