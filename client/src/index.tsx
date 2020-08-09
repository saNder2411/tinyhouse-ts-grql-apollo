import React, { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// Components
import { Home, Host, Listing, Listings, NotFound, User } from './sections';
// Styles
import './styles/index.css';
// Other
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({ uri: '/api' });

const App: FC = (): JSX.Element => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/host/">
        <Host />
      </Route>
      <Route exact path="/listing/:id/">
        <Listing />
      </Route>
      <Route exact path="/listings/:location?/">
        <Listings />
      </Route>
      <Route exact path="/user/:id/">
        <User />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
