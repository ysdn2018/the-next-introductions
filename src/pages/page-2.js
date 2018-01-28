import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
`

const InnerContainer = styled.div`
  height: 100%;
  display: flex;
  width: 8000px;
  justify-content: space-around;
`

const Image = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 20px;
  background-color: grey;
`

const list = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleScroll = (e) => {
    console.log(this.container.scrollLeft)
    console.log("hey");
  }

  render() {
    return (
      <div onScroll={this.handleScroll} ref={(container) => { this.container = container; }}>
        <InnerContainer>
          {list.map( i => <Image key={i}/> )}
        </InnerContainer>
      </div>
    )
  }

}
