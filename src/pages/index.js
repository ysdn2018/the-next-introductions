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

// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: 0,
      windowWidth: 1000,
      studentsWidth: 1000
    }


    this.length = props.data.allMarkdownRemark.edges.length;
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
      studentsWidth: this.studentsContainer.offsetWidth
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
      windowWidth: window.innerWidth
    })
  }

  updateChildren = () => {
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

  render() {
    let students = this.props.data.allMarkdownRemark.edges;
    return (
      <OuterContainer onClick={this.resetScroll}>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <Container innerRef={(container) => { this.container = container; }}>
          <InnerContainer onWheel={this.handleScroll}>

            <ImagesContainer innerRef={(studentsContainer) => { this.studentsContainer = studentsContainer; }}>
              {students.map( ({ node }, i) => {
                console.log(node.frontmatter);
                return (
                  <Student
                    key={node.id}
                    image={node.frontmatter.image.childImageSharp.resolutions}
                    name={node.frontmatter.title}
                    verb={node.frontmatter.verb}
                    noun={node.frontmatter.noun}
                    blurb={node.frontmatter.blurb}
                    windowWidth={this.state.windowWidth}
                    ref={el => this.students[i] = el }
                  />
                )
              })}
            </ImagesContainer>

            <ImagesContainer>
              {students.map(({ node }, i) => {
                return (
                  <Student
                    key={node.id}
                    image={node.frontmatter.image.childImageSharp.resolutions}
                    name={node.frontmatter.title}
                    verb={node.frontmatter.verb}
                    noun={node.frontmatter.noun}
                    blurb={node.frontmatter.blurb}
                    windowWidth={this.state.windowWidth}
                    ref={el => this.students[this.length + i] = el}
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
  query StudentQuery {
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
                resolutions(width: 400, height: 400) {
                  ...GatsbyImageSharpResolutions_withWebp_tracedSVG
                }
              }
            }
          }
  	    }
  	  }
  	}
  }
`;
