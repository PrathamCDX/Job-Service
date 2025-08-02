import logger from '../configs/logger.config';
import sequelize from '../db/models/sequelize';
import { CreateJobDto, DeleteJobDto, GetAllJobDto,  GetJobDetailsDto, UpdateJobDto } from '../dtos/job.dto';
import JobRepository from '../repository/job.repository';
import JobSkillRepository from '../repository/jobSkill.repository';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';
import BaseService from './base.service';

class JobService extends BaseService{
    private jobRepository: JobRepository;
    private jobSkillRepository: JobSkillRepository;

    constructor(jobRepository: JobRepository,  jobSkillRepository: JobSkillRepository){
        super();
        this.jobRepository= jobRepository;
        this.jobSkillRepository= jobSkillRepository ;
    }

    async getJobDetailsById(getJobDetails: GetJobDetailsDto){
        try {
            const {userId, jwtToken, id } = getJobDetails;
            await this.isAuthorized(userId, jwtToken);
            
            const checkJob = await this.jobRepository.findById(id);
            if(!checkJob){
                throw new NotFoundError('Job not found');
            }

            const city = await this.getCityById(checkJob.city_id, jwtToken);

            await this.isAuthorized(userId, jwtToken);
            const data =await this.jobRepository.getJobDetails(Number(id));
            const response = {
                ...data?.toJSON(),       
                city: {
                    name: city.data.data.name
                }
            };
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllJobsService(getAllJobData: GetAllJobDto){        
        const {userId, jwtToken} = getAllJobData;
        await this.isAuthorized(userId, jwtToken);

        const record =await this.jobRepository.findAll();
        const response = await Promise.all(
            record.map(async (job) => {
                const city = await this.getCityById(job.city_id, jwtToken);
                return {
                    ...job.toJSON(), 
                    city: city.data.data.name,
                };
            })
        );
        console.log(response);
        return response;

    }


    async createJobService(createJobData: CreateJobDto){

        const {userId, jwtToken, skillIds, ...rest} = createJobData;
        await this.isAuthorized(userId, jwtToken);
        const transaction = await sequelize.transaction();
        try {
            const jobRecord = await this.jobRepository.create({...rest}, transaction );
            const bulkData = skillIds.map((skillId)=>{return {job_id: jobRecord.id, skill_id: skillId};});
            const jobSkills = await this.jobSkillRepository.createBulk(bulkData, transaction);
            transaction.commit();
            return {jobRecord, jobSkills};
        } catch (error) {
            logger.error(error);
            transaction.rollback();
        }
       
    }

    async deleteJobService(deleteJobData: DeleteJobDto){
        const {userId, jwtToken, id} = deleteJobData;

        await this.isAuthorized(userId, jwtToken);

        const checkJob= await this.jobRepository.findById(id);
        if(!checkJob){
            throw new BadRequestError('Job does not exist');
        }

        return await this.jobRepository.delete({id});
    }

    async updateJobService(updateJobData: UpdateJobDto){
        const {userId, jwtToken, id, ...rest}= updateJobData;
        await this.isAuthorized(userId, jwtToken);

        const checkJob = await this.jobRepository.findById(id);
        if(!checkJob){
            throw new BadRequestError('Job does not exist');
        }

        return await this.jobRepository.updateById(id, rest); 
    }
}

export default JobService ;