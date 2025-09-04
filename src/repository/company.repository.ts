import { InferCreationAttributes, Op, Optional, Transaction } from 'sequelize';
import { NullishPropertiesOf } from 'sequelize/types/utils';

import Company from '../db/models/company.model';
import BaseRepository from './base.repository';

class CompanyRepository extends BaseRepository<Company>{

    constructor(){
        super(Company);
    }

    async findByName(name: string){
        return await this.model.findOne({where: {name}});
    }

    async create(data: Optional<InferCreationAttributes<Company, { omit: never; }>, NullishPropertiesOf<InferCreationAttributes<Company, { omit: never; }>>>, transaction?:Transaction): Promise<Company> {
        console.log('data', data);
        const record = await this.model.create(data, {transaction});
        return record;
    }

    async getCompanyByName(name: string){
        const results = await this.model.findAll({
            where: {
                name: {
                    [Op.like]: name + '%'
                }
            }
        });
        return results ;
    }
}

export default CompanyRepository ;