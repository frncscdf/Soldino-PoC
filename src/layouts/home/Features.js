import React, { Component } from 'react';

class Features extends Component {

    render() {
        return (
            <div>
                <h2>Features available in this prototype:</h2>
                <div className="features-list">
                    <ul>
                        <li>
                            Citizen registration
                        </li>
                        <li>
                            Business owner registration
                        </li>
                        <li>
                            Login
                        </li>
                        <li>
                            Logout
                        </li>
                        <li>
                            Cubit minting
                        </li>
                        <li>
                            Cubit distribution
                        </li>
                        <li>
                            Data visualization
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Features;