/* eslint-disable react/jsx-props-no-spreading */
import React, { lazy } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import ListUserOnlineComponent from './components/ListUserOnlineComponent';
import TopBarAppComponent from './components/TopBarAppComponent';

const AdminPageComponent = lazy(() => import('./components/AdminPageComponent'));
const UsersPageComponent = lazy(() => import('./components/UsersPageComponent'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));

const withListUsers = WrappedComponent => props => {
  return (
    <Grid
      container
      style={{
        height: '90%'
      }}
    >
      <Grid item xs={12} md={9} style={{ height: '100%' }}>
        <WrappedComponent {...props} />
      </Grid>
      <ListUserOnlineComponent />
    </Grid>
  );
};

function RoutersCommponent() {
  return (
    <BrowserRouter>
      <TopBarAppComponent />
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/user" />} />
        <Route exact path="/admin" component={withListUsers(AdminPageComponent)} />
        <Route exact path="/user" component={withListUsers(UsersPageComponent)} />
        <Route exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default RoutersCommponent;
