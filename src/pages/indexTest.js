import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Script from "react-load-script";
import Student from '../components/Student'
import {TimelineMax, TweenLite} from 'gsap';

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

const FakeStudent = styled.div`
  width: 400px;
  height: 100vh;
  margin-right: 20px;
  background-color: grey;
  border: 1px solid black;
  transform-origin: top right;
`

const StudentsContainer = styled.div`
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

    this.length = this.props.data.allMarkdownRemark.edges.length;
    this.students = new Array(this.length*2).fill({});
    this.requestId = null;

    this.tl = new TimelineMax({
      paused: true,
      // onUpdate: this.update
    });
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


    this.scroller = {
      container: this.innerContainer,
      viewportHeight: window.innerHeight,
      stepHeight: Math.max(window.innerHeight, 2500),
      scrollHeight: 0,
      padding: 400,
      steps: [],
      step: 0,
      y: 0
    };

    TweenLite.defaultEase = Linear.easeNone;

    TweenLite.set(this.container, {
      height: this.scroller.scrollHeight + this.scroller.viewportHeight
    });

    TweenLite.set(this.scroller.container, {
      height: this.scroller.scrollHeight,
      force3D: true
    });

    this.initChildren();
  }

  update = () => {
    let scroll = this.container.scrollTop;

    this.scroller.y = scroll;
    this.requestId = null;
    this.tl.time(scroll);
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

  addChild = (element, size, padding, index) => {
    var step = {
      height: element.clientHeight,
      size: size,
      pad: padding,
      progress: 0
    };

    if (index > 0 ) {

      var last = this.scroller.steps[index - 1];

      this.tl.set(this.scroller, { step: index - 1 }, this.scroller.scrollHeight)
        .to(this.scroller.container, last.height, { y: "-=" + last.height }, this.scroller.scrollHeight);
    }

    this.tl.set(this.scroller, { step: index }, this.scroller.scrollHeight)
      .to(step, size, { progress: 1 }, this.scroller.scrollHeight)

    this.scroller.scrollHeight += (size + padding);
    this.scroller.steps.push(step);
  }

  render() {
    let studentsData = this.props.data.allMarkdownRemark.edges;
    console.log(this.students);
    return (
      <OuterContainer onWheel={this.handleScroll}>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <Container innerRef={(container) => { this.container = container; }}>
          <InnerContainer innerRef={(innerContainer) => { this.innerContainer = innerContainer; }}>

            <StudentsContainer innerRef={(studentsContainer) => { this.studentsContainer = studentsContainer; }}>
              {this.students.map( ({ node }, i) => (
                <FakeStudent key={i} innerRef={el => this.students[i] = el}>
                  <h1>hi</h1>
                </FakeStudent>
              ))}
            </StudentsContainer>

          </InnerContainer>
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
