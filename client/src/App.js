import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home/Home';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import Search from './containers/Search/Search';
import AddRecipe from './containers/Recipe/AddRecipe';
import RecipePage from './components/Recipe/RecipePage';
import Profile from './containers/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/recipe/add" render={() => <AddRecipe session={props.session} />} />
      <Route path="/recipes/:_id" component={RecipePage} />
      <Route path="/profile" render={() => <Profile session={props.session} />} />
      <Route path="/signin" render={() => <SignIn refetch={props.refetch} />} />
      <Route path="/signup" render={() => <SignUp refetch={props.refetch} />} />
      <Redirect to="/" />
    </Switch>
  );
};
// const App = props => {
//   return (
//     <Switch>
//       <Route path="/" exact component={Home} />
//       <Route path="/search" component={Search} />
//       <Route path="/recipe/add" component={AddRecipe} />
//       <Route path="/recipes/:_id" component={RecipePage} />
//       <Route path="/profile" component={Profile} />
//       <Route path="/signin" render={() => <SignIn refetch={props.refetch} />} />
//       <Route path="/signup" render={() => <SignUp refetch={props.refetch} />} />
//       <Redirect to="/" />
//     </Switch>
//   );
// };

export default App;
