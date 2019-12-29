import React, { useContext } from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { SessionContext } from '../../../context/session';
import FavouritesList from '../FavouritesList/FavouritesList';

const formatDate = date => {
  const dateAsInteger = parseInt(date);
  const formattedDate = moment.utc(dateAsInteger).format('lll');
  return formattedDate;
};

const UserInfo = () => {

  const { currentUser } = useContext(SessionContext);

  return (
    <Card>
      <Card.Header>
        <h1>User information</h1>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            <strong>Username:</strong>{' '}
            <em>{currentUser.username}</em>
          </p>
          <p>
            <strong>Email:</strong> <em>{currentUser.email}</em>
          </p>
          <p>
            <strong>Join Date:</strong>{' '}
            <em>{formatDate(currentUser.joinDate)}</em>
          </p>
          <p>
            <strong>Favourite recipes:</strong>
          </p>
          <FavouritesList favourites={currentUser.favourites} />
         
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
