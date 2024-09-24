const { OrderItem } = require("sequelize");
import { LeadSource, LeadStatus, Assignee, FollowDetails, ILead, LeadAddress, UserDetails, Note, ITrackable, Affiliate, ExtraFields } from '../../interfaces/leads'

export type TLeadStatus = {
  status: LeadStatus,
};

export type TAssignLead = {
  assign: Assignee
};

export type ILeadLog = {
  leadId: string;
  action: 'created' | 'updated';
  userId: string; // The user performing the action
  timestamp: Date;
  details: any; // Any relevant details about the change
}

export interface TLeadPayload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: LeadAddress;
  additionalInfo?: string;
  source: LeadSource;
  sourceInfo?: string | null;
  status: LeadStatus;
  followDetails?: Array<FollowDetails> | null;
  referBy?: UserDetails;
  logs?: Record<string, ITrackable[]> | null;
  assign?: Assignee;
  notes?: Note[] | null;
  pruposalModals: Array<string> | null;
  franchiseModals: Array<string> | null;
  affiliate: Array<Affiliate> | null;
  marketing: Array<string> | null;
  other: Array<ExtraFields> | null;
}

export type TLeadsList = {
  total: number;
  data: ILead[];
};