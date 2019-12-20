import React from 'react';

const UserInfo = ({ session }) => {

  const joinDate = new Date(parseInt(session.getCurrentUser.joinDate));

  return (
    <div>
      <h3>User Info</h3>
      <p>Username: {session.getCurrentUser.username}</p>
      <p>Email: {session.getCurrentUser.email}</p>
      <p>Join Date: {joinDate.toString()}</p>
      <ul>
        <h3>{session.getCurrentUser.username}'s Favourites</h3>
        {session.getCurrentUser.favourites.map(recipe => {
          return (<li key={recipe._id}>
            {recipe.name}
          </li>);
        })}
        {!session.getCurrentUser.favourites.length && <p>You have no favourites currently. Go add some!</p>}
      </ul>
    </div>
  );
};

export default UserInfo;
