import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import Search from './components/Search/Search';
import AddRecipe from './components/Recipe/AddRecipe/AddRecipe';
import RecipePage from './components/Recipe/RecipePage/RecipePage';
import Profile from './components/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/recipe/add" component={AddRecipe} />
      <Route path="/recipes/:_id" component={RecipePage} />
      <Route path="/profile" component={Profile} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp}  />
      <Redirect to="/" />
    </Switch>
  );
};

export default App;