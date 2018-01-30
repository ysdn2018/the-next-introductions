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

  componentDidMount() {
    let boundingRect = this.container.getBoundingClientRect();
    let offsetRight = Math.abs((this.props.windowWidth-boundingRect.left)/this.props.windowWidth);

    this.setState({
      offsetRight: offsetRight
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      offsetRight: offsetRight
    })
  }

  render() {
    if (this.state.offsetRight > 1.5) {
      this.state.offsetRight = 1.5;
    }

    let style = {
      transform: `scale(${this.state.offsetRight})`
    }

    return (
      <Container innerRef={(container) => { this.container = container }}>
        <Text>{this.props.offsetRight}</Text>
      </Container>
    )
  }

}
