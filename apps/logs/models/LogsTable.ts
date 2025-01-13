// import { FranchiseLeadModel } from "apps/franchise_model/models/FranchiseModelTable";
// import { ExtraFields, extraFieldTypes } from "apps/lead/interface/Lead";
// import { sequelize } from "config";
// import { DataTypes, Model, Optional } from "sequelize";


// // Define the attributes for ExtraFields creation
// interface ExtraFieldsCreationAttributes extends Optional<ExtraFields, 'id'> { }

// class ExtraFieldsModel extends Model<ExtraFields, ExtraFieldsCreationAttributes> implements ExtraFields {
//     public id!: number;
//     public key!: string;
//     public value!: string;
//     public title!: string;
//     public type!: extraFieldTypes;
//     public franchiseModelId!: number;

//     // Define any associations if needed
//     public static associate() {
//         // Example association
//         // this.belongsTo(AnotherModel, { foreignKey: 'anotherModelId', as: 'anotherModel' });
//     }
// }

// // Initialize the ExtraFieldsModel
// ExtraFieldsModel.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true, 
//     },
//     franchiseModelId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: FranchiseLeadModel,
//             key: 'id',
//         },
//     },
//     key: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     value: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     type: {
//         type: DataTypes.ENUM(...Object.values(extraFieldTypes)), // Using enum for type
//         allowNull: false,
//     },
// }, {
//     sequelize,
//     tableName: 'extra_fields',
//     timestamps: true, // Set to true if you want createdAt and updatedAt fields
// });

// // Export the model
// export { ExtraFieldsModel };

// models/log.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config";
import { LeadsModel } from "apps/lead/models/LeadTable";

class LogModel extends Model {
  public action!: string; // The action (e.g., 'create', 'update', 'delete')
  public model!: string; // The name of the model being acted upon
  public recordId!: number; // The ID of the record being modified
  public data!: Record<string, any>; // Data of the record being modified
  public userId!: number | null; // User performing the action, optional
  public userName!: string | null; // User performing the action, optional
  public timestamp!: Date; // Timestamp of the operation
}

LogModel.init(
  {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // To store who performed the action
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true, // To store who performed the action
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "logs",
  }
);

// LogModel.belongsTo(LeadsModel, {
//   foreignKey: "recordId",
//   targetKey: "id",
//   constraints: false,
//   as: "lead",
// });
export { LogModel };
