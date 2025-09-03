import { Op } from 'sequelize';

import Industry from '../db/models/industry.model';
import BaseRepository from './base.repository';

class IndustryRepository extends BaseRepository<Industry>{
    constructor(){
        super(Industry);
    }

    async findAllByName(name: string): Promise<Industry[]> {
        console.log('record');
        
        const record = await this.model.findAll({
            where: {
                name: {
                    [Op.like]: '%'+ name + '%'
                }
            }
        });
        console.log('record', record);
        return record ;
    }
}

export default IndustryRepository ;