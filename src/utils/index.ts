import moment from 'moment';
import { DATE_FORMAT, ROUTE_TO_API_ICONS } from './constants';

export const getDateFromTimestamp = (timestamp: number) => moment.unix(timestamp).format(DATE_FORMAT);

export const getRouteToIcon = (iconId: string) => `${ROUTE_TO_API_ICONS}/${iconId}.png`;
