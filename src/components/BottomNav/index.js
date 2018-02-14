import React from 'react'
import styled from 'styled-components'
import NavButton from '../NavButton'
import Grid from '../Grid'
import GridBlock from '../GridBlock'
import { grid, animations, spacing, breakpoints } from '../../utils/constants.js'


/*
  Base component
  Copy this directory and rename to your choosing
*/


const BottomNavButton = NavButton.extend`
  border-top: 1px solid black;
  top: -1px;
  border-bottom: 1px solid black;
`


// styled components
const Container = styled.div`
  z-index: 5;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 380px;
  background-color: white;
  padding-top: calc(4rem - 1px);
`

const Text = styled.p`

`

const Statement = GridBlock.extend`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-transform: uppercase;
  background-color: white;
  padding: 0.3rem;
  padding-left: 0.4rem;

  h2 {
    line-height: 1.2;
    font-size: 3.2rem;
    margin-top: -3px;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.6rem;
    }
  }

  h2:nth-child(2) {
    text-align: right;
  }
`

const InnerNav = styled.div`
  position: relative;
  height: 100%;
`

// component
export default class BottomNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verb: 'Introducing',
      noun: 'Class'
    }
  }

  handleStatement = (verb, noun) => {
    this.setState({
      verb,
      noun
    })
  }

  resetStatement = () => {
    this.setState({
      verb: 'Introducing',
      noun: 'Class'
    })
  }

  render() {
    return (
      <Container>
        <BottomNavButton onClick={this.props.handleClick} onMouseEnter={() => this.handleStatement("Close", "Info")} onMouseLeave={() => this.resetStatement()}>
          {this.props.open ? "Close" : "Info"}
        </BottomNavButton>

        <InnerNav>
          <Statement rowStart={0} rowEnd={4} colStart={0} colEnd={1} wAdjust={0} pad onMouseEnter={() => this.handleStatement(" ", " ")} onMouseLeave={() => this.resetStatement()}>
            <h2>{this.state.verb}</h2>
            <h2>The Next</h2>
            <h2>{this.state.noun}</h2>
          </Statement>

          <Grid />
        </InnerNav>

      </Container>
    )
  }
}
