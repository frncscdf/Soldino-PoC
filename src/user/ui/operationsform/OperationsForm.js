import React, { Component } from 'react'

class OperationsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amountMint: 0,
      amountDist: 0
    }
  }

  onMintChange(event) {
    this.setState({ amountMint: event.target.value })
  }

  onDistributeChange(event) {
    this.setState({ amountDist: event.target.value })
  }

  handleSubmitMint(event) {
    event.preventDefault();
    this.props.onMintFormSubmit(this.state.amountMint)
  }

  handleSubmitDistribute(event) {
    event.preventDefault();
    this.props.onDistributeFormSubmit(this.state.amountDist)
  }

  render() {
    return(
      <div>
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmitMint.bind(this)}>
          <fieldset>
            <label htmlFor="mint">Mint cubit</label>
            <input id="mint" type="text" value={this.state.amountMint} onChange={this.onMintChange.bind(this)} placeholder="Mint" />
            <button type="submit" className="pure-button pure-button-primary">Mint</button>
          </fieldset>
        </form>
        <br />
        <hr />
        <br />
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmitDistribute.bind(this)}>
          <fieldset>
            <label htmlFor="distribute">Distribute cubit to all registered users</label>
            <input id="distribute" type="text" value={this.state.amountDist} onChange={this.onDistributeChange.bind(this)} placeholder="distribute" />
            <button type="submit" className="pure-button pure-button-primary">Ditrubute</button>
          </fieldset>
        </form>
      </div>

    )
  }
}

export default OperationsForm
