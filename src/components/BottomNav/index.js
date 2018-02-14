import React from 'react'
import styled from 'styled-components'
import NavButton from '../NavButton'
import Instagram from '../Instagram'
import Grid from '../Grid'
import GridBlock from '../GridBlock'
import { grid, animations, spacing, breakpoints } from '../../utils/constants.js'


/*
  Base component
  Copy this directory and rename to your choosing
*/

function calcColumns(colStart) {
  let distance = 0;
  for (let i = 0; i < colStart; i++) {
    distance += grid.columns[i];
  }
  return distance;
}

function calcRows(colStart) {
  let distance = 0;
  for (let i = 0; i < colStart; i++) {
    distance += grid.rows[i];
  }
  return distance;
}




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
  transition: transform 200ms cubic-bezier(.14,.6,.36,1);
  transform: translateY(${props => props.open ? "0" : "calc(380px - 3.86rem)"});

  &:hover {
    @media (min-width: 550px) {
      transform: translateY(${props => props.open ? "0" : "calc(100% - 4.5rem)"});
    }
    @media (min-width: ${breakpoints.mobile}) {
      transform: translateY(${props => props.open ? "0" : "calc(380px - 4.5rem)"});
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    transform: translateY(${props => props.open ? "0" : "calc(100% - 3.86rem)"});
    height: 90%;
  }
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
  z-index: 4;

  h2 {
    line-height: 1.2;
    font-size: 3.2rem;
    margin-top: -3px;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 3rem;
    }
  }

  h2:nth-child(2) {
    text-align: right;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: calc(${calcRows(2)}%);
    width: 100%;

  }
`

const Essay = GridBlock.extend`
  left: calc(${calcColumns(2)}% - 4px);
  font-size: 1.9rem;
  line-height: 1.4;
  padding: 0.5rem ${spacing.padding.bigger};
  z-index: 4;

  p {
    margin: 0;
  }

  @media (min-width: 1400px) {
    left: calc(${calcColumns(2)}% - 6px);
  }

  @media (max-width: 1100px) {
    left: calc(${calcColumns(2)}% - 3px);
  }

  @media (min-width: 1500px) {
    left: calc(${calcColumns(2)}% - 5px);
  }

  @media (min-width: 1500px) {
    left: calc(${calcColumns(2)}% - 8px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    left: 1px;
    margin-top: -2px;
    top: calc(${calcRows(3)}% - 4px);
  }

  @media (min-width: 500px) and (max-width: ${breakpoints.mobile}) {
    p {
      max-width: 500px;
    }
  }

`

const EventInfo = GridBlock.extend`
  left: calc(${calcColumns(3)}% - 6px);
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction:column;
  line-height: 1.3;
  padding: 0.5rem ${spacing.padding.bigger};
  z-index: 3;

  p {
    margin: 0;
  }

  @media (min-width: 1400px) {
    left: calc(${calcColumns(3)}% - 11px);
  }

  @media (max-width: 1100px) {
    left: calc(${calcColumns(3)}% - 9px);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    left: 1px;
    margin-top: -2px;
    font-size: 1.5rem;
    left: calc(${calcColumns(1)}% - 2px);
    top: calc(${calcRows(2)}% + 0px);
    height: calc(${calcRows(2)}% - 30px);
    width: calc(64% + 3px);
  }

  @media (max-width: 450px) {
    height: calc(${calcRows(2)}% - 18px);
  }

  @media (min-width: 500px) and (max-width: ${breakpoints.mobile}) {
    font-size: 1.8rem;
    height: calc(${calcRows(2)}% - 35px);
  }

`

const InstagramContainer = GridBlock.extend`
  left: calc(${calcColumns(5)}% - 6px);
  font-size: 1.6rem;
  display: flex;
  justify-content: space-between;
  flex-direction:column;
  line-height: 1.3;

  p {
    margin: 0;
  }

  @media (min-width: 1100px) {
    left: calc(${calcColumns(5)}% - 8px);
  }

  @media (min-width: 1300px) {
    left: calc(${calcColumns(5)}% - 10px);
  }

  @media (min-width: 1400px) {
    left: calc(${calcColumns(5)}% - 13px);
  }

  @media (min-width: 1500px) {
    left: calc(${calcColumns(5)}% - 15px);
  }


  @media (max-width: 1100px) {
    left: calc(${calcColumns(5)}% - 10px);
  }


  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    left: 1px;
    margin-top: -2px;
    top: calc(${calcRows(2)}% - 4px);
    height: calc(${calcRows(2)}% - 20px);
    width: calc(${calcColumns(1)}% + 0px);
  }

  @media (min-width: 500px) and (max-width: ${breakpoints.mobile}) {
    height: calc(${calcRows(2)}% - 26px);
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
    if (this.props.windowWidth > 500) {
      this.setState({
        verb,
        noun
      })
    }
  }

  resetStatement = () => {
    this.setState({
      verb: 'Introducing',
      noun: 'Graduates'
    })
  }

  render() {
    return (
      <Container open={this.props.open}>
        <BottomNavButton onClick={this.props.handleClick} onMouseEnter={() => this.handleStatement("Close", "Info")} onMouseLeave={() => this.resetStatement()}>
          {this.props.open ? "Close" : "Info"}
        </BottomNavButton>

        <InnerNav>
          <Statement
            rowStart={0}
            rowEnd={4}
            colStart={0}
            colEnd={1}
            wAdjust={0}

            mRowStart={0}
            mRowEnd={1}
            mColStart={0}
            mColEnd={7}
            wAdjust={-2}
            pad>

            <h2>{this.state.verb}</h2>
            <h2>The Next</h2>
            <h2>{this.state.noun}</h2>
          </Statement>

          <Essay
            rowStart={0}
            rowEnd={3}
            colStart={2}
            colEnd={4}
            wAdjust={-2}

            mRowStart={3}
            mRowEnd={4}
            mColStart={0}
            mColEnd={7}
            wAdjust={-2}
            pad
            onMouseEnter={() => this.handleStatement(" ", " ")} onMouseLeave={() => this.resetStatement()}>

            <p>{this.props.text}</p>
          </Essay>

          <EventInfo
            rowStart={3}
            rowEnd={4}
            colStart={3}
            colEnd={7}
            wAdjust={0}
            mColStart={3}
            mColEnd={7}

            mRowStart={2}
            mRowEnd={3}
            pad
            onMouseEnter={() => this.handleStatement("Meet", "Graduates")} onMouseLeave={() => this.resetStatement()}>
            <p>Design Grad Show by <br />York University / Sheridan College</p>
            <p>April 11-13, 2018 <br /> Gladstone Hotel</p>
          </EventInfo>

          <InstagramContainer
            rowStart={0}
            rowEnd={2}
            colStart={5}
            colEnd={7}
            wAdjust={0}

            mRowStart={2}
            mRowEnd={3}
            wAdjust={-2}
            onMouseEnter={() => this.handleStatement("Follow", "Instagram")} onMouseLeave={() => this.resetStatement()}>
            <Instagram />
          </InstagramContainer>

          <Grid />
        </InnerNav>

      </Container>
    )
  }
}
