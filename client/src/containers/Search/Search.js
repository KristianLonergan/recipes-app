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
    <div className="container pt-md-5">
        <h1 className="pb-md-5" style={{ textAlign: 'center' }}>Search for Recipes</h1>
        <FormControl
          placeholder="Search recipes"
          aria-label="Search recipes"
          onChange={onChangeHandler}
        />
      {searchResults.map(recipe => <SearchItem key={recipe._id} {...recipe} />)}
      {searchResults.length === 0 && <p style={{ textAlign: 'center' }}>No results found</p>}
    </div>
  );
};

export default Search;
