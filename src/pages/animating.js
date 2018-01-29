import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Student from '../components/Student'

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
  transform-origin: top right;
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

    for (let i in list) {
      this.images.push({});
      this.images[i].rect = {};
      this.images[i].num = i;
    }

    this.state = {
      scroll: 0,
      windowWidth: 0
    }

  }

  componentDidMount() {
    this.state = {
      scroll: 0,
      windowWidth: window.innerWidth
    }
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

    this.setState({
      scroll: scroll,
      windowWidth: window.innerWidth
    })

    for (let i in this.images) {
      let boundingRect = this.images[i].element.getBoundingClientRect();
      this.images[i].rect = boundingRect;
    }
    //
    // let winWidth = window.innerWidth;
    // let right = winWidth-this.images[3].rect.left;
    // console.log(right/winWidth);
  }

  render() {
    return (
      <Container innerRef={(container) => { this.container = container; }} >
        <InnerContainer onWheel={this.handleScroll} >

          <ImagesContainer  innerRef={(imagebox) => { this.imagebox = imagebox; }}>


{/*
            {list.map(i =>
              <Student
                key={i}
                parentScroll={i}
              />
            )} */}


            {list.map( i => {
              let offsetRight = Math.abs((this.state.windowWidth-this.images[i].rect.left)/this.state.windowWidth);

              if (offsetRight > 1.5) {
                offsetRight = 1.5;
              }

              let style = {
                transform: `scale(${offsetRight})`
              }
              return (
                <Image key={i} style={style} offsetRight={offsetRight} innerRef={(image) => { this.images[i].element = image }}>
                  {i}
                </Image>
              )
            })}


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
