import React, { useState, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SessionContext } from '../../../context/session';
import Button from 'react-bootstrap/Button';
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from '../../../queries';

const LikeRecipe = ({ _id }) => {
  const [user, setUser] = useState();
  const [liked, setLiked] = useState(false);
  const { currentUser, refetch } = useContext(SessionContext);

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    update(cache, { data: { likeRecipe } }) {
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

    const { username, favourites } = currentUser;

    if (username) {    
      const prevLiked = favourites.findIndex(favourite => favourite._id === _id) > -1;
      setLiked(prevLiked);
      setUser(username);
    }
  }, [currentUser, _id]);

  const likeHandler = () => {
    if (!liked) {
      likeRecipeHandler();
    } else {
      unlikeRecipeHandler();
    }
  };

  const likeRecipeHandler = () => {
    likeRecipe({
      variables: {
        _id,
        username: user
      }
    }).then(() => setLikedAndRefetch());
  };

  const unlikeRecipeHandler = () => {
    unlikeRecipe({
      variables: {
        _id,
        username: user
      }
    }).then(() => setLikedAndRefetch());
  };

  const setLikedAndRefetch = async () => {
    setLiked(!liked);
    await refetch();
  };

  return (
    currentUser && (
      <div className="my-2">
        <Button variant="danger" onClick={likeHandler} block>
          {liked ? 'Unlike' : 'Like'}
        </Button>
      </div>
    )
  );
};

export default LikeRecipe;
