import CompanySize from '../db/models/companySize.model';
import BaseRepository from './base.repository';

class CompanySizeRepository extends BaseRepository<CompanySize>{
    
    constructor(){
        super(CompanySize);
    }
}

export default CompanySizeRepository ;