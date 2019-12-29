import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = lazy(() => import('./components/Home/Home'));
const SignIn = lazy(() => import('./components/Auth/SignIn/SignIn'));
const SignUp = lazy(() => import('./components/Auth/SignUp/SignUp'));
const Search = lazy(() => import('./components/Search/Search'));
const AddRecipe = lazy(() => import('./components/Recipe/AddRecipe/AddRecipe'));
const RecipePage = lazy(() => import('./components/Recipe/RecipePage/RecipePage'));
const Profile = lazy(() => import('./components/Profile/Profile'));

const App = props => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/recipe/add" component={AddRecipe} />
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile" component={Profile} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default App;
