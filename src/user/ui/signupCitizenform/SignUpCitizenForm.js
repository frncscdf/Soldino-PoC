import React, { Component } from 'react'

class SignUpCitizenForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      surname: '',
      fiscalCode: '',
      email: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSurnameChange = this.onSurnameChange.bind(this);
    this.onFiscalCodeChange = this.onFiscalCodeChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  onNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onSurnameChange(event) {
    this.setState({ surname: event.target.value })
  }

  onFiscalCodeChange(event) {
    this.setState({ fiscalCode: event.target.value })
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    if (this.state.surname.length < 2)
    {
      return alert('Please fill in your surname.')
    }

    if (this.state.fiscalCode.length < 2)
    {
      return alert('Please fill in your fiscal code.')
    }

    if (this.state.email.length < 2)
    {
      return alert('Please fill in your email.')
    }

    this.props.onSignUpCitizenFormSubmit(this.state.name, this.state.surname, this.state.fiscalCode, this.state.email);
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Name" />
          <label htmlFor="surname">Surname</label>
          <input id="surname" type="text" value={this.state.surname} onChange={this.onSurnameChange} placeholder="Surname" />
          <label htmlFor="fiscalCode">Fiscal code</label>
          <input id="fiscalCode" type="text" value={this.state.fiscalCode} onChange={this.onFiscalCodeChange} placeholder="Fiscal code" />
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={this.state.email} onChange={this.onEmailChange} placeholder="E-Mail" />

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

export default SignUpCitizenForm
