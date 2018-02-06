import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Script from "react-load-script";
import Student from '../components/Student'
const ScrollMagic = require('ScrollMagic');
require('animation.gsap');
require('debug.addIndicators');
const TimelineMax = require('TimelineMax');


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

    var controller = new ScrollMagic.Controller();
    this.controller = controller;

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
    });
    console.log(this.students);
    for (let s = 0; s < this.students.length; s++) {
      // let tween = TweenMax.staggerFromTo(this.students[s], 2, {opacity: 0}, {opacity: 0.5, ease: Back.easeOut}, 0.15);
      let scene = new ScrollMagic.Scene({triggerElement: this.students[s], duration: 300})
          .setTween(this.students[s], {scale: 0.5})
          .addIndicators({name: "2 (duration: 300)"})
					.addTo(this.controller);
    }
  }

  handleScroll = (e) => {
    let scroll = this.container.scrollTop;
    // console.log(this.students);

    if(scroll >= this.state.studentsHeight+3) {
      this.container.scrollTop = 0;
    }

    if(scroll == 0) {
      this.container.scrollTop = this.state.studentsHeight+2
    }
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
      obj.debug = Math.abs(1-distance/(this.state.windowWidth/2))
      obj.scale = Math.abs(1-distance/(this.state.windowWidth/2)-0.2);
      obj.scale = 0.5;
      obj.translateY = scaledDistance * (this.state.windowHeight)



      if (distance > this.state.windowWidth/2+(studentWidth/2)) {
        obj.scale = 0;
      } else {
        obj.scale = Math.abs(1-distance/(this.state.windowWidth/2));
      }

      this.students[s].data = obj;

      // this.students[s].scale =
    }
  }

  render() {
    let studentsData = this.props.data.allMarkdownRemark.edges;
    return (
      <OuterContainer onClick={this.resetScroll}>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <Line/>

        <Container innerRef={(container) => { this.container = container; }}>
          <InnerContainer onWheel={this.handleScroll}>

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
                    windowWidth={this.state.windowWidth}
                    studentRef={el => this.students[i] = el}
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
                    windowWidth={this.state.windowWidth}
                    studentRef={el => this.students[this.length + i] = el}
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
  query MagicQuery {
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
