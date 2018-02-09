import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Script from "react-load-script";
import Student from '../components/Student'
import {TimelineMax, TweenLite} from 'gsap';

const OuterContainer = styled.div`
  height: 100%;
  width: calc(100% + 15px);
  margin-right: -15px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Container = styled.div`

`

const Viewport = styled.div`
  position: fixed;
  padding-bottom: 15px !important;
  height: 100%;
  width: 50%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const FakeStudent = styled.div`
  width: 100%;
  height: 100vh;
  margin-right: 20px;
  background-color: grey;
  transform-origin: top right;
  overflow: hidden;
`

const FakeProject = styled.div`
  transform-origin: 0;
  background-color: pink;
  height: 70vmin;
  width: 70vmin;
`

const Content = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`

const TestBox = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 200px;
  width: 200px;
  background-color: red;
  z-index: 2;
`



// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

    this.scroller = {
      container: null,
      viewportHeight: 1000,
      stepHeight: 1000,
      scrollHeight: 0,
      padding: 400,
      steps: [],
      step: 0,
      y: 0
    };

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
    this.setup()
  }

  setup = () => {
    this.scroller = {
      container: this.content,
      viewportHeight: window.innerHeight,
      stepHeight: Math.max(window.innerHeight, 2500),
      scrollHeight: 0,
      padding: 400,
      steps: [],
      step: 0,
      y: 0
    };

    this.tl = new TimelineMax({
      paused: true,
      onUpdate: this.update
    });

    this.requestId = null;

    TweenLite.defaultEase = Linear.easeNone;

    this.initChildren();

    TweenLite.set(this.container.firstChild, {
      height: this.scroller.scrollHeight + this.scroller.viewportHeight
    });

    TweenLite.set(this.scroller.container, {
      height: this.scroller.scrollHeight,
      force3D: true
    });
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

      this.tl.from(this.box, last.height, { scale: 0 }, this.scroller.scrollHeight)
        .to(this.box, last.height, { scale: 3 }, this.scroller.scrollHeight);
    }

    this.tl.set(this.scroller, { step: index }, this.scroller.scrollHeight)
      .to(step, size, { progress: 1 }, this.scroller.scrollHeight)


    this.scroller.scrollHeight += (size + padding);
    this.scroller.steps.push(step);
  }

  handleClick = () => {
    console.log(this.tl);
  }

  render() {
    let studentsData = this.props.data.allMarkdownRemark.edges;
    return (
      <OuterContainer onClick={this.handleClick} innerRef={(container) => { this.container = container; }} >
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <Container onWheel={this.handleScroll}  >
          <Viewport innerRef={(viewport) => { this.viewport = viewport; }}>
            <TestBox innerRef={(box) => { this.box = box; }}/>


            <Content innerRef={(content) => { this.content = content; }}>

              {this.students.map( ({ node }, i) => (
                <FakeStudent key={i} innerRef={el => this.students[i] = el}>
                  <FakeProject>

                  </FakeProject>
                </FakeStudent>
              ))}
            </Content>

          </Viewport>
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
