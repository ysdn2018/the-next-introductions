import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Script from "react-load-script";
import Student from '../components/Student'

const OuterContainer = styled.div`
  height: 100%;
  overflow: hidden;
`

const Container = styled.div`
  width: calc(100% + 15px);
  margin-right: -15px;
  overflow-y: auto;
  height: 100%;
`

const InnerContainer = styled.div`
  padding-bottom: 15px !important;
  height: auto;

  .is-active {
    transition: transform 100ms ease-in-out;
    transform: scale(1);
  }
`

const Image = styled.div`
  width: 400px;
  height: 400px;
  margin-right: 20px;
  background-color: grey;
  transform-origin: top right;
`

const ImagesContainer = styled.div`
`

const Line = styled.div`
  height: 100%;
  width: 3px;
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 0;
`

// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: 0,
      windowWidth: 1000,
      windowHeight: 1000,
      studentsHeight: 1000,
      vmin: 1000
    }

    const scroller = scrollama();
    this.scroller = scroller;

    this.length = this.props.data.allMarkdownRemark.edges.length;
    this.students = new Array(this.length*2).fill({});
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
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      studentsHeight: this.studentsContainer.offsetHeight,
      vmin: Math.min(window.innerWidth, window.innerHeight)
    }, this.updateChildren);
    console.log(this.students);

    this.scroller
    .setup({
      step: '.student', // required
      offset: 0.5, // optional, default = 0.5
      progress: true
    })
    .onStepEnter(this.handleStepEnter)
    .onStepExit(this.handleStepExit)
    .onStepProgress(this.handleStepProgress);
  }

  animateChildren = () => {

  }

  handleScroll = (e) => {
    let scroll = this.container.scrollTop;
    // console.log(this.students);
    let deltaY = e.deltaY;
    let deltaX = e.deltaX;
    let scope = this;
    // window.requestAnimationFrame(() => {
    //   scope.students[0].translateY += (deltaY + deltaX)*0.3;
    //   scope.students[1].translateY -= (deltaY + deltaX)*0.3;
    // })
    //
    // if (!(scroll == 1) && !(scroll == 0) ) {
    //   this.updateChildren();
    // }
    //
    // this.setState({
    //   scroll: scroll,
    // })
  }

  // resetScroll = () => {
  //   this.container.scrollLeft = 200;
  // }

  updateWindowSize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      vmin: Math.min(window.innerWidth, window.innerHeight)
    })
  }


  initChildren = () => {
    for (let s = 0; s < this.students.length; s++) {
      this.students[s] = {
        debug: 0,
        scale: 0
      };
    }
  }

  updateChildren = () => {
      for (let s = 0; s < this.students.length; s++) {
        let centerScroll = this.state.scroll + this.state.windowWidth/2;
        let studentWidth =  (this.state.vmin*0.7);
        let studentCenterPoint = (studentWidth*s)+(studentWidth/2);
        let distance = Math.abs(centerScroll-studentCenterPoint);
        let scaledDistance = (centerScroll-studentCenterPoint)/(this.state.windowWidth/2);

        let obj = {};
        // obj.debug = distance;
        obj.debug = 0;
        obj.translateY = 0;

        this.students[s] = obj;

        // this.students[s].scale =
      }
  }

  handleStepEnter = (response) => {
    // response = { element, direction, index }
    console.log('enter', response);
    // add to color to current step
    console.log(response.progress);
  }

  handleStepProgress = (response) => {
    console.log(response.progress*2);
    if (response.progress > 0.5)
      response.element.firstChild.style.transform = `scale(${1-(response.progress*2-1)})`
    else
      response.element.firstChild.style.transform = `scale(${response.progress*2})`
    // this.students[response.index].scale = response.progress;
  }

  handleStepExit = (response) => {
    // response = { element, direction, index }
    console.log('exit', response);
    // remove color from current step
    response.element.firstChild.style.transform = `scale(${response.progress})`
  }

  render() {
    let studentsData = this.props.data.allMarkdownRemark.edges;
    return (
      <OuterContainer onClick={this.resetScroll} onWheel={this.handleScroll}>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <Line/>

        <Container innerRef={(container) => { this.container = container; }}>
          <InnerContainer >

            <ImagesContainer innerRef={(studentsContainer) => { this.studentsContainer = studentsContainer; }}>
              {studentsData.map( ({ node }, i) => {
                // console.log(node.frontmatter.title);
                // console.log(this.students[i]);
                return (
                  <Student
                    key={node.id}
                    image={node.frontmatter.image.childImageSharp.sizes}
                    name={node.frontmatter.title}
                    verb={node.frontmatter.verb}
                    noun={node.frontmatter.noun}
                    blurb={node.frontmatter.blurb}
                    debug={this.students[i].debug}
                    scale={this.students[i].scale}
                    translateY={this.students[i].translateY}
                  />
                )
              })}
            </ImagesContainer>

            <ImagesContainer>
              {studentsData.map(({ node }, i) => {
                return (
                  <Student
                    key={node.id}
                    image={node.frontmatter.image.childImageSharp.sizes}
                    name={node.frontmatter.title}
                    verb={node.frontmatter.verb}
                    noun={node.frontmatter.noun}
                    blurb={node.frontmatter.blurb}
                    debug={this.students[i].debug}
                    scale={this.students[i].scale}
                    translateY={this.students[i].translateY}
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

export const query = graphql`
  query IndexQuery {
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
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes_withWebp
                }
              }
            }
          }
  	    }
  	  }
  	}
  }
`;
