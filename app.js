import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import {PORT} from './env.js'








app.listen(PORT, () => {
    res.send(`API running on http://localhost:${PORT}`)
})


