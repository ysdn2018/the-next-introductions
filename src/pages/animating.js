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


function Students(props) {
  return (
    <ImagesContainer>
      {list.map( i =>
        <Student
          key={i}
          scroll={props.scroll}
        />
      )}
    </ImagesContainer>
  )
}

//
// <Image key={i} style={style} offsetRight={offsetRight} innerRef={(image) => { this.images[i].element = image }}>
//   {i}
// </Image>

// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: 0,
      windowWidth: 0,
      imagesWidth: 1000
    }

    for (let s in list.length) {
      
    }
  }

  componentDidMount() {
    console.log(this.imagebox);
    this.state = {
      scroll: 0,
      windowWidth: window.innerWidth,
      imagesWidth: this.imagebox.offsetWidth
    }
  }

  handleScroll = (e) => {
    let scroll = this.container.scrollLeft;
    let delta = e.deltaY;
    e.preventDefault();

    this.container.scrollLeft -= e.deltaY + e.deltaX * 2;

    if(scroll >= this.state.imagesWidth-1) {
      this.container.scrollLeft = 1;
    }

    if(scroll == 0) {
      this.container.scrollLeft = this.state.imagesWidth-2
    }

    this.setState({
      scroll: scroll,
      windowWidth: window.innerWidth
    })
  }

  updateChildren = () => {

  }

  render() {
    return (
      <Container innerRef={(container) => { this.container = container; }} >
        <InnerContainer onWheel={this.handleScroll} >

          {/* <Students
            windowWidth={this.state.windowWidth}
            scroll={this.state.scroll}
            ref={(imagebox) => { this.imagebox = imagebox; }}
          /> */}

          <ImagesContainer>
            {list.map( i =>
              <Student
                key={i}
                windowWidth={this.state.windowWidth}
                scroll={this.props.scroll}
                ref={(student) => { this.students[i].element = student }}
              />
            )}
          </ImagesContainer>

        </InnerContainer>
      </Container>
    )
  }

}
