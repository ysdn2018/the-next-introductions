import React from 'react'
import styled from 'styled-components'
import { grid, spacing, animations, breakpoints } from '../../utils/constants.js'

/*
  Base component
  Copy this directory and rename to your choosing
*/


const StatementContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0 ${ spacing.padding.smaller };
  overflow: hidden;
  color: black;

  ${'' /* animation: ${animations.growUp} 0.8s 1s ease-in-out forwards; */}

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


    @media not all and (min-resolution:.001dpcm) { @media {
      height: calc(86vh - ${spacing.padding.bigger});
    }}
  }
`

const StatementText = styled.h1`
  text-transform: uppercase;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3.5rem;
  text-align: left;
  z-index: 1;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 3rem;
  }
`

const TheNext = styled.h1`
  position: absolute;
  text-transform: uppercase;
  font-size: 3.5rem;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
  right: ${ spacing.padding.smaller };
  top: calc(${ grid.rows[0] + grid.rows[1] + grid.rows[2] + grid.rows[4] + 4.9 }% - 0.4rem);

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 3rem;
    text-align: right;
    position: relative;
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0;
    top: auto;
  }
`

export default function Statement(props) {
  return (
    <StatementContainer>
      hello?
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
  )
}
