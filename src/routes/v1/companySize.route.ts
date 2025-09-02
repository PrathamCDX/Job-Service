import { Router } from 'express';

import companySizeController from '../../controllers/companySize.controller';
import authenticationMiddleware from '../../middlewares/authentication.middleware';

const companySizeRouter = Router();

companySizeRouter.get('/', authenticationMiddleware, companySizeController.getAllCompanySizes);

export default companySizeRouter ;