import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import { routerActions } from 'react-router-redux'

// Layout Component Wrappers

export const UserIsAuthenticated = connectedAuthWrapper({
  redirectPath: '/login',
  authenticatedSelector: state => state.user.data !== null,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});

export const UserIsCitizen = connectedAuthWrapper({
  redirectPath: '/login',
  authenticatedSelector: state => state.user.type === '1',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsCitizen'
});

export const UserIsBusinessOwner = connectedAuthWrapper({
  redirectPath: '/login',
  authenticatedSelector: state => state.user.type === '2',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsCitizen'
});

export const UserIsGovernment = connectedAuthWrapper({
  redirectPath: '/login',
  authenticatedSelector: state => state.user.type === '3',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsCitizen'
});

export const UserIsNotAuthenticated = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.data === null,
  redirectAction: routerActions.replace,
  redirectPath: (state, ownProps) => ownProps.location.query.redirect || '/dashboard',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false
});

// UI Component Wrappers

export const VisibleOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.data !== null,
  wrapperDisplayName: 'VisibleOnlyAuth'
});

export const VisibleOnlyCitizen = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === '1',
  wrapperDisplayName: 'VisibleOnlyCitizen'
});

export const VisibleOnlyBusinessOwner = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === '2',
  wrapperDisplayName: 'VisibleOnlyBusinessOwner'
});

export const VisibleOnlyGovernment = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.type === '3',
  wrapperDisplayName: 'VisibleOnlyGovernment'
});

export const HiddenOnlyAuth = connectedAuthWrapper({
  authenticatedSelector: state => state.user && state.user.data === null,
  wrapperDisplayName: 'HiddenOnlyAuth'
});
