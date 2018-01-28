import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import HorScroll from '../components/HorScroll'

const Container = styled.div`
  height: 100% !important;
`

const InnerContainer = styled.div`
  height: 100%;
`



const Image = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 20px;
  background-color: grey;
`

const ImagesContainer = styled.div`
  display: flex;
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
      <Container>
        <InnerContainer>
          <HorScroll innerRef={(images) => { this.scroller = images; }}>

            <ImagesContainer innerRef={(images) => { this.imgContainer = images; }}>
              {list.map( i => <Image key={i}/> )}
            </ImagesContainer>

            <ImagesContainer>
              {list.map( i => <Image key={i}/> )}
            </ImagesContainer>

          </HorScroll>
        </InnerContainer>
      </Container>
    )
  }

}
