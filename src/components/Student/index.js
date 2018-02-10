import React from 'react'
import styled from 'styled-components'
import Mark from '../Mark'
import Img from "gatsby-image"

/*
  Base component
  Copy this directory and rename to your choosing
*/


// styled components
const Container = styled.div`
  background-color: white;
  transform-origin: center center;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  .image-wrapper {
    height: 100%;
    width: 100%;
  }

  .image {
    height: 100%;
  }
`

const InnerContainer = styled.div`
  width: 70vmin;
  height: 70vmin;

  transform-origin: center center;

`

const Text = styled.p`

`

const Line = styled.div`
  height: 100%;
  width: 3px;

  position: absolute;
  z-index: 3;
  left: 50%;
  top: 0;
`


const MarkContainer = styled.div`
  position: absolute;
  top: -5.5rem;
  right: -4.3rem;
  opacity: 0;
  transition: opacity 200ms ease-in-out;

  ${InnerContainer}.hide & {
    opacity: 1;
  }
`


const StatementText = styled.div`
  text-transform: uppercase;
  line-height: 1;
  position: absolute;
  font-size: 4.5rem;
  opacity: 0;
  transition: opacity 200ms ease-in-out;


  ${InnerContainer}.hide & {
    opacity: 1;
  }
`

const Verb = StatementText.extend`
  transform: rotate(-90deg);
  transform-origin: center;
  left: -23rem;
  text-align: right;
  width: 400px;
  top: 17.6rem;

`

const Noun = StatementText.extend`
  transform: rotate(-180deg);
  right: -0.5rem;
  bottom: -5.3rem;
`

// component
export default function Student(props) {
  return (
    <Container innerRef={props.studentRef}>
      <InnerContainer>
        <MarkContainer>
          <Mark/>
        </MarkContainer>

        <Verb>{props.verb}</Verb>
        <Noun>{props.noun}</Noun>

        <Img
          sizes={props.image}
          outerWrapperClassName='image-wrapper'
          className='image'
        />

      </InnerContainer>
    </Container>
  )
}
