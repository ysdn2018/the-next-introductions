import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Script from "react-load-script";
import Student from '../components/Student'
import Statement from '../components/Statement'
import NavButton from '../components/NavButton'
import BottomNav from '../components/BottomNav'
import Intro from '../components/Intro'
import { TimelineMax, TweenLite } from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { animations } from '../utils/constants.js'
import Img from 'gatsby-image'
import _ from 'lodash';
// polyfill
require('intersection-observer');

const OuterContainer = styled.div`
  height: 100%;
  width: calc(100% + 15px);
  margin-right: -15px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
`

const Container = styled.div`

`

const TopNavButton = NavButton.extend`
  border-bottom: 1px solid black;
  top: 0;
  text-align: center;
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  &:hover {
    text-decoration: none;
  }

  &:hover p:nth-child(2) {
    text-decoration: underline;
  }

  p:first-child, p:last-child {
    opacity: 0;
    width: 20%;
  }

  p:first-child {
    text-align: left;
  }

  p:last-child {
    text-align: right;
  }

  &:hover p:first-child, &:hover p:last-child  {
    opacity: 1;
  }
`

const Viewport = styled.div`
  position: fixed;
  padding-bottom: 15px !important;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const Content = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`


const FakeStudent = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  margin-right: 20px;
  transform-origin: top right;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;


  h1 {
    position: absolute;
  }
`

const InnerBox = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`

const FakeProject = styled.div`
  transform-origin: 0;
  background-color: pink;
  height: 70vmin;
  width: 70vmin;
`


const TestBox = styled.div`
  height: 200px;
  width: 200px;
  background-color: red;
  z-index: 2;
`

const FakeImage = styled(Img)`
  background-color: red;
  z-index: 2;

  height: 70vmin;
  width: 70vmin;
`



/* Intro Stuff */

const IntroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  animation: ${animations.allowInteraction} 0s 4.5s ease-out forwards;

`


// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudent: 0,
      navOpen: false,
      loaded: false,
      orientation: 'LANDSCAPE'
    }

    this.scroller = {
      container: null,
      viewportHeight: 1000,
      stepHeight: 1000,
      scrollHeight: 0,
      padding: 0,
      steps: [],
      step: 0,
      y: 0
    };

    this.length = this.props.data.allMarkdownRemark.edges.length;
    this.students = new Array(this.length+3).fill({});
  }

  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  componentDidMount() {
    this.setup()
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  setup = () => {
    this.scroller = {
      container: this.content,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      stepHeight: Math.max(window.innerHeight, 2500)/2,
      vmin: Math.min(window.innerHeight, window.innerWidth),
      scrollHeight: 0,
      padding: 1,
      steps: [],
      step: 0,
      y: 0
    };

    this.students[this.students.length-3].firstChild.classList.add("first-student")

    setTimeout(() => {
        let firstProj = (this.scroller.stepHeight*2+this.scroller.stepHeight/2)
        window.scrollTo(0, firstProj+this.scroller.stepHeight);
        this.tl.time(firstProj+this.scroller.stepHeight);
    }, 4000);

    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 4500);


    this.tl = new TimelineMax({
      paused: true,
      onUpdate: this.update
    });

    this.requestId = null;
    this.infoOpen = false;
    TweenLite.defaultEase = Power1.easeInOut;

    this.initChildren();

    TweenLite.set(document.body, {
      height: this.scroller.scrollHeight + this.scroller.viewportHeight
    });

    if (this.scroller.viewportWidth < 500) {
      TweenLite.set(this.scroller.container, {
        height: this.scroller.scrollHeight,
        top: -this.scroller.viewportHeight/3,
        force3D: true
      });
    } else {
      TweenLite.set(this.scroller.container, {
        height: this.scroller.scrollHeight,
        top: -this.scroller.viewportHeight/4,
        force3D: true
      });
    }

  }

  update = () => {
    let scroll = window.pageYOffset;

    this.infiniteScroll(scroll);

    if (this.infoOpen) {
      this.closeInfo(this.state.currentStudent);
    } else {
      this.scroller.y = scroll;
      this.requestId = null;
      this.tl.time(-scroll);
    }

    if (this.state.navOpen) {
      this.setState({
        navOpen: false
      })
    }
  }

  infiniteScroll = (scroll) => {
    if (scroll < this.scroller.stepHeight*2+this.scroller.stepHeight/2 - 150) {
      window.scrollTo(0, (this.scroller.stepHeight + this.scroller.padding)*(this.scroller.steps.length-2) + 150);
    }

    if (scroll > (this.scroller.stepHeight + this.scroller.padding)*(this.scroller.steps.length-2) + 150) {
      window.scrollTo(0, this.scroller.stepHeight*2+this.scroller.stepHeight/2 - 150);
    }
  }

  handleScroll = (e) => {
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(this.update);
    }
  }

  initChildren = () => {
    for (var i = 0; i < this.students.length; i++) {
      this.addChild(this.students[i], this.scroller.stepHeight, this.scroller.padding, i);
    }
  }



  componentWillMount() {
    let studentsDataPre = this.shuffleArray(this.props.data.allMarkdownRemark.edges);
    let studentDataEnd = studentsDataPre.slice(1,4);
    this.studentsData = studentsDataPre.concat(studentDataEnd);
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  addChild = (element, size, padding, index) => {
    var step = {
      height: element.getBoundingClientRect().height,
      size: size,
      pad: padding,
      progress: 0,
      position: this.scroller.scrollHeight
    };

    let easing = Power1.easeInOut;

    if (index > 0 ) {
      var last = this.scroller.steps[index - 1];

      this.tl.set(this.scroller, { step: index - 1 }, this.scroller.scrollHeight)
        .to(this.scroller.container, last.height, { y: "-=" + last.height, ease: easing }, this.scroller.scrollHeight);

    }

    TweenLite.set(element.firstChild, {scale: 0.05, x: -(this.scroller.viewportWidth/3+this.scroller.vmin*0.08) });

    this.tl.set(element.firstChild, { scale: 0.25, x: -(this.scroller.viewportWidth/3+this.scroller.vmin*0.08), top: 0 }, this.scroller.scrollHeight-size*2 )
      .to(element.firstChild, size/2, { scale: 1, x: 0, ease: easing, className: "+=show-statement" }, this.scroller.scrollHeight-size-padding)
      .to(element.firstChild, size/2, { scale: 0.25, x: this.scroller.viewportWidth/3+this.scroller.vmin*0.08,  ease: easing, className: "-=show-statement" }, this.scroller.scrollHeight)

    this.tl.set(this.scroller, { step: index }, this.scroller.scrollHeight)
            .to(step, size, { progress: 1, ease: easing  }, this.scroller.scrollHeight)

    this.scroller.scrollHeight += (size + padding);
    this.scroller.steps.push(step);
  }


  closeInfo = (studentIndex) => {
    this.infoOpen = false;
    this.update();

    this.students[studentIndex].firstChild.classList.remove("show-info")
    this.students[studentIndex-1].firstChild.classList.remove("hide")
    this.students[studentIndex+1].firstChild.classList.remove("hide")
  }

  openInfo = (studentIndex) => {
    let studentPos = this.scroller.scrollHeight-this.scroller.steps[studentIndex].position;
    let distance = Math.abs(studentPos - this.scroller.y);

    if (this.state.navOpen) {
      this.setState({
        navOpen: false
      })
    }

    let infoSetup = () => {
      this.scroller.y = window.pageYOffset;

      setTimeout(() => {
        this.students[studentIndex].firstChild.classList.add("show-info","show-statement")
        this.students[studentIndex-1].firstChild.classList.add("hide")
        this.students[studentIndex+1].firstChild.classList.add("hide")
      }, 2)
    }

    if (distance > 100 && !this.students[studentIndex].firstChild.classList.contains("first-student") ) {
      let tl = new TimelineMax({onComplete: () => {
        infoSetup();
      }});
      tl.to(window, distance*0.001, {scrollTo: studentPos})
    } else {
      infoSetup();
    }
  }

  handleStudentClick = (studentIndex) => {
    this.setState({
      currentStudent: studentIndex
    })

    if (this.infoOpen || this.students[studentIndex].firstChild.classList.contains("show-info")) {
      this.closeInfo(studentIndex);
    } else {
      this.openInfo(studentIndex);
    }
  }

  handleNavClick = () => {
    this.setState(prevState => ({
      navOpen: !prevState.navOpen
    }))
  }

  render() {
    let currentStudent = this.studentsData[this.state.currentStudent].node.frontmatter;

    return (
      <OuterContainer innerRef={(container) => { this.container = container; }} >

        <Container>
          <TopNavButton href="http://announcing.thenext.website/" target="_blank">
            <p>Open</p>
            <p>The Next</p>
            <p>Website</p>
          </TopNavButton>

          {!this.state.loaded &&
            <IntroContainer innerRef={el => this.introContainer = el}>
              <Statement
                verb="Introducing"
                noun="Graduates"
              />
              <Intro
                students={_.sampleSize(this.studentsData, 5).concat(this.studentsData.slice(0,2)).concat(this.studentsData.slice(1,2)[0])}
              />
            </IntroContainer>
          }

          <Viewport innerRef={(viewport) => { this.viewport = viewport; }}>

            <Content innerRef={(content) => { this.content = content; }}>
              {this.studentsData.map( ({ node }, i) => (
                <Student
                  key={i}
                  handleClick={this.handleStudentClick}
                  index={i}
                  image={node.frontmatter.image.childImageSharp.sizes}
                  verb={node.frontmatter.verb}
                  noun={node.frontmatter.noun}
                  blurb={node.frontmatter.blurb}
                  name={node.frontmatter.title}
                  orientation={this.state.orientation}
                  studentRef={el => this.students[i] = el}
                />
              ))}
            </Content>

          </Viewport>

          <BottomNav
            open={this.state.navOpen}
            handleClick={this.handleNavClick}
            text={this.props.data.markdownRemark.frontmatter.text}
            windowWidth={this.scroller.viewportWidth}
          />

        </Container>
      </OuterContainer>
    )
  }

}

export const query = graphql`
  query IndexTestQuery {
    allMarkdownRemark (filter: {fileAbsolutePath: {regex: "/students/"} }) {
  	  edges {
  	    node {
  	      id
          frontmatter {
            title
            verb
            noun
            blurb

            image {
              childImageSharp {
                sizes(maxWidth: 1000) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
  	    }
  	  }
  	}

    markdownRemark ( fileAbsolutePath:{ regex: "/about/"}) {
      frontmatter {
        title
        text
      }
    }
  }
`;
