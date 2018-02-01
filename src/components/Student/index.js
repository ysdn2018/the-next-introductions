import React from 'react'
import styled from 'styled-components'
import Mark from '../Mark'
import Img from "gatsby-image"

/*
  Base component
  Copy this directory and rename to your choosing
*/


// styled components
const Container = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 20px;
  background-color: white;
  transform-origin: top right;

  .image-wrapper {
    height: 100%;
    width: 100%;
  }

  .image {
    height: 100%;
  }
`

const Text = styled.p`

`

const MarkContainer = styled.div`
  position: absolute;
  top: -5.5rem;
  right: -4.3rem;
  opacity: 0;

  ${Container}:hover & {
    opacity: 1;
  }
`

const StatementText = styled.div`
  text-transform: uppercase;
  line-height: 1;
  position: absolute;
  font-size: 4.5rem;
  opacity: 0;

  ${Container}:hover & {
    opacity: 1;
  }
`

const Verb = StatementText.extend`
  transform: rotate(-90deg);
  transform-origin: center;
  left: -23rem;
  text-align: right;
  width: 400px;
  top: 17.6rem;

`

const Noun = StatementText.extend`
transform: rotate(-180deg);
right: -0.5rem;
bottom: -5.3rem;
`

// helper function
const constrain = (num, low, high) => Math.min(Math.max(Math.abs(num), low), high);

// component
export default class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetRight: 0
    }
  }

  calcOffset = () => {
    let boundingRect = this.element.getBoundingClientRect();

    this.setState({
      offsetRight: (this.props.windowWidth - boundingRect.left)/this.props.windowWidth
    })
  }

  getOffset = () => this.state.offsetRight;

  setOffset = (offset) => {
    this.setState({
      offsetRight: offset
    })
  }

  render() {
    let offset = this.state.offsetRight+0.3;

    let style = {
      transform: `scale(${constrain(Math.pow(offset, 1.5)*0.65+(0.1-offset*0.1),0,2)}) translateY(${constrain(1-offset*100, -1, 120) + (20 - offset*20)}%)`
    }

    return (
      <Container innerRef={(container) => { this.element = container; }} style={style}>
        <MarkContainer>
          <Mark/>
        </MarkContainer>

        <Verb>{this.props.verb}</Verb>
        <Noun>{this.props.noun}</Noun>

        <Img
          resolutions={this.props.image}
          outerWrapperClassName='image-wrapper'
          className='image'
        />
      </Container>
    )
  }

}
