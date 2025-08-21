import axios from 'axios';

import logger from '../../configs/logger.config';
import { microServiceConfig } from '../../configs/server.config';
import { GetSkillResponse } from '../../types/GetSkillTypes';
import { InternalServerError } from '../errors/app.error';

export async function getSkillById(id: number, jwtToken: string){
    let skillName;
    try{
        skillName = await axios.get<GetSkillResponse>(
            `${microServiceConfig.USER_SERVICE_URL}skills/${id}`,{
                headers:{
                    Authorization: jwtToken
                }
            }
        );
        return skillName;
    }catch(error){
        logger.error(error);
        throw new InternalServerError('Error fetching skill details');
    }
}