import React from 'react'
import styled from 'styled-components'


// styled components
const Container = styled.div`
	height: ${props => props.height};
  width: ${props => props.width};
	margin: auto;
	display: grid;

	grid-template-columns: ${props => props.doppler(props.cols, "BACKWARD")};
	grid-template-rows: ${props => props.doppler(props.rows, "FORWARD")};
`


// component
export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    if (typeof window !== `undefined`) {
      this.rows = Math.floor(window.innerHeight/120);
      this.cols = Math.floor(window.innerWidth/120);
    } else {
      this.rows = this.cols = 8;
    }
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

        {this.props.children}

			</Container>
		)
  }
}
