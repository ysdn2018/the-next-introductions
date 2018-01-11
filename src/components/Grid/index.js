import React from 'react'
import styled from 'styled-components'

const Container = styled.div`

`

export default function Grid() {
  return (
    <Container>
      {props.children}
    </Container>
  )
}
