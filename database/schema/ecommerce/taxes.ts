import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../../../config";
import { TaxAttributes } from "../../../interfaces";

interface TaxCreationAttributes extends Optional<TaxAttributes, 'id'> { }

class Tax extends Model<TaxAttributes, TaxCreationAttributes> implements TaxAttributes {
    public id!: string;
    public name!: string;
    public rate!: number;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Tax.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Tax',
    }
);

export { Tax };
