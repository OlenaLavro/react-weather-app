import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICityWeatherInfo } from '../interfaces';

import { getWeatherInfoByCity } from '../store/reducers/weather';
import { getDateFromTimestamp, getRouteToIcon } from '../utils';
import { useNavigate } from 'react-router-dom';

export const CityPage: React.FC = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const weatherInfo: ICityWeatherInfo = useSelector(getWeatherInfoByCity(city as string));

  return (
    <Grid container justifyContent='center' alignItems='center' height='100vh'>
      <Grid container item flexDirection='column' width='70vw' height='70vh' sx={{ backgroundColor: '#ccc', padding: '40px' }}>
        <IconButton aria-label='back' onClick={() => navigate(-1)}>
          <ArrowBackIcon style={{ fill: 'blue' }} />
        </IconButton>
        <Grid container justifyContent='center' flexDirection='column'>
          <Grid container item flexDirection='row' justifyContent='center' alignItems='center' sm={8}>
            <Grid container item sm={3} textAlign='center'>
              <Typography sx={{ fontSize: 34, fontWeight: 'bold' }}>{weatherInfo?.temp}°C</Typography>
            </Grid>

            <Grid container item flexDirection='column' sm={5} textAlign='center'>
              <Typography sx={{ fontSize: 26, fontWeight: 'bold' }}>{city}</Typography>
              <Typography>{getDateFromTimestamp(weatherInfo?.date)}</Typography>
            </Grid>

            <Grid container item flexDirection='column' sm={4}>
              <Box
                component='img'
                sx={{
                  height: 50,
                  width: 50,
                }}
                alt='weather-icon'
                src={getRouteToIcon(weatherInfo?.icon)}
              />
              <Typography>{weatherInfo?.description}</Typography>
            </Grid>
          </Grid>
          <Grid container item flexDirection='column' alignItems='center' sm={4}>
            <Typography sx={{ fontWeight: 'bold' }} marginBottom={2}>
              Weather Details:
            </Typography>
            <Typography>Humidity: {weatherInfo?.humidity}%</Typography>
            <Typography>Wind: {weatherInfo?.wind_speed}km/h</Typography>
            <Typography>Feels like: {weatherInfo?.feels_like}°C</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
