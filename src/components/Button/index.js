import React from 'react'
import styled from 'styled-components'

const Container = styled.Button`
  outline: none;
`

const Text = styled.p`

`

export default function Button() {
  return (
    <Container>
      <Text>{props.text}</Text>
    </Container>
  )
}
