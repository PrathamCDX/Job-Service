import express from 'express';

import jobTitleRouter from './jobTitle.route';
import pingRouter from './ping.route';

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);

v1Router.use('/job-title', jobTitleRouter);

export default v1Router;