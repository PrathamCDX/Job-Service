import { Op } from 'sequelize';

import Application from '../db/models/application.model';
import { BadRequestError } from '../utils/errors/app.error';
import BaseRepository from './base.repository';

class ApplicationRepository extends BaseRepository<Application> {
    constructor() {
        super(Application);
    }

    async getDetails(where: Partial<Application>) {
        const response = await this.model.findAll({
            where
        });

        return response;
    }

    async findOne(where: Partial<Application>) {
        return await this.model.findOne({
            where: {
                ...where,
                deleted_at: {
                    [Op.eq]: null,
                },
            },
        });
    }

    async softDelete(where: Partial<Application>) {
        const record = await this.model.findOne({
            where: {
                ...where,
                deleted_at: {
                    [Op.eq]: null,
                },
            },
        });
        console.log(where);
        if (!record) {
            throw new BadRequestError('Application does not exist');
        }

        record.deleted_at = new Date();
        await record.save();
        return true;
    }

    async findMany(where?: Partial<Application>) {
        return await this.model.findAll({
            where: {
                ...where,
                deleted_at: {
                    [Op.eq]: null,
                },
            },
        });
    }
}

export default ApplicationRepository;
