import { CreateEmploymentTypeDto, DeleteEmplymentTypeDto, GetEmploymentType, UpdateEmploymentTypeDto } from '../dtos/employmentType.dto';
import EmploymentTypeRepository from '../repository/employmentType.repository';
import BaseService from './base.service';

class EmploymentTypeService extends BaseService{
    private employmentTypeRepository: EmploymentTypeRepository;

    constructor( employmentTypeRepository: EmploymentTypeRepository){
        super();
        this.employmentTypeRepository= employmentTypeRepository;
    }

    async createEmploymentType(createData: CreateEmploymentTypeDto){
        const {userId, jwtToken, ...rest} = createData;
        await this.isAuthorized(userId, jwtToken);
        return await this.employmentTypeRepository.create({...rest});
    }

    async deleteEmploymentType(deleteData: DeleteEmplymentTypeDto ){
        const {userId, jwtToken, id} = deleteData;
        await this.isAuthorized(userId, jwtToken);
        return await this.employmentTypeRepository.delete({id});
    }

    async getEmploymentType(getData: GetEmploymentType){
        const {userId, jwtToken } = getData;
        await this.isAuthorized(userId, jwtToken);
        return await this.employmentTypeRepository.findAll();
    }

    async updateEmploymentType(updateData: UpdateEmploymentTypeDto){
        const {userId, jwtToken, id,...rest } = updateData;
        await this.isAuthorized(userId, jwtToken);
        return await this.employmentTypeRepository.updateById(id, {...rest});
    }
}

export default EmploymentTypeService ;