import React from 'react'
import styled from 'styled-components'

// styled components
const Container = styled.div`

`

// component
export default function Grid() {
  return (
    <Container>
      {props.children}
    </Container>
  )
}
