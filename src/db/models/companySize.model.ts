import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

import sequelize from './sequelize';

class CompanySize extends Model<InferAttributes<CompanySize>, InferCreationAttributes<CompanySize>> {
    declare id: CreationOptional<number>;
    declare min_employees: number;
    declare max_employees: number;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date | null>;
}

CompanySize.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        min_employees: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        max_employees: {
            type: DataTypes.INTEGER,
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
    },
    {
        tableName: 'company_sizes',
        sequelize,
        underscored: true,
    }
);

export default CompanySize ;