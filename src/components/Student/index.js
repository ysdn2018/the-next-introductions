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
    overflow: hidden;
  }

  .image {
    transition: transform 250ms cubic-bezier(.14,.6,.36,1);
    height: 100%;
    transform-origin: center center;
  }
`

const InnerContainer = styled.div`
  position: relative;
  z-index: 2;
  cursor: pointer;
  width: 70vmin;
  height: 70vmin;

  transform-origin: center center;

  transition: margin 250ms cubic-bezier(.14,.6,.36,1),
  width 250ms cubic-bezier(.14,.6,.36,1),
  height 250ms cubic-bezier(.14,.6,.36,1),
  font-size 250ms cubic-bezier(.14,.6,.36,1),
  opacity 250ms cubic-bezier(.14,.6,.36,1);

  &:active ${StatementText} {
      opacity: 0.5;
  }

  &:hover .image {
    transform: scale(1.04);
  }

  &.hide {
    opacity: 0 !important;
  }

  &.show-info {
    width: 35vw;
    height: 35vw;

    font-size: 1rem !important;

    margin-right: -50vmin;
  }

  &.show-info + div > div {
    opacity: 1;
    transform: translateX(-25vw);
  }
`

const Text = styled.p`

`

const MarkContainer = styled.div`
  position: absolute;
  top: -5.5rem;
  right: -4.3rem;
  opacity: 0;
  transition: all 200ms cubic-bezier(.14,.6,.36,1);

  ${InnerContainer}.show-statement & {
    opacity: 1;
  }

  ${InnerContainer}:hover & {
    transform: translate(10px, -10px);
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

const Info = styled.div`
  opacity: 0;
  width: 40%;
  max-width: 400px;
  font-size: 1.4rem;
  transition: 250ms cubic-bezier(.14,.6,.36,1);
`


const StatementText = styled.div`
  text-transform: uppercase;
  line-height: 1;
  position: absolute;
  font-size: 4.5rem;
  opacity: 0;
  transition: all 200ms ease-in-out;

  ${InnerContainer}.show-statement & {
    opacity: 1;
  }
`

const Verb = StatementText.extend`
  transform: rotate(-90deg);
  transform-origin: center;
  left: -22.7rem;
  text-align: right;
  width: 400px;
  top: 17.6rem;


  ${InnerContainer}:hover & {
    transform: translateX(-10px) rotate(-90deg);
  }

`

const Noun = StatementText.extend`
  transform: rotate(-180deg);
  right: -0.3rem;
  bottom: -5.1rem;

  ${InnerContainer}:hover & {
    transform: translateY(10px) rotate(-180deg);
  }
`

// component
export default function Student(props) {
  return (
    <Container innerRef={props.studentRef}>
      <InnerContainer onClick={() => props.handleClick(props.index)}>
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

      <InfoContainer>
        <Info>
          <p>{props.blurb}</p>
          <p>{props.name}</p>
        </Info>
      </InfoContainer>

    </Container>
  )
}
