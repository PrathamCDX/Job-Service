import logger from '../configs/logger.config';
import CompanySizeRepository from '../repository/companySize.repository';
import { InternalServerError } from '../utils/errors/app.error';
import { isAuthorized } from '../utils/services/AuthorizationService';

class CompanySizeService {
    private companySizeRepository: CompanySizeRepository ;
    
    constructor(companySizeRepository: CompanySizeRepository){
        this.companySizeRepository = companySizeRepository ;
    }

    async getAllService(getData : {jwtToken: string, userId: number}){
        try {
            const { jwtToken, userId } = getData ;
            await isAuthorized( userId, jwtToken );

            const response = await this.companySizeRepository.findAll();
            return response ;
        } catch (error) {
            logger.error(error);
            throw new InternalServerError('Error fetching all company size');
        }
    }
    
}

export default CompanySizeService ;