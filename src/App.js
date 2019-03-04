import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyGovernment, VisibleOnlyCitizen, VisibleOnlyBusinessOwner,VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.scss'
import './App.scss'

class App extends Component {
  render() {

      const OnlyGovernmentLinks = VisibleOnlyGovernment(() =>
        <span>
          <li className="pure-menu-item">
            <Link to="/operations" className="pure-menu-link">Operations</Link>
          </li>
        </span>
      );

      const OnlyAuthLinks = VisibleOnlyAuth(() =>
        <span>
          <li className="pure-menu-item">
            <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
          </li>
          <LogoutButtonContainer />
        </span>
      );

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/signup" className="pure-menu-link">Sign Up</Link>
        </li>
        <LoginButtonContainer />
      </span>
    );

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyGovernmentLinks />
            <OnlyAuthLinks />
          </ul>
          <Link to="/" className="pure-menu-heading pure-menu-link">Soldino</Link>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
