import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

import sequelize from './sequelize';

class EmploymentType extends Model<InferAttributes<EmploymentType>,InferCreationAttributes<EmploymentType>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: CreationOptional<string>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date | null>;
}

EmploymentType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(255),
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
        tableName: 'employment_types',
        sequelize,
        underscored: true,
        timestamps: false,
    }
);

export default EmploymentType;
