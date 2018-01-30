import React from 'react'
import styled from 'styled-components'

/*
  Base component
  Copy this directory and rename to your choosing
*/


// styled components
const Container = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 20px;
  background-color: grey;
  transform-origin: top right;
`

const Text = styled.p`

`

// component
export default class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetRight: 0
    }
  }

  updateSize = () => {
    let boundingRect = this.element.getBoundingClientRect();

    this.setState({
      offsetRight: (this.props.windowWidth - boundingRect.left)/this.props.windowWidth
    })
  }

  render() {
    let style = {
      transform: `scale(${Math.min(Math.max(Math.abs(this.state.offsetRight), 0), 1.5)})`
    }

    return (
      <Container innerRef={(container) => { this.element = container; }} style={style}>
        <Text>{this.props.num}</Text>
        <Text>{this.state.offsetRight}</Text>
      </Container>
    )
  }

}
