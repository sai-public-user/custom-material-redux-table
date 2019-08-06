import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../components/Home/index';
import PageNotFound from '../components/PageNotFound/index';
import CallTable from '../components/table';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/table" component={CallTable} />
        <Route exact path="/*" component={PageNotFound} />
	</Switch>
);

export default Routes;
