import React from 'react'
import styled from 'styled-components'
import NavButton from '../NavButton'
import Grid from '../Grid'

/*
  Base component
  Copy this directory and rename to your choosing
*/


const BottomNavButton = NavButton.extend`
  border-top: 1px solid black;
  top: 0;
`


// styled components
const Container = styled.div`
  z-index: 5;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30vh;
`

const Text = styled.p`

`

const InnerNav = styled.div`
  position: relative;
`

// component
export default function BottomNav(props) {
  return (
    <Container>
      <BottomNavButton onClick={props.handleClick}>
        Info
      </BottomNavButton>

      <InnerNav>
        <h1>no</h1>
        <Grid />

      </InnerNav>

    </Container>
  )
}
