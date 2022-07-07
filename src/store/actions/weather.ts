import {
  GET_CURRENT_CITY_WEATHER_STARTED,
  GET_CURRENT_CITY_WEATHER_SUCCESS,
  GET_CURRENT_CITY_WEATHER_FAILURE,
  REMOVE_CURRENT_CITY_WEATHER,
} from './types/weather';

import axios, { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { RootState } from '../reducers/weather';
import { UNITS_FOR_TEMP } from '../../utils/constants';

export function fetchCurrentWeather(city: string): ThunkAction<void, RootState, unknown, AnyAction> {
  return (dispatch) => {
    dispatch(getCurrentCityWeatherStarted());

    axios
      .get(`${process.env.REACT_APP_WEATHER_API_URL}/weather`, {
        params: { q: city, units: UNITS_FOR_TEMP, appid: process.env.REACT_APP_WEATHER_API_KEY },
      })
      .then((response: any) => {
        dispatch(getCurrentCityWeatherSuccess(response.data));
      })
      .catch((error: AxiosError) => dispatch(getCurrentCityWeatherFailure(error.message)));
  };
}

export const removeCurrentWeather = (city: string) => (dispatch: Dispatch) => {
  dispatch(removeCurrentCityWeather(city));
};

export const getCurrentCityWeatherStarted = () => ({
  type: GET_CURRENT_CITY_WEATHER_STARTED,
});

export const getCurrentCityWeatherSuccess = (data: any) => ({
  type: GET_CURRENT_CITY_WEATHER_SUCCESS,
  data,
});

export const getCurrentCityWeatherFailure = (error: string) => ({
  type: GET_CURRENT_CITY_WEATHER_FAILURE,
  error,
});

export const removeCurrentCityWeather = (city: string) => ({
  type: REMOVE_CURRENT_CITY_WEATHER,
  city,
});

export type WeatherActions =
  | ReturnType<typeof getCurrentCityWeatherStarted>
  | ReturnType<typeof getCurrentCityWeatherSuccess>
  | ReturnType<typeof getCurrentCityWeatherFailure>
  | ReturnType<typeof removeCurrentCityWeather>;
