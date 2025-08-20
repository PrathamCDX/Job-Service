import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ApplicationRepository from '../repository/application.repository';
import ApplicationService from '../services/application.service';
import { AuthRequest } from '../types/AuthRequest';
import { BadRequestError } from '../utils/errors/app.error';
import { isAuthorized } from '../utils/services/AuthorizationService';
// import { isAuthorized } from '../utils/services/AuthorizationService';

const applicationRepository= new ApplicationRepository();
const applicationService= new ApplicationService(applicationRepository);

async function createApplication(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const userId= Number(req.user?.id) ;
        const { jobId } = req.body;
        const jwtToken= String(req.headers.authorization);

        const record= await applicationService.getApplicationDetailsService({userId, jobId, jwtToken});
        console.log('create record', record);
        if(record.length> 0){
            throw new BadRequestError('Already applied for this job');
        }
        
        const response= await applicationService.createApplicationService({userId, jobId: Number(jobId), jwtToken});
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Application added successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function deleteApplication(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const userId= Number(req.user?.id);
        const jobId= Number(req.params.id);
        const jwtToken= String(req.headers.authorization);


        const response= await applicationService.deleteApplicationService({userId, jobId, jwtToken});
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Application deleted successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function getApplicationByUserId(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const userId= Number(req.user?.id);
        const response= await applicationService.getApplicationByUserIdService(userId);
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Application fetched successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function getAllApplication(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const userId= Number(req.user?.id);
        const jwtToken= String(req.headers.authorization);

        await isAuthorized(userId, jwtToken);

        const response= await applicationService.getAllApplicationService({userId, jwtToken});
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Applications fetched successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function getApplicationDetails(req: AuthRequest, res: Response, next: NextFunction){
    try {
        const userId= Number(req.user?.id);
        const jobId= Number(req.params.jobId);
        const jwtToken= String(req.headers.authorization);
        
        const response = await applicationService.getApplicationDetailsService({userId, jobId, jwtToken});
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Application Details Fetched successfully',
            data: response,
            error: {}
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}




export default {
    createApplication,
    deleteApplication,
    getApplicationByUserId,
    getAllApplication,
    getApplicationDetails
};