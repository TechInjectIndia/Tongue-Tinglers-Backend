import { DataTypes, Model, Optional } from "sequelize";
import { LeadSource, LeadStatus, Assignee, FollowDetails, LeadAddress, UserDetails, ITrackable, Note, Affiliate, ExtraFields, FranchiseModels, ProposalModels } from '../../../interfaces';
import { sequelize } from "../../../config";
import { ILead } from "../../../interfaces";
import { UserModel } from '../user/user.model';
const { STRING, TEXT, DATE, JSONB, ENUM, NOW, UUIDV4 } = DataTypes;

interface LeadCreationAttributes extends Optional<ILead, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> { }

class LeadsModel extends Model<ILead, LeadCreationAttributes> implements ILead {
    public id!: string;
    public campaignId?: string;
    public firstName!: string;
    public status!: LeadStatus;
    public assign!: Assignee | null;
    public lastName!: string;
    public phoneNumber!: string;
    public email!: string;
    public address!: LeadAddress;
    public additionalInfo!: string | null;
    public source!: LeadSource;
    public sourceInfo!: string | null;
    public followDetails!: FollowDetails[] | null;
    public referBy!: UserDetails;
    public logs!: Record<string, ITrackable[]>;
    public notes!: Note[] | null;
    public proposalModals: Array<ProposalModels> | null; // todo put this in a separate table and make association
    public franchiseModals: Array<FranchiseModels> | null;
    /** todo how can one lead have multiple Affiliates associated to it,
     if a lead comes from a campaign with an affiliate,
     only 1 affiliate will be assigned to it
     And the association also shouldn't be a direct one -> instead it should be:
     affiliate->campaign->lead-> contract {which has payment & agreement association} -> Franchise
     */
    public affiliate: Array<Affiliate> | null;//todo make the changes as above
    public marketing: Array<string> | null;
    public other: Array<ExtraFields> | null;
    public createdBy!: string;
    public updatedBy!: string | null;
    public deletedBy!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

    public static associate() {
        LeadsModel.belongsTo(UserModel, { foreignKey: 'createdBy', as: 'creator' });
        LeadsModel.belongsTo(UserModel, { foreignKey: 'updatedBy', as: 'updater' });
        LeadsModel.belongsTo(UserModel, { foreignKey: 'deletedBy', as: 'deleter' });
        //associate with campaign
    }
}

LeadsModel.init({
    id: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    campaignId: {
        type: STRING,
        allowNull: true
    },
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false
    },
    phoneNumber: {
        type: STRING,
        allowNull: false
    },
    address: {
        type: JSONB,
        allowNull: false
    },
    additionalInfo: {
        type: TEXT,
        allowNull: true
    },
    status: {
        type: ENUM(...Object.values(LeadStatus)),
        allowNull: false
    },
    source: {
        type: ENUM(...Object.values(LeadSource)),
        allowNull: false
    },
    sourceInfo: {
        type: STRING,
        allowNull: true
    },
    followDetails: {
        type: JSONB,
        allowNull: true
    },
    assign: {
        type: JSONB,
        allowNull: true
    },
    referBy: {
        type: JSONB,
        allowNull: true
    },
    logs: {
        type: JSONB,
        allowNull: true
    },
    notes: {
        type: JSONB,
        allowNull: true
    },
    proposalModals: {
        type: JSONB,
        allowNull: true
    },
    franchiseModals: {
        type: JSONB,
        allowNull: true
    },
    affiliate: {
        type: JSONB,
        allowNull: true
    },
    marketing: {
        type: JSONB,
        allowNull: true
    },
    other: {
        type: JSONB,
        allowNull: true
    },
    createdBy: {
        type: STRING,
        allowNull: false
    },
    updatedBy: {
        type: STRING,
        allowNull: true
    },
    deletedBy: {
        type: STRING,
        allowNull: true
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
    deletedAt: {
        type: DATE,
        allowNull: true,
        defaultValue: null,
        field: "deleted_at",
    },
}, {
    sequelize,
    tableName: 'leads',
    timestamps: true,
    paranoid: true
});

export { LeadsModel };
