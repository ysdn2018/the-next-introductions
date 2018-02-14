import React from 'react'
import styled from 'styled-components'
import { grid, animations, breakpoints } from '../../utils/constants.js'

// styled components
const Container = styled.div`
  height: 100%;
	width: 100%;
  flex: 1;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    border-right: 1px solid black;
  }
`

const Text = styled.p`

`

// Cells Stuff
const CellsContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
`

const CellRow = styled.div`
  height: ${props => props.height}%;
  width: 100%;
  display: flex;
  border-bottom: 1px solid black;
  margin-top: -1px;
`

const Cell = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  border-left: 1px solid black;
  margin-right: -1px;


  &:hover {
    background-color: ${props => props.hoverOn ? black : "none"};
    div {
      background-color: ${props => props.hoverOn ? black : "none"};
    }
  }

  ${'' /* @media (hover:none), (hover:on-demand) {
    &:hover {
      background-color: ${props => props.theme.bg };

      div {
        background-color: ${props => props.theme.bg };
      }
    }
  } */}
`
const InnerCell = styled.div`
  width: 140%;
  height: 100%;
`

function Cells(props) {
  let cellColumns = [];

  for (let col of grid.columns) {
    cellColumns.push(
      <Cell hoverOn={props.hoverOn} onClick={props.onToggleTheme} key={col} width={col}>
        {(col == 5) &&
          <InnerCell/>
        }
      </Cell>
    )
  }

  return (
    <CellsContainer>
      {grid.rows.map( (row, i) => (
        <CellRow key={i} height={row}>
          {cellColumns}
        </CellRow>
      ))}
    </CellsContainer>
  )
}


// component
export default function Grid(props) {
  return (
    <Container>
      <Cells hoverOn={props.hoverOn} onToggleTheme={props.onToggleTheme}/>
      {props.children}
    </Container>
  )
}
