import React, { Dispatch, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

import { fetchCurrentWeather, removeCurrentWeather } from '../../store/actions/weather';
import { getRouteToIcon } from '../../utils';

interface IProps {
  name: string;
  icon: string;
  temp: number;
}

const CityCard: React.FC<IProps> = ({ name, icon, temp }) => {
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(name));
  }, []);

  return (
    <Card>
      <Grid container item alignItems='center' justifyContent='space-between'>
        <IconButton aria-label='update' onClick={() => dispatch(fetchCurrentWeather(name))}>
          <UpdateIcon />
        </IconButton>
        <IconButton aria-label='delete' onClick={() => dispatch(removeCurrentWeather(name))}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column' }} component={RouterLink} to={`/weather/${name}`}>
        <Typography variant='h4' component='div'>
          {name}
        </Typography>
        <Grid container item alignItems='center' justifyContent='center'>
          <Typography variant='h5' component='div'>
            {temp}°C
          </Typography>
          <CardMedia component='img' sx={{ width: 80 }} image={getRouteToIcon(icon)} alt='weather-icon' />
        </Grid>
      </CardActionArea>
    </Card>
  );
};
export default CityCard;
