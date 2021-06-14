import React, { Fragment, useEffect } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import ReactGa from 'react-ga';
//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import AddBus from './components/bus-form/AddBus';
import AllBuses from './components/dashboard/AllBuses';
import EditBus from './components/bus-form/EditBus';
import Ticket from './components/bus/Ticket';
import MyBookings from './components/bookings/MyBookings';
// import { getProjectById } from './actions/project';
import Project from './components/project/Project';
import Blog from './components/blog/Blog';
if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        ReactGa.initialize('UA-199468567-1');
        ReactGa.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    {/* <Navbar /> */}
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            {/* <Route
                                exact
                                path='/projects'
                                component={Projects}
                            /> */}
                            {/* <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} /> */}
                            {/* <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/my-bookings'
                                component={MyBookings}
                            />
                            <PrivateRoute
                                exact
                                path='/edit/:id'
                                component={EditBus}
                            /> */}
                            <Route
                                exact
                                path='/public/project/:id'
                                component={Project}
                            />
                            <Route
                                exact
                                path='/public/blog/:id'
                                component={Blog}
                            />
                            {/* <PrivateRoute
                                exact
                                path='/ticket'
                                component={Ticket}
                            />
                            <AdminRoute
                                exact
                                path='/add-bus'
                                component={AddBus}
                            />
                            <AdminRoute
                                exact
                                path='/allBuses'
                                component={AllBuses}
                            /> */}
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
