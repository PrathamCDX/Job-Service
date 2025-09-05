import axios from 'axios';

import logger from '../../configs/logger.config';
import { microServiceConfig } from '../../configs/server.config';
import { GetCityResponse } from '../../types/GetCityTypes';
import { InternalServerError } from '../errors/app.error';

export async function getCityById(id: number){
    let cityName;
    try{
        cityName = await axios.get<GetCityResponse>(
            `${microServiceConfig.USER_SERVICE_URL}city/${id}`
        );
        return cityName;
    }catch(error){
        logger.error(error);
        throw new InternalServerError('Error fetching city details');
    }
}