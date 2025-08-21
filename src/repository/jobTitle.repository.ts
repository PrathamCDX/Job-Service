import { Op } from 'sequelize';

import JobTitle from '../db/models/jobTitle.model';
import BaseRepository from './base.repository';

class JobTitleRepository extends BaseRepository<JobTitle>{

    constructor(){
        super(JobTitle);
    }

    async getJobTitle(jobTitle: string){
        const results = await this.model.findAll({
            where: {
                title: {
                    [Op.like]: jobTitle + '%'
                }
            }
        });
        return results ;
    }

    async findByTitle(title: string){
        const response = await this.model.findOne({where:{title}});
        return response ;
    }

}

export default JobTitleRepository ;