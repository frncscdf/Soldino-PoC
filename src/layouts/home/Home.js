import React, { Component } from 'react'
import Header from './Header'
import Features from './Features'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Header />
            <Features />
          </div>
        </div>
      </main>
    )
  }
}

export default Home
