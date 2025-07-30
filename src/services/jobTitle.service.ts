import { CreateJobTitleDto, DeleteJobTitleDto, GetJobTitleDto, UpdateJobTitleDto } from '../dtos/jobTitle.dto';
import JobTitleRepository from '../repository/jobTtile.repository';
import BaseService from './base.service';

class JobTitleService extends BaseService {
    private jobTitleRepository: JobTitleRepository;

    constructor(jobTitleRepository: JobTitleRepository) {
        super();
        this.jobTitleRepository = jobTitleRepository;
    }

    async getJobTitleService(getData: GetJobTitleDto ) {
        const {userId, jwtToken, title} = getData;
        await this.isAuthorized(userId, jwtToken);
        return this.jobTitleRepository.getJobTitle(title);
    }

    async delJobTitleService(deleteData: DeleteJobTitleDto) {
        const {userId, jwtToken, id} = deleteData;
        await this.isAuthorized(userId, jwtToken);
        return this.jobTitleRepository.delete({ id });
    }

    async updateJobTitleService(updateData: UpdateJobTitleDto) {
        const {id, title, userId, jwtToken}= updateData;
        await this.isAuthorized(userId, jwtToken);
        return this.jobTitleRepository.updateById(id, {
            title: title,
        });
    }

    async createJobTitleService(createData: CreateJobTitleDto) {
        const {title, userId, jwtToken}= createData;
        await this.isAuthorized(userId, jwtToken);
        return this.jobTitleRepository.create({ title });
    }
}

export default JobTitleService;
