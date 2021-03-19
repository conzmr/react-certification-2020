import React from "react";
import styled from "styled-components";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const IconContainer = styled.div`
    padding: 0 6px;
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledInput = styled(InputBase)`
  width: 100%;
  margin-left: 40px;
  color: white;
`;

const SearchContainer = styled.div`
    width: 100%;
    max-width: 500px;
    position: relative;
    border-radius: 6px;
    background-color: #121212; 
    border: 1px solid #303030;
    margin: 0 5px;
`;

function SearchBar() {
  return (
    <SearchContainer>
    <IconContainer>
      <SearchIcon />
    </IconContainer>
    <StyledInput
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
    />
  </SearchContainer>
  );
}

export default SearchBar;