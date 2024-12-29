import { sequelize } from "config";
import { DataTypes, Model, Optional } from "sequelize";
import { TToken } from "types";

const { INTEGER, STRING, DATE, NOW, BOOLEAN } = DataTypes;

interface TokenCreationAttributes extends Optional<TToken, 'id' | 'createdAt' | 'updatedAt'> { }

class TokenModel extends Model<TToken, TokenCreationAttributes> implements TToken {
    public id!: number;
    public accessToken!: string;
    isActive: boolean = true;
    tokenType: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static async upsertToken(
        accessToken: string,
        isActive: boolean = true,
        tokenType: string
    ): Promise<TokenModel> {
        const existingToken = await this.findOne({
            where: {
                tokenType,
            }
        });

        if (existingToken) {
            existingToken.accessToken = accessToken;
            await existingToken.save();
            return existingToken;
        } else {
            return await this.create({
                accessToken,
                isActive,
                tokenType
            });
        }
    }
}

TokenModel.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    accessToken: {
        type: STRING,
        allowNull: false,
    },
    tokenType: {
        type: STRING,
        allowNull: false,
    },
    isActive: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "created_at",
    },
    updatedAt: {
        type: DATE,
        allowNull: false,
        defaultValue: NOW,
        field: "updated_at",
    },
}, {
    sequelize,
    tableName: 'tokens',
    timestamps: true,
});

export { TokenModel };
