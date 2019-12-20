import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import FormControl from 'react-bootstrap/FormControl';
import SearchItem from './SearchItem';
import { SEARCH_RECIPES } from '../../queries/';

const Search = props => {

  const client = useApolloClient();
  const [searchResults, setSearchResults] = useState([]);

  const onChangeHandler = async (event) => {

    event.persist();

    const { data } = await client.query({
      query: SEARCH_RECIPES,
      variables: {
        searchTerm: event.target.value
      }
    });

    setSearchResults(data.searchRecipes);
  }

  return (
    <div className="container">
        <h2>Recipes</h2>
        <FormControl
          placeholder="Search recipes"
          aria-label="Search recipes"
          onChange={onChangeHandler}
        />
      {searchResults.map(recipe => <SearchItem key={recipe._id} {...recipe} />)}
    </div>
  );
};

export default Search;
