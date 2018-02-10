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
  width: 70vmin;
  height: 70vmin;
  position: absolute;
  ${'' /* top: -100vmin; */}
  top: 0;
  background-color: white;
  ${'' /* transform-origin: center center; */}
  transform-origin: top center;
  cursor: pointer;
  transform: scale(1);
  ${'' /* transition: transform 10ms ease-in-out; */}

  .image-wrapper {
    height: 100%;
    width: 100%;
  }

  .image {
    height: 100%;
  }
`

const InnerContainer = styled.div`
  height: 100%;
  width: 100%;

  transform-origin: center center;
`

const Text = styled.p`

`

const Line = styled.div`
  height: 100%;
  width: 3px;

  position: absolute;
  z-index: 3;
  left: 50%;
  top: 0;
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

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`

const InnerTextContainer = styled.div`
  padding: 1rem;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: white;
`

// helper function
const constrain = (num, low, high) => Math.min(Math.max(Math.abs(num), low), high);

const map = (num, in_min, in_max, out_min, out_max) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;



// component
export default class Student extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetRight: 0,
      showInfo: false
    }
  }

  toggleInfo = () => {
    this.setState(prevState => ({
      showInfo: !prevState.showInfo
    }))
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
    console.log(`${this.props.verb} the next ${this.props.noun} = ${this.props.name}`);
    let offset = this.state.offsetRight+0.3;

    // let style = {
    //   transform: `scale(${constrain(Math.pow(offset, 1.5)*0.65+(0.1-offset*0.1),0,2)}) translateY(${constrain(1-offset*100, -1, 120) + (20 - offset*20)}%)`
    // }

    let style = {
      transform: `scale(${this.props.scale}) translateY(${this.props.translateY}px)`
      // transform: `scale(${this.props.scale})`
    }

    return (
      <Container className="student" innerRef={this.props.studentRef} onClick={this.toggleInfo}>
        <InnerContainer>

        <MarkContainer>
          <Mark/>
        </MarkContainer>

        <Line/>

        <Verb>{this.props.verb}</Verb>
        <Noun>{this.props.noun}</Noun>

        {this.state.showInfo ? (
          <TextContainer>
            <InnerTextContainer>
              <p>{this.props.blurb}</p>
              <p>{this.props.name}</p>
              <h1>{this.props.debug}</h1>
            </InnerTextContainer>
          </TextContainer>
        ) : (
          <Img
            sizes={this.props.image}
            outerWrapperClassName='image-wrapper'
            className='image'
          />
        )}
          </InnerContainer>
      </Container>
    )
  }

}
