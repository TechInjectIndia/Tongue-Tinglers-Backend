const { OrderItem } = require("sequelize");
import { LeadSource, LeadStatus, Assignee, FollowDetails, ILead, LeadAddress, UserDetails, Note, ITrackable, Affiliate, ExtraFields, FranchiseModels, ProposalModels } from '../../interfaces'

export type TLeadStatus = {
  status: LeadStatus,
};

export type TAssignLead = {
  assign: Assignee
};

export interface TLeadPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: LeadAddress;
  additionalInfo?: string | null;
  source: LeadSource;
  sourceInfo?: string | null;
  status: LeadStatus;
  followDetails?: Array<FollowDetails> | null;
  referBy?: UserDetails;
  logs?: Record<string, ITrackable[]> | null;
  assign?: Assignee | null;
  notes?: Note[] | null;
  proposalModals: Array<ProposalModels> | null;
  franchiseModals: Array<FranchiseModels> | null;
  affiliate: Array<Affiliate> | null;
  marketing: Array<string> | null;
  other: Array<ExtraFields> | null;
}

export type TLeadsList = {
  total: number;
  data: ILead[];
};

export interface TLeadFilters {
  offset: number;
  limit: number;
  search: string;
  sorting: any;
  userRole?: string;
  userFranchiseeId?: string;
  franchiseId?: string;
  franchiseData?: any;
  dateRange: {
    start: Date;
    end: Date;
  };
}
