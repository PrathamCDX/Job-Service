import { Router } from 'express';

import industryController from '../../controllers/industry.controller';
import authenticationMiddleware from '../../middlewares/authentication.middleware';

const industryRouter = Router();

industryRouter.get('/', authenticationMiddleware, industryController.getAllIndustries);

export default industryRouter ;