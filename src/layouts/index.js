import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'

import RobotoMonoRegular from "../assets/fonts/RobotoMono-Regular.woff"
import RobotoMonoRegular2 from "../assets/fonts/RobotoMono-Regular.woff2"

const Header = () => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Gatsby
        </Link>
      </h1>
    </div>
  </div>
)

const TemplateWrapper = ({ children }) => (
  <Container>
    <Helmet
      title="the-next-base"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />

    <Header />

    <div>
      {children()}
    </div>
  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper


injectGlobal`
  *, *:before, *:after {
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
  }

  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
      margin: 0;
      height: 100%;
      font-size: 1.6em;
      line-height: 1.6;
      font-weight: 400;
      font-family: 'Roboto Mono', monospace;
      color: #222;
      webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'Roboto Mono';
    src: url(${RobotoMonoRegular}) format('woff2'),
      url(${RobotoMonoRegular2}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
`
