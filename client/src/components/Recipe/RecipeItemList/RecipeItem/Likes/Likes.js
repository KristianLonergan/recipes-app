import React from 'react';
import classes from './Likes.module.css';

const Likes = ({ numOfLikes }) => (
  <h4 className={classes.Likes}>
    {numOfLikes}
    <span role="img" aria-label="heart">
      ❤️
    </span>
  </h4>
);

export default Likes;