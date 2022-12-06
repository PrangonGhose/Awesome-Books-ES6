import { DateTime } from './luxon.js';

export const dtNow = DateTime.local().toLocaleString(DateTime.DATETIME_FULL); // eslint-disable-line