import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  overflow: auto;
`

const InnerContainer = styled.div`
  height: 100%;
  display: flex;

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

    this.images = [];
  }

  handleScroll = (e) => {
    let scroll = this.container.scrollLeft;
    let imagesWidth = this.imagebox.offsetWidth;
    let delta = e.deltaY;
    e.preventDefault();

    this.container.scrollLeft -= e.deltaY + e.deltaX * 2;

    if(scroll >= imagesWidth-1) {
      this.container.scrollLeft = 1;
    }

    if(scroll == 0) {
      this.container.scrollLeft = imagesWidth-2
    }

    console.log(this.images);

  }

  render() {
    return (
      <Container innerRef={(container) => { this.container = container; }} >
        <InnerContainer  onWheel={this.handleScroll} >

          <ImagesContainer  innerRef={(imagebox) => { this.imagebox = imagebox; }}>
            {list.map( i =>
              <Image key={i} innerRef={(image) => { this.images.push({ num: i, element: image }) }} />
            )}
          </ImagesContainer>

          <ImagesContainer>
            {list.map( i =>
              <Image key={i}/>
            )}
          </ImagesContainer>

        </InnerContainer>
      </Container>
    )
  }

}
