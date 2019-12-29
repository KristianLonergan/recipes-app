import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import RecipeItemList from '../Recipe/RecipeItemList/RecipeItemList';
import Heading from '../UI/Heading/Heading';
import { SEARCH_RECIPES } from '../../queries';

const Search = props => {
  const client = useApolloClient();
  const [searchResults, setSearchResults] = useState([]);
  const [touched, setTouched] = useState(false);

  const onChangeHandler = async event => {
    event.persist();

    const { data } = await client.query({
      query: SEARCH_RECIPES,
      variables: {
        searchTerm: event.target.value
      }
    });

    setSearchResults(data.searchRecipes);
    if (!touched) return setTouched(true);
  };

  return (
    <Container className="pt-md-5">
      <Heading label="Search for Recipes" namespaces="pb-md-5" />
      <FormControl
        placeholder="Search recipes"
        aria-label="Search recipes"
        onChange={onChangeHandler}
      />

      <RecipeItemList recipes={searchResults} />

      {touched && searchResults.length === 0 && (
          <p className="text-center mt-5">No results found</p>
      )}
    </Container>
  );
};

export default Search;
