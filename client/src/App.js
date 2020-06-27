import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar'
import Landing from './component/layout/Landing'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import Alert from './component/layout/Alert'
import Dashboard from './component/dashboard/dashboard'
import CreateProfile from './component/profile-form/CreateProfile'
import EditProfile from './component/profile-form/EditProfile'
import AddExperience from './component/profile-form/AddExperience'
import AddEducation from './component/profile-form/AddEducation'
import Profiles from './component/profiles/Profiles'
import Profile from './component/profile/profile'
import Posts from './component/posts/Posts'
import Post from './component/post/post'
import PrivateRoute from './component/routing/PrivateRoute'
import './App.css';
import { loadUser } from './actions/auth'
import setAuthToken from './utility/setAuthToken'
// Redux
import { Provider } from 'react-redux'
import store from './store' 

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App =()=> {

  useEffect(() =>{
    store.dispatch(loadUser());
  },[]);
  return (
<Provider store={store}>
  <Router>
  <Fragment>
    <Navbar/>
    <Route exact path="/" component={Landing}/>
    <section className="container">
      <Alert/>
      <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/createProfile" component={CreateProfile}/>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        <PrivateRoute exact path="/add-experience" component={AddExperience}/>
        <PrivateRoute exact path="/add-education" component={AddEducation}/>
        <Route path="/profiles" component={Profiles}/>
        <Route path="/profile/:id" component={Profile}/>
        <PrivateRoute exact path="/posts" component={Posts}/>
        <PrivateRoute exact path="/posts/:id" component={Post}/>
      </Switch>
    </section>
  </Fragment> 
  </Router>
  </Provider>
)}

export default App;
