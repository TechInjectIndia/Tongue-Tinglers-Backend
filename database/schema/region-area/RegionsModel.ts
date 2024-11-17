import {
    BelongsToManySetAssociationsMixin,
    DataTypes,
    Model,
    Optional,
} from "sequelize";
import {sequelize} from "../../../config";
import { IRegion} from "../../../interfaces";
import {AreaModel} from "./AreaModel";


interface RegionCreationAttributes
    extends Optional<IRegion, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedBy" | "deletedBy"> {
}

class RegionModel extends Model<IRegion, RegionCreationAttributes>
    implements IRegion {
    public id!: number;
    public title!: string;

    public createdBy!: string;
    public createdAt!: Date;

    public updatedBy!: string | null;
    public updatedAt!: Date | null;

    public deletedBy!: string | null;
    public deletedAt!: Date | null;

    // Association methods
    public setAreas!: BelongsToManySetAssociationsMixin<AreaModel, number>;

    // Associations
    public static associate() {
        RegionModel.belongsToMany(AreaModel, {
            through: "RegionArea",
            foreignKey: "regionId",
            otherKey: "areaId",
            as: "areas",
        });
    }
}

RegionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        deletedBy: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "regions",
        timestamps: false, // Set to true if you want Sequelize to manage createdAt and updatedAt
    }
);

export { RegionModel };
