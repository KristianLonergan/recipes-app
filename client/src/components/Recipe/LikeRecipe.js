import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Button from 'react-bootstrap/Button';
import withSession from '../../hoc/withSession';
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from '../../queries/';

const LikeRecipe = props => {

  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState();

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    update(cache, { data: { likeRecipe } }) {

      const { _id } = props;
      const { getRecipe } = cache.readQuery({
        query: GET_RECIPE,
        variables: { _id }
      });

      cache.writeQuery({
        query: GET_RECIPE,
        variables: { _id },
        data: {
          getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
        }
      });
    }
  });

  const [unlikeRecipe] = useMutation(UNLIKE_RECIPE, {
    update(cache, { data: { unlikeRecipe } }) {

      const { _id } = props;
      const { getRecipe } = cache.readQuery({
        query: GET_RECIPE,
        variables: { _id }
      });

      cache.writeQuery({
        query: GET_RECIPE,
        variables: { _id },
        data: {
          getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
        }
      });
    }
  });

  useEffect(() => {
    if (props.session.getCurrentUser) {
      const { username, favourites } = props.session.getCurrentUser;
      const { _id } = props;
      const prevLiked =
        favourites.findIndex(favourite => favourite._id === _id) > -1;

      setLiked(prevLiked);
      setUser(username);
    }
  }, [props]);

  const likeHandler = () => {
    if (!liked) {
      likeRecipe({
        variables: {
          _id: props._id,
          username: user
        }
      }).then(async ({ data }) => {
        setLiked(!liked);
        await props.refetch();
      });
    } else {
      unlikeRecipe({
        variables: {
          _id: props._id,
          username: user
        }
      }).then(async ({ data }) => {
        setLiked(!liked);
        await props.refetch();
      });

    }
  };

  return (
    props.session.getCurrentUser && (
      <Button variant="primary" onClick={likeHandler}>
        {liked ? 'Unlike' : 'Like'}
      </Button>
    )
  );
};

export default withSession(LikeRecipe);
