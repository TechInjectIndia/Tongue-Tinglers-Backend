const { OrderItem } = require("sequelize");
import { LeadSource, LeadStatus, Assignee, FollowDetails, ILead, LeadAddress, UserDetails, Note, ITrackable } from '../../interfaces/leads'

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
  additionalInfo?: string;
  source: LeadSource;
  sourceInfo?: string | null;
  status: LeadStatus;
  followDetails?: Array<FollowDetails> | null;
  referBy?: UserDetails;
  notes?: Note[] | null;
  logs?: Record<string, ITrackable[]> | null;
  assign?: Assignee;
}

export type TLeadsList = {
  total: number;
  data: ILead[];
};