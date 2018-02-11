import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Script from "react-load-script";
import Student from '../components/Student'
import { TimelineMax, TweenLite } from 'gsap';
import Img from 'gatsby-image'

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


// page component
export default class SecondPage extends React.Component {
  constructor(props) {
    super(props);

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
    this.students = new Array(this.length).fill({});
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


    this.scroller.scrollHeight = this.scroller.stepHeight/2;


    this.tl = new TimelineMax({
      paused: true,
      onUpdate: this.update
    });

    this.requestId = null;

    TweenLite.defaultEase = Linear.easeNone;

    this.initChildren();

    TweenLite.set(document.body, {
      height: this.scroller.scrollHeight + this.scroller.viewportHeight
    });

    TweenLite.set(this.scroller.container, {
      height: this.scroller.scrollHeight,
      force3D: true
    });

    // this.tl.progress(0.5);
  }

  update = () => {
    let scroll = window.pageYOffset;

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

  componentWillReceiveProps(nextProps) {
    console.log((nextProps));
  }



  addChild = (element, size, padding, index) => {
    var step = {
      height: element.clientHeight,
      size: size,
      pad: padding,
      progress: 0
    };

    let easing = Power1.easeInOut;

    if (index > 0 ) {
      var last = this.scroller.steps[index - 1];

      this.tl.set(this.scroller, { step: index - 1 }, this.scroller.scrollHeight)
        .to(this.scroller.container, last.height, { y: "-=" + last.height, ease: easing }, this.scroller.scrollHeight);
    }

    TweenLite.set(element.firstChild, {scale: 0.05, x: -(this.scroller.viewportWidth/3+this.scroller.vmin*0.08) });

    this.tl.set(element.firstChild, { scale: 0.1, x: -(this.scroller.viewportWidth/3+this.scroller.vmin*0.08), top: 0 }, this.scroller.scrollHeight-size*2 )
    .to(element.firstChild, size/2, { scale: 1, x: 0, ease: easing, className: "+=hide" }, this.scroller.scrollHeight-size-padding)
    .to(element.firstChild, size/2, { scale: 0.1, x: this.scroller.viewportWidth/3+this.scroller.vmin*0.08,  ease: easing, className: "-=hide" }, this.scroller.scrollHeight)


    this.tl.set(this.scroller, { step: index }, this.scroller.scrollHeight)
            .to(step, size, { progress: 1, ease: easing  }, this.scroller.scrollHeight)

    this.scroller.scrollHeight += (size + padding);
    this.scroller.steps.push(step);
  }

  handleClick = () => {
    console.log(window.pageYOffset);
  }

  render() {
    let studentsData = this.props.data.allMarkdownRemark.edges;
    console.log(studentsData.length);
    console.log(this.students.length);


    return (
      <OuterContainer onClick={this.handleClick} innerRef={(container) => { this.container = container; }} >
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />

        <Container>
          <Viewport innerRef={(viewport) => { this.viewport = viewport; }}>


            <Content innerRef={(content) => { this.content = content; }}>
              {studentsData.map( ({ node }, i) => (
                <React.Fragment>
                {/* <FakeStudent key={i} innerRef={el => this.students[i] = el}>
                  <FakeImage sizes={node.frontmatter.image.childImageSharp.sizes} position="absolute"/>
                </FakeStudent> */}

                  {console.log(node.frontmatter.title)}

                  <Student
                    key={node.id}
                    image={node.frontmatter.image.childImageSharp.sizes}
                    verb={node.frontmatter.verb}
                    noun={node.frontmatter.noun}
                    studentRef={el => this.students[i] = el}
                  />
                </React.Fragment>
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
                sizes(maxWidth: 1000) {
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
