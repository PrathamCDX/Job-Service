import axios from 'axios';

import logger from '../../configs/logger.config';
import { microServiceConfig } from '../../configs/server.config';
import { GetLocationResponse } from '../../types/GetLocationTypes';

export async function getLocationById(id: number){
    let location;
    try{
        location = await axios.get<GetLocationResponse>(
            `${microServiceConfig.USER_SERVICE_URL}location/${id}`
        );
        return location;
    }catch(error){
        logger.error(error);
        throw error;
    }
}