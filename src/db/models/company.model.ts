import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

import CompanySize from './companySize.model';
import Industry from './industry.model';
import sequelize from './sequelize';

class Company extends Model<InferAttributes<Company>,InferCreationAttributes<Company>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare logo: string;
    declare website: CreationOptional<string>;
    declare description: CreationOptional<string>;
    declare company_size_id: ForeignKey<CompanySize['id']>;
    declare industry_id: ForeignKey<Industry['id']>;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date | null>;

    static associations: {
        companySize: Association<Company, CompanySize>;
        industry: Association<Company, Industry>;
    };
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        logo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true
        },
        company_size_id:{
            type: DataTypes.NUMBER,
            allowNull: true
        },
        industry_id:{
            type: DataTypes.NUMBER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            unique: true,
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
        tableName: 'companies',
        sequelize,
        underscored: true,
        timestamps: false,
    }
);

export default Company;
