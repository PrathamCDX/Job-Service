import { CreateApplicationDto, DeleteApplicationDto, GetAllApplicationDto, GetApplicationDetailsDto } from '../dtos/application.dto';
import ApplicationRepository from '../repository/application.repository';
import { BadRequestError } from '../utils/errors/app.error';
import { isAuthorized } from '../utils/services/AuthorizationService';
import { getUserDetailsService } from '../utils/services/UserService';

class ApplicationService {
    private applicationRepository: ApplicationRepository;

    constructor(applicationRepository: ApplicationRepository){
        this.applicationRepository= applicationRepository;
    }

    async createApplicationService(createdata: CreateApplicationDto){
        const { userId, jobId } = createdata ;
        
        const record = await this.applicationRepository.findOne({candidate_id: userId, job_id: jobId});
        console.log('object', record);
        if(record){
            throw new BadRequestError('Application already exists');
        }

        return await this.applicationRepository.create({job_id: jobId, candidate_id: userId});
    }

    async deleteApplicationService(deleteData: DeleteApplicationDto){
        const { userId, jobId, jwtToken }= deleteData ;
        await isAuthorized(userId, jwtToken);
        return await this.applicationRepository.softDelete({candidate_id: userId, job_id: jobId});
    }

    async getApplicationByUserIdService(userId: number){
        return await this.applicationRepository.findMany({candidate_id: userId});
    }

    async getAllApplicationService(getData: GetAllApplicationDto){
        const {userId, jwtToken}= getData ;
        await isAuthorized(userId, jwtToken);
        return await this.applicationRepository.findMany();
    }

    async getApplicationDetailsService(getData: GetApplicationDetailsDto) {
        const records = await this.applicationRepository.getDetails({
            job_id: getData.jobId
        });

        const response = await Promise.all(
            records.map(async (record) => {
                const plainRecord = record.toJSON();
                const userId = plainRecord.candidate_id;
                const userRecord = await getUserDetailsService(getData.jwtToken, userId);
                return {candidate_id: plainRecord.candidate_id, job_id: plainRecord.job_id , ...userRecord.data};
            })
        );
        return response;
    }
}

export default ApplicationService ;