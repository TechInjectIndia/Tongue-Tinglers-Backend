const { OrderItem } = require("sequelize");
import { LEAD_SOURCE, LEAD_STATUS, Assignee } from '../../interfaces/leads'

export type TLeadStatus = {
  status: LEAD_STATUS,
};

export interface TLead {
  assign: Assignee[];
  status: LEAD_STATUS;
  id: string;
  firstName: string,
  lastName: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  phoneNumber: string,
  email: string,
  address: string,
  additionalInfo: string,
  source: LEAD_SOURCE,
  followedDate?: Date[] | null,
  createdBy: string,
  updatedBy: string;
  deletedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type TAssignLead = {
  assign: Assignee[]
};

export type TLeadPayload = {
  firstName: string,
  lastName: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  phoneNumber: string,
  email?: string,
  address: string,
  additionalInfo: string,
  source: LEAD_SOURCE,
  followedDate?: Date[] | null,
  status: LEAD_STATUS,
};

export type TLeadsList = {
  total: number;
  data: TLead[];
};