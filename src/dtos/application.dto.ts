export type CreateApplicationDto = {
  userId: number;
  jobId: number;
  jwtToken: string;
};

export type DeleteApplicationDto = {
  userId: number;
  jobId: number;
  jwtToken: string;
};

export type GetAllApplicationDto = {
  userId: number;
  jwtToken: string;
};

export type GetApplicationDetailsDto = { 
    userId: number; 
    jobId: number;
    jwtToken: string;
};
