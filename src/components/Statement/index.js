import React from 'react'
import styled from 'styled-components'
import { grid, spacing, animations, breakpoints } from '../../utils/constants.js'

/*
  Base component
  Copy this directory and rename to your choosing
*/


const StatementContainer = styled.div`
  position: relative;
  border: 1px solid black;
  height: 100%;
  width: 100%;
  padding: 0 ${ spacing.padding.smaller };
  color: black;
  background-color: white;

  animation: ${animations.slideUp} 1.2s 1.5s ease-in-out forwards;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover .image {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.mobile}) {
    border-left: 1px solid black;
    border-right: 1px solid black;
    height: calc(100vh - 1.75rem);
    animation: ${animations.growUp} 0.8s 1s ease-in-out forwards;
    border-bottom: 1px solid black;
  }
`

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

const StatementText = styled.h1`
  text-transform: uppercase;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 5rem;
  text-align: left;
  z-index: 1;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 3rem;
  }
`

const TheNext = styled.h1`
  position: relative;
  text-transform: uppercase;
  font-size: 5rem;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
  text-align: right;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 3rem;
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0;
    top: auto;
  }
`

export default function Statement(props) {
  return (
    <OuterContainer>
      <StatementContainer>
          <StatementText>
            {props.verb || "Announcing"}
          </StatementText>

          <TheNext right>
            The Next
          </TheNext>

          <StatementText>
            {props.noun || "Gradshow"}
          </StatementText>
      </StatementContainer>
    </OuterContainer>
  )
}
