export type CreateCompanyDto= {
    userId: number;
    jwtToken: string;
    name: string;
    website: string;
    logo: string;
}


export type UpdateCompanyDto= {
    userId: number;
    jwtToken: string;
    id: number;
    name?: string;
    website?: string;
    logo?: string;
}

export type DeleteCompanyDto= {
    userId: number;
    jwtToken: string;
    id: number;
}

