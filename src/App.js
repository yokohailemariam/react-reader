import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import { ReactReader } from './modules'
import { Container, ReaderContainer } from './Components'

const storage = global.localStorage || null

const DEMO_URL =
  'https://firebasestorage.googleapis.com/v0/b/safaricom-41234.appspot.com/o/new%20doc.epub?alt=media&token=c02d2fa6-436a-4c50-9415-811b067a1e65'
const DEMO_NAME = 'Alice in wonderland.'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-weight: 300;
    line-height: 1.4;
    word-break: break-word;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-size: 1.8rem;
    background: #333;
    position: absolute;
    height: 100%;
    width: 100%;
    color: #fff;
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullscreen: true,
      location:
        storage && storage.getItem('epub-location')
          ? storage.getItem('epub-location')
          : 2,
      localFile: null,
      localName: null,
      largeText: false,
      epubUrl: ''
    }
    this.rendition = null
  }

  //   componentDidMount() {
  //     const fetchEpub = async () => {
  //       const response = await fetch(
  //         'https://www.gutenberg.org/ebooks/11.epub.images'
  //       )
  //       const blob = await response.blob()
  //       const epubUrl = URL.createObjectURL(blob)
  //       this.setState({ epubUrl })
  //     }
  //     fetchEpub()
  //   }

  toggleFullscreen = () => {
    this.setState(
      {
        fullscreen: !this.state.fullscreen
      },
      () => {
        setTimeout(() => {
          this.rendition.resize()
        }, 500)
      }
    )
  }

  onLocationChanged = location => {
    this.setState(
      {
        location
      },
      () => {
        storage && storage.setItem('epub-location', location)
      }
    )
  }

  onToggleFontSize = () => {
    const nextState = !this.state.largeText
    this.setState(
      {
        largeText: nextState
      },
      () => {
        this.rendition.themes.fontSize(nextState ? '140%' : '100%')
      }
    )
  }

  getRendition = rendition => {
    // Set inital font-size, and add a pointer to rendition for later updates
    const { largeText } = this.state
    this.rendition = rendition
    rendition.themes.fontSize(largeText ? '140%' : '100%')
  }
  render() {
    const { fullscreen, location, localFile, localName, epubUrl } = this.state
    return (
      <Container>
        <ReaderContainer fullscreen={fullscreen}>
          <ReactReader
            url={DEMO_URL}
            title={localName || DEMO_NAME}
            location={location}
            locationChanged={this.onLocationChanged}
            getRendition={this.getRendition}
          />
          {/* <FontSizeButton onClick={this.onToggleFontSize}>
            Toggle font-size
          </FontSizeButton> */}
        </ReaderContainer>
      </Container>
    )
  }
}

export default App
