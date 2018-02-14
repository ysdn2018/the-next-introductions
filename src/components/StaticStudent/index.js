import React from 'react'
import styled from 'styled-components'
import Mark from '../Mark'
import Img from "gatsby-image"
import { breakpoints } from '../../utils/constants.js'

/*
  Base component
  Copy this directory and rename to your choosing
*/


// styled components
const Container = styled.div`
  position: relative;
  transform-origin: center center;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 50vh;
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
  position: relative;
  z-index: 2;
  width: 70vmin;
  height: 70vmin;

  transform-origin: center center;

  transition: margin 250ms cubic-bezier(.14,.6,.36,1),
  width 250ms cubic-bezier(.14,.6,.36,1),
  height 250ms cubic-bezier(.14,.6,.36,1),
  opacity 250ms cubic-bezier(.14,.6,.36,1);
`

const Text = styled.p`

`

const MarkContainer = styled.div`
  position: absolute;
  top: -5.5rem;
  right: -4.3rem;
  opacity: 1;
  transition: all 200ms cubic-bezier(.14,.6,.36,1);


  @media (max-width: ${breakpoints.mobile}) {
    top: -3.81rem;
  }
`

const InfoContainer = styled.div`
  position: absolute;
  z-index: 0;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StatementText = styled.div`
  text-transform: uppercase;
  line-height: 1;
  position: absolute;
  font-size: 4.5rem;
  opacity: 1;
  transition: all 200ms ease-in-out;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.8rem;
  }
`

const Verb = StatementText.extend`
  transform: rotate(-90deg);
  transform-origin: center;
  left: -22.7rem;
  text-align: right;
  width: 400px;
  top: 17.6rem;

  @media (max-width: ${breakpoints.mobile}) {
    top: 18.5rem;
    left: -21.8rem;
  }
`

const Noun = StatementText.extend`
  transform: rotate(-180deg);
  right: -0.3rem;
  bottom: -5.1rem;

  @media (max-width: ${breakpoints.mobile}) {
    bottom: -3.3rem;
  }
`

// component
export default function Student(props) {
  return (
    <Container>
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
