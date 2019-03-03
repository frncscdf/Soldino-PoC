import React, { Component } from 'react'
import OperationsFormContainer from '../../ui/operationsform/OperationsFormContainer'

class Operations extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Mint</h1>
            <p>Mint cubits here.</p>
            <OperationsFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Operations
