import { curry, omit } from 'ramda';
import { combineReducers } from 'redux';

import { ICityWeatherInfo } from '../../interfaces';
import {
  GET_CURRENT_CITY_WEATHER_STARTED,
  GET_CURRENT_CITY_WEATHER_SUCCESS,
  GET_CURRENT_CITY_WEATHER_FAILURE,
  REMOVE_CURRENT_CITY_WEATHER,
} from '../actions/types/weather';
import { WeatherActions } from './../actions/weather';

interface IState {
  cities: {
    [city: string]: ICityWeatherInfo;
  };
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: IState = {
  cities: {},
  isLoading: false,
  error: null,
};

const weatherReducer = (state: IState = INITIAL_STATE, action: WeatherActions): IState => {
  switch (action.type) {
    case GET_CURRENT_CITY_WEATHER_STARTED:
      return { ...state, isLoading: true };
    case GET_CURRENT_CITY_WEATHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cities: {
          ...state.cities,
          [action.data.name]: {
            temp: action.data.main?.temp.toFixed(),
            feels_like: action.data.main?.feels_like.toFixed(),
            icon: action.data.weather[0].icon,
            description: action.data.weather[0].description,
            date: action.data.dt,
            humidity: action.data.main?.humidity,
            wind_speed: action.data.wind.speed.toFixed(),
          },
        },
      };
    case GET_CURRENT_CITY_WEATHER_FAILURE:
      return { ...state, error: action.error, isLoading: false };
    case REMOVE_CURRENT_CITY_WEATHER:
      return {
        ...state,
        cities: omit([action.city], state.cities),
      };
    default:
      return state;
  }
};

export default weatherReducer;
export const rootReducer = combineReducers({ weather: weatherReducer });
export type RootState = ReturnType<typeof rootReducer>;
export const getWeather = (state: RootState) => state.weather;
export const getCities = (state: RootState) => getWeather(state).cities;
export const getWeatherInfoByCity = curry((city: string, state: RootState) => getCities(state)[city]);
export const getError = (state: RootState) => getWeather(state).error;
