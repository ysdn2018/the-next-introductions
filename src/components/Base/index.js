import React from 'react'
import styled from 'styled-components'

// styled components
const Container = styled.div`
  outline: none;
`

const Text = styled.p`

`

// component
export default function Base(props) {
  return (
    <Container>
      <Text>{props.text}</Text>
    </Container>
  )
}
