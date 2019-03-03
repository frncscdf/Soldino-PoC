import React, { Component } from 'react'

class SignUpBusinessOwnerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businessName: '',
      location: '',
      VATNumber: '',
      CE: ''
    };

    this.onBusinessNameChange = this.onBusinessNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onVATNumberChange = this.onVATNumberChange.bind(this);
    this.onCEChange = this.onCEChange.bind(this);
  }

  onBusinessNameChange(event) {
    this.setState({ businessName: event.target.value })
  }

  onLocationChange(event) {
    this.setState({ location: event.target.value })
  }

  onVATNumberChange(event) {
    this.setState({ VATNumber: event.target.value })
  }

  onCEChange(event) {
    this.setState({ CE: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.businessName.length < 2)
    {
      return alert('Please fill in your business name.')
    }

    if (this.state.location.length < 2)
    {
      return alert('Please fill in your location.')
    }

    if (this.state.VATNumber.length < 2)
    {
      return alert('Please fill in your VAT number.')
    }

    if (this.state.CE.length < 2)
    {
      return alert('Please fill in your email.')
    }

    this.props.onSignUpBusinessOwnerFormSubmit(this.state.businessName, this.state.location, this.state.VATNumber, this.state.CE);
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="businessName">Business Name</label>
          <input id="businessName" type="text" value={this.state.businessName} onChange={this.onBusinessNameChange} placeholder="Business Name" />
          <label htmlFor="location">Location</label>
          <input id="location" type="text" value={this.state.location} onChange={this.onLocationChange} placeholder="Location" />
          <label htmlFor="VATNumber">VAT Number</label>
          <input id="VATNumber" type="text" value={this.state.VATNumber} onChange={this.onVATNumberChange} placeholder="VAT Number" />
          <label htmlFor="CE">Certified E-mail</label>
          <input id="CE" type="email" value={this.state.CE} onChange={this.onCEChange} placeholder="Certified E-Mail" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpBusinessOwnerForm
