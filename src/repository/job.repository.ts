import { InferCreationAttributes, Optional, Transaction, WhereOptions } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

import Job from '../db/models/job.model';
import { NotFoundError } from '../utils/errors/app.error';
import BaseRepository from './base.repository';

class JobRepository extends BaseRepository<Job>{

    constructor(){
        super(Job);
    }
    async updateById(id: number, data: Partial<Job>, transaction?: Transaction): Promise<Job> {
        const record = await this.model.findByPk(id);
    
        if(!record) {
            throw new NotFoundError(`Record with id ${id} not found`);
        }
    
        record.set(data);
        await record.save({transaction});
    
        return record;
    }
    

    async delete(whereOptions: WhereOptions<Job>, transaction?: Transaction): Promise<void> {
        await this.model.destroy({
            where: {
                ...whereOptions
            }, transaction
        });

        return ;
    }

    async create(data: Optional<InferCreationAttributes<Job, { omit: never; }>, NullishPropertiesOf<InferCreationAttributes<Job, { omit: never; }>>>, transaction?: Transaction): Promise<Job> {
        const record = await this.model.create(data, {transaction: transaction});
        return record;
    }

    async findAll(): Promise<Job[]> {
        const records = await this.model.findAll({
            attributes: ['is_remote','city_id','id'],
            include: [
                {
                    association: Job.associations.jobTitle,
                    attributes: ['title']
                },
                {
                    association: Job.associations.companyId,
                    attributes: ['name']
                }
            ]
        });
        return records;
    }

    async getJobDetails(id: number){
        const response = await this.model.findByPk(id, {
            attributes: ['salary_min', 'salary_max', 'is_remote', 'apply_link'],
            include: [
                {
                    association: Job.associations.jobTitle, 
                    attributes: ['title']
                },
                {
                    association: Job.associations.employmentType,
                    attributes: ['name']
                },
                {
                    association: Job.associations.companyId,
                    attributes: ['name']
                },
                {
                    association: Job.associations.experienceLevel,
                    attributes: ['name']
                }
               
            ]
        });
        return response;
    }



}

export default JobRepository;