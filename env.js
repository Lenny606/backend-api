import {config} from 'dotnev';

config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

export const {PORT} = process.env


