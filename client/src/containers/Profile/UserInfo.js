import React from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';


const formatDate = (date) => {

  const dateAsInteger = parseInt(date);
  const formattedDate = moment.utc(dateAsInteger).format('lll');
  return formattedDate;

}

const UserInfo = ({ session }) => {

  // return (
  //   <div>
  //     <h3>User Info</h3>
  //     <p>Username: {session.getCurrentUser.username}</p>
  //     <p>Email: {session.getCurrentUser.email}</p>
  //     <p>Join Date: {joinDate.toString()}</p>
  //     <ul>
  //       <h3>{session.getCurrentUser.username}'s Favourites</h3>
  //       {session.getCurrentUser.favourites.map(recipe => {
  //         return <li key={recipe._id}>{recipe.name}</li>;
  //       })}
  //       {!session.getCurrentUser.favourites.length && (
  //         <p>You have no favourites currently. Go add some!</p>
  //       )}
  //     </ul>
  //   </div>
  // );


  return (
    <Card>
      <Card.Header>
        <h1>User information</h1>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> <strong>Username:</strong> <em>{session.getCurrentUser.username}</em></p>
          <p> <strong>Email:</strong> <em>{session.getCurrentUser.email}</em></p>
          <p> <strong>Join Date:</strong> <em>
            {formatDate(session.getCurrentUser.joinDate)}
          
          </em></p>
          <p> <strong>Favourite recipes:</strong></p>
          <ul>
            
            {session.getCurrentUser.favourites.map(recipe => {
              return <li key={recipe._id}>{recipe.name}</li>;
            })}
            {!session.getCurrentUser.favourites.length && (
              <p>You have no favourites currently. Go add some!</p>
            )}
          </ul>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
