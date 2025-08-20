export type Skill= {
    id: number;
    name: string;
}

export type GetSkillResponse = {
    success: boolean;
    message: string;
    data: Skill;
    error: Record<string, null>;
};