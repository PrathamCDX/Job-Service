import { CreationOptional,  DataTypes,  InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from './sequelize';

class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>>{
    declare id: CreationOptional<number>;
    declare title_id: CreationOptional<number>;
    declare employment_type_id: CreationOptional<number>;
    declare experience_level_id: CreationOptional<number>;
    declare salary_min: number;
    declare salary_max: number;
    declare recuiter_id: CreationOptional<number>;
    declare company_id: CreationOptional<number>;
    declare city_id: CreationOptional<number>;
    declare is_remote: boolean;
    declare apply_link: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date | null>;

}

Job.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    employment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    experience_level_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    salary_min: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    salary_max: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    recuiter_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    is_remote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    apply_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},{
    tableName: 'jobs',
    sequelize,
    underscored: true,
    timestamps: false,
});

export default Job;