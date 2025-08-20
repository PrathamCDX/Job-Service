import { Role } from './GetJobTitleServiceTypes';
import { Skill } from './GetSkillTypes';

export type User = {
  fullName: string;
  email: string;
  phoneNo: string;
  id: number;
  profile: {
    bio: string | null;
    yearsOfExperience: number | null;
    isFresher: boolean | null;
    currentCtc: number | null;
    resumeUrl: string | null;
    linkedinUrl: string | null;
    currentLocationId: number | null;
    currentCompanyId: number | null;
    currentLocation: string | null;
  };
  skills: Skill[]; 
  roles: Role[];  
};

export type GetUserDetailsResponse= {
    success: boolean;
        message: string;
        data: User ;
        error: Record<string, null>;
}