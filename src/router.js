import React, {PropTypes} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import APP from './components/App';
import Main from './components/Main'

 class Router extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/main' component={Main}/>
          <Route path='/' component={APP}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
