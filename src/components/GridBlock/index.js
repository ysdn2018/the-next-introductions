import React from 'react'
import styled from 'styled-components'
import { grid, animations, spacing, breakpoints } from '../../utils/constants.js'


/*
** Base GridBlock component that will figure out all sizing, theming, etc
** Used styledcomponents extend to create other com
*/

// styled components
const GridBlock = styled.div`
  overflow: hidden;
  z-index: 2;
  min-width: 0;
  background-color: white;
  position: absolute;
  margin: -1px;
  color: ${props => props.theme.fg};

  opacity: 0;
  transform-origin: right;
  animation: ${animations.fadeIn} 0.6s 2s ease-in-out forwards;

  > div, > h2, > p {
    transition: opacity 250ms ease-out;
    opacity: 0;
    transform: scaleX(1);
    animation: ${animations.fadeIn} 0.8s 3s ease-out forwards;
  }

  &:hover {
  }

  border: 1px solid ${props => props.theme.fg};
  ${props => props.borderNo && 'border-' + props.borderNo + ': none;'}
  ${props => props.pad && 'padding: ' + spacing.padding.normal + ';'}

  left: calc(${props => {
    let distance = 0;
    let colStart = props.colStart || 0;
    let colEnd = props.colEnd || colStart;
    for (let i = 0; i < colStart; i++) {
      distance += grid.columns[i];
    }
    return distance;
  }}% - ${props => (props.colStart - 1 || 0)}px);

  width: calc(${props => {
    let width = 0;
    let colStart = props.colStart;
    let colEnd = props.colEnd || colStart + 1;
    for (let i = colStart; i < colEnd; i++) {
      width += grid.columns[i];
    }
    return width;
  }}% + ${props => props.wAdjust || 0}px);

  top: calc(${props => {
    let distance = 0;
    let rowStart = props.rowStart || 0;
    let rowEnd = props.rowEnd || rowStart;
    for (let i = 0; i < rowStart; i++) {
      distance += grid.rows[i];
    }
    return distance;
  }}% - ${props => props.rowStart || 0}px);

  height: calc(${props => {
    let height = 0;
    let rowStart = props.rowStart || 0;
    let rowEnd = props.rowEnd || rowStart + 1;
    for (let i = rowStart; i < rowEnd; i++) {
      height += grid.rows[i];
    }
    return height;
  }}% + ${props => -1 * (props.rowEnd - props.rowStart - 1 || 0) + (props.hAdjust || 0)}px);


  @media (max-width: ${breakpoints.mobile}) {
    left: calc(${props => {
      let distance = 0;
      let mColStart = props.mColStart || props.colStart;
      let mColEnd = props.mColEnd || props.colEnd;
      for (let i = 0; i < mColStart; i++) {
        distance += grid.columns[i];
      }
      return distance;
    }}% - ${props => (props.colStart - 1 || 0)}px);

    width: calc(${props => {
      let width = 0;
      let mColStart = props.mColStart || props.colStart;
      let mColEnd = props.mColEnd || props.colEnd;
      for (let i = mColStart; i < mColEnd; i++) {
        width += grid.columns[i];
      }
      return width;
    }}% + ${props => props.mWAjust || props.wAdjust}px);

    top: calc(${props => {
      let distance = 0;
      let mRowStart = props.mRowStart || props.rowStart;
      let mRowEnd = props.mRowEnd || props.rowEnd;
      for (let i = 0; i < mRowStart; i++) {
        distance += grid.rows[i];
      }
      return distance;
    }}% - ${props => props.rowStart || 0}px);

    height: calc(${props => {
      let height = 0;
      let mRowStart = props.mRowStart || props.rowStart;
      let mRowEnd = props.mRowEnd || props.rowEnd;
      for (let i = mRowStart; i < mRowEnd; i++) {
        height += grid.rows[i];
      }
      return height;
    }}% + ${props => -1 * (props.rowEnd - props.rowStart - 1) + (props.hAdjust)}px);
  }
`

export default GridBlock;
