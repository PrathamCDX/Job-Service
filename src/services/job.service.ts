import logger from '../configs/logger.config';
import sequelize from '../db/models/sequelize';
import { CreateJobDto, DeleteJobDto, GetAllJobDto,  GetJobDetailsDto, UpdateJobDto } from '../dtos/job.dto';
import JobRepository from '../repository/job.repository';
import JobSkillRepository from '../repository/jobSkill.repository';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';
import { isAuthorized } from '../utils/services/AuthorizationService';
import { getCityById } from '../utils/services/CityService';
import { getSkillById } from '../utils/services/SkillService';

class JobService {
    private jobRepository: JobRepository;
    private jobSkillRepository: JobSkillRepository;

    constructor(jobRepository: JobRepository,  jobSkillRepository: JobSkillRepository){
        this.jobRepository= jobRepository;
        this.jobSkillRepository= jobSkillRepository ;
    }
    

    async getJobDetailsById(getJobDetails: GetJobDetailsDto){
        try {
            const {userId, jwtToken, id } = getJobDetails;
            await isAuthorized(userId, jwtToken);
            
            const checkJob = await this.jobRepository.findById(id);
            if(!checkJob){
                throw new NotFoundError('Job not found');
            }

            const city = await getCityById(checkJob.city_id, jwtToken);

            await isAuthorized(userId, jwtToken);
            const data =await this.jobRepository.getJobDetails(Number(id));
            const skillIds = await this.jobSkillRepository.findSkillByJobId(id);

            const skills= await Promise.all(skillIds.map(async(skillId)=>{
                const skill = await getSkillById(skillId.skill_id, jwtToken);
                return skill.data.data.name; 
            }));
            const response = {
                ...data?.toJSON(),       
                city: {
                    name: city.data.data.name
                },
                skills: skills
            };
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllJobsService(getAllJobData: GetAllJobDto){        
        const {userId, jwtToken} = getAllJobData;
        await isAuthorized(userId, jwtToken);

        const record =await this.jobRepository.findAll();
        
        const response = await Promise.all(
            record.map(async (job) => {
                const city = await getCityById(job.city_id, jwtToken);
                const skillIds = await this.jobSkillRepository.findSkillByJobId(job.id);
                if(skillIds.length==0){
                    return {
                        ...job.toJSON(), 
                        city: city.data.data.name
                    };
                }
                const skills= await Promise.all(skillIds.map(async(skillId)=>{
                    const skill = await getSkillById(skillId.skill_id, jwtToken);
                    return skill.data.data.name; 
                }));

                return {
                    ...job.toJSON(), 
                    city: city.data.data.name,
                    skills
                };
            })
        );
        console.log(response);
        return response;

        
    }

    async createJobService(createJobData: CreateJobDto){

        const {userId, jwtToken, skillIds, ...rest} = createJobData;
        await isAuthorized(userId, jwtToken);
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

        await isAuthorized(userId, jwtToken);

        const checkJob= await this.jobRepository.findById(id);
        if(!checkJob){
            throw new BadRequestError('Job does not exist');
        }

        const transaction = await sequelize.transaction();

        try {
            await this.jobSkillRepository.delete({job_id: id}, transaction);
            await this.jobRepository.delete({id}, transaction);
            transaction.commit();
            return true;
        } catch (error) {
            logger.error(error);
            transaction.rollback();
        }

    }

    async updateJobService(updateJobData: UpdateJobDto){
        const {userId, jwtToken, id, skillIds, ...rest}= updateJobData;
        await isAuthorized(userId, jwtToken);

        const checkJob = await this.jobRepository.findById(id);
        if(!checkJob){
            throw new BadRequestError('Job does not exist');
        }
        
        const skillIdResponse = await this.jobSkillRepository.findSkillByJobId(checkJob.id);
        const currentSkillIdArray= skillIdResponse.map((skillId)=>{
            return skillId.skill_id;
        });

        const transaction = await sequelize.transaction();
        try {

            skillIds.forEach((skillId)=>{
                if(!currentSkillIdArray.includes(skillId)){
                    this.jobSkillRepository.create({job_id: checkJob.id, skill_id: skillId}, transaction);
                }
            });

            currentSkillIdArray.forEach((skillId)=>{
                if(!skillIds.includes(skillId)){
                    this.jobSkillRepository.delete({job_id: checkJob.id, skill_id: skillId}, transaction);
                }
            });
            const record= await this.jobRepository.updateById(id, rest, transaction); 
            transaction.commit();
            return {
                record,
                skillIds
            };
        } catch (error) {
            logger.error(error);
            transaction.rollback();
        }

    }
}

export default JobService ;