import axios from 'axios';

import logger from '../../configs/logger.config';
import { microServiceConfig } from '../../configs/server.config';
import { GetUserDetailsResponse } from '../../types/GetUserDetailsTypes';
import { InternalServerError } from '../errors/app.error';

export async function getUserDetailsService(jwtToken: string, userId: number) {
    try {
        const { data } = await axios.get<GetUserDetailsResponse>(
            `${microServiceConfig.USER_SERVICE_URL}users/${userId}`,
            {
                headers: {
                    Authorization: jwtToken
                }
            }
        );
        return data; 
    } catch (error) {
        logger.error(error);
        throw new InternalServerError('Error fetching user details');
    }
}
