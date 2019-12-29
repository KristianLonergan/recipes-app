import React from 'react';
import UserInfo from './UserInfo/UserInfo';
import UserRecipes from './UserRecipes/UserRecipes';
import withAuth from '../../hoc/withAuth';

const Profile = () => (
  <div className="container pt-md-5">
    <UserInfo />
    <UserRecipes />
  </div>
);

export default withAuth(Profile);
