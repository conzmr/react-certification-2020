import React from 'react';
import HomePage from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import Favorites from '../../pages/Favorites';
import VideoDetail from '../../pages/VideoDetail';
import Private from '../Private';
import Layout from '../Layout';
import GlobalProvider from '../../state/GlobalProvider';
import { Switch, Route} from 'react-router-dom';

function App() {
  return (
      <GlobalProvider>
        <Layout>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/results">
              <HomePage />
            </Route>
            <Route exact path="/video/:id">
              <VideoDetail />
            </Route>
            <Private exact path="/favorites/:id">
              <VideoDetail />
            </Private>
            <Private exact path="/favorites">
              <Favorites />
            </Private>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </GlobalProvider>
  );
}

export default App;
