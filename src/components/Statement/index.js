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
  padding: 0 ${ spacing.padding.normal };
  color: black;
  background-color: white;
  z-index: 10;

  animation: ${animations.slideUp} 1.2s 2s ease-in-out forwards;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover .image {
    opacity: 1;
  }

  h1 {
    opacity: 0;
    animation: ${animations.fadeIn} 0.4s ease-out forwards;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 ${ spacing.padding.smaller };
  }
`

const OuterContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`

const StatementText = styled.h1`
  text-transform: uppercase;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 5.8rem;
  text-align: left;
  z-index: 1;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 3rem;
  }
`

const TheNext = styled.h1`
  position: relative;
  text-transform: uppercase;
  font-size: 5.8rem;
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
