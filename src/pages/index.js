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
  height: calc(100% + 15px);
  margin-bottom: -15px;
  overflow: auto;
  overflow-y: hidden;
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
  height: 100%;

`

const Line = styled.div`
  height: 100%;
  width: 3px;
  background-color: red;
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
      studentsWidth: 1000,
      vmin: 1000
    }


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
      studentsWidth: this.studentsContainer.offsetWidth,
      vmin: Math.min(window.innerWidth, window.innerHeight)
    }, this.updateChildren);
  }

  handleScroll = (e) => {
    let scroll = this.container.scrollLeft;
    let delta = e.deltaY;
    e.preventDefault();

    this.container.scrollLeft -= (e.deltaY + e.deltaX)*0.3;

    if(scroll >= this.state.studentsWidth+3) {
      this.container.scrollLeft = 1;
    }

    if(scroll == 0) {
      this.container.scrollLeft = this.state.studentsWidth+2
    }

    if (!(scroll == 1) && !(scroll == 0) ) {
      this.updateChildren();
    }

    this.setState({
      scroll: scroll,
    })
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

  updateChildrenOld = () => {
    for (let s = 0; s < this.students.length; s++) {
      if (this.state.scroll < 10 && s > this.length-1) {
        let offset = this.students[s-this.length].getOffset();
        this.students[s].setOffset(offset)
      } else if (this.state.scroll > this.state.studentsWidth-10 && s < this.length-1) {
        let offset = this.students[s+this.length].getOffset();
        this.students[s].setOffset(offset)
      }

      else {
        this.students[s].calcOffset();
      }
    }
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

      this.students[s] = obj;

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
                    debug={this.students[i].debug}
                    windowWidth={this.state.windowWidth}
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
                    debug={this.students[i+this.length].debug}
                    windowWidth={this.state.windowWidth}
                    scale={this.students[i+this.length].scale}
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
