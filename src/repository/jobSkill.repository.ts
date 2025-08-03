import { CreationAttributes, Transaction, WhereOptions } from 'sequelize';

import JobSkill from '../db/models/jobSkill.model';
import BaseRepository from './base.repository';

class JobSkillRepository extends BaseRepository<JobSkill>{

    constructor(){
        super(JobSkill);
    }

    async create(data: CreationAttributes<JobSkill>, transaction?: Transaction): Promise<JobSkill> {
        const record = await this.model.create(data, {transaction: transaction});
        return record;
    }

    async createBulk(bulkData: { job_id: number, skill_id: number }[], transaction: Transaction){
        return await this.model.bulkCreate(bulkData, {transaction: transaction});
    }

    async findSkillByJobId(jobId: number){
        return await this.model.findAll({where: {job_id: jobId}});
    }

    async delete(whereOptions: WhereOptions<JobSkill>, transaction?: Transaction): Promise<void> {
        await this.model.destroy({
            where:{
                ...whereOptions
            }, transaction}
        );

        return ;
    }

}

export default JobSkillRepository ;