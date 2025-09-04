import IndustryRepository from '../repository/industry.repository';
import { isAuthorized } from '../utils/services/AuthorizationService';

class IndustryService {
    private industryRepository: IndustryRepository; 

    constructor(industryRepository: IndustryRepository){
        this.industryRepository = industryRepository ;
    }

    async getAllService(data: {jwtToken: string, userId: number, name: string}){
        try {
            console.log('data', data);
            await isAuthorized(data.userId, data.jwtToken);
            console.log('is autho');
            const response = await this.industryRepository.findAllByName(data.name);
            return response ;
        } catch (error) {
            console.log(error);
        }

    }
}

export default IndustryService ;