import React from 'react';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';

import { getCities } from '../../store/reducers/weather';
import CityCard from '../CityCard/CityCard';

const CitiesList: React.FC = () => {
  const citiesMap = useSelector(getCities);

  return (
    <Grid container flexDirection='column' justifyContent='center' marginTop={5} spacing={2}>
      {Object.entries(citiesMap).map(([name, weather], index) => (
        <Grid item xs key={index}>
          <CityCard name={name} icon={weather.icon} temp={weather.temp} />
        </Grid>
      ))}
    </Grid>
  );
};
export default CitiesList;
