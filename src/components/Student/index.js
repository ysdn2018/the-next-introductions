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

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   offsetRight: offsetRight
    // })
  }

  render() {
    return (
      <Container innerRef={(container) => { this.element = container; }} style={this.props.style}>
        <Text>{this.props.num}</Text>
        <Text>{this.props.offsetRight}</Text>
      </Container>
    )
  }

}
