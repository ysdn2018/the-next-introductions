import React from 'react'
import styled from 'styled-components'

/*

* IN-PROGRESS

*/

// styled components
const Container = styled.div`

`

const Text = styled.p`

`

// component
export default function Base(props) {
  return (
    <Container props>
      <Text>{props.text}</Text>
    </Container>
  )
}
