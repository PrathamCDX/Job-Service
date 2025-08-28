import express from 'express';

import applicationRouter from './application.route';
import comapanyRouter from './company.route';
import employmentTypeRouter from './employmentType.route';
import experienceLevelRouter from './experienceLevel.route';
import jobRouter from './job.route';
import jobTitleRouter from './jobTitle.route';
import pingRouter from './ping.route';

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);

v1Router.use('/job-title', jobTitleRouter);

v1Router.use('/experience-level', experienceLevelRouter);

v1Router.use('/jobs', jobRouter);

v1Router.use('/employment-types', employmentTypeRouter);

v1Router.use('/companies', comapanyRouter);

v1Router.use('/applications', applicationRouter);

export default v1Router;