import React from 'react'
import styled from 'styled-components'


// styled components
const Container = styled.div`
	height: ${props => props.height};
  width: ${props => props.width};
	margin: auto;
	display: grid;
	background-color: black;
	grid-template-columns: ${props => props.doppler(props.cols, "BACKWARD")};
	grid-template-rows: ${props => props.doppler(props.rows, "FORWARD")};
`

const Child = styled.div`
	border: 0.1px solid black;
  background-color: white;
`


// component
export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    // this.rows = 11;
    // this.cols = 8;
    this.rows = Math.floor(window.innerHeight/100);
    this.cols = Math.floor(window.innerWidth/100);
    console.log(this.rows, this.cols)
    console.log(this.doppler(this.cols, "BACKWARD"))
  }

  doppler = (num, direction) => {
    let base = "";

    switch (direction) {
      case 'FORWARD':
        for (let i = 0; i < num; i++) {
          base += Math.pow(1.5, i).toFixed(2) + "fr "
        }
        return base;
      case 'BACKWARD':
        for (let i = num; i > 0; i--) {
          base += Math.pow(1.5, i).toFixed(2) + "fr "
        }
        return base;
      default:
        return base;
    }
  }

  render() {
    return (
			<Container
        innerRef={container => {this.componentContainer = container}}
        doppler={this.doppler}
        rows={this.rows}
        cols={this.cols}
        width={this.props.width}
        height={this.props.height}>


			</Container>
		)
  }
}
