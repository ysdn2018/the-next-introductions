import React from 'react'
import styled from 'styled-components'


// styled components
const Container = styled.div`
	height: 80vh;
  border: 1px solid black;
	margin: auto;
	display: grid;
	background-color: black;
	grid-template-columns: ${props => props.doppler(props.cols)};
	grid-template-rows: ${props => props.doppler(props.rows, "forward")};
`

const Child = styled.div`
	border: 1px solid black;
	opacity: 0.1;
`


// component
export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.rows = 11;
    this.cols = 8;

    let children = [];

    for (let x = 0; x <= this.rows; x++) {
      for (let y = 0; y <= this.cols; y++) {
        children.push(`r${x} c${y}`)
      }
    }

    this.state = {
      children: children,
      items: []
    }
  }

  onComponentDidMount() {
    this.setState({
      items: this.randomizeGrid()
    })
  }

  randomizeGrid = () => {
    let items = [];
    const amount = 20;

    for (let i = 0; i <= amount; i++) {
      let row = Math.floor(Math.random()*this.rows+1);
      let rLength = Math.floor(Math.random()*(this.rows-row));

      let col = Math.floor(Math.random()*this.cols+1);
      let cLength = Math.floor(Math.random()*(this.cols-col));

      items.push({
        r1: row,
        r2: row+rLength,
        c1: col,
        c2: col+cLength
      });
    }

    this.setState({
      items: items
    })

    return items;
  }

  doppler = (num, direction) => {
    let base = "";

    if (direction == "forward") {
      for (let i = 0; i < num; i++) {
        base += " " + Math.pow(1.5, i) + "fr"
      }
    } else {
      for (let i = num; i > 0; i--) {
        base += " " + Math.pow(1.5, i) + "fr"
      }
    }

    return base;
  }

  render() {
    return (
			<Container
        onClick={this.randomizeGrid}
        doppler={this.doppler}
        rows={this.rows}
        cols={this.cols}>



				{this.state.items.map((item, i) => {

					let itemStyle = {
						backgroundColor: "white",
						opacity: 1,
						gridRow: `${item.r1}/${item.r2}`,
						gridColumn: `${item.c1}/${item.c2}`,
					}

					let imgStyle = {
						width: '100%'
					}

					return (
						<div style={itemStyle}
							row1={item.r1}
							row2={item.r2}
							col1={item.c1}
							col2={item.c2}
              key={i}
            />
					);
				}



				)}

			</Container>
		)
  }
}
