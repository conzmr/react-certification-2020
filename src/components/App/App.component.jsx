import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/Home';
import LoginPage from '../../pages/Login';
import NotFound from '../../pages/NotFound';
import SecretPage from '../../pages/Secret';
import VideoDetail from '../../pages/VideoDetail';
import Private from '../Private';
import Layout from '../Layout';
import GlobalProvider from '../../state/GlobalProvider';

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Layout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/results">
              <HomePage />
            </Route>
            {/* <Route exact path="/login">
              <LoginPage />
            </Route> */}
            <Route exact path="/video/:id">
              <VideoDetail />
            </Route>
            <Private exact path="/secret">
              <SecretPage />
            </Private>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
        <LoginPage />
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
