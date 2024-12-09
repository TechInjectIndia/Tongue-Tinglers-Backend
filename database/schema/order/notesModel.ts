import { DataTypes, Model, Optional } from "sequelize";
import { BaseOrder, Notes, Order, BaseNotes } from "../../../interfaces";
import { sequelize } from "../../../config";

interface NotesCreationAttributes extends Optional<Notes, | 'id'> {}

class NotesModel extends Model<Notes, NotesCreationAttributes> implements BaseNotes {
    notes: string;
    isNew: boolean;
    createdBy: number;
}

NotesModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: "notes",
    timestamps: true,
    underscored: true,
})

export {NotesModel};