import React, { Dispatch, useState } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { fetchCurrentWeather } from '../../store/actions/weather';

const SearchCity: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchCurrentWeather(searchQuery));
  };

  return (
    <Grid container>
      <form onSubmit={handleSubmit} style={{ width: '100%', border: '0' }}>
        <Grid container justifyContent='space-between'>
          <TextField
            value={searchQuery}
            id='search-bar'
            className='text'
            onInput={(e) => {
              setSearchQuery((e.target as HTMLInputElement).value);
            }}
            InputProps={{
              endAdornment: searchQuery && (
                <IconButton onClick={() => setSearchQuery('')}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
            label='Enter a city name'
            variant='outlined'
            placeholder='Search...'
            size='small'
            sx={{ width: '90%' }}
          />
          <IconButton type='submit' aria-label='search'>
            <SearchIcon style={{ fill: 'blue' }} />
          </IconButton>
        </Grid>
      </form>
    </Grid>
  );
};
export default SearchCity;
