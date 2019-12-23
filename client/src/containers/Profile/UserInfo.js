import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import styles from './Profile.module.css';

const formatDate = date => {
  const dateAsInteger = parseInt(date);
  const formattedDate = moment.utc(dateAsInteger).format('lll');
  return formattedDate;
};

const UserInfo = ({ session }) => {
  return (
    <Card>
      <Card.Header>
        <h1>User information</h1>
      </Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            <strong>Username:</strong>{' '}
            <em>{session.getCurrentUser.username}</em>
          </p>
          <p>
            {' '}
            <strong>Email:</strong> <em>{session.getCurrentUser.email}</em>
          </p>
          <p>
            {' '}
            <strong>Join Date:</strong>{' '}
            <em>{formatDate(session.getCurrentUser.joinDate)}</em>
          </p>
          <p>
            {' '}
            <strong>Favourite recipes:</strong>
          </p>
          <ul className={styles.Favourites}>
            {session.getCurrentUser.favourites.map(recipe => {
              return (
                <li key={recipe._id}>
                  <Link to={`/recipes/${recipe._id}`}>
                    <h4>{recipe.name}</h4>
                  </Link>
                </li>
              );
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
