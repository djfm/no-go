import React from 'react';
import Router, {Route, RouteHandler} from 'react-router';

import List from '../components/list';

require('../styles/main.styl');

var App = React.createClass({
    render () {
        return (
            <div>
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
  <Route handler={App}>
    <Route path="lists/:listId" handler={List}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
