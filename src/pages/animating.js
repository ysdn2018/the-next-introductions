import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Student from '../components/Student'

const OuterContainer = styled.div`
  height: 100%;
  overflow: hidden;
`

const Container = styled.div`
  height: calc(100% + 15px);
  margin-bottom: -15px;
  overflow: auto;
`

const InnerContainer = styled.div`
  height: 100%;
  display: flex;
  padding-bottom: 15px !important;
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
      windowWidth: 1000,
      studentsWidth: 1000
    }

    this.students = new Array(list.length*2).fill({});
  }

  componentDidMount() {
    this.setState({
      windowWidth: window.innerWidth,
      studentsWidth: this.studentsContainer.offsetWidth
    });
  }

  handleScroll = (e) => {
    let scroll = this.container.scrollLeft;
    let delta = e.deltaY;
    e.preventDefault();

    this.container.scrollLeft -= e.deltaY + e.deltaX * 2;

    if(scroll >= this.state.studentsWidth+3) {
      this.container.scrollLeft = 1;
    }

    if(scroll == 0) {
      this.container.scrollLeft = this.state.studentsWidth-2
    }

    this.setState({
      scroll: scroll,
    })

    this.updateChildren()
  }

  updateWindowSize() {
    this.setState({
      windowWidth: window.innerWidth
    })
  }

  updateChildren = () => {
    for (let s = 0; s < this.students.length; s++) {
      this.students[s].updateSize();
    }
  }

  render() {
    return (
      <OuterContainer>
        <Container innerRef={(container) => { this.container = container; }}>
          <InnerContainer onWheel={this.handleScroll}>

            <ImagesContainer innerRef={(studentsContainer) => { this.studentsContainer = studentsContainer; }}>
              {list.map(i => {
                return (
                  <Student
                    key={i}
                    num={i}
                    windowWidth={this.state.windowWidth}
                    ref={el => this.students[i] = el }
                  />
                )
              })}
            </ImagesContainer>

            <ImagesContainer>
              {list.map(i => {
                return (
                  <Student
                    key={i}
                    num={i}
                    windowWidth={this.state.windowWidth}
                    ref={el => this.students[list.length + i] = el}
                  />
                )
              })}
            </ImagesContainer>


          </InnerContainer>
        </Container>
      </OuterContainer>
    )
  }

}
