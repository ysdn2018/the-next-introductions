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
      windowWidth: 1000,
      studentsWidth: 1000
    }

    this.students = Array(list.length).fill({});
  }

  componentDidMount() {
    console.log(this.students[0].component.element);
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

    if(scroll >= this.state.studentsWidth-1) {
      this.container.scrollLeft = 1;
    }

    if(scroll == 0) {
      this.container.scrollLeft = this.state.studentsWidth-2
    }

    this.setState({
      scroll: scroll,
      windowWidth: window.innerWidth
    })



    this.updateChildren()
  }

  updateChildren = () => {
    for (let s in this.students) {
      this.students[s].num = s;
      let boundingRect = this.students[s].component.element.getBoundingClientRect();
      this.students[s].rect = boundingRect;

      this.students[s].offsetRight = (this.state.windowWidth - this.students[s].rect.left)/this.state.windowWidth;
    }
  }

  render() {
    return (
      <Container innerRef={(container) => { this.container = container; }} >
        <InnerContainer onWheel={this.handleScroll} >

          {/* <Students
            windowWidth={this.state.windowWidth}
            scroll={this.state.scroll}
            studentRef={el => this.studentElement = el}
          /> */}

          <ImagesContainer innerRef={(studentsContainer) => { this.studentsContainer = studentsContainer; }}>
            {list.map( i => {
              let style = {
                transform: `scale(${Math.min(Math.max(Math.abs(this.students[i].offsetRight), 0), 1.5)})`
              }

              // console.log(this.students[i].offsetRight);

              return (
                <Student
                  key={i}
                  num={i}
                  style={style}
                  offsetRight={this.students[i].offsetRight}
                  ref={el => this.students[i].component = el}
                />
              )
            })}
          </ImagesContainer>

        </InnerContainer>
      </Container>
    )
  }

}
