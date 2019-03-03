import React from 'react'
import {VisibleOnlyGovernment, VisibleOnlyBusinessOwner, VisibleOnlyCitizen} from "../../util/wrappers";

const Dashboard = ({authData}) => {
    const OnlyCitizenData = VisibleOnlyCitizen(() =>
        <div>
          <p>Name: {authData.name}</p>
          <p>Surname: {authData.surname}</p>
          <p>Fiscal code: {authData.fiscalCode}</p>
          <p>E-mail: {authData.email}</p>
        </div>
    );

    const OnlyBusinessData = VisibleOnlyBusinessOwner(() =>
        <div>
          <p>Business name: {authData.businessName}</p>
          <p>Business location: {authData.location}</p>
          <p>VAT number: {authData.VATNumber}</p>
          <p>Certified e-mail: {authData.CE}</p>
        </div>
    );

    const OnlyGovernmentData = VisibleOnlyGovernment(() =>
        <div>
          <p>Logged as a government user</p>
        </div>
    );

    return(

      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <OnlyCitizenData />
            <OnlyBusinessData />
            <OnlyGovernmentData />
            <p>Balance: {authData.balance}</p>
          </div>
        </div>
      </main>
    )
  };

export default Dashboard
