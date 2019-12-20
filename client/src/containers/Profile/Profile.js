import React from 'react';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../../hoc/withAuth';

const Profile = ({session}) => (
  <div>
    Profile
    <UserInfo session={session} />
    <UserRecipes username={session.getCurrentUser.username} />
  </div>
);

export default withAuth(session => session && session.getCurrentUser)(Profile);
