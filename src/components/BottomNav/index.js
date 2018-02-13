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
  bottom: 0;
`


// styled components
const Container = styled.div`
`

const Text = styled.p`

`

const InnerNav = styled.div`
  height: 30vh;
`

// component
export default function BottomNav(props) {
  return (
    <Container>
      <BottomNavButton onClick={props.handleClick}>
        Info
      </BottomNavButton>

      <InnerNav>

        <Grid />

      </InnerNav>

    </Container>
  )
}
