import React from 'react'
import styled from 'styled-components'

// component
const NavButton = styled.a`
  width: 100%;
  border-bottom: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: white;
  z-index: 2;
  height: 4rem;
  cursor: pointer;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    text-decoration: underline;
  }
`

export default NavButton;
