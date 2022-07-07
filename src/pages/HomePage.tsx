import React from 'react';

import Grid from '@mui/material/Grid';

import CitiesList from '../components/CitiesList/CitiesList';
import SearchCity from '../components/SearchCity/SearchCity';

export const HomePage: React.FC = () => {
  return (
    <Grid container flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>
      <Grid item width='70vw' maxHeight={'70vh'} sx={{ backgroundColor: '#ccc', padding: '40px', overflow: 'auto' }}>
        <SearchCity />
        <CitiesList />
      </Grid>
    </Grid>
  );
};
